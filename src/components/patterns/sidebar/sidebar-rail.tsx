"use client"

import { cn } from "@/utils/classnames";
import React from 'react';
import styles from './sidebar.module.css';

interface SidebarRailProps {
  /**
   * Callback function when the rail is clicked/dragged
   */
  onResize?: (e: React.MouseEvent<HTMLDivElement>) => void;
  
  /**
   * Additional class names
   */
  className?: string;
  
  /**
   * Additional props
   */
  [key: string]: any;
}

/**
 * Rail component for resizing the sidebar
 */
export function SidebarRail({
  className,
  onResize,
  ...props
}: SidebarRailProps) {
  return (
    <div
      className={cn(styles.rail, className)}
      onMouseDown={(e) => {
        e.preventDefault();
        onResize?.(e);
      }}
      {...props}
    />
  );
}