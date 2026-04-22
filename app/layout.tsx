export const metadata = {
  title: 'Chicago Halal Restaurants',
  description: 'Find the best halal restaurants in Chicago and suburbs',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
