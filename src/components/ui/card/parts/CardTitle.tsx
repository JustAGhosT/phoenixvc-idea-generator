import { cn } from '@/utils/classnames';
import React from 'react';
import styles from '../Card.module.css';

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Title content
   */
  children: React.ReactNode;
  
  /**
   * HTML heading level
   * @default "h3"
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/**
 * Card title component for displaying the card title
 */
export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(({
  className,
  children,
  as: Heading = 'h3',
  ...props
}, ref) => {
  return (
    <Heading
      ref={ref}
      className={cn(styles['card__title'], className)}
      {...props}
    >
      {children}
    </Heading>
  );
});

CardTitle.displayName = "CardTitle";

export default CardTitle;