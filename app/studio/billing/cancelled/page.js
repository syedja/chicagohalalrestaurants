"use client";

import Link from "next/link";

export default function BillingCancelledPage() {
  return (
    <div style={{ maxWidth: 480, margin: "80px auto", textAlign: "center" }}>
      <div className="studio-eyebrow">No charge made</div>
      <h1 className="studio-page-title">Checkout cancelled</h1>
      <p className="studio-page-sub">
        No worries — nothing was charged. You can start your free trial anytime.
      </p>
      <Link href="/studio/billing" className="studio-btn primary">
        Back to plans
      </Link>
    </div>
  );
}
