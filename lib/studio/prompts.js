// The invisible prompt engine. Owners click buttons; this file writes the prompts.
// Accuracy rules are baked in: the AI must never invent prices, hours, discounts,
// certifications, or claims not supplied by the owner.

const PLATFORM_SPECS = {
  instagram: `"instagram": { "caption": string (an engaging Instagram caption, 60-140 words, line breaks allowed, 2-4 tasteful emojis max), "hashtags": array of 8-12 relevant hashtag strings without the # symbol }`,
  facebook: `"facebook": { "post": string (a Facebook post, 60-160 words, slightly more informational than Instagram, include address/phone if available, at most 2 emojis) }`,
  googleBusiness: `"googleBusiness": { "post": string (a Google Business Profile update, under 1500 characters, plain and factual, no hashtags, end with a clear call to action) }`,
  whatsapp: `"whatsapp": { "message": string (a WhatsApp broadcast message using WhatsApp formatting: *bold* for emphasis, _italic_ sparingly, short lines, friendly and personal, under 120 words, include Islamic greeting like "Assalamu alaikum" naturally) }`,
  sms: `"sms": { "message": string (an SMS under 160 characters including any link placeholder, one clear call to action) }`,
};

export const PLATFORM_LABELS = {
  instagram: "Instagram",
  facebook: "Facebook",
  googleBusiness: "Google Business",
  whatsapp: "WhatsApp",
  sms: "SMS",
};

function profileBlock(profile = {}) {
  const rows = [];
  const add = (label, v) => {
    if (v && String(v).trim()) rows.push(`${label}: ${String(v).trim()}`);
  };
  add("Restaurant name", profile.name);
  add("Cuisine", profile.cuisine);
  add("Neighborhood / city", profile.neighborhood);
  add("Address", profile.address);
  add("Phone", profile.phone);
  add("WhatsApp", profile.whatsapp);
  add("Website", profile.website);
  add("Halal certification", profile.certification);
  add("Hours", profile.hours);
  add("Popular dishes", (profile.popularDishes || []).join(", "));
  add("Online ordering", profile.orderingLinks);
  add("Reservations", profile.reservationLink);
  add("Catering", profile.cateringInfo);
  add("About", profile.about);
  add("Target audience", profile.audience);
  add("Current promotions", profile.promos);
  add("Instagram handle", profile.socials?.instagram);
  add("Facebook page", profile.socials?.facebook);
  add("Preferred tone", profile.tone);
  add("Brand voice notes", profile.brandVoiceNotes);
  return rows.join("\n");
}

export function buildGenerationPrompt({ profile, campaign, details, platforms }) {
  const specs = platforms.map((p) => PLATFORM_SPECS[p]).filter(Boolean);

  const system = `You are the in-house marketing writer for a halal restaurant. You write warm, appetizing, community-rooted marketing content that sounds like a real local restaurant, not a corporate brand.

STRICT ACCURACY RULES (non-negotiable):
1. Never invent prices, discounts, percentages, dates, times, hours, awards, or certifications. Use ONLY facts from the restaurant profile and the owner's notes below.
2. If a useful detail is missing (price, link, time), write a clearly visible placeholder in square brackets, e.g. [price], [order link], so the owner fills it in before posting.
3. Only mention halal certification if the profile names a certifier. Say "certified by [certifier name]" style claims only when the certifier is actually listed.
4. Never use unverifiable superlatives like "#1", "best in Chicago", or "award-winning" unless the owner supplied that claim.
5. Islamic greetings and phrases should be used respectfully and naturally where appropriate for the audience.

STYLE:
- Write like a neighborhood restaurant that knows its regulars by name.
- Appetizing and specific beats generic hype. Name real dishes from the profile.
- Match the preferred tone in the profile if one is given.

OUTPUT FORMAT:
Respond with ONLY a valid JSON object and nothing else — no markdown fences, no preamble. The JSON object must contain exactly these keys:
{
${specs.join(",\n")}
}`;

  const user = `RESTAURANT PROFILE:
${profileBlock(profile) || "(Profile is mostly empty — rely on the campaign notes and use placeholders where needed.)"}

CAMPAIGN: ${campaign.label}
CAMPAIGN DIRECTION: ${campaign.hint}
${details && details.trim() ? `OWNER'S NOTES FOR THIS CAMPAIGN:\n${details.trim()}` : "OWNER'S NOTES: (none provided — use placeholders for any specifics you need)"}

Generate the content now.`;

  return { system, user };
}

export function buildAnalysisPrompt({ url, pages }) {
  const system = `You extract structured restaurant information from website text. Respond with ONLY a valid JSON object — no markdown fences, no commentary.

Rules:
- Extract only what the text actually says. Leave a field as an empty string "" (or empty array) if the information is not present. Never guess or fabricate.
- "certification" must be filled ONLY if a halal certifier (e.g. HFSAA, HMS, ISWA, MCG) is explicitly named on the site.
- "popularDishes" should be up to 8 signature or frequently mentioned dishes.
- "tone" is your one-line read of the site's voice (e.g. "warm and family-oriented").

JSON shape:
{
  "name": "", "cuisine": "", "phone": "", "whatsapp": "", "email": "",
  "website": "", "address": "", "neighborhood": "", "hours": "",
  "orderingLinks": "", "reservationLink": "", "cateringInfo": "",
  "popularDishes": [], "about": "", "audience": "", "certification": "",
  "promos": "", "tone": "",
  "socials": { "instagram": "", "facebook": "", "tiktok": "" }
}`;

  const user = `Website: ${url}

${pages
    .map((p) => `--- PAGE: ${p.url} ---\n${p.text}`)
    .join("\n\n")}

Extract the restaurant profile JSON now.`;

  return { system, user };
}

export function buildReviewPrompt({ profile, reviewText, rating, tone }) {
  const system = `You write owner responses to customer reviews for a halal restaurant. Respond with ONLY valid JSON, no fences:
{ "response": string (the full owner response, 40-110 words), "short": string (a briefer 1-2 sentence version) }

Rules:
- Thank genuinely, never defensively. For negative reviews: acknowledge, apologize where appropriate without admitting legal fault, and invite the guest to reach out directly. Never argue, never make excuses, never offer compensation unless the owner's profile mentions a policy.
- Never invent facts about what happened during the guest's visit.
- Sign off warmly. Use the restaurant name if provided.
- Tone requested: ${tone || "warm"}.`;

  const user = `RESTAURANT: ${profile?.name || "(name not set)"}
STAR RATING GIVEN: ${rating || "unknown"} of 5
CUSTOMER REVIEW:
"""${reviewText}"""

Write the owner response JSON now.`;

  return { system, user };
}
