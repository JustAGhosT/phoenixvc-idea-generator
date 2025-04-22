import * as Sentry from "@sentry/nextjs"
import { createLogger } from "./logger"

const logger = createLogger("sentry")

/**
 * Initialize Sentry for error tracking and performance monitoring
 */
export function initSentry() {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      environment: process.env.NODE_ENV,
      release: process.env.NEXT_PUBLIC_APP_VERSION || "development",

      // Performance monitoring
      tracesSampleRate: 0.2, // Sample 20% of transactions for performance monitoring

      // Session replay for debugging user interactions
      replaysSessionSampleRate: 0.1, // Sample 10% of sessions for replay
      replaysOnErrorSampleRate: 1.0, // Sample all sessions that have errors

      // Ignore specific errors
      ignoreErrors: [
        // Add patterns for errors you want to ignore
        "top.GLOBALS",
        "ResizeObserver loop limit exceeded",
      ],

      // Adjust the breadcrumb limit
      maxBreadcrumbs: 50,
    })
    logger.info("Sentry initialized")
  } else {
    logger.warn("Sentry DSN not provided, skipping initialization")
    console.warn("Sentry DSN not found. Error tracking disabled.")
  }
}

/**
 * Capture an exception with Sentry
 * @param error The error to capture
 * @param context Additional context for the error
 */
export function captureException(error: Error, context?: Record<string, any>) {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.captureException(error, {
      extra: context,
    })
  } else {
    console.error("Error captured (Sentry disabled):", error, context)
  }
}

export function captureMessage(message: string, level?: Sentry.SeverityLevel, context?: Record<string, any>) {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.captureMessage(message, {
      level,
      extra: context,
    })
  }
}

/**
 * Set user information for Sentry
 * @param user User information
 */
export function setUser(user: { id: string; email?: string; username?: string }) {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.setUser(user)
  }
}

/**
 * Clear user information from Sentry
 */
export function clearUser() {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.setUser(null)
  }
}

/**
 * Set a tag for the current scope
 * @param key Tag key
 * @param value Tag value
 */
export function setTag(key: string, value: string) {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.setTag(key, value)
  }
}
