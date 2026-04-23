import Link from 'next/link'

export const metadata = {
  title: 'Advertise | Chicago Halal Restaurants',
  description: 'Get your certified Zabihah halal restaurant featured on ChicagoHalalRestaurants.com.',
}

const StandardMockup = () => (
  <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1.25rem', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.1rem', fontWeight: '700', color: '#111' }}>Your Restaurant Name</h3>
      <span style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#15803d', fontSize: '0.72rem', fontWeight: '700', padding: '0.2rem 0.6rem', borderRadius: '20px', whiteSpace: 'nowrap' }}>✅ Halal Certified</span>
    </div>
    <p style={{ margin: '0 0 0.25rem', color: '#555', fontSize: '0.85rem' }}>📍 123 Your Street, Chicago, IL 60659</p>
    <p style={{ margin: '0 0 0.25rem', color: '#f59e0b', fontSize: '0.85rem', fontWeight: '600' }}>★ 4.7 / 5</p>
    <p style={{ margin: '0', fontSize: '0.8rem', color: '#888' }}>✅ Zabihah Halal Certified · 👨‍👩‍👧 Family Friendly · 🚗 Delivery Available</p>
  </div>
)

const PremiumMockup = () => (
  <div style={{ border: '2px solid #16a34a', borderRadius: '12px', padding: '1.25rem', background: '#f0fdf4', boxShadow: '0 4px 12px rgba(22,163,74,0.15)', position: 'relative' }}>
    <div style={{ position: 'absolute', top: '-13px', left: '1rem', background: '#16a34a', color: '#fff', fontSize: '0.72rem', fontWeight: '700', padding: '0.2rem 0.75rem', borderRadius: '20px' }}>⭐ FEATURED</div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '0.25rem' }}>
      <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.1rem', fontWeight: '700', color: '#111' }}>Your Restaurant Name</h3>
      <span style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#15803d', fontSize: '0.72rem', fontWeight: '700', padding: '0.2rem 0.6rem', borderRadius: '20px', whiteSpace: 'nowrap' }}>✅ Halal Certified</span>
    </div>
    <p style={{ margin: '0 0 0.25rem', color: '#555', fontSize: '0.85rem' }}>📍 123 Your Street, Chicago, IL 60659</p>
    <p style={{ margin: '0 0 0.25rem', color: '#f59e0b', fontSize: '0.85rem', fontWeight: '600' }}>★ 4.7 / 5</p>
    <p style={{ margin: '0 0 0.5rem', fontSize: '0.8rem', color: '#888' }}>✅ Zabihah Halal Certified · 👨‍👩‍👧 Family Friendly · 🚗 Delivery Available</p>
    <div style={{ borderTop: '1px solid #bbf7d0', paddingTop: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      <a style={{ fontSize: '0.82rem', color: '#16a34a', textDecoration: 'none', fontWeight: '600' }}>📞 (312) 555-0123</a>
      <span style={{ color: '#ccc' }}>·</span>
      <a style={{ fontSize: '0.82rem', color: '#16a34a', textDecoration: 'none', fontWeight: '600' }}>🌐 yourwebsite.com</a>
      <span style={{ color: '#ccc' }}>·</span>
      <a style={{ fontSize: '0.82rem', color: '#16a34a', textDecoration: 'none', fontWeight: '600' }}>📋 View Menu</a>
      <span style={{ color: '#ccc' }}>·</span>
      <a style={{ fontSize: '0.82rem', color: '#16a34a', textDecoration: 'none', fontWeight: '600' }}>Instagram</a>
    </div>
  </div>
)

const plans = [
  {
    name: 'Standard',
    price: '$19',
    period: '/month',
    color: '#16a34a',
    bg: '#f0fdf4',
    border: '#bbf7d0',
    features: [
      '✅ Listed in halal directory',
      '✅ Name, address & rating displayed',
      '✅ Zabihah Halal certified badge',
      '✅ Appears on cuisine + neighborhood pages',
      '✅ Listed within 48 hours',
      '✅ Cancel anytime',
    ],
    cta: 'Get Standard Listing',
    email: 'info@chicagohalalrestaurants.com?subject=Standard Listing Request'
  },
  {
    name: 'Premium',
    price: '$49',
    period: '/month',
    color: '#d97706',
    bg: '#fffbeb',
    border: '#fde68a',
    badge: '🏆 Best Value',
    features: [
      '✅ Everything in Standard',
      '✅ Featured badge & priority placement',
      '✅ Homepage spotlight section',
      '✅ Phone number displayed',
      '✅ Menu link included',
      '✅ Social media links',
      '✅ Listed within 12 hours',
      '✅ Priority support',
    ],
    cta: 'Get Premium Listing',
    email: 'info@chicagohalalrestaurants.com?subject=Premium Listing Request'
  }
]

const certifications = [
  { name: 'HFSAA', full: 'Halal Food Standards Alliance of America' },
  { name: 'HMS', full: 'Halal Monitoring Services' },
  { name: 'ISWA', full: 'Islamic Society of the Washington Area' },
  { name: 'MCG', full: 'Muslim Consumer Group' },
  { name: 'Zabihah.com', full: 'Zabihah Verified Listing' },
]

export default function Advertise() {
  return (
    <main style={{ maxWidth: '860px', margin: '0 auto', padding: '2rem 1rem', fontFamily: 'system-ui, sans-serif' }}>
      <Link href="/" style={{ color: '#16a34a', textDecoration: 'none', fontSize: '0.9rem' }}>← Back to Home</Link>

      {/* Hero */}
      <div style={{ textAlign: 'center', margin: '2rem 0 3rem' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#111', margin: '0 0 0.75rem' }}>
          🍽️ Get Your Restaurant Featured
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#555', maxWidth: '600px', margin: '0 auto 0.75rem' }}>
          Chicago Halal Restaurants is the only Chicago directory exclusively listing
          <strong> Zabihah certified halal</strong> restaurants — verified by HFSAA, HMS, and other credible Islamic certification bodies.
        </p>
        <div style={{ display: 'inline-block', background: '#fef3c7', border: '1px solid #fde68a', borderRadius: '8px', padding: '0.5rem 1.25rem', fontSize: '0.9rem', color: '#92400e', fontWeight: '600' }}>
          ⚠️ We only accept restaurants with credible Zabihah halal certification
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '3rem', textAlign: 'center' }}>
        {[
          { number: '280+', label: 'Halal Listings' },
          { number: '13', label: 'Neighborhoods' },
          { number: '9', label: 'Cuisine Categories' },
        ].map((stat, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1.25rem' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#16a34a' }}>{stat.number}</div>
            <div style={{ fontSize: '0.85rem', color: '#666' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Listing Previews */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#111', marginBottom: '0.5rem' }}>
          👀 See How Your Listing Will Look
        </h2>
        <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Here's exactly how your restaurant will appear to visitors on our site.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
          <div>
            <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '0.6rem 1rem', marginBottom: '0.75rem', display: 'inline-block' }}>
              <span style={{ fontWeight: '700', color: '#16a34a', fontSize: '0.85rem' }}>Standard Listing — $19/mo</span>
            </div>
            <StandardMockup />
          </div>
          <div>
            <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '0.6rem 1rem', marginBottom: '0.75rem', display: 'inline-block' }}>
              <span style={{ fontWeight: '700', color: '#d97706', fontSize: '0.85rem' }}>🏆 Premium Listing — $49/mo</span>
            </div>
            <PremiumMockup />
          </div>
        </div>
      </div>

      {/* Plans */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {plans.map((plan, i) => (
          <div key={i} style={{
            background: plan.bg, border: `2px solid ${plan.border}`,
            borderRadius: '16px', padding: '2rem', position: 'relative',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
          }}>
            {plan.badge && (
              <div style={{
                position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
                background: plan.color, color: '#fff', padding: '0.3rem 1.25rem',
                borderRadius: '20px', fontSize: '0.8rem', fontWeight: '700', whiteSpace: 'nowrap'
              }}>
                {plan.badge}
              </div>
            )}
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: plan.color, margin: '0 0 0.5rem' }}>{plan.name}</h2>
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '2.8rem', fontWeight: '800', color: '#111' }}>{plan.price}</span>
              <span style={{ color: '#888', fontSize: '0.9rem' }}>{plan.period}</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.75rem', lineHeight: '2.2' }}>
              {plan.features.map((f, j) => (
                <li key={j} style={{ fontSize: '0.9rem', color: '#333' }}>{f}</li>
              ))}
            </ul>
            <a href={`mailto:${plan.email}`} style={{
              display: 'block', textAlign: 'center', background: plan.color,
              color: '#fff', padding: '0.85rem', borderRadius: '8px',
              textDecoration: 'none', fontWeight: '700', fontSize: '1rem'
            }}>
              {plan.cta}
            </a>
          </div>
        ))}
      </div>

      {/* Accepted Certifications */}
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '1.75rem', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#111', margin: '0 0 1rem' }}>✅ Accepted Halal Certifications</h2>
        <p style={{ color: '#555', fontSize: '0.9rem', margin: '0 0 1rem' }}>
          We only list restaurants certified by credible Zabihah halal organizations including:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {certifications.map((cert, i) => (
            <div key={i} style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '0.75rem 1rem' }}>
              <div style={{ fontWeight: '700', color: '#15803d', fontSize: '0.95rem' }}>{cert.name}</div>
              <div style={{ color: '#555', fontSize: '0.78rem' }}>{cert.full}</div>
            </div>
          ))}
        </div>
        <p style={{ color: '#888', fontSize: '0.82rem', margin: '1rem 0 0' }}>
          Not sure if your certification qualifies? Email us and we will verify.
        </p>
      </div>

      {/* How it works */}
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '2rem', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: '700', margin: '0 0 1.5rem', color: '#111' }}>How It Works</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.5rem', textAlign: 'center' }}>
          {[
            { step: '1', title: 'Pick a Plan', desc: 'Choose Standard or Premium based on your goals.' },
            { step: '2', title: 'Email Us', desc: 'Send your restaurant details and halal certification.' },
            { step: '3', title: 'We Verify', desc: 'We confirm your Zabihah halal certification is valid.' },
            { step: '4', title: 'Go Live', desc: 'Your listing goes live and customers start finding you.' },
          ].map((s, i) => (
            <div key={i}>
              <div style={{
                width: '42px', height: '42px', background: '#16a34a', color: '#fff',
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 0.75rem', fontWeight: '800', fontSize: '1.1rem'
              }}>{s.step}</div>
              <h3 style={{ margin: '0 0 0.35rem', fontSize: '0.95rem', fontWeight: '700' }}>{s.title}</h3>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#666' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '2rem', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: '700', margin: '0 0 1.5rem', color: '#111' }}>Common Questions</h2>
        {[
          { q: 'What is Zabihah halal?', a: 'Zabihah halal refers to meat slaughtered according to Islamic law, with certification from a recognized Islamic body such as HFSAA or HMS.' },
          { q: 'What if my certification is not on your list?', a: 'Email us and we will review your certification. We accept all credible Islamic halal certification bodies.' },
          { q: 'How do I pay?', a: 'Email us and we will send you a secure payment link. We accept all major credit cards.' },
          { q: 'Can I cancel anytime?', a: 'Yes, no contracts or commitments. Cancel anytime with a simple email.' },
          { q: 'What if my restaurant is already listed?', a: 'We will upgrade your existing listing to your chosen plan.' },
        ].map((faq, i) => (
          <div key={i} style={{ marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: i < 4 ? '1px solid #e5e7eb' : 'none' }}>
            <h3 style={{ margin: '0 0 0.35rem', fontSize: '0.95rem', fontWeight: '700', color: '#111' }}>Q: {faq.q}</h3>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#555' }}>A: {faq.a}</p>
          </div>
        ))}
      </div>

      {/* Final CTA */}
      <div style={{ textAlign: 'center', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '16px', padding: '2rem' }}>
        <h2 style={{ color: '#15803d', margin: '0 0 0.5rem' }}>Ready to reach more customers?</h2>
        <p style={{ color: '#555', margin: '0 0 1.25rem' }}>Join Chicago's only exclusively Zabihah halal restaurant directory.</p>
        <a href="mailto:info@chicagohalalrestaurants.com" style={{
          display: 'inline-block', background: '#16a34a', color: '#fff',
          padding: '0.85rem 2.5rem', borderRadius: '8px', textDecoration: 'none',
          fontWeight: '700', fontSize: '1rem'
        }}>
          Email Us to Get Started
        </a>
        <p style={{ color: '#aaa', fontSize: '0.82rem', marginTop: '0.75rem' }}>info@chicagohalalrestaurants.com</p>
      </div>

    </main>
  )
}
