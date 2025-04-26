/**
 * Button component
 * 
 * A versatile button component that supports various styles, sizes, and states.
 */

import React, { forwardRef } from 'react';
import { cn } from '@/utils/classnames';
import styles from './Button.less';
import { 
  ComponentProps, 
  SizeProps, 
  VariantProps, 
  ColorProps, 
  InteractiveProps 
} from '@/types/component-props';

export interface ButtonProps extends 
  ComponentProps<
    React.ButtonHTMLAttributes<HTMLButtonElement> & 
    SizeProps & 
    VariantProps & 
    ColorProps & 
    InteractiveProps
  > {
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
  /** Whether the button is in a loading state */
  loading?: boolean;
  /** Text to show when in loading state */
  loadingText?: string;
  /** Whether to show the spinner when in loading state */
  showSpinner?: boolean;
  /** Whether the button is an icon-only button */
  iconButton?: boolean;
  /** Type of the button */
  type?: 'button' | 'submit' | 'reset';
}

/**
 * Button component
 * 
 * @example
 * // Basic usage
 * <Button>Click me</Button>
 * 
 * @example
 * // With variants and colors
 * <Button variant="outline" color="primary">Outline Button</Button>
 * 
 * @example
 * // With icons
 * <Button leftIcon={<IconMail />}>Send Email</Button>
 * 
 * @example
 * // Loading state
 * <Button loading loadingText="Saving...">Save</Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      color = 'primary',
      disabled = false,
      loading = false,
      active = false,
      fullWidth = false,
      rounded = false,
      pill = false,
      leftIcon,
      rightIcon,
      loadingText,
      showSpinner = true,
      iconButton = false,
      type = 'button',
      ...props
    },
    ref
  ) => {
    // Base classes
    const baseClasses = "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
    
    // Size classes
    const sizeClasses = {
      'xs': 'text-xs py-1 px-2',
      'sm': 'text-sm py-1.5 px-3',
      'md': 'text-base py-2 px-4',
      'lg': 'text-lg py-2.5 px-5',
      'xl': 'text-xl py-3 px-6',
    };
    
    // Variant classes
    const variantClasses = {
      'primary': {
        'primary': 'bg-primary text-white hover:bg-primary-dark focus-visible:ring-primary',
        'success': 'bg-success text-white hover:bg-success-dark focus-visible:ring-success',
        'warning': 'bg-warning text-white hover:bg-warning-dark focus-visible:ring-warning',
        'danger': 'bg-danger text-white hover:bg-danger-dark focus-visible:ring-danger',
        'info': 'bg-info text-white hover:bg-info-dark focus-visible:ring-info',
        'default': 'bg-gray-800 text-white hover:bg-gray-900 focus-visible:ring-gray-800',
      },
      'secondary': {
        'primary': 'bg-primary-light text-primary-dark hover:bg-primary-light/80 focus-visible:ring-primary',
        'success': 'bg-success-light text-success-dark hover:bg-success-light/80 focus-visible:ring-success',
        'warning': 'bg-warning-light text-warning-dark hover:bg-warning-light/80 focus-visible:ring-warning',
        'danger': 'bg-danger-light text-danger-dark hover:bg-danger-light/80 focus-visible:ring-danger',
        'info': 'bg-info-light text-info-dark hover:bg-info-light/80 focus-visible:ring-info',
        'default': 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus-visible:ring-gray-800',
      },
      'outline': {
        'primary': 'border border-primary text-primary hover:bg-primary/10 focus-visible:ring-primary',
        'success': 'border border-success text-success hover:bg-success/10 focus-visible:ring-success',
        'warning': 'border border-warning text-warning hover:bg-warning/10 focus-visible:ring-warning',
        'danger': 'border border-danger text-danger hover:bg-danger/10 focus-visible:ring-danger',
        'info': 'border border-info text-info hover:bg-info/10 focus-visible:ring-info',
        'default': 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-800',
      },
      'ghost': {
        'primary': 'text-primary hover:bg-primary/10 focus-visible:ring-primary',
        'success': 'text-success hover:bg-success/10 focus-visible:ring-success',
        'warning': 'text-warning hover:bg-warning/10 focus-visible:ring-warning',
        'danger': 'text-danger hover:bg-danger/10 focus-visible:ring-danger',
        'info': 'text-info hover:bg-info/10 focus-visible:ring-info',
        'default': 'text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-800',
      },
      'link': {
        'primary': 'text-primary hover:underline p-0 focus-visible:ring-primary',
        'success': 'text-success hover:underline p-0 focus-visible:ring-success',
        'warning': 'text-warning hover:underline p-0 focus-visible:ring-warning',
        'danger': 'text-danger hover:underline p-0 focus-visible:ring-danger',
        'info': 'text-info hover:underline p-0 focus-visible:ring-info',
        'default': 'text-gray-700 hover:underline p-0 focus-visible:ring-gray-800',
      },
    };
    
    // Shape classes
    const shapeClasses = {
      'rounded': 'rounded-md',
      'pill': 'rounded-full',
      'default': 'rounded',
    };
    
    // State classes
    const stateClasses = {
      'disabled': 'opacity-50 cursor-not-allowed pointer-events-none',
      'loading': 'cursor-wait',
      'active': 'transform scale-95',
      'fullWidth': 'w-full',
      'iconButton': {
        'xs': 'p-1',
        'sm': 'p-1.5',
        'md': 'p-2',
        'lg': 'p-2.5',
        'xl': 'p-3',
      },
    };
    
    // Determine shape class
    let shapeClass = shapeClasses.default;
    if (rounded) shapeClass = shapeClasses.rounded;
    if (pill) shapeClass = shapeClasses.pill;
    
    // Determine icon button padding
    const iconButtonClass = iconButton ? stateClasses.iconButton[size] : '';
    
    // Combine all classes
    const buttonClasses = cn(
      baseClasses,
      shapeClass,
      variantClasses[variant][color],
      iconButton ? iconButtonClass : sizeClasses[size],
      disabled || loading ? stateClasses.disabled : '',
      loading ? stateClasses.loading : '',
      active ? stateClasses.active : '',
      fullWidth ? stateClasses.fullWidth : '',
      styles.button,
      className
    );
    
    // Loading spinner
    const LoadingSpinner = () => (
      <svg 
        className={cn("animate-spin -ml-1 mr-2 h-4 w-4", styles.spinner)} 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        />
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
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
        {loading && showSpinner && <LoadingSpinner />}
        {leftIcon && !loading && <span className="mr-2">{leftIcon}</span>}
        {loading && loadingText ? loadingText : children}
        {rightIcon && !loading && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;