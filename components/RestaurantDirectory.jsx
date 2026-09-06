'use client';

import { useMemo, useRef, useState, Fragment } from 'react';
import styles from './RestaurantDirectory.module.css';

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
 *
 * STYLING: migrated from styled-jsx to RestaurantDirectory.module.css
 * (CSS Module) so styles are extracted into a render-blocking stylesheet
 * in the document head — this prevents the flash of unstyled content
 * that dynamic styled-jsx produced on every load.
 */

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
    zabihahConfirmed: r.zabihah_confirmed ?? false,
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
    <div className={styles.chd}>
      {/* ============ HERO ============ */}
      <header className={styles.hero}>
        <div className={styles.heroLattice} aria-hidden="true" />
        <div className={styles.heroInner}>
          <p className={styles.heroEyebrow}>Halal Restaurants · Chicago &amp; Suburbs</p>
          <h1 className={styles.heroTitle}>
            Every Halal Restaurant<br />
            in Chicagoland. <em>One Page.</em>
          </h1>
          <p className={styles.heroSub}>
            {data.length} restaurants across {cuisines.length} cuisines — alphabetical, searchable, and growing every week.
          </p>
          <p className={styles.heroDisclaimer}>
            (Zabihah halal status should be verified directly with each restaurant.)
          </p>

          <div className={styles.searchwrap} role="search">
            <svg className={styles.searchIcon} viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
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
              <button className={styles.searchClear} onClick={() => setQuery('')} aria-label="Clear search">
                ✕
              </button>
            )}
          </div>

          <a
            className={styles.addRestaurantLink}
            href="/advertise"
          >
            Don't see your favorite restaurant? Help us complete Chicagoland's largest halal restaurant directory. <strong>Add a Restaurant →</strong>
          </a>

          <div className={styles.chips} role="group" aria-label="Filter by cuisine">
            <button
              className={`${styles.chip} ${cuisineFilter === 'All' ? styles.chipOn : ''}`}
              onClick={() => setCuisineFilter('All')}
            >
              All <span className={styles.chipCount}>{data.length}</span>
            </button>
            {cuisines.map((c) => (
              <button
                key={c.value}
                className={`${styles.chip} ${cuisineFilter === c.value ? styles.chipOn : ''}`}
                onClick={() => setCuisineFilter(cuisineFilter === c.value ? 'All' : c.value)}
              >
                {c.label} <span className={styles.chipCount}>{c.count}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ============ A–Z INDEX RAIL ============ */}
      <nav className={styles.azbar} aria-label="Jump to letter">
        <div className={styles.azbarInner}>
          {[...LETTERS, ...(activeLetters.has('#') ? ['#'] : [])].map((l) => (
            <button
              key={l}
              className={styles.az}
              disabled={!activeLetters.has(l)}
              onClick={() => jumpTo(l)}
              aria-label={`Jump to ${l}`}
            >
              {l}
            </button>
          ))}
          <span className={styles.azCount}>{filtered.length} shown</span>
        </div>
      </nav>

      {/* ============ DIRECTORY ============ */}
      <main className={styles.ledger} ref={mainRef}>
        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>No restaurants match “{query}”.</p>
            <p className={styles.emptyHint}>Try a shorter name, or clear the cuisine filter.</p>
            <button className={styles.emptyReset} onClick={() => { setQuery(''); setCuisineFilter('All'); }}>
              Show all {data.length} restaurants
            </button>
          </div>
        ) : (
          orderedLetters.map((letter) => (
            <Fragment key={letter}>
              <section id={`letter-${letter}`} className={styles.letterSection}>
                <div className={styles.letterHead}>
                  <span className={styles.letterGlyph}>{letter}</span>
                  <span className={styles.letterRule} aria-hidden="true" />
                  <span className={styles.letterN}>{grouped.get(letter).length}</span>
                </div>
                <div className={styles.grid}>
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
              {letter === 'M' && (
                <div className={styles.ownerInlineCta}>
                  Own one of these restaurants? Get Featured placement - WhatsApp{' '}
                  <a href="https://wa.me/16302104365" target="_blank" rel="noopener noreferrer">
                    (630) 210-4365
                  </a>
                </div>
              )}
            </Fragment>
          ))
        )}
      </main>

      {/* ============ FOOTER ============ */}
      <footer className={styles.foot}>
        <div className={styles.footCard}>
          <p className={styles.footEyebrow}>For restaurant owners</p>
          <h2 className={styles.footTitle}>Your restaurant belongs on this page.</h2>
          <p className={styles.footCopy}>
            Free listings for every Zabihah halal restaurant in Chicagoland. Featured spots and
            dedicated pages available.
          </p>
          <p className={styles.footTiers}>Featured $29/yr and Premium $99/yr available. Accepted certifications: HFSAA, HMS, ISWA, MCG.</p>
          <div className={styles.footActions}>
            <a className={styles.footBtn} href="https://wa.me/16302104365" target="_blank" rel="noopener noreferrer">
              WhatsApp us · (630) 210-4365
            </a>
            <a className={`${styles.footBtn} ${styles.footBtnGhost}`} href="mailto:info@chicagohalalrestaurants.com">
              info@chicagohalalrestaurants.com
            </a>
          </div>
          <a className={styles.footPricingLink} href="/advertise">
            See Featured &amp; Premium pricing →
          </a>
        </div>
        <p className={styles.footLegal}>
          © {new Date().getFullYear()} ChicagoHalalRestaurants.com · While we make our best efforts to
          list only Halal restaurants on our site, the zabihah halal status should also be verified
          directly with each restaurant.
        </p>
      </footer>
    </div>
  );
}

function Card({ r, open, onToggle }) {
  const isPremium = r.tier === 'premium';
  const isFeatured = r.tier === 'featured';

  return (
    <article className={`${styles.card} ${isFeatured ? styles.cardFeatured : ''} ${isPremium ? styles.cardPremium : ''}`}>
      <button className={styles.face} onClick={onToggle} aria-expanded={open}>
        <span className={styles.row}>
          <span className={styles.name}>{r.name}</span>
          {r.rating != null && (
            <span className={styles.rating} aria-label={`Rated ${r.rating} out of 5`}>
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
        <span className={styles.meta}>
          {r.cuisine}
          {r.neighborhood ? ` · ${r.neighborhood}` : ''}
        </span>
        <span className={styles.badges}>
          {r.zabihahConfirmed && <span className={`${styles.badge} ${styles.badgeZabihah}`}>Zabihah Halal Certified</span>}
          {r.certifiedHalal && !r.zabihahConfirmed && <span className={`${styles.badge} ${styles.badgeCert}`}>Halal</span>}
          {isPremium && <span className={`${styles.badge} ${styles.badgePrem}`}>★ Premium</span>}
          {isFeatured && !isPremium && <span className={`${styles.badge} ${styles.badgeFeat}`}>Featured</span>}
        </span>
      </button>

      {open && (
        <div className={styles.detail}>
          <p className={styles.addr}>{r.address}</p>
          <div className={styles.detailActions}>
            <a href={mapsUrl(r.address)} target="_blank" rel="noopener noreferrer" className={styles.dir}>
              Directions →
            </a>
            {isPremium && (
              <a href={`/${r.slug}`} className={styles.full}>
                View full page →
              </a>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
