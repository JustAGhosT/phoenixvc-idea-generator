import type { NextRequest } from "next/server"
import { getIdeas, createIdea } from "@/lib/db"
import { apiResponse, createProtectedApiRoute, createApiRoute } from "@/lib/api-utils"
import { ValidationError } from "@/lib/error-handler"
import { createLogger } from "@/lib/logger"

const logger = createLogger("api:ideas")

// Get all ideas - public endpoint with error handling
export const GET = createApiRoute(async () => {
  logger.info("Fetching all ideas")
  const ideas = await getIdeas()
  logger.debug(`Retrieved ${ideas.length} ideas`)
  return apiResponse(ideas)
}, "Failed to fetch ideas")

// Create a new idea - protected endpoint with error handling
export const POST = createProtectedApiRoute(async (request: NextRequest, user) => {
  const idea = await request.json()

  // Validate required fields
  if (!idea.title) {
    logger.warn("Attempted to create idea without title", { userId: user.id })
    throw new ValidationError("Title is required")
  }

  logger.info("Creating new idea", { ideaTitle: idea.title, userId: user.id })
  const newIdea = await createIdea(idea, user.id)

  logger.info("Idea created successfully", { ideaId: newIdea.id, userId: user.id })
  return apiResponse(newIdea, 201)
}, "Failed to create idea")
