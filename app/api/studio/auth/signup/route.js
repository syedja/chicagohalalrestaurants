// POST /api/studio/auth/signup  { email, password, restaurantName }
// Creates an account, sets a signed session cookie, returns the user.

import bcrypt from "bcryptjs";
import { query, ensureSchema } from "../../../../../lib/studio/db";
import { createSessionToken, serializeSessionCookie } from "../../../../../lib/studio/session";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const email = String(body?.email || "").trim().toLowerCase();
  const password = String(body?.password || "");
  const restaurantName = String(body?.restaurantName || "").trim().slice(0, 200);

  if (!isValidEmail(email)) {
    return Response.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
  }
  if (password.length < 8) {
    return Response.json(
      { ok: false, error: "Password must be at least 8 characters." },
      { status: 400 }
    );
  }

  try {
    await ensureSchema();

    const existing = await query("SELECT id FROM studio_users WHERE email = $1", [email]);
    if (existing.rows.length > 0) {
      return Response.json(
        { ok: false, error: "An account with that email already exists. Try logging in instead." },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const result = await query(
      `INSERT INTO studio_users (email, password_hash, restaurant_name)
       VALUES ($1, $2, $3)
       RETURNING id, email, restaurant_name`,
      [email, passwordHash, restaurantName]
    );
    const user = result.rows[0];

    const token = createSessionToken(user);
    const res = Response.json({
      ok: true,
      user: { email: user.email, restaurantName: user.restaurant_name || "" },
    });
    res.headers.set("Set-Cookie", serializeSessionCookie(token));
    return res;
  } catch (err) {
    console.error("Signup error:", err);
    return Response.json(
      { ok: false, error: "Something went wrong creating your account. Try again." },
      { status: 500 }
    );
  }
}
