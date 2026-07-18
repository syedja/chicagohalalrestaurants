'use client';

import { useMemo, useRef, useState } from 'react';

/**
 * RestaurantDirectory — chicagohalalrestaurants.com one-pager
 *
 * Data contract (app/data/restaurants.json — plain array):
 *   name, address, neighborhood (slug), zip, cuisine (slug),
 *   rating, certified_halal (bool), family_friendly, delivery_available
 *   Optional future fields: tier ("free"|"featured"|"premium"), slug
 *
 * NOTE ON DUPLICATE NAMES: chains (The Halal Guys, Pita Inn, ...) appear
 * at multiple addresses, so name-derived slugs collide. React keys here
 * use slug+index (safe). BEFORE building /restaurantname Premium pages,
 * duplicate slugs must be made unique in the data (e.g. append location:
 * "the-halal-guys-loop", "the-halal-guys-skokie").
 */

const LATTICE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='72' height='72' viewBox='0 0 72 72'%3E%3Cg fill='none' stroke='%23c9a227' stroke-width='1'%3E%3Cpath d='M36 6L43 29L66 36L43 43L36 66L29 43L6 36L29 29Z'/%3E%3Ccircle cx='36' cy='36' r='4'/%3E%3C/g%3E%3C/svg%3E")`;

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function prettify(slug) {
  if (!slug) return '';
  return slug
    .split('-')
    .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ');
}

