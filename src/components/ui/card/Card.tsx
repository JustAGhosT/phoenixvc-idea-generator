import { cn } from '@/utils/classnames';
import React from 'react';
import styles from './Card.module.css';

export type CardVariant = 
  | 'default' 
  | 'outline' 
  | 'elevated' 
  | 'filled' 
  | 'gradient' 
  | 'ghost';

export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Card variant
   * @default 'default'
   */
  variant?: CardVariant;
  
  /**
   * Card padding
   * @default 'md'
   */
  padding?: CardPadding;
  
  /**
   * Makes the card interactive with hover effects
   * @default false
   */
  interactive?: boolean;
  
  /**
   * Makes the card take up full width of its container
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * Card content
   */
  children: React.ReactNode;
}

/**
 * Card component for containing content and actions
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(({
  variant = 'default',
  padding = 'md',
  interactive = false,
  fullWidth = false,
  className,
  children,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        styles.card,
        styles[`card--${variant}`],
        styles[`card--padding-${padding}`],
        interactive && styles['card--interactive'],
        fullWidth && styles['card--full-width'],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;