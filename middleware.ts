import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"

export async function middleware() {
  // Use getServerSession with the authOptions
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.redirect(new URL("/auth/signin", process.env.NEXTAUTH_URL))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/editor/:path*", "/compare", "/changes/:path*", "/audio-logs", "/scaling", "/settings"],
}
