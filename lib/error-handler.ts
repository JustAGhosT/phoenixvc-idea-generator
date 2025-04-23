import { NextResponse } from "next/server"
import { createLogger } from "./logger"
import { captureException, setUser } from "./sentry"

const logger = createLogger("error-handler")

/**
 * Base application error class that extends the native Error
 * Provides additional context for error handling
 */
export class AppError extends Error {
  statusCode: number
  isOperational: boolean
  context?: Record<string, any>

  constructor(message: string, statusCode: number, isOperational = true, context?: Record<string, any>) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational
    this.context = context

    Error.captureStackTrace(this, this.constructor)
  }
}

/**
 * Creates a standardized error response for API routes
 */
export function createErrorResponse(error: unknown, defaultMessage = "An unexpected error occurred"): NextResponse {
  // Handle known AppError instances
  if (error instanceof AppError) {
    logger.error(`${error.message}`, error, { statusCode: error.statusCode, ...error.context })
    captureException(error, { statusCode: error.statusCode, ...error.context })

    return NextResponse.json(
      {
        error: error.message,
        code: error.statusCode,
        ...(process.env.NODE_ENV !== "production" && error.context ? { context: error.context } : {}),
      },
      { status: error.statusCode },
    )
  }

  // Handle standard Error instances
  if (error instanceof Error) {
    logger.error(`Unhandled error: ${error.message}`, error)
    captureException(error)

    return NextResponse.json(
      {
        error: process.env.NODE_ENV === "production" ? defaultMessage : error.message,
        code: 500,
      },
      { status: 500 },
    )
  }

  // Handle unknown errors
  logger.error(`Unknown error type: ${String(error)}`)

  return NextResponse.json({ error: defaultMessage, code: 500 }, { status: 500 })
}

/**
 * Wrapper for API route handlers to catch and handle errors
 */
export function withErrorHandling<T>(
  handler: (...args: any[]) => Promise<T>,
  errorMessage = "An error occurred processing your request",
) {
  return async (...args: any[]): Promise<T | NextResponse> => {
    try {
      return await handler(...args)
    } catch (error) {
      return createErrorResponse(error, errorMessage)
    }
  }
}

// Specific error types

/**
 * Authentication error
 */
export class AuthError extends AppError {
  constructor(message = "Authentication required", context?: Record<string, any>) {
    super(message, 401, true, context)
  }
}

/**
 * Authorization error
 */
export class ForbiddenError extends AppError {
  constructor(message = "Permission denied", context?: Record<string, any>) {
    super(message, 403, true, context)
  }
}

/**
 * Validation error
 */
export class ValidationError extends AppError {
  constructor(message: string, context?: Record<string, any>) {
    super(message, 400, true, context)
  }
}

/**
 * Not found error
 */
export class NotFoundError extends AppError {
  constructor(resource = "Resource", context?: Record<string, any>) {
    super(`${resource} not found`, 404, true, context)
  }
}

/**
 * Rate limit error
 */
export class RateLimitError extends AppError {
  constructor(message = "Rate limit exceeded", context?: Record<string, any>) {
    super(message, 429, true, context)
  }
}

/**
 * Database error
 */
export class DatabaseError extends AppError {
  constructor(message = "Database operation failed", context?: Record<string, any>) {
    super(message, 500, true, context)
  }
}

/**
 * External service error
 */
export class ExternalServiceError extends AppError {
  constructor(service: string, message = "External service error", context?: Record<string, any>) {
    super(`${service}: ${message}`, 502, true, context)
  }
}
