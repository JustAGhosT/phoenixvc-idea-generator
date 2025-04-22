// lib/notification-service.ts
export const notificationService = {
  getNotifications: async () => {
    // In a real application, this would call an API endpoint
    // For now, we'll just simulate with a timeout
    return new Promise((resolve) => {
      setTimeout(() => {
        const notifications = [
          { id: "1", message: "Notification 1" },
          { id: "2", message: "Notification 2" },
        ]
        resolve(notifications)
      }, 500)
    })
  },
}
