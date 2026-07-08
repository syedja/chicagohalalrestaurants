"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  GRAPHIC_TEMPLATES,
  GRAPHIC_FORMATS,
  drawGraphic,
  downloadCanvas,
} from "../../lib/studio/graphics";

function deriveHeadline(details, profile, campaign) {
  const d = String(details || "").trim();
  if (d) {
    const first = d.split(/[,.\n–—]/)[0].trim();
    if (first && first.length <= 42) return first;
    if (first) return first.slice(0, 42).trim();
  }
  if (profile?.popularDishes?.length) return profile.popularDishes[0];
  return campaign?.label || "Today's Special";
}

function slug(text) {
  return (
    String(text || "graphic")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "graphic"
  );
}

export default function GraphicsPanel({ profile, campaign, details }) {
  const canvasRefs = useRef({});
  const [formatId, setFormatId] = useState("square");
  const [eyebrow, setEyebrow] = useState(campaign?.label || "Today's Special");
  const [headline, setHeadline] = useState(() => deriveHeadline(details, profile, campaign));
  const [subline, setSubline] = useState(() => {
    const d = String(details || "").trim();
    if (d && d.length > 42) return d;
    return campaign?.tagline || "";
  });
  const [cta, setCta] = useState("Dine in or order online");
  const [logoImg, setLogoImg] = useState(null);
  const [downloaded, setDownloaded] = useState("");

  // Re-seed the text fields when the owner switches campaigns.
  useEffect(() => {
    setEyebrow(campaign?.label || "Today's Special");
    setHeadline(deriveHeadline(details, profile, campaign));
    const d = String(details || "").trim();
    setSubline(d && d.length > 42 ? d : campaign?.tagline || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaign?.id]);

  const format = useMemo(
    () => GRAPHIC_FORMATS.find((f) => f.id === formatId) || GRAPHIC_FORMATS[0],
    [formatId]
  );

  const restaurantName = profile?.name || "";
  const contact = [
    profile?.phone,
    (profile?.website || "").replace(/^https?:\/\//, "").replace(/\/$/, ""),
  ]
    .filter(Boolean)
    .join("  ·  ");

  useEffect(() => {
    for (const t of GRAPHIC_TEMPLATES) {
      const canvas = canvasRefs.current[t.id];
      if (!canvas) continue;
      drawGraphic(canvas, {
        template: t,
        format,
        eyebrow,
        headline,
        subline,
        restaurantName,
        contact,
        cta,
        logoImg,
      });
    }
  }, [format, eyebrow, headline, subline, restaurantName, contact, cta, logoImg]);

  function onLogoFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => setLogoImg(img);
    img.src = url;
  }

  function download(templateId) {
    const canvas = canvasRefs.current[templateId];
    if (!canvas) return;
    downloadCanvas(canvas, `${slug(headline)}-${templateId}-${format.id}.png`);
    setDownloaded(templateId);
    setTimeout(() => setDownloaded(""), 1600);
  }

  return (
    <div className="studio-card">
      <div className="studio-field">
        <span className="studio-label">Size</span>
        <div className="studio-pills">
          {GRAPHIC_FORMATS.map((f) => (
            <button
              type="button"
              key={f.id}
              className={`studio-pill${formatId === f.id ? " on" : ""}`}
              onClick={() => setFormatId(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="studio-form-grid">
        <div className="studio-field">
          <label className="studio-label">
            Top label
            <input className="studio-input" value={eyebrow} onChange={(e) => setEyebrow(e.target.value)} />
          </label>
        </div>
        <div className="studio-field">
          <label className="studio-label">
            Headline
            <input className="studio-input" value={headline} onChange={(e) => setHeadline(e.target.value)} />
          </label>
        </div>
        <div className="studio-field">
          <label className="studio-label">
            Supporting line
            <input className="studio-input" value={subline} onChange={(e) => setSubline(e.target.value)} />
          </label>
        </div>
        <div className="studio-field">
          <label className="studio-label">
            Button text
            <input className="studio-input" value={cta} onChange={(e) => setCta(e.target.value)} />
          </label>
        </div>
        <div className="studio-field full">
          <label className="studio-label">
            Logo (optional)
            <input type="file" accept="image/*" onChange={onLogoFile} className="studio-input" />
          </label>
          <div className="studio-help">
            Shown as a round badge on all three styles. Square logos look best.
          </div>
        </div>
      </div>

      <div className="studio-graphic-trio">
        {GRAPHIC_TEMPLATES.map((t) => (
          <div className="studio-graphic-item" key={t.id}>
            <canvas
              ref={(el) => {
                canvasRefs.current[t.id] = el;
              }}
              aria-label={`${t.label} promo graphic preview`}
            />
            <div className="studio-row" style={{ marginTop: 10 }}>
              <span className="studio-graphic-label">{t.label}</span>
              <div className="studio-spacer" />
              <button
                type="button"
                className="studio-btn primary small"
                onClick={() => download(t.id)}
              >
                {downloaded === t.id ? "Downloaded" : "Download PNG"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="studio-kicker" style={{ marginTop: 12 }}>
        {format.w}×{format.h}px — post the image with your caption on any platform.
      </div>

      {!restaurantName ? (
        <div className="studio-note">
          Add your restaurant name in the Profile so it appears on the graphics.
        </div>
      ) : null}
    </div>
  );
}
