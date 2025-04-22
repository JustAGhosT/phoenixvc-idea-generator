"use client"

// hooks/use-notification-item.ts
import { useState, useEffect } from "react"

export function useNotificationItem(id: string) {
  const [notification, setNotification] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        // Simulate fetching a notification
        setTimeout(() => {
          setNotification({ id, message: `Notification with ID ${id}` })
        }, 500)
      } catch (error: any) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  return { notification, loading, error }
}
