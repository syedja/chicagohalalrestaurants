// Public, indexable landing page that sells the Studio.
// The Studio tool itself (/studio) stays noindex — this page is what
// Google and AI answer engines see and cite.

import Link from "next/link";
import "./marketing-studio.css";

export const metadata = {
  title: "AI Marketing Studio for Halal Restaurants | Chicago Halal Restaurants",
  description:
    "RestaurantAI Studio writes your Instagram, Facebook, Google Business, and WhatsApp marketing — plus branded promo graphics — built for halal restaurants. Included with Premium listings on Chicago Halal Restaurants.",
  alternates: {
    canonical: "https://www.chicagohalalrestaurants.com/marketing-studio",
  },
  openGraph: {
    title: "AI Marketing Studio for Halal Restaurants",
    description:
      "One-click Ramadan, Eid, Jummah, and catering campaigns — posts and branded graphics written in your restaurant's voice.",
    url: "https://www.chicagohalalrestaurants.com/marketing-studio",
    type: "website",
  },
};

const FAQS = [
  {
    q: "What is RestaurantAI Studio?",
    a: "RestaurantAI Studio is an AI marketing tool for halal restaurants, included with Premium listings on ChicagoHalalRestaurants.com. It learns your restaurant from your website or profile, then writes ready-to-post Instagram captions, Facebook posts, Google Business updates, WhatsApp messages, and SMS — and creates branded promo graphics with your real details.",
  },
  {
    q: "How is it different from using ChatGPT or other AI tools?",
    a: "The Studio already knows your restaurant — your menu, hours, halal certification, and voice — so there are no prompts to write. It includes one-click campaigns built for halal restaurants specifically, like Ramadan iftar specials, Eid celebrations, and Jummah lunch, plus a 12-month campaign calendar. It also never invents prices, offers, or certifications: missing details appear as placeholders for you to fill in.",
  },
  {
    q: "Does it post to social media automatically?",
    a: "Not yet. The Studio writes the content and creates the graphics; you review everything and post it yourself with one-tap copy buttons and PNG downloads. Publishing integrations are on the roadmap.",
  },
  {
    q: "How do I get access?",
    a: "The Studio is included with a Premium listing on ChicagoHalalRestaurants.com. Visit the Advertise page to see plans, or start with the free Restaurant Visibility Report to see how your listing performs today.",
  },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "RestaurantAI Marketing Studio",
        serviceType: "AI marketing content for restaurants",
        provider: {
          "@type": "Organization",
          name: "Chicago Halal Restaurants",
          url: "https://www.chicagohalalrestaurants.com",
        },
        areaServed: "Chicago metropolitan area",
        audience: {
          "@type": "Audience",
          audienceType: "Halal restaurant owners",
        },
        description:
          "AI-written social posts, WhatsApp messages, review replies, and branded promo graphics for halal restaurants, included with Premium directory listings.",
        url: "https://www.chicagohalalrestaurants.com/marketing-studio",
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

export default function MarketingStudioPage() {
  return (
    <main className="ms-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      <section className="ms-hero">
        <div className="ms-badge">Included with Premium listings</div>
        <h1>Your restaurant&apos;s marketing, written for you</h1>
        <p>
          RestaurantAI Studio learns your restaurant — menu, story, voice — and writes
          your Instagram, Facebook, Google Business, and WhatsApp content in seconds.
          Built for halal restaurants, with Ramadan, Eid, and Jummah campaigns ready to
          go.
        </p>
        <div className="ms-row">
          <Link href="/advertise" className="ms-btn primary">
            See Premium plans
          </Link>
          <Link href="/grade" className="ms-btn ghost">
            Start with a free visibility report
          </Link>
        </div>
      </section>

      <section className="ms-section">
        <h2>What it does</h2>
        <div className="ms-features">
          <div className="ms-feature">
            <h3>One-click campaigns</h3>
            <p>
              Today&apos;s Special, Jummah Lunch, Ramadan Iftar, Eid, corporate catering
              and more — pick a campaign and get ready-to-post content for every
              platform at once.
            </p>
          </div>
          <div className="ms-feature">
            <h3>Branded promo graphics</h3>
            <p>
              Downloadable images with your real dish names, colors, and logo — sized
              for Instagram posts, WhatsApp status, and Facebook. No fake AI food
              photos.
            </p>
          </div>
          <div className="ms-feature">
            <h3>A halal campaign calendar</h3>
            <p>
              Twelve months of the moments that fill halal restaurants — Ramadan prep,
              both Eids, Mother&apos;s Day, Thanksgiving catering — each plannable in one
              click.
            </p>
          </div>
          <div className="ms-feature">
            <h3>Review replies</h3>
            <p>
              Paste any Google or Yelp review and get a thoughtful owner response —
              gracious for the five-stars, calm and constructive for the rough ones.
            </p>
          </div>
        </div>
      </section>

      <section className="ms-section">
        <h2>How it works</h2>
        <ol className="ms-steps">
          <li>
            <strong>Point it at your website.</strong> The Studio reads your site and
            builds your restaurant profile — you review and approve everything.
          </li>
          <li>
            <strong>Pick what to promote.</strong> Choose a campaign, add any details
            like prices or dates, and select your platforms.
          </li>
          <li>
            <strong>Copy, download, post.</strong> Captions with one-tap copy, graphics
            as ready-sized PNGs. You stay in control of what goes out.
          </li>
        </ol>
        <p className="ms-fine">
          The Studio never invents prices, discounts, hours, or certifications — any
          detail you haven&apos;t provided appears as a visible placeholder for you to
          fill in before posting.
        </p>
      </section>

      <section className="ms-section">
        <h2>Frequently asked questions</h2>
        {FAQS.map((f, i) => (
          <details className="ms-faq" key={i}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </section>

      <section className="ms-cta">
        <h2>Own a halal restaurant?</h2>
        <p>
          The Studio is included with Premium listings on ChicagoHalalRestaurants.com.
        </p>
        <div className="ms-row">
          <Link href="/advertise" className="ms-btn primary">
            View plans &amp; pricing
          </Link>
        </div>
      </section>
    </main>
  );
}
