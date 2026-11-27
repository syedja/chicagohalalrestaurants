// Site-wide config for owner onboarding: contact, pricing and payment links.
// This is the ONLY place these values live. Every page imports from here.
//
// The URLs can also be set in Vercel as environment variables (Project →
// Settings → Environment Variables) without a code change:
//   NEXT_PUBLIC_STRIPE_FEATURED_URL, NEXT_PUBLIC_STRIPE_PREMIUM_URL,
//   NEXT_PUBLIC_CLAIM_FORM_URL
// An env var, when set, wins over the value written below.

export const CONTACT_EMAIL = 'info@chicagohalalrestaurants.com';

// Stripe Payment Link for the Featured tier ($99/yr).
export const STRIPE_FEATURED_URL =
  process.env.NEXT_PUBLIC_STRIPE_FEATURED_URL || 'https://buy.stripe.com/14A9ASgP36e74Qgevt0gw02';

// Stripe Payment Link for the Premium tier ($249/yr).
export const STRIPE_PREMIUM_URL =
  process.env.NEXT_PUBLIC_STRIPE_PREMIUM_URL || 'https://buy.stripe.com/dRm3cu7etbyr4Qg9b90gw01';

// Tally claim form.
export const CLAIM_FORM_URL =
  process.env.NEXT_PUBLIC_CLAIM_FORM_URL || 'https://tally.so/r/o9GBJN';

// Name of the Tally hidden field that receives the restaurant name.
// The form must have a hidden field named exactly this (type /hidden in Tally).
export const CLAIM_FORM_PREFILL_PARAM = 'restaurant';

// Featured is the Founding Partner rate, locked for the first 25 restaurants.
export const PRICE_FEATURED = '$99/yr';
export const PRICE_PREMIUM = '$249/yr';

export const FOUNDING_PARTNER_NOTE = 'Founding Partner rate — locked for the first 25 restaurants.';

// True only for a real http(s) URL, not a "<paste ...>" placeholder.
export function isRealUrl(url) {
  return typeof url === 'string' && /^https?:\/\//i.test(url.trim());
}

export function mailtoContact(subject) {
  return subject
    ? `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`
    : `mailto:${CONTACT_EMAIL}`;
}

// Use the URL if it is set; otherwise fall back to emailing us.
export function linkOrMailto(url, subject) {
  return isRealUrl(url) ? url : mailtoContact(subject);
}

// Splits "$99/yr" into { amount: "$99", period: "/yr" } for display.
export function splitPrice(price) {
  const i = price.indexOf('/');
  return i === -1 ? { amount: price, period: '' } : { amount: price.slice(0, i), period: price.slice(i) };
}

export function claimHref(restaurantName) {
  return restaurantName ? `/claim?restaurant=${encodeURIComponent(restaurantName)}` : '/claim';
}
