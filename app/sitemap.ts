import { MetadataRoute } from 'next'
import restaurants from '@/app/data/restaurants.json'

const BASE_URL = 'https://www.chicagohalalrestaurants.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  // Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/advertise`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  // Blog posts
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Derive unique neighborhoods from actual data
  const uniqueNeighborhoods = [
    ...new Set(
      restaurants
        .map((r) => r.neighborhood?.trim())
        .filter(Boolean)
    ),
  ] as string[]

  // /neighborhood/[neighborhood]
  const neighborhoodRoutes: MetadataRoute.Sitemap = uniqueNeighborhoods.map((neighborhood) => ({
    url: `${BASE_URL}/neighborhood/${neighborhood}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Derive unique cuisine+neighborhood combos from actual data
// Only include combos with 3+ restaurants
const comboCounts = new Map<string, number>()
restaurants.forEach((r) => {
  if (r.cuisine?.trim() && r.neighborhood?.trim()) {
    const key = `${r.cuisine.trim()}__${r.neighborhood.trim()}`
    comboCounts.set(key, (comboCounts.get(key) || 0) + 1)
  }
})

const uniqueCombos = [...new Map(
  restaurants
    .filter((r) => {
      const key = `${r.cuisine?.trim()}__${r.neighborhood?.trim()}`
      return r.cuisine?.trim() && r.neighborhood?.trim() && (comboCounts.get(key) || 0) >= 3
    })
    .map((r) => {
      const key = `${r.cuisine.trim()}__${r.neighborhood.trim()}`
      return [key, { cuisine: r.cuisine.trim(), neighborhood: r.neighborhood.trim() }]
    })
).values()]

  // /[cuisine]/[neighborhood]
  const cuisineNeighborhoodRoutes: MetadataRoute.Sitemap = uniqueCombos.map(
    ({ cuisine, neighborhood }) => ({
      url: `${BASE_URL}/${cuisine}/${neighborhood}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })
  )

  // /[cuisine]/chicago — one per unique cuisine
  const uniqueCuisines = [
    ...new Set(
      restaurants
        .map((r) => r.cuisine?.trim())
        .filter(Boolean)
    ),
  ] as string[]

  const chicagoRoutes: MetadataRoute.Sitemap = uniqueCuisines.map((cuisine) => ({
    url: `${BASE_URL}/${cuisine}/chicago`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  const allRoutes = [
    ...staticRoutes,
    ...blogRoutes,
    ...neighborhoodRoutes,
    ...cuisineNeighborhoodRoutes,
    ...chicagoRoutes,
  ]

  // Deduplicate by URL
  const seen = new Set<string>()
  const dedupedRoutes = allRoutes.filter((entry) => {
    if (seen.has(entry.url)) return false
    seen.add(entry.url)
    return true
  })

  return dedupedRoutes
  
}

const blogPosts = [
  'zabihah-halal-indian-pakistani-lombard-glendale-heights-devon-ave',
  'halal-mediterranean-bridgeview-oak-lawn',
  'halal-restaurants-naperville-schaumburg',
  'halal-fried-chicken-burgers-chicago',
  'get-halal-restaurant-listed-chicago',
]
