import { toast } from "@/components/ui/use-toast";
import { NextResponse } from "next/server";
import { createLogger } from "./logger";
import { captureException } from "./sentry";

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

export interface ErrorDetails {
  title: string;
  message: string;
  code?: string;
  timestamp: Date;
  technical?: string;
}

export function handleError(error: unknown, context: string = "Application"): ErrorDetails {
  console.error(`${context} Error:`, error);
  
  // Default error details
  const errorDetails: ErrorDetails = {
    title: `${context} Error`,
    message: "An unexpected error occurred. Please try again later.",
    code: "UNKNOWN_ERROR",
    timestamp: new Date(),
  };
  
  // Extract more details if available
  if (error instanceof Error) {
    errorDetails.message = error.message;
    errorDetails.technical = error.stack;
    
    // Try to extract error code if available
    if ((error as any).code) {
      errorDetails.code = (error as any).code;
    }
  } else if (typeof error === 'string') {
    errorDetails.message = error;
  }
  
  // Show toast notification
  toast({
    title: errorDetails.title,
    description: errorDetails.message,
    variant: "destructive",
  });
  
  return errorDetails;
}

export function captureError(error: unknown, context: string = "Application"): void {
  const errorDetails = handleError(error, context);
  
  // Here you could add analytics or error reporting
  // Example: sendToErrorReporting(errorDetails);
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.group(`Error Details (${context})`);
    console.error('Message:', errorDetails.message);
    console.error('Code:', errorDetails.code);
    console.error('Time:', errorDetails.timestamp.toISOString());
    if (errorDetails.technical) {
      console.error('Technical:', errorDetails.technical);
    }
    console.groupEnd();
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
    const errorDetails = handleError(error, "API");
    return NextResponse.json(
      {
        error: process.env.NODE_ENV === "production" ? defaultMessage : errorDetails.message,
        code: 500,
        ...(process.env.NODE_ENV !== "production" && errorDetails.technical ? { technical: errorDetails.technical } : {}),
      },
      { status: 500 },
    )
  }

  // Handle unknown errors
  logger.error(`Unknown error type: ${String(error)}`)
  const errorDetails = handleError(error, "API");
  return NextResponse.json({ error: errorDetails.message, code: 500 }, { status: 500 })
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