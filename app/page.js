import { homepageSchema } from '@/app/lib/schema'
import restaurants from './data/restaurants.json'
import Link from 'next/link'

const cuisines = [
  { slug: 'pakistani', label: '🍛 Pakistani' },
  { slug: 'indian', label: '🍲 Indian' },
  { slug: 'mediterranean', label: '🥗 Mediterranean' },
  { slug: 'middle-eastern', label: '🧆 Middle Eastern' },
  { slug: 'turkish', label: '🥙 Turkish' },
  { slug: 'lebanese', label: '🫓 Lebanese' },
  { slug: 'fried-chicken', label: '🍗 Fried Chicken' },
  { slug: 'somali', label: '🍚 Somali' },
  { slug: 'ethiopian', label: '🫕 Ethiopian' },
  { slug: 'american', label: '🍔 American' },
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
  { slug: 'glendale-heights', label: 'Glendale Heights' },
  { slug: 'orland-park', label: 'Orland Park' },
  { slug: 'lombard', label: 'Lombard' },
]

const blogPosts = [
  {
    slug: 'zabihah-halal-indian-pakistani-lombard-glendale-heights-devon-ave',
    title: 'Best Zabihah Halal Indian & Pakistani Restaurants in Lombard, Glendale Heights & Devon Ave',
    excerpt: 'Find HFSAA and HMS-certified Zabihah halal Indian and Pakistani restaurants across three of Chicago\'s most food-rich neighborhoods.',
    tags: ['Zabihah Halal', 'Indian & Pakistani', 'Chicago Suburbs'],
  },
]

export const metadata = {
  title: 'Chicago Halal Restaurants | Find the Best Halal Food in Chicago',
  description: 'Find verified halal restaurants across Chicago and suburbs. Browse by cuisine or neighborhood.',
}

