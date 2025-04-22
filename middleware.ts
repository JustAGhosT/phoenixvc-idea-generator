import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get auth cookie
  const authCookie =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value

  // If there's no auth cookie, redirect to sign in
  if (!authCookie) {
    const signInUrl = new URL("/auth/signin", request.url)
    signInUrl.searchParams.set("callbackUrl", request.nextUrl.pathname)
    return NextResponse.redirect(signInUrl)
  }

  // Continue with the request if authenticated
  return NextResponse.next()
}

export const config = {
  matcher: ["/editor/:path*", "/compare", "/changes/:path*", "/audio-logs", "/scaling", "/settings"],
}
