import { blogPostSchema } from '@/app/lib/schema'
import Link from 'next/link'

export const metadata = {
  title: 'Best Zabihah Halal Indian & Pakistani Restaurants in Lombard, Glendale Heights & Devon Ave',
  description: 'Find HFSAA and HMS-certified Zabihah halal Indian and Pakistani restaurants in Lombard, Glendale Heights, and Devon Ave. Biryani, karahi, and desi food you can trust.',
}

const faqs = [
  {
    question: 'What is the difference between halal and Zabihah halal?',
    answer: 'Halal means permissible under Islamic law and applies broadly to food. Zabihah halal specifically requires the animal to be slaughtered by a Muslim reciting the Bismillah, to be alive and healthy at the time of slaughter, and for blood to be fully drained. Not all restaurants that call themselves halal follow Zabihah slaughter standards. Observant Muslims who require Zabihah should look for restaurants certified by a recognized body like HFSAA or HMS.',
  },
  {
    question: 'What does HFSAA certification mean for a restaurant?',
    answer: 'HFSAA (Halal Food Standards Alliance of America) is a Chicago-based third-party halal certification body. HFSAA-certified restaurants have been physically audited for their meat supply chain, kitchen practices, and storage to confirm compliance with Zabihah halal standards. Certification requires annual renewal.',
  },
  {
    question: 'What does HMS certification mean?',
    answer: 'HMS (Halal Monitoring Services) is a recognized third-party halal certification body operating in the Midwest. HMS conducts supply chain audits and on-site inspections to verify that the entire preparation process meets halal compliance standards.',
  },
  {
    question: 'Are all Indian and Pakistani restaurants on Devon Ave Zabihah halal?',
    answer: 'Not necessarily. Devon Avenue has a high density of South Asian Muslim-owned restaurants and many follow Zabihah standards, but certification levels vary. The only reliable way to confirm is to ask the restaurant directly and verify with the certifying body\'s online database.',
  },
  {
    question: 'Are there Zabihah halal restaurants in the western Chicago suburbs?',
    answer: 'Yes. Glendale Heights and Lombard in DuPage County have a growing number of halal Indian and Pakistani restaurants including Wah Taj Indo-Pak Fusion Food, Shaahi Biryani, Karachi Chatkhara, Sara\'s Pakistani & Indian Cuisine, and BBQLAND. Always verify certification directly with the restaurant before visiting.',
  },
  {
    question: 'How do I find currently certified Zabihah halal restaurants near me?',
    answer: 'Check the HFSAA or HMS websites for their certified restaurant directories, check verified listings at Chicago Halal Restaurants where paid listings include certification documentation, or call the restaurant directly and ask for their current certification certificate.',
  },
  {
    question: 'Does Chicago Halal Restaurants verify the halal certification of every listing?',
    answer: 'Our current directory includes restaurants sourced from publicly available data. Listings marked as verified are paid listings where the restaurant owner has provided certification documentation directly. Unverified listings reflect publicly available information only. Always confirm certification directly with any restaurant before dining.',
  },
  {
    question: 'What Pakistani dishes should I try at Glendale Heights halal restaurants?',
    answer: 'Start with biryani (layered spiced rice with meat), karahi (a wok-cooked tomato and ginger-based meat dish), nihari (slow-cooked beef shank stew), and seekh kebab (minced meat grilled on skewers). For street food, Karachi Chatkhara in Glendale Heights is worth visiting specifically for their chaat menu.',
  },
  {
    question: 'What Indian dishes should I try at halal Indian restaurants?',
    answer: 'Hyderabadi biryani is a must — available at Hyderabad House on Devon Ave. Beyond biryani, look for haleem (slow-cooked wheat and meat porridge), saag (cooked leafy greens with meat or paneer), and butter chicken as an accessible entry point. At Thali Corner on Devon, ordering a full thali gives you a representative spread of multiple dishes in one meal.',
  },
]

