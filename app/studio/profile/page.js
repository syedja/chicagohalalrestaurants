"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProfileForm from "../../../components/studio/ProfileForm";
import {
  EMPTY_PROFILE,
  getProfile,
  saveProfile,
  profileCompleteness,
} from "../../../lib/studio/storage";

export default function ProfilePage() {
  const [profile, setProfile] = useState(EMPTY_PROFILE);
  const [saved, setSaved] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const existing = getProfile();
    if (existing) setProfile(existing);
    setReady(true);
  }, []);

  if (!ready) return null;

  const completeness = profileCompleteness(profile);

  function save() {
    saveProfile(profile);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
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
        <div className="studio-row" style={{ marginTop: 18 }}>
          <button type="button" className="studio-btn primary" onClick={save}>
            {saved ? "Saved" : "Save profile"}
          </button>
          <span className="studio-kicker">
            Saved on this device. Account sync is on the roadmap.
          </span>
        </div>
      </div>
    </div>
  );
}
