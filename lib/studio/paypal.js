// Thin PayPal REST API helper (no SDK dependency — same pattern as the AI
// provider wrapper: plain fetch calls, easy to audit and swap later).
//
// PayPal requires an OAuth2 access token (client-credentials grant) before
// any API call. Tokens are short-lived; we fetch a fresh one per call rather
// than caching, since Studio billing traffic is low-volume and correctness
// matters more than shaving one HTTP round trip.

function paypalBase() {
  // Sandbox vs live is determined by which credentials are set — sandbox
  // keys only work against the sandbox API and vice versa.
  return process.env.PAYPAL_ENV === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";
}

export async function getPaypalAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_CLIENT_SECRET;
  if (!clientId || !secret) {
    throw new Error("PAYPAL_CLIENT_ID / PAYPAL_CLIENT_SECRET are not set.");
  }
  const res = await fetch(`${paypalBase()}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`PayPal auth failed (${res.status}): ${text.slice(0, 200)}`);
  }
  const data = await res.json();
  return data.access_token;
}

export async function paypalFetch(path, options = {}) {
  const token = await getPaypalAccessToken();
  const res = await fetch(`${paypalBase()}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data?.message || `PayPal API error (${res.status})`);
    err.status = res.status;
    err.details = data;
    throw err;
  }
  return data;
}
