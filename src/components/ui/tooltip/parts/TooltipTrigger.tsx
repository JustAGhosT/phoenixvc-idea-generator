"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

/**
 * TooltipTrigger component - Element that triggers the tooltip
 * 
 * @example
 * ```tsx
 * <Tooltip>
 *   <Tooltip.Trigger>Hover me</Tooltip.Trigger>
 *   <Tooltip.Content>Tooltip content</Tooltip.Content>
 * </Tooltip>
 * ```
 */
export const TooltipTrigger = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>
>((props, ref) => (
  <TooltipPrimitive.Trigger ref={ref} {...props} />
))
TooltipTrigger.displayName = "TooltipTrigger"