"use client"

import { cn } from "@/utils/classnames";
import React from 'react';
import styles from './sidebar.module.css';

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether the sidebar is in collapsed state
   */
  collapsed?: boolean;
}

/**
 * Header component for the sidebar, typically contains logo and toggle button
 */
export function SidebarHeader({
  children,
  className,
  collapsed = false,
  ...props
}: SidebarHeaderProps) {
  return (
    <div
      className={cn(
        styles.sidebarHeader,
        collapsed && styles.sidebarHeaderCollapsed,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}