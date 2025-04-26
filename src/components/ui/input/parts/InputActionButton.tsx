import React from 'react';
import { cn } from '@/utils/classnames';
import styles from '../Input.module.css';
import animations from '../InputAnimations.module.css';

interface InputActionButtonProps {
  /** Action to perform when clicked */
  onClick: () => void;
  /** Icon to display */
  icon: React.ReactNode;
  /** Accessible label for the button */
  ariaLabel: string;
  /** Whether the button should be visible */
  visible?: boolean;
  /** Whether to animate the button */
  animate?: boolean;
  /** Additional class name */
  className?: string;
}

/**
 * Action button component for Input (clear, password toggle, etc.)
 */
export const InputActionButton: React.FC<InputActionButtonProps> = ({
  onClick,
  icon,
  ariaLabel,
  visible = true,
  animate = false,
  className,
}) => {
  return (
    <button
      type="button"
      className={cn(
        styles.actionButton,
        animate && animations.clearButtonFade,
        visible && animations.clearButtonVisible,
        className
      )}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {icon}
    </button>
  );
};

export default InputActionButton;