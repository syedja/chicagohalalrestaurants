"use client";

import { useEffect, useState } from "react";
import { getProfile, apiPost } from "../../../lib/studio/storage";

export default function ReviewsPage() {
  const [profile, setProfile] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("5");
  const [tone, setTone] = useState("warm");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState("");

  useEffect(() => {
    setProfile(getProfile());
  }, []);

  async function generate() {
    if (reviewText.trim().length < 5) {
      setError("Paste the customer's review first.");
      return;
    }
    setError("");
    setBusy(true);
    setResult(null);
    try {
      const data = await apiPost("/api/studio/reviews", {
        profile: profile || {},
        reviewText,
        rating,
        tone,
      });
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function copy(text, which) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(which);
      setTimeout(() => setCopied(""), 1600);
    } catch {}
  }

  return (
    <div>
      <div className="studio-eyebrow">Reputation</div>
      <h1 className="studio-page-title">Review Replies</h1>
      <p className="studio-page-sub">
        Paste any Google, Yelp, or Facebook review and get a thoughtful owner response —
        gracious for the 5-stars, calm and constructive for the rough ones. You always
        review before posting.
      </p>

      <div className="studio-card" style={{ maxWidth: 680 }}>
        <div className="studio-field">
          <label className="studio-label">
            The customer's review
            <textarea
              className="studio-textarea"
              style={{ minHeight: 120 }}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Paste the review text here"
            />
          </label>
        </div>
        <div className="studio-form-grid">
          <div className="studio-field">
            <label className="studio-label">
              Star rating they gave
              <select className="studio-select" value={rating} onChange={(e) => setRating(e.target.value)}>
                <option value="5">5 stars</option>
                <option value="4">4 stars</option>
                <option value="3">3 stars</option>
                <option value="2">2 stars</option>
                <option value="1">1 star</option>
              </select>
            </label>
          </div>
          <div className="studio-field">
            <label className="studio-label">
              Tone
              <select className="studio-select" value={tone} onChange={(e) => setTone(e.target.value)}>
                <option value="warm">Warm & personal</option>
                <option value="professional">Professional</option>
                <option value="brief">Brief & gracious</option>
              </select>
            </label>
          </div>
        </div>
        {error ? <div className="studio-alert">{error}</div> : null}
        <button type="button" className="studio-btn primary" onClick={generate} disabled={busy}>
          {busy ? "Writing…" : "Draft my reply"}
        </button>
      </div>

      {result ? (
        <div style={{ marginTop: 22 }}>
          <div className="studio-result">
            <div className="studio-result-head">
              <span className="studio-result-platform">Full reply</span>
              <button type="button" className="studio-btn ghost small" onClick={() => copy(result.response, "full")}>
                {copied === "full" ? "Copied" : "Copy"}
              </button>
            </div>
            <div className="studio-result-body">{result.response}</div>
          </div>
          {result.short ? (
            <div className="studio-result">
              <div className="studio-result-head">
                <span className="studio-result-platform">Shorter version</span>
                <button type="button" className="studio-btn ghost small" onClick={() => copy(result.short, "short")}>
                  {copied === "short" ? "Copied" : "Copy"}
                </button>
              </div>
              <div className="studio-result-body">{result.short}</div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
