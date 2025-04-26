import React from 'react';
import { cn } from '@/utils/classnames';
import styles from './Badge.less';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The content to display inside the badge
   */
  children: React.ReactNode;
  
  /**
   * The variant of the badge
   * @default "default"
   */
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  
  /**
   * The size of the badge
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Whether the badge should be rounded
   * @default false
   */
  rounded?: boolean;
  
  /**
   * Whether the badge should be outlined instead of filled
   * @default false
   */
  outline?: boolean;
}

/**
 * Badge component for displaying short status descriptors.
 * 
 * @example
 * ```tsx
 * <Badge>Default</Badge>
 * <Badge variant="primary">Primary</Badge>
 * <Badge variant="success">Success</Badge>
 * <Badge variant="danger">Error</Badge>
 * 
 * <Badge rounded>42</Badge>
 * <Badge outline variant="primary">New</Badge>
 * ```
 */
export function Badge({
  children,
  variant = 'default',
  size = 'md',
  rounded = false,
  outline = false,
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        styles.badge,
        styles[`badge--${variant}`],
        styles[`badge--${size}`],
        rounded && styles['badge--rounded'],
        outline && styles['badge--outline'],
        outline && styles[`badge--outline-${variant}`],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;