const UPSTREAM = "https://script.google.com/macros/s/AKfycbycik6AGSjEkbKW85dTPdMZRSYBVUFvTzC9f-mhLDqujxEQA3J8xu6j8-HF5JDk4Sw/exec";

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

function jsonError(status: number, code: string, message: string): Response {
  return new Response(JSON.stringify({
    success: false,
    data: null,
    error: { code, message },
  }), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/backend" || url.pathname === "/api/backend/") {
      if (request.method === "OPTIONS") {
        return new Response(null, {
          status: 204,
          headers: {
            "Allow": "GET, POST, HEAD, OPTIONS",
            "Cache-Control": "no-store",
          },
        });
      }

      if (!["GET", "POST", "HEAD"].includes(request.method)) {
        return jsonError(405, "METHOD_NOT_ALLOWED", "Use GET or POST for this endpoint.");
      }

      const upstreamUrl = new URL(UPSTREAM);
      url.searchParams.forEach((value, key) => upstreamUrl.searchParams.set(key, value));

      try {
        const init: RequestInit = {
          method: request.method,
          redirect: "follow",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
        };
        if (request.method === "POST") {
          init.body = await request.text();
        }

        const upstream = await fetch(upstreamUrl.toString(), init);
        const body = request.method === "HEAD" ? "" : await upstream.text();

        if (request.method !== "HEAD" && !body.trim()) {
          return jsonError(502, "UPSTREAM_EMPTY_RESPONSE",
            "Google Apps Script returned an empty response. Check the Web App deployment and doPost handler.");
        }

        if (request.method !== "HEAD") {
          try {
            JSON.parse(body);
          } catch {
            const preview = body.replace(/<[^>]*>/g, " ").replace(/\\s+/g, " ").trim().slice(0, 160);
            return jsonError(502, "UPSTREAM_NON_JSON_RESPONSE",
              "Google Apps Script returned a non-JSON response (HTTP " + upstream.status + "). " +
              (preview || "The response body could not be read.") +
              " Check the Web App deployment permissions and deployed version.");
          }
        }

        return new Response(body || null, {
          status: upstream.ok ? (request.method === "HEAD" ? 200 : upstream.status) : upstream.status,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": "no-store",
          },
        });
      } catch {
        return jsonError(502, "UPSTREAM_FETCH_FAILED",
          "Cloudflare could not reach Google Apps Script. Check the upstream Web App URL and deployment availability.");
      }
    }

    return env.ASSETS.fetch(request);
  },
};
