"use client"

import { cn } from "@/utils/classnames";
import React from 'react';
import styles from './sidebar.module.css';

interface SidebarRootProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether the sidebar is expanded or collapsed
   */
  expanded?: boolean;
  /**
   * Whether the sidebar is open on mobile
   */
  open?: boolean;
}

/**
 * Root sidebar component that serves as the container for all sidebar elements
 */
export function SidebarRoot({
  children,
  className,
  expanded = true,
  open = false,
  ...props
}: SidebarRootProps) {
  return (
    <div
      className={cn(
        styles.root,
        expanded ? styles.expanded : styles.collapsed,
        className
      )}
      data-state={open ? "open" : "closed"}
      {...props}
    >
      {children}
    </div>
  );
}