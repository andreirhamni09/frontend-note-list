import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const userCookie = request.cookies.get('users');
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname.startsWith('/auth');
  const isDashboardPage = pathname.startsWith('/dashboard');
  const isNoteListPage = pathname.startsWith('/note_list');
  const isIndexPage = pathname === '/';


  // ✅ 1. Sudah login, tapi buka /auth -> redirect ke dashboard
  if (userCookie && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // ✅ 2. Belum login, tapi buka /dashboard atau / -> redirect ke login
  if (!userCookie && (isDashboardPage || isIndexPage || isNoteListPage)) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // ✅ 3. Jika semua aman, lanjutkan
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/auth/:path*',
    '/dashboard/:path*', 
    '/note_list/:path*',
  ],
};
