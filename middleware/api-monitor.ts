import { type NextRequest, NextResponse } from "next/server"
import { createLogger } from "@/lib/logger"

const logger = createLogger("api-monitor")

export async function apiMonitorMiddleware(req: NextRequest, next: () => Promise<NextResponse>) {
  const start = Date.now()
  const requestId = crypto.randomUUID()
  const method = req.method
  const url = req.url
  const path = new URL(url).pathname

  // Store request ID in global scope for logger
  global.requestId = requestId

  // Add request ID to headers for tracing
  const requestHeaders = new Headers(req.headers)
  requestHeaders.set("x-request-id", requestId)

  // Log the incoming request
  logger.info(`API Request: ${method} ${path}`, {
    requestId,
    method,
    path,
    url,
    userAgent: req.headers.get("user-agent") || "unknown",
    ip: req.headers.get("x-forwarded-for") || req.ip || "unknown",
    referer: req.headers.get("referer") || "unknown",
  })

  try {
    // Process the request
    const response = await next()

    // Calculate duration
    const duration = Date.now() - start

    // Log the response
    logger.info(`API Response: ${method} ${path} ${response.status}`, {
      requestId,
      method,
      path,
      status: response.status,
      duration: `${duration}ms`,
    })

    // Add the request ID to the response headers
    const responseHeaders = new Headers(response.headers)
    responseHeaders.set("x-request-id", requestId)

    // Return the response with the added headers
    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    })
  } catch (error) {
    // Calculate duration
    const duration = Date.now() - start

    // Log the error
    logger.error(`API Error: ${method} ${path}`, error as Error, {
      requestId,
      method,
      path,
      duration: `${duration}ms`,
    })

    // Re-throw the error to be handled by the error handling middleware
    throw error
  } finally {
    // Clear request ID from global scope
    global.requestId = undefined
  }
}
