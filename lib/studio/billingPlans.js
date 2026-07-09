// Plan definitions shared by the billing page and both payment integrations.
// Two plans only: Free (basic directory listing, no account needed — not
// part of this billing flow at all) and Premium (everything, incl. Studio
// access, $19/month after a 30-day free trial).

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
  premium: {
    id: "premium",
    label: "Premium",
    price: "$19",
    period: "/month",
    features: [
      "Everything in Free",
      "Featured badge & priority placement",
      "Homepage spotlight section",
      "Phone, menu & social links displayed",
      "AI search ready (ChatGPT, Google AI, Perplexity)",
      "Full AI Marketing Studio access",
    ],
  },
};

export const TRIAL_DAYS = 30;

// Maps a plan id + provider to the env var name holding that provider's
// price/plan identifier. Only "premium" goes through checkout — Free
// doesn't need a payment provider at all.
export function envKeyFor(provider, planId) {
  const p = provider.toUpperCase(); // STRIPE | PAYPAL
  const plan = planId.toUpperCase(); // PREMIUM
  return provider === "stripe" ? `STRIPE_PRICE_${plan}` : `PAYPAL_PLAN_${plan}`;
}

// Only "premium" is a purchasable plan through this billing flow.
export function isValidPlan(id) {
  return id === "premium";
}
