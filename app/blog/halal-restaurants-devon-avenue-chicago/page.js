import { blogPostSchema } from '@/app/lib/schema'
import Link from 'next/link'

export const metadata = {
  title: 'Halal Restaurants on Devon Avenue, Chicago: The Complete Guide',
  description: 'A guide to halal restaurants on Devon Avenue, Chicago — Pakistani, Indian, Middle Eastern, and Nepali spots along the city\'s historic South Asian food corridor. Biryani, nihari, karahi, kebabs, and sweets.',
}

const faqs = [
  {
    question: 'What is Devon Avenue known for?',
    answer: 'Devon Avenue on Chicago\'s Far North Side is one of the most concentrated South Asian and Middle Eastern commercial corridors in the United States. The stretch is lined with Pakistani, Indian, Middle Eastern, and Nepali restaurants, grocers, sweet shops, and bakeries. For halal diners it is one of the single best destinations in the Chicago area, with a large number of halal restaurants within walking distance of one another.',
  },
  {
    question: 'Is the food on Devon Avenue halal?',
    answer: 'Many of the South Asian and Middle Eastern restaurants on Devon Avenue serve halal food, and a large share of the corridor caters specifically to Muslim diners. That said, halal status varies restaurant to restaurant, and you should always confirm certification directly with the restaurant before ordering. Our directory lists the halal restaurants we know of along Devon, and marks the ones whose Zabihah certification we have verified with the owner.',
  },
  {
    question: 'What should I order on Devon Avenue?',
    answer: 'It depends on the cuisine. At Pakistani restaurants, nihari, karahi, biryani, and fresh naan are staples. At Indian spots, look for Hyderabadi biryani, curries, and South Indian dishes. Middle Eastern restaurants offer shawarma, kebabs, and mezze. Many diners make an evening of it — a savory meal at one restaurant followed by sweets or chai from one of the corridor\'s sweet shops.',
  },
  {
    question: 'Where is Devon Avenue and how do I get there?',
    answer: 'Devon Avenue runs east-west across the Far North Side of Chicago, with the South Asian and halal dining stretch centered roughly around the West Rogers Park / West Ridge area. It is reachable by car with street parking along the corridor, and by CTA bus. Because so many restaurants sit close together, it is an easy area to explore on foot once you arrive.',
  },
  {
    question: 'Are there halal sweets and bakeries on Devon Avenue?',
    answer: 'Yes. Devon is well known for South Asian sweet shops and bakeries serving mithai, barfi, gulab jamun, jalebi, and fresh baked goods. These are a core part of the Devon experience and a common stop after a meal or for gifts and celebrations.',
  },
]

// Real Devon Avenue listings from our directory, grouped by cuisine.
const pakistani = [
  { name: 'Sabri Nihari Restaurant', note: 'A long-standing name on Devon for Pakistani nihari and traditional dishes.' },
  { name: 'Bundoo Khan', note: 'Pakistani grill and BBQ fare in the heart of the Devon corridor.' },
  { name: 'Ghareeb Nawaz Restaurant', note: 'A Devon institution known for accessible, no-frills Pakistani and Indo-Pak plates.' },
  { name: 'Khan B.B.Q. Restaurant', note: 'Pakistani barbecue, kebabs, and grilled specialties.' },
  { name: "Ali's Nihari & BBQ", note: 'Nihari and barbecue in the Pakistani tradition.' },
  { name: 'Sabri Nihari', note: null },
  { name: 'Tabaq Restaurant', note: 'Pakistani dining along Devon Avenue.' },
  { name: 'Kabab King Grill Fine Dining', note: 'Kebabs and grilled Pakistani dishes in a sit-down setting.' },
  { name: 'Usmania Fine Dining', note: 'A fine-dining take on Pakistani cuisine on Devon.' },
  { name: 'Spinzer Restaurant', note: 'Authentic Pakistani food on the Devon corridor.' },
  { name: 'Karachi Chaat House', note: 'Chaat and Pakistani street-food style dishes.' },
  { name: 'Serena Restaurant', note: 'Pakistani plates along Devon Avenue.' },
  { name: 'Naan On Devon & Grill', note: 'Grill and naan-focused Pakistani spot named for the street itself.' },
  { name: 'Awami Bazaar', note: 'Pakistani food on the Devon corridor.' },
  { name: 'Delhi Darbar Chicago Restaurant', note: 'Indo-Pak dining on Devon.' },
  { name: 'OMG Nafisa\'s Kitchen', note: 'Home-style Pakistani cooking on Devon Avenue.' },
  { name: 'Halal Smash Burger and Phillies (Devon California)', note: 'Halal smash burgers and cheesesteaks at the Devon and California end of the corridor.' },
]

