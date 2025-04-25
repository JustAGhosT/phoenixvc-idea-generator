import { getProjectVisualizations } from "@/lib/analysis-db"
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

    // Fetch project visualizations
    const visualizations = await getProjectVisualizations(session.user.id, projectId || undefined)

    return NextResponse.json(visualizations)
  } catch (error) {
    console.error("Error fetching project visualizations:", error)
    return NextResponse.json({ error: "Failed to fetch project visualizations" }, { status: 500 })
  }
}
