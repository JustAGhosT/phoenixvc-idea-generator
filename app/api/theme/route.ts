// app/api/theme/route.ts
import { NextResponse } from "next/server"
import { themeService } from "@/lib/theme-service"

export async function GET() {
  try {
    const theme = await themeService.getTheme()
    return NextResponse.json({ theme })
  } catch (error) {
    console.error("Error fetching theme:", error)
    return NextResponse.json({ error: "Failed to fetch theme" }, { status: 500 })
  }
}
