import { Env } from '../types';
import { SEED_MEDICINES } from '../../src/data/seedData';

export const onRequestGet: PagesFunction<Env> = async (context) => {
  if (context.env.DB) {
    try {
      const { results } = await context.env.DB
        .prepare('SELECT therapeutic_category, count(*) as count FROM medicines GROUP BY therapeutic_category ORDER BY count DESC')
        .all<{ therapeutic_category: string; count: number }>();

      return new Response(JSON.stringify({ data: results, source: 'cloudflare-d1' }), {
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300' },
      });
    } catch (err) {
      console.error('D1 categories error:', err);
    }
  }

  // Fallback
  const map: Record<string, number> = {};
  for (const m of SEED_MEDICINES) {
    map[m.therapeutic_category] = (map[m.therapeutic_category] || 0) + 1;
  }
  const results = Object.entries(map).map(([therapeutic_category, count]) => ({
    therapeutic_category,
    count,
  }));

  return new Response(JSON.stringify({ data: results, source: 'embedded-fallback' }), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300' },
  });
};
