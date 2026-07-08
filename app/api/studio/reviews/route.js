// POST /api/studio/reviews  { profile, reviewText, rating, tone }
// Returns { ok, response, short }

import { generateJSON, StudioAIError } from "../../../../lib/studio/aiProvider";
import { buildReviewPrompt } from "../../../../lib/studio/prompts";
import { getSessionFromRequest } from "../../../../lib/studio/session";

export const maxDuration = 60;

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

  const reviewText = String(body?.reviewText || "").trim().slice(0, 3000);
  if (reviewText.length < 5) {
    return Response.json(
      { ok: false, error: "Paste the customer's review first." },
      { status: 400 }
    );
  }

  try {
    const { system, user } = buildReviewPrompt({
      profile: body?.profile || {},
      reviewText,
      rating: body?.rating,
      tone: body?.tone,
    });
    const data = await generateJSON({ system, user, maxTokens: 800 });
    return Response.json({ ok: true, response: data.response || "", short: data.short || "" });
  } catch (err) {
    const status = err instanceof StudioAIError ? err.status : 500;
    return Response.json(
      { ok: false, error: err.message || "Couldn't draft a response. Try again." },
      { status }
    );
  }
}
