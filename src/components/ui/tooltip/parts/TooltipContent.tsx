"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cn } from "@/utils/classnames"
import styles from "../Tooltip.module.css"
import animations from "../TooltipAnimations.module.css"

/**
 * TooltipContent component - Content displayed in the tooltip
 * 
 * @example
 * ```tsx
 * <Tooltip>
 *   <Tooltip.Trigger>Hover me</Tooltip.Trigger>
 *   <Tooltip.Content>Tooltip content</Tooltip.Content>
 * </Tooltip>
 * ```
 */
export const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      // Core styles
      styles.tooltipContent,
      // Animation styles
      animations.tooltipAnimation,
      // Custom classes
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = "TooltipContent"