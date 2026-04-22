import fs from 'fs'

const API_KEY = process.env.GOOGLE_MAPS_API_KEY

const searches = [
  { query: "halal restaurants glendale heights illinois", cuisine: "middle-eastern", neighborhood: "glendale-heights" },
  { query: "pakistani halal restaurants glendale heights illinois", cuisine: "pakistani", neighborhood: "glendale-heights" },
  { query: "indian halal restaurants glendale heights illinois", cuisine: "indian", neighborhood: "glendale-heights" },
  { query: "mediterranean halal restaurants glendale heights illinois", cuisine: "mediterranean", neighborhood: "glendale-heights" },
]

async function fetchAndMerge() {
  const existing = JSON.parse(fs.readFileSync('app/data/restaurants.json', 'utf8'))
  const seen = new Set(existing.map(r => r.name + r.address))
  const newRestaurants = []

  for (const search of searches) {
    console.log(`Fetching: ${search.query}...`)
    const query = encodeURIComponent(search.query)
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${API_KEY}`

    try {
      const res = await fetch(url)
      const data = await res.json()

      if (data.status !== 'OK') {
        console.log(`  Status: ${data.status} — skipping`)
        continue
      }

      let added = 0
      for (const place of data.results) {
        const key = place.name + (place.formatted_address || '')
        if (seen.has(key)) continue
        seen.add(key)

        newRestaurants.push({
          name: place.name,
          address: place.formatted_address || place.vicinity || '',
          neighborhood: search.neighborhood,
          zip: '',
          cuisine: search.cuisine,
          rating: place.rating || 0,
          certified_halal: true,
          family_friendly: true,
          delivery_available: true
        })
        added++
      }
      console.log(`  Added ${added} new restaurants`)
      await new Promise(r => setTimeout(r, 500))
    } catch (err) {
      console.error(`  Error:`, err.message)
    }
  }

  const merged = [...existing, ...newRestaurants]
  fs.writeFileSync('app/data/restaurants.json', JSON.stringify(merged, null, 2))
  console.log(`\nDone! Added ${newRestaurants.length} new restaurants. Total: ${merged.length}`)
}

fetchAndMerge()
