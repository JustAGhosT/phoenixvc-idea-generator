import { toast } from "@/components/ui/use-toast";
import { createLogger } from "./logger";
import { captureException } from "./sentry";

export interface ErrorDetails {
  title: string;
  message: string;
  code?: string;
  timestamp: Date;
  technical?: string;
}
const logger = createLogger("client-error")

/**
 * Report a handled error to Sentry
 * @param error The error object
 * @param context Additional context for the error
 */
export function reportHandledError(error: Error, context?: Record<string, any>) {
  // Log the error
  logger.error(`Client error: ${error.message}`, error, context)

  // Send to Sentry
  captureException(error, context)

  // You could also send to your own API endpoint
  // sendErrorToApi(error, context).catch(console.error);
}

/**
 * Capture a client-side error for logging and monitoring
 */
export function captureClientError(error: Error, context?: Record<string, any>) {
  logger.error(`Client error: ${error.message}`, error, context)

  // Send to Sentry if available
  if (typeof window !== "undefined") {
    captureException(error, context)
  }
}

/**
 * Initialize client-side error handling
 */
export function initClientErrorHandling() {
  if (typeof window !== "undefined") {
    // Handle uncaught errors
    window.addEventListener("error", (event) => {
      captureClientError(event.error || new Error(event.message), {
        type: "uncaught-error",
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      })

      // Don't prevent default to allow browser's default error handling
    })

    // Handle unhandled promise rejections
    window.addEventListener("unhandledrejection", (event) => {
      const error = event.reason instanceof Error ? event.reason : new Error(String(event.reason))

      captureClientError(error, {
        type: "unhandled-rejection",
        promise: event.promise,
        reason: event.reason,
      })
    })

    logger.info("Client-side error handling initialized")
  }
}

/**
 * Send an error to the API for logging
 * @param error The error object
 * @param context Additional context for the error
 */
async function sendErrorToApi(error: Error, context?: Record<string, any>) {
  try {
    await fetch("/api/log/client-error", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        context,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      }),
    })
  } catch (sendError) {
    // Don't throw here to avoid infinite loops
    console.error("Failed to send error to API:", sendError)
  }
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