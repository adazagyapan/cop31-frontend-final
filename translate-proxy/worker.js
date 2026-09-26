const ALLOWED_ORIGINS = [
  "https://adazagyapanada.github.io",
  "http://127.0.0.1:5500",
  "http://localhost:5500",
  "http://localhost:8000"
];

const MAX_CHARS = 2000;

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allowed = ALLOWED_ORIGINS.indexOf(origin) !== -1;

    if (request.method === "OPTIONS") {
      return new Response(null, { status: allowed ? 204 : 403, headers: corsHeaders(origin, allowed) });
    }

    if (!allowed) {
      return json({ error: "This origin is not allowed." }, 403, origin, false);
    }

    if (request.method !== "POST") {
      return json({ error: "Use POST." }, 405, origin, true);
    }

    let body;
    try {
      body = await request.json();
    } catch (err) {
      return json({ error: "Expected JSON." }, 400, origin, true);
    }

    const text = (body.text || "").toString().slice(0, MAX_CHARS);
    const source = (body.source || "").toString();
    const target = (body.target || "").toString();

    if (!text || !target) {
      return json({ error: "text and target are required." }, 400, origin, true);
    }
    if (source && source !== "auto" && source === target) {
      return json({ translation: text, detected: source }, 200, origin, true);
    }

    try {
      const result = await translate(text, target, env);
      return json({ translation: result.text, detected: result.detected }, 200, origin, true);
    } catch (err) {
      return json({ error: "Translation failed." }, 502, origin, true);
    }
  }
};

async function translate(text, target, env) {
  const res = await fetch(
    "https://translation.googleapis.com/language/translate/v2?key=" + env.GOOGLE_API_KEY,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q: text, target: target, format: "text" })
    }
  );

  if (!res.ok) throw new Error("Google Translate error " + res.status);

  const data = await res.json();
  const first = data.data.translations[0];
  return {
    text: first.translatedText,
    detected: first.detectedSourceLanguage || ""
  };
}

function corsHeaders(origin, allowed) {
  const h = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin"
  };
  if (allowed) h["Access-Control-Allow-Origin"] = origin;
  return h;
}

function json(obj, status, origin, allowed) {
  return new Response(JSON.stringify(obj), {
    status: status || 200,
    headers: Object.assign({ "Content-Type": "application/json" }, corsHeaders(origin, allowed))
  });
}
