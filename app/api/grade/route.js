import { NextResponse } from 'next/server';
import restaurantsData from '../../data/restaurants.json';

const WEIGHTS = {
  listed: 30,
  verified: 25,
  phone: 15,
  hours: 15,
  photo: 10,
  description: 5,
};

function scoreRestaurant(r) {
  return {
    listed:      true,
    verified:    !!r.certified_halal,
    phone:       !!(r.phone && r.phone.trim()),
    hours:       !!(r.hours && r.hours.trim()),
    photo:       !!(r.photo_url || r.image || r.photo),
    description: !!(r.description || r.about),
  };
}

function calcScore(checks) {
  return Object.entries(checks).reduce((sum, [key, val]) => {
    return sum + (val ? WEIGHTS[key] : 0);
  }, 0);
}

function formatNeighborhood(slug) {
  if (!slug) return '';
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function formatCuisine(slug) {
  if (!slug) return 'Halal';
  return slug.charAt(0).toUpperCase() + slug.slice(1);
}

function normalize(str) {
  return (str || '').toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
}

function matchScore(restaurant, query) {
  const q = normalize(query);
  const name = normalize(restaurant.name || '');
  if (name === q) return 100;
  if (name.includes(q) || q.includes(name)) return 80;
  const qWords = q.split(/\s+/).filter(w => w.length > 2);
  const nameWords = name.split(/\s+/);
  const matched = qWords.filter(w => nameWords.some(nw => nw.includes(w) || w.includes(nw)));
  if (matched.length > 0) return 50 + (matched.length / Math.max(qWords.length, 1)) * 30;
  return 0;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query || query.trim().length < 2) {
    return NextResponse.json({ error: 'Query too short' }, { status: 400 });
  }

  const scored = restaurantsData
    .map(r => ({ r, match: matchScore(r, query) }))
    .filter(({ match }) => match > 40)
    .sort((a, b) => b.match - a.match)
    .slice(0, 3);

  if (!scored.length) {
    return NextResponse.json({ found: false, query });
  }

  const best = scored[0].r;
  const checks = scoreRestaurant(best);
  const listingScore = calcScore(checks);

  return NextResponse.json({
    found: true,
    restaurant: {
      name: best.name,
      cuisine: formatCuisine(best.cuisine),
      neighborhood: formatNeighborhood(best.neighborhood),
      address: best.address || '',
      phone: best.phone || '',
      hours: best.hours || '',
      rating: best.rating || null,
      family_friendly: best.family_friendly || false,
      delivery_available: best.delivery_available || false,
    },
    checks,
    score: listingScore,
    weights: WEIGHTS,
    alternatives: scored.slice(1).map(({ r }) => ({
      name: r.name,
      cuisine: formatCuisine(r.cuisine),
      neighborhood: formatNeighborhood(r.neighborhood),
    })),
  });
}
