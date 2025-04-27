"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface SidebarContextProps {
  /**
   * Whether the sidebar is currently open/expanded
   */
  isOpen: boolean
  
  /**
   * Toggle the sidebar open/closed state
   */
  toggleSidebar: () => void
  
  /**
   * Explicitly close the sidebar
   */
  closeSidebar: () => void
  
  /**
   * Explicitly open the sidebar
   */
  openSidebar: () => void
}

/**
 * Context for managing sidebar state across the application
 */
const SidebarContext = createContext<SidebarContextProps | undefined>(undefined)

/**
 * Hook to access the sidebar context
 * @returns The sidebar context values and methods
 * @throws Error if used outside of SidebarProvider
 */
export function useSidebarContext() {
  const context = useContext(SidebarContext)
  
  if (context === undefined) {
    throw new Error("useSidebarContext must be used within a SidebarProvider")
  }
  
  return context
}

interface SidebarProviderProps {
  /**
   * Initial state of the sidebar
   * @default true on desktop, false on mobile
   */
  initialOpen?: boolean
  
  /**
   * React children
   */
  children: React.ReactNode
}

/**
 * Provider component for sidebar state management
 */
export function SidebarProvider({
  initialOpen,
  children
}: SidebarProviderProps) {
  // Initialize with responsive default if initialOpen not provided
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    // If initialOpen is explicitly provided, use that
    if (initialOpen !== undefined) return initialOpen
    
    // Otherwise default to open on desktop, closed on mobile
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768
    }
    
    // Server-side default
    return true
  })
  
  // Update state based on screen size changes
  useEffect(() => {
    const handleResize = () => {
      // Only auto-close on small screens if not explicitly set by user
      if (initialOpen === undefined && window.innerWidth < 768) {
        setIsOpen(false)
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [initialOpen])
  
  // State management functions
  const toggleSidebar = () => setIsOpen(prev => !prev)
  const closeSidebar = () => setIsOpen(false)
  const openSidebar = () => setIsOpen(true)
  
  return (
    <SidebarContext.Provider 
      value={{ 
        isOpen, 
        toggleSidebar, 
        closeSidebar, 
        openSidebar 
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}