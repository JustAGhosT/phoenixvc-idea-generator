import React, { forwardRef, useState } from 'react';
import { cn } from '@/utils/classnames';
import styles from './Radio.module.css';
import animations from './RadioAnimations.module.css';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /**
   * The label for the radio button
   */
  label?: string;
  
  /**
   * The size of the radio button
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * The variant of the radio button
   * @default "default"
   */
  variant?: 'default' | 'primary' | 'secondary';
  
  /**
   * Optional helper text to display below the radio button
   */
  helperText?: string;
  
  /**
   * Error message to display
   */
  error?: string;
  
  /**
   * Whether to show error animation
   * @default false
   */
  showErrorAnimation?: boolean;
}

/**
 * Radio component for selecting a single option from a set.
 * 
 * @example
 * ```tsx
 * <Radio name="option" value="option1" label="Option 1" />
 * <Radio name="option" value="option2" label="Option 2" />
 * 
 * <Radio 
 *   name="color"
 *   value="red"
 *   label="Red"
 *   checked={selectedColor === 'red'}
 *   onChange={(e) => setSelectedColor(e.target.value)}
 * />
 * ```
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({
    label,
    size = 'md',
    variant = 'default',
    className,
    helperText,
    error,
    disabled,
    id,
    showErrorAnimation = false,
    onMouseEnter,
    onMouseLeave,
    ...props
  }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const radioId = id || `radio-${Math.random().toString(36).substring(2, 9)}`;
    
    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!disabled) {
        setIsHovered(true);
      }
      onMouseEnter?.(e as any);
    };
    
    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      setIsHovered(false);
      onMouseLeave?.(e as any);
    };
    
    return (
      <div className={cn(styles.radioContainer, className)}>
        <div 
          className={styles.radioWrapper}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <input
            type="radio"
            id={radioId}
            ref={ref}
            disabled={disabled}
            className={cn(
              styles.radio,
              styles[`radio--${size}`],
              styles[`radio--${variant}`],
              disabled && styles['radio--disabled'],
              error && styles['radio--error']
            )}
            {...props}
          />
          <div 
            className={cn(
              styles.radioControl,
              animations.radioControl,
              error && showErrorAnimation && animations.radioError,
              isHovered && !disabled && animations.radioHover
            )}
          >
            <div className={cn(styles.radioIndicator, animations.radioIndicator)} />
          </div>
          {label && (
            <label 
              htmlFor={radioId}
              className={cn(
                styles.radioLabel,
                disabled && styles['radioLabel--disabled']
              )}
            >
              {label}
            </label>
          )}
        </div>
        
        {(helperText || error) && (
          <div className={cn(
            styles.radioHelperText,
            error && styles['radioHelperText--error']
          )}>
            {error || helperText}
          </div>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';

export default Radio;