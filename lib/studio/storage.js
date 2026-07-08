"use client";

// Server-backed persistence for RestaurantAI Studio.
// Replaces the earlier localStorage version — profile, post history, and
// review-reply history now live in the account's database row and follow
// the owner across any device. All functions are async now; callers must
// await them (they didn't have to with the old localStorage version).

export const EMPTY_PROFILE = {
  name: "",
  cuisine: "",
  phone: "",
  whatsapp: "",
  email: "",
  website: "",
  address: "",
  neighborhood: "",
  hours: "",
  orderingLinks: "",
  reservationLink: "",
  cateringInfo: "",
  popularDishes: [],
  about: "",
  audience: "",
  certification: "",
  promos: "",
  tone: "",
  brandVoiceNotes: "",
  socials: { instagram: "", facebook: "", tiktok: "" },
};

async function apiFetch(path, options = {}) {
  const res = await fetch(path, {
    credentials: "include",
    headers: { "content-type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data?.error || `Request failed (${res.status}).`);
    err.status = res.status;
    throw err;
  }
  return data;
}

export async function getProfile() {
  try {
    const data = await apiFetch("/api/studio/data/profile");
    const p = data.profile || {};
    if (!p.name) return null; // treat an empty profile as "not set up yet"
    return { ...EMPTY_PROFILE, ...p, socials: { ...EMPTY_PROFILE.socials, ...(p.socials || {}) } };
  } catch {
    return null;
  }
}

export async function saveProfile(profile) {
  await apiFetch("/api/studio/data/profile", {
    method: "PUT",
    body: JSON.stringify({ profile }),
  });
}

export function profileCompleteness(profile) {
  if (!profile) return 0;
  const core = [
    "name", "cuisine", "phone", "website", "address",
    "hours", "about", "tone", "orderingLinks", "cateringInfo",
  ];
  let filled = core.filter((k) => profile[k] && String(profile[k]).trim()).length;
  let total = core.length + 1;
  if ((profile.popularDishes || []).length > 0) filled += 1;
  return Math.round((filled / total) * 100);
}

export async function getHistory() {
  try {
    const data = await apiFetch("/api/studio/data/history");
    return Array.isArray(data.history) ? data.history : [];
  } catch {
    return [];
  }
}

export async function addHistory(item) {
  await apiFetch("/api/studio/data/history", {
    method: "POST",
    body: JSON.stringify({ item }),
  });
}

export async function deleteHistory(id) {
  await apiFetch(`/api/studio/data/history?id=${encodeURIComponent(id)}`, { method: "DELETE" });
}

export async function clearHistory() {
  await apiFetch("/api/studio/data/history?all=1", { method: "DELETE" });
}

export async function getReviewHistory() {
  try {
    const data = await apiFetch("/api/studio/data/reviews-history");
    return Array.isArray(data.reviews_history) ? data.reviews_history : [];
  } catch {
    return [];
  }
}

export async function addReviewHistory(item) {
  await apiFetch("/api/studio/data/reviews-history", {
    method: "POST",
    body: JSON.stringify({ item }),
  });
}

export async function deleteReviewHistory(id) {
  await apiFetch(`/api/studio/data/reviews-history?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}

export async function clearReviewHistory() {
  await apiFetch("/api/studio/data/reviews-history?all=1", { method: "DELETE" });
}

/**
 * POST to an AI-generation Studio route (analyze/generate/reviews).
 * Auth is via the session cookie (credentials: "include") — no access
 * code needed now that each owner has their own account.
 */
export async function apiPost(path, body) {
  const res = await fetch(path, {
    method: "POST",
    credentials: "include",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("Your session expired. Please log in again.");
    }
    throw new Error(data?.error || `Request failed (${res.status}). Try again.`);
  }
  return data;
}
