import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useSidebarContext } from '@/contexts/sidebar-context';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from "@/utils/classnames";
import Link from 'next/link';
import React from 'react';
import styles from './sidebar.module.css';
import animations from './SidebarAnimations.module.css';

interface SidebarItemProps {
  /**
   * Navigation URL
   */
  href: string;
  /**
   * Icon element
   */
  icon: React.ReactNode;
  /**
   * Item title
   */
  title: string;
  /**
   * Optional badge text or element
   */
  badge?: React.ReactNode | string;
  /**
   * Whether the item is active
   */
  isActive: boolean;
  /**
   * Whether the sidebar is open/expanded (optional, will use context if not provided)
   */
  isOpen?: boolean;
  /**
   * Item index for staggered animations
   */
  itemIndex?: number;
}

export function SidebarItem({ 
  href, 
  icon, 
  title, 
  badge, 
  isActive, 
  isOpen: isOpenProp, 
  itemIndex = 0 
}: SidebarItemProps) {
  // Use context as fallback if isOpen prop is not provided
  const context = useSidebarContext();
  const isOpen = isOpenProp !== undefined ? isOpenProp : context.isOpen;
  
  // Safe to use in tests
  const prefersReducedMotion = useReducedMotion();
  
  // Only apply animations if reduced motion is not preferred
  const animationClasses = !prefersReducedMotion ? {
    itemEnter: animations.itemEnter,
    itemEnterActive: animations.itemEnterActive,
    itemExit: animations.itemExit,
    itemExitActive: animations.itemExitActive,
  } : {};
  
  const content = (
    <Link 
      href={href} 
      className={cn(
        styles.sidebarMenuButton,
        isActive && styles.sidebarMenuButtonActive,
        animations.itemHover,
        animations.transition
      )}
      style={{ '--item-index': itemIndex } as React.CSSProperties}
    >
      <span className={cn(
        styles.sidebarMenuItemIcon, 
        isActive && animations.fadeIn,
        isOpen ? animationClasses.itemEnterActive : animationClasses.itemExitActive
      )}>
        {icon}
      </span>
      {isOpen && (
        <>
          <span className={cn(
            styles.sidebarMenuItemText, 
            animations.fadeIn,
            animationClasses.itemEnterActive
          )}>
            {title}
          </span>
          {badge && (
            <Badge className={cn(
              styles.sidebarMenuItemBadge, 
              animations.fadeIn,
              animationClasses.itemEnterActive,
              typeof badge === 'string' ? undefined : animations.transition
            )}>
              {badge}
            </Badge>
          )}
        </>
      )}
    </Link>
  );
  
  if (!isOpen) {
    return (
      <li className={cn(styles.sidebarMenuItem, animations.transition)}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className={cn(styles.sidebarMenuButtonCollapsed, animations.transition)}>
                {content}
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">{title}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </li>
    );
  }
  
  return <li className={cn(styles.sidebarMenuItem, animations.transition)}>{content}</li>;
}
