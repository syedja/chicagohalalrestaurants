// POST /api/studio/auth/login  { email, password }
// Verifies credentials, sets a signed session cookie, returns the user.

import bcrypt from "bcryptjs";
import { query, ensureSchema } from "../../../../../lib/studio/db";
import { createSessionToken, serializeSessionCookie } from "../../../../../lib/studio/session";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const email = String(body?.email || "").trim().toLowerCase();
  const password = String(body?.password || "");

  if (!email || !password) {
    return Response.json({ ok: false, error: "Enter your email and password." }, { status: 400 });
  }

  try {
    await ensureSchema();

    const result = await query(
      "SELECT id, email, password_hash, restaurant_name FROM studio_users WHERE email = $1",
      [email]
    );
    const user = result.rows[0];

    // Same generic error whether the email doesn't exist or the password is
    // wrong — avoids confirming to an attacker which emails have accounts.
    const genericError = "Incorrect email or password.";

    if (!user) {
      return Response.json({ ok: false, error: genericError }, { status: 401 });
    }

    const matches = await bcrypt.compare(password, user.password_hash);
    if (!matches) {
      return Response.json({ ok: false, error: genericError }, { status: 401 });
    }

    const token = createSessionToken(user);
    const res = Response.json({
      ok: true,
      user: { email: user.email, restaurantName: user.restaurant_name || "" },
    });
    res.headers.set("Set-Cookie", serializeSessionCookie(token));
    return res;
  } catch (err) {
    console.error("Login error:", err);
    return Response.json(
      { ok: false, error: "Something went wrong signing you in. Try again." },
      { status: 500 }
    );
  }
}
