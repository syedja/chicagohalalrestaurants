"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getHistory,
  deleteHistory,
  clearHistory,
  getReviewHistory,
  deleteReviewHistory,
  clearReviewHistory,
} from "../../../../lib/studio/storage";
import ResultCards from "../../../../components/studio/ResultCards";

export default function HistoryPage() {
  const [tab, setTab] = useState("posts"); // posts | reviews
  const [items, setItems] = useState([]);
  const [reviewItems, setReviewItems] = useState([]);
  const [open, setOpen] = useState(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const [h, r] = await Promise.all([getHistory(), getReviewHistory()]);
      if (cancelled) return;
      setItems(h);
      setReviewItems(r);
      setReady(true);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready) return null;

  async function remove(id) {
    setError("");
    try {
      await deleteHistory(id);
      setItems(await getHistory());
      if (open === id) setOpen(null);
    } catch (err) {
      setError(err.message || "Couldn't delete that.");
    }
  }

  async function removeAll() {
    if (typeof window === "undefined" || !window.confirm("Delete all saved posts?")) return;
    setError("");
    try {
      await clearHistory();
      setItems([]);
      setOpen(null);
    } catch (err) {
      setError(err.message || "Couldn't clear history.");
    }
  }

  async function removeReview(id) {
    setError("");
    try {
      await deleteReviewHistory(id);
      setReviewItems(await getReviewHistory());
      if (open === id) setOpen(null);
    } catch (err) {
      setError(err.message || "Couldn't delete that.");
    }
  }

  async function removeAllReviews() {
    if (typeof window === "undefined" || !window.confirm("Delete all saved review replies?")) return;
    setError("");
    try {
      await clearReviewHistory();
      setReviewItems([]);
      setOpen(null);
    } catch (err) {
      setError(err.message || "Couldn't clear review history.");
    }
  }

  return (
    <div>
      <div className="studio-eyebrow">Your library</div>
      <h1 className="studio-page-title">History</h1>
      <p className="studio-page-sub">
        Everything the Studio has written for you, saved to your account — available
        from any device you log in on.
      </p>

      <div className="studio-row" style={{ marginBottom: 18 }}>
        <button
          type="button"
          className={`studio-btn ${tab === "posts" ? "primary" : "ghost"} small`}
          onClick={() => setTab("posts")}
        >
          Posts ({items.length})
        </button>
        <button
          type="button"
          className={`studio-btn ${tab === "reviews" ? "primary" : "ghost"} small`}
          onClick={() => setTab("reviews")}
        >
          Review replies ({reviewItems.length})
        </button>
      </div>

      {error ? <div className="studio-alert">{error}</div> : null}

      {tab === "posts" ? (
        items.length === 0 ? (
          <div className="studio-card studio-empty">
            <h3>Nothing here yet</h3>
            <p>Your generated campaigns will collect here automatically.</p>
            <Link href="/studio/create" className="studio-btn primary" style={{ marginTop: 10 }}>
              Create your first campaign
            </Link>
          </div>
        ) : (
          <>
            <div className="studio-card">
              {items.map((h) => (
                <div className="studio-history-item" key={h.id}>
                  <div className="studio-row">
                    <div>
                      <strong>{h.campaignLabel}</strong>
                      <div className="studio-kicker">
                        {new Date(h.ts).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "long",
                          day: "numeric",
                        })}
                        {h.platforms?.length ? ` · ${h.platforms.length} platforms` : ""}
                      </div>
                    </div>
                    <div className="studio-spacer" />
                    <button
                      type="button"
                      className="studio-btn ghost small"
                      onClick={() => setOpen(open === h.id ? null : h.id)}
                    >
                      {open === h.id ? "Close" : "View"}
                    </button>
                    <button type="button" className="studio-btn ghost small" onClick={() => remove(h.id)}>
                      Delete
                    </button>
                  </div>
                  {open === h.id ? (
                    <div style={{ marginTop: 14 }}>
                      {h.details ? (
                        <div className="studio-kicker" style={{ marginBottom: 10 }}>
                          Notes: {h.details}
                        </div>
                      ) : null}
                      <ResultCards content={h.content} />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="studio-row" style={{ marginTop: 14 }}>
              <button type="button" className="studio-btn ghost small" onClick={removeAll}>
                Clear all posts
              </button>
            </div>
          </>
        )
      ) : reviewItems.length === 0 ? (
        <div className="studio-card studio-empty">
          <h3>No review replies yet</h3>
          <p>Drafted replies from the Review Replies page will collect here.</p>
          <Link href="/studio/reviews" className="studio-btn primary" style={{ marginTop: 10 }}>
            Draft your first reply
          </Link>
        </div>
      ) : (
        <>
          <div className="studio-card">
            {reviewItems.map((r) => (
              <div className="studio-history-item" key={r.id}>
                <div className="studio-row">
                  <div>
                    <strong>
                      {r.rating ? `${r.rating}★ review` : "Review"}
                      {r.reviewText ? ` — "${r.reviewText.slice(0, 40)}${r.reviewText.length > 40 ? "…" : ""}"` : ""}
                    </strong>
                    <div className="studio-kicker">
                      {new Date(r.ts).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                  <div className="studio-spacer" />
                  <button
                    type="button"
                    className="studio-btn ghost small"
                    onClick={() => setOpen(open === r.id ? null : r.id)}
                  >
                    {open === r.id ? "Close" : "View"}
                  </button>
                  <button
                    type="button"
                    className="studio-btn ghost small"
                    onClick={() => removeReview(r.id)}
                  >
                    Delete
                  </button>
                </div>
                {open === r.id ? (
                  <div style={{ marginTop: 14 }}>
                    <div className="studio-result">
                      <div className="studio-result-head">
                        <span className="studio-result-platform">Your reply</span>
                      </div>
                      <div className="studio-result-body">{r.response}</div>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          <div className="studio-row" style={{ marginTop: 14 }}>
            <button type="button" className="studio-btn ghost small" onClick={removeAllReviews}>
              Clear all review replies
            </button>
          </div>
        </>
      )}
    </div>
  );
}
