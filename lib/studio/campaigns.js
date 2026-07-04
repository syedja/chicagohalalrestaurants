// One-click campaign catalog for RestaurantAI Studio.
// Each campaign carries a `hint` that steers the AI. Owners never see prompts.

export const CAMPAIGN_CATEGORIES = [
  { id: "everyday", label: "Everyday" },
  { id: "occasions", label: "Occasions & Holidays" },
  { id: "growth", label: "Grow the Business" },
];

export const CAMPAIGNS = [
  // ---------- Everyday ----------
  {
    id: "todays-special",
    category: "everyday",
    label: "Today's Special",
    tagline: "Put one dish in the spotlight today",
    hint:
      "Promote a single featured dish available today. Create urgency without inventing scarcity. Lead with sensory, appetizing language about the dish.",
    detailsPlaceholder: "Which dish? Any price or time window? e.g. Chicken Biryani, $12.99, until 9pm",
  },
  {
    id: "jummah-lunch",
    category: "everyday",
    label: "Jummah Lunch",
    tagline: "Friday lunch rush after prayers",
    hint:
      "Promote a Friday lunch aimed at families and professionals coming from Jummah prayers. Warm, community-centered tone. Mention convenient timing after prayers. Do not state specific masjid names unless provided.",
    detailsPlaceholder: "Lunch special details, serving hours, group seating, etc.",
  },
  {
    id: "weekend-family",
    category: "everyday",
    label: "Weekend Family Special",
    tagline: "Bring the whole family in",
    hint:
      "Promote weekend dining for families: generous portions, family platters, kid-friendly options. Emphasize gathering and hospitality.",
    detailsPlaceholder: "Family platter details, weekend hours, any deal",
  },
  {
    id: "new-menu-item",
    category: "everyday",
    label: "New Menu Item",
    tagline: "Announce something new on the menu",
    hint:
      "Announce a brand-new menu item. Build curiosity and describe flavor and preparation. Invite people to be among the first to try it.",
    detailsPlaceholder: "Name of the new item and what makes it special",
  },
  {
    id: "limited-time-offer",
    category: "everyday",
    label: "Limited-Time Offer",
    tagline: "A deal with a real deadline",
    hint:
      "Promote a limited-time offer. State the offer and its end date exactly as provided; never invent discounts, prices, or deadlines that were not supplied.",
    detailsPlaceholder: "The exact offer and when it ends. e.g. 10% off catering orders booked by June 30",
  },
  {
    id: "slow-day-boost",
    category: "everyday",
    label: "Slow-Day Boost",
    tagline: "Fill tables on a quiet weekday",
    hint:
      "Drive traffic on a slow weekday (e.g. Monday or Tuesday). Cozy, low-pressure tone: a good meal without the weekend wait.",
    detailsPlaceholder: "Which day? Any weekday deal or highlight?",
  },

  // ---------- Occasions ----------
  {
    id: "ramadan-iftar",
    category: "occasions",
    label: "Ramadan Iftar",
    tagline: "Iftar specials, family iftars, group bookings",
    hint:
      "Promote iftar offerings during Ramadan: iftar specials, family iftar platters, group and masjid bookings, and suhoor if offered. Respectful, warm Ramadan tone. Include 'Ramadan Mubarak' naturally. Mention timing relative to maghrib/iftar time without stating a specific clock time unless provided.",
    detailsPlaceholder: "Iftar menu/platter details, prices if any, reservation info",
  },
  {
    id: "eid-fitr",
    category: "occasions",
    label: "Eid al-Fitr",
    tagline: "Eid celebrations and family feasts",
    hint:
      "Promote Eid al-Fitr dining and catering: family celebrations after Ramadan, Eid parties, sweets and festive platters. Joyful tone, 'Eid Mubarak' greeting.",
    detailsPlaceholder: "Eid hours, special menu, catering availability",
  },
  {
    id: "eid-adha",
    category: "occasions",
    label: "Eid al-Adha",
    tagline: "Eid al-Adha gatherings and catering",
    hint:
      "Promote Eid al-Adha dining and catering. Festive, family-gathering tone, 'Eid Mubarak' greeting. Highlight meat dishes if they are among the restaurant's popular items.",
    detailsPlaceholder: "Eid hours, special menu, catering availability",
  },
  {
    id: "mothers-day",
    category: "occasions",
    label: "Mother's Day",
    tagline: "Treat mom to a meal she didn't cook",
    hint:
      "Promote Mother's Day dining: honoring mothers, letting mom rest while the restaurant cooks. Warm and heartfelt, not salesy.",
    detailsPlaceholder: "Any Mother's Day special, reservations recommended?",
  },
  {
    id: "fathers-day",
    category: "occasions",
    label: "Father's Day",
    tagline: "A feast for dad",
    hint: "Promote Father's Day dining. Hearty, appreciative tone centered on treating dad.",
    detailsPlaceholder: "Any Father's Day special or featured dishes",
  },
  {
    id: "graduation",
    category: "occasions",
    label: "Graduation Season",
    tagline: "Celebrate the graduate",
    hint:
      "Promote graduation celebrations: family dinners and party catering for graduates. Proud, congratulatory tone. Mention group seating or party trays if applicable.",
    detailsPlaceholder: "Party tray options, group seating, booking info",
  },
  {
    id: "thanksgiving-catering",
    category: "occasions",
    label: "Thanksgiving",
    tagline: "Halal options for the holiday table",
    hint:
      "Promote halal Thanksgiving options: dine-in or catering for families who want a fully halal holiday meal. Emphasize that everything is halal so families can enjoy worry-free.",
    detailsPlaceholder: "Holiday hours, special menu, turkey or alternatives, order deadlines",
  },
  {
    id: "winter-holidays",
    category: "occasions",
    label: "Winter Holiday Catering",
    tagline: "Office parties and winter gatherings",
    hint:
      "Promote catering for end-of-year office parties and winter family gatherings. Inclusive tone that works for mixed workplaces; highlight that halal catering means everyone on the team can eat.",
    detailsPlaceholder: "Catering menu, per-person pricing if any, order lead time",
  },
  {
    id: "new-year",
    category: "occasions",
    label: "New Year",
    tagline: "Start the year with a great meal",
    hint: "Promote New Year dining or catering. Fresh-start, celebratory tone.",
    detailsPlaceholder: "Hours, specials, party bookings",
  },

  // ---------- Growth ----------
  {
    id: "catering-corporate",
    category: "growth",
    label: "Corporate Catering",
    tagline: "Win office lunches and company events",
    hint:
      "Pitch corporate catering to offices and event planners. Professional but warm. Emphasize reliability, on-time delivery if offered, halal-certified food that includes everyone, and easy ordering. Target decision-makers, not diners.",
    detailsPlaceholder: "Minimum order, delivery radius, lead time, popular catering items",
  },
  {
    id: "catering-wedding",
    category: "growth",
    label: "Wedding & Event Catering",
    tagline: "Weddings, walimas, and big celebrations",
    hint:
      "Promote wedding and walima catering plus large family events. Elegant, celebratory tone. Emphasize experience with large gatherings and customizable menus.",
    detailsPlaceholder: "Guest capacity, popular wedding menu items, booking process",
  },
  {
    id: "increase-reviews",
    category: "growth",
    label: "Ask for Reviews",
    tagline: "Turn happy guests into 5-star reviews",
    hint:
      "Create a polite ask encouraging happy customers to leave a Google review. Grateful, humble tone. Never offer incentives in exchange for reviews (against Google policy). Include the review link placeholder if none provided.",
    detailsPlaceholder: "Google review link if you have it",
  },
  {
    id: "increase-online-orders",
    category: "growth",
    label: "Boost Online Orders",
    tagline: "Send people to your ordering link",
    hint:
      "Drive online orders for pickup or delivery. Convenience-focused: skip the wait, order ahead. Use the restaurant's ordering links; if none provided, use a placeholder and note it.",
    detailsPlaceholder: "Which platform(s)? Any pickup/delivery deal?",
  },
  {
    id: "increase-reservations",
    category: "growth",
    label: "Fill Reservations",
    tagline: "Book tables for the week ahead",
    hint: "Encourage reservations, especially for weekends and groups. Mention how to book.",
    detailsPlaceholder: "How do guests reserve? Phone, link, walk-in only?",
  },
  {
    id: "grand-opening",
    category: "growth",
    label: "Grand Opening / Launch",
    tagline: "Announce a new restaurant or location",
    hint:
      "Announce a grand opening or new location. Excited, welcoming tone. Include opening date and address exactly as provided; never invent them.",
    detailsPlaceholder: "Opening date, address, any opening-week specials",
  },
  {
    id: "loyalty-referral",
    category: "growth",
    label: "Loyalty & Referral",
    tagline: "Reward regulars, invite their friends",
    hint:
      "Promote a loyalty or referral program. State the program mechanics exactly as provided; never invent rewards.",
    detailsPlaceholder: "How the program works. e.g. Buy 9 meals, get the 10th free",
  },
];

export function getCampaign(id) {
  return CAMPAIGNS.find((c) => c.id === id) || null;
}