const mentionedRestaurants = [
  { name: 'Wah Taj Indo-Pak Fusion Food', locality: 'Glendale Heights' },
  { name: 'BBQLAND Restaurant', locality: 'Glendale Heights' },
  { name: 'Shaahi Biryani', locality: 'Glendale Heights' },
  { name: 'Karachi Chatkhara', locality: 'Glendale Heights' },
  { name: 'Curry à la Flambè', locality: 'Glendale Heights' },
  { name: 'Qcurrys Indian Kitchen', locality: 'Glendale Heights' },
  { name: 'Hussain Catering & Carry Out', locality: 'Glendale Heights' },
  { name: "Sara's Pakistani & Indian Cuisine", locality: 'Lombard' },
  { name: 'Jerusalem Cafe', locality: 'Lombard' },
  { name: 'J Beez Grill & Catering', locality: 'Lombard' },
  { name: 'Hyderabad House', locality: 'Chicago' },
  { name: 'Mehrab Restaurant', locality: 'Chicago' },
  { name: 'Curry Kitchen', locality: 'Chicago' },
  { name: 'Thali Corner', locality: 'Chicago' },
  { name: 'Hyderabad Kitchen', locality: 'Chicago' },
  { name: 'Usmania Chinese Restaurant', locality: 'Chicago' },
]

