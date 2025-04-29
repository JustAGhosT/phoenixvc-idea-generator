"use client"

import { cn } from "@/utils/classnames";
import React from 'react';
import { SidebarOverlay } from './sidebar-overlay';
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
  /**
   * Callback when the overlay is clicked (typically to close the sidebar)
   */
  onOverlayClick?: () => void;
}

/**
 * Root sidebar component that serves as the container for all sidebar elements
 */
export function SidebarRoot({
  children,
  className,
  expanded = true,
  open = false,
  onOverlayClick,
  ...props
}: SidebarRootProps) {
  // Render the root div first to maintain compatibility with tests
  const rootElement = (
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

  // If onOverlayClick is provided, wrap with overlay
  if (onOverlayClick) {
    return (
      <>
        <SidebarOverlay visible={open} onClick={onOverlayClick} />
        {rootElement}
      </>
    );
  }

  // Otherwise just return the root element
  return rootElement;
}
