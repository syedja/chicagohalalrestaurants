export const metadata = {
  title: 'Chicago Halal Restaurants | Find the Best Halal Food in Chicago',
  description: 'Find verified halal restaurants across Chicago and suburbs. Browse by cuisine or neighborhood. Devon Ave, Bridgeview, Oak Lawn, Naperville and more.',
  openGraph: {
    title: 'Chicago Halal Restaurants | Find the Best Halal Food in Chicago',
    description: 'Find verified halal restaurants across Chicago and suburbs. Browse by cuisine or neighborhood.',
    url: 'https://www.chicagohalalrestaurants.com',
    siteName: 'Chicago Halal Restaurants',
    images: [
      {
        url: 'https://www.chicagohalalrestaurants.com/logo.png',
        width: 800,
        height: 800,
        alt: 'Chicago Halal Restaurants',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Chicago Halal Restaurants',
    description: 'Find verified halal restaurants across Chicago and suburbs.',
    images: ['https://www.chicagohalalrestaurants.com/logo.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, sans-serif', background: '#fafafa' }}>
        {children}
      </body>
    </html>
  )
}