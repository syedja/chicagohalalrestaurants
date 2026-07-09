"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StudioNav from "../../../components/studio/StudioNav";
import { checkAuth } from "../../../lib/studio/authClient";

// Wraps every authenticated Studio page (dashboard, create, calendar,
// history, profile, reviews) with the sidebar. Redirects to /studio/login
// if there's no valid session, and to /studio/billing if the owner is
// logged in but has no active trial/subscription (never started one,
// or it lapsed). Login/signup/billing pages live outside this group and
// don't get either check.

export default function StudioMainLayout({ children }) {
  const router = useRouter();
  const [status, setStatus] = useState("checking"); // checking | ok

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const user = await checkAuth();
      if (cancelled) return;
      if (!user) {
        router.replace("/studio/login");
        return;
      }

      try {
        const res = await fetch("/api/studio/billing/status", { credentials: "include" });
        const data = await res.json();
        if (cancelled) return;
        if (!res.ok || !data.hasAccess) {
          router.replace("/studio/billing");
          return;
        }
        setStatus("ok");
      } catch {
        // If the billing check itself fails (network hiccup, etc.), don't
        // trap a paying owner outside the Studio — let them in and the
        // next page load will re-check.
        if (!cancelled) setStatus("ok");
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [router]);

  if (status === "checking") {
    return (
      <div className="studio-shell">
        <div className="studio-main">
          <div className="studio-loader">
            <div className="studio-crescent" aria-hidden="true" />
            <div>Loading your Studio…</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="studio-shell">
      <StudioNav />
      <main className="studio-main">{children}</main>
    </div>
  );
}
