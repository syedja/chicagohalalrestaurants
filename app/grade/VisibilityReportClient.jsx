'use client';

import { useState, useEffect } from 'react';
import styles from './report.module.css';

const WEIGHTS = {
  listed: 30,
  verified: 25,
  phone: 15,
  hours: 15,
  photo: 10,
  description: 5,
};

const CHECK_COPY = {
  listed: {
    pass: 'Listed in our directory of 280+ Chicago halal restaurants',
    fail: "Not in our directory — you're invisible to halal food seekers",
  },
  verified: {
    pass: 'Halal status verified (certified)',
    warn: 'Halal status unverified — Standard listing adds your verified badge',
  },
  phone: {
    pass: 'Phone number listed',
    fail: "No phone number — customers can't call to order or ask questions",
  },
  hours: {
    pass: 'Hours of operation listed',
    fail: "Hours missing — you may lose customers who don't know when you're open",
  },
  photo: {
    pass: 'Photo uploaded — listings with photos get 3× more clicks',
    fail: 'No photo — Premium listing includes a featured photo',
  },
  description: {
    pass: 'Custom description live — AI search engines can feature you',
    fail: "No description — ChatGPT & Google AI Overview can't recommend you",
  },
};

function ScoreRing({ score }) {
  const r = 40;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const color = score >= 75 ? '#15803d' : score >= 50 ? '#b45309' : '#b91c1c';
  const label = score >= 75 ? 'Strong listing' : score >= 50 ? 'Needs work' : 'Weak listing';
  return (
    <div className={styles.ringWrap}>
      <svg width="96" height="96" viewBox="0 0 96 96" aria-hidden="true">
        <circle cx="48" cy="48" r={r} fill="none" stroke="#f3f4f6" strokeWidth="7" />
        <circle
          cx="48" cy="48" r={r} fill="none"
          stroke={color} strokeWidth="7" strokeLinecap="round"
          strokeDasharray={`${dash.toFixed(1)} ${circ.toFixed(1)}`}
          style={{ transform: 'rotate(-90deg)', transformOrigin: '48px 48px', transition: 'stroke-dasharray 0.6s ease' }}
        />
      </svg>
      <div>
        <p className={styles.scoreLabel}>Visibility score</p>
        <p className={styles.scoreNum} style={{ color }}>{score}<span className={styles.scoreOf}>/100</span></p>
        <p className={styles.scoreSub}>{label}</p>
      </div>
    </div>
  );
}

function CheckItem({ type, passes, isWarn }) {
  const copy = CHECK_COPY[type];
  const text = passes ? copy.pass : (isWarn ? copy.warn : copy.fail);
  const cls = passes ? styles.checkPass : isWarn ? styles.checkWarn : styles.checkFail;
  const icon = passes ? '✓' : isWarn ? '!' : '✕';
  return (
    <li className={`${styles.checkItem} ${cls}`}>
      <span className={styles.checkIcon}>{icon}</span>
      <span className={styles.checkText}>{text}</span>
      {!passes && <span className={styles.pointsBadge}>+{WEIGHTS[type]} pts</span>}
    </li>
  );
}

function ReportCard({ data, onReset }) {
  const { restaurant, checks, score, alternatives } = data;
  const needsStandard = !checks.verified || !checks.phone || !checks.hours;
  const needsPremium = !checks.photo || !checks.description;
  const subject = encodeURIComponent(`Claim listing for ${restaurant.name}`);

  return (
    <div className={styles.resultCard}>
      <div className={styles.reportHeader}>
        <span className={styles.reportBadge}>Visibility Report</span>
      </div>

      <div className={styles.restaurantHeader}>
        <div>
          <h2 className={styles.restaurantName}>{restaurant.name}</h2>
          <p className={styles.restaurantMeta}>
            {[restaurant.cuisine, restaurant.neighborhood].filter(Boolean).join(' · ')}
            {restaurant.address && <><br /><span className={styles.address}>{restaurant.address}</span></>}
          </p>
        </div>
        {restaurant.rating && (
          <div className={styles.ratingBadge}>★ {restaurant.rating}</div>
        )}
      </div>

      {(restaurant.family_friendly || restaurant.delivery_available) && (
        <div className={styles.tagRow}>
          {restaurant.family_friendly && <span className={styles.tag}>Family friendly</span>}
          {restaurant.delivery_available && <span className={styles.tag}>Delivery available</span>}
        </div>
      )}

      <ScoreRing score={score} />

      <hr className={styles.divider} />

      <p className={styles.checksHeading}>What we checked</p>
      <ul className={styles.checkList}>
        {Object.entries(checks).map(([key, val]) => (
          <CheckItem
            key={key}
            type={key}
            passes={val}
            isWarn={!val && (key === 'verified' || key === 'description')}
          />
        ))}
      </ul>

      {(needsStandard || needsPremium) && (
        <div className={styles.upsellBox}>
          <p className={styles.upsellHeading}>Fix these issues and get more customers</p>
          <div className={styles.tierRow}>
            {needsStandard && (
              <div className={styles.tierCard}>
                <span className={styles.tierLabel}>Standard</span>
                <span className={styles.tierPrice}>$19<span>/mo</span></span>
                <ul className={styles.tierFeatures}>
                  <li>Verified halal badge</li>
                  <li>Phone & hours listed</li>
                  <li>Priority placement</li>
                </ul>
              </div>
            )}
            {needsPremium && (
              <div className={`${styles.tierCard} ${styles.tierCardPremium}`}>
                <span className={styles.tierBadge}>Most popular</span>
                <span className={styles.tierLabel}>Premium</span>
                <span className={styles.tierPrice}>$49<span>/mo</span></span>
                <ul className={styles.tierFeatures}>
                  <li>Everything in Standard</li>
                  <li>Featured photo</li>
                  <li>AI Overview visibility</li>
                  <li>ChatGPT & Perplexity ready</li>
                </ul>
              </div>
            )}
          </div>
          <a
            href={`mailto:hello@chicagohalalrestaurants.com?subject=${subject}`}
            className={styles.ctaBtn}
          >
            Claim my listing →
          </a>
        </div>
      )}

      {score === 100 && (
        <div className={styles.perfectBox}>
          <p>🎉 Your listing is fully optimized! You're showing up everywhere halal food seekers are looking.</p>
        </div>
      )}

      {alternatives.length > 0 && (
        <p className={styles.altNote}>
          Not your restaurant?{' '}
          {alternatives.map((a, i) => (
            <span key={i}>
              <button className={styles.altBtn} onClick={() => onReset(a.name)}>
                {a.name}
              </button>
              {i < alternatives.length - 1 ? ' or ' : ''}
            </span>
          ))}
        </p>
      )}
    </div>
  );
}

