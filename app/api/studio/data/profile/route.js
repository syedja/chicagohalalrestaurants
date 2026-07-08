// GET  /api/studio/data/profile — returns the logged-in user's profile
// PUT  /api/studio/data/profile  { profile } — saves it

import { query } from "../../../../../lib/studio/db";
import { getSessionFromRequest } from "../../../../../lib/studio/session";

function unauthorized() {
  return Response.json({ ok: false, error: "Please log in again." }, { status: 401 });
}

export async function GET(request) {
  const session = getSessionFromRequest(request);
  if (!session) return unauthorized();

  try {
    const result = await query("SELECT profile FROM studio_users WHERE id = $1", [session.id]);
    if (result.rows.length === 0) return unauthorized();
    return Response.json({ ok: true, profile: result.rows[0].profile || {} });
  } catch (err) {
    console.error("Get profile error:", err);
    return Response.json({ ok: false, error: "Couldn't load your profile." }, { status: 500 });
  }
}

export async function PUT(request) {
  const session = getSessionFromRequest(request);
  if (!session) return unauthorized();

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const profile = body?.profile && typeof body.profile === "object" ? body.profile : {};

  try {
    await query("UPDATE studio_users SET profile = $1 WHERE id = $2", [
      JSON.stringify(profile),
      session.id,
    ]);
    // Keep restaurant_name column roughly in sync for display purposes.
    if (profile.name) {
      await query("UPDATE studio_users SET restaurant_name = $1 WHERE id = $2", [
        String(profile.name).slice(0, 200),
        session.id,
      ]);
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Save profile error:", err);
    return Response.json({ ok: false, error: "Couldn't save your profile." }, { status: 500 });
  }
}
