"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PLANS } from "../../../../lib/studio/billingPlans";

const STATUS_LABELS = {
  trialing: "Free trial",
  active: "Active",
  past_due: "Payment issue",
  canceled: "Canceled",
};

function formatDate(iso) {
  if (!iso) return null;
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      weekday: "short",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return null;
  }
}

export default function AccountPage() {
  const [status, setStatus] = useState(null);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/studio/billing/status", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        setStatus(data);
        setReady(true);
      })
      .catch(() => setReady(true));
  }, []);

  if (!ready) return null;

  const plan = status?.plan ? PLANS[status.plan] : null;
  const trialEnds = formatDate(status?.trialEndsAt);
  const periodEnds = formatDate(status?.currentPeriodEnd);

  async function manageBilling() {
    setError("");
    if (status?.provider === "paypal") {
      window.open("https://www.paypal.com/myaccount/autopay/", "_blank", "noopener");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/studio/billing/portal", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Couldn't open billing portal.");
      window.location.href = data.url;
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <div>
      <div className="studio-eyebrow">Your account</div>
      <h1 className="studio-page-title">Billing</h1>

      <div className="studio-card" style={{ marginBottom: 18 }}>
        {plan ? (
          <>
            <div className="studio-row" style={{ marginBottom: 6 }}>
              <strong style={{ fontSize: 17 }}>
                {plan.label} — {plan.price}
                {plan.period}
              </strong>
              <span
                className="studio-premium-badge"
                style={{ marginLeft: 10 }}
              >
                {STATUS_LABELS[status.status] || status.status || "Unknown"}
              </span>
            </div>

            {status.status === "trialing" && trialEnds ? (
              <p className="studio-kicker">
                Your free trial ends <strong>{trialEnds}</strong> — you'll be billed
                automatically after that unless you cancel.
              </p>
            ) : status.status === "active" && periodEnds ? (
              <p className="studio-kicker">
                Next billing date: <strong>{periodEnds}</strong>
              </p>
            ) : status.status === "past_due" ? (
              <p className="studio-kicker" style={{ color: "var(--danger)" }}>
                Your last payment didn't go through. Update your payment method below
                to avoid losing access.
              </p>
            ) : status.status === "canceled" ? (
              <p className="studio-kicker">
                Your subscription is canceled. Start a new trial anytime from{" "}
                <Link href="/studio/billing">the plans page</Link>.
              </p>
            ) : null}

            <p className="studio-kicker" style={{ marginTop: 4 }}>
              Paying with: {status.provider === "paypal" ? "PayPal" : "Card (Stripe)"}
            </p>

            {error ? <div className="studio-alert" style={{ marginTop: 12 }}>{error}</div> : null}

            {status.status !== "canceled" && (
              <button
                type="button"
                className="studio-btn primary"
                onClick={manageBilling}
                disabled={busy}
                style={{ marginTop: 14 }}
              >
                {busy
                  ? "Opening…"
                  : status.provider === "paypal"
                  ? "Manage on PayPal"
                  : "Manage billing"}
              </button>
            )}
          </>
        ) : (
          <>
            <p style={{ margin: "0 0 14px" }}>
              You don't have an active plan yet.
            </p>
            <Link href="/studio/billing" className="studio-btn primary">
              View plans
            </Link>
          </>
        )}
      </div>

      <p className="studio-help">
        Questions about your bill?{" "}
        <a href="https://wa.me/16302104365" target="_blank" rel="noopener">
          Message us on WhatsApp
        </a>{" "}
        anytime.
      </p>
    </div>
  );
}
