import React, { forwardRef } from 'react';
import { cn } from '@/utils/classnames';
import styles from './Button.module.css';
import animations from './ButtonAnimations.module.css';
import { ButtonIcon } from './parts/ButtonIcon';
import { ButtonSpinner } from './parts/ButtonSpinner';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonColor = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The visual style variant of the button */
  variant?: ButtonVariant;
  
  /** The size of the button */
  size?: ButtonSize;
  
  /** The color scheme of the button */
  color?: ButtonColor;
  
  /** Whether the button is disabled */
  disabled?: boolean;
  
  /** Whether the button is in a loading state */
  loading?: boolean;
  
  /** Text to display when in loading state */
  loadingText?: string;
  
  /** Whether to show a spinner when in loading state */
  showSpinner?: boolean;
  
  /** Icon to display before the button text */
  leftIcon?: React.ReactNode;
  
  /** Icon to display after the button text */
  rightIcon?: React.ReactNode;
  
  /** Whether the button should take the full width of its container */
  fullWidth?: boolean;
  
  /** Whether the button has a rounded appearance */
  rounded?: boolean;
  
  /** Whether the button has a pill appearance (fully rounded) */
  pill?: boolean;
  
  /** Whether the button is an icon-only button */
  iconButton?: boolean;
  
  /** Whether the button is in an active state */
  active?: boolean;
  
  /** Animation effect to apply to the button */
  animation?: 'none' | 'scale' | 'lift' | 'pulse';
  
  /** Whether to show ripple effect on click */
  ripple?: boolean;
  
  /** Additional CSS class for the button */
  className?: string;
}

/**
 * Button component for user interactions.
 * 
 * @example
 * ```tsx
 * <Button>Click me</Button>
 * 
 * <Button variant="outline" color="primary">Outline Button</Button>
 * 
 * <Button leftIcon={<IconMail />}>Send Email</Button>
 * 
 * <Button loading loadingText="Saving...">Save</Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    children,
    variant = 'primary',
    size = 'md',
    color = 'primary',
    disabled = false,
    loading = false,
    loadingText,
    showSpinner = true,
    leftIcon,
    rightIcon,
    fullWidth = false,
    rounded = false,
    pill = false,
    iconButton = false,
    active = false,
    animation = 'none',
    ripple = true,
    type = 'button',
    className,
    ...props
  }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    
    // Determine if animations should be applied
    const shouldAnimate = !prefersReducedMotion && animation !== 'none';
    
    // Get animation class based on animation prop
    const getAnimationClass = () => {
      if (!shouldAnimate) return '';
      
      switch (animation) {
        case 'scale':
          return animations.hoverScale;
        case 'lift':
          return animations.hoverLift;
        case 'pulse':
          return animations.pulse;
        default:
          return '';
      }
    };
    
    // Apply appropriate classes
    const buttonClasses = cn(
      styles.button,
      // Variant
      styles[variant],
      // Color
      styles[`color${color.charAt(0).toUpperCase() + color.slice(1)}`],
      // Size (different for icon buttons)
      iconButton ? styles[`icon${size.charAt(0).toUpperCase() + size.slice(1)}`] : styles[size],
      // States
      disabled || loading ? styles.disabled : '',
      loading ? styles.loading : '',
      active ? styles.active : '',
      fullWidth ? styles.fullWidth : '',
      // Shape
      rounded ? styles.rounded : '',
      pill ? styles.pill : '',
      // Animations
      shouldAnimate ? animations.buttonAnimation : '',
      getAnimationClass(),
      ripple && !prefersReducedMotion ? animations.ripple : '',
      loading && !prefersReducedMotion ? animations.shimmer : '',
      className
    );

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={buttonClasses}
        aria-busy={loading}
        {...props}
      >
        {loading && showSpinner && (
          <ButtonSpinner className={cn(styles.leftIcon, animations.spinnerAnimation)} />
        )}
        
        {leftIcon && !loading && (
          <ButtonIcon className={styles.leftIcon}>
            {leftIcon}
          </ButtonIcon>
        )}
        
        {loading && loadingText ? loadingText : children}
        
        {rightIcon && !loading && (
          <ButtonIcon className={styles.rightIcon}>
            {rightIcon}
          </ButtonIcon>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;