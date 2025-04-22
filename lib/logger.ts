type LogLevel = "debug" | "info" | "warn" | "error"

interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  context?: Record<string, any>
  error?: Error
}

/**
 * Application logger with different log levels and structured output
 */
class Logger {
  private context: string
  private logLevel: LogLevel = "info" // Default log level

  constructor(context: string) {
    this.context = context

    // Set log level from environment if available
    if (process.env.LOG_LEVEL && ["debug", "info", "warn", "error"].includes(process.env.LOG_LEVEL)) {
      this.logLevel = process.env.LOG_LEVEL as LogLevel
    }
  }

  private shouldLog(level: LogLevel): boolean {
    const levels: Record<LogLevel, number> = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3,
    }

    return levels[level] >= levels[this.logLevel]
  }

  private formatLog(
    level: LogLevel,
    message: string,
    additionalContext?: Record<string, any>,
    error?: Error,
  ): LogEntry {
    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context: {
        ...additionalContext,
        service: this.context,
      },
    }

    if (error) {
      logEntry.error = error

      // Extract stack trace and other error properties
      if (error.stack) {
        logEntry.context = {
          ...logEntry.context,
          stack: error.stack.split("\n").map((line) => line.trim()),
        }
      }
    }

    return logEntry
  }

  private log(level: LogLevel, message: string, additionalContext?: Record<string, any>, error?: Error): void {
    if (!this.shouldLog(level)) return

    const logEntry = this.formatLog(level, message, additionalContext, error)

    // In production, you might want to send logs to a service like Datadog, Sentry, etc.
    // For now, we'll just console.log with appropriate methods
    switch (level) {
      case "debug":
        console.debug(JSON.stringify(logEntry))
        break
      case "info":
        console.info(JSON.stringify(logEntry))
        break
      case "warn":
        console.warn(JSON.stringify(logEntry))
        break
      case "error":
        console.error(JSON.stringify(logEntry))
        break
    }
  }

  debug(message: string, context?: Record<string, any>): void {
    this.log("debug", message, context)
  }

  info(message: string, context?: Record<string, any>): void {
    this.log("info", message, context)
  }

  warn(message: string, context?: Record<string, any>): void {
    this.log("warn", message, context)
  }

  error(message: string, error?: Error, context?: Record<string, any>): void {
    this.log("error", message, context, error)
  }
}

// Factory function to create loggers with specific contexts
export function createLogger(context: string): Logger {
  return new Logger(context)
}

// Default application logger
export const logger = createLogger("app")
