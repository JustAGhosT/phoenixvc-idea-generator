import { getServerAuthSession } from "@/lib/auth"
import { type NextRequest, NextResponse } from "next/server"

// Middleware to check authentication
export async function withAuth(handler: (req: NextRequest, user: any) => Promise<NextResponse>, req: NextRequest) {
  const session = await getServerAuthSession()

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  return handler(req, session.user)
}

// Middleware to handle errors
export async function withErrorHandling(
  handler: (req: NextRequest) => Promise<NextResponse>,
  req: NextRequest,
  errorMessage = "An error occurred",
) {
  try {
    return await handler(req)
  } catch (error) {
    console.error(`API Error: ${errorMessage}`, error)
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

// Combined middleware
export async function withProtectedApi(
  handler: (req: NextRequest, user: any) => Promise<NextResponse>,
  req: NextRequest,
  errorMessage = "An error occurred",
) {
  return withErrorHandling(async (req) => withAuth(handler, req), req, errorMessage)
}