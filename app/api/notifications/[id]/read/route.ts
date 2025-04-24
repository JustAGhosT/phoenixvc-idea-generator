import { createProtectedApiRoute } from "@/lib/api-utils"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

/**
 * PUT /api/notifications/[id]/read
 * Mark a specific notification as read
 */
async function markAsRead(req: Request, user: any) {
  // Extract the ID from the URL
  const urlParts = req.url.split('/')
  const id = urlParts[urlParts.length - 2] // Get the ID part (second to last segment)
  
  if (!id) {
    return NextResponse.json(
      { error: "Missing notification ID" },
      { status: 400 }
    )
  }
  
  try {
    // First check if the notification exists and belongs to the user
    const notification = await prisma.notification.findUnique({
      where: {
        id,
      },
    })
    
    // Check if notification exists
    if (!notification) {
      return NextResponse.json(
        { error: "Notification not found" },
        { status: 404 }
      )
    }
    
    // Check if user owns the notification
    if (notification.userId !== user.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      )
    }
    
    // Mark as read if not already read
    if (!notification.read) {
      await prisma.notification.update({
        where: {
          id,
        },
        data: {
          read: true,
          readAt: new Date(),
        },
      })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error marking notification ${id} as read:`, error)
    return NextResponse.json(
      { error: "Failed to mark notification as read" },
      { status: 500 }
    )
  }
}

// Create the API route handler
export const PUT = createProtectedApiRoute(markAsRead, "Failed to mark notification as read")