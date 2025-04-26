import { cn } from '@/utils/classnames';
import React from 'react';
import styles from '../Card.module.css';
import animations from '../CardAnimations.module.css';

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Header content
   */
  children: React.ReactNode;
  /**
   * Whether this header contains action elements that should be aligned to the right
   * @default false
   */
  withActions?: boolean;
  /**
   * Whether to animate the header
   * @default false
   */
  animate?: boolean;
}

/**
 * Card header component for displaying titles and actions
 */
export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(({
  className,
  children,
  withActions = false,
  animate = false,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        styles['card__header'], 
        withActions && styles['card__header--with-actions'],
        animate && animations.cardHeaderSlide,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

CardHeader.displayName = "CardHeader";

export default CardHeader;