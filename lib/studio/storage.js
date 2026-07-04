"use client";

// Client-side persistence and API helper for RestaurantAI Studio.
// Early-access build stores the profile and history in the owner's browser
// (localStorage). Roadmap: move to accounts + a database so profiles follow
// the owner across devices.

const KEY_PROFILE = "chr-studio:profile";
const KEY_HISTORY = "chr-studio:history";
const KEY_CODE = "chr-studio:access-code";

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

function safeGet(key) {
  try {
    return typeof window === "undefined" ? null : window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key, value) {
  try {
    if (typeof window !== "undefined") window.localStorage.setItem(key, value);
  } catch {}
}

export function getProfile() {
  const raw = safeGet(KEY_PROFILE);
  if (!raw) return null;
  try {
    const p = JSON.parse(raw);
    return { ...EMPTY_PROFILE, ...p, socials: { ...EMPTY_PROFILE.socials, ...(p.socials || {}) } };
  } catch {
    return null;
  }
}

export function saveProfile(profile) {
  safeSet(KEY_PROFILE, JSON.stringify(profile));
}

export function profileCompleteness(profile) {
  if (!profile) return 0;
  const core = [
    "name",
    "cuisine",
    "phone",
    "website",
    "address",
    "hours",
    "about",
    "tone",
    "orderingLinks",
    "cateringInfo",
  ];
  let filled = core.filter((k) => profile[k] && String(profile[k]).trim()).length;
  let total = core.length + 1;
  if ((profile.popularDishes || []).length > 0) filled += 1;
  return Math.round((filled / total) * 100);
}

export function getHistory() {
  const raw = safeGet(KEY_HISTORY);
  if (!raw) return [];
  try {
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function addHistory(item) {
  const list = getHistory();
  list.unshift({ id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, ...item });
  safeSet(KEY_HISTORY, JSON.stringify(list.slice(0, 100)));
}

export function deleteHistory(id) {
  safeSet(KEY_HISTORY, JSON.stringify(getHistory().filter((i) => i.id !== id)));
}

export function clearHistory() {
  safeSet(KEY_HISTORY, JSON.stringify([]));
}

export function getAccessCode() {
  return safeGet(KEY_CODE) || "";
}

export function setAccessCode(code) {
  safeSet(KEY_CODE, code || "");
}

/**
 * POST to a Studio API route. Attaches the access code if one is stored.
 * If the server says 401, ask the owner for their code once and retry.
 * Throws Error with a human-readable message on failure.
 */
export async function apiPost(path, body) {
  const attempt = async () => {
    const res = await fetch(path, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-studio-code": getAccessCode(),
      },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    return { res, data };
  };

  let { res, data } = await attempt();

  if (res.status === 401 && typeof window !== "undefined") {
    const code = window.prompt(
      "Enter your Studio access code (included with your Premium listing):"
    );
    if (code) {
      setAccessCode(code.trim());
      ({ res, data } = await attempt());
    }
  }

  if (!res.ok) {
    throw new Error(data?.error || `Request failed (${res.status}). Try again.`);
  }
  return data;
}
