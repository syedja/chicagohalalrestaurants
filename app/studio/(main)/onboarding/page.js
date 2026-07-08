"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProfileForm from "../../../../components/studio/ProfileForm";
import { EMPTY_PROFILE, saveProfile, apiPost } from "../../../../lib/studio/storage";

const LOADING_LINES = [
  "Reading your website…",
  "Learning your menu…",
  "Picking up your voice…",
  "Building your profile…",
];

export default function OnboardingPage() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [stage, setStage] = useState("input"); // input | loading | review
  const [error, setError] = useState("");
  const [profile, setProfile] = useState(EMPTY_PROFILE);
  const [pagesRead, setPagesRead] = useState([]);
  const [lineIndex, setLineIndex] = useState(0);

  async function analyze(e) {
    e?.preventDefault?.();
    if (!url.trim()) {
      setError("Enter your website address first.");
      return;
    }
    setError("");
    setStage("loading");
    const ticker = setInterval(
      () => setLineIndex((i) => (i + 1) % LOADING_LINES.length),
      1800
    );
    try {
      const data = await apiPost("/api/studio/analyze", { url: url.trim() });
      const merged = {
        ...EMPTY_PROFILE,
        ...data.profile,
        socials: { ...EMPTY_PROFILE.socials, ...(data.profile?.socials || {}) },
        popularDishes: Array.isArray(data.profile?.popularDishes)
          ? data.profile.popularDishes
          : [],
      };
      setProfile(merged);
      setPagesRead(data.pagesRead || []);
      setStage("review");
    } catch (err) {
      setError(err.message);
      setStage("input");
    } finally {
      clearInterval(ticker);
    }
  }

  async function save() {
    try {
      await saveProfile(profile);
      router.push("/studio");
    } catch (err) {
      setError(err.message || "Couldn't save your profile. Try again.");
      setStage("review");
    }
  }

  if (stage === "loading") {
    return (
      <div>
        <div className="studio-eyebrow">Setup</div>
        <h1 className="studio-page-title">Learning your restaurant</h1>
        <div className="studio-card">
          <div className="studio-loader">
            <div className="studio-crescent" aria-hidden="true" />
            <div aria-live="polite">{LOADING_LINES[lineIndex]}</div>
          </div>
        </div>
      </div>
    );
  }

  if (stage === "review") {
    return (
      <div>
        <div className="studio-eyebrow">Setup · Step 2 of 2</div>
        <h1 className="studio-page-title">Here's what we learned</h1>
        <p className="studio-page-sub">
          Check it over and fix anything that's off — the Studio only extracted what your
          site actually says, so some fields may be blank. Everything here powers your
          future content.
        </p>
        {pagesRead.length > 0 ? (
          <div className="studio-note">
            Read {pagesRead.length} page{pagesRead.length > 1 ? "s" : ""} from your site.
          </div>
        ) : null}
        <div className="studio-card">
          <ProfileForm value={profile} onChange={setProfile} />
          <div className="studio-row" style={{ marginTop: 18 }}>
            <button type="button" className="studio-btn primary" onClick={save}>
              Save profile & open Studio
            </button>
            <button type="button" className="studio-btn ghost" onClick={() => setStage("input")}>
              Try a different website
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="studio-eyebrow">Setup · Step 1 of 2</div>
      <h1 className="studio-page-title">Point us at your website</h1>
      <p className="studio-page-sub">
        The Studio reads your site and builds your restaurant profile automatically — name,
        menu, story, contact details, voice. You review everything before it's saved.
      </p>
      <div className="studio-card" style={{ maxWidth: 560 }}>
        <div className="studio-field">
          <label className="studio-label">
            Your website
            <input
              className="studio-input"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="yourrestaurant.com"
              inputMode="url"
              autoComplete="url"
            />
          </label>
          <div className="studio-help">
            Works best with a site that lists your menu and contact info.
          </div>
        </div>
        {error ? <div className="studio-alert">{error}</div> : null}
        <div className="studio-row">
          <button type="button" className="studio-btn primary" onClick={analyze}>
            Analyze my website
          </button>
          <Link href="/studio/profile" className="studio-btn ghost">
            I don't have a website
          </Link>
        </div>
      </div>
    </div>
  );
}
