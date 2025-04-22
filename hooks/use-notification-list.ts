"use client"

// hooks/use-notification-list.ts
import { useState, useEffect } from "react"

export function useNotificationList() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        // Simulate fetching notifications
        setTimeout(() => {
          setNotifications([
            { id: "1", message: "Notification 1" },
            { id: "2", message: "Notification 2" },
          ])
        }, 500)
      } catch (error: any) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { notifications, loading, error }
}
