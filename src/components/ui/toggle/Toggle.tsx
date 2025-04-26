import { cn } from '@/utils/classnames';
import React, { forwardRef, useEffect, useState } from 'react';
import styles from './Toggle.module.css';

export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /**
   * The label for the toggle
   */
  label?: string;
  
  /**
   * The size of the toggle
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * The variant of the toggle
   * @default "primary"
   */
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  
  /**
   * Optional helper text to display below the toggle
   */
  helperText?: string;
  
  /**
   * Error message to display
   */
  error?: string;
  
  /**
   * Whether the label should appear on the left side
   * @default false
   */
  labelLeft?: boolean;
/**
   * Default checked state (uncontrolled)
 */
  defaultChecked?: boolean;
}

/**
 * Toggle component for boolean input with a switch-like appearance.
 * 
 * @example
 * ```tsx
 * // Uncontrolled
 * <Toggle label="Dark mode" defaultChecked={true} onChange={(e) => console.log(e.target.checked)} />
 * 
 * // Controlled
 * <Toggle 
 *   label="Notifications"
 *   checked={notificationsEnabled}
 *   onChange={(e) => setNotificationsEnabled(e.target.checked)}
 * />
 * ```
 */
export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({
    label,
    checked,
    defaultChecked = false,
    size = 'md',
    variant = 'primary',
    className,
    helperText,
    error,
    disabled,
    id,
    labelLeft = false,
    onChange,
    ...props
  }, ref) => {
    // Internal state for uncontrolled usage
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    
    // Determine if component is controlled or uncontrolled
    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internalChecked;
    
    // Sync internal state with controlled state if it changes
    useEffect(() => {
      if (isControlled) {
        setInternalChecked(checked);
      }
    }, [isControlled, checked]);
    
    // Handle changes, updating internal state and calling external handler
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalChecked(e.target.checked);
      }
      onChange?.(e);
    };
    
    const toggleId = id || `toggle-${Math.random().toString(36).substring(2, 9)}`;
    
    return (
      <div className={cn(styles.toggleContainer, className)}>
        <div className={cn(
          styles.toggleWrapper,
          labelLeft && styles['toggleWrapper--labelLeft']
        )}>
          {label && (
            <label 
              htmlFor={toggleId}
              className={cn(
                styles.toggleLabel,
                disabled && styles['toggleLabel--disabled']
              )}
            >
              {label}
            </label>
          )}
          
          <div className={styles.toggleSwitchWrapper}>
            <input
              type="checkbox"
              id={toggleId}
              ref={ref}
              checked={isChecked}
              disabled={disabled}
              className={styles.toggleInput}
              onChange={handleChange}
              {...props}
            />
            <div 
              className={cn(
                styles.toggleSwitch,
                styles[`toggleSwitch--${size}`],
                styles[`toggleSwitch--${variant}`],
                disabled && styles['toggleSwitch--disabled'],
                error && styles['toggleSwitch--error']
              )}
            >
              <div className={styles.toggleKnob}></div>
            </div>
          </div>
        </div>
        
        {(helperText || error) && (
          <div className={cn(
            styles.toggleHelperText,
            error && styles['toggleHelperText--error']
          )}>
            {error || helperText}
          </div>
        )}
      </div>
    );
  }
);

Toggle.displayName = 'Toggle';

export default Toggle;