function slugify(str) {
  return (str || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function normalize(r, i) {
  return {
    id: `${slugify(r.name)}-${i}`, // unique even for chains
    name: r.name ?? 'Unnamed Restaurant',
    cuisine: prettify(r.cuisine ?? 'halal'),
    cuisineRaw: r.cuisine ?? 'halal',
    neighborhood: prettify(r.neighborhood ?? ''),
    certifiedHalal: r.certified_halal ?? false,
    address: r.address ?? '',
    rating: typeof r.rating === 'number' ? r.rating : null,
    tier: r.tier ?? 'free',
    slug: r.slug ?? slugify(r.name),
  };
}

function initialOf(name) {
  const c = (name || '').trim()[0]?.toUpperCase() ?? '#';
  return /[A-Z]/.test(c) ? c : '#';
}

function mapsUrl(address) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export default function RestaurantDirectory({ restaurants = [] }) {
  const [query, setQuery] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState('All');
  const [expanded, setExpanded] = useState(null);
  const mainRef = useRef(null);

  const data = useMemo(() => restaurants.map(normalize), [restaurants]);

  const cuisines = useMemo(() => {
    const map = new Map();
    for (const r of data) {
      map.set(r.cuisineRaw, { label: r.cuisine, count: (map.get(r.cuisineRaw)?.count ?? 0) + 1 });
    }
    return Array.from(map, ([value, { label, count }]) => ({ value, label, count }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [data]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data
      .filter((r) => cuisineFilter === 'All' || r.cuisineRaw === cuisineFilter)
      .filter((r) => !q || r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [data, query, cuisineFilter]);

  const grouped = useMemo(() => {
    const map = new Map();
    for (const r of filtered) {
      const letter = initialOf(r.name);
      if (!map.has(letter)) map.set(letter, []);
      map.get(letter).push(r);
    }
    return map;
  }, [filtered]);

  const activeLetters = useMemo(() => new Set(grouped.keys()), [grouped]);
  const orderedLetters = [
    ...LETTERS.filter((l) => activeLetters.has(l)),
    ...(activeLetters.has('#') ? ['#'] : []),
  ];

  const jumpTo = (letter) => {
    const el = document.getElementById(`letter-${letter}`);
    if (el) el.scrollIntoView({ block: 'start' });
  };

  return (
    <div className="chd">
      {/* ============ HERO ============ */}
      <header className="hero">
        <div className="hero-lattice" aria-hidden="true" />
        <div className="hero-inner">
          <p className="hero-eyebrow">Halal Restaurants · Chicago &amp; Suburbs</p>
          <h1 className="hero-title">
            Find Halal Restaurants<br />
            Across <em>Chicagoland.</em>
          </h1>
          <p className="hero-sub">
            {data.length} restaurants across {cuisines.length} cuisines — alphabetical, searchable, and all in one place — and counting…
          </p>
          <p className="hero-disclaimer">
            (Zabihah halal status should be verified directly with each restaurant.)
          </p>

          <div className="searchwrap" role="search">
            <svg className="search-icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
              <line x1="15.5" y1="15.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search a restaurant or a cuisine…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search restaurants by name or cuisine"
            />
            {query && (
              <button className="search-clear" onClick={() => setQuery('')} aria-label="Clear search">
                ✕
              </button>
            )}
          </div>

          <div className="chips" role="group" aria-label="Filter by cuisine">
            <button
              className={`chip ${cuisineFilter === 'All' ? 'chip-on' : ''}`}
              onClick={() => setCuisineFilter('All')}
            >
              All <span className="chip-count">{data.length}</span>
            </button>
            {cuisines.map((c) => (
              <button
                key={c.value}
                className={`chip ${cuisineFilter === c.value ? 'chip-on' : ''}`}
                onClick={() => setCuisineFilter(cuisineFilter === c.value ? 'All' : c.value)}
              >
                {c.label} <span className="chip-count">{c.count}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ============ A–Z INDEX RAIL ============ */}
      <nav className="azbar" aria-label="Jump to letter">
        <div className="azbar-inner">
          {[...LETTERS, ...(activeLetters.has('#') ? ['#'] : [])].map((l) => (
            <button
              key={l}
              className="az"
              disabled={!activeLetters.has(l)}
              onClick={() => jumpTo(l)}
              aria-label={`Jump to ${l}`}
            >
              {l}
            </button>
          ))}
          <span className="az-count">{filtered.length} shown</span>
        </div>
      </nav>

      {/* ============ DIRECTORY ============ */}
      <main className="ledger" ref={mainRef}>
        {filtered.length === 0 ? (
          <div className="empty">
            <p className="empty-title">No restaurants match “{query}”.</p>
            <p className="empty-hint">Try a shorter name, or clear the cuisine filter.</p>
            <button className="empty-reset" onClick={() => { setQuery(''); setCuisineFilter('All'); }}>
              Show all {data.length} restaurants
            </button>
          </div>
        ) : (
          orderedLetters.map((letter) => (
            <section key={letter} id={`letter-${letter}`} className="letter-section">
              <div className="letter-head">
                <span className="letter-glyph">{letter}</span>
                <span className="letter-rule" aria-hidden="true" />
                <span className="letter-n">{grouped.get(letter).length}</span>
              </div>
              <div className="grid">
                {grouped.get(letter).map((r) => (
                  <Card
                    key={r.id}
                    r={r}
                    open={expanded === r.id}
                    onToggle={() => setExpanded(expanded === r.id ? null : r.id)}
                  />
                ))}
              </div>
            </section>
          ))
        )}
      </main>

      {/* ============ FOOTER ============ */}
      <footer className="foot">
        <div className="foot-card">
          <p className="foot-eyebrow">For restaurant owners</p>
          <h2 className="foot-title">Your restaurant belongs on this page.</h2>
          <p className="foot-copy">
            Free listings for every Zabihah halal restaurant in Chicagoland. Featured spots and
            dedicated pages available.
          </p>
          <div className="foot-actions">
            <a className="foot-btn" href="https://wa.me/16302104365" target="_blank" rel="noopener noreferrer">
              WhatsApp us · (630) 210-4365
            </a>
            <a className="foot-btn foot-btn-ghost" href="mailto:info@chicagohalalrestaurants.com">
              info@chicagohalalrestaurants.com
            </a>
          </div>
          <a className="foot-pricing-link" href="/advertise">
            See Featured &amp; Premium pricing →
          </a>
        </div>
        <p className="foot-legal">
          © {new Date().getFullYear()} ChicagoHalalRestaurants.com · While we make our best efforts to
          list only Halal restaurants on our site, the zabihah halal status should also be verified
          directly with each restaurant.
        </p>
      </footer>

      {/* ============ STYLES ============ */}
      <style jsx>{`
        .chd {
          --forest: #14352a;
          --forest-deep: #0b1f18;
          --gold: #c9a227;
          --gold-soft: #e5cd7d;
          --ivory: #f7f3e8;
          --paper: #fffdf7;
          --ink: #1d221f;
          --mute: #7c7767;
          --line: #e6dfc9;
          background: var(--ivory);
          color: var(--ink);
          font-family: 'Inter', -apple-system, 'Segoe UI', sans-serif;
          min-height: 100vh;
        }
        .chd :global(*) {
          box-sizing: border-box;
        }

        /* ---------- HERO ---------- */
        .hero {
          position: relative;
          background: linear-gradient(175deg, var(--forest-deep) 0%, var(--forest) 70%);
          color: var(--ivory);
          overflow: hidden;
        }
        .hero-lattice {
          position: absolute;
          inset: 0;
          background-image: ${LATTICE};
          background-size: 72px 72px;
          opacity: 0.07;
          pointer-events: none;
          -webkit-mask-image: radial-gradient(ellipse 90% 100% at 50% 0%, black 40%, transparent 100%);
          mask-image: radial-gradient(ellipse 90% 100% at 50% 0%, black 40%, transparent 100%);
        }
        .hero-inner {
          position: relative;
          max-width: 1080px;
          margin: 0 auto;
          padding: 4.5rem 1.5rem 2.5rem;
          text-align: center;
        }
        .hero-eyebrow {
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--gold-soft);
          margin: 0 0 1.25rem;
        }
        .hero-title {
          font-family: 'Fraunces', Georgia, serif;
          font-weight: 600;
          font-size: clamp(2.1rem, 5.5vw, 3.9rem);
          line-height: 1.06;
          letter-spacing: -0.01em;
          margin: 0 0 1rem;
        }
        .hero-title em {
          font-style: italic;
          color: var(--gold-soft);
        }
        .hero-sub {
          font-size: clamp(0.95rem, 1.6vw, 1.05rem);
          color: rgba(247, 243, 232, 0.75);
          margin: 0 auto 0.5rem;
          max-width: 42rem;
        }
        .hero-disclaimer {
          font-size: 0.74rem;
          color: rgba(247, 243, 232, 0.45);
          margin: 0 auto 2.25rem;
          max-width: 42rem;
        }

        /* ---------- SEARCH ---------- */
        .searchwrap {
          position: relative;
          max-width: 560px;
          margin: 0 auto 1.5rem;
          display: flex;
          align-items: center;
          background: var(--paper);
          border: 1.5px solid var(--gold);
          border-radius: 999px;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
        }
        .search-icon {
          margin-left: 1.1rem;
          color: var(--mute);
          flex-shrink: 0;
        }
        .searchwrap input {
          flex: 1;
          min-width: 0;
          border: none;
          background: transparent;
          font: inherit;
          font-size: 1rem;
          color: var(--ink);
          padding: 0.95rem 0.9rem;
          outline: none;
        }
        .searchwrap input::placeholder {
          color: var(--mute);
        }
        .searchwrap:focus-within {
          border-color: var(--gold-soft);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35), 0 0 0 4px rgba(201, 162, 39, 0.25);
        }
        .search-clear {
          border: none;
          background: none;
          color: var(--mute);
          font-size: 0.9rem;
          padding: 0.5rem 1.1rem 0.5rem 0.25rem;
          cursor: pointer;
        }

        /* ---------- CUISINE CHIPS ---------- */
        .chips {
          display: flex;
          gap: 0.5rem;
          overflow-x: auto;
          padding: 0.25rem 0.25rem 1rem;
          scrollbar-width: thin;
          justify-content: safe center;
        }
        .chip {
          flex-shrink: 0;
          border: 1px solid rgba(229, 205, 125, 0.4);
          background: rgba(247, 243, 232, 0.06);
          color: var(--ivory);
          font: inherit;
          font-size: 0.82rem;
          font-weight: 500;
          padding: 0.42rem 0.85rem;
          border-radius: 999px;
          cursor: pointer;
          transition: background 0.15s ease, border-color 0.15s ease;
          white-space: nowrap;
        }
        .chip:hover {
          border-color: var(--gold-soft);
          background: rgba(247, 243, 232, 0.12);
        }
        .chip-on {
          background: var(--gold);
          border-color: var(--gold);
          color: var(--forest-deep);
          font-weight: 600;
        }
        .chip-count {
          opacity: 0.65;
          font-size: 0.72rem;
          margin-left: 0.15rem;
        }

        /* ---------- A–Z BAR ---------- */
        .azbar {
          position: sticky;
          top: 0;
          z-index: 20;
          background: rgba(247, 243, 232, 0.92);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid var(--line);
        }
        .azbar-inner {
          max-width: 1080px;
          margin: 0 auto;
          padding: 0.45rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.1rem;
          overflow-x: auto;
        }
        .az {
          border: none;
          background: none;
          font-family: 'Fraunces', Georgia, serif;
          font-size: 0.92rem;
          font-weight: 600;
          color: var(--forest);
          width: 1.9rem;
          height: 1.9rem;
          border-radius: 6px;
          cursor: pointer;
          flex-shrink: 0;
        }
        .az:hover:not(:disabled) {
          background: var(--gold);
          color: var(--forest-deep);
        }
        .az:disabled {
          color: #c9c3b0;
          cursor: default;
        }
        .az-count {
          margin-left: auto;
          font-size: 0.75rem;
          color: var(--mute);
          white-space: nowrap;
          padding-left: 0.75rem;
        }

        /* ---------- LEDGER ---------- */
        .ledger {
          max-width: 1080px;
          margin: 0 auto;
          padding: 2.25rem 1.25rem 3rem;
        }
        .letter-section {
          scroll-margin-top: 3.6rem;
          margin-bottom: 2rem;
        }
        .letter-head {
          display: flex;
          align-items: baseline;
          gap: 0.9rem;
          margin-bottom: 0.9rem;
        }
        .letter-glyph {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 2rem;
          font-weight: 600;
          color: var(--forest);
          line-height: 1;
        }
        .letter-rule {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, var(--gold) 0%, var(--line) 40%, transparent 100%);
          transform: translateY(-0.35rem);
        }
        .letter-n {
          font-size: 0.75rem;
          color: var(--mute);
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 0.7rem;
        }

        /* ---------- EMPTY ---------- */
        .empty {
          text-align: center;
          padding: 4rem 1rem;
        }
        .empty-title {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 1.3rem;
          margin: 0 0 0.4rem;
        }
        .empty-hint {
          color: var(--mute);
          margin: 0 0 1.5rem;
        }
        .empty-reset {
          border: 1.5px solid var(--forest);
          background: none;
          color: var(--forest);
          font: inherit;
          font-weight: 600;
          padding: 0.6rem 1.4rem;
          border-radius: 999px;
          cursor: pointer;
        }
        .empty-reset:hover {
          background: var(--forest);
          color: var(--ivory);
        }

        /* ---------- FOOTER ---------- */
        .foot {
          background: var(--forest-deep);
          padding: 3rem 1.25rem 2rem;
        }
        .foot-card {
          max-width: 720px;
          margin: 0 auto 2rem;
          text-align: center;
          color: var(--ivory);
        }
        .foot-eyebrow {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold-soft);
          margin: 0 0 0.75rem;
        }
        .foot-title {
          font-family: 'Fraunces', Georgia, serif;
          font-weight: 600;
          font-size: clamp(1.4rem, 3vw, 1.9rem);
          margin: 0 0 0.6rem;
        }
        .foot-copy {
          color: rgba(247, 243, 232, 0.7);
          font-size: 0.95rem;
          margin: 0 0 1.5rem;
        }
        .foot-actions {
          display: flex;
          gap: 0.75rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .foot-btn {
          display: inline-block;
          background: var(--gold);
          color: var(--forest-deep);
          font-weight: 600;
          font-size: 0.92rem;
          padding: 0.7rem 1.5rem;
          border-radius: 999px;
          text-decoration: none;
        }
        .foot-btn:hover {
          background: var(--gold-soft);
        }
        .foot-btn-ghost {
          background: none;
          border: 1.5px solid rgba(229, 205, 125, 0.5);
          color: var(--ivory);
        }
        .foot-btn-ghost:hover {
          background: rgba(247, 243, 232, 0.08);
          border-color: var(--gold-soft);
        }
        .foot-pricing-link {
          display: block;
          text-align: center;
          margin-top: 1.25rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--gold-soft);
          text-decoration: underline;
          text-decoration-color: rgba(229, 205, 125, 0.4);
        }
        .foot-pricing-link:hover {
          color: var(--gold);
        }
        .foot-legal {
          text-align: center;
          color: rgba(247, 243, 232, 0.4);
          font-size: 0.78rem;
          margin: 0;
        }

        @media (prefers-reduced-motion: no-preference) {
          .chd {
            scroll-behavior: smooth;
          }
        }
        @media (max-width: 640px) {
          .hero-inner {
            padding-top: 3rem;
          }
          .chips {
            justify-content: flex-start;
          }
        }
      `}</style>
    </div>
  );
}

function Card({ r, open, onToggle }) {
  const isPremium = r.tier === 'premium';
  const isFeatured = r.tier === 'featured';

  return (
    <article className={`card ${isFeatured ? 'card-featured' : ''} ${isPremium ? 'card-premium' : ''}`}>
      <button className="face" onClick={onToggle} aria-expanded={open}>
        <span className="row">
          <span className="name">{r.name}</span>
          {r.rating != null && (
            <span className="rating" aria-label={`Rated ${r.rating} out of 5`}>
              <svg viewBox="0 0 20 20" width="12" height="12" aria-hidden="true">
                <path
                  d="M10 1.5l2.47 5.3 5.53.7-4.1 3.9 1.1 5.6L10 14.2 5 17l1.1-5.6L2 7.5l5.53-.7z"
                  fill="currentColor"
                />
              </svg>
              {r.rating.toFixed(1)}
            </span>
          )}
        </span>
        <span className="meta">
          {r.cuisine}
          {r.neighborhood ? ` · ${r.neighborhood}` : ''}
        </span>
        <span className="badges">
          {r.certifiedHalal && <span className="badge badge-cert">Halal Certified</span>}
          {isPremium && <span className="badge badge-prem">★ Premium</span>}
          {isFeatured && !isPremium && <span className="badge badge-feat">Featured</span>}
        </span>
      </button>

      {open && (
        <div className="detail">
          <p className="addr">{r.address}</p>
          <div className="detail-actions">
            <a href={mapsUrl(r.address)} target="_blank" rel="noopener noreferrer" className="dir">
              Directions →
            </a>
            {isPremium && (
              <a href={`/${r.slug}`} className="full">
                View full page →
              </a>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .card {
          background: var(--paper);
          border: 1px solid var(--line);
          border-radius: 12px;
          overflow: hidden;
          transition: border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease;
        }
        .card:hover,
        .card:focus-within {
          border-color: var(--gold);
          box-shadow: 0 6px 20px rgba(20, 53, 42, 0.1);
          transform: translateY(-1px);
        }
        @media (prefers-reduced-motion: reduce) {
          .card,
          .card:hover {
            transition: none;
            transform: none;
          }
        }
        .card-featured {
          border-color: var(--gold-soft);
        }
        .card-premium {
          border-color: var(--gold);
          background: linear-gradient(180deg, #fffaf0 0%, var(--paper) 55%);
        }
        .face {
          display: block;
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          font: inherit;
          padding: 0.9rem 1rem 0.8rem;
          cursor: pointer;
        }
        .face:focus-visible {
          outline: 3px solid var(--gold-soft);
          outline-offset: -3px;
        }
        .row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 0.6rem;
        }
        .name {
          font-family: 'Fraunces', Georgia, serif;
          font-weight: 600;
          font-size: 1.02rem;
          line-height: 1.25;
          color: var(--ink);
        }
        .rating {
          display: inline-flex;
          align-items: center;
          gap: 0.22rem;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--gold);
          flex-shrink: 0;
        }
        .meta {
          display: block;
          margin-top: 0.25rem;
          font-size: 0.8rem;
          color: var(--mute);
        }
        .badges {
          display: flex;
          gap: 0.35rem;
          margin-top: 0.5rem;
          flex-wrap: wrap;
        }
        .badge {
          font-size: 0.66rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          padding: 0.18rem 0.5rem;
          border-radius: 999px;
        }
        .badge-cert {
          color: var(--forest);
          background: rgba(20, 53, 42, 0.08);
        }
        .badge-prem {
          color: #7a5c00;
          background: rgba(201, 162, 39, 0.18);
        }
        .badge-feat {
          color: #7a5c00;
          background: rgba(229, 205, 125, 0.25);
        }
        .detail {
          border-top: 1px dashed var(--line);
          padding: 0.7rem 1rem 0.85rem;
        }
        .addr {
          font-size: 0.82rem;
          color: var(--ink);
          margin: 0 0 0.5rem;
          line-height: 1.45;
        }
        .detail-actions {
          display: flex;
          gap: 1rem;
        }
        .dir,
        .full {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--forest);
          text-decoration: none;
        }
        .dir:hover,
        .full:hover {
          color: var(--gold);
        }
        .full {
          color: #7a5c00;
        }
      `}</style>
    </article>
  );
}
