// POST /api/studio/billing/stripe-webhook
// Stripe calls this whenever a subscription's status changes. Verifies the
// signature, then updates the owner's row so the app knows whether they're
// trialing, active, past due, or canceled.
//
// Configure in Stripe Dashboard → Developers → Webhooks → Add endpoint:
//   URL: https://www.chicagohalalrestaurants.com/api/studio/billing/stripe-webhook
//   Events: checkout.session.completed, customer.subscription.updated,
//           customer.subscription.deleted, invoice.payment_failed

import Stripe from "stripe";
import { query } from "../../../../../lib/studio/db";

export async function POST(request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secretKey || !webhookSecret) {
    console.error("Stripe webhook received but STRIPE_SECRET_KEY/STRIPE_WEBHOOK_SECRET not set.");
    return Response.json({ ok: false, error: "Not configured." }, { status: 500 });
  }

  const stripe = new Stripe(secretKey);
  const signature = request.headers.get("stripe-signature");
  const rawBody = await request.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err.message);
    return Response.json({ ok: false, error: "Invalid signature." }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const s = event.data.object;
        const userId = s.metadata?.studio_user_id;
        if (userId && s.customer) {
          await query("UPDATE studio_users SET stripe_customer_id = $1 WHERE id = $2", [
            s.customer,
            userId,
          ]);
        }
        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.created": {
        const sub = event.data.object;
        const userId = sub.metadata?.studio_user_id;
        if (userId) {
          await query(
            `UPDATE studio_users SET
               payment_provider = 'stripe',
               plan = COALESCE($1, plan),
               subscription_status = $2,
               stripe_subscription_id = $3,
               trial_ends_at = to_timestamp($4),
               current_period_end = to_timestamp($5)
             WHERE id = $6`,
            [
              sub.metadata?.plan || null,
              sub.status,
              sub.id,
              sub.trial_end || null,
              sub.current_period_end || null,
              userId,
            ]
          );
        }
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object;
        const userId = sub.metadata?.studio_user_id;
        if (userId) {
          await query(
            "UPDATE studio_users SET subscription_status = 'canceled' WHERE id = $1",
            [userId]
          );
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object;
        const subId = invoice.subscription;
        if (subId) {
          await query(
            "UPDATE studio_users SET subscription_status = 'past_due' WHERE stripe_subscription_id = $1",
            [subId]
          );
        }
        break;
      }

      default:
        // Unhandled event types are fine to ignore.
        break;
    }
    return Response.json({ ok: true, received: true });
  } catch (err) {
    console.error("Stripe webhook handler error:", err);
    // Return 500 so Stripe retries — losing a status update silently is
    // worse than Stripe retrying a few times.
    return Response.json({ ok: false, error: "Handler error." }, { status: 500 });
  }
}
