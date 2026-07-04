// Occasion calendar for RestaurantAI Studio.
// Fixed and rule-based civic dates are computed. Islamic dates follow the lunar
// calendar and are APPROXIMATE — always confirmed by moonsighting. Every Islamic
// occasion is flagged `approximate: true` and the UI must say so.

function nthWeekday(year, month /* 0-11 */, weekday /* 0=Sun */, n) {
  const first = new Date(year, month, 1);
  const offset = (7 + weekday - first.getDay()) % 7;
  return new Date(year, month, 1 + offset + (n - 1) * 7);
}

function lastWeekday(year, month, weekday) {
  const last = new Date(year, month + 1, 0);
  const offset = (7 + last.getDay() - weekday) % 7;
  return new Date(year, month, last.getDate() - offset);
}

// Approximate Gregorian dates for Islamic occasions (subject to moonsighting).
// Sources vary by a day or two; verify locally before publishing dated offers.
const ISLAMIC_DATES = {
  ramadanStart: { 2026: "2026-02-18", 2027: "2027-02-08", 2028: "2028-01-28" },
  eidFitr: { 2026: "2026-03-20", 2027: "2027-03-10", 2028: "2028-02-27" },
  eidAdha: { 2026: "2026-05-27", 2027: "2027-05-16", 2028: "2028-05-05" },
};

function isoToDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function occasionsForYear(year) {
  const list = [
    {
      name: "New Year",
      date: new Date(year, 0, 1),
      campaignId: "new-year",
      note: "New Year dining and party catering",
    },
    {
      name: "Valentine's Day",
      date: new Date(year, 1, 14),
      campaignId: "weekend-family",
      note: "Dinner-for-two and family dining",
    },
    {
      name: "Mother's Day",
      date: nthWeekday(year, 4, 0, 2),
      campaignId: "mothers-day",
      note: "One of the busiest restaurant days of the year",
    },
    {
      name: "Graduation season",
      date: new Date(year, 4, 20),
      campaignId: "graduation",
      note: "Party trays and family celebration dinners",
      window: true,
    },
    {
      name: "Memorial Day weekend",
      date: lastWeekday(year, 4, 1),
      campaignId: "weekend-family",
      note: "Long-weekend family dining",
    },
    {
      name: "Father's Day",
      date: nthWeekday(year, 5, 0, 3),
      campaignId: "fathers-day",
      note: "Hearty specials for dad",
    },
    {
      name: "Independence Day",
      date: new Date(year, 6, 4),
      campaignId: "weekend-family",
      note: "Holiday cookout alternative and family platters",
    },
    {
      name: "Back to school",
      date: new Date(year, 7, 15),
      campaignId: "slow-day-boost",
      note: "Easy weeknight family dinners",
      window: true,
    },
    {
      name: "Labor Day weekend",
      date: nthWeekday(year, 8, 1, 1),
      campaignId: "weekend-family",
      note: "Last long weekend of summer",
    },
    {
      name: "Thanksgiving",
      date: nthWeekday(year, 10, 4, 4),
      campaignId: "thanksgiving-catering",
      note: "Halal holiday meals — take catering orders early",
    },
    {
      name: "Winter holiday season",
      date: new Date(year, 11, 10),
      campaignId: "winter-holidays",
      note: "Office parties and end-of-year gatherings",
      window: true,
    },
  ];

  // Islamic occasions (approximate — confirmed by moonsighting)
  if (ISLAMIC_DATES.ramadanStart[year]) {
    const start = isoToDate(ISLAMIC_DATES.ramadanStart[year]);
    const prep = new Date(start);
    prep.setDate(prep.getDate() - 14);
    list.push(
      {
        name: "Ramadan prep",
        date: prep,
        campaignId: "ramadan-iftar",
        note: "Announce iftar menus and take group bookings before Ramadan begins",
        approximate: true,
        window: true,
      },
      {
        name: "Ramadan begins",
        date: start,
        campaignId: "ramadan-iftar",
        note: "Iftar specials, family platters, suhoor if offered",
        approximate: true,
      }
    );
  }
  if (ISLAMIC_DATES.eidFitr[year]) {
    list.push({
      name: "Eid al-Fitr",
      date: isoToDate(ISLAMIC_DATES.eidFitr[year]),
      campaignId: "eid-fitr",
      note: "Eid family feasts — one of the biggest halal dining days",
      approximate: true,
    });
  }
  if (ISLAMIC_DATES.eidAdha[year]) {
    list.push({
      name: "Eid al-Adha",
      date: isoToDate(ISLAMIC_DATES.eidAdha[year]),
      campaignId: "eid-adha",
      note: "Eid gatherings and celebration catering",
      approximate: true,
    });
  }

  return list;
}

/**
 * Upcoming occasions from `from`, looking ahead `months` months.
 * Each item: { name, date, campaignId, note, approximate?, window?, daysAway }
 */
export function upcomingOccasions(from = new Date(), months = 12) {
  const end = new Date(from);
  end.setMonth(end.getMonth() + months);
  const years = new Set([from.getFullYear(), end.getFullYear()]);
  const all = [];
  for (const y of years) all.push(...occasionsForYear(y));
  const dayMs = 24 * 60 * 60 * 1000;
  const today = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  return all
    .filter((o) => o.date >= today && o.date <= end)
    .sort((a, b) => a.date - b.date)
    .map((o) => ({ ...o, daysAway: Math.round((o.date - today) / dayMs) }));
}

export function formatOccasionDate(date) {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
  });
}
