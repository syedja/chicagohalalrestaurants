// GET /api/studio/auth/me — returns the logged-in user, or 401 if not.
// Client pages call this on load to decide whether to redirect to /studio/login.

import { getSessionFromRequest } from "../../../../../lib/studio/session";

export async function GET(request) {
  const session = getSessionFromRequest(request);
  if (!session) {
    return Response.json({ ok: false, error: "Not logged in." }, { status: 401 });
  }
  return Response.json({
    ok: true,
    user: { email: session.email, restaurantName: session.restaurantName || "" },
  });
}
