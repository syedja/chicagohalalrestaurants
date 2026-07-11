// POST /api/studio/billing/portal
// Creates a Stripe Customer Portal session so the owner can update their
// card, view invoices, or cancel — without us building any of that
// ourselves. Only works for Stripe customers; PayPal customers are
// pointed to PayPal's own subscription management page instead (see
// the Account page).
//
// Requires the Customer Portal to be activated once in the Stripe
// Dashboard first: Settings → Billing → Customer portal → Activate.
// Sessions fail with an error until that's done — see README.

import Stripe from "stripe";
import { query, ensureSchema } from "../../../../../lib/studio/db";
import { getSessionFromRequest } from "../../../../../lib/studio/session";

export async function POST(request) {
  const session = getSessionFromRequest(request);
  if (!session) {
    return Response.json({ ok: false, error: "Please log in again." }, { status: 401 });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return Response.json(
      { ok: false, error: "Stripe isn't configured yet." },
      { status: 500 }
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;

  try {
    await ensureSchema();
    const result = await query(
      "SELECT stripe_customer_id, payment_provider FROM studio_users WHERE id = $1",
      [session.id]
    );
    const user = result.rows[0];

    if (!user?.stripe_customer_id) {
      return Response.json(
        {
          ok: false,
          error:
            user?.payment_provider === "paypal"
              ? "Your subscription is through PayPal — manage it from your PayPal account instead."
              : "No billing account found yet. Start a trial first.",
        },
        { status: 400 }
      );
    }

    const stripe = new Stripe(secretKey);
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.stripe_customer_id,
      return_url: `${siteUrl}/studio/account`,
    });

    return Response.json({ ok: true, url: portalSession.url });
  } catch (err) {
    console.error("Stripe portal session error:", err);
    const hint = /configuration/i.test(err.message || "")
      ? " The Stripe Customer Portal may need to be activated in the Stripe Dashboard first (Settings → Billing → Customer portal)."
      : "";
    return Response.json(
      { ok: false, error: `Couldn't open billing portal.${hint}` },
      { status: 500 }
    );
  }
}
