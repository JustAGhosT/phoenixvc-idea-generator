import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/utils/classnames';
import React, { ElementType, forwardRef, useMemo, useState } from 'react';
import styles from './Button.module.css';
import animations from './ButtonAnimations.module.css';
import { ButtonIcon, ButtonSpinner } from './parts';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'default';

// Grouped props interfaces
export interface ButtonLoadingProps {
  /** Whether the button is in a loading state */
  isLoading?: boolean;
  /** Text to display when in loading state */
  loadingText?: string;
  /** Whether to show a spinner when in loading state */
  showSpinner?: boolean;
  /** Progress value for controlled loading (0-100) */
  progress?: number;
}

export interface ButtonIconProps {
  /** Icon to display before the button text */
  left?: React.ReactNode;
  /** Icon to display after the button text */
  right?: React.ReactNode;
  /** Whether the button is an icon-only button */
  only?: boolean;
}

export interface ButtonAnimationProps {
  /** Animation effect to apply to the button */
  effect?: 'none' | 'scale' | 'lift' | 'pulse';
  /** Whether to show ripple effect on click */
  ripple?: boolean;
}

// Base Button props
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The visual style variant of the button */
  variant?: ButtonVariant;
  
  /** The size of the button */
  size?: ButtonSize;
  
  /** The color scheme of the button */
  color?: ButtonColor;
  
  /** Whether the button is disabled */
  disabled?: boolean;
  
  /** Loading state configuration */
  loading?: boolean | ButtonLoadingProps;
  
  /** Icon configuration */
  icons?: ButtonIconProps;
  
  /** Animation configuration */
  animation?: ButtonAnimationProps | 'none' | 'scale' | 'lift' | 'pulse';
  
  /** Whether the button should take the full width of its container */
  fullWidth?: boolean;
  
  /** Whether the button has a rounded appearance */
  rounded?: boolean;
  
  /** Whether the button has a pill appearance (fully rounded) */
  pill?: boolean;
  
  /** Whether the button is in an active state */
  active?: boolean;
  
  /** Whether the button is in a pressed state (for toggle buttons) */
  pressed?: boolean;
  
  /** Element to render as (for polymorphic usage) */
  as?: ElementType;
  
  /** Whether to show ripple effect on click (legacy prop) */
  ripple?: boolean;
}

// Helper function for animation class - moved outside component
const getAnimationClass = (
  animation: ButtonAnimationProps['effect'] | 'none',
  shouldAnimate: boolean,
  animationStyles: typeof animations
): string => {
  if (!shouldAnimate) return '';
  
  switch (animation) {
    case 'scale':
      return animationStyles.hoverScale;
    case 'lift':
      return animationStyles.hoverLift;
    case 'pulse':
      return animationStyles.pulse;
    default:
      return '';
  }
    };
    
