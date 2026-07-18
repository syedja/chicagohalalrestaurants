import Link from 'next/link'

export const metadata = {
  title: 'List Your Restaurant | Chicago Halal Restaurants',
  description: 'Free directory listings for every Zabihah halal restaurant in Chicagoland. Featured and Premium tiers available for restaurants who want more visibility.',
}

const FOREST = '#14352a';
const FOREST_DEEP = '#0b1f18';
const GOLD = '#c9a227';
const IVORY = '#f7f3e8';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '',
    border: '#e6dfc9',
    features: [
      'Listed in the searchable directory',
      'Name, cuisine & neighborhood shown',
      'Halal Certified badge if verified',
    ],
    cta: 'Get Listed Free',
    href: 'mailto:info@chicagohalalrestaurants.com?subject=Free Listing Request',
  },
  {
    name: 'Featured',
    price: '$29',
    period: '/year',
    border: GOLD,
    features: [
      'Everything in Free',
      'Highlighted card styling in the directory',
      'Priority placement within your cuisine',
    ],
    cta: 'Get Featured',
    href: 'mailto:info@chicagohalalrestaurants.com?subject=Featured Listing Request',
  },
  {
    name: 'Premium',
    price: '$99',
    period: '/year',
    border: GOLD,
    badge: 'Most Popular',
    features: [
      'Everything in Featured',
      'Dedicated page at chicagohalalrestaurants.com/yourrestaurantname',
      'Full menu, photo gallery & hours',
      'Website, socials & directions links',
    ],
    cta: 'Get Premium',
    href: 'mailto:info@chicagohalalrestaurants.com?subject=Premium Listing Request',
  },
]

const certifications = [
  { name: 'HFSAA', full: 'Halal Food Standards Alliance of America' },
  { name: 'HMS', full: 'Halal Monitoring Services' },
  { name: 'ISWA', full: 'Islamic Society of the Washington Area' },
  { name: 'MCG', full: 'Muslim Consumer Group' },
]

const steps = [
  { step: '1', title: 'Message Us', desc: 'WhatsApp, call, or email — tell us about your restaurant.' },
  { step: '2', title: 'We Verify', desc: 'We confirm your Zabihah halal certification with one of our accepted bodies.' },
  { step: '3', title: 'You Choose a Tier', desc: 'Free, Featured, or Premium — whichever fits right now.' },
  { step: '4', title: 'We Publish', desc: 'We enter your listing (and Premium page content, if applicable) for you.' },
]

const faqs = [
  { q: 'Is the Free tier really free, forever?', a: 'Yes. Every certified halal restaurant can be listed in our directory at no cost — name, cuisine, neighborhood, and a Halal Certified badge.' },
  { q: 'Why annual billing instead of monthly?', a: 'At these price points, monthly card processing fees would eat a meaningful chunk of what you pay. Annual billing keeps more of your money going toward your listing, not transaction fees.' },
  { q: 'Can I pay by Zelle instead of card?', a: "Yes — message us on WhatsApp and we'll set that up directly, no online payment required." },
  { q: 'Do I need to build my own Premium page?', a: "No. Send us your menu, photos, and details, and we'll build and publish your dedicated page for you." },
  { q: 'Can I upgrade later?', a: 'Yes — start on Free and move up to Featured or Premium whenever you\'re ready.' },
  { q: 'What if my certification isn\'t on your list?', a: 'Email us and we\'ll review it. We accept all credible Islamic halal certification bodies.' },
]

