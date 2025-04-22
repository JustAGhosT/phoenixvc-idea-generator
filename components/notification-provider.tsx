"use client"

// components/notification-provider.tsx
import type React from "react"
import { createContext, useContext, useState } from "react"

interface NotificationContextProps {
  notifications: any[]
  addNotification: (notification: any) => void
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined)

export function useNotificationContext() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotificationContext must be used within a NotificationProvider")
  }
  return context
}

interface NotificationProviderProps {
  children: React.ReactNode
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState([])

  const addNotification = (notification: any) => {
    setNotifications([...notifications, notification])
  }

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>{children}</NotificationContext.Provider>
  )
}
