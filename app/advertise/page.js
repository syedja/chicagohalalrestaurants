import Link from 'next/link'

export const metadata = {
  title: 'Restaurant Marketing Services | Chicago Halal Restaurants',
  description: 'We run your social media, review replies, and Google Business profile for you — done-for-you marketing for Chicago halal restaurants.',
}

const plans = [
  {
    name: 'Essentials',
    price: '$149',
    period: '/month',
    color: '#16a34a',
    bg: '#f0fdf4',
    border: '#bbf7d0',
    features: [
      '✅ 8 posts/month across Instagram, Facebook & WhatsApp',
      '✅ Google Business Profile kept current',
      '✅ Review replies — up to 10/month',
      '✅ Featured Premium directory listing',
      '✅ Monthly recap of what was posted',
    ],
    cta: 'Start Free Trial',
    href: '/studio/signup',
  },
  {
    name: 'Growth',
    price: '$249',
    period: '/month',
    color: '#d97706',
    bg: '#fffbeb',
    border: '#fde68a',
    badge: '🏆 Most Popular',
    features: [
      '✅ Everything in Essentials',
      '✅ 14–16 posts/month',
      '✅ Ramadan, Eid & holiday campaigns planned for you',
      '✅ Unlimited review replies, within 48 hours',
      '✅ Quarterly check-in on what\'s working',
    ],
    cta: 'Start Free Trial',
    href: '/studio/signup',
  }
]

const certifications = [
  { name: 'HFSAA', full: 'Halal Food Standards Alliance of America' },
  { name: 'HMS', full: 'Halal Monitoring Services' },
  { name: 'ISWA', full: 'Islamic Society of the Washington Area' },
  { name: 'MCG', full: 'Muslim Consumer Group' },
]