const indian = [
  { name: 'Curry Kitchen', note: 'One of the highest-rated Indian spots on the corridor.' },
  { name: 'Thali Corner', note: 'Thali platters and Indian dishes on Devon.' },
  { name: 'Hyderabad Kitchen - Dining', note: 'Hyderabadi cuisine including biryani.' },
  { name: 'Hyderabad House', note: 'Hyderabadi biryani and South Indian dishes.' },
  { name: 'NYC HALAL EATS', note: 'Halal Indian and Indo-Pak plates.' },
  { name: 'Mehrab Restaurant', note: 'Indian dining on the Devon corridor.' },
  { name: 'Usmania Chinese Restaurant', note: 'Indo-Chinese halal fare on Devon.' },
]

const middleEastern = [
  { name: 'Nineveh Kebob Express', note: 'One of the highest-rated Middle Eastern spots on Devon — kebabs and grilled dishes.' },
  { name: 'The Gundis Kurdish Kitchen', note: 'Kurdish cuisine, a distinctive option on the corridor.' },
  { name: 'Bab Alsalam Restaurant', note: 'Middle Eastern dishes on Devon Avenue.' },
  { name: 'Mr. Kabab', note: 'Kebabs and Middle Eastern grill fare.' },
  { name: 'Noon O Kabab Chicago', note: 'Persian-style kebabs and rice dishes.' },
  { name: 'Afghan Bamyan Kabob', note: 'Afghan kebabs and specialties.' },
  { name: 'Hala In Restaurant', note: 'Middle Eastern dining on the corridor.' },
  { name: 'Libanais Restaurant', note: 'Lebanese and Middle Eastern dishes.' },
  { name: 'Shawarma inn 2', note: 'Shawarma and Middle Eastern quick plates.' },
  { name: 'Taza Bakery and Hadramout Restaurant', note: 'Bakery and Middle Eastern (Hadhrami) cuisine.' },
]

const nepali = [
  { name: 'Nepal House', note: 'Nepali cuisine on Devon — momos and Himalayan dishes.' },
]

const sweets = [
  { name: 'AJWAAH SWEETS', note: 'South Asian sweets and mithai. One of the restaurants whose Zabihah certification we have verified with the owner.' },
  { name: 'Pak Sweets', note: 'Pakistani sweets and mithai.' },
  { name: 'King Sweets Restaurant', note: 'Sweets and dining on the Devon corridor.' },
]

const mentionedRestaurants = [
  ...pakistani, ...indian, ...middleEastern, ...nepali, ...sweets,
].map(r => ({ name: r.name, locality: 'Chicago' }))

