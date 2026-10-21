const UPSTREAM = "https://script.google.com/macros/s/AKfycbycik6AGSjEkbKW85dTPdMZRSYBVUFvTzC9f-mhLDqujxEQA3J8xu6j8-HF5JDk4Sw/exec";

export const onRequest: PagesFunction = async ({ request }) => {
  const incoming = new URL(request.url);
  const target = new URL(UPSTREAM);
  incoming.searchParams.forEach((value, key) => target.searchParams.set(key, value));
  const init: RequestInit = { method: request.method, redirect: "follow" };
  if (request.method !== "GET" && request.method !== "HEAD") {
    init.headers = { "Content-Type": "text/plain;charset=utf-8" };
    init.body = await request.text();
  }
  const upstream = await fetch(target.toString(), init);
  const body = await upstream.text();
  return new Response(body, {
    status: upstream.status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
};