export default function Advertise() {
  return (
    <main style={{ maxWidth: '860px', margin: '0 auto', padding: '2rem 1rem', fontFamily: 'system-ui, sans-serif' }}>
      <Link href="/" style={{ color: '#16a34a', textDecoration: 'none', fontSize: '0.9rem' }}>← Back to Home</Link>

      {/* Hero */}
      <div style={{ textAlign: 'center', margin: '2rem 0 3rem' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#111', margin: '0 0 0.75rem' }}>
          📱 We Run Your Marketing For You
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#555', maxWidth: '600px', margin: '0 auto 0.75rem' }}>
          Not a listing you buy and forget. We personally write your posts, reply to
          your reviews, and keep your Google Business profile current — every week,
          without you lifting a finger.
        </p>
        <div style={{ display: 'inline-block', background: '#fef3c7', border: '1px solid #fde68a', borderRadius: '8px', padding: '0.5rem 1.25rem', fontSize: '0.9rem', color: '#92400e', fontWeight: '600' }}>
          ⚠️ We only work with restaurants with credible Zabihah halal certification
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '3rem', textAlign: 'center' }}>
        {[
          { number: '280+', label: 'Halal Listings' },
          { number: '13', label: 'Neighborhoods' },
          { number: '14', label: 'Cuisine Categories' },
        ].map((stat, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1.25rem' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#16a34a' }}>{stat.number}</div>
            <div style={{ fontSize: '0.85rem', color: '#666' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Why this, not a directory listing */}
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '2rem', marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#111', margin: '0 0 1rem' }}>
          Why Not Just Use a Free Directory?
        </h2>
        <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.7', margin: 0 }}>
          A free listing sits there. It doesn't post on Instagram for you, doesn't reply
          to the review you've been meaning to answer for three weeks, and doesn't plan
          your Ramadan content before Ramadan gets busy. We do — personally, every week,
          in your restaurant's own voice. Think of it as having a marketing person for a
          fraction of what one costs.
        </p>
      </div>

      {/* Plans */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
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
            <Link href={plan.href} style={{
              display: 'block', textAlign: 'center', background: plan.color,
              color: '#fff', padding: '0.85rem', borderRadius: '8px',
              textDecoration: 'none', fontWeight: '700', fontSize: '1rem'
            }}>
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      <p style={{ textAlign: 'center', color: '#888', fontSize: '0.85rem', marginBottom: '2.5rem' }}>
        Prefer to pay by Zelle or check instead of card/PayPal?{' '}
        <a href="https://wa.me/16302104365" style={{ color: '#16a34a', fontWeight: '600' }}>Message us on WhatsApp</a> and we'll set you up directly — no online payment required.
      </p>

      {/* Just want a free listing */}
      <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '1.5rem', marginBottom: '2.5rem', textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.05rem', fontWeight: '700', color: '#111' }}>
          Just want a free listing, no service?
        </h3>
        <p style={{ margin: '0 0 1rem', color: '#666', fontSize: '0.9rem' }}>
          Every certified halal restaurant can be listed in our directory for free — name, address, rating & certification badge.
        </p>
        <a href="mailto:info@chicagohalalrestaurants.com?subject=Free Listing Request" style={{
          display: 'inline-block', background: '#fff', color: '#16a34a', border: '2px solid #16a34a',
          padding: '0.65rem 1.5rem', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '0.9rem'
        }}>
          Get Listed Free
        </a>
      </div>

      {/* Accepted Certifications */}
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '1.75rem', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#111', margin: '0 0 1rem' }}>✅ Accepted Halal Certifications</h2>
        <p style={{ color: '#555', fontSize: '0.9rem', margin: '0 0 1rem' }}>
          We only work with restaurants certified by credible Islamic halal organizations including:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {certifications.map((cert, i) => (
            <div key={i} style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '0.75rem 1rem' }}>
              <div style={{ fontWeight: '700', color: '#15803d', fontSize: '0.95rem' }}>{cert.name}</div>
              <div style={{ color: '#555', fontSize: '0.78rem' }}>{cert.full}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '2rem', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: '700', margin: '0 0 1.5rem', color: '#111' }}>How It Works</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.5rem', textAlign: 'center' }}>
          {[
            { step: '1', title: 'Talk to Us', desc: 'WhatsApp, call, or email — tell us about your restaurant.' },
            { step: '2', title: 'We Set You Up', desc: 'We learn your menu, voice, and what makes you different.' },
            { step: '3', title: 'We Post For You', desc: 'Every week, without you needing to do anything.' },
            { step: '4', title: 'You Approve & Grow', desc: 'Quick approvals, steady presence, more customers finding you.' },
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
          { q: 'Do I have to write anything myself?', a: 'No. We write every post and reply based on your menu, hours, and voice. You just approve before anything goes out, if you want to.' },
          { q: 'What if my certification is not on your list?', a: 'Email us and we will review your certification. We accept all credible Islamic halal certification bodies.' },
          { q: 'How does the free trial work?', a: 'Start your trial online with a card or PayPal, or message us on WhatsApp to pay by Zelle. Either way, you are not charged for 14 days and can cancel anytime before then.' },
          { q: 'Can I cancel anytime?', a: 'Yes, no contracts. Cancel anytime — no questions asked.' },
          { q: 'What if I just want a free listing, no service?', a: 'That is always available — email us and we will get you listed at no cost.' },
        ].map((faq, i) => (
          <div key={i} style={{ marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: i < 4 ? '1px solid #e5e7eb' : 'none' }}>
            <h3 style={{ margin: '0 0 0.35rem', fontSize: '0.95rem', fontWeight: '700', color: '#111' }}>Q: {faq.q}</h3>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#555' }}>A: {faq.a}</p>
          </div>
        ))}
      </div>

      {/* Final CTA */}
      <div style={{ textAlign: 'center', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '16px', padding: '2rem' }}>
        <h2 style={{ color: '#15803d', margin: '0 0 0.5rem' }}>Ready to stop doing this yourself?</h2>
        <p style={{ color: '#555', margin: '0 0 1.25rem' }}>Let's talk about your restaurant — no cost, no pressure.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginBottom: '1rem' }}>
          <a href="mailto:info@chicagohalalrestaurants.com" style={{
            display: 'inline-block', background: '#16a34a', color: '#fff',
            padding: '0.85rem 2rem', borderRadius: '8px', textDecoration: 'none',
            fontWeight: '700', fontSize: '1rem'
          }}>
            📧 Email Us
          </a>
          <a href="https://wa.me/16302104365" target="_blank" style={{
            display: 'inline-block', background: '#25d366', color: '#fff',
            padding: '0.85rem 2rem', borderRadius: '8px', textDecoration: 'none',
            fontWeight: '700', fontSize: '1rem'
          }}>
            💬 WhatsApp Us
          </a>
        </div>
        <p style={{ color: '#555', fontSize: '0.9rem', marginTop: '0.5rem' }}>
          📞 Call or text us at <a href="tel:16302104365" style={{ color: '#16a34a', fontWeight: '600', textDecoration: 'none' }}>(630) 210-4365</a>
        </p>
        <p style={{ color: '#aaa', fontSize: '0.82rem', marginTop: '0.25rem' }}>WhatsApp · Text · Call — whichever is easiest for you</p>
      </div>

    </main>
  )
}