export default function Home() {
  const featured = restaurants.filter(r => r.rating >= 4.4).slice(0, 12)
  const schemas = homepageSchema({ totalRestaurants: restaurants.length })

  return (
    <main style={{ maxWidth: '960px', margin: '0 auto', padding: '2rem 1rem' }}>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      {/* Hero */}
      <div style={{ textAlign: 'center', padding: '3rem 1rem', background: '#fff', borderRadius: '16px', marginBottom: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <img src="/logo.png" alt="Chicago Halal Restaurants" style={{ width: '140px', height: '140px', objectFit: 'contain', marginBottom: '0.5rem' }} />
        <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#111', margin: '0.5rem 0' }}>
          Chicago Halal Restaurants
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#555', margin: '0.5rem 0' }}>
          Find verified halal food across Chicago and suburbs
        </p>
        <p style={{ fontSize: '0.95rem', color: '#16a34a', fontWeight: '600' }}>
          {restaurants.length}+ restaurants · {neighborhoods.length} neighborhoods · 9 cuisines
        </p>
      </div>

      {/* Browse by Cuisine */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1rem', color: '#111' }}>
          Browse by Cuisine
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '0.75rem' }}>
          {cuisines.map(c => (
            <Link key={c.slug} href={`/${c.slug}/chicago`} style={{
              display: 'block', padding: '0.85rem 1rem', background: '#fff',
              border: '1px solid #e5e7eb', borderRadius: '10px', textDecoration: 'none',
              color: '#222', fontWeight: '500', textAlign: 'center',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
            }}>
              {c.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Browse by Neighborhood */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1rem', color: '#111' }}>
          Browse by Neighborhood
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '0.75rem' }}>
          {neighborhoods.map(n => (
            <Link key={n.slug} href={`/neighborhood/${n.slug}`} style={{
              display: 'block', padding: '0.85rem 1rem', background: '#fff',
              border: '1px solid #e5e7eb', borderRadius: '10px', textDecoration: 'none',
              color: '#222', fontWeight: '500', textAlign: 'center',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
            }}>
              {n.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Restaurants */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1rem', color: '#111' }}>
          Top Rated Halal Spots
        </h2>
        <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '-0.75rem', marginBottom: '1rem' }}>
          Highest rated halal restaurants across Chicago — all rated 4.4★ and above.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {featured.map((r, i) => (
            <div key={i} style={{
              background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px',
              padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
            }}>
              <h3 style={{ margin: '0 0 0.35rem', fontSize: '1rem', fontWeight: '600', color: '#111' }}>{r.name}</h3>
              <p style={{ margin: '0 0 0.25rem', color: '#666', fontSize: '0.85rem' }}>{r.address}</p>
              <p style={{ margin: '0 0 0.75rem', color: '#f59e0b', fontSize: '0.85rem', fontWeight: '600' }}>★ {r.rating} / 5</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href={`/${r.cuisine}/${r.neighborhood}`} style={{
                  fontSize: '0.82rem', color: '#16a34a', textDecoration: 'none', fontWeight: '500'
                }}>
                  View {r.cuisine.replace(/-/g, ' ')} in {r.neighborhood.replace(/-/g, ' ')} →
                </Link>
                <Link href={`/grade?q=${encodeURIComponent(r.name)}`} style={{
                  fontSize: '0.78rem', color: '#9ca3af', textDecoration: 'none',
                }}>
                  Owner? →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* From the Blog */}
      <section style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#111', margin: 0 }}>
            From the Blog
          </h2>
          <Link href="/blog" style={{ fontSize: '0.88rem', color: '#16a34a', textDecoration: 'none', fontWeight: '500' }}>
            View all →
          </Link>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {blogPosts.map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <div style={{
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '1.25rem 1.5rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                borderLeft: '4px solid #16a34a',
              }}>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
                  {post.tags.map(tag => (
                    <span key={tag} style={{
                      fontSize: '0.72rem', fontWeight: '600', background: '#dcfce7',
                      color: '#15803d', padding: '2px 8px', borderRadius: '20px'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 style={{ margin: '0 0 0.4rem', fontSize: '1rem', fontWeight: '700', color: '#111', lineHeight: 1.4 }}>
                  {post.title}
                </h3>
                <p style={{ margin: '0 0 0.6rem', fontSize: '0.88rem', color: '#555', lineHeight: 1.6 }}>
                  {post.excerpt}
                </p>
                <span style={{ fontSize: '0.82rem', color: '#16a34a', fontWeight: '500' }}>
                  Read more →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Visibility Report CTA — for restaurant owners */}
      <section style={{
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: '14px',
        padding: '2rem',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem',
        flexWrap: 'wrap',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}>
        <div style={{ flex: 1, minWidth: '220px' }}>
          <p style={{
            display: 'inline-block',
            fontSize: '11px', fontWeight: '700', letterSpacing: '0.07em',
            textTransform: 'uppercase', color: '#15803d', background: '#dcfce7',
            padding: '2px 10px', borderRadius: '20px', marginBottom: '0.6rem',
          }}>
            Free · Takes 10 seconds
          </p>
          <h2 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#111', margin: '0 0 0.4rem' }}>
            Own a restaurant on this list?
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: 0, lineHeight: 1.5 }}>
            See how visible you are to customers searching for halal food — and find out exactly what's missing from your listing.
          </p>
        </div>
        <Link href="/grade" style={{
          display: 'inline-block',
          background: '#16a34a', color: '#fff',
          padding: '0.75rem 1.5rem', borderRadius: '8px',
          textDecoration: 'none', fontWeight: '600', fontSize: '0.95rem',
          whiteSpace: 'nowrap', flexShrink: 0,
        }}>
          Get my free report →
        </Link>
      </section>

      {/* AI Marketing Studio CTA — Premium feature */}
      <section style={{
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: '14px',
        padding: '2rem',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem',
        flexWrap: 'wrap',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}>
        <div style={{ flex: 1, minWidth: '220px' }}>
          <p style={{
            display: 'inline-block',
            fontSize: '11px', fontWeight: '700', letterSpacing: '0.07em',
            textTransform: 'uppercase', color: '#15803d', background: '#dcfce7',
            padding: '2px 10px', borderRadius: '20px', marginBottom: '0.6rem',
          }}>
            New · Premium feature
          </p>
          <h2 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#111', margin: '0 0 0.4rem' }}>
            AI Marketing Studio for your restaurant
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: 0, lineHeight: 1.5 }}>
            One-click Ramadan, Eid, and Jummah campaigns — posts and branded graphics written in your restaurant's voice. Included with Premium listings.
          </p>
        </div>
        <Link href="/marketing-studio" style={{
          display: 'inline-block',
          background: '#16a34a', color: '#fff',
          padding: '0.75rem 1.5rem', borderRadius: '8px',
          textDecoration: 'none', fontWeight: '600', fontSize: '0.95rem',
          whiteSpace: 'nowrap', flexShrink: 0,
        }}>
          See how it works →
        </Link>
      </section>

      {/* Advertise Banner */}
      <section style={{
        background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '14px',
        padding: '2rem', textAlign: 'center', marginBottom: '2rem'
      }}>
        <h2 style={{ fontSize: '1.4rem', color: '#15803d', marginTop: 0 }}>🍽️ Own a Halal Restaurant?</h2>
        <p style={{ color: '#555', margin: '0.5rem 0 1.25rem' }}>
          Get featured at the top of your neighborhood listing. Reach thousands of halal food seekers every month.
        </p>
        <Link href="/advertise" style={{
          display: 'inline-block', background: '#16a34a', color: '#fff',
          padding: '0.75rem 2rem', borderRadius: '8px', textDecoration: 'none',
          fontWeight: '700', fontSize: '1rem'
        }}>
          Get Listed — Plans from $19/mo
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: 'center', color: '#aaa', fontSize: '0.82rem', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
        © {new Date().getFullYear()} ChicagoHalalRestaurants.com · Halal status should be verified directly with each restaurant.
      </footer>

    </main>
  )
}
