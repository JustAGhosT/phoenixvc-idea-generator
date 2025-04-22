"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type NotificationType = "info" | "success" | "warning" | "error"

export interface Notification {
  id: string
  title: string
  message: string
  type: NotificationType
  read: boolean
  date: Date
  link?: string
}

type NotificationContextType = {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "read" | "date">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
  clearAllNotifications: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([])

  // Load notifications from localStorage on mount
  useEffect(() => {
    const savedNotifications = localStorage.getItem("notifications")
    if (savedNotifications) {
      try {
        const parsed = JSON.parse(savedNotifications)
        // Convert string dates back to Date objects
        const withDates = parsed.map((notification: any) => ({
          ...notification,
          date: new Date(notification.date),
        }))
        setNotifications(withDates)
      } catch (e) {
        console.error("Failed to parse notifications", e)
      }
    } else {
      // Add some demo notifications if none exist
      setNotifications([
        {
          id: "1",
          title: "New Risk Analysis Available",
          message: "A new risk analysis for Project Alpha has been completed.",
          type: "info",
          read: false,
          date: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
          link: "/risk-analysis",
        },
        {
          id: "2",
          title: "Security Alert",
          message: "Potential vulnerability detected in Project Beta's smart contract.",
          type: "warning",
          read: false,
          date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
          link: "/risk-analysis",
        },
        {
          id: "3",
          title: "Analysis Complete",
          message: "Document analysis for WhitePaper-XYZ has been completed.",
          type: "success",
          read: true,
          date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
          link: "/analysis-history",
        },
      ])
    }
  }, [])

  // Save notifications to localStorage when they change
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications))
  }, [notifications])

  const unreadCount = notifications.filter((n) => !n.read).length

  const addNotification = (notification: Omit<Notification, "id" | "read" | "date">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      read: false,
      date: new Date(),
    }
    setNotifications((prev) => [newNotification, ...prev])
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAllNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
