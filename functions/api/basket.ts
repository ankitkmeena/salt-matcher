import { Env } from '../types';
import { SEED_MEDICINES } from '../../src/data/seedData';
import { BasketItem, Medicine } from '../../src/types/medicine';
import { calculateBasketSummary } from '../../src/utils/matcher';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const payload = await context.request.json() as {
      items: { medicine_id: number; strips_per_month: number }[];
    };

    if (!payload || !Array.isArray(payload.items)) {
      return new Response(JSON.stringify({ error: 'Invalid basket payload' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let allMeds: Medicine[] = SEED_MEDICINES;

    if (context.env.DB) {
      try {
        const { results } = await context.env.DB
          .prepare('SELECT * FROM medicines')
          .all<Medicine>();
        if (results && results.length > 0) {
          allMeds = results;
        }
      } catch (err) {
        console.error('D1 basket query error:', err);
      }
    }

    const medMap = new Map(allMeds.map((m) => [m.id, m]));
    const basketItems: BasketItem[] = [];

    for (const item of payload.items) {
      const med = medMap.get(item.medicine_id);
      if (med) {
        basketItems.push({
          medicine: med,
          strips_per_month: Math.max(1, item.strips_per_month || 1),
        });
      }
    }

    const summary = calculateBasketSummary(basketItems, allMeds);

    return new Response(JSON.stringify({ data: summary }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Error processing basket' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
