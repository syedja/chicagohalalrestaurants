import { MetadataRoute } from 'next'
import restaurants from '@/app/data/restaurants.json'

const BASE_URL = 'https://www.chicagohalalrestaurants.com'

const blogPosts = [
  'zabihah-halal-indian-pakistani-lombard-glendale-heights-devon-ave',
]

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

  return [
    ...staticRoutes,
    ...blogRoutes,
    ...neighborhoodRoutes,
    ...cuisineNeighborhoodRoutes,
    ...chicagoRoutes,
  ]
}
