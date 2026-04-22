export const metadata = {
  title: 'Chicago Halal Restaurants | Find the Best Halal Food in Chicago',
  description: 'Find verified halal restaurants in Chicago and suburbs. Browse by cuisine or neighborhood.',
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
