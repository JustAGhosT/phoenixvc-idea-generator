import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"

/**
 * GET /api/notifications/sse
 * Server-Sent Events endpoint for real-time notifications
 */
export async function GET(req: Request) {
  try {
    // Get the user from the session
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user || !session.user.id) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      })
    }
    
    const user = { id: session.user.id }
    
    // Set headers for SSE
    const headers = {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
    }

    // Create a new ReadableStream
    const stream = new ReadableStream({
      start: async (controller) => {
        // Send initial connection message
        const initialMessage = `data: ${JSON.stringify({ type: "connection", message: "Connected to notification stream" })}\n\n`
        controller.enqueue(new TextEncoder().encode(initialMessage))

        // Set up polling for new notifications
        let lastCheck = new Date()
        
        // Function to check for new notifications
        const checkForNewNotifications = async () => {
          try {
            // Get new notifications since last check
            const newNotifications = await prisma.notification.findMany({
              where: {
                userId: user.id,
                createdAt: {
                  gt: lastCheck,
                },
              },
              orderBy: {
                createdAt: "desc",
              },
            })
            
            // Update last check time
            lastCheck = new Date()
            
            // Send new notifications to client
            for (const notification of newNotifications) {
              const formattedNotification = {
                id: notification.id,
                title: notification.title,
                message: notification.message,
                type: notification.type,
                priority: notification.priority,
                read: notification.read,
                createdAt: notification.createdAt.toISOString(),
                readAt: notification.readAt?.toISOString(),
                category: notification.category,
                link: notification.link,
                metadata: notification.metadata,
              }
              
              const message = `data: ${JSON.stringify(formattedNotification)}\n\n`
              controller.enqueue(new TextEncoder().encode(message))
            }
            
            // Also check for updates to existing notifications
            const updatedNotifications = await prisma.notification.findMany({
              where: {
                userId: user.id,
                updatedAt: {
                  gt: lastCheck,
                },
                createdAt: {
                  lte: lastCheck, // Only get notifications that existed before our last check
                },
              },
            })
            
            // Send updated notifications to client
            for (const notification of updatedNotifications) {
              const formattedNotification = {
                id: notification.id,
                title: notification.title,
                message: notification.message,
                type: notification.type,
                priority: notification.priority,
                read: notification.read,
                createdAt: notification.createdAt.toISOString(),
                readAt: notification.readAt?.toISOString(),
                category: notification.category,
                link: notification.link,
                metadata: notification.metadata,
              }
              
              const message = `data: ${JSON.stringify(formattedNotification)}\n\n`
              controller.enqueue(new TextEncoder().encode(message))
            }
            
            // Schedule next check
            setTimeout(checkForNewNotifications, 5000) // Check every 5 seconds
          } catch (error) {
            console.error("Error checking for new notifications:", error)
            
            // Send error message to client
            const errorMessage = `data: ${JSON.stringify({ type: "error", message: "Error checking for notifications" })}\n\n`
            controller.enqueue(new TextEncoder().encode(errorMessage))
            
            // Try to reconnect
            setTimeout(checkForNewNotifications, 10000) // Try again in 10 seconds
          }
        }
        
        // Start checking for notifications
        checkForNewNotifications()
        
        // Handle client disconnect
        if (req.signal) {
          req.signal.addEventListener("abort", () => {
            console.log("Client disconnected from notification stream")
          })
        }
      }
    })
    
    // Return the stream response
    return new Response(stream, { headers })
  } catch (error) {
    console.error("Error in SSE endpoint:", error)
    return NextResponse.json(
      { error: "Failed to connect to notification stream" },
      { status: 500 }
    )
  }
}