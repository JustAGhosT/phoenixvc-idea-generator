import React, { forwardRef } from 'react';
import { cn } from '@/utils/classnames';
import styles from './ButtonToolbar.module.css';

export interface ButtonToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The button groups to be rendered within the toolbar
   */
  children: React.ReactNode;
  
  /**
   * Whether the toolbar should take up the full width of its container
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * The spacing between button groups
   * @default "md"
   */
  spacing?: 'xs' | 'sm' | 'md' | 'lg';
  
  /**
   * The alignment of the button groups
   * @default "left"
   */
  align?: 'left' | 'center' | 'right' | 'space-between';
  
  /**
   * Whether to stack the button groups vertically on small screens
   * @default false
   */
  responsive?: boolean;
}

/**
 * ButtonToolbar component for grouping multiple ButtonGroups together
 * 
 * @example
 * ```tsx
 * <ButtonToolbar>
 *   <ButtonGroup>
 *     <Button>Copy</Button>
 *     <Button>Paste</Button>
 *   </ButtonGroup>
 *   <ButtonGroup>
 *     <Button>Undo</Button>
 *     <Button>Redo</Button>
 *   </ButtonGroup>
 * </ButtonToolbar>
 * ```
 */
export const ButtonToolbar = forwardRef<HTMLDivElement, ButtonToolbarProps>(
  ({
    children,
    fullWidth = false,
    spacing = 'md',
    align = 'left',
    responsive = false,
    className,
    ...props
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          styles.buttonToolbar,
          styles[`buttonToolbar--spacing-${spacing}`],
          styles[`buttonToolbar--align-${align}`],
          fullWidth && styles['buttonToolbar--fullWidth'],
          responsive && styles['buttonToolbar--responsive'],
          className
        )}
        role="toolbar"
        {...props}
      >
        {children}
      </div>
    );
  }
);

ButtonToolbar.displayName = 'ButtonToolbar';

export default ButtonToolbar;