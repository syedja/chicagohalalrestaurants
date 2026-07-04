"use client";

import { useState } from "react";

const ORDER = ["instagram", "facebook", "googleBusiness", "whatsapp", "sms"];
const LABELS = {
  instagram: "Instagram",
  facebook: "Facebook",
  googleBusiness: "Google Business",
  whatsapp: "WhatsApp",
  sms: "SMS",
};

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

export default function ResultCards({ content }) {
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
        return (
          <div className="studio-result" key={key}>
            <div className="studio-result-head">
              <span className="studio-result-platform">{LABELS[key]}</span>
              <CopyButton text={text} />
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
            {key === "sms" ? (
              <div className="studio-result-meta">{text.length} characters</div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
