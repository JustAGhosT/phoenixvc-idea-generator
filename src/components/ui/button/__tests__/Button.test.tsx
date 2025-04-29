import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from '../Button';

// Extend Jest matchers with accessibility violations
expect.extend(toHaveNoViolations);

describe('Button Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders correctly with default props', () => {
      render(<Button>Click me</Button>);
      
      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('primary');
      expect(button).toHaveClass('colorPrimary');
      expect(button).toHaveClass('md');
      expect(button).not.toBeDisabled();
    });
    
    it('renders with custom text content', () => {
      render(<Button>Custom Text</Button>);
      expect(screen.getByText('Custom Text')).toBeInTheDocument();
    });
    
    it('renders with children components', () => {
      render(
        <Button>
          <span data-testid="child-element">Child Element</span>
        </Button>
      );
      expect(screen.getByTestId('child-element')).toBeInTheDocument();
    });
  });

  // Variants tests
  describe('Variants', () => {
    it('renders different variants correctly', () => {
      const { rerender } = render(<Button variant="primary" data-testid="button">Primary</Button>);
      expect(screen.getByTestId('button')).toHaveClass('primary');
      
      rerender(<Button variant="secondary" data-testid="button">Secondary</Button>);
      expect(screen.getByTestId('button')).toHaveClass('secondary');
      
      rerender(<Button variant="outline" data-testid="button">Outline</Button>);
      expect(screen.getByTestId('button')).toHaveClass('outline');
      
      rerender(<Button variant="ghost" data-testid="button">Ghost</Button>);
      expect(screen.getByTestId('button')).toHaveClass('ghost');
      
      rerender(<Button variant="link" data-testid="button">Link</Button>);
      expect(screen.getByTestId('button')).toHaveClass('link');
    });
  });

  // Sizes tests
  describe('Sizes', () => {
    it('renders different sizes correctly', () => {
      const { rerender } = render(<Button size="xs" data-testid="button">Extra Small</Button>);
      expect(screen.getByTestId('button')).toHaveClass('xs');
      
      rerender(<Button size="sm" data-testid="button">Small</Button>);
      expect(screen.getByTestId('button')).toHaveClass('sm');
      
      rerender(<Button size="md" data-testid="button">Medium</Button>);
      expect(screen.getByTestId('button')).toHaveClass('md');
      
      rerender(<Button size="lg" data-testid="button">Large</Button>);
      expect(screen.getByTestId('button')).toHaveClass('lg');
      
      rerender(<Button size="xl" data-testid="button">Extra Large</Button>);
      expect(screen.getByTestId('button')).toHaveClass('xl');
    });
  });

  // Colors tests
  describe('Colors', () => {
    it('renders different colors correctly', () => {
      const { rerender } = render(<Button color="primary" data-testid="button">Primary</Button>);
      expect(screen.getByTestId('button')).toHaveClass('colorPrimary');
      
      rerender(<Button color="success" data-testid="button">Success</Button>);
      expect(screen.getByTestId('button')).toHaveClass('colorSuccess');
      
      rerender(<Button color="warning" data-testid="button">Warning</Button>);
      expect(screen.getByTestId('button')).toHaveClass('colorWarning');
      
      rerender(<Button color="danger" data-testid="button">Danger</Button>);
      expect(screen.getByTestId('button')).toHaveClass('colorDanger');
      
      rerender(<Button color="info" data-testid="button">Info</Button>);
      expect(screen.getByTestId('button')).toHaveClass('colorInfo');
      
      rerender(<Button color="default" data-testid="button">Default</Button>);
      expect(screen.getByTestId('button')).toHaveClass('colorDefault');
    });
  });

  // State tests
  describe('States', () => {
    it('handles disabled state correctly', () => {
      render(<Button disabled>Disabled Button</Button>);
      
      const button = screen.getByRole('button', { name: /disabled button/i });
      expect(button).toBeDisabled();
      expect(button).toHaveClass('disabled');
    });
    
    it('handles loading state correctly', () => {
      render(
        <Button 
          loading={{ 
            isLoading: true, 
            loadingText: "Loading..." 
          }}
        >
          Submit
        </Button>
      );
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('loading');
      expect(button).toHaveAttribute('aria-busy', 'true');
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
    
    it('applies active state correctly', () => {
      render(<Button active data-testid="button">Active Button</Button>);
      
      expect(screen.getByTestId('button')).toHaveClass('active');
    });
    
    it('applies fullWidth correctly', () => {
      render(<Button fullWidth data-testid="button">Full Width Button</Button>);
      
      expect(screen.getByTestId('button')).toHaveClass('fullWidth');
    });
  });

  // Shape tests
  describe('Shapes', () => {
    it('applies rounded correctly', () => {
      render(<Button rounded data-testid="button">Rounded Button</Button>);
      
      expect(screen.getByTestId('button')).toHaveClass('rounded');
    });
    
    it('applies pill correctly', () => {
      render(<Button pill data-testid="button">Pill Button</Button>);
      
      expect(screen.getByTestId('button')).toHaveClass('pill');
    });
  });

  // Icon tests
  describe('Icons', () => {
    it('renders with left icon correctly', () => {
      render(
        <Button 
          icons={{ 
            left: <span data-testid="left-icon">🔍</span> 
          }}
        >
          Search
        </Button>
      );
      
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
      expect(screen.getByText('Search')).toBeInTheDocument();
    });
    
    it('renders with right icon correctly', () => {
      render(
        <Button 
          icons={{ 
            right: <span data-testid="right-icon">→</span> 
          }}
        >
          Next
        </Button>
      );
      
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
      expect(screen.getByText('Next')).toBeInTheDocument();
    });
    
    it('renders with both icons correctly', () => {
      render(
        <Button 
          icons={{
            left: <span data-testid="left-icon">🔍</span>,
            right: <span data-testid="right-icon">→</span>
          }}
        >
          Search
        </Button>
      );
      
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
      expect(screen.getByText('Search')).toBeInTheDocument();
    });
    
    it('applies icon-only button styles correctly', () => {
      render(
        <Button 
          size="icon"
          data-testid="button"
        >
          <span data-testid="icon">🔍</span>
        </Button>
      );
      
      expect(screen.getByTestId('button')).toHaveClass('iconMd');
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });
    
    it('renders with icons.only property correctly', () => {
      render(
        <Button 
          icons={{ 
            left: <span data-testid="icon">🔍</span>,
            only: true
          }}
          data-testid="button"
        >
          Search
        </Button>
      );
      
      expect(screen.getByTestId('button')).toHaveClass('iconMd');
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });
  });

  // Animation tests
  describe('Animations', () => {
    it('applies animation classes correctly', () => {
      const { rerender } = render(<Button animation="scale" data-testid="button">Scale</Button>);
      expect(screen.getByTestId('button')).toHaveClass('buttonAnimation');
      expect(screen.getByTestId('button')).toHaveClass('hoverScale');
      
      rerender(<Button animation="lift" data-testid="button">Lift</Button>);
      expect(screen.getByTestId('button')).toHaveClass('buttonAnimation');
      expect(screen.getByTestId('button')).toHaveClass('hoverLift');
      
      rerender(<Button animation="pulse" data-testid="button">Pulse</Button>);
      expect(screen.getByTestId('button')).toHaveClass('buttonAnimation');
      expect(screen.getByTestId('button')).toHaveClass('pulse');
      
      rerender(<Button animation="none" data-testid="button">None</Button>);
      expect(screen.getByTestId('button')).not.toHaveClass('buttonAnimation');
    });
    
    it('applies ripple effect correctly', () => {
      const { rerender } = render(
        <Button 
          animation={{ effect: 'none', ripple: true }}
          data-testid="button"
        >
          Ripple
        </Button>
      );
      expect(screen.getByTestId('button')).toHaveClass('rippleContainer');
      
      rerender(
        <Button 
          animation={{ effect: 'none', ripple: false }}
          data-testid="button"
        >
          No Ripple
        </Button>
      );
      expect(screen.getByTestId('button')).not.toHaveClass('rippleContainer');
    });
  });

  // Interaction tests
  describe('Interactions', () => {
    it('handles click events correctly', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click Me</Button>);
      
      fireEvent.click(screen.getByRole('button', { name: /click me/i }));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
    
    it('does not trigger click events when disabled', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick} disabled>Click Me</Button>);
      
      fireEvent.click(screen.getByRole('button', { name: /click me/i }));
      expect(handleClick).not.toHaveBeenCalled();
    });
    
    it('does not trigger click events when loading', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick} loading>Click Me</Button>);
      
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  // Accessibility tests
  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <div>
          <Button>Default Button</Button>
          <Button disabled>Disabled Button</Button>
          <Button loading>Loading Button</Button>
          <Button 
            aria-label="Icon Button" 
            size="icon"
          >
            🔍
          </Button>
        </div>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
    
    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Ref Button</Button>);
      
      expect(ref.current).not.toBeNull();
      expect(ref.current?.tagName).toBe('BUTTON');
      expect(ref.current?.textContent).toBe('Ref Button');
    });
    
    it('has correct type attribute', () => {
      const { rerender } = render(<Button>Default Type</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
      
      rerender(<Button type="submit">Submit Type</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
      
      rerender(<Button type="reset">Reset Type</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'reset');
    });
    
    it('applies custom className correctly', () => {
      render(<Button className="custom-class" data-testid="button">Custom Class</Button>);
      expect(screen.getByTestId('button')).toHaveClass('custom-class');
    });
  });
});