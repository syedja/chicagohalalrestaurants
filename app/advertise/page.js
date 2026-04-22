import Link from 'next/link'

export const metadata = {
  title: 'Advertise | Chicago Halal Restaurants',
  description: 'Get your halal restaurant featured on ChicagoHalalRestaurants.com',
}

export default function Advertise() {
  return (
    <main style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem 1rem', fontFamily: 'system-ui, sans-serif' }}>
      <Link href="/" style={{ color: '#16a34a', textDecoration: 'none', fontSize: '0.9rem' }}>← Back to Home</Link>

      <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#111', margin: '1rem 0 0.5rem' }}>
        🍽️ Get Your Restaurant Featured
      </h1>
      <p style={{ fontSize: '1.05rem', color: '#555', lineHeight: '1.7' }}>
        Chicago Halal Restaurants is the fastest growing halal food directory in the Chicago area.
        Get your restaurant in front of thousands of halal food seekers every month.
      </p>

      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '14px', padding: '2rem', margin: '2rem 0' }}>
        <h2 style={{ color: '#15803d', marginTop: 0, fontSize: '1.3rem' }}>Featured Listing — $29/month</h2>
        <ul style={{ color: '#333', lineHeight: '2.2', paddingLeft: '1.25rem' }}>
          <li>✅ Priority placement at top of your neighborhood page</li>
          <li>✅ Featured badge on your listing</li>
          <li>✅ Link to your website or menu</li>
          <li>✅ Listed across all relevant cuisine + neighborhood pages</li>
          <li>✅ Cancel anytime</li>
        </ul>
      </div>

      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '14px', padding: '2rem' }}>
        <h2 style={{ marginTop: 0, fontSize: '1.2rem' }}>Get Started Today</h2>
        <p style={{ color: '#555' }}>Email us your restaurant details and we will get you listed within 24 hours.</p>
        <a href="mailto:info@chicagohalalrestaurants.com" style={{
          display: 'inline-block', background: '#16a34a', color: '#fff',
          padding: '0.75rem 2rem', borderRadius: '8px', textDecoration: 'none',
          fontWeight: '700', fontSize: '1rem'
        }}>
          Email Us to Get Listed
        </a>
        <p style={{ color: '#aaa', fontSize: '0.85rem', marginTop: '1rem' }}>
          info@chicagohalalrestaurants.com
        </p>
      </div>
    </main>
  )
}
