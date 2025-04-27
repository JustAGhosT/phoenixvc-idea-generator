import React, { forwardRef, ReactNode, useEffect, useState } from 'react';
import { Button, ButtonColor, ButtonProps, ButtonSize, ButtonVariant } from '../Button';

export type LoadingButtonSize = ButtonSize;
export type LoadingButtonColor = ButtonColor;
export type LoadingButtonVariant = ButtonVariant;

export interface LoadingButtonProps extends Omit<ButtonProps, 'loading'> {  /**
   * The content to be rendered inside the button
   */
  children?: ReactNode;
  
  /**
   * Whether the button is in a loading state
   * @default false
   */
  isLoading?: boolean;
  
  /**
   * Text to display when in loading state
   */
  loadingText?: string;
  
  /**
   * Whether to show a spinner when in loading state
   * @default true
   */
  showSpinner?: boolean;
  
  /**
   * Progress value for controlled loading (0-100)
   */
  progress?: number;
  
  /**
   * Whether the button should automatically enter loading state when clicked
   * @default false
   */
  autoLoading?: boolean;
  
  /**
   * Duration in milliseconds for the loading state when autoLoading is true
   * @default 2000
   */
  loadingDuration?: number;
  
  /**
   * The size of the button
   * @default "md"
   */
  size?: LoadingButtonSize;
  
  /**
   * The color scheme of the button
   * @default "primary"
   */
  color?: LoadingButtonColor;
  
  /**
   * The visual style variant of the button
   * @default "primary"
   */
  variant?: LoadingButtonVariant;
  
  /**
   * Callback when loading state changes
   */
  onLoadingChange?: (isLoading: boolean) => void;

  /**
   * Callback when the button is clicked
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * LoadingButton component for actions that require processing time.
 * 
 * @example
 * ```tsx
 * // Manual loading state
 * const [isLoading, setIsLoading] = useState(false);
 * <LoadingButton 
 *   isLoading={isLoading} 
 *   loadingText="Saving..."
 *   onClick={() => {
 *     setIsLoading(true);
 *     saveData().finally(() => setIsLoading(false));
 *   }}
 * >
 *   Save
 * </LoadingButton>
 * 
 * // Auto loading state
 * <LoadingButton 
 *   autoLoading 
 *   loadingText="Processing..."
 *   onClick={() => console.log('Clicked!')}
 * >
 *   Process
 * </LoadingButton>
 * 
 * // With progress indicator
 * <LoadingButton 
 *   isLoading={true}
 *   progress={75}
 *   loadingText="Uploading..."
 * >
 *   Upload
 * </LoadingButton>
 * ```
 */
export const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({
    children,
    isLoading: controlledIsLoading,
    loadingText,
    showSpinner = true,
    progress,
    autoLoading = false,
    loadingDuration = 2000,
    size = 'md',
    color = 'primary',
    variant = 'primary',
    onClick,
    onLoadingChange,
    ...props
  }, ref) => {
    // Internal loading state for autoLoading mode
    const [internalIsLoading, setInternalIsLoading] = useState(false);
    
    // Determine if we're using controlled or internal loading state
    const isLoading = controlledIsLoading !== undefined ? controlledIsLoading : internalIsLoading;
    
    // Handle automatic loading state reset
    useEffect(() => {
      let timeoutId: NodeJS.Timeout;
      
      if (autoLoading && internalIsLoading) {
        timeoutId = setTimeout(() => {
          setInternalIsLoading(false);
          if (onLoadingChange) {
            onLoadingChange(false);
          }
        }, loadingDuration);
      }
      
      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }, [autoLoading, internalIsLoading, loadingDuration, onLoadingChange]);
    
    // Handle click events
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      // If autoLoading is enabled, set loading state to true
      if (autoLoading && !isLoading) {
        setInternalIsLoading(true);
        if (onLoadingChange) {
          onLoadingChange(true);
        }
      }
      
      // Call the original onClick handler if provided
      if (onClick) {
        onClick(event);
      }
    };
    
    // Prepare loading props
    const loadingProps = {
      isLoading,
      loadingText,
      showSpinner,
      progress
    };
    
    return (
      <Button
        ref={ref}
        size={size}
        color={color}
        variant={variant}
        loading={loadingProps}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

LoadingButton.displayName = 'LoadingButton';

export default LoadingButton;