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
        {children}
      </body>
    </html>
  )
}