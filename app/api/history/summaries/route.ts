import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authConfig } from "@/app/api/auth/[...nextauth]/auth"
import { getProjectSummaries } from "@/lib/analysis-db"

export async function GET(req: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authConfig)
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get query parameters
    const url = new URL(req.url)
    const projectId = url.searchParams.get("projectId")

    // Fetch project summaries
    const summaries = await getProjectSummaries(session.user.id, projectId || undefined)

    return NextResponse.json(summaries)
  } catch (error) {
    console.error("Error fetching project summaries:", error)
    return NextResponse.json({ error: "Failed to fetch project summaries" }, { status: 500 })
  }
}
