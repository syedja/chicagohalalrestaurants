import fs from 'fs'

const API_KEY = process.env.GOOGLE_MAPS_API_KEY

const neighborhoods = [
  "devon ave chicago", "bridgeview illinois", "oak lawn illinois",
  "skokie illinois", "naperville illinois", "logan square chicago",
  "hyde park chicago", "lincoln park chicago", "wicker park chicago",
  "evanston illinois", "schaumburg illinois", "orland park illinois",
  "lombard illinois", "norridge illinois"
]

const slugify = (str) => str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

const guessCuisine = (name, types) => {
  const n = name.toLowerCase()
  if (n.includes('pakistan') || n.includes('nihari') || n.includes('karachi')) return 'pakistani'
  if (n.includes('india') || n.includes('tandoor') || n.includes('curry')) return 'indian'
  if (n.includes('turkish') || n.includes('kebab') || n.includes('istanbul')) return 'turkish'
  if (n.includes('lebanese') || n.includes('beirut')) return 'lebanese'
  if (n.includes('somali') || n.includes('ethiopia')) return 'ethiopian'
  if (n.includes('chicken') || n.includes('wings') || n.includes('bucket')) return 'fried-chicken'
  if (n.includes('pita') || n.includes('falafel') || n.includes('shawarma') || n.includes('gyro')) return 'mediterranean'
  return 'middle-eastern'
}

const guessNeighborhood = (vicinity) => {
  const v = vicinity.toLowerCase()
  if (v.includes('bridgeview')) return 'bridgeview'
  if (v.includes('oak lawn')) return 'oak-lawn'
  if (v.includes('skokie')) return 'skokie'
  if (v.includes('naperville')) return 'naperville'
  if (v.includes('schaumburg')) return 'schaumburg'
  if (v.includes('evanston')) return 'evanston'
  if (v.includes('orland park')) return 'orland-park'
  if (v.includes('lombard')) return 'lombard'
  if (v.includes('norridge')) return 'norridge'
  if (v.includes('devon')) return 'devon-ave'
  if (v.includes('logan')) return 'logan-square'
  if (v.includes('glendale heights')) return 'glendale-heights'
  if (v.includes('chicago')) return 'chicago'
  if (v.includes('hyde park')) return 'hyde-park'
  if (v.includes('lincoln park')) return 'lincoln-park'
  if (v.includes('wicker park')) return 'wicker-park'
  return 'chicago'
}

async function fetchRestaurants() {
  const allRestaurants = []
  const seen = new Set()

  for (const neighborhood of neighborhoods) {
    console.log(`Fetching halal restaurants in ${neighborhood}...`)

    const query = encodeURIComponent(`halal restaurants in ${neighborhood}`)
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${API_KEY}`

    try {
      const res = await fetch(url)
      const data = await res.json()

      if (data.status !== 'OK') {
        console.log(`  Status: ${data.status} — skipping`)
        continue
      }

      for (const place of data.results) {
        if (seen.has(place.place_id)) continue
        seen.add(place.place_id)

        allRestaurants.push({
          name: place.name,
          address: place.formatted_address || place.vicinity || '',
          neighborhood: guessNeighborhood(place.vicinity || place.formatted_address || ''),
          zip: '',
          cuisine: guessCuisine(place.name, place.types),
          rating: place.rating || 0,
          certified_halal: true,
          family_friendly: true,
          delivery_available: true
        })
      }

      console.log(`  Found ${data.results.length} restaurants`)
      await new Promise(r => setTimeout(r, 500))

    } catch (err) {
      console.error(`  Error fetching ${neighborhood}:`, err.message)
    }
  }

  fs.writeFileSync('app/data/restaurants.json', JSON.stringify(allRestaurants, null, 2))
  console.log(`\nDone! Total restaurants saved: ${allRestaurants.length}`)
}

fetchRestaurants()
