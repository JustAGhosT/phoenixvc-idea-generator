"use client"

// hooks/use-notification-service.ts
import { useState, useEffect } from "react"
import { notificationService } from "@/lib/notification-service"

export function useNotificationService() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchNotifications = async () => {
    setLoading(true)
    try {
      const data = await notificationService.getNotifications()
      setNotifications(data)
    } catch (error) {
      console.error("Error fetching notifications:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [])

  return { notifications, loading, fetchNotifications }
}
