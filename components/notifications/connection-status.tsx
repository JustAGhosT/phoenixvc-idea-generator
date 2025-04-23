"use client"

import { notificationService } from "@/lib/notification-service"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface ConnectionStatusProps {
  className?: string
  showText?: boolean
  size?: "sm" | "md" | "lg"
}

export function ConnectionStatus({
  className,
  showText = true,
  size = "md"
}: ConnectionStatusProps) {
  const [status, setStatus] = useState<'connected' | 'disconnected' | 'error'>('disconnected')
  
  // Get the size classes
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "w-2 h-2"
      case "lg":
        return "w-4 h-4"
      case "md":
      default:
        return "w-3 h-3"
    }
  }
  
  // Get the status text
  const getStatusText = () => {
    switch (status) {
      case "connected":
        return "Connected"
      case "error":
        return "Connection error"
      case "disconnected":
      default:
        return "Disconnected"
    }
  }
  
  // Get the status color
  const getStatusColor = () => {
    switch (status) {
      case "connected":
        return "bg-green-500"
      case "error":
        return "bg-red-500"
      case "disconnected":
      default:
        return "bg-gray-400"
    }
  }
  
  // Set up listener for connection status
  useEffect(() => {
    if (typeof window === "undefined") return
    
    // Set initial status
    setStatus(notificationService.getConnectionStatus())
    
    // Add listener for connection status changes
    const removeListener = notificationService.addConnectionListener((newStatus) => {
      setStatus(newStatus)
    })
    
    return () => {
      removeListener()
    }
  }, [])
  
  return (
    <div className={cn("flex items-center", className)}>
      <div className={cn(
        "rounded-full",
        getSizeClasses(),
        getStatusColor()
      )} />
      
      {showText && (
        <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
          {getStatusText()}
        </span>
      )}
    </div>
  )
}