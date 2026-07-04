// Model-agnostic AI provider for RestaurantAI Studio (server-side only).
// Switch providers with env vars — the rest of the app never changes.
//
//   STUDIO_AI_PROVIDER = "anthropic" (default) | "openai" | "gemini"
//   ANTHROPIC_API_KEY / OPENAI_API_KEY / GEMINI_API_KEY
//   STUDIO_MODEL (optional override of the default model per provider)
//
// NOTE: default model names below were correct when this was written, but
// providers rename models often. If a request fails with a model error,
// check the provider's current docs and set STUDIO_MODEL.

const DEFAULTS = {
  anthropic: "claude-sonnet-4-6",
  openai: "gpt-4o-mini",
  gemini: "gemini-2.0-flash",
};

export async function generateJSON({ system, user, maxTokens = 2000 }) {
  const provider = (process.env.STUDIO_AI_PROVIDER || "anthropic").toLowerCase();
  const model = process.env.STUDIO_MODEL || DEFAULTS[provider];

  let raw;
  if (provider === "anthropic") raw = await callAnthropic({ system, user, maxTokens, model });
  else if (provider === "openai") raw = await callOpenAI({ system, user, maxTokens, model });
  else if (provider === "gemini") raw = await callGemini({ system, user, maxTokens, model });
  else throw new StudioAIError(`Unknown STUDIO_AI_PROVIDER "${provider}".`);

  return parseJSONLoose(raw);
}

export class StudioAIError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
  }
}

async function callAnthropic({ system, user, maxTokens, model }) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new StudioAIError("ANTHROPIC_API_KEY is not set.", 500);
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      system,
      messages: [{ role: "user", content: user }],
    }),
  });
  if (!res.ok) throw await providerError("Anthropic", res);
  const data = await res.json();
  return (data.content || [])
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("\n");
}

async function callOpenAI({ system, user, maxTokens, model }) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new StudioAIError("OPENAI_API_KEY is not set.", 500);
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });
  if (!res.ok) throw await providerError("OpenAI", res);
  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}

async function callGemini({ system, user, maxTokens, model }) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new StudioAIError("GEMINI_API_KEY is not set.", 500);
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
      model
    )}:generateContent?key=${encodeURIComponent(key)}`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: [{ role: "user", parts: [{ text: user }] }],
        generationConfig: { maxOutputTokens: maxTokens },
      }),
    }
  );
  if (!res.ok) throw await providerError("Gemini", res);
  const data = await res.json();
  return (
    data.candidates?.[0]?.content?.parts
      ?.map((p) => p.text || "")
      .join("\n") || ""
  );
}

async function providerError(name, res) {
  let detail = "";
  try {
    detail = (await res.text()).slice(0, 300);
  } catch {}
  return new StudioAIError(
    `${name} API error (${res.status}). ${detail}`,
    res.status === 429 ? 429 : 502
  );
}

function parseJSONLoose(text) {
  if (!text) throw new StudioAIError("The AI returned an empty response. Try again.", 502);
  let t = text.trim().replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
  // If there's prose around the JSON, grab the outermost object.
  const first = t.indexOf("{");
  const last = t.lastIndexOf("}");
  if (first > 0 || (last > -1 && last < t.length - 1)) {
    t = t.slice(first, last + 1);
  }
  try {
    return JSON.parse(t);
  } catch {
    throw new StudioAIError("The AI response couldn't be read. Try again.", 502);
  }
}
