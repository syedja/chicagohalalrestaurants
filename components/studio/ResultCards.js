"use client";

import { useState } from "react";

const ORDER = ["instagram", "facebook", "googleBusiness", "whatsapp", "sms"];

const PLATFORMS = {
  instagram: {
    label: "Instagram",
    open: "Open Instagram",
    prefills: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" /></svg>
    ),
  },
  facebook: {
    label: "Facebook",
    open: "Open Facebook",
    prefills: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 8h2.5V4.5H14A4.5 4.5 0 0 0 9.5 9v2H7v3.5h2.5v6h3.5v-6h2.6l.6-3.5H13V9a1 1 0 0 1 1-1Z" /></svg>
    ),
  },
  googleBusiness: {
    label: "Google Business",
    open: "Open Google Business",
    prefills: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 9.5 5.5 4h13L20 9.5" /><path d="M4 9.5a2.6 2.6 0 0 0 5.2 0 2.7 2.7 0 0 0 5.6 0 2.6 2.6 0 0 0 5.2 0" /><path d="M5 12v8h14v-8" /><path d="M13.5 20v-5h-3v5" /></svg>
    ),
  },
  whatsapp: {
    label: "WhatsApp",
    open: "Send on WhatsApp",
    prefills: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3Z" /><path d="M8.8 9.2c.3 2.7 3.3 5.6 6 6l1.4-1.4-2-1.2-1 .7c-.9-.5-1.9-1.5-2.4-2.4l.7-1-1.3-2-1.4 1.3Z" /></svg>
    ),
  },
  sms: {
    label: "SMS",
    open: "Open Messages",
    prefills: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a8 8 0 0 1-8 8H4l2-3a8 8 0 1 1 15-5Z" /></svg>
    ),
  },
};

function hrefFor(key, text, profile) {
  switch (key) {
    case "whatsapp":
      return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    case "sms":
      return `sms:?&body=${encodeURIComponent(text)}`;
    case "facebook": {
      const f = profile?.socials?.facebook || "";
      return /^https?:\/\//i.test(f) ? f : "https://www.facebook.com/";
    }
    case "instagram":
      return "https://www.instagram.com/";
    case "googleBusiness":
      return "https://business.google.com/";
    default:
      return null;
  }
}

function textFor(key, block) {
  if (!block) return "";
  if (key === "instagram") {
    const tags = (block.hashtags || []).map((t) => `#${String(t).replace(/^#/, "")}`).join(" ");
    return [block.caption || "", tags].filter(Boolean).join("\n\n");
  }
  return block.caption || block.post || block.message || "";
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="studio-btn ghost small"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {}
      }}
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function OpenButton({ platformKey, text, profile, onOpened }) {
  const meta = PLATFORMS[platformKey];
  const href = hrefFor(platformKey, text, profile);
  if (!href) return null;

  async function handleClick() {
    // Always copy first, so the caption is on the clipboard even for
    // platforms that pre-fill (belt and suspenders).
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
    onOpened?.();
    if (platformKey === "sms") {
      // sms: links don't open in a new tab; navigate directly (works on
      // mobile; on desktop it may hand off to a messages app if present).
      window.location.href = href;
    } else {
      window.open(href, "_blank", "noopener");
    }
  }

  return (
    <button type="button" className="studio-btn ghost small studio-open-btn" onClick={handleClick}>
      {meta.icon}
      {meta.open}
    </button>
  );
}

export default function ResultCards({ content, profile = {} }) {
  const [openedNote, setOpenedNote] = useState("");
  if (!content) return null;
  const hasPlaceholders = /\[[^\]]{1,40}\]/.test(JSON.stringify(content));

  return (
    <div>
      {hasPlaceholders ? (
        <div className="studio-note">
          Anything in [square brackets] is a detail the AI didn't have — fill it in before
          posting. It never invents prices or offers for you.
        </div>
      ) : null}
      {ORDER.filter((k) => content[k]).map((key) => {
        const block = content[key];
        const text = textFor(key, block);
        const meta = PLATFORMS[key];
        return (
          <div className="studio-result" key={key}>
            <div className="studio-result-head">
              <span className="studio-result-platform">{meta.label}</span>
              <span className="studio-row" style={{ gap: 6 }}>
                <CopyButton text={text} />
                <OpenButton
                  platformKey={key}
                  text={text}
                  profile={profile}
                  onOpened={() => {
                    setOpenedNote(key);
                    setTimeout(() => setOpenedNote(""), 4000);
                  }}
                />
              </span>
            </div>
            <div className="studio-result-body">
              {key === "instagram" ? block.caption : text}
            </div>
            {key === "instagram" && (block.hashtags || []).length > 0 ? (
              <div className="studio-hashtags">
                {block.hashtags.map((t, i) => (
                  <span className="studio-hashtag" key={i}>
                    #{String(t).replace(/^#/, "")}
                  </span>
                ))}
              </div>
            ) : null}
            {openedNote === key && !meta.prefills ? (
              <div className="studio-result-meta">
                Caption copied — paste it when {meta.label} opens. ({meta.label} doesn't
                allow pre-filled posts.)
              </div>
            ) : null}
            {key === "sms" ? (
              <div className="studio-result-meta">{text.length} characters</div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
