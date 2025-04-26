/**
 * Input component
 * 
 * A versatile text input component that supports various styles, sizes, and states.
 */

import React, { forwardRef, useState } from 'react';
import { cn } from '@/utils/classnames';
import styles from './Input.less';
import { 
  ComponentProps, 
  SizeProps, 
  FormElementProps 
} from '@/types/component-props';

export interface InputProps extends 
  ComponentProps<
    React.InputHTMLAttributes<HTMLInputElement> & 
    SizeProps & 
    FormElementProps
  > {
  /** Icon to display before the input text */
  leftIcon?: React.ReactNode;
  /** Icon to display after the input text */
  rightIcon?: React.ReactNode;
  /** Whether the input should take the full width of its container */
  fullWidth?: boolean;
  /** Whether the input has a rounded appearance */
  rounded?: boolean;
  /** Whether the input has a pill appearance (fully rounded) */
  pill?: boolean;
  /** Clear button to reset input value */
  showClearButton?: boolean;
  /** Callback when clear button is clicked */
  onClear?: () => void;
  /** Whether to show the password toggle button for password inputs */
  showPasswordToggle?: boolean;
  /** Whether the input is in a loading state */
  loading?: boolean;
}

/**
 * Input component
 * 
 * @example
 * // Basic usage
 * <Input placeholder="Enter your name" />
 * 
 * @example
 * // With label and help text
 * <Input 
 *   label="Email" 
 *   placeholder="Enter your email" 
 *   helpText="We'll never share your email with anyone else."
 * />
 * 
 * @example
 * // With validation
 * <Input 
 *   label="Username" 
 *   hasError={true}
 *   errorMessage="Username is already taken"
 * />
 * 
 * @example
 * // With icons
 * <Input 
 *   leftIcon={<SearchIcon />} 
 *   placeholder="Search..." 
 * />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size = 'md',
      disabled = false,
      required = false,
      fullWidth = true,
      rounded = false,
      pill = false,
      label,
      helpText,
      hasError = false,
      errorMessage,
      leftIcon,
      rightIcon,
      showClearButton = false,
      onClear,
      showPasswordToggle = false,
      loading = false,
      placeholder,
      type = 'text',
      id,
      ...props
    },
    ref
  ) => {
    // Generate a unique ID for the input if not provided
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
    
    // State for password visibility toggle
    const [showPassword, setShowPassword] = useState(false);
    const actualType = type === 'password' && showPassword ? 'text' : type;
    
    // Base classes
    const baseClasses = "block w-full border bg-white text-gray-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
    
    // Size classes
    const sizeClasses = {
      'xs': 'text-xs py-1 px-2',
      'sm': 'text-sm py-1.5 px-3',
      'md': 'text-base py-2 px-4',
      'lg': 'text-lg py-2.5 px-5',
      'xl': 'text-xl py-3 px-6',
    };
    
    // Shape classes
    const shapeClasses = {
      'rounded': 'rounded-md',
      'pill': 'rounded-full',
      'default': 'rounded',
    };
    
    // State classes
    const stateClasses = {
      'disabled': 'opacity-50 cursor-not-allowed bg-gray-100',
      'error': 'border-danger focus-visible:ring-danger',
      'default': 'border-gray-300 focus-visible:ring-primary',
      'fullWidth': 'w-full',
      'withLeftIcon': 'pl-10',
      'withRightIcon': 'pr-10',
      'withPasswordToggle': 'pr-10',
      'withClearButton': 'pr-10',
      'loading': 'cursor-wait',
    };
    
    // Determine shape class
    let shapeClass = shapeClasses.default;
    if (rounded) shapeClass = shapeClasses.rounded;
    if (pill) shapeClass = shapeClasses.pill;
    
    // Determine state classes
    const inputStateClass = hasError ? stateClasses.error : stateClasses.default;
    const withLeftIconClass = leftIcon ? stateClasses.withLeftIcon : '';
    const withRightIconClass = rightIcon ? stateClasses.withRightIcon : '';
    const withPasswordToggleClass = type === 'password' && showPasswordToggle ? stateClasses.withPasswordToggle : '';
    const withClearButtonClass = showClearButton ? stateClasses.withClearButton : '';
    
    // Combine all classes
    const inputClasses = cn(
      baseClasses,
      shapeClass,
      sizeClasses[size],
      inputStateClass,
      disabled ? stateClasses.disabled : '',
      loading ? stateClasses.loading : '',
      fullWidth ? stateClasses.fullWidth : '',
      withLeftIconClass,
      withRightIconClass,
      withPasswordToggleClass,
      withClearButtonClass,
      styles.input,
      className
    );
    
    // Handle clear button click
    const handleClear = () => {
      if (onClear) {
        onClear();
      }
    };
    
    // Handle password toggle
    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };
    
    // Loading spinner
    const LoadingSpinner = () => (
      <svg 
        className={cn("animate-spin h-4 w-4 text-gray-500", styles.spinner)} 
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
      <div className={cn(styles.inputWrapper, fullWidth ? 'w-full' : '')}>
        {/* Label */}
        {label && (
          <label 
            htmlFor={inputId}
            className={cn(
              "block text-sm font-medium text-gray-700 mb-1",
              required ? 'required' : '',
              styles.label
            )}
          >
            {label}
          </label>
        )}
        
        {/* Input container for positioning icons */}
        <div className="relative">
          {/* Left icon */}
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
              {leftIcon}
            </div>
          )}
          
          {/* Input element */}
          <input
            ref={ref}
            id={inputId}
            type={actualType}
            disabled={disabled || loading}
            required={required}
            placeholder={placeholder}
            aria-invalid={hasError}
            aria-describedby={
              hasError 
                ? `${inputId}-error` 
                : helpText 
                  ? `${inputId}-help` 
                  : undefined
            }
            className={inputClasses}
            {...props}
          />
          
          {/* Right elements (icon, clear button, password toggle, or loading spinner) */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {loading && <LoadingSpinner />}
            
            {!loading && rightIcon && (
              <span className="text-gray-500 pointer-events-none">
                {rightIcon}
              </span>
            )}
            
            {!loading && !rightIcon && showClearButton && props.value && (
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                onClick={handleClear}
                aria-label="Clear input"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </button>
            )}
            
            {!loading && !rightIcon && !showClearButton && type === 'password' && showPasswordToggle && (
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                onClick={handleTogglePassword}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" 
                    />
                  </svg>
                ) : (
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                    />
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
                    />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
        
        {/* Error message */}
        {hasError && errorMessage && (
          <p 
            id={`${inputId}-error`}
            className="mt-1 text-sm text-danger"
          >
            {errorMessage}
          </p>
        )}
        
        {/* Help text */}
        {!hasError && helpText && (
          <p 
            id={`${inputId}-help`}
            className="mt-1 text-sm text-gray-500"
          >
            {helpText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;