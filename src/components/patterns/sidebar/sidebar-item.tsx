import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
   * Whether the sidebar is open/expanded
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
  isOpen = true,
  itemIndex = 0 
}: SidebarItemProps) {
  const content = (
    <Link 
      href={href} 
      className={cn(
        styles.menuButton,
        isActive && styles.menuButtonActive,
        animations.itemHover,
        animations.transition
      )}
      style={{ '--item-index': itemIndex } as React.CSSProperties}
    >
      <span className={cn(
        styles.menuItemIcon, 
        isActive && animations.fadeIn,
        isOpen ? animations.itemEnterActive : animations.itemExitActive
      )}>
        {icon}
      </span>
      {isOpen && (
        <>
          <span className={cn(
            styles.menuItemText, 
            animations.fadeIn,
            animations.itemEnterActive
          )}>
            {title}
          </span>
          {badge && (
            <Badge className={cn(
              styles.menuItemBadge, 
              animations.fadeIn,
              animations.itemEnterActive,
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
      <li className={cn(styles.menuItem, animations.transition)}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className={cn(styles.menuButtonCollapsed, animations.transition)}>
                {content}
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">{title}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </li>
    );
  }
  
  return <li className={cn(styles.menuItem, animations.transition)}>{content}</li>;
}