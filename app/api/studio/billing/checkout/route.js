// POST /api/studio/billing/checkout  { plan: "standard"|"premium" }
// Creates a Stripe Checkout session in subscription mode with a 7-day
// trial, and returns the URL to redirect the owner to.

import Stripe from "stripe";
import { query, ensureSchema } from "../../../../../lib/studio/db";
import { getSessionFromRequest } from "../../../../../lib/studio/session";
import { PLANS, TRIAL_DAYS, envKeyFor, isValidPlan } from "../../../../../lib/studio/billingPlans";

export async function POST(request) {
  await ensureSchema();
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

  const planId = String(body?.plan || "");
  if (!isValidPlan(planId)) {
    return Response.json({ ok: false, error: "Choose a plan first." }, { status: 400 });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return Response.json(
      { ok: false, error: "Stripe isn't configured yet. Add STRIPE_SECRET_KEY." },
      { status: 500 }
    );
  }
  const priceId = process.env[envKeyFor("stripe", planId)];
  if (!priceId) {
    return Response.json(
      {
        ok: false,
        error: `Stripe price for ${planId} isn't configured. Add ${envKeyFor("stripe", planId)}.`,
      },
      { status: 500 }
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;

  try {
    const stripe = new Stripe(secretKey);

    const userRes = await query(
      "SELECT email, stripe_customer_id FROM studio_users WHERE id = $1",
      [session.id]
    );
    const user = userRes.rows[0];
    if (!user) {
      return Response.json({ ok: false, error: "Account not found." }, { status: 404 });
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: user.stripe_customer_id || undefined,
      customer_email: user.stripe_customer_id ? undefined : user.email,
      line_items: [{ price: priceId, quantity: 1 }],
      subscription_data: {
        trial_period_days: TRIAL_DAYS,
        metadata: { studio_user_id: String(session.id), plan: planId },
      },
      metadata: { studio_user_id: String(session.id), plan: planId },
      success_url: `${siteUrl}/studio/billing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/studio/billing/cancelled`,
    });

    return Response.json({ ok: true, url: checkoutSession.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return Response.json(
      { ok: false, error: err.message || "Couldn't start checkout. Try again." },
      { status: 500 }
    );
  }
}
