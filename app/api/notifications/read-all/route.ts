import { getServerAuthSession } from "@/lib/auth-server"
import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

/**
 * PUT /api/notifications/read-all
 * Marks all notifications for the current user as read
 */
export async function PUT(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerAuthSession()
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id
    
    // Get query parameters for filtering
    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category") || undefined
    const type = searchParams.get("type") || undefined
    
    // Build query
    let query: any = {
      userId,
      read: false,
    }
    
    if (category) {
      query.category = category
    }
    
    if (type) {
      query.type = type
    }
    
    // Update all unread notifications to read
    const { count } = await db.notification.updateMany({
      where: query,
      data: {
        read: true,
        readAt: new Date(),
      },
    })

    return NextResponse.json({ success: true, count })
  } catch (error) {
    console.error("Error marking all notifications as read:", error)
    return NextResponse.json(
      { error: "Failed to mark notifications as read" },
      { status: 500 }
    )
  }
}