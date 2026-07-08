// POST /api/studio/auth/logout — clears the session cookie.

import { clearedSessionCookie } from "../../../../../lib/studio/session";

export async function POST() {
  const res = Response.json({ ok: true });
  res.headers.set("Set-Cookie", clearedSessionCookie());
  return res;
}
