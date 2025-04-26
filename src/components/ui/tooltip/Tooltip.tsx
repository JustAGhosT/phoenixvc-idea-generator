"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

/**
 * Tooltip component - Root component for tooltip functionality
 * 
 * @example
 * ```tsx
 * <Tooltip>
 *   <Tooltip.Trigger>Hover me</Tooltip.Trigger>
 *   <Tooltip.Content>Tooltip content</Tooltip.Content>
 * </Tooltip>
 * ```
 */
const TooltipRoot = TooltipPrimitive.Root

// Import subcomponents
import { TooltipProvider } from './parts/TooltipProvider'
import { TooltipTrigger } from './parts/TooltipTrigger'
import { TooltipContent } from './parts/TooltipContent'

/**
 * Tooltip component - Compound component for tooltips
 */
const Tooltip = Object.assign(TooltipRoot, {
  Provider: TooltipProvider,
  Trigger: TooltipTrigger,
  Content: TooltipContent,
})

export {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  TooltipRoot,
}
export default Tooltip