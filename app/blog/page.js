import Link from 'next/link'

export const metadata = {
  title: 'Halal Food Blog | Chicago Halal Restaurants',
  description: 'Guides, tips, and neighborhood spotlights for halal diners in Chicago and suburbs. Find Zabihah-certified restaurants, certification guides, and more.',
}

const blogPosts = [
  {
    slug: 'zabihah-halal-indian-pakistani-lombard-glendale-heights-devon-ave',
    title: 'Best Zabihah Halal Indian & Pakistani Restaurants in Lombard, Glendale Heights & Devon Ave',
    excerpt: 'Find HFSAA and HMS-certified Zabihah halal Indian and Pakistani restaurants across three of Chicago\'s most food-rich neighborhoods — and learn how to verify certification before you visit.',
    tags: ['Zabihah Halal', 'Indian & Pakistani', 'Chicago Suburbs'],
    date: 'May 25, 2025',
  },
]

export default function BlogIndex() {
  return (
    <main style={{ maxWidth: '860px', margin: '0 auto', padding: '2rem 1rem', fontFamily: 'system-ui, sans-serif' }}>

      <Link href="/" style={{ color: '#16a34a', textDecoration: 'none', fontSize: '0.9rem' }}>← Back to Home</Link>

      <div style={{ margin: '1.5rem 0 2.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#111', margin: '0 0 0.5rem' }}>
          Halal Food Blog
        </h1>
        <p style={{ fontSize: '1rem', color: '#555', margin: 0, lineHeight: 1.6 }}>
          Neighborhood guides, certification explainers, and halal dining tips for Chicago and suburbs.
        </p>
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
              padding: '1.5rem',
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
              <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem', fontWeight: '700', color: '#111', lineHeight: 1.4 }}>
                {post.title}
              </h2>
              <p style={{ margin: '0 0 0.75rem', fontSize: '0.9rem', color: '#555', lineHeight: 1.65 }}>
                {post.excerpt}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.82rem', color: '#16a34a', fontWeight: '500' }}>Read more →</span>
                <span style={{ fontSize: '0.78rem', color: '#aaa' }}>{post.date}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <footer style={{ textAlign: 'center', color: '#aaa', fontSize: '0.82rem', paddingTop: '2rem', marginTop: '3rem', borderTop: '1px solid #eee' }}>
        © {new Date().getFullYear()} ChicagoHalalRestaurants.com · Halal status should be verified directly with each restaurant.
      </footer>

    </main>
  )
}
