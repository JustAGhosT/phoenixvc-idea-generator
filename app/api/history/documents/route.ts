import { getDocumentAnalyses } from "@/lib/analysis-db"
import { getServerAuthSession } from "@/lib/auth"
import { NextResponse } from "next/server"

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

    // Fetch document analyses
    const analyses = await getDocumentAnalyses(session.user.id, projectId || undefined)

    return NextResponse.json(analyses)
  } catch (error) {
    console.error("Error fetching document analyses:", error)
    return NextResponse.json({ error: "Failed to fetch document analyses" }, { status: 500 })
  }
}
