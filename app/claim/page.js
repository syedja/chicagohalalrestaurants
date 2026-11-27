import Link from 'next/link'
import {
  CLAIM_FORM_URL, CLAIM_FORM_PREFILL_PARAM, isRealUrl, mailtoContact,
} from '@/lib/siteConfig'

export const metadata = {
  title: 'Claim Your Restaurant Listing | Chicago Halal Restaurants',
  description: 'Own a halal restaurant in Chicagoland? Claim your free listing on Chicago Halal Restaurants or correct your details. We check every claim before changing a listing.',
  alternates: { canonical: 'https://www.chicagohalalrestaurants.com/claim' },
}

const FOREST = '#14352a'
const GOLD = '#c9a227'
const IVORY = '#f7f3e8'

// Builds the form URL with the restaurant name prefilled.
// TODO: CLAIM_FORM_PREFILL_PARAM in lib/siteConfig.js must match the form's
// prefill parameter (a Tally hidden field name, or a Google Forms "entry.XXXX" id).
function buildFormUrl(restaurant) {
  if (!isRealUrl(CLAIM_FORM_URL)) return null
  const url = new URL(CLAIM_FORM_URL)
  if (restaurant) url.searchParams.set(CLAIM_FORM_PREFILL_PARAM, restaurant)
  return url.toString()
}

// Tally and Google Forms each need a special URL to be shown inside a page.
function toEmbedUrl(formUrl) {
  if (!formUrl) return null
  const url = new URL(formUrl)
  if (url.hostname === 'tally.so' && url.pathname.startsWith('/r/')) {
    url.pathname = url.pathname.replace('/r/', '/embed/')
  }
  if (url.hostname === 'docs.google.com' && url.pathname.includes('/forms/')) {
    url.searchParams.set('embedded', 'true')
  }
  return url.toString()
}

export default async function ClaimPage({ searchParams }) {
  const params = await searchParams
  const raw = Array.isArray(params?.restaurant) ? params.restaurant[0] : params?.restaurant
  const restaurant = (raw || '').trim().slice(0, 120)

  const formUrl = buildFormUrl(restaurant)
  const embedUrl = toEmbedUrl(formUrl)
  const emailHref = mailtoContact(restaurant ? `Claim listing: ${restaurant}` : 'Claim my listing')

  return (
    <main style={{ maxWidth: '760px', margin: '0 auto', padding: '2rem 1rem 4rem', fontFamily: "'Inter', system-ui, sans-serif", color: '#1d221f' }}>
      <Link href="/" style={{ color: FOREST, textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>← Back to Directory</Link>

      <div style={{ textAlign: 'center', margin: '2.5rem 0 2rem' }}>
        <p style={{
          display: 'inline-block', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: FOREST, background: '#eef1ea', padding: '4px 12px',
          borderRadius: '20px', marginBottom: '1rem',
        }}>
          For Restaurant Owners
        </p>
        <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 'clamp(1.9rem, 5vw, 2.6rem)', fontWeight: 600, color: '#111', margin: '0 0 0.75rem' }}>
          Claim your listing
        </h1>
        <p style={{ fontSize: '1.05rem', color: '#555', maxWidth: '560px', margin: '0 auto', lineHeight: 1.6 }}>
          Own a halal restaurant in Chicagoland? Claim your free listing or correct your details. We check every claim before changing a listing.
        </p>
      </div>

      {restaurant && (
        <div style={{ background: IVORY, border: `1px solid ${GOLD}`, borderRadius: '10px', padding: '0.75rem 1rem', marginBottom: '1.25rem', textAlign: 'center', fontSize: '0.95rem' }}>
          Claiming: <strong style={{ color: FOREST }}>{restaurant}</strong>
        </div>
      )}

      {embedUrl ? (
        <>
          <iframe
            src={embedUrl}
            title="Claim your listing form"
            loading="lazy"
            style={{ width: '100%', minHeight: '900px', border: '1px solid #e6dfc9', borderRadius: '12px', background: '#fff' }}
          />
          <p style={{ textAlign: 'center', color: '#888', fontSize: '0.85rem', marginTop: '0.75rem' }}>
            Form not loading?{' '}
            <a href={formUrl} target="_blank" rel="noopener noreferrer" style={{ color: FOREST, fontWeight: 600 }}>Open it in a new tab</a>
          </p>
        </>
      ) : (
        <div style={{ background: '#fff', border: '1px solid #e6dfc9', borderRadius: '16px', padding: '2rem 1.5rem', textAlign: 'center' }}>
          <p style={{ color: '#555', margin: '0 0 1.25rem' }}>
            Send us your restaurant&apos;s name and address and we&apos;ll get your listing set up or corrected.
          </p>
          <a href={emailHref} style={{
            display: 'inline-block', background: FOREST, color: '#fff',
            padding: '0.75rem 2rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 700,
          }}>
            Email us to claim your listing
          </a>
        </div>
      )}

      <p style={{ textAlign: 'center', color: '#888', fontSize: '0.85rem', marginTop: '2rem' }}>
        Want more visibility? <Link href="/advertise" style={{ color: FOREST, fontWeight: 600 }}>See Featured &amp; Premium options →</Link>
      </p>
    </main>
  )
}
