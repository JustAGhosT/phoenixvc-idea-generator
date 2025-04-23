import { NextRequest, NextResponse } from "next/server"
import { getServerAuthSession } from "@/lib/auth-server"
import { db } from "@/lib/db"

/**
 * PUT /api/notifications/[id]/read
 * Marks a specific notification as read
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await getServerAuthSession()
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id
    const id = params.id

    // Check if notification exists and belongs to user
    const existingNotification = await db.notification.findUnique({
      where: {
        id,
        userId,
      },
    })

    if (!existingNotification) {
      return NextResponse.json(
        { error: "Notification not found" },
        { status: 404 }
      )
    }
    
    // Update notification read status
    const notification = await db.notification.update({
      where: {
        id,
      },
      data: {
        read: true,
        readAt: new Date(),
      },
    })

    return NextResponse.json(notification)
  } catch (error) {
    console.error(`Error marking notification ${params.id} as read:`, error)
    return NextResponse.json(
      { error: "Failed to mark notification as read" },
      { status: 500 }
    )
  }
}