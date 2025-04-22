import { type NextRequest, NextResponse } from "next/server"
import { getChanges, recordChange } from "@/lib/db"
import { auth } from "@/auth"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const ideaId = searchParams.get("ideaId")

    const changes = await getChanges(ideaId ? ideaId : undefined)
    return NextResponse.json(changes)
  } catch (error) {
    console.error("Error fetching changes:", error)
    return NextResponse.json({ error: "Failed to fetch changes" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const changeData = await request.json()
    const change = await recordChange({
      ...changeData,
      userId: session.user.id,
    })

    return NextResponse.json(change)
  } catch (error) {
    console.error("Error recording change:", error)
    return NextResponse.json({ error: "Failed to record change" }, { status: 500 })
  }
}
