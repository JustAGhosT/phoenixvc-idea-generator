import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/classnames';
import styles from './Checkbox.module.css';
import animations from './CheckboxAnimations.module.css';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /**
   * The label for the checkbox
   */
  label?: React.ReactNode;
  
  /**
   * Whether the checkbox is checked
   */
  checked?: boolean;
  
  /**
   * Whether the checkbox is in an indeterminate state
   */
  indeterminate?: boolean;
  
  /**
   * The size of the checkbox
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * The variant of the checkbox
   * @default "default"
   */
  variant?: 'default' | 'primary' | 'secondary';
  
  /**
   * Optional helper text to display below the checkbox
   */
  helperText?: React.ReactNode;
  
  /**
   * Error message to display
   */
  error?: string;
  
  /**
   * Whether to animate the checkbox state changes
   * @default true
   */
  animate?: boolean;
  
  /**
   * Whether to show error animation when error state changes
   * @default false
   */
  showErrorAnimation?: boolean;
  
  /**
   * Whether to show a success animation when checked
   * @default false
   */
  showSuccessAnimation?: boolean;
  
  /**
   * Whether to show a hover animation
   * @default false
   */
  showHoverAnimation?: boolean;
  
  /**
   * Whether to show a focus ring animation
   * @default false
   */
  showFocusAnimation?: boolean;
  
  /**
   * Additional class name for the container
   */
  className?: string;
  
  /**
   * Additional class name for the checkbox input
   */
  inputClassName?: string;
  
  /**
   * Additional class name for the label
   */
  labelClassName?: string;
}

/**
 * Checkbox component for boolean input with customizable styling and animations.
 * 
 * @example
 * ```tsx
 * <Checkbox label="Accept terms" />
 * 
 * <Checkbox 
 *   label="Remember me"
 *   checked={isChecked}
 *   onChange={(e) => setIsChecked(e.target.checked)}
 * />
 * 
 * <Checkbox 
 *   label="Select all"
 *   indeterminate={someSelected}
 *   checked={allSelected}
 *   onChange={handleSelectAll}
 * />
 * ```
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({
    label,
    checked,
    indeterminate,
    size = 'md',
    variant = 'default',
    className,
    inputClassName,
    labelClassName,
    helperText,
    error,
    disabled,
    id,
    animate = true,
    showErrorAnimation = false,
    showSuccessAnimation = false,
    showHoverAnimation = false,
    showFocusAnimation = false,
    onFocus,
    onBlur,
    ...props
  }, forwardedRef) => {
    // Create a local ref if no ref is provided
    const localRef = useRef<HTMLInputElement>(null);
    const ref = forwardedRef || localRef;
    
    // Check for reduced motion preference
    const prefersReducedMotion = useReducedMotion();
    
    // State for animations
    const [isFocused, setIsFocused] = useState(false);
    const [isCheckedAnimating, setIsCheckedAnimating] = useState(false);
    const [isErrorAnimating, setIsErrorAnimating] = useState(false);
    const [prevChecked, setPrevChecked] = useState(checked);
    const [prevError, setPrevError] = useState(error);
    
    // Generate a unique ID for the checkbox if not provided
    const checkboxId = id || `checkbox-${Math.random().toString(36).substring(2, 9)}`;
    
    // Handle the indeterminate state which isn't a standard HTML attribute
    useEffect(() => {
      if (ref && 'current' in ref && ref.current) {
        ref.current.indeterminate = !!indeterminate;
      }
    }, [ref, indeterminate]);
    
    // Handle checked state change animation
    useEffect(() => {
      if (!animate || prefersReducedMotion) return;
      
      if (prevChecked !== checked && checked) {
        setIsCheckedAnimating(true);
        const timer = setTimeout(() => setIsCheckedAnimating(false), 300);
        return () => clearTimeout(timer);
      }
      
      setPrevChecked(checked);
    }, [checked, prevChecked, animate, prefersReducedMotion]);
    
    // Handle error state change animation
    useEffect(() => {
      if (!showErrorAnimation || prefersReducedMotion) return;
      
      if (prevError !== error && error) {
        setIsErrorAnimating(true);
        const timer = setTimeout(() => setIsErrorAnimating(false), 400);
        return () => clearTimeout(timer);
      }
      
      setPrevError(error);
    }, [error, prevError, showErrorAnimation, prefersReducedMotion]);
    
    // Handle focus events
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };
    
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };
    
    // Determine if we should show animations based on props and reduced motion preference
    const shouldAnimate = animate && !prefersReducedMotion;
    const shouldShowSuccessAnimation = shouldAnimate && showSuccessAnimation && checked;
    const shouldShowHoverAnimation = shouldAnimate && showHoverAnimation && !disabled;
    const shouldShowFocusAnimation = shouldAnimate && showFocusAnimation && isFocused;
    
    return (
      <div className={cn(styles.checkboxContainer, className)}>
        <div className={styles.checkboxWrapper}>
          <input
            type="checkbox"
            id={checkboxId}
            ref={ref}
            checked={checked}
            disabled={disabled}
            className={cn(
              styles.checkbox,
              styles[`checkbox--${size}`],
              styles[`checkbox--${variant}`],
              disabled && styles['checkbox--disabled'],
              error && styles['checkbox--error'],
              inputClassName
            )}
            aria-checked={indeterminate ? 'mixed' : checked}
            aria-invalid={!!error}
            aria-describedby={(helperText || error) ? `${checkboxId}-description` : undefined}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
          <div className={cn(
            styles.checkboxControl,
            shouldAnimate && animations.stateTransition,
            isErrorAnimating && animations.errorShake,
            shouldShowSuccessAnimation && animations.successAnimation,
            shouldShowHoverAnimation && animations.hoverAnimation,
            shouldShowFocusAnimation && animations.focusRingAnimation,
            isFocused && shouldShowFocusAnimation && animations.focusRingPulse
          )}>
            <svg 
              className={cn(
                styles.checkboxIcon,
                shouldAnimate && (
                  indeterminate 
                    ? animations.indeterminateAnimation 
                    : isCheckedAnimating && animations.checkAnimation
                )
              )}
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {indeterminate ? (
                <line x1="6" y1="12" x2="18" y2="12" />
              ) : (
                <polyline points="20 6 9 17 4 12" />
              )}
            </svg>
          </div>
          {label && (
            <label 
              htmlFor={checkboxId}
              className={cn(
                styles.checkboxLabel,
                disabled && styles['checkboxLabel--disabled'],
                labelClassName
              )}
            >
              {label}
            </label>
          )}
        </div>
        
        {(helperText || error) && (
          <div 
            className={cn(
              styles.checkboxHelperText,
              error && styles['checkboxHelperText--error'],
              isErrorAnimating && animations.errorShake
            )}
            id={`${checkboxId}-description`}
          >
            {error || helperText}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;