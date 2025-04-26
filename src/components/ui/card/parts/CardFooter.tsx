import { cn } from '@/utils/classnames';
import React from 'react';
import styles from '../Card.module.css';

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Footer content
   */
  children: React.ReactNode;
}

/**
 * Card footer component for displaying actions or summary information
 */
export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(({
  className,
  children,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(styles['card__footer'], className)}
      {...props}
    >
      {children}
    </div>
  );
});

CardFooter.displayName = "CardFooter";

export default CardFooter;