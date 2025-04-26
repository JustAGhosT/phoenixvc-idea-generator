import React, { forwardRef, useState } from 'react';
import { cn } from '@/utils/classnames';
import styles from './Select.module.css';
import animations from './SelectAnimations.module.css';

export interface SelectOption {
  /**
   * The value of the option
   */
  value: string;
  
  /**
   * The label to display for the option
   */
  label: string;
  
  /**
   * Whether the option is disabled
   */
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /**
   * The options to display in the select
   */
  options: SelectOption[];
  
  /**
   * The label for the select
   */
  label?: string;
  
  /**
   * The size of the select
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * The variant of the select
   * @default "default"
   */
  variant?: 'default' | 'outline' | 'filled';
  
  /**
   * Optional helper text to display below the select
   */
  helperText?: string;
  
  /**
   * Error message to display
   */
  error?: string;
  
  /**
   * Placeholder text to display when no option is selected
   */
  placeholder?: string;
  
  /**
   * Whether the select is full width
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * Whether to show error animation
   * @default false
   */
  showErrorAnimation?: boolean;
}

/**
 * Select component for selecting a single option from a dropdown.
 * 
 * @example
 * ```tsx
 * <Select 
 *   label="Country"
 *   options={[
 *     { value: 'us', label: 'United States' },
 *     { value: 'ca', label: 'Canada' },
 *     { value: 'mx', label: 'Mexico' }
 *   ]}
 * />
 * 
 * <Select 
 *   label="Country"
 *   value={selectedCountry}
 *   onChange={(e) => setSelectedCountry(e.target.value)}
 *   options={countries}
 *   placeholder="Select a country"
 * />
 * ```
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({
    options,
    label,
    size = 'md',
    variant = 'default',
    className,
    helperText,
    error,
    disabled,
    id,
    placeholder,
    fullWidth = false,
    showErrorAnimation = false,
    onFocus,
    onBlur,
    ...props
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const selectId = id || `select-${Math.random().toString(36).substring(2, 9)}`;
    
    const handleFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };
    
    const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };
    
    return (
      <div className={cn(
        styles.selectContainer,
        fullWidth && styles['selectContainer--fullWidth'],
        className
      )}>
        {label && (
          <label 
            htmlFor={selectId}
            className={cn(
              styles.selectLabel,
              disabled && styles['selectLabel--disabled']
            )}
          >
            {label}
          </label>
        )}
        
        <div className={styles.selectWrapper}>
          <select
            id={selectId}
            ref={ref}
            disabled={disabled}
            className={cn(
              styles.select,
              animations.select,
              styles[`select--${size}`],
              styles[`select--${variant}`],
              disabled && styles['select--disabled'],
              error && styles['select--error'],
              error && showErrorAnimation && animations.selectError,
              isFocused && animations.selectOpen
            )}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option 
                key={option.value} 
                value={option.value} 
                disabled={option.disabled}
                className={animations.selectOption}
              >
                {option.label}
              </option>
            ))}
          </select>
          <div className={cn(styles.selectArrow, animations.selectArrow)}>
            <svg 
              width="12" 
              height="12" 
              viewBox="0 0 12 12" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M2.5 4.5L6 8L9.5 4.5" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        
        {(helperText || error) && (
          <div className={cn(
            styles.selectHelperText,
            error && styles['selectHelperText--error']
          )}>
            {error || helperText}
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;