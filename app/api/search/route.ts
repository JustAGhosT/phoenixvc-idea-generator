import { NextResponse } from "next/server"
import { searchService } from "@/lib/search-service"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const term = searchParams.get("term")

  if (!term) {
    return NextResponse.json({ error: "Missing search term" }, { status: 400 })
  }

  try {
    const results = await searchService.search(term)
    return NextResponse.json(results)
  } catch (error) {
    console.error("Error performing search:", error)
    return NextResponse.json({ error: "Failed to perform search" }, { status: 500 })
  }
}
