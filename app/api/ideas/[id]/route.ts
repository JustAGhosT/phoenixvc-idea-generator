import type { NextRequest } from "next/server"
import { getIdea, updateIdea, deleteIdea, generateFieldChanges } from "@/lib/db"
import { apiResponse, createApiRoute, createProtectedApiRoute } from "@/lib/api-utils"
import { NotFoundError, ValidationError, DatabaseError } from "@/lib/error-handler"
import { createLogger } from "@/lib/logger"
import { trackPerformance } from "@/lib/performance"

const logger = createLogger("api:ideas:detail")

// Get a specific idea
export const GET = createApiRoute(async (request: NextRequest, { params }: { params: { id: string } }) => {
  logger.info("Fetching idea by ID", { ideaId: params.id })

  return await trackPerformance("api:ideas:get", async () => {
    try {
      const idea = await getIdea(params.id)
      return apiResponse(idea)
    } catch (error) {
      logger.warn("Idea not found", { ideaId: params.id })
      throw new NotFoundError("Idea", { ideaId: params.id })
    }
  })
}, "Failed to fetch idea")

// Update an idea
export const PUT = createProtectedApiRoute(
  async (request: NextRequest, user, { params }: { params: { id: string } }) => {
    return await trackPerformance("api:ideas:update", async () => {
      const updatedIdea = await request.json()

      if (!updatedIdea) {
        throw new ValidationError("No update data provided", { ideaId: params.id })
      }

      logger.info("Updating idea", { ideaId: params.id, userId: user.id })

      try {
        // Get the original idea to compare changes
        const originalIdea = await getIdea(params.id)

        // Generate field changes
        const changes = generateFieldChanges(originalIdea, updatedIdea)
        logger.debug("Generated field changes", {
          ideaId: params.id,
          changesCount: changes.length,
          significantChanges: changes.filter((c) => c.isSignificant).length,
        })

        // Update the idea with changes
        const result = await updateIdea(params.id, updatedIdea, user.id, changes)

        logger.info("Idea updated successfully", { ideaId: params.id, userId: user.id })
        return apiResponse(result)
      } catch (error) {
        if (error instanceof Error && error.message.includes("not found")) {
          throw new NotFoundError("Idea", { ideaId: params.id })
        }

        // Handle database errors
        if (error instanceof Error && error.message.includes("database")) {
          throw new DatabaseError("Failed to update idea in database", {
            ideaId: params.id,
            originalError: error.message,
          })
        }

        throw error
      }
    })
  },
  "Failed to update idea",
)

// Delete an idea
export const DELETE = createProtectedApiRoute(
  async (request: NextRequest, user, { params }: { params: { id: string } }) => {
    return await trackPerformance("api:ideas:delete", async () => {
      logger.info("Deleting idea", { ideaId: params.id, userId: user.id })

      try {
        await deleteIdea(params.id, user.id)

        logger.info("Idea deleted successfully", { ideaId: params.id, userId: user.id })
        return apiResponse({ success: true })
      } catch (error) {
        if (error instanceof Error && error.message.includes("not found")) {
          throw new NotFoundError("Idea", { ideaId: params.id })
        }

        // Handle database errors
        if (error instanceof Error && error.message.includes("database")) {
          throw new DatabaseError("Failed to delete idea from database", {
            ideaId: params.id,
            originalError: error.message,
          })
        }

        throw error
      }
    })
  },
  "Failed to delete idea",
)
