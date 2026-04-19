import fs from 'fs'

const API_KEY = process.env.ANTHROPIC_API_KEY

const restaurants = JSON.parse(fs.readFileSync('app/data/restaurants.json', 'utf8'))

const combos = []
const seen = new Set()
for (const r of restaurants) {
  const key = `${r.cuisine}|${r.neighborhood}`
  if (!seen.has(key)) {
    seen.add(key)
    combos.push({ cuisine: r.cuisine, neighborhood: r.neighborhood })
  }
}

console.log(`Generating content for ${combos.length} pages...`)

async function generateContent(cuisine, neighborhood) {
  const cuisineText = cuisine.replace(/-/g, ' ')
  const neighborhoodText = neighborhood.replace(/-/g, ' ')

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 200,
      messages: [{
        role: 'user',
        content: `Write a 2-3 sentence intro paragraph for a webpage about the best halal ${cuisineText} restaurants in ${neighborhoodText}, Chicago. Be specific about what makes this area or cuisine special. Keep it informative and natural, no fluff.`
      }]
    })
  })

  const data = await response.json()
  console.log('  API response:', JSON.stringify(data).slice(0, 150))

  if (data.error) throw new Error(data.error.message)
  if (!data.content || !data.content[0]) throw new Error('No content in response')

  return data.content[0].text
}

async function main() {
  const content = {}

  for (const combo of combos) {
    const key = `${combo.cuisine}|${combo.neighborhood}`
    console.log(`Generating: ${combo.cuisine} / ${combo.neighborhood}`)

    try {
      content[key] = await generateContent(combo.cuisine, combo.neighborhood)
      console.log('  OK')
      await new Promise(r => setTimeout(r, 300))
    } catch (err) {
      console.error(`  Error: ${err.message}`)
      content[key] = ''
    }
  }

  fs.writeFileSync('app/data/content.json', JSON.stringify(content, null, 2))
  console.log(`\nDone! Content generated for ${Object.keys(content).length} pages`)
}

main()
