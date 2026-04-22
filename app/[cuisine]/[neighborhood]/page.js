import restaurants from '../../data/restaurants.json'
import content from '../../data/content.json'
import Link from 'next/link'

export async function generateStaticParams() {
  const combinations = []
  const seen = new Set()
  for (const r of restaurants) {
    const key = `${r.cuisine}-${r.neighborhood}`
    if (!seen.has(key)) {
      seen.add(key)
      combinations.push({ cuisine: r.cuisine, neighborhood: r.neighborhood })
    }
  }
  return combinations
}

export async function generateMetadata({ params }) {
  const { cuisine, neighborhood } = await params
  const c = cuisine.replace(/-/g, ' ').replace(/\b\w/g, x => x.toUpperCase())
  const n = neighborhood.replace(/-/g, ' ').replace(/\b\w/g, x => x.toUpperCase())
  return {
    title: `Best Halal ${c} Restaurants in ${n}, Chicago`,
    description: `Find the top halal ${c} restaurants in ${n}, Chicago. Verified halal options with ratings and addresses.`,
  }
}

export default async function Page({ params }) {
  const { cuisine, neighborhood } = await params
  const c = cuisine.replace(/-/g, ' ').replace(/\b\w/g, x => x.toUpperCase())
  const n = neighborhood.replace(/-/g, ' ').replace(/\b\w/g, x => x.toUpperCase())
  const results = restaurants.filter(r => r.cuisine === cuisine && r.neighborhood === neighborhood)
  const intro = content[`${cuisine}|${neighborhood}`] || ''

  return (
    <main style={{ maxWidth: '860px', margin: '0 auto', padding: '2rem 1rem', fontFamily: 'system-ui, sans-serif' }}>

      <Link href="/" style={{ color: '#16a34a', textDecoration: 'none', fontSize: '0.9rem' }}>← Back to Home</Link>

      <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#111', margin: '1rem 0 0.5rem' }}>
        Best Halal {c} Restaurants in {n}, Chicago
      </h1>

      {intro && (
        <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: '#444', marginBottom: '2rem', padding: '1rem', background: '#f9fafb', borderRadius: '8px', borderLeft: '4px solid #16a34a' }}>
          {intro}
        </p>
      )}

      {results.length === 0 ? (
        <p style={{ color: '#888' }}>No listings yet for this area — check back soon!</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {results.map((r, i) => (
            <div key={i} style={{
              background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px',
              padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
            }}>
              <h2 style={{ margin: '0 0 0.35rem', fontSize: '1.1rem', fontWeight: '700', color: '#111' }}>{r.name}</h2>
              <p style={{ margin: '0 0 0.25rem', color: '#555', fontSize: '0.9rem' }}>📍 {r.address}</p>
              <p style={{ margin: '0 0 0.5rem', color: '#f59e0b', fontWeight: '600', fontSize: '0.9rem' }}>★ {r.rating} / 5</p>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#888' }}>
                {r.certified_halal ? '✅ Halal Certified' : ''} {r.family_friendly ? '· 👨‍👩‍👧 Family Friendly' : ''} {r.delivery_available ? '· 🚗 Delivery Available' : ''}
              </p>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: '3rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
        <p style={{ margin: '0 0 0.75rem', fontWeight: '600', color: '#15803d' }}>🍽️ Own a restaurant on this list?</p>
        <Link href="/advertise" style={{
          display: 'inline-block', background: '#16a34a', color: '#fff',
          padding: '0.6rem 1.5rem', borderRadius: '8px', textDecoration: 'none', fontWeight: '600'
        }}>
          Get Featured — $29/mo
        </Link>
      </div>

    </main>
  )
}
