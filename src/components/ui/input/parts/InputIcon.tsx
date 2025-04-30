import React from 'react';
import { cn } from '@/utils/classnames';
import styles from '../Input.module.css';
import animations from '../InputAnimations.module.css';

interface InputIconProps {
  /** Icon to display */
  icon: React.ReactNode;
  /** Position of the icon */
  position: 'left' | 'right';
  /** Whether the input is focused */
  isFocused?: boolean;
  /** Additional class name */
  className?: string;
}

/**
 * Icon component for Input
 */
export const InputIcon: React.FC<InputIconProps> = ({
  icon,
  position,
  isFocused = false,
  className,
}) => {
  return (
    <div className={cn(
      position === 'left' ? styles.inputIconLeft : styles.inputIconRight,
      isFocused && animations.iconFadeIn,
      className
    )}>
      {icon}
    </div>
  );
};

export default InputIcon;