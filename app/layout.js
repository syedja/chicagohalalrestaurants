export const metadata = {
  title: 'Chicago Halal Restaurants | Find the Best Halal Food in Chicago',
  description: 'Find verified halal restaurants across Chicago and suburbs. Browse by cuisine or neighborhood.',
  openGraph: {
    title: 'Chicago Halal Restaurants | Find the Best Halal Food in Chicago',
    description: 'Find verified halal restaurants across Chicago and suburbs.',
    url: 'https://www.chicagohalalrestaurants.com',
    siteName: 'Chicago Halal Restaurants',
    images: [{ url: 'https://www.chicagohalalrestaurants.com/logo.png', width: 800, height: 800, alt: 'Chicago Halal Restaurants' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Chicago Halal Restaurants',
    description: 'Find verified halal restaurants across Chicago and suburbs.',
    images: ['https://www.chicagohalalrestaurants.com/logo.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo.png', type: 'image/png' },
    ],
    apple: '/logo.png',
    shortcut: '/favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, sans-serif', background: '#fafafa' }}>
        {/* Nav */}
        <nav style={{
          background: '#fff',
          borderBottom: '1px solid #e5e7eb',
          padding: '0 1rem',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}>
          <div style={{
            maxWidth: '960px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '56px',
          }}>
            <a href="/" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              color: '#111',
              fontWeight: '700',
              fontSize: '15px',
            }}>
              <img src="/logo.png" alt="" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
            </a>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <a href="/blog" style={{
                fontSize: '14px',
                color: '#6b7280',
                textDecoration: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
              }}>
                Blog
              </a>
              <a href="/advertise" style={{
                fontSize: '14px',
                color: '#6b7280',
                textDecoration: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
              }}>
                Advertise
              </a>
              <a href="/grade" style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#15803d',
                textDecoration: 'none',
                padding: '7px 14px',
                borderRadius: '6px',
                border: '1.5px solid #16a34a',
                whiteSpace: 'nowrap',
              }}>
                Free Visibility Report
              </a>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}

export const metadata = {
  metadataBase: new URL('https://www.chicagohalalrestaurants.com'),  // ← add this line
  title: 'Chicago Halal Restaurants | Find the Best Halal Food in Chicago',
  // ... rest stays the same
}