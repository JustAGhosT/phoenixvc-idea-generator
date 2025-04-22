import { createLogger } from "./logger"

const logger = createLogger("performance")

/**
 * Track the performance of a function
 * @param name The name of the function to track
 * @param fn The function to track
 * @returns The result of the function
 */
export async function trackPerformance<T>(name: string, fn: () => Promise<T>): Promise<T> {
  const start = performance.now()

  try {
    const result = await fn()
    const duration = performance.now() - start

    // Log performance data
    logger.debug(`Performance: ${name}`, {
      name,
      duration: `${duration.toFixed(2)}ms`,
      timestamp: new Date().toISOString(),
    })

    return result
  } catch (error) {
    const duration = performance.now() - start

    // Log error with performance data
    logger.error(`Performance error: ${name}`, error as Error, {
      name,
      duration: `${duration.toFixed(2)}ms`,
      timestamp: new Date().toISOString(),
    })

    throw error
  }
}

/**
 * Track the performance of a function and report it to the monitoring service
 * @param name The name of the function to track
 * @param fn The function to track
 * @returns The result of the function
 */
export async function trackPerformanceMetric<T>(name: string, fn: () => Promise<T>): Promise<T> {
  const start = performance.now()

  try {
    const result = await fn()
    const duration = performance.now() - start

    // Report to monitoring service
    reportPerformanceMetric(name, duration)

    return result
  } catch (error) {
    const duration = performance.now() - start

    // Report error to monitoring service
    reportPerformanceMetric(name, duration, true)

    throw error
  }
}

/**
 * Report a performance metric to the monitoring service
 * @param name The name of the metric
 * @param duration The duration in milliseconds
 * @param isError Whether the operation resulted in an error
 */
function reportPerformanceMetric(name: string, duration: number, isError = false) {
  // In a real application, this would send the metric to a monitoring service
  // For now, we'll just log it
  logger.info(`Performance metric: ${name}`, {
    name,
    duration: `${duration.toFixed(2)}ms`,
    isError,
    timestamp: new Date().toISOString(),
  })

  // Example of sending to a monitoring service:
  // if (typeof window !== 'undefined' && window.gtag) {
  //   window.gtag('event', 'timing_complete', {
  //     name,
  //     value: Math.round(duration),
  //     event_category: 'Performance',
  //     event_label: isError ? 'Error' : 'Success'
  //   });
  // }
}
