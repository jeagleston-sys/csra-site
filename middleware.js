/* ============================================================
   CSRA PRECISION IMAGING — client project lock (Vercel Routing Middleware)

   Every request under /view/<project>/ (job.json AND every map tile)
   must carry a valid unlock cookie for that project, or it gets a 401.
   The viewer shell (/view/, /view/index.html) and /view/lib/ stay public;
   they contain no client data.

   Settings (Vercel → Project → Settings → Environment Variables,
   set for Production AND Preview):

     PORTAL_SECRET  any long random string. Signs the unlock cookies.
                    Changing it signs everyone out of every project.
     PORTAL_CODES   JSON map of project folder → access code, e.g.
                    {"walton-way-rsbay":"WALT-7QK4-M9XR"}
                    Changing a project's code signs everyone out of that project.

   Env var changes take effect on the next deploy.
   ============================================================ */

export const config = { matcher: ['/view/:path*'] };

const SLUG = /^[a-z0-9][a-z0-9-]{2,80}$/;
const MAX_AGE = 60 * 60 * 24 * 90; // remember a project for 90 days
const enc = new TextEncoder();

// Continue to the static file (same as next() from @vercel/functions)
const pass = () => new Response(null, { headers: { 'x-middleware-next': '1' } });

const json = (status, body, extraHeaders) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store', ...(extraHeaders || {}) }
  });

const locked = () => json(401, { error: 'locked' });

// Codes are compared without dashes, spaces or case: "walt 7qk4 m9xr" == "WALT-7QK4-M9XR"
const normalize = (c) => String(c || '').toUpperCase().replace(/[^A-Z0-9]/g, '');

function readCodes() {
  try { return JSON.parse(process.env.PORTAL_CODES || '{}'); } catch { return null; }
}

async function sign(slug, code) {
  const key = await crypto.subtle.importKey(
    'raw', enc.encode(process.env.PORTAL_SECRET), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const mac = await crypto.subtle.sign('HMAC', key, enc.encode(slug + '\n' + normalize(code)));
  return btoa(String.fromCharCode(...new Uint8Array(mac))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

function getCookie(req, name) {
  const all = req.headers.get('cookie') || '';
  for (const part of all.split(/;\s*/)) {
    const i = part.indexOf('=');
    if (i > 0 && part.slice(0, i) === name) return part.slice(i + 1);
  }
  return null;
}

const cookieName = (slug) => 'csra_v_' + slug;

export default async function middleware(req) {
  const url = new URL(req.url);
  const path = url.pathname;

  // Public: the viewer shell and its library files
  const plain = !/%|\.\./.test(path); // no encoded characters or dot-segments
  if (path === '/view' || path === '/view/' || path === '/view/index.html' || (plain && path.startsWith('/view/lib/'))) {
    return pass();
  }

  const codes = readCodes();
  if (!process.env.PORTAL_SECRET || !codes) {
    return json(503, { error: 'portal-not-configured' }); // fail closed
  }

  // Unlock: POST /view/_auth  {"job":"<project>","code":"<access code>"}  (job optional)
  if (path === '/view/_auth') {
    if (req.method !== 'POST') return json(405, { error: 'method' });
    let body;
    try { body = await req.json(); } catch { return json(400, { error: 'bad-request' }); }
    const given = normalize(body.code);
    let slug = String(body.job || '').toLowerCase();
    let expected = null;
    if (slug) {
      // Link includes the project: the code must match that project
      expected = SLUG.test(slug) && Object.prototype.hasOwnProperty.call(codes, slug) ? normalize(codes[slug]) : null;
    } else {
      // Code only (from the "Project Maps" page): find the project it belongs to.
      // Check every entry so timing doesn't reveal anything.
      for (const k of Object.keys(codes)) {
        if (SLUG.test(k) && safeEqual(given, normalize(codes[k])) && !expected) { slug = k; expected = normalize(codes[k]); }
      }
    }
    // Unknown project and wrong code look identical from outside
    if (!expected || !given || given.length < 8 || !safeEqual(given, expected)) return json(401, { error: 'bad-code' });
    const token = await sign(slug, expected);
    return json(200, { ok: true, job: slug }, {
      'set-cookie': `${cookieName(slug)}=${token}; Path=/view/; Max-Age=${MAX_AGE}; HttpOnly; Secure; SameSite=Lax`
    });
  }

  // Sign out of one project: POST /view/_logout {"job":"<project>"}
  if (path === '/view/_logout') {
    if (req.method !== 'POST') return json(405, { error: 'method' });
    let body = {};
    try { body = await req.json(); } catch {}
    const slug = String(body.job || '').toLowerCase();
    if (!SLUG.test(slug)) return json(400, { error: 'bad-request' });
    return json(200, { ok: true }, {
      'set-cookie': `${cookieName(slug)}=; Path=/view/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`
    });
  }

  // Everything in a project folder is locked
  const m = path.match(/^\/view\/([^/]+)\//);
  if (!m) return locked();
  const slug = m[1].toLowerCase();
  if (!SLUG.test(slug) || !Object.prototype.hasOwnProperty.call(codes, slug)) return locked();

  const cookie = getCookie(req, cookieName(slug));
  if (!cookie) return locked();
  const expectedToken = await sign(slug, codes[slug]);
  if (!safeEqual(cookie, expectedToken)) return locked();

  return pass();
}
