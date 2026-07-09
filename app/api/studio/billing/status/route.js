// GET /api/studio/billing/status — returns the logged-in owner's current
// billing state, used by the (main) layout to decide whether to let them
// into the Studio or redirect to /studio/billing.

import { query } from "../../../../../lib/studio/db";
import { getSessionFromRequest } from "../../../../../lib/studio/session";

export async function GET(request) {
  const session = getSessionFromRequest(request);
  if (!session) {
    return Response.json({ ok: false, error: "Not logged in." }, { status: 401 });
  }

  try {
    const result = await query(
      "SELECT plan, payment_provider, subscription_status, trial_ends_at, current_period_end FROM studio_users WHERE id = $1",
      [session.id]
    );
    const row = result.rows[0];
    if (!row) {
      return Response.json({ ok: false, error: "Account not found." }, { status: 404 });
    }

    // "trialing" and "active" both mean full access. Anything else
    // (never subscribed, canceled, past_due, or no row yet) means the
    // owner needs to go to the billing page.
    const hasAccess = row.subscription_status === "trialing" || row.subscription_status === "active";

    return Response.json({
      ok: true,
      hasAccess,
      plan: row.plan,
      provider: row.payment_provider,
      status: row.subscription_status,
      trialEndsAt: row.trial_ends_at,
      currentPeriodEnd: row.current_period_end,
    });
  } catch (err) {
    console.error("Billing status error:", err);
    return Response.json({ ok: false, error: "Couldn't check billing status." }, { status: 500 });
  }
}
