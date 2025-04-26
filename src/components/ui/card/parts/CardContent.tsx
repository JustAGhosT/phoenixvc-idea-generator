import { cn } from '@/utils/classnames';
import React from 'react';
import styles from '../Card.module.css';

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Card content
   */
  children: React.ReactNode;
}

/**
 * Container for the main content of a card
 */
export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(({
  className,
  children,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(styles.card__content, className)}
      {...props}
    >
      {children}
    </div>
  );
});

CardContent.displayName = "CardContent";

export default CardContent;