import { Env } from '../types';
import { SEED_MEDICINES } from '../../src/data/seedData';
import { Medicine } from '../../src/types/medicine';
import { findAlternatives } from '../../src/utils/matcher';

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const idStr = url.searchParams.get('id');

  if (!idStr) {
    return new Response(JSON.stringify({ error: 'Missing medicine id parameter' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const id = parseInt(idStr, 10);

  // 1. If Cloudflare D1 database binding exists
  if (context.env.DB) {
    try {
      const target = await context.env.DB
        .prepare('SELECT * FROM medicines WHERE id = ?')
        .bind(id)
        .first<Medicine>();

      if (target) {
        const { results: rawAlternatives } = await context.env.DB
          .prepare('SELECT * FROM medicines WHERE normalized_salt_key = ?')
          .bind(target.normalized_salt_key)
          .all<Medicine>();

        const comparison = findAlternatives(target, rawAlternatives);
        return new Response(JSON.stringify({ data: comparison, source: 'cloudflare-d1' }), {
          headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=60' },
        });
      }
    } catch (err: any) {
      console.error('D1 alternatives query error:', err);
    }
  }

  // 2. Fallback to embedded dataset
  const target = SEED_MEDICINES.find((m) => m.id === id);
  if (!target) {
    return new Response(JSON.stringify({ error: 'Medicine not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const comparison = findAlternatives(target, SEED_MEDICINES);
  return new Response(JSON.stringify({ data: comparison, source: 'embedded-fallback' }), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=60' },
  });
};
