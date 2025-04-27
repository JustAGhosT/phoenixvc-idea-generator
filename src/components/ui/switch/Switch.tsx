import React, { forwardRef, useState, useEffect } from 'react';
import { cn } from '@/utils/classnames';
import styles from './Switch.module.css';
import animations from './SwitchAnimations.module.css';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /**
   * The label for the switch
   */
  label?: string;
  
  /**
   * The size of the switch
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * The variant of the switch
   * @default "primary"
   */
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  
  /**
   * Optional helper text to display below the switch
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
  
  /**
   * Whether to use enhanced animations
   * @default false
   */
  enhancedAnimation?: boolean;
}

/**
 * Switch component for boolean input with a switch-like appearance.
 * 
 * @example
 * ```tsx
 * // Uncontrolled
 * <Switch label="Dark mode" defaultChecked={true} onChange={(e) => console.log(e.target.checked)} />
 * 
 * // Controlled
 * <Switch 
 *   label="Notifications"
 *   checked={notificationsEnabled}
 *   onChange={(e) => setNotificationsEnabled(e.target.checked)}
 * />
 * ```
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
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
    enhancedAnimation = false,
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
    
    const switchId = id || `switch-${Math.random().toString(36).substring(2, 9)}`;
    
    return (
      <div className={cn(styles.switchContainer, className)}>
        <div className={cn(
          styles.switchWrapper,
          labelLeft && styles['switchWrapper--labelLeft']
        )}>
          {label && (
            <label 
              htmlFor={switchId}
              className={cn(
                styles.switchLabel,
                disabled && styles['switchLabel--disabled']
              )}
            >
              {label}
            </label>
          )}
          
          <div className={styles.switchSwitchWrapper}>
            <input
              type="checkbox"
              id={switchId}
              ref={ref}
              checked={isChecked}
              disabled={disabled}
              className={cn(
                styles.switchInput,
                enhancedAnimation && animations.switchEnhanced
              )}
              onChange={handleChange}
              {...props}
            />
            <div 
              className={cn(
                styles.switchTrack,
                animations.switchTrack,
                styles[`switchTrack--${size}`],
                styles[`switchTrack--${variant}`],
                disabled && styles['switchTrack--disabled'],
                error && styles['switchTrack--error']
              )}
            >
              <div className={cn(styles.switchKnob, animations.switchKnob)}></div>
            </div>
          </div>
        </div>
        
        {(helperText || error) && (
          <div className={cn(
            styles.switchHelperText,
            error && styles['switchHelperText--error']
          )}>
            {error || helperText}
          </div>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';

export default Switch;