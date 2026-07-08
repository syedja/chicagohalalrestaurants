"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StudioNav from "../../../components/studio/StudioNav";
import { checkAuth } from "../../../lib/studio/authClient";

// Wraps every authenticated Studio page (dashboard, create, calendar,
// history, profile, reviews) with the sidebar, and redirects to /studio/login
// if there's no valid session. Login/signup pages live outside this group
// and don't get this treatment.

export default function StudioMainLayout({ children }) {
  const router = useRouter();
  const [status, setStatus] = useState("checking"); // checking | ok

  useEffect(() => {
    let cancelled = false;
    checkAuth().then((user) => {
      if (cancelled) return;
      if (!user) {
        router.replace("/studio/login");
      } else {
        setStatus("ok");
      }
    });
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
