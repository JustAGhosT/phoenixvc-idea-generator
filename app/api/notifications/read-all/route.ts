import { createProtectedApiRoute } from "@/lib/api-utils"
import { NotificationType } from "@/lib/notification-types"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

/**
 * PUT /api/notifications/read-all
 * Mark all notifications as read for the current user
 */
async function markAllAsRead(req: Request, user: any) {
  const { searchParams } = new URL(req.url)
  
  // Parse query parameters for filtering
  const type = searchParams.get("type") as NotificationType | null
  const category = searchParams.get("category")
  
  // Build the query
  const where: any = {
    userId: user.id,
    read: false, // Only update unread notifications
  }
  
  // Add optional filters
  if (type) {
    where.type = type;
  }
  
  if (category) {
    where.category = category;
  }
  
  try {
    // Update all matching notifications
    await prisma.notification.updateMany({
      where,
      data: {
        read: true,
        readAt: new Date(),
      },
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error marking all notifications as read:", error)
    return NextResponse.json(
      { error: "Failed to mark all notifications as read" },
      { status: 500 }
    )
  }
}

// Create the API route handler
export const PUT = createProtectedApiRoute(markAllAsRead, "Failed to mark all notifications as read")