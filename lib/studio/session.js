// Signed session cookies for RestaurantAI Studio accounts.
// Uses Node's built-in crypto (HMAC-SHA256) instead of a JWT library —
// one less dependency, same security property: the payload can't be
// forged or altered without knowing STUDIO_SESSION_SECRET.
//
// Required env var: STUDIO_SESSION_SECRET — any long random string.
// Generate one with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

import crypto from "crypto";

export const SESSION_COOKIE = "studio_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

function getSecret() {
  const secret = process.env.STUDIO_SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "STUDIO_SESSION_SECRET is not set. Generate one with: node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\" and add it in Vercel env vars."
    );
  }
  return secret;
}

function base64url(input) {
  return Buffer.from(input).toString("base64url");
}

function sign(payloadB64) {
  return crypto.createHmac("sha256", getSecret()).update(payloadB64).digest("base64url");
}

/** Creates a signed session token string for the given user id + email. */
export function createSessionToken(user) {
  const payload = JSON.stringify({
    id: user.id,
    email: user.email,
    restaurantName: user.restaurant_name || user.restaurantName || "",
    iat: Date.now(),
  });
  const payloadB64 = base64url(payload);
  const signature = sign(payloadB64);
  return `${payloadB64}.${signature}`;
}

/**
 * Verifies a session token. Returns the decoded payload object if valid,
 * or null if missing, malformed, expired, or tampered with.
 */
export function verifySessionToken(token) {
  if (!token || typeof token !== "string" || !token.includes(".")) return null;
  const [payloadB64, signature] = token.split(".");
  if (!payloadB64 || !signature) return null;

  let expected;
  try {
    expected = sign(payloadB64);
  } catch {
    return null;
  }

  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return null;
  }

  let payload;
  try {
    payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf8"));
  } catch {
    return null;
  }

  const ageSeconds = (Date.now() - (payload.iat || 0)) / 1000;
  if (ageSeconds > MAX_AGE_SECONDS) return null;

  return payload;
}

/**
 * Extracts and verifies the session from an incoming Request's Cookie header.
 * Returns the decoded {id, email, restaurantName} payload, or null.
 */
export function getSessionFromRequest(request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${SESSION_COOKIE}=`));
  if (!match) return null;
  const token = match.slice(SESSION_COOKIE.length + 1);
  return verifySessionToken(token);
}
export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  };
}

/** Builds a Set-Cookie header value for the given cookie value + options. */
export function serializeSessionCookie(value, opts = sessionCookieOptions()) {
  const parts = [`${SESSION_COOKIE}=${value}`, `Path=${opts.path}`, `Max-Age=${opts.maxAge}`, `SameSite=${opts.sameSite}`];
  if (opts.httpOnly) parts.push("HttpOnly");
  if (opts.secure) parts.push("Secure");
  return parts.join("; ");
}

/** Builds a Set-Cookie header value that immediately clears the session cookie. */
export function clearedSessionCookie() {
  const opts = sessionCookieOptions();
  const parts = [`${SESSION_COOKIE}=`, `Path=${opts.path}`, "Max-Age=0", `SameSite=${opts.sameSite}`];
  if (opts.httpOnly) parts.push("HttpOnly");
  if (opts.secure) parts.push("Secure");
  return parts.join("; ");
}
