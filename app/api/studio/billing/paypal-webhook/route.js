// POST /api/studio/billing/paypal-webhook
// PayPal calls this on subscription lifecycle events. Unlike Stripe,
// PayPal signature verification requires calling PayPal's own
// verify-webhook-signature API rather than a local HMAC check.
//
// Configure in PayPal Dashboard → Apps & Credentials → your app → Webhooks:
//   URL: https://www.chicagohalalrestaurants.com/api/studio/billing/paypal-webhook
//   Events: BILLING.SUBSCRIPTION.ACTIVATED, BILLING.SUBSCRIPTION.CANCELLED,
//           BILLING.SUBSCRIPTION.SUSPENDED, PAYMENT.SALE.COMPLETED,
//           PAYMENT.SALE.DENIED
// After creating the webhook, PayPal shows a Webhook ID — set that as
// PAYPAL_WEBHOOK_ID.

import { query, ensureSchema } from "../../../../../lib/studio/db";
import { paypalFetch } from "../../../../../lib/studio/paypal";

async function verifyWebhookSignature(request, rawBody) {
  const webhookId = process.env.PAYPAL_WEBHOOK_ID;
  if (!webhookId) throw new Error("PAYPAL_WEBHOOK_ID is not set.");

  const result = await paypalFetch("/v1/notifications/verify-webhook-signature", {
    method: "POST",
    body: JSON.stringify({
      auth_algo: request.headers.get("paypal-auth-algo"),
      cert_url: request.headers.get("paypal-cert-url"),
      transmission_id: request.headers.get("paypal-transmission-id"),
      transmission_sig: request.headers.get("paypal-transmission-sig"),
      transmission_time: request.headers.get("paypal-transmission-time"),
      webhook_id: webhookId,
      webhook_event: JSON.parse(rawBody),
    }),
  });
  return result.verification_status === "SUCCESS";
}

export async function POST(request) {
  const rawBody = await request.text();

  let verified = false;
  try {
    verified = await verifyWebhookSignature(request, rawBody);
  } catch (err) {
    console.error("PayPal webhook verification error:", err.message);
    return Response.json({ ok: false, error: "Verification failed." }, { status: 400 });
  }

  if (!verified) {
    console.error("PayPal webhook signature verification returned FAILURE.");
    return Response.json({ ok: false, error: "Invalid signature." }, { status: 400 });
  }

  const event = JSON.parse(rawBody);

  try {
    await ensureSchema();
    switch (event.event_type) {
      case "BILLING.SUBSCRIPTION.ACTIVATED": {
        const sub = event.resource;
        const userId = sub.custom_id;
        if (userId) {
          await query(
            `UPDATE studio_users SET
               payment_provider = 'paypal',
               subscription_status = 'active',
               paypal_subscription_id = $1
             WHERE id = $2`,
            [sub.id, userId]
          );
        }
        break;
      }

      case "BILLING.SUBSCRIPTION.CANCELLED": {
        const sub = event.resource;
        const userId = sub.custom_id;
        if (userId) {
          await query("UPDATE studio_users SET subscription_status = 'canceled' WHERE id = $1", [
            userId,
          ]);
        } else {
          // Some PayPal events don't echo custom_id back — fall back to
          // matching on the subscription id we stored at creation time.
          await query(
            "UPDATE studio_users SET subscription_status = 'canceled' WHERE paypal_subscription_id = $1",
            [sub.id]
          );
        }
        break;
      }

      case "BILLING.SUBSCRIPTION.SUSPENDED": {
        const sub = event.resource;
        await query(
          "UPDATE studio_users SET subscription_status = 'past_due' WHERE paypal_subscription_id = $1",
          [sub.id]
        );
        break;
      }

      case "PAYMENT.SALE.COMPLETED": {
        const sale = event.resource;
        const subId = sale.billing_agreement_id;
        if (subId) {
          await query(
            `UPDATE studio_users SET
               subscription_status = 'active',
               current_period_end = NULL
             WHERE paypal_subscription_id = $1`,
            [subId]
          );
        }
        break;
      }

      case "PAYMENT.SALE.DENIED": {
        const sale = event.resource;
        const subId = sale.billing_agreement_id;
        if (subId) {
          await query(
            "UPDATE studio_users SET subscription_status = 'past_due' WHERE paypal_subscription_id = $1",
            [subId]
          );
        }
        break;
      }

      default:
        break;
    }
    return Response.json({ ok: true, received: true });
  } catch (err) {
    console.error("PayPal webhook handler error:", err);
    return Response.json({ ok: false, error: "Handler error." }, { status: 500 });
  }
}