export default function BlogPost() {
  const schemas = blogPostSchema({
    headline: 'Best Zabihah Halal Indian & Pakistani Restaurants in Lombard, Glendale Heights & Devon Ave',
    description: 'Find HFSAA and HMS-certified Zabihah halal Indian and Pakistani restaurants in Lombard, Glendale Heights, and Devon Ave.',
    slug: 'zabihah-halal-indian-pakistani-lombard-glendale-heights-devon-ave',
    datePublished: '2025-05-25',
    faqs,
    mentionedRestaurants,
  })

  return (
    <main style={{ maxWidth: '860px', margin: '0 auto', padding: '2rem 1rem', fontFamily: 'system-ui, sans-serif' }}>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      {/* Nav */}
      <Link href="/" style={{ color: '#16a34a', textDecoration: 'none', fontSize: '0.9rem' }}>← Back to Home</Link>

      {/* Header */}
      <div style={{ margin: '1.5rem 0 2rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: '600', background: '#dcfce7', color: '#15803d', padding: '3px 10px', borderRadius: '20px' }}>Zabihah Halal</span>
          <span style={{ fontSize: '0.78rem', fontWeight: '600', background: '#eff6ff', color: '#1d4ed8', padding: '3px 10px', borderRadius: '20px' }}>Indian & Pakistani</span>
          <span style={{ fontSize: '0.78rem', fontWeight: '600', background: '#fef3c7', color: '#92400e', padding: '3px 10px', borderRadius: '20px' }}>Chicago Suburbs</span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#111', lineHeight: 1.25, margin: '0 0 1rem' }}>
          Best Zabihah Halal Indian & Pakistani Restaurants in Lombard, Glendale Heights & Devon Ave
        </h1>
        <p style={{ fontSize: '1.05rem', color: '#555', lineHeight: 1.7, margin: 0 }}>
          If you follow Zabihah halal standards, finding a restaurant you can genuinely trust takes more than a sticker in the window. This guide covers the best halal Indian and Pakistani restaurants across three of the Chicago area's most food-rich neighborhoods — and explains what to look for when it comes to HFSAA and HMS certification.
        </p>
      </div>

      {/* Jump links */}
      <nav style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '1rem 1.25rem', marginBottom: '2.5rem' }}>
        <p style={{ margin: '0 0 0.5rem', fontSize: '0.82rem', fontWeight: '700', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>In this guide</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {[
            ['#zabihah', 'What makes a restaurant Zabihah halal?'],
            ['#glendale-heights', 'Glendale Heights restaurants'],
            ['#lombard', 'Lombard restaurants'],
            ['#devon-ave', 'Devon Ave restaurants'],
            ['#verify', 'How to verify certification'],
            ['#faq', 'Frequently asked questions'],
          ].map(([href, label]) => (
            <a key={href} href={href} style={{ color: '#16a34a', textDecoration: 'none', fontSize: '0.9rem' }}>→ {label}</a>
          ))}
        </div>
      </nav>

      {/* Section: What is Zabihah */}
      <section id="zabihah" style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111', borderBottom: '2px solid #16a34a', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
          What Makes a Restaurant "Zabihah Halal"?
        </h2>
        <p style={{ color: '#444', lineHeight: 1.75, marginBottom: '1rem' }}>
          Halal and Zabihah halal are not the same thing, and the difference matters enormously to observant Muslims. <strong>Halal</strong> broadly means food that is permissible under Islamic law. Many restaurants self-certify or use the term loosely. <strong>Zabihah halal</strong> is stricter — it requires that the animal be slaughtered by a Muslim who recites the name of Allah at the time of slaughter, that the animal be alive and healthy, and that blood be fully drained.
        </p>
        <p style={{ color: '#444', lineHeight: 1.75, marginBottom: '1rem' }}>
          For diners in the Chicago area, two certification bodies carry particular weight:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '1.25rem' }}>
            <p style={{ margin: '0 0 0.4rem', fontWeight: '700', color: '#15803d', fontSize: '1rem' }}>HFSAA</p>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#444', lineHeight: 1.6 }}>
              Halal Food Standards Alliance of America — a Chicago-based certification body that conducts on-site inspections and audits of facilities, slaughterhouses, and restaurants.
            </p>
          </div>
          <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '1.25rem' }}>
            <p style={{ margin: '0 0 0.4rem', fontWeight: '700', color: '#1d4ed8', fontSize: '1rem' }}>HMS</p>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#444', lineHeight: 1.6 }}>
              Halal Monitoring Services — a recognized Midwest certification body that verifies not just the meat source but the entire supply chain from slaughterhouse to kitchen.
            </p>
          </div>
        </div>

        <p style={{ color: '#444', lineHeight: 1.75 }}>
          When visiting any restaurant, ask to see their current certification certificate and confirm the expiry date is valid — certifications require annual renewal.
        </p>
      </section>

      {/* Section: Glendale Heights */}
      <section id="glendale-heights" style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111', borderBottom: '2px solid #16a34a', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
          Halal Indian & Pakistani Restaurants in Glendale Heights
        </h2>
        <p style={{ color: '#444', lineHeight: 1.75, marginBottom: '1.5rem' }}>
          Glendale Heights, located in DuPage County just west of Chicago, has become one of the strongest desi food corridors in the suburbs. The stretch along Army Trail Road and Bloomingdale Road has drawn a growing South Asian Muslim community, and the restaurant scene has followed.
        </p>

        <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#15803d', marginBottom: '1rem' }}>Pakistani Restaurants</h3>
        {[
          {
            name: 'Wah Taj Indo-Pak Fusion Food',
            desc: 'A neighborhood staple offering Indo-Pak comfort food — rich lentil daals, slow-cooked nihari, and crispy parathas. The fusion approach works particularly well for families where tastes run from Pakistani karahi to Indian biryani.',
            link: '/pakistani/glendale-heights',
          },
          {
            name: 'BBQLAND Restaurant',
            desc: 'Indian and Pakistani cuisine with a strong emphasis on grilled and smoked halal meats. Their BBQ-style seekh kebabs, boti, and mixed grills draw regulars who know quality grilling and Zabihah standards can coexist.',
            link: '/pakistani/glendale-heights',
          },
          {
            name: 'Shaahi Biryani',
            desc: 'A dedicated biryani restaurant in the suburbs — a genuine find. Their dum-style biryani cooked low and slow with the pot sealed produces the layered rice and meat fragrance that biryani lovers seek out.',
            link: '/pakistani/glendale-heights',
          },
          {
            name: 'Karachi Chatkhara',
            desc: 'Street food sensibility of Karachi in the DuPage suburbs. Chaat, golgappas, and intensely flavored Pakistani small plates alongside more substantial mains. Fills a genuine gap in suburban halal dining.',
            link: '/pakistani/glendale-heights',
          },
        ].map(r => (
          <RestaurantCard key={r.name} {...r} />
        ))}

        <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#15803d', marginBottom: '1rem', marginTop: '1.5rem' }}>Indian Restaurants</h3>
        {[
          {
            name: 'Curry à la Flambè',
            desc: 'A refined approach to Indian cuisine. The flambé technique creates tableside drama alongside genuine depth of flavor — something more considered than the standard suburban Indian buffet experience.',
            link: '/indian/glendale-heights',
          },
          {
            name: 'Qcurrys Indian Kitchen',
            desc: 'Quick-service that doesn\'t sacrifice flavor for speed. A rotating curry menu covers the South Indian and North Indian spectrum — from coconut-based coastal dishes to the tomato-and-onion gravies of Punjabi cooking.',
            link: '/indian/glendale-heights',
          },
          {
            name: 'Hussain Catering & Carry Out',
            desc: 'Primarily a catering operation that also offers carry-out. Worth knowing for larger gatherings — a Zabihah halal catering option in DuPage County is not easy to find, with an Indo-Pakistani menu that scales for events.',
            link: '/indian/glendale-heights',
          },
        ].map(r => (
          <RestaurantCard key={r.name} {...r} />
        ))}
      </section>

      {/* Section: Lombard */}
      <section id="lombard" style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111', borderBottom: '2px solid #16a34a', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
          Halal Indian & Pakistani Restaurants in Lombard
        </h2>
        <p style={{ color: '#444', lineHeight: 1.75, marginBottom: '1.5rem' }}>
          Lombard sits adjacent to Glendale Heights and shares a similar character — a growing South Asian Muslim community in DuPage County looking for quality halal dining closer to home.
        </p>
        {[
          {
            name: "Sara's Pakistani & Indian Cuisine",
            desc: 'One of the most well-regarded Pakistani-Indian restaurants in the Lombard area. A menu that reflects actual South Asian home cooking — regulars recommend the karahi, the haleem, and the freshly made naan.',
            link: '/pakistani/lombard',
          },
          {
            name: 'Jerusalem Cafe',
            desc: 'Brings a Middle Eastern and Mediterranean perspective that complements the South Asian halal options in the area — part of the broader halal dining ecosystem in Lombard.',
            link: '/middle-eastern/lombard',
          },
          {
            name: 'J Beez Grill & Catering (Zabiha Halal)',
            desc: 'Explicitly markets itself as Zabiha halal and covers Mediterranean, Pakistani, and Indian cuisines under one roof — a practical choice when a group has mixed preferences.',
            link: '/pakistani/lombard',
          },
        ].map(r => (
          <RestaurantCard key={r.name} {...r} />
        ))}
        <p style={{ fontSize: '0.88rem', color: '#888', fontStyle: 'italic', marginTop: '1rem', lineHeight: 1.6 }}>
          Note: Lombard's halal restaurant presence is growing. If you own or know of a Zabihah-certified restaurant in Lombard, <Link href="/advertise" style={{ color: '#16a34a' }}>contact us to be featured</Link>.
        </p>
      </section>

      {/* Section: Devon Ave */}
      <section id="devon-ave" style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111', borderBottom: '2px solid #16a34a', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
          Halal Indian & Pakistani Restaurants on Devon Ave, Chicago
        </h2>
        <p style={{ color: '#444', lineHeight: 1.75, marginBottom: '1.5rem' }}>
          Devon Avenue in Chicago's West Rogers Park neighborhood is the undisputed center of South Asian halal dining in the entire metro area. The stretch roughly between Western Avenue and California Avenue is dense with Indian and Pakistani restaurants, grocers, sweet shops, and bakeries.
        </p>
        {[
          {
            name: 'Hyderabad House',
            desc: 'Brings the cuisine of Hyderabad to Devon Avenue. Hyderabadi biryani, haleem, and the layered meat and rice dishes of the Nizami kitchen are the highlights — a cuisine distinct from both north Indian and standard Pakistani menus.',
            link: '/indian/devon-ave',
          },
          {
            name: 'Mehrab Restaurant',
            desc: 'A Devon Ave institution serving Pakistani and Indian halal food that reflects the neighborhood\'s authenticity. No fusion, no shortcut sauces — bread-based dishes are made in-house.',
            link: '/indian/devon-ave',
          },
          {
            name: 'Curry Kitchen',
            desc: 'Exactly what a neighborhood halal Indian restaurant should be: consistent, affordable, and genuinely good. Their curries balance spice and depth in a way that regulars trust for weeknight dining.',
            link: '/indian/devon-ave',
          },
          {
            name: 'Thali Corner',
            desc: 'A thali-focused menu that gives diners the full spread in one plate — dal, vegetables, rice, bread, pickle, and dessert. A halal thali option on Devon is a genuine find.',
            link: '/indian/devon-ave',
          },
          {
            name: 'Hyderabad Kitchen — Dining',
            desc: 'A second Hyderabad-focused option on Devon demonstrating the strength of the Hyderabadi community presence. Their dining room is a step up in atmosphere from many Devon Ave spots.',
            link: '/indian/devon-ave',
          },
          {
            name: 'Usmania Chinese Restaurant',
            desc: 'Halal Chinese-Pakistani fusion — a genre entirely its own. Originating in the Pakistani diaspora\'s adaptation of Chinese cooking to halal standards. If you\'ve never tried halal chili chicken or desi-style fried rice, Devon Ave is the place to start.',
            link: '/indian/devon-ave',
          },
        ].map(r => (
          <RestaurantCard key={r.name} {...r} />
        ))}
      </section>

      {/* Section: How to verify */}
      <section id="verify" style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111', borderBottom: '2px solid #16a34a', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
          How to Verify Zabihah Halal Certification Before You Visit
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[
            ['Ask the restaurant directly', 'Call ahead and ask which halal certification body certified them and when the certificate was last renewed. A legitimate Zabihah restaurant will answer this immediately.'],
            ['Check the certifying body\'s website', 'Both HFSAA and HMS maintain searchable databases of their certified establishments. Verify the restaurant\'s name appears and the certification is current before visiting.'],
            ['Look for the physical certificate', 'Any legitimate certified restaurant will display their certificate on-site. The certificate should show the issuing body, the restaurant name, and an expiry date.'],
            ['Ask about the meat supplier', 'HFSAA and HMS certification extends to the supply chain. A genuinely certified restaurant should be able to name their halal-certified meat supplier.'],
            ['Check our verified listings', 'Restaurants that have claimed a verified listing on Chicago Halal Restaurants and provided certification documentation will be clearly marked.'],
          ].map(([title, text], i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '1rem 1.25rem' }}>
              <span style={{ flexShrink: 0, width: '28px', height: '28px', borderRadius: '50%', background: '#16a34a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.85rem' }}>{i + 1}</span>
              <div>
                <p style={{ margin: '0 0 0.25rem', fontWeight: '600', color: '#111', fontSize: '0.95rem' }}>{title}</p>
                <p style={{ margin: 0, color: '#555', fontSize: '0.88rem', lineHeight: 1.6 }}>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
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

      {/* CTA */}
      <section style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '14px', padding: '2rem', textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.3rem', color: '#15803d', marginTop: 0 }}>Own a Zabihah Halal Restaurant?</h2>
        <p style={{ color: '#555', margin: '0.5rem 0 1.25rem', fontSize: '0.95rem' }}>
          Get your HFSAA or HMS certification badge displayed on your listing. Reach thousands of diners searching for verified Zabihah halal food every month.
        </p>
        <Link href="/advertise" style={{
          display: 'inline-block', background: '#16a34a', color: '#fff',
          padding: '0.75rem 2rem', borderRadius: '8px', textDecoration: 'none',
          fontWeight: '700', fontSize: '1rem'
        }}>
          Get Verified — Plans from $19/mo
        </Link>
      </section>

      {/* Disclaimer */}
      <p style={{ fontSize: '0.8rem', color: '#aaa', lineHeight: 1.6, borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
        Listings in this guide are based on publicly available data. Halal certification status should always be verified directly with the restaurant and the relevant certifying body (HFSAA or HMS) before dining. Chicago Halal Restaurants does not independently verify certification for unverified listings.
      </p>

      {/* Footer */}
      <footer style={{ textAlign: 'center', color: '#aaa', fontSize: '0.82rem', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
        © {new Date().getFullYear()} ChicagoHalalRestaurants.com · Halal status should be verified directly with each restaurant.
      </footer>

    </main>
  )
}

function RestaurantCard({ name, desc, link }) {
  return (
    <div style={{
      background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px',
      padding: '1.25rem', marginBottom: '0.75rem',
      borderLeft: '4px solid #16a34a',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
        <h3 style={{ margin: '0 0 0.4rem', fontSize: '1rem', fontWeight: '700', color: '#111' }}>{name}</h3>
        <Link href={link} style={{ fontSize: '0.8rem', color: '#16a34a', textDecoration: 'none', fontWeight: '500', whiteSpace: 'nowrap', flexShrink: 0 }}>
          View listing →
        </Link>
      </div>
      <p style={{ margin: 0, color: '#555', fontSize: '0.9rem', lineHeight: 1.65 }}>{desc}</p>
    </div>
  )
}
