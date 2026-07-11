// Plan definitions shared by the billing page and both payment integrations.
// Repositioned as done-for-you marketing services, not self-serve software:
// Free (directory listing only, no account/payment needed), Essentials
// ($149/mo), and Growth ($249/mo) — both paid tiers include full Studio
// access as the delivery engine, but the pitch is the service, not the tool.

export const PLANS = {
  free: {
    id: "free",
    label: "Free",
    price: "$0",
    period: "",
    features: [
      "Listed in the halal directory",
      "Name, address & rating displayed",
      "Halal certification badge",
    ],
  },
  essentials: {
    id: "essentials",
    label: "Essentials",
    price: "$149",
    period: "/month",
    features: [
      "8 posts/month across Instagram, Facebook & WhatsApp",
      "Google Business Profile kept current",
      "Review replies — up to 10/month",
      "Featured Premium directory listing",
      "Monthly recap of what was posted",
    ],
  },
  growth: {
    id: "growth",
    label: "Growth",
    price: "$249",
    period: "/month",
    features: [
      "Everything in Essentials",
      "14–16 posts/month",
      "Ramadan, Eid & holiday campaigns planned for you",
      "Unlimited review replies, within 48 hours",
      "Quarterly check-in on what's working",
    ],
  },
};

export const TRIAL_DAYS = 14;

// Maps a plan id + provider to the env var name holding that provider's
// price/plan identifier. Both essentials and growth are purchasable —
// Free doesn't need a payment provider at all.
export function envKeyFor(provider, planId) {
  const p = provider.toUpperCase(); // STRIPE | PAYPAL
  const plan = planId.toUpperCase(); // ESSENTIALS | GROWTH
  return provider === "stripe" ? `STRIPE_PRICE_${plan}` : `PAYPAL_PLAN_${plan}`;
}

export function isValidPlan(id) {
  return id === "essentials" || id === "growth";
}
