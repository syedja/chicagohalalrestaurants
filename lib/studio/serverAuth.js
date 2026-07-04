// Optional access gate for Studio API routes.
// Set STUDIO_ACCESS_CODE in your environment to require a code (recommended —
// it stops strangers from running up your AI bill). Leave it unset to allow
// open access during local development.

export function checkAccess(request) {
  const required = process.env.STUDIO_ACCESS_CODE;
  if (!required) return true;
  const supplied = request.headers.get("x-studio-code") || "";
  return supplied === required;
}

export function unauthorized() {
  return Response.json(
    { ok: false, error: "An access code is required. Enter the code from your Premium listing welcome message." },
    { status: 401 }
  );
}
