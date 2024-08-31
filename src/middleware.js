import { NextResponse } from 'next/server';

export function middleware(req) {

  const cookies = req.cookies;

  const token = cookies.get('token')?.value;

  if (!token) {    
    const loginUrl = new URL('/login', req.nextUrl.origin);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};