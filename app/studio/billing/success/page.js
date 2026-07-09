"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Owners land here after completing checkout on Stripe or PayPal. The
// actual subscription status update happens via webhook (which can take
// a few seconds), so this page polls billing status briefly before
// sending them into the Studio, rather than assuming success instantly.

export default function BillingSuccessPage() {
  const router = useRouter();
  const [message, setMessage] = useState("Confirming your subscription…");

  useEffect(() => {
    let cancelled = false;
    let attempts = 0;

    async function poll() {
      attempts += 1;
      try {
        const res = await fetch("/api/studio/billing/status", { credentials: "include" });
        const data = await res.json();
        if (cancelled) return;
        if (data.hasAccess) {
          setMessage("You're all set — redirecting…");
          setTimeout(() => router.replace("/studio"), 900);
          return;
        }
      } catch {}

      if (attempts >= 10) {
        setMessage(
          "This is taking longer than expected. If your payment went through, refresh this page in a moment."
        );
        return;
      }
      setTimeout(poll, 1500);
    }

    poll();
    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <div style={{ maxWidth: 480, margin: "80px auto", textAlign: "center" }}>
      <div className="studio-loader">
        <div className="studio-crescent" aria-hidden="true" />
        <div>{message}</div>
      </div>
    </div>
  );
}
