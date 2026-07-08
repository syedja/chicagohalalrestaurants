// POST /api/studio/analyze  { url }
// Fetches the restaurant's website (plus up to 2 likely menu/about/catering
// pages on the same domain), extracts the text, and asks the AI to build a
// restaurant profile. Returns { ok, profile, pagesRead }.

import { generateJSON, StudioAIError } from "../../../../lib/studio/aiProvider";
import { buildAnalysisPrompt } from "../../../../lib/studio/prompts";
import { getSessionFromRequest } from "../../../../lib/studio/session";

export const maxDuration = 60;

const MAX_MAIN_CHARS = 16000;
const MAX_SUB_CHARS = 7000;

function isBlockedHost(hostname) {
  const h = hostname.toLowerCase();
  if (h === "localhost" || h.endsWith(".local") || h === "0.0.0.0") return true;
  if (/^127\./.test(h) || /^10\./.test(h) || /^192\.168\./.test(h)) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(h)) return true;
  if (h === "[::1]" || h === "::1") return true;
  return false;
}

async function fetchPage(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "user-agent":
          "Mozilla/5.0 (compatible; RestaurantAI-Studio/1.0; +https://chicagohalalrestaurants.com)",
        accept: "text/html,application/xhtml+xml",
      },
    });
    if (!res.ok) return null;
    const type = res.headers.get("content-type") || "";
    if (!type.includes("html") && !type.includes("text")) return null;
    return await res.text();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function htmlToText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li|h[1-6]|tr|section|article)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n+/g, "\n")
    .trim();
}

function findUsefulLinks(html, baseUrl) {
  const found = new Map();
  const re = /<a[^>]+href=["']([^"'#]+)["']/gi;
  let m;
  while ((m = re.exec(html)) && found.size < 2) {
    const href = m[1];
    if (!/menu|about|catering/i.test(href)) continue;
    try {
      const abs = new URL(href, baseUrl);
      if (abs.hostname !== new URL(baseUrl).hostname) continue;
      if (!/^https?:$/.test(abs.protocol)) continue;
      const key = abs.href.replace(/\/$/, "");
      if (key === baseUrl.replace(/\/$/, "")) continue;
      found.set(key, abs.href);
    } catch {}
  }
  return [...found.values()];
}

export async function POST(request) {
  const session = getSessionFromRequest(request);
  if (!session) {
    return Response.json({ ok: false, error: "Please log in again." }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  let url = String(body?.url || "").trim();
  if (url && !/^https?:\/\//i.test(url)) url = `https://${url}`;

  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return Response.json(
      { ok: false, error: "That doesn't look like a valid website address. Try something like yourrestaurant.com" },
      { status: 400 }
    );
  }
  if (!/^https?:$/.test(parsed.protocol) || isBlockedHost(parsed.hostname)) {
    return Response.json({ ok: false, error: "That address can't be analyzed." }, { status: 400 });
  }

  const mainHtml = await fetchPage(parsed.href);
  if (!mainHtml) {
    return Response.json(
      {
        ok: false,
        error:
          "We couldn't reach that website. Check the address, or skip this step and fill in the profile manually.",
      },
      { status: 422 }
    );
  }

  const pages = [{ url: parsed.href, text: htmlToText(mainHtml).slice(0, MAX_MAIN_CHARS) }];

  for (const link of findUsefulLinks(mainHtml, parsed.href)) {
    const html = await fetchPage(link);
    if (html) pages.push({ url: link, text: htmlToText(html).slice(0, MAX_SUB_CHARS) });
  }

  try {
    const { system, user } = buildAnalysisPrompt({ url: parsed.href, pages });
    const profile = await generateJSON({ system, user, maxTokens: 1500 });
    if (!profile.website) profile.website = parsed.href;
    return Response.json({ ok: true, profile, pagesRead: pages.map((p) => p.url) });
  } catch (err) {
    const status = err instanceof StudioAIError ? err.status : 500;
    return Response.json(
      { ok: false, error: err.message || "Analysis failed. Try again." },
      { status }
    );
  }
}
