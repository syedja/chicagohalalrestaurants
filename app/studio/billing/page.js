"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PLANS, TRIAL_DAYS } from "../../../lib/studio/billingPlans";
import { checkAuth } from "../../../lib/studio/authClient";

const PROVIDERS = [
  { id: "stripe", label: "Pay with card (Stripe)" },
  { id: "paypal", label: "Pay with PayPal" },
];

export default function BillingPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [provider, setProvider] = useState("stripe");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    checkAuth().then((user) => {
      if (!user) {
        router.replace("/studio/login");
      } else {
        setReady(true);
      }
    });
  }, [router]);

  if (!ready) return null;

  async function startCheckout() {
    setError("");
    setBusy(true);
    try {
      const path =
        provider === "stripe" ? "/api/studio/billing/checkout" : "/api/studio/billing/paypal-create";
      const res = await fetch(path, {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ plan: "premium" }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Couldn't start checkout.");
      window.location.href = data.url;
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <div style={{ maxWidth: 640, margin: "40px auto" }}>
      <div className="studio-eyebrow">Start your free trial</div>
      <h1 className="studio-page-title">{TRIAL_DAYS} days free, then $19/month</h1>
      <p className="studio-page-sub">
        The AI Marketing Studio is a Premium feature. Try it free for a month — you won't
        be charged until day {TRIAL_DAYS + 1}, and you can cancel anytime before then.
      </p>

      <div className="studio-grid cols-2" style={{ marginBottom: 24 }}>
        <div className="studio-tile" style={{ cursor: "default" }}>
          <div className="studio-tile-label">
            {PLANS.free.label} — {PLANS.free.price}
          </div>
          <ul style={{ margin: "8px 0 0", paddingLeft: 18, fontSize: 13.5, color: "var(--ink-soft)" }}>
            {PLANS.free.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
          <div className="studio-kicker" style={{ marginTop: 12 }}>
            Already how every listing works — no account needed.{" "}
            <Link href="/grade">Get listed free</Link>
          </div>
        </div>

        <div className="studio-tile selected" style={{ cursor: "default" }}>
          <div className="studio-tile-label">
            {PLANS.premium.label} — {PLANS.premium.price}
            {PLANS.premium.period}
          </div>
          <ul style={{ margin: "8px 0 0", paddingLeft: 18, fontSize: 13.5, color: "var(--ink-soft)" }}>
            {PLANS.premium.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="studio-field">
        <span className="studio-label">Payment method</span>
        <div className="studio-checks">
          {PROVIDERS.map((p) => (
            <label key={p.id} className={`studio-check${provider === p.id ? " on" : ""}`}>
              <input
                type="radio"
                name="provider"
                checked={provider === p.id}
                onChange={() => setProvider(p.id)}
              />
              {p.label}
            </label>
          ))}
        </div>
      </div>

      {error ? <div className="studio-alert">{error}</div> : null}

      <button
        type="button"
        className="studio-btn primary"
        onClick={startCheckout}
        disabled={busy}
        style={{ width: "100%", marginTop: 8 }}
      >
        {busy ? "Starting checkout…" : `Start ${TRIAL_DAYS}-day free trial with ${provider === "stripe" ? "card" : "PayPal"}`}
      </button>
      <div className="studio-help" style={{ textAlign: "center", marginTop: 10 }}>
        A payment method is required to start the trial, but nothing is charged until day{" "}
        {TRIAL_DAYS + 1} — cancel anytime before then.
      </div>
    </div>
  );
}
