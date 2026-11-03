import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { SEED_MEDICINES } from './src/data/seedData';
import { calculateBasketSummary, findAlternatives, searchMedicines } from './src/utils/matcher';
import { BasketItem } from './src/types/medicine';

// Dev middleware plugin to mock Cloudflare Pages Functions locally during `npm run dev`
function devApiMockPlugin(): Plugin {
  return {
    name: 'dev-api-mock',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) {
          return next();
        }

        const url = new URL(req.url, 'http://localhost');
        res.setHeader('Content-Type', 'application/json');

        if (url.pathname === '/api/search') {
          const q = url.searchParams.get('q') || '';
          const category = url.searchParams.get('category') || '';
          const results = searchMedicines(q, category, SEED_MEDICINES);
          res.end(JSON.stringify({ data: results, source: 'vite-dev-mock' }));
          return;
        }

        if (url.pathname === '/api/alternatives') {
          const idStr = url.searchParams.get('id');
          const id = idStr ? parseInt(idStr, 10) : NaN;
          const target = SEED_MEDICINES.find((m) => m.id === id);
          if (!target) {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Medicine not found' }));
            return;
          }
          const comp = findAlternatives(target, SEED_MEDICINES);
          res.end(JSON.stringify({ data: comp, source: 'vite-dev-mock' }));
          return;
        }

        if (url.pathname === '/api/categories') {
          const map: Record<string, number> = {};
          for (const m of SEED_MEDICINES) {
            map[m.therapeutic_category] = (map[m.therapeutic_category] || 0) + 1;
          }
          const results = Object.entries(map).map(([therapeutic_category, count]) => ({
            therapeutic_category,
            count,
          }));
          res.end(JSON.stringify({ data: results, source: 'vite-dev-mock' }));
          return;
        }

        if (url.pathname === '/api/basket' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => (body += chunk));
          req.on('end', () => {
            try {
              const payload = JSON.parse(body || '{}');
              const items: BasketItem[] = (payload.items || [])
                .map((it: any) => {
                  const med = SEED_MEDICINES.find((m) => m.id === it.medicine_id);
                  return med ? { medicine: med, strips_per_month: it.strips_per_month || 1 } : null;
                })
                .filter(Boolean);

              const summary = calculateBasketSummary(items as BasketItem[], SEED_MEDICINES);
              res.end(JSON.stringify({ data: summary }));
            } catch (e: any) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: e.message }));
            }
          });
          return;
        }

        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), devApiMockPlugin()],
});
