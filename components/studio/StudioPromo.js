// Homepage promo for the AI Marketing Studio — drop-in section styled to match
// the site's existing owner CTA blocks (like the Free Visibility Report one).
// Self-contained inline styles: no CSS imports, safe in any page.
//
// Usage in app/page.js:
//   import StudioPromo from "../components/studio/StudioPromo";
//   ...then place <StudioPromo /> near your other owner CTAs.

import Link from "next/link";

export default function StudioPromo() {
  return (
    <section
      style={{
        maxWidth: 880,
        margin: "28px auto",
        background: "#f0f7f1",
        border: "1px solid #cde4d2",
        borderRadius: 14,
        padding: "30px 26px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "inline-block",
          fontSize: 12.5,
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "#15803d",
          background: "#ffffff",
          border: "1px solid #cde4d2",
          borderRadius: 99,
          padding: "4px 12px",
          marginBottom: 12,
        }}
      >
        New · Premium feature
      </div>
      <h2
        style={{
          margin: "0 0 8px",
          color: "#14532d",
          fontSize: 24,
          letterSpacing: "-0.01em",
        }}
      >
        ✨ AI Marketing Studio for your restaurant
      </h2>
      <p
        style={{
          margin: "0 auto 18px",
          maxWidth: 560,
          color: "#4b5563",
          fontSize: 15.5,
          lineHeight: 1.6,
        }}
      >
        One-click Ramadan, Eid, Jummah, and catering campaigns — posts and branded
        promo graphics written in your restaurant&apos;s voice. Included with Premium
        listings.
      </p>
      <Link
        href="/marketing-studio"
        style={{
          display: "inline-block",
          background: "#15803d",
          color: "#ffffff",
          fontWeight: 600,
          fontSize: 15,
          borderRadius: 9,
          padding: "11px 22px",
          textDecoration: "none",
        }}
      >
        See how it works →
      </Link>
    </section>
  );
}
