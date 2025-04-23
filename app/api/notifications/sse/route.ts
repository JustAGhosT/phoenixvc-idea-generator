import { getServerAuthSession } from "@/lib/auth-server"
import { NextRequest } from "next/server"

// Define a client type that includes the writer
type SSEClient = {
  controller: ReadableStreamDefaultController
  encoder: TextEncoder
}

// Store connected clients by user ID
const clients = new Map<string, Set<SSEClient>>()

// Define the global notification event source type
declare global {
  var notificationEventSource: {
    sendNotification: (userId: string, notification: any) => void
    broadcastNotification: (notification: any) => void
  }
}

// Global notification event source
// This will be used to broadcast notifications to connected clients
if (!global.notificationEventSource) {
  global.notificationEventSource = {
    // Send notification to a specific user
    sendNotification: (userId: string, notification: any) => {
      const userClients = clients.get(userId)
      if (!userClients) return
      
      const data = JSON.stringify(notification)
      userClients.forEach(client => {
        try {
          const chunk = client.encoder.encode(`data: ${data}\n\n`)
          client.controller.enqueue(chunk)
        } catch (error) {
          console.error("Error sending notification to client:", error)
        }
      })
    },
    
    // Send notification to all connected clients
    broadcastNotification: (notification: any) => {
      const data = JSON.stringify(notification)
      clients.forEach(userClients => {
        userClients.forEach(client => {
          try {
            const chunk = client.encoder.encode(`data: ${data}\n\n`)
            client.controller.enqueue(chunk)
          } catch (error) {
            console.error("Error broadcasting notification:", error)
          }
        })
      })
    }
  }
}

/**
 * GET /api/notifications/sse
 * Server-Sent Events endpoint for real-time notifications
 */
export async function GET(req: NextRequest) {
  // Check authentication
  const session = await getServerAuthSession()
  if (!session || !session.user || !session.user.id) {
    return new Response("Unauthorized", { status: 401 })
  }

  // Ensure userId is a string and not undefined
  const userId = session.user.id as string
  const encoder = new TextEncoder()

  // Create a stream with a controller to write to
  const stream = new ReadableStream({
    start(controller) {
      // Create client object with controller and encoder
      const client: SSEClient = {
        controller,
        encoder
      }
      
  // Store client connection
  if (!clients.has(userId)) {
    clients.set(userId, new Set())
  }
      clients.get(userId)!.add(client)

  // Send initial connection message
  const connectionMessage = {
    type: "connection",
    message: "Connected to notification stream",
    timestamp: new Date().toISOString()
  }
      controller.enqueue(encoder.encode(`data: ${JSON.stringify(connectionMessage)}\n\n`))

  // Handle client disconnection
  req.signal.addEventListener("abort", () => {
    const userClients = clients.get(userId)
    if (userClients) {
          userClients.delete(client)
      if (userClients.size === 0) {
        clients.delete(userId)
      }
    }
        controller.close()
  })
}
  })

  // Create response object
  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
      "X-Accel-Buffering": "no" // Disable buffering for Nginx
    }
  })
}