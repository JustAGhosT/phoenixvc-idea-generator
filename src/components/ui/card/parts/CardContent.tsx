import { cn } from '@/utils/classnames';
import React from 'react';
import styles from '../Card.module.css';
import animations from '../CardAnimations.module.css';

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Card content
   */
  children: React.ReactNode;
  /**
   * Whether to animate the content
   * @default false
   */
  animate?: boolean;
}

/**
 * Container for the main content of a card
 */
export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(({
  className,
  children,
  animate = false,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        styles.card__content, 
        animate && animations.cardContentFade,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

CardContent.displayName = "CardContent";

export default CardContent;