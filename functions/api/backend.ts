const UPSTREAM = "https://script.google.com/macros/s/AKfycbycik6AGSjEkbKW85dTPdMZRSYBVUFvTzC9f-mhLDqujxEQA3J8xu6j8-HF5JDk4Sw/exec";

const jsonResponse = (status: number, code: string, message: string) =>
  new Response(JSON.stringify({
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

export const onRequest = async ({ request }: { request: Request }) => {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Allow": "GET, POST, HEAD, OPTIONS",
        "Cache-Control": "no-store",
      },
    });
  }

  const incoming = new URL(request.url);
  const target = new URL(UPSTREAM);
  incoming.searchParams.forEach((value, key) => target.searchParams.set(key, value));

  const init: RequestInit = { method: request.method, redirect: "follow" };
  if (request.method !== "GET" && request.method !== "HEAD") {
    init.headers = { "Content-Type": "text/plain;charset=utf-8" };
    init.body = await request.text();
  }

  try {
    const upstream = await fetch(target.toString(), init);
    const body = await upstream.text();

    if (!body.trim()) {
      return jsonResponse(502, "UPSTREAM_EMPTY_RESPONSE",
        "Google Apps Script returned an empty response. Check that the deployed Web App has the current doPost handler and that this deployment URL points to the correct script version.");
    }

    try {
      JSON.parse(body);
    } catch {
      const preview = body.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().slice(0, 160);
      return jsonResponse(502, "UPSTREAM_NON_JSON_RESPONSE",
        "Google Apps Script returned a non-JSON response (HTTP " + upstream.status + "). " +
        (preview || "The response body could not be read.") +
        " Check the Web App deployment permissions and deployed version.");
    }

    return new Response(body, {
      status: upstream.ok ? 200 : upstream.status,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return jsonResponse(502, "UPSTREAM_FETCH_FAILED",
      "Cloudflare could not reach Google Apps Script. Check the upstream Web App URL and deployment availability.");
  }
};
