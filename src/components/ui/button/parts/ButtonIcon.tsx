import React from 'react';
import { cn } from '@/utils/classnames';
import styles from '../Button.module.css';

interface ButtonIconProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Icon component for Button
 * Handles proper styling and alignment of icons within buttons
 */
export const ButtonIcon = React.memo(function ButtonIcon({ 
  children, 
  className 
}: ButtonIconProps) {
  return (
    <span className={cn(styles.icon, className)}>
      {children}
    </span>
  );
});

ButtonIcon.displayName = 'ButtonIcon';