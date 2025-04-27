import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useSidebarContext } from '@/contexts/sidebar-context';
import { cn } from "@/utils/classnames";
import Link from 'next/link';
import React from 'react';
import styles from './sidebar.module.css';
import animations from './SidebarAnimations.module.css';

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  badge?: React.ReactNode | string;
  isActive: boolean;
}

export function SidebarItem({ href, icon, title, badge, isActive }: SidebarItemProps) {
  const { isOpen } = useSidebarContext();
  
  const content = (
    <Link 
      href={href} 
      className={cn(
        styles.menuButton,
        isActive && styles.menuButtonActive,
        animations.itemHover,
        animations.transition
      )}
    >
      <span className={cn(styles.menuItemIcon, isActive && animations.fadeIn)}>
        {icon}
      </span>
      {isOpen && (
        <>
          <span className={cn(styles.menuItemText, animations.fadeIn)}>
            {title}
          </span>
          {badge && (
            <Badge className={cn(
              styles.menuItemBadge, 
              animations.fadeIn,
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