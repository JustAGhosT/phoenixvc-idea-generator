import React, { forwardRef, useState } from 'react';
import { Button, ButtonColor, ButtonProps, ButtonSize, ButtonVariant } from '../Button';

export type ConfirmButtonSize = ButtonSize;
export type ConfirmButtonColor = ButtonColor;
export type ConfirmButtonVariant = ButtonVariant;

export interface ConfirmButtonProps extends Omit<ButtonProps, 'onClick'> {
  /**
   * The initial text shown on the button
   */
  children: React.ReactNode;
  
  /**
   * Text to show when in confirmation state
   */
  confirmText?: string;
  
  /**
   * Function to call when the action is confirmed
   */
  onConfirm: () => void;
  
  /**
   * Function to call when the action is canceled
   */
  onCancel?: () => void;
  
  /**
   * The size of the button
   * @default "md"
   */
  size?: ConfirmButtonSize;
  
  /**
   * The color scheme of the button
   * @default "primary"
   */
  color?: ConfirmButtonColor;
  
  /**
   * The visual style variant of the button
   * @default "primary"
   */
  variant?: ConfirmButtonVariant;
  
  /**
   * The color to use for the confirmation state
   * @default "danger"
   */
  confirmColor?: ConfirmButtonColor;
  
  /**
   * The variant to use for the confirmation state
   * @default undefined (uses the same as the initial state)
   */
  confirmVariant?: ConfirmButtonVariant;
  
  /**
   * Time in milliseconds before reverting to initial state if not confirmed
   * @default 3000 (3 seconds)
   */
  timeout?: number;
  
  /**
   * Whether to show a countdown indicator
   * @default true
   */
  showCountdown?: boolean;
  
  /**
   * Whether to automatically revert to initial state after timeout
   * @default true
   */
  autoRevert?: boolean;
}

/**
 * ConfirmButton component for actions that require confirmation.
 * 
 * @example
 * ```tsx
 * <ConfirmButton
 *   onConfirm={() => deleteItem(id)}
 *   confirmText="Are you sure?"
 *   color="danger"
 * >
 *   Delete Item
 * </ConfirmButton>
 * ```
 */
export const ConfirmButton = forwardRef<HTMLButtonElement, ConfirmButtonProps>(
  ({
    children,
    confirmText = "Confirm?",
    onConfirm,
    onCancel,
    size = "md",
    color = "primary",
    variant = "primary",
    confirmColor = "danger",
    confirmVariant,
    timeout = 3000,
    showCountdown = true,
    autoRevert = true,
    ...props
  }, ref) => {
    const [isConfirmState, setIsConfirmState] = useState(false);
    const [timeLeft, setTimeLeft] = useState(timeout);
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
    
    // Handle initial click to enter confirmation state
    const handleInitialClick = () => {
      setIsConfirmState(true);
      setTimeLeft(timeout);
      
      if (autoRevert) {
        // Start countdown
        const id = setInterval(() => {
          setTimeLeft(prev => {
            if (prev <= 100) {
              clearInterval(id);
              setIsConfirmState(false);
              setTimerId(null);
              if (onCancel) onCancel();
              return timeout;
            }
            return prev - 100;
          });
        }, 100);
        
        setTimerId(id);
      }
    };
    
    // Handle confirmation click
    const handleConfirmClick = () => {
      if (timerId) {
        clearInterval(timerId);
        setTimerId(null);
      }
      
      setIsConfirmState(false);
      onConfirm();
    };
    
    // Handle cancel (escape from confirmation state)
    const handleCancelClick = () => {
      if (timerId) {
        clearInterval(timerId);
        setTimerId(null);
      }
      
      setIsConfirmState(false);
      if (onCancel) onCancel();
    };
    
    // Calculate progress for countdown indicator
    const progress = showCountdown && isConfirmState ? 
      Math.round((timeLeft / timeout) * 100) : undefined;
    
    return (
      <Button
        ref={ref}
        size={size}
        color={isConfirmState ? confirmColor : color}
        variant={isConfirmState ? (confirmVariant || variant) : variant}
        onClick={isConfirmState ? handleConfirmClick : handleInitialClick}
        loading={showCountdown && isConfirmState ? { 
          isLoading: false, 
          progress 
        } : undefined}
        {...props}
      >
        {isConfirmState ? (
          <span className="flex items-center">
            {confirmText}
            {isConfirmState && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCancelClick();
                }}
                className="ml-2 text-xs opacity-70 hover:opacity-100"
                aria-label="Cancel"
              >
                ✕
              </button>
            )}
          </span>
        ) : (
          children
        )}
      </Button>
    );
  }
);

ConfirmButton.displayName = 'ConfirmButton';

export default ConfirmButton;