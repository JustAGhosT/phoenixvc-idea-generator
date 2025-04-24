import { createProtectedApiRoute } from "@/lib/api-utils"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

/**
 * GET /api/notifications/[id]
 * Get a specific notification by ID
 */
async function getNotification(req: Request, user: any) {
  // Extract the ID from the URL
  const id = req.url.split('/').pop()
  
  if (!id) {
    return NextResponse.json(
      { error: "Missing notification ID" },
      { status: 400 }
    )
  }
  
  try {
    // Get the notification
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
    
    return NextResponse.json(notification)
  } catch (error) {
    console.error(`Error fetching notification ${id}:`, error)
    return NextResponse.json(
      { error: "Failed to fetch notification" },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/notifications/[id]
 * Delete a specific notification by ID
 */
async function deleteNotification(req: Request, user: any) {
  // Extract the ID from the URL
  const id = req.url.split('/').pop()
  
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
    
    // Delete the notification
    await prisma.notification.delete({
      where: {
        id,
      },
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error deleting notification ${id}:`, error)
    return NextResponse.json(
      { error: "Failed to delete notification" },
      { status: 500 }
    )
  }
}

// Create the API route handlers
export const GET = createProtectedApiRoute(getNotification, "Failed to fetch notification")
export const DELETE = createProtectedApiRoute(deleteNotification, "Failed to delete notification")