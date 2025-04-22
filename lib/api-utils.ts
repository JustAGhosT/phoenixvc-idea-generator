import { NextResponse } from "next/server"
import { getCurrentUser } from "./auth-utils"

// Standard error handler for API routes
export async function handleApiError(error: unknown, message = "An error occurred") {
  console.error(`API Error: ${message}`, error)
  return NextResponse.json({ error: message }, { status: 500 })
}

// Authentication middleware for API routes
export async function requireAuth() {
  try {
    return await getCurrentUser()
  } catch (error) {
    throw new Error("Unauthorized")
  }
}

// Standard response formatter
export function apiResponse(data: any, status = 200) {
  return NextResponse.json(data, { status })
}
