import { forwardRef, ReactNode } from 'react';
import { Button, ButtonColor, ButtonProps, ButtonSize } from '../Button';

export type LinkButtonSize = ButtonSize;
export type LinkButtonColor = ButtonColor;

export interface LinkButtonProps extends Omit<ButtonProps, 'variant' | 'as'> {  /**
   * The content to be rendered inside the button
   */
  children?: ReactNode;
  /**
   * The URL that the link button points to
   */
  href: string;
  
  /**
   * The size of the link button
   * @default "md"
   */
  size?: LinkButtonSize;
  
  /**
   * The color scheme of the link button
   * @default "primary"
   */
  color?: LinkButtonColor;
  
  /**
   * Whether the link should open in a new tab
   * @default false
   */
  external?: boolean;
  
  /**
   * Whether the link should be styled as an underlined link
   * @default false
   */
  underlined?: boolean;
  
  /**
   * Whether the link should be styled as a button
   * @default false
   */
  buttonStyle?: boolean;
}

/**
 * LinkButton component for navigation actions styled as a button or link.
 * 
 * @example
 * ```tsx
 * <LinkButton href="/dashboard">Go to Dashboard</LinkButton>
 * 
 * <LinkButton 
 *   href="https://example.com" 
 *   external 
 *   color="primary"
 * >
 *   Visit External Site
 * </LinkButton>
 * 
 * <LinkButton 
 *   href="/settings" 
 *   buttonStyle 
 *   color="secondary"
 * >
 *   Settings
 * </LinkButton>
 * ```
 */
export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({
    href,
    children,
    size = 'md',
    color = 'primary',
    external = false,
    underlined = false,
    buttonStyle = false,
    ...props
  }, ref) => {
    // Determine external link attributes
    const externalProps = external ? {
      target: '_blank',
      rel: 'noopener noreferrer',
    } : {};
    
    // Determine variant based on styling preference
    const variant = buttonStyle ? 'primary' : 'link';
    
    // Add underline class if needed
    const className = underlined ? `${props.className || ''} underlined` : props.className;
    
    return (
      <Button
        as="a"
        ref={ref as any}
        href={href}
        size={size}
        color={color}
        variant={variant}
        className={className}
        {...externalProps}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

LinkButton.displayName = 'LinkButton';

export default LinkButton;