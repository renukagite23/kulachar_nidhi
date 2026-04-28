import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define paths that are public
  const isPublicPath = path === '/login' || path === '/register' || path === '/';

  // Get token from cookies or localStorage (Note: Middleware only has access to cookies, not localStorage)
  // For simplicity since I'm using Redux + LocalStorage for client-side, 
  // I'll handle true protection in the components/API routes.
  // BUT, I can check for a cookie if I set it during login.
  const token = request.cookies.get('token')?.value || '';

  if (path.startsWith('/admin/') && !token) {
    return NextResponse.redirect(new URL('/admin', request.nextUrl));
  }

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
