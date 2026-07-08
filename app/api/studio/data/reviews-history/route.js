// GET    /api/studio/data/reviews-history — list the logged-in user's saved review replies
// POST   /api/studio/data/reviews-history  { item } — append a new one
// DELETE /api/studio/data/reviews-history?id=xxx — remove one, or ?all=1 to clear all

import { query } from "../../../../../lib/studio/db";
import { getSessionFromRequest } from "../../../../../lib/studio/session";

function unauthorized() {
  return Response.json({ ok: false, error: "Please log in again." }, { status: 401 });
}

const MAX_ITEMS = 100;

export async function GET(request) {
  const session = getSessionFromRequest(request);
  if (!session) return unauthorized();

  try {
    const result = await query("SELECT reviews_history FROM studio_users WHERE id = $1", [session.id]);
    return Response.json({ ok: true, reviews_history: result.rows[0]?.reviews_history || [] });
  } catch (err) {
    console.error("Get reviews history error:", err);
    return Response.json({ ok: false, error: "Couldn't load your reviews_history." }, { status: 500 });
  }
}

export async function POST(request) {
  const session = getSessionFromRequest(request);
  if (!session) return unauthorized();

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const item = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    ...body?.item,
  };

  try {
    // Prepend the new item, then trim to MAX_ITEMS — done in SQL so it's
    // atomic even if the owner is generating from two tabs at once.
    const result = await query(
      `UPDATE studio_users
       SET reviews_history = (jsonb_build_array($1::jsonb) || reviews_history)
       WHERE id = $2
       RETURNING reviews_history`,
      [JSON.stringify(item), session.id]
    );
    let reviews_history = result.rows[0].reviews_history;
    if (reviews_history.length > MAX_ITEMS) {
      reviews_history = reviews_history.slice(0, MAX_ITEMS);
      await query("UPDATE studio_users SET reviews_history = $1 WHERE id = $2", [
        JSON.stringify(reviews_history),
        session.id,
      ]);
    }
    return Response.json({ ok: true, item });
  } catch (err) {
    console.error("Add review history error:", err);
    return Response.json({ ok: false, error: "Couldn't save that." }, { status: 500 });
  }
}

export async function DELETE(request) {
  const session = getSessionFromRequest(request);
  if (!session) return unauthorized();

  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const all = url.searchParams.get("all");

  try {
    if (all) {
      await query("UPDATE studio_users SET reviews_history = '[]'::jsonb WHERE id = $1", [session.id]);
      return Response.json({ ok: true });
    }
    if (!id) {
      return Response.json({ ok: false, error: "Missing id." }, { status: 400 });
    }
    await query(
      `UPDATE studio_users
       SET reviews_history = COALESCE(
         (SELECT jsonb_agg(elem) FROM jsonb_array_elements(reviews_history) elem WHERE elem->>'id' != $1),
         '[]'::jsonb
       )
       WHERE id = $2`,
      [id, session.id]
    );
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Delete review history error:", err);
    return Response.json({ ok: false, error: "Couldn't delete that." }, { status: 500 });
  }
}
