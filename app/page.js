import restaurants from './data/restaurants.json'
import Link from 'next/link'

const cuisines = [
  { slug: 'pakistani', label: 'Pakistani' },
  { slug: 'indian', label: 'Indian' },
  { slug: 'mediterranean', label: 'Mediterranean' },
  { slug: 'middle-eastern', label: 'Middle Eastern' },
  { slug: 'turkish', label: 'Turkish' },
  { slug: 'lebanese', label: 'Lebanese' },
  { slug: 'fried-chicken', label: 'Fried Chicken' },
  { slug: 'somali', label: 'Somali' },
  { slug: 'ethiopian', label: 'Ethiopian' },
]

const neighborhoods = [
  { slug: 'devon-ave', label: 'Devon Ave' },
  { slug: 'bridgeview', label: 'Bridgeview' },
  { slug: 'oak-lawn', label: 'Oak Lawn' },
  { slug: 'skokie', label: 'Skokie' },
  { slug: 'naperville', label: 'Naperville' },
  { slug: 'chicago', label: 'Chicago' },
  { slug: 'schaumburg', label: 'Schaumburg' },
  { slug: 'evanston', label: 'Evanston' },
  { slug: 'logan-square', label: 'Logan Square' },
  { slug: 'hyde-park', label: 'Hyde Park' },
  { slug: 'orland-park', label: 'Orland Park' },
  { slug: 'lombard', label: 'Lombard' },
  { slug: 'glendale-heights', label: 'Glendale Heights' },
  { slug: 'chicago', label: 'Chicago' },
]

export const metadata = {
  title: 'Chicago Halal Restaurants | Find the Best Halal Food in Chicago',
  description: 'Discover the best halal restaurants in Chicago and suburbs. Browse by cuisine or neighborhood. All listings verified halal.',
}

export default function Home() {
  return (
    <main style={{ fontFamily: 'sans-serif', maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1a1a1a' }}>
          🕌 Chicago Halal Restaurants
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#555', marginTop: '0.5rem' }}>
          Find verified halal food across Chicago and suburbs
        </p>
        <p style={{ fontSize: '1rem', color: '#888', marginTop: '0.25rem' }}>
          {restaurants.length}+ restaurants listed across {neighborhoods.length} neighborhoods
        </p>
      </div>

      {/* Browse by Cuisine */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '2px solid #eee', paddingBottom: '0.5rem' }}>
          Browse by Cuisine
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.75rem' }}>
          {cuisines.map(c => (
            <Link key={c.slug} href={`/${c.slug}/chicago`}
              style={{ display: 'block', padding: '0.75rem 1rem', background: '#f9f9f9', border: '1px solid #eee', borderRadius: '8px', textDecoration: 'none', color: '#222', fontWeight: '500', textAlign: 'center' }}>
              {c.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Browse by Neighborhood */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '2px solid #eee', paddingBottom: '0.5rem' }}>
          Browse by Neighborhood
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.75rem' }}>
          {neighborhoods.map(n => (
            <Link key={n.slug} href={`/middle-eastern/${n.slug}`}
              style={{ display: 'block', padding: '0.75rem 1rem', background: '#f9f9f9', border: '1px solid #eee', borderRadius: '8px', textDecoration: 'none', color: '#222', fontWeight: '500', textAlign: 'center' }}>
              {n.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Listings */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '2px solid #eee', paddingBottom: '0.5rem' }}>
          Featured Restaurants
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
          {restaurants.slice(0, 12).map((r, i) => (
            <div key={i} style={{ border: '1px solid #eee', borderRadius: '10px', padding: '1rem', background: '#fff' }}>
              <h3 style={{ margin: '0 0 0.25rem', fontSize: '1rem' }}>{r.name}</h3>
              <p style={{ margin: '0 0 0.25rem', color: '#666', fontSize: '0.85rem' }}>{r.address}</p>
              <p style={{ margin: '0', color: '#f59e0b', fontSize: '0.85rem' }}>★ {r.rating} / 5</p>
              <Link href={`/${r.cuisine}/${r.neighborhood}`}
                style={{ display: 'inline-block', marginTop: '0.5rem', fontSize: '0.8rem', color: '#2563eb', textDecoration: 'none' }}>
                View all {r.cuisine} in {r.neighborhood.replace(/-/g, ' ')} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Advertise */}
      <section style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '2rem', textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', color: '#15803d' }}>🍽️ Own a Halal Restaurant?</h2>
        <p style={{ color: '#555', margin: '0.5rem 0 1rem' }}>
          Get featured at the top of your neighborhood listing. Reach thousands of halal food seekers in Chicago every month.
        </p>
        <Link href="/advertise"
          style={{ display: 'inline-block', background: '#16a34a', color: '#fff', padding: '0.75rem 2rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
          Get Featured — $29/mo
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: 'center', color: '#aaa', fontSize: '0.85rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
        © {new Date().getFullYear()} ChicagoHalalRestaurants.com · All listings verified halal
      </footer>

    </main>
  )
}
