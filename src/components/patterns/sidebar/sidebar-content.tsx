"use client"

import { cn } from "@/utils/classnames";
import React from 'react';
import styles from './sidebar.module.css';

interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Content container for the sidebar, typically contains navigation items
 */
export function SidebarContent({
  children,
  className,
  ...props
}: SidebarContentProps) {
  return (
    <div
      className={cn(styles.content, className)}
      {...props}
    >
      {children}
    </div>
  );
}