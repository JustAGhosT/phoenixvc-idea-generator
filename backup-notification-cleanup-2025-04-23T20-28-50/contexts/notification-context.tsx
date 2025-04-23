"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

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

interface NotificationContextProps {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "read" | "date">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
  clearAllNotifications: () => void
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined)

export function useNotificationContext() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotificationContext must be used within a NotificationProvider")
  }
  return context
}

// Alias for backward compatibility
export const useNotifications = useNotificationContext;

interface NotificationProviderProps {
  children: React.ReactNode
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  // Calculate unread count
  const unreadCount = notifications.filter(n => !n.read).length
  // Load notifications from localStorage on mount
  useEffect(() => {
    const savedNotifications = localStorage.getItem("notifications")
    if (savedNotifications) {
      try {
        const parsed = JSON.parse(savedNotifications)
        // Convert string dates back to Date objects
        const withDates = parsed.map((item: any) => ({
          ...item,
          date: new Date(item.date)
        }))
        setNotifications(withDates)
      } catch (e) {
        console.error("Failed to parse notifications", e)
      }
    }
  }, [])

  // Save notifications to localStorage when they change
  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem("notifications", JSON.stringify(notifications))
    } else {
      localStorage.removeItem("notifications")
    }
  }, [notifications])

  const addNotification = (notification: Omit<Notification, "id" | "read" | "date">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      read: false,
      date: new Date()
    }
    setNotifications(prev => [newNotification, ...prev])
  }

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    )
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
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
        clearAllNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}