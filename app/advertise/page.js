export const metadata = {
  title: 'Advertise | Chicago Halal Restaurants',
  description: 'Get your halal restaurant featured on ChicagoHalalRestaurants.com',
}

export default function Advertise() {
  return (
    <main style={{ fontFamily: 'sans-serif', maxWidth: '700px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>🍽️ Get Your Restaurant Featured</h1>
      <p style={{ fontSize: '1.1rem', color: '#555', marginTop: '0.5rem' }}>
        Chicago Halal Restaurants is the fastest growing halal food directory in the Chicago area.
        Get your restaurant in front of thousands of halal food seekers every month.
      </p>

      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '2rem', margin: '2rem 0' }}>
        <h2 style={{ color: '#15803d', marginTop: 0 }}>Featured Listing — $29/month</h2>
        <ul style={{ color: '#333', lineHeight: '2' }}>
          <li>✅ Priority placement at the top of your neighborhood page</li>
          <li>✅ Your restaurant highlighted with a featured badge</li>
          <li>✅ Link to your website or menu</li>
          <li>✅ Listed across all relevant cuisine + neighborhood pages</li>
          <li>✅ Cancel anytime</li>
        </ul>
      </div>

      <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '12px', padding: '2rem', margin: '2rem 0' }}>
        <h2 style={{ marginTop: 0 }}>Get Started</h2>
        <p style={{ color: '#555' }}>Email us with your restaurant details and we'll get you listed within 24 hours.</p>
        <a href="mailto:info@chicagohalalrestaurants.com"
          style={{ display: 'inline-block', background: '#16a34a', color: '#fff', padding: '0.75rem 2rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '1rem' }}>
          Email Us to Get Listed
        </a>
      </div>

      <p style={{ color: '#888', fontSize: '0.9rem' }}>
        Questions? Email info@chicagohalalrestaurants.com
      </p>
    </main>
  )
}
