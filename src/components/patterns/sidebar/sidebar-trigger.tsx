"use client"

import { Button } from "@/components/ui/button";
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from "@/utils/classnames";
import { ChevronRight, X } from "lucide-react";
import React from 'react';
import styles from './sidebar.module.css';

// Only include the props we want to pass through
type ButtonHTMLProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>;

interface SidebarTriggerProps extends ButtonHTMLProps {
  /**
   * Whether the sidebar is currently open
   */
  isOpen?: boolean;
  /**
   * Callback function when the trigger is clicked
   */
  onToggle?: () => void;
}

/**
 * Trigger button for toggling the sidebar on mobile devices
 */
export function SidebarTrigger({
  className,
  isOpen = false,
  onToggle,
  ...props
}: SidebarTriggerProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggle}
      className={cn(styles.trigger, className)}
      {...props}
    >
      {isOpen ? 
        <X className={styles.triggerIcon} /> : 
        <ChevronRight className={styles.triggerIcon} />
      }
      <span className="sr-only">Toggle sidebar</span>
    </Button>
  );
}