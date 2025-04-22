import { createLogger } from "./logger"

const logger = createLogger("error-monitoring")

interface ErrorMetadata {
  url?: string
  component?: string
  userId?: string
  [key: string]: any
}

/**
 * Global error monitoring service
 * In a production app, this would integrate with services like Sentry, Datadog, etc.
 */
export class ErrorMonitor {
  /**
   * Capture and log an error with optional metadata
   */
  static captureException(error: Error, metadata: ErrorMetadata = {}): void {
    logger.error(`Captured exception: ${error.message}`, error, metadata)

    // In production, you would send this to your error monitoring service
    // Example: Sentry.captureException(error, { extra: metadata });
  }

  /**
   * Log a message with optional metadata
   */
  static captureMessage(message: string, metadata: ErrorMetadata = {}): void {
    logger.warn(`Captured message: ${message}`, metadata)

    // In production, you would send this to your error monitoring service
    // Example: Sentry.captureMessage(message, { extra: metadata });
  }

  /**
   * Set user context for error tracking
   */
  static setUser(userId: string, email?: string, username?: string): void {
    // In production, you would set the user context in your error monitoring service
    // Example: Sentry.setUser({ id: userId, email, username });

    logger.debug("Set user context for error monitoring", { userId, email, username })
  }

  /**
   * Clear user context
   */
  static clearUser(): void {
    // In production, you would clear the user context in your error monitoring service
    // Example: Sentry.setUser(null);

    logger.debug("Cleared user context for error monitoring")
  }
}

/**
 * Initialize error monitoring
 * Call this once at app startup
 */
export function initErrorMonitoring(): void {
  // Set up global unhandled error and promise rejection handlers
  if (typeof window !== "undefined") {
    // Browser environment
    window.addEventListener("error", (event) => {
      ErrorMonitor.captureException(event.error, {
        url: window.location.href,
        component: "window.onerror",
      })
    })

    window.addEventListener("unhandledrejection", (event) => {
      ErrorMonitor.captureException(event.reason instanceof Error ? event.reason : new Error(String(event.reason)), {
        url: window.location.href,
        component: "window.onunhandledrejection",
      })
    })
  } else {
    // Node.js environment
    process.on("uncaughtException", (error) => {
      ErrorMonitor.captureException(error, { component: "process.uncaughtException" })
      // In production, you might want to gracefully shut down the process after logging
    })

    process.on("unhandledRejection", (reason) => {
      ErrorMonitor.captureException(reason instanceof Error ? reason : new Error(String(reason)), {
        component: "process.unhandledRejection",
      })
    })
  }

  logger.info("Error monitoring initialized")
}
