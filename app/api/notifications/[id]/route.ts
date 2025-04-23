import { NextRequest, NextResponse } from "next/server"
import { getServerAuthSession } from "@/lib/auth-server"
import { db } from "@/lib/db"

/**
 * GET /api/notifications/[id]
 * Retrieves a specific notification by ID
 */
export async function GET(
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

    // Fetch notification from database
    const notification = await db.notification.findUnique({
      where: {
        id,
        userId,
      },
    })

    if (!notification) {
      return NextResponse.json(
        { error: "Notification not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(notification)
  } catch (error) {
    console.error(`Error fetching notification ${params.id}:`, error)
    return NextResponse.json(
      { error: "Failed to fetch notification" },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/notifications/[id]
 * Updates a specific notification
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
    
    // Parse request body
    const body = await req.json()
    
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
    
    // Update notification
    const notification = await db.notification.update({
      where: {
        id,
      },
      data: {
        title: body.title,
        message: body.message,
        read: body.read,
        type: body.type,
        priority: body.priority,
        category: body.category,
        link: body.link,
        metadata: body.metadata,
      },
    })

    return NextResponse.json(notification)
  } catch (error) {
    console.error(`Error updating notification ${params.id}:`, error)
    return NextResponse.json(
      { error: "Failed to update notification" },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/notifications/[id]
 * Deletes a specific notification
 */
export async function DELETE(
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
    
    // Delete notification
    await db.notification.delete({
      where: {
        id,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error deleting notification ${params.id}:`, error)
    return NextResponse.json(
      { error: "Failed to delete notification" },
      { status: 500 }
    )
  }
}