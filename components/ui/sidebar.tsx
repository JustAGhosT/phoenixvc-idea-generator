"use client"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useSidebarContext } from "@/contexts/sidebar-context"
import { cn } from "@/lib/utils"
import { ChevronRight, X } from "lucide-react"
import * as React from "react"

// Context for nested sidebar components
const SidebarNestedContext = React.createContext<{
  isCollapsed: boolean
}>({
  isCollapsed: false,
})

export function Sidebar({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { isOpen } = useSidebarContext()
  
  return (
    <SidebarNestedContext.Provider value={{ isCollapsed: !isOpen }}>
      <div
        className={cn(
          "fixed inset-y-0 z-20 flex h-full flex-col border-r bg-background transition-all duration-300 data-[state=open]:translate-x-0 data-[state=closed]:-translate-x-full md:relative md:data-[state=closed]:translate-x-0",
          isOpen ? "md:w-64" : "md:w-16",
          className
        )}
        data-state={isOpen ? "open" : "closed"}
        {...props}
      >
        {children}
      </div>
    </SidebarNestedContext.Provider>
  )
}

export function SidebarHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { isCollapsed } = React.useContext(SidebarNestedContext)
  
  return (
    <div
      className={cn(
        "flex h-14 items-center border-b px-4",
        isCollapsed && "justify-center px-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function SidebarContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex-1 overflow-auto py-2", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function SidebarFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { isCollapsed } = React.useContext(SidebarNestedContext)
  
  if (isCollapsed) {
    return null
  }
  
  return (
    <div
      className={cn("border-t px-4 py-2", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function SidebarTrigger() {
  const { toggleSidebar, isOpen } = useSidebarContext()
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSidebar}
      className="h-8 w-8 md:hidden"
    >
      {isOpen ? <X className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      <span className="sr-only">Toggle sidebar</span>
    </Button>
  )
}

export function SidebarRail() {
  const { toggleSidebar } = useSidebarContext()
  
  return (
    <div
      className="absolute right-0 top-1/2 hidden h-20 w-1.5 -translate-y-1/2 cursor-ew-resize rounded-full bg-border opacity-0 transition-opacity hover:opacity-100 md:block"
      onMouseDown={(e) => {
        e.preventDefault()
        toggleSidebar()
      }}
    />
  )
}

export function SidebarGroup({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("py-2", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function SidebarGroupLabel({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { isCollapsed } = React.useContext(SidebarNestedContext)
  
  if (isCollapsed) {
    return null
  }
  
  return (
    <div
      className={cn("px-4 py-1 text-xs font-medium text-muted-foreground", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function SidebarGroupContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function SidebarMenu({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      className={cn("space-y-1 px-2", className)}
      {...props}
    >
      {children}
    </ul>
  )
}

export function SidebarMenuItem({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLLIElement>) {
  return (
    <li
      className={cn("", className)}
      {...props}
    >
      {children}
    </li>
  )
}

interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
  tooltip?: string
  asChild?: boolean
}

export function SidebarMenuButton({
  className,
  children,
  isActive,
  tooltip,
  asChild = false,
  ...props
}: SidebarMenuButtonProps) {
  const { isCollapsed } = React.useContext(SidebarNestedContext)
  
  // Create a wrapper component that will apply the className
  const content = (
    <div
      className={cn(
        "flex w-full items-center rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
        isActive && "bg-accent text-accent-foreground",
        className
      )}
    >
      {children}
    </div>
  )
  
  // If we're using asChild, we don't need to wrap with a button
  const wrappedContent = asChild ? content : (
    <button type="button" {...props}>
      {content}
    </button>
  )
  
  if (isCollapsed && tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex justify-center">
              {wrappedContent}
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">{tooltip}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }
  
  return wrappedContent
}