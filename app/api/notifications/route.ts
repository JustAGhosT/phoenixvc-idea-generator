import { NextRequest, NextResponse } from "next/server"
import { getServerAuthSession } from "@/lib/auth-server"
import { db } from "@/lib/db"
import { z } from "zod"

// Schema for notification creation
const createNotificationSchema = z.object({
  title: z.string().min(1).max(100),
  message: z.string().min(1).max(500),
  type: z.enum(["info", "success", "warning", "error", "system"]),
  priority: z.enum(["low", "medium", "high", "urgent"]).optional().default("medium"),
  category: z.string().optional(),
  link: z.string().optional(),
  autoClose: z.boolean().optional(),
  autoCloseDelay: z.number().optional(),
  persistent: z.boolean().optional(),
})

/**
 * GET /api/notifications
 * Retrieves all notifications for the current user
 */
export async function GET(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerAuthSession()
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id

    // Get query parameters
    const { searchParams } = new URL(req.url)
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : 50
    const read = searchParams.get("read") === "true" ? true : 
                searchParams.get("read") === "false" ? false : undefined
    const type = searchParams.get("type") || undefined
    const category = searchParams.get("category") || undefined
    
    // Build query
    let query: any = {
      userId,
    }
    
    if (read !== undefined) {
      query.read = read
    }
    
    if (type) {
      query.type = type
    }
    
    if (category) {
      query.category = category
    }

    // Fetch notifications from database
    const notifications = await db.notification.findMany({
      where: query,
      orderBy: {
        createdAt: "desc"
      },
      take: limit,
    })

    return NextResponse.json(notifications)
  } catch (error) {
    console.error("Error fetching notifications:", error)
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 }
    )
  }
}

/**
 * POST /api/notifications
 * Creates a new notification
 */
export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerAuthSession()
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id
    
    // Parse request body
    const body = await req.json()
    
    // Validate request body
    const validatedData = createNotificationSchema.parse(body)
    
    // Create notification in database
    const notification = await db.notification.create({
      data: {
        userId,
        title: validatedData.title,
        message: validatedData.message,
        type: validatedData.type,
        priority: validatedData.priority,
        category: validatedData.category,
        link: validatedData.link,
        read: false,
        metadata: {
          autoClose: validatedData.autoClose,
          autoCloseDelay: validatedData.autoCloseDelay,
          persistent: validatedData.persistent,
        },
      },
    })
    
    // Broadcast the new notification to connected clients
    if (global.notificationEventSource) {
      global.notificationEventSource.sendNotification(userId, notification)
    }

    return NextResponse.json(notification, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      )
    }
    
    console.error("Error creating notification:", error)
    return NextResponse.json(
      { error: "Failed to create notification" },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/notifications
 * Clears all non-persistent notifications for the current user
 */
export async function DELETE(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerAuthSession()
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id
    
    // Delete non-persistent notifications
    const { count } = await db.notification.deleteMany({
      where: {
        userId,
        metadata: {
          path: ["persistent"],
          not: true
        }
      },
    })
    
    return NextResponse.json({ success: true, count }, { status: 200 })
  } catch (error) {
    console.error("Error clearing notifications:", error)
    return NextResponse.json(
      { error: "Failed to clear notifications" },
      { status: 500 }
    )
  }
}