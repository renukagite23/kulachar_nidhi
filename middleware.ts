import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Get tokens from cookies
  const token = request.cookies.get('token')?.value || '';
  const adminToken = request.cookies.get('admin_token')?.value || '';

  // Protect admin sub-routes — redirect to login page (/admin) if no admin token
  if (path.startsWith('/admin/') && !adminToken) {
    return NextResponse.redirect(new URL('/admin', request.nextUrl));
  }

  // Protect user-only routes
  if ((path === '/profile' || path === '/donations') && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/profile',
    '/donations',
  ],
};
