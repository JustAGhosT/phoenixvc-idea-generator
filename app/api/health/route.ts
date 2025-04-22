import { NextResponse } from "next/server"
import { supabase } from "@/lib/db"
import { createLogger } from "@/lib/logger"

const logger = createLogger("health-check")

/**
 * Health check endpoint to verify the application and its dependencies are working
 */
export async function GET() {
  const startTime = performance.now()
  const checks: Record<string, { status: "ok" | "error"; message?: string; responseTime?: number }> = {
    api: { status: "ok" },
  }

  // Check database connection
  try {
    const dbStartTime = performance.now()
    const { data, error } = await supabase.from("health_check").select("*").limit(1)

    if (error) {
      throw error
    }

    checks.database = {
      status: "ok",
      responseTime: Math.round(performance.now() - dbStartTime),
    }
  } catch (error) {
    logger.error("Database health check failed", error as Error)
    checks.database = {
      status: "error",
      message: error instanceof Error ? error.message : "Unknown database error",
    }
  }

  // Check external services if needed
  // For example, check AI service
  try {
    const aiStartTime = performance.now()
    // Mock check for now
    await new Promise((resolve) => setTimeout(resolve, 100))

    checks.aiService = {
      status: "ok",
      responseTime: Math.round(performance.now() - aiStartTime),
    }
  } catch (error) {
    logger.error("AI service health check failed", error as Error)
    checks.aiService = {
      status: "error",
      message: error instanceof Error ? error.message : "Unknown AI service error",
    }
  }

  // Calculate overall health status
  const isHealthy = Object.values(checks).every((check) => check.status === "ok")
  const responseTime = Math.round(performance.now() - startTime)

  // Log health check results
  logger.info("Health check completed", {
    isHealthy,
    responseTime,
    checks,
  })

  // Return health check response
  return NextResponse.json(
    {
      status: isHealthy ? "ok" : "degraded",
      timestamp: new Date().toISOString(),
      responseTime,
      version: process.env.NEXT_PUBLIC_APP_VERSION || "development",
      checks,
    },
    {
      status: isHealthy ? 200 : 503,
    },
  )
}
