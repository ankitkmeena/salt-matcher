import { Env } from '../types';
import { SEED_MEDICINES } from '../../src/data/seedData';
import { Medicine } from '../../src/types/medicine';

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const q = url.searchParams.get('q')?.trim() || '';
  const category = url.searchParams.get('category')?.trim() || '';

  // 1. If Cloudflare D1 database binding exists
  if (context.env.DB) {
    try {
      let query = 'SELECT * FROM medicines WHERE 1=1';
      const params: any[] = [];

      if (category && category !== 'All') {
        query += ' AND therapeutic_category = ?';
        params.push(category);
      }

      if (q) {
        query += ' AND (name LIKE ? OR brand_name LIKE ? OR composition_summary LIKE ? OR indications LIKE ?)';
        const wild = `%${q}%`;
        params.push(wild, wild, wild, wild);
      }

      query += ' ORDER BY is_jan_aushadhi DESC, price_per_unit ASC LIMIT 50';

      const stmt = context.env.DB.prepare(query);
      const { results } = await stmt.bind(...params).all<Medicine>();

      return new Response(JSON.stringify({ data: results, source: 'cloudflare-d1' }), {
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=60' },
      });
    } catch (err: any) {
      console.error('D1 query error:', err);
    }
  }

  // 2. Fallback to embedded seed dataset (for local preview without local D1 runner)
  let results = [...SEED_MEDICINES];
  if (category && category !== 'All') {
    results = results.filter((m) => m.therapeutic_category === category);
  }
  if (q) {
    const lower = q.toLowerCase();
    results = results.filter(
      (m) =>
        m.name.toLowerCase().includes(lower) ||
        m.brand_name.toLowerCase().includes(lower) ||
        m.composition_summary.toLowerCase().includes(lower) ||
        (m.indications && m.indications.toLowerCase().includes(lower))
    );
  }

  return new Response(JSON.stringify({ data: results, source: 'embedded-fallback' }), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=60' },
  });
};
