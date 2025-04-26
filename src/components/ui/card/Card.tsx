import React from 'react';
import { cn } from '@/utils/classnames';
import styles from './Card.less';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Card variant
   * @default "default"
   */
  variant?: 'default' | 'outline' | 'elevated';
  
  /**
   * Card padding size
   * @default "md"
   */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  
  /**
   * Whether the card should take full width
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * Card content
   */
  children: React.ReactNode;
}

/**
 * Card component for containing content in a defined box with various styling options.
 * 
 * @example
 * ```tsx
 * <Card>
 *   <h3>Card Title</h3>
 *   <p>Card content goes here</p>
 * </Card>
 * 
 * <Card variant="outline" padding="lg">
 *   <h3>Outlined Card</h3>
 *   <p>With larger padding</p>
 * </Card>
 * ```
 */
export function Card({
  variant = 'default',
  padding = 'md',
  fullWidth = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        styles.card,
        styles[`card--${variant}`],
        styles[`card--padding-${padding}`],
        fullWidth && styles['card--full-width'],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Card header component
 */
Card.Header = function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(styles['card__header'], className)}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Card content component
 */
Card.Content = function CardContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(styles['card__content'], className)}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Card footer component
 */
Card.Footer = function CardFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(styles['card__footer'], className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;