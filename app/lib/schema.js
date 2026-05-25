// ============================================================
// FILE: app/lib/schema.js
// Central schema utility — import from any page component.
//
// USAGE EXAMPLES:
//   import { restaurantPageSchema, blogPostSchema, homepageSchema } from '@/app/lib/schema'
// ============================================================

const SITE_URL  = 'https://chicagohalalrestaurants.com'
const SITE_NAME = 'Chicago Halal Restaurants'
const LOGO_URL  = `${SITE_URL}/logo.png`

// ── Shared publisher block (reused across all schemas) ────────────────────────
const publisher = {
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: { '@type': 'ImageObject', url: LOGO_URL },
}

// ── Utility: slug → Title Case label ─────────────────────────────────────────
export function toLabel(slug = '') {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. RESTAURANT LISTING PAGE  (app/[cuisine]/[neighborhood]/page.js)
//    Returns an array of 3 schema objects: ItemList + BreadcrumbList + CollectionPage
// ─────────────────────────────────────────────────────────────────────────────
export function restaurantPageSchema({ cuisine, neighborhood, restaurants }) {
  const cuisineLabel  = toLabel(cuisine)
  const neighborLabel = toLabel(neighborhood)
  const pageUrl       = `${SITE_URL}/${cuisine}/${neighborhood}`

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${pageUrl}#itemlist`,
    name: `Best Halal ${cuisineLabel} Restaurants in ${neighborLabel}`,
    description: `Halal ${cuisineLabel.toLowerCase()} restaurants in ${neighborLabel}, Chicago area.`,
    url: pageUrl,
    numberOfItems: restaurants.length,
    itemListElement: restaurants.map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Restaurant',
        '@id': `${pageUrl}#r${i + 1}`,
        name: r.name,
        servesCuisine: cuisineLabel,
        ...(r.address && {
          address: {
            '@type': 'PostalAddress',
            streetAddress: r.address,
            addressLocality: neighborLabel,
            addressRegion: 'IL',
            addressCountry: 'US',
          },
        }),
        ...(r.phone       && { telephone: r.phone }),
        ...(r.hours       && { openingHours: r.hours }),
        ...(r.photo_url   && { image: r.photo_url }),
        ...(r.description && { description: r.description }),
        ...(r.rating > 0  && {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: r.rating,
            bestRating: 5,
            worstRating: 1,
          },
        }),
        amenityFeature: [
          { '@type': 'LocationFeatureSpecification', name: 'Halal Food', value: true },
        ],
      },
    })),
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',                              item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: `${cuisineLabel} Restaurants`,       item: `${SITE_URL}/${cuisine}` },
      { '@type': 'ListItem', position: 3, name: `${cuisineLabel} in ${neighborLabel}`, item: pageUrl },
    ],
  }

  const collectionPage = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Best Halal ${cuisineLabel} Restaurants in ${neighborLabel}`,
    description: `Find verified halal ${cuisineLabel.toLowerCase()} restaurants in ${neighborLabel}. Ratings, addresses, and hours.`,
    url: pageUrl,
    inLanguage: 'en-US',
    publisher,
    mainEntity: { '@id': `${pageUrl}#itemlist` },
  }

  return [itemList, breadcrumb, collectionPage]
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. BLOG POST PAGE
//    Returns an array: BlogPosting + FAQPage (if faqs provided) + BreadcrumbList
//
//    faqs = [{ question: string, answer: string }]
//    mentions = restaurant names mentioned in the post (optional)
// ─────────────────────────────────────────────────────────────────────────────
export function blogPostSchema({
  headline,
  description,
  slug,
  datePublished,
  dateModified,
  faqs = [],
  mentionedRestaurants = [],
}) {
  const postUrl = `${SITE_URL}/blog/${slug}`

  const blogPosting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline,
    description,
    url: postUrl,
    datePublished,
    dateModified: dateModified || datePublished,
    inLanguage: 'en-US',
    author: publisher,
    publisher,
    ...(mentionedRestaurants.length > 0 && {
      mentions: mentionedRestaurants.map(({ name, locality }) => ({
        '@type': 'Restaurant',
        name,
        address: {
          '@type': 'PostalAddress',
          addressLocality: locality,
          addressRegion: 'IL',
          addressCountry: 'US',
        },
      })),
    }),
  }

  const schemas = [blogPosting]

  if (faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    })
  }

  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: headline, item: postUrl },
    ],
  })

  return schemas
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. HOMEPAGE  (app/page.js)
// ─────────────────────────────────────────────────────────────────────────────
export function homepageSchema({ totalRestaurants }) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
      description:
        'Find verified halal restaurants across Chicago and suburbs. Browse by cuisine or neighborhood.',
      publisher,
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/search?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: LOGO_URL },
      sameAs: [
        // Add your Facebook, Instagram URLs here when ready
        // 'https://www.facebook.com/chicagohalalrestaurants',
      ],
      description: `Chicago's largest directory of halal restaurants. ${totalRestaurants}+ listings across Chicago and suburbs.`,
    },
  ]
}

// ─────────────────────────────────────────────────────────────────────────────
// HOW TO USE IN EACH PAGE
// ─────────────────────────────────────────────────────────────────────────────
//
// ── Restaurant listing page (app/[cuisine]/[neighborhood]/page.js) ───────────
//
//   import { restaurantPageSchema } from '@/app/lib/schema'
//   import restaurants from '@/app/data/restaurants.json'
//
//   export default async function Page({ params }) {
//     const { cuisine, neighborhood } = await params
//     const pageRestaurants = restaurants.filter(
//       r => r.cuisine === cuisine && r.neighborhood === neighborhood
//     )
//     const schemas = restaurantPageSchema({ cuisine, neighborhood, restaurants: pageRestaurants })
//
//     return (
//       <>
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
//         />
//         {/* rest of page */}
//       </>
//     )
//   }
//
// ── Blog post page ────────────────────────────────────────────────────────────
//
//   import { blogPostSchema } from '@/app/lib/schema'
//
//   export default function BlogPost() {
//     const schemas = blogPostSchema({
//       headline: 'Best Zabihah Halal Indian & Pakistani Restaurants in Lombard...',
//       description: 'Find HFSAA and HMS-certified...',
//       slug: 'zabihah-halal-indian-pakistani-lombard-glendale-heights-devon-ave',
//       datePublished: '2025-05-25',
//       faqs: [
//         { question: 'What is Zabihah halal?', answer: '...' },
//       ],
//       mentionedRestaurants: [
//         { name: 'Shaahi Biryani', locality: 'Glendale Heights' },
//       ],
//     })
//
//     return (
//       <>
//         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
//         {/* post content */}
//       </>
//     )
//   }
//
// ── Homepage ──────────────────────────────────────────────────────────────────
//
//   import { homepageSchema } from '@/app/lib/schema'
//   import restaurants from '@/app/data/restaurants.json'
//
//   export default function Home() {
//     const schemas = homepageSchema({ totalRestaurants: restaurants.length })
//     return (
//       <>
//         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
//         {/* homepage content */}
//       </>
//     )
//   }
