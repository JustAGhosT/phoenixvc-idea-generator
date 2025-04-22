import * as Sentry from "@sentry/nextjs"
import { createLogger } from "@/lib/logger"

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
