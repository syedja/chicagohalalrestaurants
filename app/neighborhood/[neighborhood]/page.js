import restaurants from '../../data/restaurants.json'
import Link from 'next/link'

export async function generateStaticParams() {
  const neighborhoods = [...new Set(restaurants.map(r => r.neighborhood))]
  return neighborhoods.map(n => ({ neighborhood: n }))
}

export async function generateMetadata({ params }) {
  const { neighborhood } = await params
  const n = neighborhood.replace(/-/g, ' ').replace(/\b\w/g, x => x.toUpperCase())
  return {
    title: `Halal Restaurants in ${n} | Chicago Halal Restaurants`,
    description: `Find all halal restaurants in ${n}. Browse by cuisine type with verified halal listings.`,
  }
}

export default async function NeighborhoodPage({ params }) {
  const { neighborhood } = await params
  const n = neighborhood.replace(/-/g, ' ').replace(/\b\w/g, x => x.toUpperCase())
  const results = restaurants.filter(r => r.neighborhood === neighborhood)

  const byCuisine = {}
  for (const r of results) {
    if (!byCuisine[r.cuisine]) byCuisine[r.cuisine] = []
    byCuisine[r.cuisine].push(r)
  }

  return (
    <main style={{ maxWidth: '860px', margin: '0 auto', padding: '2rem 1rem', fontFamily: 'system-ui, sans-serif' }}>
      <Link href="/" style={{ color: '#16a34a', textDecoration: 'none', fontSize: '0.9rem' }}>← Back to Home</Link>
      <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#111', margin: '1rem 0 0.25rem' }}>
        Halal Restaurants in {n}
      </h1>
      <p style={{ color: '#888', marginBottom: '2rem' }}>{results.length} restaurants found</p>
      {Object.entries(byCuisine).map(([cuisine, list]) => (
        <section key={cuisine} style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#111', marginBottom: '1rem', textTransform: 'capitalize' }}>
            {cuisine.replace(/-/g, ' ')} ({list.length})
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {list.map((r, i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '1rem 1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                <h3 style={{ margin: '0 0 0.25rem', fontSize: '1rem', fontWeight: '600', color: '#111' }}>{r.name}</h3>
                <p style={{ margin: '0 0 0.25rem', color: '#555', fontSize: '0.85rem' }}>📍 {r.address}</p>
                <p style={{ margin: 0, color: '#f59e0b', fontSize: '0.85rem', fontWeight: '600' }}>★ {r.rating} / 5</p>
              </div>
            ))}
          </div>
        </section>
      ))}
      <div style={{ marginTop: '2rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
        <p style={{ margin: '0 0 0.75rem', fontWeight: '600', color: '#15803d' }}>🍽️ Own a restaurant in {n}?</p>
        <Link href="/advertise" style={{ display: 'inline-block', background: '#16a34a', color: '#fff', padding: '0.6rem 1.5rem', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}>
          Get Featured — from $19/mo
        </Link>
      </div>
    </main>
  )
}