export default function BlogPost() {
  const schemas = blogPostSchema({
    headline: 'Halal Restaurants on Devon Avenue, Chicago: The Complete Guide',
    description: 'A guide to halal restaurants on Devon Avenue, Chicago — Pakistani, Indian, Middle Eastern, and Nepali spots along the city\'s historic South Asian food corridor.',
    slug: 'halal-restaurants-devon-avenue-chicago',
    datePublished: '2026-09-06',
    faqs,
    mentionedRestaurants,
  })

  return (
    <main style={{ maxWidth: '860px', margin: '0 auto', padding: '2rem 1rem', fontFamily: 'system-ui, sans-serif' }}>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      <Link href="/" style={{ color: '#16a34a', textDecoration: 'none', fontSize: '0.9rem' }}>← Back to Home</Link>

      <div style={{ margin: '1.5rem 0 2rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: '600', background: '#dcfce7', color: '#15803d', padding: '3px 10px', borderRadius: '20px' }}>Halal</span>
          <span style={{ fontSize: '0.78rem', fontWeight: '600', background: '#fef3c7', color: '#92400e', padding: '3px 10px', borderRadius: '20px' }}>Devon Avenue</span>
          <span style={{ fontSize: '0.78rem', fontWeight: '600', background: '#eef2ff', color: '#4338ca', padding: '3px 10px', borderRadius: '20px' }}>Neighborhood Guide</span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#111', lineHeight: 1.25, margin: '0 0 1rem' }}>
          Halal Restaurants on Devon Avenue, Chicago: The Complete Guide
        </h1>
        <p style={{ fontSize: '1.05rem', color: '#555', lineHeight: 1.7, margin: 0 }}>
          Devon Avenue is one of the great halal food destinations in the United States. Along a single corridor on Chicago's Far North Side, you'll find Pakistani nihari houses, Hyderabadi biryani, Middle Eastern kebab grills, Nepali momos, and South Asian sweet shops — most of them halal, many within a short walk of one another. This guide covers the halal restaurants on Devon Avenue in our directory, grouped by cuisine so you can plan your visit.
        </p>
      </div>

      <nav style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '1rem 1.25rem', marginBottom: '2.5rem' }}>
        <p style={{ margin: '0 0 0.5rem', fontSize: '0.82rem', fontWeight: '700', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>In this guide</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {[
            ['#pakistani', 'Pakistani restaurants on Devon'],
            ['#indian', 'Indian restaurants on Devon'],
            ['#middle-eastern', 'Middle Eastern restaurants on Devon'],
            ['#nepali', 'Nepali food on Devon'],
            ['#sweets', 'Sweets & bakeries'],
            ['#faq', 'Frequently asked questions'],
          ].map(([href, label]) => (
            <a key={href} href={href} style={{ color: '#16a34a', textDecoration: 'none', fontSize: '0.9rem' }}>→ {label}</a>
          ))}
        </div>
      </nav>

      <p style={{ color: '#444', lineHeight: 1.75, marginBottom: '2.5rem' }}>
        A note on halal status: Devon Avenue caters heavily to Muslim diners, and many restaurants here are halal. Still, certification varies by restaurant, so confirm directly before ordering. In our directory, restaurants whose Zabihah certification we have verified with the owner carry a <strong>Zabihah Halal Certified</strong> badge; others are listed as halal based on publicly available information.
      </p>

      <Section id="pakistani" title="Pakistani Restaurants on Devon Avenue" items={pakistani} link="/pakistani/devon-ave" linkLabel="See all halal Pakistani restaurants on Devon →" />
      <Section id="indian" title="Indian Restaurants on Devon Avenue" items={indian} link="/indian/devon-ave" linkLabel="See all halal Indian restaurants on Devon →" />
      <Section id="middle-eastern" title="Middle Eastern Restaurants on Devon Avenue" items={middleEastern} link="/middle-eastern/devon-ave" linkLabel="See all halal Middle Eastern restaurants on Devon →" />
      <Section id="nepali" title="Nepali Food on Devon Avenue" items={nepali} link="/nepali/devon-ave" linkLabel="See all halal Nepali restaurants on Devon →" />
      <Section id="sweets" title="Sweets & Bakeries on Devon Avenue" items={sweets} link="/pakistani/devon-ave" linkLabel="Browse more Devon Avenue listings →" />

      <section id="faq" style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111', borderBottom: '2px solid #16a34a', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
          Frequently Asked Questions
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map(({ question, answer }) => (
            <details key={question} style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '1rem 1.25rem' }}>
              <summary style={{ fontWeight: '600', color: '#111', fontSize: '0.95rem', cursor: 'pointer', lineHeight: 1.5 }}>
                {question}
              </summary>
              <p style={{ margin: '0.75rem 0 0', color: '#555', fontSize: '0.9rem', lineHeight: 1.7 }}>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '14px', padding: '2rem', textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.3rem', color: '#15803d', marginTop: 0 }}>Own a Halal Restaurant on Devon Avenue?</h2>
        <p style={{ color: '#555', margin: '0.5rem 0 1.25rem', fontSize: '0.95rem' }}>
          Get in front of diners searching for halal food on Devon and across Chicagoland. Your restaurant may already be listed — for free.
        </p>
        <Link href="/advertise" style={{
          display: 'inline-block', background: '#16a34a', color: '#fff',
          padding: '0.75rem 2rem', borderRadius: '8px', textDecoration: 'none',
          fontWeight: '700', fontSize: '1rem'
        }}>
          Get Listed — Free listings available
        </Link>
      </section>

      <p style={{ fontSize: '0.8rem', color: '#aaa', lineHeight: 1.6, borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
        Listings in this guide are based on publicly available data. Halal certification status should always be verified directly with the restaurant before dining. Chicago Halal Restaurants does not independently verify certification for unverified listings.
      </p>

      <footer style={{ textAlign: 'center', color: '#aaa', fontSize: '0.82rem', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
        © {new Date().getFullYear()} ChicagoHalalRestaurants.com · Halal status should be verified directly with each restaurant.
      </footer>

    </main>
  )
}

function Section({ id, title, items, link, linkLabel }) {
  return (
    <section id={id} style={{ marginBottom: '3rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111', borderBottom: '2px solid #16a34a', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
        {title}
      </h2>
      {items.map(r => (
        <div key={r.name} style={{
          background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px',
          padding: '1rem 1.25rem', marginBottom: '0.6rem', borderLeft: '4px solid #16a34a',
        }}>
          <h3 style={{ margin: r.note ? '0 0 0.35rem' : 0, fontSize: '1rem', fontWeight: '700', color: '#111' }}>{r.name}</h3>
          {r.note && <p style={{ margin: 0, color: '#555', fontSize: '0.9rem', lineHeight: 1.6 }}>{r.note}</p>}
        </div>
      ))}
      <Link href={link} style={{ display: 'inline-block', marginTop: '0.75rem', color: '#16a34a', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '600' }}>
        {linkLabel}
      </Link>
    </section>
  )
}
