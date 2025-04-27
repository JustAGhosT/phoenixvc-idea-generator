import React, { forwardRef, useState, useMemo } from 'react';
import { cn } from '@/utils/classnames';
import styles from './Button.module.css';
import animations from './ButtonAnimations.module.css';
import { ButtonIcon, ButtonSpinner } from './parts';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonColor = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default';

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

// Polymorphic component type
type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref'];

type PolymorphicComponentPropWithRef<
  C extends React.ElementType,
  Props = {}
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> };

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

// Base Button props
export interface ButtonProps {
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
  
  /** Additional CSS class for the button */
  className?: string;
  
  /** Whether to show ripple effect on click (legacy prop) */
  ripple?: boolean;
}

type ButtonComponentProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  ButtonProps
>;

type ButtonComponent = <C extends React.ElementType = 'button'>(
  props: ButtonComponentProps<C>
) => React.ReactElement | null;

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
export const Button: ButtonComponent = forwardRef(
  <C extends React.ElementType = 'button'>(
    {
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
    }: ButtonComponentProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as || 'button';
    const prefersReducedMotion = useReducedMotion();
    const [rippleStyle, setRippleStyle] = useState<React.CSSProperties>({});
    const [isRippling, setIsRippling] = useState(false);
    
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
        onClick(event);
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
          onClick(event as unknown as React.MouseEvent<HTMLElement>);
        }
      }
      
      // Call the original onKeyDown handler if provided
      if (onKeyDown) {
        onKeyDown(event);
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
    const buttonSpecificProps: Record<string, unknown> = {};
    
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
    
    return (
      <Component
        ref={ref}
        className={buttonClasses}
        aria-busy={isLoading}
        aria-pressed={pressed}
        aria-label={needsAriaLabel ? 'Button' : props['aria-label']}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...buttonSpecificProps}
        {...props}
      >
        {isLoading && showSpinner && !progress && (
          <ButtonSpinner 
            className={cn(styles.leftIcon, animations.spinnerAnimation)} 
            size={size === 'xs' || size === 'sm' ? 'sm' : size === 'lg' || size === 'xl' ? 'lg' : 'md'}
          />
        )}
        
        {isLoading && progress !== undefined && (
          <div className={styles.progressContainer}>
            <div 
              className={styles.progressBar} 
              style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        )}
        
        {leftIcon && !isLoading && (
          <ButtonIcon className={styles.leftIcon}>
            {leftIcon}
          </ButtonIcon>
        )}
        
        {isLoading && loadingText ? loadingText : children}
        
        {rightIcon && !isLoading && (
          <ButtonIcon className={styles.rightIcon}>
            {rightIcon}
          </ButtonIcon>
        )}
        
        {useRipple && !prefersReducedMotion && isRippling && (
          <span 
            className={styles.rippleEffect} 
            style={rippleStyle}
            aria-hidden="true"
          />
        )}
      </Component>
    );
  }
);

Button.displayName = 'Button';

export default Button;