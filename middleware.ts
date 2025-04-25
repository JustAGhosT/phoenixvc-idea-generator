import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// Check if the request is for an API route
function isApiRoute(pathname: string) {
  return pathname.startsWith('/api/') && !pathname.startsWith('/api/auth')
}

// Routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/projects',
  '/settings',
  '/risk-analysis',
  '/editor',
  '/notifications',
  '/analysis-history'
]
  
// Admin-only routes
const adminRoutes = [
  '/admin'
]
  
// Paths that are always public
const publicPaths = [
  '/',
  '/auth/signin',
  '/auth/signout',
  '/auth/error',
  '/api/auth',
  '/legal',
  '/about',
  '/contact',
  '/pricing',
  '/faq'
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for static assets and authentication routes
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

  // Check if the current path is public
  const isPublicPath = publicPaths.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  )

  if (isPublicPath) {
    return NextResponse.next()
  }
  
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

  // Get the token using next-auth
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })
  
  // Debug authentication state
  console.log("Authentication check:", {
    path: pathname,
    isAuthenticated: !!token,
    tokenExists: !!token
  })
  
  // If no token and trying to access protected route, redirect to sign-in
  if (!token && isProtectedRoute) {
    // Check if we're already coming from the sign-in page to prevent loops
    const referer = request.headers.get('referer') || ''
    if (referer.includes('/auth/signin')) {
      // If coming from sign-in, just allow the request to prevent loops
      console.log("Detected potential redirect loop, allowing request")
      return NextResponse.next()
    }
    
    const url = new URL('/auth/signin', request.url)
    url.searchParams.set('callbackUrl', request.url)
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