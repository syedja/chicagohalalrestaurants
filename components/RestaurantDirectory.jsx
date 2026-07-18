'use client';

import { useMemo, useState } from 'react';

/**
 * RestaurantDirectory
 * -----------------------------------------------------------------------
 * The "all restaurants on one page" directory for chicagohalalrestaurants.com.
 *
 * WHAT THIS EXPECTS FROM YOUR restaurants.json
 * Each restaurant object should have (adjust the field names below in
 * `normalize()` if your real JSON uses different keys):
 *   name            string   (required)
 *   cuisine         string   (required)
 *   neighborhood    string
 *   certification   string   ("HFSAA" | "HMS" | "ISWA" | "MCG")
 *   phone           string
 *   address         string
 *   tier            "free" | "featured" | "premium"   (default "free")
 *   slug            string   (used for /restaurantname link on premium tier)
 *
 * HOW TO INTEGRATE
 *   1. Drop this file into: components/RestaurantDirectory.jsx
 *   2. In your homepage (e.g. app/page.js), import your real data and render:
 *        import restaurants from '@/data/restaurants.json';
 *        import RestaurantDirectory from '@/components/RestaurantDirectory';
 *        export default function Home() {
 *          return <RestaurantDirectory restaurants={restaurants} />;
 *        }
 *   3. Add the Google Fonts link (see bottom of this file comment) to your
 *      root layout's <head>, or wire up next/font instead if you prefer.
 *
 * FONT SETUP (add to app/layout.js <head>, or use next/font):
 *   <link rel="preconnect" href="https://fonts.googleapis.com" />
 *   <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
 * -----------------------------------------------------------------------
 */

function normalize(r) {
  return {
    name: r.name ?? 'Unnamed Restaurant',
    cuisine: r.cuisine ?? 'Halal',
    neighborhood: r.neighborhood ?? '',
    certification: r.certification ?? '',
    phone: r.phone ?? '',
    address: r.address ?? '',
    tier: r.tier ?? 'free',
    slug: r.slug ?? slugify(r.name ?? ''),
  };
}

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function initialOf(name) {
  const c = name.trim()[0]?.toUpperCase() ?? '#';
  return /[A-Z]/.test(c) ? c : '#';
}

