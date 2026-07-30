import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const correctPassword = process.env.VERIFY_PASSWORD;
    const jwtSecret = process.env.JWT_SECRET;

    if (!correctPassword || !jwtSecret) {
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }

    if (password !== correctPassword) {
      return NextResponse.json({ error: 'Invalid access code' }, { status: 401 });
    }

    const secret = new TextEncoder().encode(jwtSecret);
    const token = await new SignJWT({ authenticated: true })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secret);

    const response = NextResponse.json({ success: true, message: 'Access granted' });

    response.cookies.set({
      name: 'auth_access_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, 
    });

    return response;
  } catch (err) {
    console.error('Verify error:', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}