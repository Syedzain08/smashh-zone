import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const NOINDEX = 'noindex, nofollow, noarchive';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // The notice page itself must stay reachable (avoids a redirect loop).
  if (pathname === '/cancel') {
    const res = NextResponse.next();
    res.headers.set('X-Robots-Tag', NOINDEX);
    return res;
  }

  // API routes: refuse with 410 Gone instead of redirecting to an HTML page.
  if (pathname.startsWith('/api')) {
    return NextResponse.json(
      { error: 'This event has been cancelled.' },
      { status: 410, headers: { 'X-Robots-Tag': NOINDEX } }
    );
  }

  // Everything else (home, tickets, checkout, verify, deep links) goes to /cancel.
  const url = req.nextUrl.clone();
  url.pathname = '/cancel';
  url.search = '';
  const res = NextResponse.redirect(url, 307);
  res.headers.set('X-Robots-Tag', NOINDEX);
  return res;
}

export const config = {
  // Skip Next internals and static files so the /cancel page can load its CSS and assets.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|woff2?|ttf)$).*)'],
};