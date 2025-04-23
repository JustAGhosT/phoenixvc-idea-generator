import { NextResponse } from "next/server"
import { breadcrumbService } from "@/lib/breadcrumb-service"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get("path")

  if (!path) {
    return NextResponse.json({ error: "Missing path" }, { status: 400 })
  }

  try {
    const breadcrumbs = await breadcrumbService.getBreadcrumbs(path)
    return NextResponse.json(breadcrumbs)
  } catch (error) {
    console.error("Error fetching breadcrumbs:", error)
    return NextResponse.json({ error: "Failed to fetch breadcrumbs" }, { status: 500 })
  }
}
