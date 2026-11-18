import { Env } from '../types';
import { SEED_MEDICINES } from '../../src/data/seedData';
import { Medicine } from '../../src/types/medicine';

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const q = url.searchParams.get('q')?.trim() || '';
  const category = url.searchParams.get('category')?.trim() || '';
  const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(url.searchParams.get('limit') || '12', 10) || 12));
  const offset = (page - 1) * limit;

  // 1. If Cloudflare D1 database binding exists
  if (context.env.DB) {
    try {
      let whereClause = ' WHERE 1=1';
      const params: any[] = [];

      if (category && category !== 'All') {
        whereClause += ' AND therapeutic_category = ?';
        params.push(category);
      }

      if (q) {
        whereClause += ' AND (name LIKE ? OR brand_name LIKE ? OR composition_summary LIKE ? OR indications LIKE ?)';
        const wild = `%${q}%`;
        params.push(wild, wild, wild, wild);
      }

      // Count query to get total matching records
      const countStmt = context.env.DB.prepare(`SELECT COUNT(*) as total FROM medicines${whereClause}`);
      const countResult = await countStmt.bind(...params).first<{ total: number }>();
      const total = countResult?.total || 0;

      // Data query with LIMIT and OFFSET
      const dataQuery = `SELECT * FROM medicines${whereClause} ORDER BY is_jan_aushadhi DESC, price_per_unit ASC LIMIT ? OFFSET ?`;
      const dataStmt = context.env.DB.prepare(dataQuery);
      const { results } = await dataStmt.bind(...params, limit, offset).all<Medicine>();

      return new Response(
        JSON.stringify({
          data: results,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
          },
          source: 'cloudflare-d1',
        }),
        {
          headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=60' },
        }
      );
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

  const total = results.length;
  const paginatedResults = results.slice(offset, offset + limit);

  return new Response(
    JSON.stringify({
      data: paginatedResults,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      source: 'embedded-fallback',
    }),
    {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=60' },
    }
  );
};
