import { MetadataRoute } from 'next'
import restaurants from '@/data/restaurants.json'

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
  ]

  // Derive unique neighborhoods from actual data
  const uniqueNeighborhoods = [
    ...new Set(
      restaurants
        .map((r) => r.neighborhood?.trim())
        .filter(Boolean)
    ),
  ] as string[]

  // /neighborhood/[neighborhood] — only neighborhoods that have restaurants
  const neighborhoodRoutes: MetadataRoute.Sitemap = uniqueNeighborhoods.map((neighborhood) => ({
    url: `${BASE_URL}/neighborhood/${neighborhood}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Derive unique cuisine+neighborhood combos from actual data
  const uniqueCombos = [
    ...new Map(
      restaurants
        .filter((r) => r.cuisine?.trim() && r.neighborhood?.trim())
        .map((r) => {
          const key = `${r.cuisine.trim()}__${r.neighborhood.trim()}`
          return [key, { cuisine: r.cuisine.trim(), neighborhood: r.neighborhood.trim() }]
        })
    ).values(),
  ]

  // /[cuisine]/[neighborhood] — only combos that have at least one restaurant
  const cuisineNeighborhoodRoutes: MetadataRoute.Sitemap = uniqueCombos.map(
    ({ cuisine, neighborhood }) => ({
      url: `${BASE_URL}/${cuisine}/${neighborhood}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })
  )

  return [
    ...staticRoutes,
    ...neighborhoodRoutes,
    ...cuisineNeighborhoodRoutes,
  ]
}
