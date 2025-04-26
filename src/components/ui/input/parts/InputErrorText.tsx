import React from 'react';
import { cn } from '@/utils/classnames';
import styles from '../Input.module.css';

interface InputErrorTextProps {
  /** ID for accessibility */
  id: string;
  /** Error message */
  children: React.ReactNode;
  /** Additional class name */
  className?: string;
}

/**
 * Error message component for Input
 */
export const InputErrorText: React.FC<InputErrorTextProps> = ({
  id,
  children,
  className,
}) => {
  return (
    <p 
      id={id}
      className={cn(styles.errorText, className)}
    >
      {children}
    </p>
  );
};

export default InputErrorText;