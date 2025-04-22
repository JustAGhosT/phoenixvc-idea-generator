import type { NextRequest } from "next/server"
import { getIdeas, createIdea } from "@/lib/db"
import { handleApiError, apiResponse } from "@/lib/api-utils"
import { getServerAuthSession } from "@/auth"

export async function GET() {
  try {
    const ideas = await getIdeas()
    return apiResponse(ideas)
  } catch (error) {
    return handleApiError(error, "Failed to fetch ideas")
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerAuthSession()

    if (!session || !session.user) {
      return apiResponse({ error: "Unauthorized" }, 401)
    }

    const idea = await request.json()
    const newIdea = await createIdea(idea, session.user.id)
    return apiResponse(newIdea, 201)
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return apiResponse({ error: "Unauthorized" }, 401)
    }
    return handleApiError(error, "Failed to create idea")
  }
}
