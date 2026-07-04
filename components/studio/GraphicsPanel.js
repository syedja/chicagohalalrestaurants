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
  return String(text || "graphic")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40) || "graphic";
}

export default function GraphicsPanel({ profile, campaign, details }) {
  const canvasRef = useRef(null);
  const [templateId, setTemplateId] = useState("emerald");
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

  // Re-seed the text fields when the owner switches campaigns.
  useEffect(() => {
    setEyebrow(campaign?.label || "Today's Special");
    setHeadline(deriveHeadline(details, profile, campaign));
    const d = String(details || "").trim();
    setSubline(d && d.length > 42 ? d : campaign?.tagline || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaign?.id]);

  const template = useMemo(
    () => GRAPHIC_TEMPLATES.find((t) => t.id === templateId) || GRAPHIC_TEMPLATES[0],
    [templateId]
  );
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
    if (!canvasRef.current) return;
    drawGraphic(canvasRef.current, {
      template,
      format,
      eyebrow,
      headline,
      subline,
      restaurantName,
      contact,
      cta,
      logoImg,
    });
  }, [template, format, eyebrow, headline, subline, restaurantName, contact, cta, logoImg]);

  function onLogoFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => setLogoImg(img);
    img.src = url;
  }

  function download() {
    if (!canvasRef.current) return;
    downloadCanvas(canvasRef.current, `${slug(headline)}-${format.id}.png`);
  }

  return (
    <div className="studio-card">
      <div className="studio-graphics-grid">
        <div>
          <div className="studio-field">
            <span className="studio-label">Style</span>
            <div className="studio-pills">
              {GRAPHIC_TEMPLATES.map((t) => (
                <button
                  type="button"
                  key={t.id}
                  className={`studio-pill${templateId === t.id ? " on" : ""}`}
                  onClick={() => setTemplateId(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

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
          <div className="studio-field">
            <label className="studio-label">
              Logo (optional)
              <input type="file" accept="image/*" onChange={onLogoFile} className="studio-input" />
            </label>
            <div className="studio-help">
              Shown as a round badge. Square logos look best.
            </div>
          </div>
        </div>

        <div>
          <div className="studio-canvas-wrap">
            <canvas ref={canvasRef} aria-label="Promo graphic preview" />
          </div>
          <div className="studio-row" style={{ marginTop: 14 }}>
            <button type="button" className="studio-btn primary" onClick={download}>
              Download PNG
            </button>
            <span className="studio-kicker">
              {format.w}×{format.h}px — ready to post
            </span>
          </div>
          {!restaurantName ? (
            <div className="studio-note">
              Add your restaurant name in the Profile so it appears on the graphic.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
