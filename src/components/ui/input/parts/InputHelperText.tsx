import React from 'react';
import { cn } from '@/utils/classnames';
import styles from '../Input.module.css';

interface InputHelperTextProps {
  /** ID for accessibility */
  id: string;
  /** Text content */
  children: React.ReactNode;
  /** Additional class name */
  className?: string;
}

/**
 * Helper text component for Input
 */
export const InputHelperText: React.FC<InputHelperTextProps> = ({
  id,
  children,
  className,
}) => {
  return (
    <p 
      id={id}
      className={cn(styles.helperText, className)}
    >
      {children}
    </p>
  );
};

export default InputHelperText;