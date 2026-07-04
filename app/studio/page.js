"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProfile, getHistory, profileCompleteness } from "../../lib/studio/storage";
import { CAMPAIGNS } from "../../lib/studio/campaigns";
import { upcomingOccasions, formatOccasionDate } from "../../lib/studio/occasions";

const FEATURED = ["todays-special", "jummah-lunch", "ramadan-iftar", "catering-corporate"];

export default function StudioDashboard() {
  const [profile, setProfile] = useState(null);
  const [history, setHistory] = useState([]);
  const [occasions, setOccasions] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProfile(getProfile());
    setHistory(getHistory().slice(0, 3));
    setOccasions(upcomingOccasions(new Date(), 12).slice(0, 3));
    setReady(true);
  }, []);

  if (!ready) return null;

  const completeness = profileCompleteness(profile);

  return (
    <div>
      {profile?.name ? (
        <div className="studio-hero">
          <div className="studio-eyebrow" style={{ color: "#e8cf8a" }}>
            Marketing Studio
          </div>
          <h1>{profile.name}</h1>
          <p>
            Pick what you want to promote — the Studio already knows your menu, your voice,
            and your neighborhood, and writes ready-to-post content in seconds.
          </p>
          <div className="studio-row">
            <Link href="/studio/create" className="studio-btn primary">
              Create content
            </Link>
            <Link href="/studio/calendar" className="studio-btn on-dark">
              See what's coming up
            </Link>
          </div>
        </div>
      ) : (
        <div className="studio-hero">
          <div className="studio-eyebrow" style={{ color: "#e8cf8a" }}>
            Welcome to your marketing studio
          </div>
          <h1>Set up in about 60 seconds</h1>
          <p>
            Paste your website and the Studio learns your restaurant — menu, story, voice —
            then writes your marketing for you. No website? Fill in a short profile instead.
          </p>
          <div className="studio-row">
            <Link href="/studio/onboarding" className="studio-btn primary">
              Start with my website
            </Link>
            <Link href="/studio/profile" className="studio-btn on-dark">
              Fill in profile manually
            </Link>
          </div>
        </div>
      )}

      {profile?.name && completeness < 80 ? (
        <div className="studio-card" style={{ marginBottom: 22 }}>
          <div className="studio-row" style={{ marginBottom: 10 }}>
            <strong>Profile {completeness}% complete</strong>
            <div className="studio-spacer" />
            <Link href="/studio/profile" className="studio-btn ghost small">
              Finish profile
            </Link>
          </div>
          <div className="studio-progress">
            <span style={{ width: `${completeness}%` }} />
          </div>
          <div className="studio-help" style={{ marginTop: 8 }}>
            The more the Studio knows, the better every post gets — hours, dishes, and
            ordering links make the biggest difference.
          </div>
        </div>
      ) : null}

      <h2 className="studio-section-title">Quick campaigns</h2>
      <div className="studio-campaign-grid">
        {FEATURED.map((id) => {
          const c = CAMPAIGNS.find((x) => x.id === id);
          if (!c) return null;
          return (
            <Link key={id} href={`/studio/create?c=${id}`} className="studio-tile">
              <div className="studio-tile-label">{c.label}</div>
              <div className="studio-tile-tagline">{c.tagline}</div>
            </Link>
          );
        })}
      </div>

      <h2 className="studio-section-title">Coming up</h2>
      <div className="studio-card">
        {occasions.map((o, i) => (
          <div className="studio-occasion" key={i}>
            <div className="studio-occasion-date">
              {formatOccasionDate(o.date)}
              <span className="studio-occasion-days">
                {o.daysAway === 0 ? "today" : `in ${o.daysAway} days`}
              </span>
            </div>
            <div className="studio-occasion-body">
              <span className="studio-occasion-name">{o.name}</span>
              {o.approximate ? <span className="studio-approx">approx. — moonsighting</span> : null}
              <p className="studio-occasion-note">{o.note}</p>
            </div>
            <Link href={`/studio/create?c=${o.campaignId}`} className="studio-btn ghost small">
              Plan it
            </Link>
          </div>
        ))}
        <div className="studio-row" style={{ marginTop: 12 }}>
          <Link href="/studio/calendar" className="studio-btn ghost small">
            Full calendar
          </Link>
        </div>
      </div>

      {history.length > 0 ? (
        <>
          <h2 className="studio-section-title">Recent work</h2>
          <div className="studio-card">
            {history.map((h) => (
              <div className="studio-history-item" key={h.id}>
                <div className="studio-row">
                  <strong>{h.campaignLabel}</strong>
                  <span className="studio-kicker">
                    {new Date(h.ts).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            ))}
            <div className="studio-row" style={{ marginTop: 12 }}>
              <Link href="/studio/history" className="studio-btn ghost small">
                View all history
              </Link>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
