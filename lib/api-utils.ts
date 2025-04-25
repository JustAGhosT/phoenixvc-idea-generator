import { getServerAuthSession } from "@/lib/auth"
import { NextResponse } from "next/server"
import { AppError, AuthError, createErrorResponse } from "./error-handler"
import { createLogger } from "./logger"

const logger = createLogger("api-utils")

// Standard error handler for API routes
export async function handleApiError(error: unknown, message = "An error occurred") {
  return createErrorResponse(error, message)
}

// Authentication middleware for API routes
export async function requireAuth() {
  try {
    const session = await getServerAuthSession()
    if (!session || !session.user) {
      throw new AuthError()
    }
    return session.user
  } catch (error) {
    logger.error("Authentication failed", error as Error)
    throw new AuthError()
  }
}

// Standard response formatter
export function apiResponse(data: any, status = 200) {
  return NextResponse.json(data, { status })
}

// API route wrapper with error handling and authentication
export function createProtectedApiRoute(
  handler: (req: Request, user: any) => Promise<NextResponse>,
  errorMessage = "An error occurred",
) {
  return async (req: Request): Promise<NextResponse> => {
    try {
      const user = await requireAuth()
      return await handler(req, user)
    } catch (error) {
      if (error instanceof AppError) {
        return createErrorResponse(error)
      }
      return handleApiError(error, errorMessage)
    }
  }
}

// API route wrapper with just error handling (no auth)
export function createApiRoute(handler: (req: Request) => Promise<NextResponse>, errorMessage = "An error occurred") {
  return async (req: Request): Promise<NextResponse> => {
    try {
      return await handler(req)
    } catch (error) {
      return handleApiError(error, errorMessage)
    }
  }
}
