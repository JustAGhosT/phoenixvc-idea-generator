"use client"

import * as TooltipPrimitive from "@radix-ui/react-tooltip"

/**
 * TooltipProvider component - Provides context for all tooltips
 * 
 * @example
 * ```tsx
 * <TooltipProvider>
 *   <Tooltip>
 *     <Tooltip.Trigger>Hover me</Tooltip.Trigger>
 *     <Tooltip.Content>Tooltip content</Tooltip.Content>
 *   </Tooltip>
 * </TooltipProvider>
 * ```
 */
export const TooltipProvider = TooltipPrimitive.Provider
TooltipProvider.displayName = "TooltipProvider"