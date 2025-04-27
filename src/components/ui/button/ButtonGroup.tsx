import React, { forwardRef, Children, cloneElement, isValidElement, useMemo } from 'react';
import { cn } from '@/utils/classnames';
import { ButtonProps, ButtonSize, ButtonColor, ButtonVariant } from './Button';
import styles from './ButtonGroup.module.css';

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The buttons to be rendered within the group
   */
  children: React.ReactNode;
  
  /**
   * The orientation of the button group
   * @default "horizontal"
   */
  orientation?: 'horizontal' | 'vertical';
  
  /**
   * Whether the buttons should take up the full width of the container
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * The size to apply to all buttons in the group
   */
  size?: ButtonSize;
  
  /**
   * The color to apply to all buttons in the group
   */
  color?: ButtonColor;
  
  /**
   * The variant to apply to all buttons in the group
   */
  variant?: ButtonVariant;
  
  /**
   * Whether to show dividers between buttons
   * @default false
   */
  dividers?: boolean;
  
  /**
   * Whether the buttons should be attached without spacing
   * @default false
   */
  attached?: boolean;
  
  /**
   * Whether to disable all buttons in the group
   * @default false
   */
  disabled?: boolean;
}

/**
 * ButtonGroup component for grouping related buttons with consistent styling
 * 
 * @example
 * ```tsx
 * <ButtonGroup>
 *   <Button>Left</Button>
 *   <Button>Middle</Button>
 *   <Button>Right</Button>
 * </ButtonGroup>
 * 
 * <ButtonGroup orientation="vertical" variant="outline">
 *   <Button>Top</Button>
 *   <Button>Middle</Button>
 *   <Button>Bottom</Button>
 * </ButtonGroup>
 * ```
 */
export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({
    children,
    orientation = 'horizontal',
    fullWidth = false,
    size,
    color,
    variant,
    dividers = false,
    attached = false,
    disabled = false,
    className,
    ...props
  }, ref) => {
    // Memoize processed children to prevent unnecessary re-renders
    const processedChildren = useMemo(() => {
      return Children.map(children, (child, index) => {
        if (!isValidElement<ButtonProps>(child)) {
          return child;
        }
        
        // Clone the button element to apply group props
        return cloneElement(child, {
          size: child.props.size || size,
          color: child.props.color || color,
          variant: child.props.variant || variant,
          disabled: child.props.disabled || disabled,
          className: cn(
            child.props.className,
            // Apply special styling for attached buttons
            attached && [
              // First button
              index === 0 && orientation === 'horizontal' && styles.buttonFirstHorizontal,
              index === 0 && orientation === 'vertical' && styles.buttonFirstVertical,
              
              // Middle buttons
              index > 0 && 
              index < Children.count(children) - 1 && 
              orientation === 'horizontal' && 
              styles.buttonMiddleHorizontal,
              
              index > 0 && 
              index < Children.count(children) - 1 && 
              orientation === 'vertical' && 
              styles.buttonMiddleVertical,
              
              // Last button
              index === Children.count(children) - 1 && 
              orientation === 'horizontal' && 
              styles.buttonLastHorizontal,
              
              index === Children.count(children) - 1 && 
              orientation === 'vertical' && 
              styles.buttonLastVertical,
            ]
          ),
        });
      });
    }, [children, size, color, variant, disabled, attached, orientation]);
    
    return (
      <div
        ref={ref}
        className={cn(
          styles.buttonGroup,
          styles[`buttonGroup--${orientation}`],
          fullWidth && styles['buttonGroup--fullWidth'],
          dividers && styles['buttonGroup--dividers'],
          attached && styles['buttonGroup--attached'],
          className
        )}
        role="group"
        {...props}
      >
        {processedChildren}
      </div>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup;