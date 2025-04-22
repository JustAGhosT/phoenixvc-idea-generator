import { NextResponse } from "next/server"
import { apiMonitorMiddleware } from "./middleware/api-monitor"
import { createLogger } from "@/lib/logger"

const logger = createLogger("middleware")

// Check if the request is for an API route
function isApiRoute(pathname: string): boolean {
  return pathname.startsWith("/api/")
}

export async function middleware(request) {
  const { pathname } = new URL(request.url)

  // Apply API monitoring middleware for API routes
  if (isApiRoute(pathname)) {
    return apiMonitorMiddleware(request, async () => {
      // Continue with the request
      return NextResponse.next()
    })
  }

  // For non-API routes that require authentication
  const protectedRoutes = ["/editor/", "/compare", "/changes/", "/audio-logs", "/scaling", "/settings"]

  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  if (isProtectedRoute) {
    // Check for authentication cookie
    const authCookie = request.cookies.get("next-auth.session-token")

    if (!authCookie) {
      logger.warn(`Unauthorized access attempt to ${pathname}`, {
        ip: request.headers.get("x-forwarded-for") || request.ip || "unknown",
        userAgent: request.headers.get("user-agent") || "unknown",
      })
      return NextResponse.redirect(new URL("/auth/signin", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/api/:path*", "/editor/:path*", "/compare", "/changes/:path*", "/audio-logs", "/scaling", "/settings"],
}