export default function Advertise() {
  return (
    <main style={{ maxWidth: '860px', margin: '0 auto', padding: '2rem 1rem 4rem', fontFamily: "'Inter', system-ui, sans-serif", color: '#1d221f' }}>
      <Link href="/" style={{ color: FOREST, textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>← Back to Directory</Link>

      {/* Hero */}
      <div style={{ textAlign: 'center', margin: '2.5rem 0 3rem' }}>
        <p style={{
          display: 'inline-block', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: FOREST, background: '#eef1ea', padding: '4px 12px',
          borderRadius: '20px', marginBottom: '1rem',
        }}>
          For Restaurant Owners
        </p>
        <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 'clamp(1.9rem, 5vw, 2.6rem)', fontWeight: 600, color: '#111', margin: '0 0 0.75rem' }}>
          Get your restaurant found.
        </h1>
        <p style={{ fontSize: '1.05rem', color: '#555', maxWidth: '560px', margin: '0 auto 1rem', lineHeight: 1.6 }}>
          Every Zabihah halal restaurant in Chicagoland can be listed for free. Featured and
          Premium tiers get you more visibility for the price of a couple coffees a month.
        </p>
        <div style={{ display: 'inline-block', background: '#fef3c7', border: '1px solid #fde68a', borderRadius: '8px', padding: '0.5rem 1.25rem', fontSize: '0.88rem', color: '#92400e', fontWeight: 600 }}>
          We only list restaurants with credible Zabihah halal certification
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '3rem', textAlign: 'center' }}>
        {[
          { number: '280+', label: 'Halal Listings' },
          { number: '13', label: 'Neighborhoods' },
          { number: '14', label: 'Cuisine Categories' },
        ].map((stat, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid #e6dfc9', borderRadius: '12px', padding: '1.25rem' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: FOREST }}>{stat.number}</div>
            <div style={{ fontSize: '0.85rem', color: '#666' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Plans */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
        {plans.map((plan, i) => (
          <div key={i} style={{
            background: plan.name === 'Premium' ? 'linear-gradient(180deg, #fffaf0 0%, #fff 55%)' : '#fff',
            border: `2px solid ${plan.border}`,
            borderRadius: '16px', padding: '1.75rem 1.5rem', position: 'relative',
            boxShadow: '0 2px 8px rgba(20,53,42,0.06)'
          }}>
            {plan.badge && (
              <div style={{
                position: 'absolute', top: '-13px', left: '50%', transform: 'translateX(-50%)',
                background: GOLD, color: FOREST_DEEP, padding: '0.28rem 1.1rem',
                borderRadius: '20px', fontSize: '0.72rem', fontWeight: 700, whiteSpace: 'nowrap'
              }}>
                {plan.badge}
              </div>
            )}
            <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '1.25rem', fontWeight: 600, color: FOREST, margin: '0 0 0.5rem' }}>{plan.name}</h2>
            <div style={{ marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '2.4rem', fontWeight: 800, color: '#111' }}>{plan.price}</span>
              <span style={{ color: '#888', fontSize: '0.85rem' }}>{plan.period}</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', lineHeight: 1.9 }}>
              {plan.features.map((f, j) => (
                <li key={j} style={{
                  fontSize: '0.86rem', color: '#333', paddingLeft: '1.1rem', position: 'relative',
                  wordBreak: 'break-word', overflowWrap: 'anywhere',
                }}>
                  <span style={{ position: 'absolute', left: 0, top: '0.15rem', color: GOLD }}>✓</span>{f}
                </li>
              ))}
            </ul>
            <a href={plan.href} style={{
              display: 'block', textAlign: 'center',
              background: plan.name === 'Free' ? '#fff' : FOREST,
              color: plan.name === 'Free' ? FOREST : '#fff',
              border: plan.name === 'Free' ? `2px solid ${FOREST}` : 'none',
              padding: '0.75rem', borderRadius: '8px',
              textDecoration: 'none', fontWeight: 700, fontSize: '0.92rem'
            }}>
              {plan.cta}
            </a>
          </div>
        ))}
      </div>

      <p style={{ textAlign: 'center', color: '#888', fontSize: '0.85rem', marginBottom: '3rem' }}>
        Prefer to pay by Zelle instead of card?{' '}
        <a href="https://wa.me/16302104365" style={{ color: FOREST, fontWeight: 600 }}>Message us on WhatsApp</a> and we'll set you up directly.
      </p>

      {/* Accepted Certifications */}
      <div style={{ background: '#fff', border: '1px solid #e6dfc9', borderRadius: '16px', padding: '1.75rem', marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '1.2rem', fontWeight: 600, color: '#111', margin: '0 0 1rem' }}>Accepted Halal Certifications</h2>
        <p style={{ color: '#555', fontSize: '0.9rem', margin: '0 0 1rem' }}>
          We list restaurants certified by credible Islamic halal organizations, including:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {certifications.map((cert, i) => (
            <div key={i} style={{ background: IVORY, border: '1px solid #e6dfc9', borderRadius: '8px', padding: '0.75rem 1rem' }}>
              <div style={{ fontWeight: 700, color: FOREST, fontSize: '0.95rem' }}>{cert.name}</div>
              <div style={{ color: '#555', fontSize: '0.78rem' }}>{cert.full}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div style={{ background: '#fff', border: '1px solid #e6dfc9', borderRadius: '16px', padding: '2rem', marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '1.25rem', fontWeight: 600, margin: '0 0 1.5rem', color: '#111' }}>How It Works</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.5rem', textAlign: 'center' }}>
          {steps.map((s, i) => (
            <div key={i}>
              <div style={{
                width: '40px', height: '40px', background: FOREST, color: '#fff',
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 0.75rem', fontWeight: 800, fontSize: '1.05rem'
              }}>{s.step}</div>
              <h3 style={{ margin: '0 0 0.35rem', fontSize: '0.92rem', fontWeight: 700 }}>{s.title}</h3>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#666' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div style={{ background: IVORY, border: '1px solid #e6dfc9', borderRadius: '16px', padding: '2rem', marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '1.25rem', fontWeight: 600, margin: '0 0 1.5rem', color: '#111' }}>Common Questions</h2>
        {faqs.map((faq, i) => (
          <div key={i} style={{ marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: i < faqs.length - 1 ? '1px solid #e6dfc9' : 'none' }}>
            <h3 style={{ margin: '0 0 0.35rem', fontSize: '0.92rem', fontWeight: 700, color: '#111' }}>{faq.q}</h3>
            <p style={{ margin: 0, fontSize: '0.86rem', color: '#555' }}>{faq.a}</p>
          </div>
        ))}
      </div>

      {/* Final CTA */}
      <div style={{ textAlign: 'center', background: FOREST_DEEP, borderRadius: '16px', padding: '2.25rem 1.5rem' }}>
        <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", color: IVORY, margin: '0 0 0.5rem', fontWeight: 600 }}>Ready to be found?</h2>
        <p style={{ color: 'rgba(247,243,232,0.7)', margin: '0 0 1.25rem' }}>Let's talk about your restaurant — no cost, no pressure.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginBottom: '1rem' }}>
          <a href="mailto:info@chicagohalalrestaurants.com" style={{
            display: 'inline-block', background: GOLD, color: FOREST_DEEP,
            padding: '0.8rem 2rem', borderRadius: '8px', textDecoration: 'none',
            fontWeight: 700, fontSize: '0.95rem'
          }}>
            Email Us
          </a>
          <a href="https://wa.me/16302104365" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-block', background: 'transparent', color: IVORY, border: '1.5px solid rgba(229,205,125,0.5)',
            padding: '0.8rem 2rem', borderRadius: '8px', textDecoration: 'none',
            fontWeight: 700, fontSize: '0.95rem'
          }}>
            WhatsApp Us
          </a>
        </div>
        <p style={{ color: 'rgba(247,243,232,0.7)', fontSize: '0.88rem', marginTop: '0.5rem' }}>
          Call or text <a href="tel:16302104365" style={{ color: '#e5cd7d', fontWeight: 600, textDecoration: 'none' }}>(630) 210-4365</a>
        </p>
      </div>
    </main>
  )
}
