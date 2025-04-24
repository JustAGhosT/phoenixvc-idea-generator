import { createProtectedApiRoute } from "@/lib/api-utils"
import { NotificationType } from "@/lib/notification-types"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

/**
 * GET /api/notifications
 * Get all notifications for the current user
 */
async function getNotifications(req: Request, user: any) {
  const { searchParams } = new URL(req.url)
  
  // Parse query parameters for filtering
  const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : undefined
  const read = searchParams.has("read") ? searchParams.get("read") === "true" : undefined
  const type = searchParams.get("type") as NotificationType | null
  const category = searchParams.get("category")
  
  // Build the query
  const where: any = {
    userId: user.id,
  }
  
  // Add optional filters
  if (read !== undefined) {
    where.read = read;
  }
  
  if (type) {
    where.type = type;
  }
  
  if (category) {
    where.category = category;
  }
  
  try {
    // Get notifications
    const notifications = await prisma.notification.findMany({
      where,
      orderBy: {
        createdAt: "desc",
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
 * Create a new notification
 */
async function createNotification(req: Request, user: any) {
  try {
    const body = await req.json()
    
    // Validate required fields
    if (!body.title || !body.message || !body.type) {
      return NextResponse.json(
        { error: "Missing required fields: title, message, type" },
        { status: 400 }
      )
    }
    
    // Extract metadata from body if present
    let metadata = null
    if (body.metadata || body.autoClose || body.autoCloseDelay || body.persistent) {
      metadata = JSON.stringify({
        ...(body.metadata || {}),
        ...(body.autoClose !== undefined && { autoClose: body.autoClose }),
        ...(body.autoCloseDelay !== undefined && { autoCloseDelay: body.autoCloseDelay }),
        ...(body.persistent !== undefined && { persistent: body.persistent }),
      })
    }
    
    // Create the notification
    const notification = await prisma.notification.create({
      data: {
        userId: user.id,
        title: body.title,
        message: body.message,
        type: body.type,
        priority: body.priority || "medium",
        category: body.category,
        link: body.link,
        metadata,
        persistent: body.persistent || false,
      },
    })
    
    return NextResponse.json(notification)
  } catch (error) {
    console.error("Error creating notification:", error)
    return NextResponse.json(
      { error: "Failed to create notification" },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/notifications
 * Clear all notifications for the current user
 */
async function clearAllNotifications(req: Request, user: any) {
  try {
    // Delete all non-persistent notifications
    await prisma.notification.deleteMany({
      where: {
        userId: user.id,
        persistent: false,
      },
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error clearing notifications:", error)
    return NextResponse.json(
      { error: "Failed to clear notifications" },
      { status: 500 }
    )
  }
}

// Create the API route handlers
export const GET = createProtectedApiRoute(getNotifications, "Failed to fetch notifications")
export const POST = createProtectedApiRoute(createNotification, "Failed to create notification")
export const DELETE = createProtectedApiRoute(clearAllNotifications, "Failed to clear notifications")