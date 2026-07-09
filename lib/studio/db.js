// Server-side Postgres connection for RestaurantAI Studio accounts.
// Works with any standard Postgres connection string — Neon (via Vercel
// Marketplace), Supabase, or plain Postgres. No provider-specific SDK
// required, which keeps this portable if you ever switch providers.
//
// Required env var: DATABASE_URL — a standard postgres:// connection string.
// After connecting a database in Vercel's Storage tab, check the exact env
// var name it injects (commonly DATABASE_URL, sometimes POSTGRES_URL) and
// set DATABASE_URL to that same value if the name differs.

import { Pool } from "pg";

let pool;

export function getPool() {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error(
        "DATABASE_URL is not set. Add it in Vercel → Settings → Environment Variables after connecting a Postgres database in the Storage tab."
      );
    }
    pool = new Pool({
      connectionString,
      // Most managed Postgres providers (Neon, Supabase) require SSL.
      // rejectUnauthorized:false is standard for these providers' certs.
      ssl: connectionString.includes("localhost") ? false : { rejectUnauthorized: false },
      max: 5,
    });
  }
  return pool;
}

export async function query(text, params) {
  const client = getPool();
  return client.query(text, params);
}

/**
 * Creates the studio_users table if it doesn't exist, and adds any billing
 * columns that earlier versions of this schema didn't have yet. Safe to
 * call on every cold start.
 */
export async function ensureSchema() {
  await query(`
    CREATE TABLE IF NOT EXISTS studio_users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      restaurant_name TEXT,
      profile JSONB NOT NULL DEFAULT '{}'::jsonb,
      history JSONB NOT NULL DEFAULT '[]'::jsonb,
      reviews_history JSONB NOT NULL DEFAULT '[]'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);

  // Billing columns, added via ALTER so existing accounts (created before
  // billing existed) upgrade automatically without losing data.
  await query(`
    ALTER TABLE studio_users
      ADD COLUMN IF NOT EXISTS plan TEXT,
      ADD COLUMN IF NOT EXISTS payment_provider TEXT,
      ADD COLUMN IF NOT EXISTS subscription_status TEXT,
      ADD COLUMN IF NOT EXISTS trial_ends_at TIMESTAMPTZ,
      ADD COLUMN IF NOT EXISTS current_period_end TIMESTAMPTZ,
      ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
      ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT,
      ADD COLUMN IF NOT EXISTS paypal_subscription_id TEXT;
  `);
}
