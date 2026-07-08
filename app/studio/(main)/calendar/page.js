"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { upcomingOccasions, formatOccasionDate } from "../../../../lib/studio/occasions";

export default function CalendarPage() {
  const [occasions, setOccasions] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setOccasions(upcomingOccasions(new Date(), 12));
    setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <div>
      <div className="studio-eyebrow">Plan ahead</div>
      <h1 className="studio-page-title">Campaign Calendar</h1>
      <p className="studio-page-sub">
        The next twelve months of moments that fill halal restaurants — plan each one with
        a single click. The best campaigns go out one to two weeks early.
      </p>

      <div className="studio-card" style={{ marginBottom: 18 }}>
        <div className="studio-occasion" style={{ borderBottom: "none", padding: "4px 0" }}>
          <div className="studio-occasion-date">Every Friday</div>
          <div className="studio-occasion-body">
            <span className="studio-occasion-name">Jummah lunch</span>
            <p className="studio-occasion-note">
              Your most reliable weekly rush — post Thursday evening or Friday morning.
            </p>
          </div>
          <Link href="/studio/create?c=jummah-lunch" className="studio-btn ghost small">
            Plan it
          </Link>
        </div>
      </div>

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
              {o.approximate ? (
                <span className="studio-approx">approx. — moonsighting</span>
              ) : null}
              <p className="studio-occasion-note">{o.note}</p>
            </div>
            <Link href={`/studio/create?c=${o.campaignId}`} className="studio-btn ghost small">
              Plan it
            </Link>
          </div>
        ))}
      </div>

      <div className="studio-note">
        Islamic dates follow the lunar calendar and are approximate until confirmed by
        moonsighting — double-check with your local community before publishing a dated
        offer.
      </div>
    </div>
  );
}
