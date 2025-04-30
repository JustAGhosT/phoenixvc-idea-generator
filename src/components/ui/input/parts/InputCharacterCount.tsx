import React from 'react';
import { cn } from '@/utils/classnames';
import styles from '../Input.module.css';
import animations from '../InputAnimations.module.css';

interface InputCharacterCountProps {
  /** Current character count */
  count: number;
  /** Maximum allowed characters */
  max?: number;
  /** Threshold percentage for warning state */
  warningThreshold?: number;
  /** Additional class name */
  className?: string;
}

/**
 * Character count component for Input
 */
export const InputCharacterCount: React.FC<InputCharacterCountProps> = ({
  count,
  max,
  warningThreshold,
  className,
}) => {
  // Determine status based on count and max
  const getStatus = () => {
    if (!max) return 'normal';
    if (count >= max) return 'error';
    if (warningThreshold && count >= max * (warningThreshold / 100)) return 'warning';
    return 'normal';
  };

  const status = getStatus();

  return (
    <div className={cn(
      styles.inputCharacterCount,
      status === 'warning' && [
        styles['inputCharacterCount--warning'],
        animations.characterCountWarning
      ],
      status === 'error' && styles['inputCharacterCount--error'],
      className
    )}>
      {count}{max ? `/${max}` : ''}
    </div>
  );
};

export default InputCharacterCount;