import fs from 'fs'

const API_KEY = process.env.GOOGLE_MAPS_API_KEY

const searches = [
  // Pakistani
  { query: "pakistani halal restaurants devon ave chicago", cuisine: "pakistani", neighborhood: "devon-ave" },
  { query: "pakistani halal restaurants chicago", cuisine: "pakistani", neighborhood: "chicago" },
  // Indian
  { query: "indian halal restaurants devon ave chicago", cuisine: "indian", neighborhood: "devon-ave" },
  { query: "indian halal restaurants schaumburg illinois", cuisine: "indian", neighborhood: "schaumburg" },
  // Mediterranean
  { query: "mediterranean halal restaurants bridgeview illinois", cuisine: "mediterranean", neighborhood: "bridgeview" },
  { query: "mediterranean halal restaurants skokie illinois", cuisine: "mediterranean", neighborhood: "skokie" },
  { query: "mediterranean halal restaurants oak lawn illinois", cuisine: "mediterranean", neighborhood: "oak-lawn" },
  // Middle Eastern
  { query: "middle eastern halal restaurants bridgeview illinois", cuisine: "middle-eastern", neighborhood: "bridgeview" },
  { query: "middle eastern halal restaurants devon ave chicago", cuisine: "middle-eastern", neighborhood: "devon-ave" },
  { query: "middle eastern halal restaurants chicago", cuisine: "middle-eastern", neighborhood: "chicago" },
  // Turkish
  { query: "turkish halal restaurants chicago", cuisine: "turkish", neighborhood: "chicago" },
  { query: "turkish halal restaurants naperville illinois", cuisine: "turkish", neighborhood: "naperville" },
  // Lebanese
  { query: "lebanese halal restaurants chicago", cuisine: "lebanese", neighborhood: "chicago" },
  { query: "lebanese halal restaurants bridgeview illinois", cuisine: "lebanese", neighborhood: "bridgeview" },
  // Fried Chicken
  { query: "halal fried chicken restaurants chicago", cuisine: "fried-chicken", neighborhood: "chicago" },
  { query: "halal fried chicken restaurants oak lawn illinois", cuisine: "fried-chicken", neighborhood: "oak-lawn" },
  { query: "halal fried chicken restaurants bridgeview illinois", cuisine: "fried-chicken", neighborhood: "bridgeview" },
  // Ethiopian/Somali
  { query: "somali halal restaurants chicago", cuisine: "somali", neighborhood: "chicago" },
  { query: "ethiopian halal restaurants chicago", cuisine: "ethiopian", neighborhood: "chicago" },
  // Evanston
  { query: "halal restaurants evanston illinois", cuisine: "middle-eastern", neighborhood: "evanston" },
  // Naperville
  { query: "halal restaurants naperville illinois", cuisine: "mediterranean", neighborhood: "naperville" },
  // Schaumburg
  { query: "halal restaurants schaumburg illinois", cuisine: "middle-eastern", neighborhood: "schaumburg" },
  // Logan Square
  { query: "halal restaurants logan square chicago", cuisine: "middle-eastern", neighborhood: "logan-square" },
  // Hyde Park
  { query: "halal restaurants hyde park chicago", cuisine: "middle-eastern", neighborhood: "hyde-park" },
  // Orland Park
  { query: "halal restaurants orland park illinois", cuisine: "mediterranean", neighborhood: "orland-park" },
  // Lombard
  { query: "halal restaurants lombard illinois", cuisine: "middle-eastern", neighborhood: "lombard" },
    // Glendale Heights
  { query: "halal restaurants lombard illinois", cuisine: "middle-eastern", neighborhood: "glendale-heights" },
    // Chicago
  { query: "halal restaurants lombard illinois", cuisine: "middle-eastern", neighborhood: "chicago" },
]

async function fetchRestaurants() {
  const allRestaurants = []
  const seen = new Set()

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
        if (seen.has(place.place_id)) continue
        seen.add(place.place_id)

        allRestaurants.push({
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

  fs.writeFileSync('app/data/restaurants.json', JSON.stringify(allRestaurants, null, 2))
  console.log(`\nDone! Total restaurants saved: ${allRestaurants.length}`)
}

fetchRestaurants()
