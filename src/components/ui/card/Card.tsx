import { cn } from '@/utils/classnames';
import React from 'react';
import styles from './Card.module.css';
import animations from './CardAnimations.module.css';

export type CardVariant = 
  | 'default' 
  | 'outline' 
  | 'elevated' 
  | 'filled' 
  | 'gradient' 
  | 'ghost';

export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export type CardAnimation = 
  | 'enter'
  | 'hover'
  | 'elevate'
  | 'pulse'
  | 'gradient-shift'
  | 'border-glow'
  | 'staggered'
  | 'flip'
  | 'none';

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
   * Animation type for the card
   * @default 'none'
   */
  animation?: CardAnimation;
  
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
  animation = 'none',
  className,
  children,
  ...props
}, ref) => {
  // Map animation prop to animation class
  const getAnimationClass = () => {
    switch (animation) {
      case 'enter':
        return animations.cardEnter;
      case 'hover':
        return animations.cardHover;
      case 'elevate':
        return animations.cardElevate;
      case 'pulse':
        return animations.cardPulse;
      case 'gradient-shift':
        return animations.cardGradientShift;
      case 'border-glow':
        return animations.cardBorderGlow;
      case 'staggered':
        return animations.cardStaggered;
      case 'flip':
        return animations.cardFlip;
      case 'none':
      default:
        return '';
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        styles.card,
        styles[`card--${variant}`],
        styles[`card--padding-${padding}`],
        interactive && styles['card--interactive'],
        fullWidth && styles['card--full-width'],
        animations.cardTransition,
        getAnimationClass(),
        // If interactive is true and no animation is specified, apply hover animation
        interactive && animation === 'none' && animations.cardHover,
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