"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProfileForm from "../../../../components/studio/ProfileForm";
import {
  EMPTY_PROFILE,
  getProfile,
  saveProfile,
  profileCompleteness,
} from "../../../../lib/studio/storage";

export default function ProfilePage() {
  const [profile, setProfile] = useState(EMPTY_PROFILE);
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getProfile().then((existing) => {
      if (cancelled) return;
      if (existing) setProfile(existing);
      setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready) return null;

  const completeness = profileCompleteness(profile);

  async function save() {
    setError("");
    setBusy(true);
    try {
      await saveProfile(profile);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err.message || "Couldn't save your profile. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div className="studio-eyebrow">Your restaurant</div>
      <h1 className="studio-page-title">Restaurant Profile</h1>
      <p className="studio-page-sub">
        This is your restaurant's permanent memory. Every post, caption, and reply the
        Studio writes draws from what's here — it will never invent details you haven't
        provided.
      </p>

      <div className="studio-card" style={{ marginBottom: 18 }}>
        <div className="studio-row" style={{ marginBottom: 10 }}>
          <strong>Profile {completeness}% complete</strong>
          <div className="studio-spacer" />
          {!profile.name ? (
            <Link href="/studio/onboarding" className="studio-btn ghost small">
              Auto-fill from my website
            </Link>
          ) : null}
        </div>
        <div className="studio-progress">
          <span style={{ width: `${completeness}%` }} />
        </div>
      </div>

      <div className="studio-card">
        <ProfileForm value={profile} onChange={setProfile} />
        {error ? <div className="studio-alert">{error}</div> : null}
        <div className="studio-row" style={{ marginTop: 18 }}>
          <button type="button" className="studio-btn primary" onClick={save} disabled={busy}>
            {busy ? "Saving…" : saved ? "Saved" : "Save profile"}
          </button>
          <span className="studio-kicker">
            Saved to your account — available from any device you log in on.
          </span>
        </div>
      </div>
    </div>
  );
}
