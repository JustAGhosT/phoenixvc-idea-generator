import { cn } from '@/utils/classnames';
import React from 'react';
import styles from '../Card.module.css';
import animations from '../CardAnimations.module.css';

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Footer content
   */
  children: React.ReactNode;
  /**
   * Whether to animate the footer
   * @default false
   */
  animate?: boolean;
}

/**
 * Card footer component for displaying actions or summary information
 */
export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(({
  className,
  children,
  animate = false,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        styles['card__footer'],
        animate && animations.cardFooterSlide,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

CardFooter.displayName = "CardFooter";

export default CardFooter;