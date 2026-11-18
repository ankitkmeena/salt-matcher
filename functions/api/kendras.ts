/**
 * Cloudflare Pages Function: /api/kendras
 * Live proxy & search across all 21,600+ Official Jan Aushadhi Kendras across India.
 *
 * Query Parameters:
 * - pincode: 6-digit postal code (e.g., ?pincode=110029)
 * - q: text search (state, city, landmark, kendra code)
 * - state: state name
 * - district: district name
 */

interface Env {
  DB?: any;
}

export const onRequestGet = async (context: { request: Request; env: Env }) => {
  const url = new URL(context.request.url);
  const pincode = url.searchParams.get('pincode')?.trim();
  const q = url.searchParams.get('q')?.trim();
  const state = url.searchParams.get('state')?.trim();
  const district = url.searchParams.get('district')?.trim();

  // Upstream Live PMBI Kendra Mirror API (21,663 stores)
  const targetUrl = new URL('https://jan-api.kunalka.me/kendras');
  if (pincode) targetUrl.searchParams.set('pincode', pincode);
  if (q) targetUrl.searchParams.set('q', q);
  if (state && state !== 'All') targetUrl.searchParams.set('state', state);
  if (district) targetUrl.searchParams.set('district', district);

  try {
    const upstreamResp = await fetch(targetUrl.toString(), {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'SaltMatch-Edge/1.0 (https://salt-matcher.pages.dev)'
      },
      cf: {
        // Cache API responses at Cloudflare Edge for 2 hours for instant speed
        cacheTtl: 7200,
        cacheEverything: true
      }
    } as any);

    if (upstreamResp.ok) {
      const data = await upstreamResp.json();
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=3600, s-maxage=7200'
        }
      });
    }

    return new Response(
      JSON.stringify({ error: 'Upstream store service unavailable', count: 0, stores: [] }),
      { status: 502, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message, count: 0, stores: [] }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
