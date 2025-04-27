"use client"

import { cn } from "@/utils/classnames";
import React from 'react';
import styles from './sidebar.module.css';
import animations from './SidebarAnimations.module.css';

interface SidebarOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether the overlay is visible
   */
  visible: boolean;
  /**
   * Callback when the overlay is clicked
   */
  onClick?: () => void;
}

/**
 * Backdrop overlay for mobile view when sidebar is open
 */
export function SidebarOverlay({
  className,
  visible,
  onClick,
  ...props
}: SidebarOverlayProps) {
  return (
    <div
      className={cn(
        styles.overlay,
        visible ? animations.mobileOverlay : animations.mobileOverlayHidden,
        className
      )}
      onClick={onClick}
      aria-hidden="true"
      {...props}
    />
  );
}