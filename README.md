# RestaurantAI Studio — Premium feature module

An AI marketing studio for halal restaurant owners, built to drop into the
existing chicagohalalrestaurants.com Next.js (App Router) project. Owners paste
their website, the Studio learns their restaurant, and one-click campaigns
produce ready-to-post Instagram, Facebook, Google Business, WhatsApp, and SMS
content — plus a halal-aware campaign calendar and review-reply drafting.

---

## What's in the box (Phase 1 + Phase 2)

| Route | What it does |
|---|---|
| `/studio` | Dashboard: hero, profile completeness, quick campaigns, upcoming occasions, recent work |
| `/studio/onboarding` | Website Intelligence: paste a URL → AI extracts the restaurant profile → owner reviews & saves |
| `/studio/profile` | Full restaurant profile editor (the AI's permanent memory) |
| `/studio/create` | One-click campaigns (Everyday / Occasions / Growth) → multi-platform content with copy buttons |
| `/studio/calendar` | 12-month campaign calendar incl. Ramadan/Eid (flagged approximate — moonsighting), Jummah weekly |
| `/studio/reviews` | Paste a customer review → drafted owner reply (full + short versions) |
| `/studio/history` | Every generation saved, reopenable, copyable |
| `POST /api/studio/analyze` | Fetches + analyzes the restaurant's website server-side |
| `POST /api/studio/generate` | Content generation (invisible prompt engine, accuracy rules baked in) |
| `POST /api/studio/reviews` | Review reply generation |

Built-in accuracy guardrails (matching the site's editorial standards): the AI
is instructed to never invent prices, discounts, hours, dates, awards, or
certifications; missing details become visible `[placeholders]`; certification
is only mentioned when the owner lists a certifier; no "#1 / best in Chicago"
superlatives unless the owner supplies the claim; review-ask campaigns never
offer incentives (Google policy).

## Install (10 minutes)

1. **Copy folders into your repo root**, merging with what's there:
   - `app/studio/` → `app/studio/`
   - `app/api/studio/` → `app/api/studio/`
   - `lib/studio/` → `lib/studio/`
   - `components/studio/` → `components/studio/`

   Nothing overwrites your existing files — everything lives in new `studio`
   subfolders. Imports are all relative, so no path-alias config is needed.

2. **Set environment variables** (locally in `.env.local`, and in Vercel →
   Project → Settings → Environment Variables):

   ```
   ANTHROPIC_API_KEY=sk-ant-...        # required (default provider)
   STUDIO_ACCESS_CODE=choose-a-code    # strongly recommended — see Security
   ```

   Optional provider switching (the model-agnostic layer):

   ```
   STUDIO_AI_PROVIDER=anthropic | openai | gemini
   STUDIO_MODEL=...                    # override the default model name
   OPENAI_API_KEY=... / GEMINI_API_KEY=...
   ```

3. **Deploy.** `git add`, commit, push — Vercel builds as usual. Visit `/studio`.

### Exact PowerShell commands

From the folder where you unzipped this module (adjust the repo path):

```powershell
$repo = "C:\path\to\chicagohalalrestaurants"
Copy-Item -Recurse -Force .\app\studio        "$repo\app\studio"
Copy-Item -Recurse -Force .\app\api\studio    "$repo\app\api\studio"
Copy-Item -Recurse -Force .\lib\studio        "$repo\lib\studio"
Copy-Item -Recurse -Force .\components\studio "$repo\components\studio"
```

Then in the repo:

```powershell
Remove-Item -Recurse -Force .next   # clear cache (stop the dev server first)
npm run dev                          # test locally at http://localhost:3000/studio
```

PowerShell note (from past sessions): when copying, square brackets in other
paths are treated as wildcards — none of this module's paths contain brackets,
so plain `Copy-Item -Recurse` is fine here.

## Security & cost control

- **Set `STUDIO_ACCESS_CODE`.** Without it, anyone who finds `/studio` can run
  generations on your API bill. With it, API routes require the code; the UI
  asks the owner once and remembers it. Give each Premium member the code in
  their welcome message. (One shared code is fine for early access; per-member
  accounts are the roadmap upgrade.)
- The website analyzer blocks localhost/private-network addresses (basic SSRF
  protection) and times out after 12 seconds per page.
- `/studio` pages send `robots: noindex` so the tool doesn't appear in search.

## Known limitations (honest list — decide messaging accordingly)

- **Profiles and history live in the owner's browser** (localStorage). They
  don't sync across devices and are lost if the browser data is cleared. Fine
  for early access; before charging at scale, add auth + a database (e.g.
  Vercel Postgres/KV or Supabase) — the storage layer is isolated in
  `lib/studio/storage.js` to make that swap contained.
- **JS-rendered websites** (like the HFSAA/HMS sites you've dealt with) may
  yield thin extraction, since the analyzer reads raw HTML. The flow degrades
  gracefully: the owner reviews and fills gaps manually.
- **No image/video generation, no scheduling/auto-posting** — that's Phase 3
  by design. Owners copy content and post it themselves.
- **Islamic dates are approximate** (lunar calendar, moonsighting). They're
  flagged in the UI and in `lib/studio/occasions.js`; verify locally before
  publishing dated offers. The table covers 2026–2028 and should be extended
  and re-verified each year — please double-check these dates against a source
  you trust before launch; I recommend treating them as placeholders until
  confirmed.
- **Default model names** in `lib/studio/aiProvider.js` (`claude-sonnet-4-6`,
  `gpt-4o-mini`, `gemini-2.0-flash`) were reasonable when written, but
  providers rename models frequently — verify against current provider docs
  and set `STUDIO_MODEL` if needed.

## Suggested marketing copy (accuracy-checked)

- ✅ "Included with your Premium listing: an AI marketing studio that writes
  your Instagram, Facebook, Google, and WhatsApp posts in your restaurant's
  voice."
- ✅ "Set up in about a minute — paste your website and it learns your menu."
- ❌ Avoid: "posts for you automatically" (it doesn't auto-post), "knows the
  best time to post" (no analytics yet), "increases sales by X%" (no data).

## Roadmap hooks already in place

- Provider wrapper → swap/compare AI models with one env var
- `storage.js` isolation → clean upgrade path to accounts + database
- History schema → future analytics ("your most-generated campaigns")
- Access code → replace with real auth without touching page code

---

## Update: Real Accounts (email + password, server-side storage)

The Studio now has real accounts instead of browser-only storage. Profiles,
generated post history, and review-reply history all live in a Postgres
database tied to each owner's account — not `localStorage` — so it survives
across devices and browser data clears.

### What changed
- New pages: `/studio/signup`, `/studio/login` (no sidebar — pre-auth)
- Existing pages (`/studio`, `/studio/create`, `/studio/calendar`,
  `/studio/history`, `/studio/profile`, `/studio/reviews`) moved into an
  `app/studio/(main)/` route group with an auth guard — visiting any of them
  while logged out redirects to `/studio/login`. The URLs themselves are
  unchanged (route groups don't appear in the URL).
- `lib/studio/storage.js` no longer touches `localStorage` — every function
  is now `async` and calls a server API route instead.
- Review replies are now saved to history too (previously they weren't saved
  anywhere) — visible on a new "Review replies" tab on the History page.
- The old shared `STUDIO_ACCESS_CODE` gate is fully replaced by per-owner
  login. You can remove `STUDIO_ACCESS_CODE` from your env vars.

### New environment variables required

```
DATABASE_URL=postgres://...          # from Vercel Storage tab, see below
STUDIO_SESSION_SECRET=...            # any long random string, see below
```

Generate a session secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Setting up the database (Vercel Marketplace → Neon)

Vercel's standalone "Vercel Postgres" product was retired; databases are now
provisioned through the Marketplace (Neon, Supabase, etc. — all give you a
standard Postgres connection string):

1. Vercel dashboard → your project → **Storage** tab → **Connect Database**
2. Choose **Neon** (Postgres) from the Marketplace — free tier is fine to start
3. Vercel injects a connection-string env var into your project automatically
   — check **Settings → Environment Variables** for the exact name it used
   (commonly `DATABASE_URL`, sometimes `POSTGRES_URL`). If it's not literally
   `DATABASE_URL`, add a `DATABASE_URL` variable with the same value, since
   that's the name this code reads.
4. Add `STUDIO_SESSION_SECRET` (see above) alongside it
5. Redeploy

No manual schema setup needed — the first request that touches the database
automatically creates the `studio_users` table if it doesn't already exist.

### Verification performed before delivery

This was tested end-to-end against a real local Postgres database (not just
compiled) before being handed off: signup, duplicate-email rejection, login
with correct/incorrect passwords, profile save/load round-trip, post history
add/list, review-reply history add/list, logout, confirmation that protected
routes correctly return 401 after logout, and confirmation that saved data
is still present after logging back in. A real bug was caught and fixed
during this testing — Postgres's `jsonb_agg` returns `NULL` (not an empty
array) when a delete filters out every remaining item, which would have
caused a 500 error the first time an owner deleted their last saved post or
review; this is fixed with `COALESCE(..., '[]'::jsonb)` in both delete routes.

### Known limitations of this version
- No "forgot password" flow yet — if an owner forgets their password, you'd
  need to reset it directly in the database for them, or we can build a
  password-reset-via-email flow next.
- No email verification on signup — anyone can sign up with any email
  address without confirming they own it. Fine for a soft launch with owners
  you personally onboard; worth adding before wide-open self-serve signup.
- Sessions last 30 days, stored as a signed cookie (not a database-backed
  session table) — fine at this scale, standard practice for something this
  size.
- Still no billing/trial-expiration logic — accounts exist now, but there's
  nothing yet that starts a 7-day clock or cuts off access automatically.
  That's the natural next step once you're ready to formalize the free
  trial.

---

## Update: Trial & Billing (Stripe + PayPal)

New signups now go through a billing step before reaching the Studio: Free
(basic listing, no Studio access, no account needed) or Premium ($19/month,
30-day free trial via Stripe or PayPal). Only Premium goes through this
billing flow — Free doesn't require payment or an account at all. The `(main)` layout guard checks
billing status on every page load and redirects to `/studio/billing` if
there's no active trial or subscription.

**Important — this changes your own test account too.** Any account created
before this update (including the one you tested with) will now be sent to
`/studio/billing` the next time it loads a Studio page, since it has no
`subscription_status` yet. That's correct behavior, but expect it.

### What was verified before delivery, and what wasn't

Verified for real, against a live local server: signup → billing-gate
blocks access → a genuinely signed Stripe webhook (signed with Stripe's own
SDK, not a fake) arrives at the real webhook route → signature verifies →
database updates → gate opens → tampered signatures are still rejected.
The Postgres migration was also tested against existing account data to
confirm nothing breaks for accounts created before billing existed.

**Not verified, and can't be from here:** an actual completed checkout on
either Stripe's or PayPal's real hosted payment page — that requires real
merchant accounts, which only you can create. The PayPal webhook signature
verification path also couldn't be tested against PayPal's real
verification API for the same reason (Stripe's verification is a local
crypto check we could simulate exactly; PayPal's requires calling their
live API). Budget time for a real first-checkout test once your accounts
are set up — there's a reasonable chance something needs a small fix, the
same way Neon did.

### Environment variables to add

```
# Stripe
STRIPE_SECRET_KEY=sk_live_...            # or sk_test_... while testing
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_PREMIUM=price_...   # only one plan now — Free needs no Stripe price

# PayPal
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...
PAYPAL_ENV=live                          # or omit/"sandbox" while testing
PAYPAL_PLAN_PREMIUM=P-...        # only one plan now — Free needs no PayPal plan
PAYPAL_WEBHOOK_ID=...

# Both
NEXT_PUBLIC_SITE_URL=https://www.chicagohalalrestaurants.com
```

### Stripe setup (dashboard.stripe.com)

1. Create a Stripe account if you don't have one (free).
2. **Products → Add product** — create one: "Premium" ($19/month, recurring).
   Stripe generates a **Price ID** (`price_...`) — copy it into
   `STRIPE_PRICE_PREMIUM`.
3. **Developers → API keys** — copy the **Secret key** into
   `STRIPE_SECRET_KEY`. Start with the test-mode key (toggle in the
   dashboard) until you've done a real test checkout, then switch to live.
4. **Developers → Webhooks → Add endpoint**:
   - URL: `https://www.chicagohalalrestaurants.com/api/studio/billing/stripe-webhook`
   - Events to send: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.created`, `customer.subscription.deleted`, `invoice.payment_failed`
   - After creating it, Stripe shows a **Signing secret** (`whsec_...`) — copy into `STRIPE_WEBHOOK_SECRET`.

### PayPal setup (developer.paypal.com)

1. Create a PayPal Developer account if you don't have one (free) — this is
   different from a personal/regular PayPal account.
2. **Apps & Credentials → Create App** — this gives you a **Client ID** and
   **Secret**. Copy into `PAYPAL_CLIENT_ID` / `PAYPAL_CLIENT_SECRET`. Start
   in Sandbox mode (default) until you've tested a real checkout, then
   create a live app and switch `PAYPAL_ENV=live`.
3. Creating the subscription Plan requires PayPal's API directly (there
   isn't a simple dashboard button for plans with trial periods) — this is
   the one place you'll need to run an API call yourself, or ask me to walk
   you through it once you have your Client ID/Secret. The plan needs a
   `TRIAL` billing cycle (1 cycle, 30 days, $0) followed by a `REGULAR`
   cycle at $19/month. Save the resulting **Plan ID** (`P-...`) into
   `PAYPAL_PLAN_PREMIUM`.
4. **Apps & Credentials → your app → Webhooks → Add Webhook**:
   - URL: `https://www.chicagohalalrestaurants.com/api/studio/billing/paypal-webhook`
   - Events: `BILLING.SUBSCRIPTION.ACTIVATED`, `BILLING.SUBSCRIPTION.CANCELLED`, `BILLING.SUBSCRIPTION.SUSPENDED`, `PAYMENT.SALE.COMPLETED`, `PAYMENT.SALE.DENIED`
   - After creating it, PayPal shows a **Webhook ID** — copy into `PAYPAL_WEBHOOK_ID`.

### New database columns

`ensureSchema()` now also adds (via `ALTER TABLE ... ADD COLUMN IF NOT
EXISTS`, safe on existing data): `plan`, `payment_provider`,
`subscription_status`, `trial_ends_at`, `current_period_end`,
`stripe_customer_id`, `stripe_subscription_id`, `paypal_subscription_id`.
No manual migration needed — it runs automatically on the next request.

### How access is gated

`subscription_status` of `trialing` or `active` means full Studio access.
Anything else — `null` (never subscribed), `canceled`, or `past_due` —
sends the owner to `/studio/billing`. This check runs on every Studio page
load via `/api/studio/billing/status`, so a canceled or failed-payment
subscription locks out access automatically, not just at signup.

### Known limitations of this version

- No self-serve "change plan" or "cancel" button yet inside the Studio —
  for now, cancellations happen directly in Stripe's or PayPal's own
  customer portal, or you handle it manually. A self-serve billing
  management page is a reasonable next addition.
- No self-serve upgrade/downgrade flow between Free and Premium beyond signup —
  each provider supports this, just not wired up yet.
- PayPal plan creation isn't automated in this build (see step 3 above) —
  it's a one-time setup you'll do (or I'll walk you through) once, not a
  recurring task.

---

## Update: Account/Billing Page

Customers can now see their plan and manage billing from inside the
Studio — **Billing** in the sidebar (`/studio/account`). Shows current
plan, trial end date or next billing date, and a "Manage billing" button.

For Stripe customers, that button opens **Stripe's own hosted Customer
Portal** — update card, view invoices, cancel — none of which we built
ourselves. For PayPal customers, it links directly to PayPal's own
subscription management page, since that's how PayPal customers already
manage subscriptions from their PayPal account.

**One-time setup required before the Stripe button will work:** Stripe
Dashboard → Settings → Billing → **Customer portal** → Activate. Until
that's done, clicking "Manage billing" for a Stripe customer will show an
error rather than open the portal.
