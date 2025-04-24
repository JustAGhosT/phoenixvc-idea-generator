import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
// Check if the request is for an API route
function isApiRoute(pathname: string) {
  return pathname.startsWith('/api/')
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for public routes and API routes (which have their own auth)
  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api/auth') ||
    pathname === '/auth/signin' ||
    pathname === '/auth/signout' ||
    pathname === '/auth/error'
  ) {
    return NextResponse.next()
  }

  // For API routes, let the API handlers handle authentication
  if (isApiRoute(pathname)) {
    return NextResponse.next()
  }

  // Protected routes that require authentication
  const protectedRoutes = [
    '/risk-analysis',
    '/editor',
    '/notifications',
    '/analysis-history'
  ]
  
  // Admin-only routes
  const adminRoutes = [
    '/admin'
  ]
  
  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  )
  
  // Check if the current route is admin-only
  const isAdminRoute = adminRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  )
  
  // If not a protected or admin route, allow access
  if (!isProtectedRoute && !isAdminRoute) {
    return NextResponse.next()
  }

  // Get the token
  const token = await getToken({ req: request })
  
  // If no token and trying to access protected route, redirect to sign-in
  if (!token && isProtectedRoute) {
    const url = new URL('/auth/signin', request.url)
    url.searchParams.set('callbackUrl', encodeURI(request.url))
    return NextResponse.redirect(url)
  }
  
  // If trying to access admin route but not an admin, redirect to homepage
  if (isAdminRoute && (!token || !(token.roles as string[])?.includes('admin'))) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  
  // Allow access to protected routes for authenticated users
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}