function NotFoundCard({ query }) {
  const subject = encodeURIComponent(`Add my restaurant: ${query}`);
  return (
    <div className={styles.resultCard}>
      <div className={styles.reportHeader}>
        <span className={styles.reportBadge}>Visibility Report</span>
      </div>
      <h2 className={styles.restaurantName} style={{ color: '#b91c1c', marginTop: '0.75rem' }}>
        "{query}" not found
      </h2>
      <p className={styles.restaurantMeta} style={{ marginBottom: '1rem' }}>
        We searched our directory of 280+ Chicago halal restaurants and couldn't find a match.
      </p>
      <ul className={styles.checkList}>
        <li className={`${styles.checkItem} ${styles.checkFail}`}>
          <span className={styles.checkIcon}>✕</span>
          <span className={styles.checkText}>Not listed — invisible to halal food seekers in Chicago</span>
        </li>
        <li className={`${styles.checkItem} ${styles.checkFail}`}>
          <span className={styles.checkIcon}>✕</span>
          <span className={styles.checkText}>Missing from "best halal [cuisine] in [neighborhood]" searches</span>
        </li>
        <li className={`${styles.checkItem} ${styles.checkWarn}`}>
          <span className={styles.checkIcon}>!</span>
          <span className={styles.checkText}>Not visible in AI search (ChatGPT, Google AI Overview, Perplexity)</span>
        </li>
      </ul>
      <div className={styles.upsellBox} style={{ marginTop: '1.25rem' }}>
        <p className={styles.upsellHeading}>Get listed and start getting found</p>
        <div className={styles.tierRow}>
          <div className={styles.tierCard}>
            <span className={styles.tierLabel}>Standard</span>
            <span className={styles.tierPrice}>$19<span>/mo</span></span>
            <ul className={styles.tierFeatures}>
              <li>Directory listing</li>
              <li>Verified halal badge</li>
              <li>Phone & hours</li>
            </ul>
          </div>
          <div className={`${styles.tierCard} ${styles.tierCardPremium}`}>
            <span className={styles.tierBadge}>Most popular</span>
            <span className={styles.tierLabel}>Premium</span>
            <span className={styles.tierPrice}>$49<span>/mo</span></span>
            <ul className={styles.tierFeatures}>
              <li>Everything in Standard</li>
              <li>Featured photo</li>
              <li>AI Overview ready</li>
              <li>ChatGPT visibility</li>
            </ul>
          </div>
        </div>
        <a
          href={`mailto:hello@chicagohalalrestaurants.com?subject=${subject}`}
          className={styles.ctaBtn}
        >
          Get my restaurant listed →
        </a>
      </div>
    </div>
  );
}

const EXAMPLE_QUERIES = ['Sabri Nihari', 'Bundoo Khan', 'Ghareeb Nawaz', 'Your restaurant'];

export default function VisibilityReportClient({ initialQuery }) {
  const [query, setQuery] = useState(initialQuery || '');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialQuery) runReport(initialQuery);
  }, []);

  async function runReport(q = query) {
    const trimmed = (q || '').trim();
    if (trimmed.length < 2) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(`/api/grade?q=${encodeURIComponent(trimmed)}`);
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      setResult(data);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleReset(name) {
    setQuery(name);
    runReport(name);
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.searchRow}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Enter your restaurant name..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && runReport()}
        />
        <button
          className={styles.searchBtn}
          onClick={() => runReport()}
          disabled={loading}
        >
          {loading ? 'Checking...' : 'Get my report →'}
        </button>
      </div>

      {error && <p className={styles.errorMsg}>{error}</p>}

      {loading && (
        <div className={styles.loadingCard}>
          <div className={styles.loadingBar} />
          <p>Generating your visibility report...</p>
        </div>
      )}

      {result && !loading && (
        result.found
          ? <ReportCard data={result} onReset={handleReset} />
          : <NotFoundCard query={result.query} />
      )}

      {!result && !loading && (
        <div className={styles.examples}>
          <p className={styles.examplesLabel}>Try searching for:</p>
          <div className={styles.examplePills}>
            {EXAMPLE_QUERIES.map(name => (
              <button
                key={name}
                className={styles.examplePill}
                onClick={() => { setQuery(name); runReport(name); }}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
