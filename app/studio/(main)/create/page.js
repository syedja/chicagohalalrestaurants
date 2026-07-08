"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CAMPAIGNS, CAMPAIGN_CATEGORIES, getCampaign } from "../../../../lib/studio/campaigns";
import { getProfile, addHistory, apiPost } from "../../../../lib/studio/storage";
import ResultCards from "../../../../components/studio/ResultCards";
import GraphicsPanel from "../../../../components/studio/GraphicsPanel";

const PLATFORMS = [
  { id: "instagram", label: "Instagram" },
  { id: "facebook", label: "Facebook" },
  { id: "googleBusiness", label: "Google Business" },
  { id: "whatsapp", label: "WhatsApp" },
  { id: "sms", label: "SMS" },
];

const LOADING_LINES = [
  "Writing your posts…",
  "Matching your voice…",
  "Adding the finishing touches…",
];

function CreateInner() {
  const params = useSearchParams();
  const detailRef = useRef(null);
  const [profile, setProfile] = useState(null);
  const [ready, setReady] = useState(false);
  const [selected, setSelected] = useState(null);
  const [details, setDetails] = useState("");
  const [platforms, setPlatforms] = useState(["instagram", "facebook", "googleBusiness", "whatsapp"]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [content, setContent] = useState(null);
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    getProfile().then(setProfile);
    const pre = params.get("c");
    if (pre && getCampaign(pre)) {
      setSelected(pre);
      requestAnimationFrame(() => {
        detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!ready) return null;

  const campaign = selected ? getCampaign(selected) : null;

  function pick(id) {
    setSelected(id);
    setContent(null);
    setError("");
    setDetails("");
    requestAnimationFrame(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function togglePlatform(id) {
    setPlatforms((cur) =>
      cur.includes(id) ? cur.filter((p) => p !== id) : [...cur, id]
    );
  }

  async function generate() {
    if (!campaign) return;
    if (platforms.length === 0) {
      setError("Pick at least one platform.");
      return;
    }
    setError("");
    setBusy(true);
    setContent(null);
    const ticker = setInterval(
      () => setLineIndex((i) => (i + 1) % LOADING_LINES.length),
      1800
    );
    try {
      const data = await apiPost("/api/studio/generate", {
        profile: profile || {},
        campaignId: campaign.id,
        details,
        platforms,
      });
      setContent(data.content);
      try {
        await addHistory({
          ts: Date.now(),
          campaignId: campaign.id,
          campaignLabel: campaign.label,
          details,
          platforms,
          content: data.content,
        });
      } catch {
        // Non-fatal: the content still shows on screen even if saving
        // to history fails for some reason.
      }
    } catch (err) {
      setError(err.message);
    } finally {
      clearInterval(ticker);
      setBusy(false);
    }
  }

  return (
    <div>
      <div className="studio-eyebrow">Create</div>
      <h1 className="studio-page-title">What do you want to promote?</h1>
      <p className="studio-page-sub">
        Pick a campaign — the Studio writes ready-to-post content for every platform you
        choose, in your restaurant's voice.
      </p>

      {!profile?.name ? (
        <div className="studio-note">
          Your profile is empty, so posts will use [placeholders] instead of real details.{" "}
          <Link href="/studio/onboarding" style={{ textDecoration: "underline" }}>
            Set up your profile
          </Link>{" "}
          for much better results.
        </div>
      ) : null}

      {CAMPAIGN_CATEGORIES.map((cat) => (
        <div key={cat.id}>
          <h2 className="studio-section-title">{cat.label}</h2>
          <div className="studio-campaign-grid">
            {CAMPAIGNS.filter((c) => c.category === cat.id).map((c) => (
              <button
                type="button"
                key={c.id}
                className={`studio-tile${selected === c.id ? " selected" : ""}`}
                onClick={() => pick(c.id)}
              >
                <div className="studio-tile-label">{c.label}</div>
                <div className="studio-tile-tagline">{c.tagline}</div>
              </button>
            ))}
          </div>
        </div>
      ))}

      {campaign ? (
        <div className="studio-card" style={{ marginTop: 26 }} ref={detailRef}>
          <h2 style={{ fontSize: 20, marginBottom: 4 }}>{campaign.label}</h2>
          <p className="studio-help" style={{ marginBottom: 16 }}>
            {campaign.tagline}
          </p>

          <div className="studio-field">
            <label className="studio-label">
              Details for this campaign (optional, but makes it sharper)
              <textarea
                className="studio-textarea"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder={campaign.detailsPlaceholder}
              />
            </label>
            <div className="studio-help">
              Prices, dates, and offers only appear if you put them here — the Studio
              never makes them up.
            </div>
          </div>

          <div className="studio-field">
            <span className="studio-label">Write for</span>
            <div className="studio-checks">
              {PLATFORMS.map((p) => (
                <label
                  key={p.id}
                  className={`studio-check${platforms.includes(p.id) ? " on" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={platforms.includes(p.id)}
                    onChange={() => togglePlatform(p.id)}
                  />
                  {p.label}
                </label>
              ))}
            </div>
          </div>

          {error ? <div className="studio-alert">{error}</div> : null}

          {busy ? (
            <div className="studio-loader">
              <div className="studio-crescent" aria-hidden="true" />
              <div aria-live="polite">{LOADING_LINES[lineIndex]}</div>
            </div>
          ) : (
            <div className="studio-row">
              <button type="button" className="studio-btn primary" onClick={generate}>
                {content ? "Regenerate" : "Generate content"}
              </button>
              {content ? (
                <span className="studio-kicker">Saved to your history automatically.</span>
              ) : null}
            </div>
          )}
        </div>
      ) : null}

      {content ? (
        <div style={{ marginTop: 22 }}>
          <h2 className="studio-section-title">Ready to post</h2>
          <ResultCards content={content} profile={profile || {}} />
          <h2 className="studio-section-title">Matching promo graphics</h2>
          <p className="studio-page-sub" style={{ marginBottom: 14 }}>
            Three ready-to-post styles with your real details — download the one you
            like and attach it with your caption.
          </p>
          <GraphicsPanel profile={profile} campaign={campaign} details={details} />
        </div>
      ) : null}
    </div>
  );
}

export default function CreatePage() {
  return (
    <Suspense fallback={null}>
      <CreateInner />
    </Suspense>
  );
}
