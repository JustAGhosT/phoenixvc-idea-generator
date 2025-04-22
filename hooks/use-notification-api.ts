"use client"

// hooks/use-notification-api.ts
import { useState, useEffect } from "react"

export function useNotificationApi() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/notifications`)
        if (!response.ok) {
          throw new Error("Failed to fetch notifications")
        }
        const data = await response.json()
        setNotifications(data)
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