export default function RestaurantDirectory({ restaurants = [] }) {
  const [query, setQuery] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState('All');
  const [expanded, setExpanded] = useState(null); // slug of expanded card

  const data = useMemo(() => restaurants.map(normalize), [restaurants]);

  const cuisines = useMemo(() => {
    const set = new Set(data.map((r) => r.cuisine));
    return ['All', ...Array.from(set).sort()];
  }, [data]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data
      .filter((r) => cuisineFilter === 'All' || r.cuisine === cuisineFilter)
      .filter((r) => {
        if (!q) return true;
        return (
          r.name.toLowerCase().includes(q) ||
          r.cuisine.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [data, query, cuisineFilter]);

  // Group alphabetically for the letter-rail layout
  const grouped = useMemo(() => {
    const map = new Map();
    for (const r of filtered) {
      const letter = initialOf(r.name);
      if (!map.has(letter)) map.set(letter, []);
      map.get(letter).push(r);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  return (
    <div className="chd-page">
      <header className="chd-header">
        <div className="chd-crescent" aria-hidden="true">☾</div>
        <h1>Every Zabihah Halal Restaurant in Chicago.<br />One Page.</h1>
        <p className="chd-sub">
          {data.length} restaurants, alphabetically. Search by name or cuisine below.
        </p>

        <div className="chd-controls">
          <div className="chd-search-arch">
            <input
              type="text"
              placeholder="Search by restaurant name or cuisine…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search restaurants by name or cuisine"
            />
          </div>
          <select
            value={cuisineFilter}
            onChange={(e) => setCuisineFilter(e.target.value)}
            aria-label="Filter by cuisine"
          >
            {cuisines.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </header>

      {filtered.length === 0 ? (
        <p className="chd-empty">No restaurants match that search. Try a different name or cuisine.</p>
      ) : (
        <main>
          {grouped.map(([letter, list]) => (
            <section key={letter} className="chd-letter-group">
              <div className="chd-letter-rail">{letter}</div>
              <div className="chd-grid">
                {list.map((r) => (
                  <RestaurantBox
                    key={r.slug}
                    restaurant={r}
                    isExpanded={expanded === r.slug}
                    onToggle={() =>
                      setExpanded(expanded === r.slug ? null : r.slug)
                    }
                  />
                ))}
              </div>
            </section>
          ))}
        </main>
      )}

      <footer className="chd-footer">
        <p>Own a restaurant that belongs here? <a href="/list-your-restaurant">Get listed free</a>, or go Premium for a dedicated page.</p>
      </footer>

      <style jsx>{`
        .chd-page {
          --forest: #16332a;
          --forest-deep: #0d211a;
          --gold: #c9a227;
          --gold-light: #e4c766;
          --cream: #faf6ec;
          --ink: #201f1a;
          --line: #e3dcc8;
          background: var(--cream);
          color: var(--ink);
          font-family: 'Inter', -apple-system, sans-serif;
          min-height: 100vh;
          padding: 0 0 4rem;
        }

        .chd-header {
          background: var(--forest);
          color: var(--cream);
          text-align: center;
          padding: 3.5rem 1.5rem 3rem;
          position: relative;
          overflow: hidden;
        }
        .chd-header::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, var(--gold) 1px, transparent 1px);
          background-size: 22px 22px;
          opacity: 0.08;
          pointer-events: none;
        }
        .chd-crescent {
          font-size: 2rem;
          color: var(--gold-light);
          margin-bottom: 0.5rem;
        }
        .chd-header h1 {
          font-family: 'Fraunces', Georgia, serif;
          font-weight: 600;
          font-size: clamp(1.75rem, 4vw, 2.75rem);
          line-height: 1.15;
          margin: 0 0 0.75rem;
          position: relative;
        }
        .chd-sub {
          color: var(--gold-light);
          font-size: 0.95rem;
          margin: 0 0 2rem;
          position: relative;
        }

        .chd-controls {
          display: flex;
          gap: 0.75rem;
          justify-content: center;
          flex-wrap: wrap;
          position: relative;
        }
        .chd-search-arch {
          background: var(--cream);
          border-radius: 999px 999px 8px 8px;
          padding: 2px;
          box-shadow: 0 0 0 2px var(--gold);
        }
        .chd-search-arch input {
          width: min(420px, 70vw);
          border: none;
          background: transparent;
          padding: 0.7rem 1.2rem;
          font-size: 0.95rem;
          font-family: inherit;
          color: var(--ink);
          outline: none;
        }
        .chd-controls select {
          border-radius: 999px;
          border: 2px solid var(--gold);
          background: var(--cream);
          padding: 0.7rem 1rem;
          font-family: inherit;
          font-size: 0.9rem;
          color: var(--ink);
        }
        .chd-controls input:focus-visible,
        .chd-controls select:focus-visible {
          outline: 3px solid var(--gold-light);
          outline-offset: 2px;
        }

        .chd-empty {
          text-align: center;
          padding: 3rem 1rem;
          color: #6b6656;
        }

        main {
          max-width: 1100px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem 0;
        }

        .chd-letter-group {
          display: flex;
          gap: 1.25rem;
          margin-bottom: 1.5rem;
          align-items: flex-start;
        }
        .chd-letter-rail {
          flex: 0 0 2.5rem;
          font-family: 'Fraunces', Georgia, serif;
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--gold);
          border-bottom: 2px solid var(--line);
          padding-bottom: 0.4rem;
          position: sticky;
          top: 1rem;
        }
        .chd-grid {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 0.6rem;
        }

        @media (max-width: 640px) {
          .chd-letter-group { gap: 0.75rem; }
          .chd-letter-rail { flex-basis: 1.75rem; font-size: 1.15rem; }
        }

        .chd-footer {
          text-align: center;
          margin-top: 3rem;
          color: #6b6656;
          font-size: 0.9rem;
        }
        .chd-footer a {
          color: var(--forest);
          font-weight: 600;
          text-decoration: underline;
          text-decoration-color: var(--gold);
        }
      `}</style>
    </div>
  );
}

function RestaurantBox({ restaurant, isExpanded, onToggle }) {
  const { name, cuisine, neighborhood, certification, phone, address, tier, slug } = restaurant;
  const isPremium = tier === 'premium';
  const isFeatured = tier === 'featured';

  return (
    <div className={`box ${isFeatured ? 'box-featured' : ''} ${isPremium ? 'box-premium' : ''}`}>
      <button
        className="box-face"
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={`detail-${slug}`}
      >
        <span className="box-name">{name}</span>
        <span className="box-meta">{cuisine}{neighborhood ? ` · ${neighborhood}` : ''}</span>
        {certification && <span className="box-cert">{certification} Certified</span>}
        {isPremium && <span className="box-badge">★ Premium</span>}
      </button>

      {isExpanded && (
        <div id={`detail-${slug}`} className="box-detail">
          {phone && <p>📞 <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`}>{phone}</a></p>}
          {address && <p>📍 {address}</p>}
          {isPremium ? (
            <a className="box-cta" href={`/${slug}`}>View full page →</a>
          ) : (
            <p className="box-hint">Full menu &amp; photos not listed yet.</p>
          )}
        </div>
      )}

      <style jsx>{`
        .box {
          border: 1.5px solid var(--line);
          border-radius: 10px;
          background: #fff;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .box:hover, .box:focus-within {
          border-color: var(--gold);
          box-shadow: 0 2px 10px rgba(201, 162, 39, 0.18);
        }
        .box-featured {
          border-color: var(--gold-light);
          background: #fffdf6;
        }
        .box-premium {
          border-color: var(--gold);
          background: linear-gradient(180deg, #fffdf6 0%, #fff 100%);
        }
        .box-face {
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          padding: 0.85rem 0.9rem;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          font-family: inherit;
        }
        .box-face:focus-visible {
          outline: 3px solid var(--gold-light);
          outline-offset: -3px;
          border-radius: 8px;
        }
        .box-name {
          font-family: 'Fraunces', Georgia, serif;
          font-weight: 600;
          font-size: 1rem;
          color: var(--ink);
        }
        .box-meta {
          font-size: 0.8rem;
          color: #7a745e;
        }
        .box-cert {
          font-size: 0.7rem;
          color: var(--forest);
          font-weight: 600;
          margin-top: 0.15rem;
        }
        .box-badge {
          font-size: 0.7rem;
          color: var(--gold);
          font-weight: 600;
          margin-top: 0.1rem;
        }
        .box-detail {
          padding: 0 0.9rem 0.9rem;
          font-size: 0.85rem;
          border-top: 1px solid var(--line);
          margin-top: 0.1rem;
          padding-top: 0.6rem;
        }
        .box-detail p {
          margin: 0.25rem 0;
        }
        .box-detail a {
          color: var(--forest);
        }
        .box-cta {
          display: inline-block;
          margin-top: 0.4rem;
          font-weight: 600;
          color: var(--forest);
        }
        .box-hint {
          color: #948d75;
          font-style: italic;
        }
      `}</style>
    </div>
  );
}
