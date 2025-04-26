import { cn } from '@/utils/classnames';
import React from 'react';
import styles from '../Card.module.css';

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * Description content
   */
  children: React.ReactNode;
}

/**
 * Card description component for displaying supporting text
 */
export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(({
  className,
  children,
  ...props
}, ref) => {
  return (
    <p
      ref={ref}
      className={cn(styles['card__description'], className)}
      {...props}
    >
      {children}
    </p>
  );
});

CardDescription.displayName = "CardDescription";

export default CardDescription;