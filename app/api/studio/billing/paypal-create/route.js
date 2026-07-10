// POST /api/studio/billing/paypal-create  { plan: "standard"|"premium" }
// Creates a PayPal subscription and returns the approval URL to redirect
// the owner to. PayPal's trial period is defined on the Plan itself
// (configured once in the PayPal dashboard/API when the plan is created),
// not per-subscription — see README for how to create the two plans.

import { query, ensureSchema } from "../../../../../lib/studio/db";
import { getSessionFromRequest } from "../../../../../lib/studio/session";
import { paypalFetch } from "../../../../../lib/studio/paypal";
import { envKeyFor, isValidPlan } from "../../../../../lib/studio/billingPlans";

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

  const paypalPlanId = process.env[envKeyFor("paypal", planId)];
  if (!paypalPlanId) {
    return Response.json(
      {
        ok: false,
        error: `PayPal plan for ${planId} isn't configured. Add ${envKeyFor("paypal", planId)}.`,
      },
      { status: 500 }
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;

  try {
    const userRes = await query("SELECT email, restaurant_name FROM studio_users WHERE id = $1", [
      session.id,
    ]);
    const user = userRes.rows[0];
    if (!user) {
      return Response.json({ ok: false, error: "Account not found." }, { status: 404 });
    }

    const sub = await paypalFetch("/v1/billing/subscriptions", {
      method: "POST",
      headers: { "PayPal-Request-Id": `studio-${session.id}-${Date.now()}` },
      body: JSON.stringify({
        plan_id: paypalPlanId,
        subscriber: { email_address: user.email },
        custom_id: String(session.id),
        application_context: {
          brand_name: "Chicago Halal Restaurants",
          shipping_preference: "NO_SHIPPING",
          user_action: "SUBSCRIBE_NOW",
          return_url: `${siteUrl}/studio/billing/success?provider=paypal`,
          cancel_url: `${siteUrl}/studio/billing/cancelled`,
        },
      }),
    });

    // Remember the plan choice now — PayPal won't tell us which plan this
    // was for in some webhook events, only the subscription id.
    await query(
      "UPDATE studio_users SET paypal_subscription_id = $1, plan = $2 WHERE id = $3",
      [sub.id, planId, session.id]
    );

    const approveLink = (sub.links || []).find((l) => l.rel === "approve")?.href;
    if (!approveLink) {
      return Response.json(
        { ok: false, error: "PayPal didn't return an approval link. Try again." },
        { status: 502 }
      );
    }

    return Response.json({ ok: true, url: approveLink });
  } catch (err) {
    console.error("PayPal subscription creation error:", err);
    return Response.json(
      { ok: false, error: err.message || "Couldn't start PayPal checkout. Try again." },
      { status: 500 }
    );
  }
}
