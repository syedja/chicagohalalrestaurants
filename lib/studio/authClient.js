"use client";

// Client-side auth helper for Studio pages. Each protected page calls
// requireAuth() on mount and redirects to /studio/login if not signed in.

export async function checkAuth() {
  try {
    const res = await fetch("/api/studio/auth/me", { credentials: "include" });
    if (!res.ok) return null;
    const data = await res.json();
    return data.user || null;
  } catch {
    return null;
  }
}

export async function logout() {
  try {
    await fetch("/api/studio/auth/logout", { method: "POST", credentials: "include" });
  } catch {}
}
