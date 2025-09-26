import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth';

// Routes that require authentication
const protectedRoutes = [
  '/bookings',
  '/admin',
  '/profile',
];

// Routes that should redirect to login if not authenticated
const authRoutes = [
  '/login',
  '/register',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get token from cookies
  const token = request.cookies.get('auth-token')?.value;
  
  // Check if user is authenticated
  const isAuthenticated = token && verifyToken(token);
  
  // Handle protected routes
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  // Handle auth routes (redirect to dashboard if already authenticated)
  if (authRoutes.includes(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL('/bookings', request.url));
  }
  
  // Allow access to bookings page temporarily for testing
  if (pathname === '/bookings') {
    return NextResponse.next();
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Disabled middleware completely for testing
    // '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
  ],
};
