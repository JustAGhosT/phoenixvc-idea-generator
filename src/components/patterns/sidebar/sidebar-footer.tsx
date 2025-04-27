"use client"

import { cn } from "@/utils/classnames";
import React from 'react';
import styles from './sidebar.module.css';

interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Footer component for the sidebar, typically contains additional information or actions
 */
export function SidebarFooter({
  children,
  className,
  ...props
}: SidebarFooterProps) {
  return (
    <div
      className={cn(styles.footer, className)}
      {...props}
    >
      {children}
    </div>
  );
}