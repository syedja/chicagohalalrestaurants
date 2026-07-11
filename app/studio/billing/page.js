"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PLANS, TRIAL_DAYS } from "../../../lib/studio/billingPlans";
import { checkAuth } from "../../../lib/studio/authClient";

const PAID_PLANS = [PLANS.essentials, PLANS.growth];
const PROVIDERS = [
  { id: "stripe", label: "Pay with card (Stripe)" },
  { id: "paypal", label: "Pay with PayPal" },
];

export default function BillingPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [planId, setPlanId] = useState("essentials");
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
        body: JSON.stringify({ plan: planId }),
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
      <div className="studio-eyebrow">We run your marketing for you</div>
      <h1 className="studio-page-title">{TRIAL_DAYS} days free, then billed monthly</h1>
      <p className="studio-page-sub">
        Pick a plan. You won't be charged for {TRIAL_DAYS} days, and you can cancel
        anytime before then.
      </p>

      <div className="studio-kicker" style={{ marginBottom: 16 }}>
        Just want the free directory listing, no service? {" "}
        <Link href="/grade">Get listed free</Link> — no account needed.
      </div>

      <div className="studio-grid cols-2" style={{ marginBottom: 24 }}>
        {PAID_PLANS.map((p) => (
          <button
            type="button"
            key={p.id}
            className={`studio-tile${planId === p.id ? " selected" : ""}`}
            onClick={() => setPlanId(p.id)}
            style={{ textAlign: "left" }}
          >
            <div className="studio-tile-label">
              {p.label} — {p.price}
              {p.period}
            </div>
            <ul style={{ margin: "8px 0 0", paddingLeft: 18, fontSize: 13.5, color: "var(--ink-soft)" }}>
              {p.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </button>
        ))}
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
        Prefer to pay by Zelle or check instead? {" "}
        <a href="https://wa.me/16302104365" target="_blank" rel="noopener">
          Message us on WhatsApp
        </a>{" "}
        and we'll set you up directly.
      </div>
    </div>
  );
}
