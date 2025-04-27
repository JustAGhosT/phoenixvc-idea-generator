import React, { forwardRef } from 'react';
import { Button, ButtonColor, ButtonProps, ButtonSize, ButtonVariant } from '../Button';

export type IconButtonSize = ButtonSize;
export type IconButtonColor = ButtonColor;
export type IconButtonVariant = Exclude<ButtonVariant, 'link'>;

export interface IconButtonProps extends Omit<ButtonProps, 'size' | 'color' | 'variant' | 'icons' | 'iconOnly'> {
  /**
   * The icon to display
   */
  icon: React.ReactNode;
  
  /**
   * The size of the icon button
   * @default "md"
   */
  size?: IconButtonSize;
  
  /**
   * The color scheme of the icon button
   * @default "primary"
   */
  color?: IconButtonColor;
  
  /**
   * The visual style variant of the icon button
   * @default "primary"
   */
  variant?: IconButtonVariant;
  
  /**
   * The accessible label for the button
   * Required for icon-only buttons for accessibility
   */
  'aria-label': string;
}

/**
 * IconButton component for icon-only actions.
 * 
 * @example
 * ```tsx
 * <IconButton 
 *   icon={<SearchIcon />} 
 *   aria-label="Search" 
 * />
 * 
 * <IconButton 
 *   icon={<DeleteIcon />} 
 *   variant="outline" 
 *   color="danger" 
 *   aria-label="Delete item" 
 * />
 * ```
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({
    icon,
    size = 'md',
    color = 'primary',
    variant = 'primary',
    'aria-label': ariaLabel,
    ...props
  }, ref) => {
    if (!ariaLabel) {
      console.warn('IconButton requires an aria-label prop for accessibility');
    }
    
    return (
      <Button
        ref={ref}
        size={size}
        color={color}
        variant={variant}
        icons={{ only: true }}
        aria-label={ariaLabel}
        {...props}
      >
        {icon}
      </Button>
    );
  }
);

IconButton.displayName = 'IconButton';

export default IconButton;