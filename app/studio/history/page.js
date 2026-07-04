"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getHistory, deleteHistory, clearHistory } from "../../../lib/studio/storage";
import ResultCards from "../../../components/studio/ResultCards";

export default function HistoryPage() {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setItems(getHistory());
    setReady(true);
  }, []);

  if (!ready) return null;

  function remove(id) {
    deleteHistory(id);
    setItems(getHistory());
    if (open === id) setOpen(null);
  }

  function removeAll() {
    if (typeof window !== "undefined" && window.confirm("Delete all saved history?")) {
      clearHistory();
      setItems([]);
      setOpen(null);
    }
  }

  return (
    <div>
      <div className="studio-eyebrow">Your library</div>
      <h1 className="studio-page-title">History</h1>
      <p className="studio-page-sub">
        Everything the Studio has written for you, saved on this device. Reopen any
        campaign to copy its content again.
      </p>

      {items.length === 0 ? (
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
                  <button
                    type="button"
                    className="studio-btn ghost small"
                    onClick={() => remove(h.id)}
                  >
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
              Clear all history
            </button>
          </div>
        </>
      )}
    </div>
  );
}
