import React, { forwardRef } from 'react';
import { cn } from '@/utils/classnames';
import styles from './Checkbox.less';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /**
   * The label for the checkbox
   */
  label?: string;
  
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
  helperText?: string;
  
  /**
   * Error message to display
   */
  error?: string;
}

/**
 * Checkbox component for boolean input with customizable styling.
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
    helperText,
    error,
    disabled,
    id,
    ...props
  }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substring(2, 9)}`;
    
    // Handle the indeterminate state which isn't a standard HTML attribute
    React.useEffect(() => {
      if (ref && typeof ref === 'object' && ref.current) {
        ref.current.indeterminate = !!indeterminate;
      }
    }, [ref, indeterminate]);
    
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
              error && styles['checkbox--error']
            )}
            {...props}
          />
          <div className={styles.checkboxControl}>
            <svg 
              className={styles.checkboxIcon} 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
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
                disabled && styles['checkboxLabel--disabled']
              )}
            >
              {label}
            </label>
          )}
        </div>
        
        {(helperText || error) && (
          <div className={cn(
            styles.checkboxHelperText,
            error && styles['checkboxHelperText--error']
          )}>
            {error || helperText}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;