import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { cn } from '@/utils/classnames';
import styles from './Input.module.css';
import animations from './InputAnimations.module.css';
import { 
  SizeProps, 
  FormElementProps 
} from '@/types/component-props';
import {
  InputActionButton,
  InputCharacterCount,
  InputErrorText,
  InputHelperText,
  InputIcon,
  InputLabel,
  InputSpinner
} from './parts';

// Define a more specific type for the input props that correctly handles data attributes
export interface InputProps extends 
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
  SizeProps,
  FormElementProps {
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
  /** Whether to use a floating label */
  floatingLabel?: boolean;
  /** Whether to animate the focus ring */
  animateFocus?: boolean;
  /** Whether to show character count */
  showCharacterCount?: boolean;
  /** Maximum character count for warning (if showCharacterCount is true) */
  warningThreshold?: number;
  /** Whether the input has a success state */
  success?: boolean;
  /** Whether to show error animation when error state changes */
  showErrorAnimation?: boolean;
  /** Additional class name */
  className?: string;
  /** Any other props including data attributes */
  [key: `data-${string}`]: string | number | boolean | undefined;
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
 *   showErrorAnimation
 * />
 * 
 * @example
 * // With animations
 * <Input 
 *   floatingLabel
 *   label="Floating Label"
 *   animateFocus
 *   placeholder=" "
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
      floatingLabel = false,
      animateFocus = false,
      showCharacterCount = false,
      warningThreshold,
      success = false,
      showErrorAnimation = false,
      value,
      onChange,
      maxLength,
      ...props
    },
    ref
  ) => {
    // Generate a unique ID for the input if not provided
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
    
    // State for password visibility toggle
    const [showPassword, setShowPassword] = useState(false);
    const actualType = type === 'password' && showPassword ? 'text' : type;
    
    // State for input focus
    const [isFocused, setIsFocused] = useState(false);
    
    // State for error animation
    const [showShakeAnimation, setShowShakeAnimation] = useState(false);
    
    // State for character count
    const [charCount, setCharCount] = useState(typeof value === 'string' ? value.length : 0);
    
    // Ref for the input element
    const inputRef = useRef<HTMLInputElement | null>(null);
    
    // Effect to trigger error animation when error state changes
    useEffect(() => {
      if (hasError && showErrorAnimation) {
        setShowShakeAnimation(true);
        const timer = setTimeout(() => {
          setShowShakeAnimation(false);
        }, 500);
        return () => clearTimeout(timer);
      }
    }, [hasError, showErrorAnimation]);
    
    // Handle focus events
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };
    
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      props.onBlur?.(e);
    };
    
    // Handle change events
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (showCharacterCount) {
        setCharCount(e.target.value.length);
      }
      onChange?.(e);
    };
    
    // Handle clear button click
    const handleClear = () => {
      if (inputRef.current) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          'value'
        )?.set;
        
        if (nativeInputValueSetter && inputRef.current) {
          nativeInputValueSetter.call(inputRef.current, '');
          
          const event = new Event('input', { bubbles: true });
          inputRef.current.dispatchEvent(event);
        }
      }
      
      if (showCharacterCount) {
        setCharCount(0);
      }
      
      onClear?.();
    };
    
    // Handle password toggle
    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };
    
    // Setup combined ref handling
    const setRefs = (element: HTMLInputElement | null) => {
      // Store reference to the input element locally
      inputRef.current = element;
      
      // Handle the forwarded ref properly
      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        // This is safe because we're not assigning to ref.current directly
        // We're just using the ref object that was passed to us
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = element;
      }
    };
    
    // Password toggle icon
    const PasswordToggleIcon = () => showPassword ? (
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
    );
    
    // Clear button icon
    const ClearIcon = () => (
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
    );
    
    // Get the string value for floating label check
    const stringValue = typeof value === 'string' ? value : '';
    
    // Calculate input classes with proper type handling
    const inputClasses = cn(
      styles.input,
      // Size variant - use string indexing with type checking
      styles[`input--${size}`] || '',
      // Optional classes with proper boolean handling
      rounded ? styles['input--rounded'] : '',
      pill ? styles['input--pill'] : '',
      leftIcon ? styles['input--withLeftIcon'] : '',
      (rightIcon || showClearButton || (type === 'password' && showPasswordToggle)) 
        ? styles['input--withRightIcon'] 
        : '',
      hasError ? styles['input--error'] : '',
      success ? styles['input--success'] : '',
      // Animation classes
      animations.inputFocusAnimation,
      animateFocus && isFocused ? animations.inputFocusRing : '',
      hasError && showShakeAnimation ? animations.inputErrorShake : '',
      success ? animations.inputSuccess : '',
      loading ? animations.inputLoading : '',
      // External classes
      className
    );
    
    return (
      <div className={cn(styles.inputWrapper, fullWidth ? 'w-full' : '')}>
        {/* Label (non-floating) */}
        {label && !floatingLabel && (
          <InputLabel
            htmlFor={inputId}
            required={required}
            disabled={disabled}
            hasError={hasError}
          >
            {label}
          </InputLabel>
        )}
        
        {/* Input container for positioning icons */}
        <div className={cn(
          styles.inputContainer,
          floatingLabel ? animations.labelFloatContainer : ''
        )}>
          {/* Left icon */}
          {leftIcon && (
            <InputIcon
              icon={leftIcon}
              position="left"
              isFocused={isFocused}
            />
          )}
          
          {/* Input element */}
          <input
            ref={setRefs}
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
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            maxLength={maxLength}
            {...props}
          />
          
          {/* Floating label */}
          {label && floatingLabel && (
            <InputLabel
              htmlFor={inputId}
              floating
              isFocused={isFocused}
              inputValue={stringValue}
            >
              {label}
            </InputLabel>
          )}
          
          {/* Right elements (icon, clear button, password toggle, or loading spinner) */}
          <div className={styles.inputIconRight}>
            {loading && <InputSpinner />}
            
            {!loading && rightIcon && (
              <InputIcon
                icon={rightIcon}
                position="right"
                isFocused={isFocused}
              />
            )}
            
            {!loading && !rightIcon && showClearButton && value && (
              <InputActionButton
                onClick={handleClear}
                icon={<ClearIcon />}
                ariaLabel="Clear input"
                animate
                visible={typeof value === 'string' && value.length > 0}
              />
            )}
            
            {!loading && !rightIcon && !showClearButton && type === 'password' && showPasswordToggle && (
              <InputActionButton
                onClick={handleTogglePassword}
                icon={<PasswordToggleIcon />}
                ariaLabel={showPassword ? "Hide password" : "Show password"}
                animate
                visible={true}
              />
            )}
          </div>
        </div>
        
        {/* Character count */}
        {showCharacterCount && (
          <InputCharacterCount
            count={charCount}
            max={maxLength}
            warningThreshold={warningThreshold}
          />
        )}
        
        {/* Error message */}
        {hasError && errorMessage && (
          <InputErrorText id={`${inputId}-error`}>
            {errorMessage}
          </InputErrorText>
        )}
        
        {/* Help text */}
        {!hasError && helpText && (
          <InputHelperText id={`${inputId}-help`}>
            {helpText}
          </InputHelperText>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;