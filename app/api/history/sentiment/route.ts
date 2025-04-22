import { NextResponse } from "next/server"
import { getServerAuthSession } from "@/auth"
import { getSentimentAnalyses } from "@/lib/analysis-db"

export async function GET(req: Request) {
  try {
    // Check authentication
    const session = await getServerAuthSession()
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get query parameters
    const url = new URL(req.url)
    const projectId = url.searchParams.get("projectId")

    // Fetch sentiment analyses
    const analyses = await getSentimentAnalyses(session.user.id, projectId || undefined)

    return NextResponse.json(analyses)
  } catch (error) {
    console.error("Error fetching sentiment analyses:", error)
    return NextResponse.json({ error: "Failed to fetch sentiment analyses" }, { status: 500 })
  }
}
