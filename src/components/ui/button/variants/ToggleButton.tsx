import React, { forwardRef, ReactNode, useState } from 'react';
import { Button, ButtonColor, ButtonProps, ButtonSize, ButtonVariant } from '../Button';

export type ToggleButtonSize = ButtonSize;
export type ToggleButtonColor = ButtonColor;
export type ToggleButtonVariant = Exclude<ButtonVariant, 'link'>;

export interface ToggleButtonProps extends Omit<ButtonProps, 'pressed' | 'active'> {
  /**
   * The content to be rendered inside the button
   */
  children?: ReactNode;
  
  /**
   * Whether the toggle button is pressed/selected
   */
  isPressed?: boolean;
  
  /**
   * Callback when the pressed state changes
   */
  onPressedChange?: (isPressed: boolean) => void;
  
  /**
   * The size of the toggle button
   * @default "md"
   */
  size?: ToggleButtonSize;
  
  /**
   * The color scheme of the toggle button
   * @default "primary"
   */
  color?: ToggleButtonColor;
  
  /**
   * The visual style variant of the toggle button
   * @default "outline"
   */
  variant?: ToggleButtonVariant;
  
  /**
   * Whether the toggle button should manage its own state
   * @default false
   */
  uncontrolled?: boolean;

  /**
   * Click event handler for the toggle button
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * ToggleButton component for toggling between two states.
 * 
 * @example
 * ```tsx
 * // Controlled usage
 * const [isPressed, setIsPressed] = useState(false);
 * <ToggleButton 
 *   isPressed={isPressed} 
 *   onPressedChange={setIsPressed}
 * >
 *   Toggle Me
 * </ToggleButton>
 * 
 * // Uncontrolled usage
 * <ToggleButton uncontrolled>
 *   Toggle Me
 * </ToggleButton>
 * ```
 */
export const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(
  ({
    children,
    isPressed: controlledIsPressed,
    onPressedChange,
    size = 'md',
    color = 'primary',
    variant = 'outline',
    uncontrolled = false,
    onClick,
    ...props
  }, ref) => {
    // Internal state for uncontrolled mode
    const [internalIsPressed, setInternalIsPressed] = useState(false);
    
    // Determine if we're using controlled or uncontrolled state
    const isPressed = uncontrolled ? internalIsPressed : controlledIsPressed;
    
    // Handle click events
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      // Toggle the state
      const newPressedState = !isPressed;
      
      // Update internal state if uncontrolled
      if (uncontrolled) {
        setInternalIsPressed(newPressedState);
      }
      
      // Call the onPressedChange callback if provided
      if (onPressedChange) {
        onPressedChange(newPressedState);
      }
      
      // Call the original onClick handler if provided
      if (onClick) {
        onClick(event);
      }
    };
    
    return (
      <Button
        ref={ref}
        size={size}
        color={color}
        variant={variant}
        pressed={isPressed}
        active={isPressed}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

ToggleButton.displayName = 'ToggleButton';

export default ToggleButton;