/**
 * Button component for user interactions.
 * 
 * @example
 * ```tsx
 * <Button>Click me</Button>
 * 
 * <Button variant="outline" color="primary">Outline Button</Button>
 * 
 * <Button icons={{ left: <IconMail /> }}>Send Email</Button>
 * 
 * <Button loading={{ isLoading: true, loadingText: "Saving..." }}>Save</Button>
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
    icons,
    animation = 'none',
    fullWidth = false,
    rounded = false,
    pill = false,
    active = false,
    pressed,
    as,
    className,
    onClick,
    onKeyDown,
    ripple: legacyRipple,
    ...props
  }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    const [rippleStyle, setRippleStyle] = useState<React.CSSProperties>({});
    const [isRippling, setIsRippling] = useState(false);
    
    // Use the provided component or default to button
    const Component = as || 'button';
    
    // Extract loading props
    const isLoading = typeof loading === 'boolean' ? loading : loading?.isLoading || false;
    const loadingText = typeof loading === 'object' ? loading.loadingText : undefined;
    const showSpinner = typeof loading === 'object' ? loading.showSpinner !== false : true;
    const progress = typeof loading === 'object' ? loading.progress : undefined;
    
    // Extract icon props
    const leftIcon = icons?.left;
    const rightIcon = icons?.right;
    const iconOnly = icons?.only || false;
    
    // Extract animation props
    const animationEffect = typeof animation === 'string' 
      ? animation 
      : animation?.effect || 'none';
    
    // Determine ripple effect (support both new and legacy prop)
    const useRipple = typeof animation === 'object' 
      ? animation.ripple !== false 
      : legacyRipple !== false;
    
    // Determine if animations should be applied
    const shouldAnimate = !prefersReducedMotion && animationEffect !== 'none';
    
    // Memoize animation class to prevent recalculation on every render
    const animationClass = useMemo(() => 
      getAnimationClass(animationEffect, shouldAnimate, animations), 
      [animationEffect, shouldAnimate]
    );
    
    // Handle ripple effect
    const handleRipple = (event: React.MouseEvent<HTMLElement>) => {
      if (!useRipple || prefersReducedMotion || disabled || isLoading) return;
      
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      
      const size = Math.max(rect.width, rect.height) * 2;
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;
      
      setRippleStyle({
        width: `${size}px`,
        height: `${size}px`,
        top: `${y}px`,
        left: `${x}px`,
      });
      
      setIsRippling(true);
      
      // Remove ripple after animation completes
      setTimeout(() => {
        setIsRippling(false);
      }, 600);
    };
    
    // Handle click event
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      handleRipple(event);
      
      if (onClick && !disabled && !isLoading) {
        onClick(event as any);
      }
    };
    
    // Handle keyboard events for enhanced navigation
    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
      // Space or Enter triggers click for buttons
      if (event.key === ' ' || event.key === 'Enter') {
        // Prevent default to avoid page scrolling for space key
        if (event.key === ' ') {
          event.preventDefault();
        }
        
        // Only trigger if not disabled or loading
        if (!disabled && !isLoading && onClick) {
          // Instead of converting the event, we'll create a synthetic click
          const target = event.currentTarget;
          
          // Simulate a click programmatically rather than converting the event
          target.click();
        }
      }
      
      // Call the original onKeyDown handler if provided
      if (onKeyDown) {
        onKeyDown(event as any);
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
      iconOnly ? styles[`icon${size.charAt(0).toUpperCase() + size.slice(1)}`] : styles[size],
      // States
      disabled || isLoading ? styles.disabled : '',
      isLoading ? styles.loading : '',
      active ? styles.active : '',
      fullWidth ? styles.fullWidth : '',
      // Shape
      rounded ? styles.rounded : '',
      pill ? styles.pill : '',
      // Animations
      shouldAnimate ? animations.buttonAnimation : '',
      animationClass,
      useRipple && !prefersReducedMotion ? styles.rippleContainer : '',
      isLoading && !prefersReducedMotion && !progress ? animations.shimmer : '',
      className
    );
    
    // Handle button-specific props
    const buttonSpecificProps: Record<string, any> = {};
    
    if (Component === 'button') {
      buttonSpecificProps.type = props.type || 'button';
      buttonSpecificProps.disabled = disabled || isLoading;
    } else {
      // For non-button elements like <a>, use aria-disabled instead
      if (disabled || isLoading) {
        buttonSpecificProps['aria-disabled'] = true;
        // Add tabIndex=-1 to remove from tab order when disabled
        buttonSpecificProps.tabIndex = -1;
  }
    }
    
    // Determine if an aria-label is needed for icon-only buttons
    const needsAriaLabel = iconOnly && !props['aria-label'] && !props['aria-labelledby'];
    
    // Create the content elements
    const contentElements = [];
    
    // Loading spinner
    if (isLoading && showSpinner && !progress) {
      contentElements.push(
        <ButtonSpinner 
          key="spinner"
          className={cn(styles.leftIcon, animations.spinnerAnimation)} 
          size={size === 'xs' || size === 'sm' ? 'sm' : size === 'lg' || size === 'xl' ? 'lg' : 'md'}
        />
);
    }
    
    // Progress bar
    if (isLoading && progress !== undefined) {
      contentElements.push(
        <div key="progress" className={styles.progressContainer}>
          <div 
            className={styles.progressBar} 
            style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      );
    }
    
    // Left icon
    if (leftIcon && !isLoading) {
      contentElements.push(
        <ButtonIcon key="leftIcon" className={styles.leftIcon}>
          {leftIcon}
        </ButtonIcon>
      );
    }
    
    // Content
    const content = isLoading && loadingText ? loadingText : children;
    if (content) {
      contentElements.push(
        <React.Fragment key="content">{content}</React.Fragment>
      );
    }
    
    // Right icon
    if (rightIcon && !isLoading) {
      contentElements.push(
        <ButtonIcon key="rightIcon" className={styles.rightIcon}>
          {rightIcon}
        </ButtonIcon>
      );
    }
    
    // Ripple effect
    if (useRipple && !prefersReducedMotion && isRippling) {
      contentElements.push(
        <span 
          key="ripple"
          className={styles.rippleEffect} 
          style={rippleStyle}
          aria-hidden="true"
        />
      );
    }
    
    // Render the button using a type-safe approach for the dynamic component
    if (typeof Component === 'string') {
      // For intrinsic elements (like 'button', 'a', etc.)
      return React.createElement(
        Component,
        {
          ref,
        className: buttonClasses,
        'aria-busy': isLoading,
        'aria-pressed': pressed,
        'aria-label': needsAriaLabel ? 'Button' : props['aria-label'],
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        ...buttonSpecificProps,
        ...props
      },
        ...contentElements
    );
    } else {
      // For React components
      return React.createElement(
        Component as React.ComponentType<any>,
        {
          ref,
          className: buttonClasses,
          'aria-busy': isLoading,
          'aria-pressed': pressed,
          'aria-label': needsAriaLabel ? 'Button' : props['aria-label'],
          onClick: handleClick,
          onKeyDown: handleKeyDown,
          ...buttonSpecificProps,
          ...props
        },
        ...contentElements
);
    }
  }
);

Button.displayName = 'Button';

export default Button;