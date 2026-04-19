import restaurants from '../../data/restaurants.json'

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
  const cuisineText = cuisine.replace(/-/g, ' ')
  const neighborhoodText = neighborhood.replace(/-/g, ' ')
  return {
    title: `Best Halal ${cuisineText} Restaurants in ${neighborhoodText}, Chicago`,
    description: `Find the top halal ${cuisineText} restaurants in ${neighborhoodText}, Chicago.`,
  }
}

export default async function Page({ params }) {
  const { cuisine, neighborhood } = await params
  const cuisineText = cuisine.replace(/-/g, ' ')
  const neighborhoodText = neighborhood.replace(/-/g, ' ')

  const results = restaurants.filter(
    r => r.cuisine === cuisine && r.neighborhood === neighborhood
  )

  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1>Best Halal {cuisineText} Restaurants in {neighborhoodText}, Chicago</h1>
      <p>Verified halal options with ratings, hours, and addresses.</p>

      {results.length === 0 ? (
        <p>No listings yet for this area — check back soon!</p>
      ) : (
        results.map((r, i) => (
          <div key={i} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', marginTop: '1rem' }}>
            <h2>{r.name}</h2>
            <p>{r.address}</p>
            <p>Rating: {r.rating} / 5</p>
            <p>Halal Certified: {r.certified_halal ? 'Yes' : 'No'} | Family Friendly: {r.family_friendly ? 'Yes' : 'No'} | Delivery: {r.delivery_available ? 'Yes' : 'No'}</p>
          </div>
        ))
      )}
    </main>
  )
}
