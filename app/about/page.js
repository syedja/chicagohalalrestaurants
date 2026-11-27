import Link from 'next/link'
import { CONTACT_EMAIL, mailtoContact } from '@/lib/siteConfig'

export const metadata = {
  title: 'About Us | Chicago Halal Restaurants',
  description: 'Who runs Chicago Halal Restaurants, where our listings come from, what our halal labels mean, and how paid listings work.',
  alternates: { canonical: 'https://www.chicagohalalrestaurants.com/about' },
}

const FOREST = '#14352a'
const GOLD = '#c9a227'
const IVORY = '#f7f3e8'

const card = { background: '#fff', border: '1px solid #e6dfc9', borderRadius: '16px', padding: '1.75rem', marginBottom: '1.5rem' }
const h2 = { fontFamily: "'Fraunces', Georgia, serif", fontSize: '1.25rem', fontWeight: 600, color: '#111', margin: '0 0 0.75rem' }
const p = { color: '#444', fontSize: '0.95rem', lineHeight: 1.7, margin: '0 0 0.75rem' }

export default function About() {
  return (
    <main style={{ maxWidth: '760px', margin: '0 auto', padding: '2rem 1rem 4rem', fontFamily: "'Inter', system-ui, sans-serif", color: '#1d221f' }}>
      <Link href="/" style={{ color: FOREST, textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>← Back to Directory</Link>

      <div style={{ textAlign: 'center', margin: '2.5rem 0 2.5rem' }}>
        <p style={{
          display: 'inline-block', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: FOREST, background: '#eef1ea', padding: '4px 12px',
          borderRadius: '20px', marginBottom: '1rem',
        }}>
          About Us
        </p>
        <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 'clamp(1.9rem, 5vw, 2.6rem)', fontWeight: 600, color: '#111', margin: '0 0 0.75rem' }}>
          About Chicago Halal Restaurants
        </h1>
        <p style={{ fontSize: '1.05rem', color: '#555', maxWidth: '560px', margin: '0 auto', lineHeight: 1.6 }}>
          One page listing halal restaurants across Chicago and the suburbs, searchable by name and
          cuisine. Free for diners, since 2025.
        </p>
      </div>

      <section style={card}>
        <h2 style={h2}>Who we are</h2>
        <p style={p}>
          Chicago Halal Restaurants is run by Syed, based in Glendale Heights and Carol Stream, with a
          small local team. We started the site in 2025 to make it easier to find halal food in
          Chicagoland.
        </p>
      </section>

      <section style={card}>
        <h2 style={h2}>Where our listings come from</h2>
        <p style={{ ...p, margin: 0 }}>
          The directory was built from public listings of halal restaurants in Chicago and the
          suburbs. Restaurant owners can claim their listing or correct their details at any time.
        </p>
      </section>

      <section style={card}>
        <h2 style={h2}>What our halal labels mean</h2>
        <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1rem' }}>
          <div style={{ background: IVORY, border: `1px solid ${GOLD}`, borderRadius: '10px', padding: '0.85rem 1rem' }}>
            <div style={{ fontWeight: 700, color: '#7a5c00', fontSize: '0.95rem' }}>Zabihah Halal Certified</div>
            <div style={{ color: '#555', fontSize: '0.88rem', lineHeight: 1.6 }}>
              We have verified this restaurant&apos;s Zabihah certification with HMS or HFSAA.
            </div>
          </div>
          <div style={{ background: '#fff', border: '1px solid #e6dfc9', borderRadius: '10px', padding: '0.85rem 1rem' }}>
            <div style={{ fontWeight: 700, color: FOREST, fontSize: '0.95rem' }}>Halal</div>
            <div style={{ color: '#555', fontSize: '0.88rem', lineHeight: 1.6 }}>
              Listed as halal in public listings. Please confirm Zabihah status directly with the restaurant.
            </div>
          </div>
        </div>
        <p style={{ ...p, margin: 0 }}>
          Certifications we accept: HFSAA (Halal Food Standards Alliance of America) and HMS (Halal
          Monitoring Services).
        </p>
      </section>

      <section style={card}>
        <h2 style={h2}>How paid listings work</h2>
        <p style={{ ...p, margin: 0 }}>
          Restaurants can pay for a Featured or Premium listing. That changes where a restaurant
          appears and how its listing looks. <strong>Paying never changes a restaurant&apos;s halal label.</strong>
        </p>
      </section>

      <section style={card}>
        <h2 style={h2}>See a mistake?</h2>
        <p style={{ ...p, margin: 0 }}>
          Every listing has an &ldquo;Own this place? Claim or fix it&rdquo; link. We check every claim
          before changing a listing. Diners can also email us at{' '}
          <a href={mailtoContact('Listing correction')} style={{ color: FOREST, fontWeight: 600 }}>{CONTACT_EMAIL}</a>.
        </p>
      </section>

      <div style={{ textAlign: 'center', background: '#0b1f18', borderRadius: '16px', padding: '2.25rem 1.5rem' }}>
        <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", color: IVORY, margin: '0 0 0.5rem', fontWeight: 600 }}>Own a halal restaurant?</h2>
        <p style={{ color: 'rgba(247,243,232,0.7)', margin: '0 0 1.25rem' }}>Listings are free. Featured and Premium are optional.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginBottom: '1rem' }}>
          <Link href="/claim" style={{
            display: 'inline-block', background: GOLD, color: '#0b1f18',
            padding: '0.8rem 2rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem',
          }}>
            Claim or fix your listing
          </Link>
          <Link href="/advertise" style={{
            display: 'inline-block', background: 'transparent', color: IVORY, border: '1.5px solid rgba(229,205,125,0.5)',
            padding: '0.8rem 2rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem',
          }}>
            See Featured &amp; Premium
          </Link>
        </div>
        <p style={{ color: 'rgba(247,243,232,0.7)', fontSize: '0.88rem', margin: 0 }}>
          WhatsApp or call <a href="https://wa.me/16302104365" target="_blank" rel="noopener noreferrer" style={{ color: '#e5cd7d', fontWeight: 600, textDecoration: 'none' }}>(630) 210-4365</a>
          {' · '}
          <a href={mailtoContact()} style={{ color: '#e5cd7d', fontWeight: 600, textDecoration: 'none' }}>{CONTACT_EMAIL}</a>
        </p>
      </div>
    </main>
  )
}
