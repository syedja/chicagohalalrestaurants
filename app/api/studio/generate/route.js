// POST /api/studio/generate  { profile, campaignId, details, platforms }
// Returns { ok, content: { instagram?, facebook?, googleBusiness?, whatsapp?, sms? } }

import { generateJSON, StudioAIError } from "../../../../lib/studio/aiProvider";
import { buildGenerationPrompt, PLATFORM_LABELS } from "../../../../lib/studio/prompts";
import { getCampaign } from "../../../../lib/studio/campaigns";
import { checkAccess, unauthorized } from "../../../../lib/studio/serverAuth";

export const maxDuration = 60;

export async function POST(request) {
  if (!checkAccess(request)) return unauthorized();

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const campaign = getCampaign(body?.campaignId);
  if (!campaign) {
    return Response.json({ ok: false, error: "Unknown campaign." }, { status: 400 });
  }

  const platforms = (Array.isArray(body?.platforms) ? body.platforms : []).filter(
    (p) => PLATFORM_LABELS[p]
  );
  if (platforms.length === 0) {
    return Response.json(
      { ok: false, error: "Pick at least one platform to write for." },
      { status: 400 }
    );
  }

  const details = String(body?.details || "").slice(0, 2000);
  const profile = body?.profile && typeof body.profile === "object" ? body.profile : {};

  try {
    const { system, user } = buildGenerationPrompt({ profile, campaign, details, platforms });
    const content = await generateJSON({ system, user, maxTokens: 2500 });
    return Response.json({ ok: true, content });
  } catch (err) {
    const status = err instanceof StudioAIError ? err.status : 500;
    return Response.json(
      { ok: false, error: err.message || "Generation failed. Try again." },
      { status }
    );
  }
}
