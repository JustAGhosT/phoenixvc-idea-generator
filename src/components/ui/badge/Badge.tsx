import React from 'react';
import { cn } from '@/utils/classnames';
import styles from './Badge.module.css';
import animations from './BadgeAnimations.module.css';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeAnimation = 'none' | 'pulse' | 'glow' | 'bounce' | 'fadeIn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The content to display inside the badge
   */
  children: React.ReactNode;
  
  /**
   * The variant of the badge
   * @default "default"
   */
  variant?: BadgeVariant;
  
  /**
   * The size of the badge
   * @default "md"
   */
  size?: BadgeSize;
  
  /**
   * Whether the badge should be rounded
   * @default false
   */
  rounded?: boolean;
  
  /**
   * Whether the badge should be outlined instead of filled
   * @default false
   */
  outline?: boolean;
  
  /**
   * Whether the badge should have a soft/subtle appearance
   * @default false
   */
  soft?: boolean;
  
  /**
   * Whether to show a dot indicator
   * @default false
   */
  withDot?: boolean;
  
  /**
   * Icon to display before the badge text
   */
  leftIcon?: React.ReactNode;
  
  /**
   * Icon to display after the badge text
   */
  rightIcon?: React.ReactNode;
  
  /**
   * Whether the badge is interactive (clickable)
   * @default false
   */
  interactive?: boolean;
  
  /**
   * Animation effect to apply to the badge
   * @default "none"
   */
  animation?: BadgeAnimation;
  
  /**
   * Whether to apply a hover effect
   * @default false
   */
  hoverEffect?: 'none' | 'scale' | 'lift';
}

/**
 * Badge component for displaying status, counts, or short pieces of information.
 * 
 * @example
 * ```tsx
 * <Badge>Default</Badge>
 * <Badge variant="primary">Primary</Badge>
 * <Badge variant="success">Success</Badge>
 * <Badge variant="danger">Error</Badge>
 * 
 * <Badge rounded>42</Badge>
 * <Badge outline variant="primary">New</Badge>
 * ```
 */
export function Badge({
  children,
  variant = 'default',
  size = 'md',
  rounded = false,
  outline = false,
  soft = false,
  withDot = false,
  leftIcon,
  rightIcon,
  interactive = false,
  animation = 'none',
  hoverEffect = 'none',
  className,
  ...props
}: BadgeProps) {
  const prefersReducedMotion = useReducedMotion();
  
  // Determine if animations should be applied
  const shouldAnimate = !prefersReducedMotion && animation !== 'none';
  const shouldHoverAnimate = !prefersReducedMotion && hoverEffect !== 'none';
  
  // Get animation class based on animation prop
  const getAnimationClass = () => {
    if (!shouldAnimate) return '';
    
    switch (animation) {
      case 'pulse':
        return animations.pulse;
      case 'glow':
        return animations.glow;
      case 'bounce':
        return animations.bounce;
      case 'fadeIn':
        return animations.fadeIn;
      default:
        return '';
    }
  };
  
  // Get hover animation class based on hoverEffect prop
  const getHoverAnimationClass = () => {
    if (!shouldHoverAnimate) return '';
    
    switch (hoverEffect) {
      case 'scale':
        return animations.hoverScale;
      case 'lift':
        return animations.hoverLift;
      default:
        return '';
    }
  };
  
  // Determine the style variant
  const getVariantClasses = () => {
    if (outline) {
      return [
        styles.outline,
        styles[`outline${variant.charAt(0).toUpperCase() + variant.slice(1)}`]
      ];
    }
    
    if (soft) {
      return [
        styles.soft,
        styles[`soft${variant.charAt(0).toUpperCase() + variant.slice(1)}`]
      ];
    }
    
    return [styles[variant]];
  };
  
  return (
    <span
      className={cn(
        styles.badge,
        styles[size],
        ...getVariantClasses(),
        rounded && styles.rounded,
        withDot && styles.withDot,
        (leftIcon || rightIcon) && styles.withIcon,
        interactive && styles.interactive,
        shouldAnimate && animations.badgeAnimation,
        getAnimationClass(),
        getHoverAnimationClass(),
        className
      )}
      {...props}
    >
      {withDot && (
        <span className={cn(
          styles.dot,
          styles[`dot${variant.charAt(0).toUpperCase() + variant.slice(1)}`]
        )} />
      )}
      
      {leftIcon && (
        <span className={styles.leftIcon}>
          {leftIcon}
        </span>
      )}
      
      {children}
      
      {rightIcon && (
        <span className={styles.rightIcon}>
          {rightIcon}
        </span>
      )}
    </span>
  );
}

export default Badge;