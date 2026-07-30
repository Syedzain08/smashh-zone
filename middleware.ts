import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === '/api/verify' || pathname === '/api/verify/check') {
    return NextResponse.next();
  }


  const token = req.cookies.get('auth_access_token')?.value;

  if (!token) {
    return NextResponse.next();
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch {
  
    const res = NextResponse.next();
    res.cookies.delete('auth_access_token');
    return res;
  }
}

export const config = {
  matcher: ['/verify/:path*', '/api/verify/:path*'],
};