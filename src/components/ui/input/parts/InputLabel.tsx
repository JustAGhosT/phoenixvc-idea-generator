import React from 'react';
import { cn } from '@/utils/classnames';
import styles from '../Input.module.css';
import animations from '../InputAnimations.module.css';

interface InputLabelProps {
  /** ID of the input element this label is for */
  htmlFor: string;
  /** Label text content */
  children: React.ReactNode;
  /** Whether the input is required */
  required?: boolean;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input has an error */
  hasError?: boolean;
  /** Whether this is a floating label */
  floating?: boolean;
  /** Whether the input is focused */
  isFocused?: boolean;
  /** Current value of the input (for floating label) */
  inputValue?: string;
  /** Additional class name */
  className?: string;
}

/**
 * Label component for Input
 */
export const InputLabel: React.FC<InputLabelProps> = ({
  htmlFor,
  children,
  required = false,
  disabled = false,
  hasError = false,
  floating = false,
  isFocused = false,
  inputValue = '',
  className,
}) => {
  if (floating) {
    return (
      <label 
        htmlFor={htmlFor}
        className={cn(
          styles.floatingLabel,
          animations.labelFloat,
          (isFocused || inputValue.length > 0) && animations.labelFloatActive,
          className
        )}
      >
        {children}
      </label>
    );
  }
  
  return (
    <label 
      htmlFor={htmlFor}
      className={cn(
        styles.label,
        required && styles['label--required'],
        disabled && styles['label--disabled'],
        hasError && styles['label--error'],
        className
      )}
    >
      {children}
    </label>
  );
};

export default InputLabel;