import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Badge } from '../Badge';

// Extend Jest matchers with accessibility violations
expect.extend(toHaveNoViolations);

describe('Badge Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders correctly with default props', () => {
      render(<Badge>Default</Badge>);
      
      const badge = screen.getByText('Default');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('default');
      expect(badge).toHaveClass('md');
    });
    
    it('renders with custom text content', () => {
      render(<Badge>Custom Text</Badge>);
      expect(screen.getByText('Custom Text')).toBeInTheDocument();
    });
    
    it('renders with children components', () => {
      render(
        <Badge>
          <span data-testid="child-element">Child Element</span>
        </Badge>
      );
      expect(screen.getByTestId('child-element')).toBeInTheDocument();
    });
  });

  // Variants tests
  describe('Variants', () => {
    it('renders different variants correctly', () => {
      const { rerender } = render(<Badge variant="default" data-testid="badge">Default</Badge>);
      expect(screen.getByTestId('badge')).toHaveClass('default');
      
      rerender(<Badge variant="primary" data-testid="badge">Primary</Badge>);
      expect(screen.getByTestId('badge')).toHaveClass('primary');
      
      rerender(<Badge variant="secondary" data-testid="badge">Secondary</Badge>);
      expect(screen.getByTestId('badge')).toHaveClass('secondary');
      
      rerender(<Badge variant="success" data-testid="badge">Success</Badge>);
      expect(screen.getByTestId('badge')).toHaveClass('success');
      
      rerender(<Badge variant="warning" data-testid="badge">Warning</Badge>);
      expect(screen.getByTestId('badge')).toHaveClass('warning');
      
      rerender(<Badge variant="danger" data-testid="badge">Danger</Badge>);
      expect(screen.getByTestId('badge')).toHaveClass('danger');
      
      rerender(<Badge variant="info" data-testid="badge">Info</Badge>);
      expect(screen.getByTestId('badge')).toHaveClass('info');
    });
  });

  // Sizes tests
  describe('Sizes', () => {
    it('renders different sizes correctly', () => {
      const { rerender } = render(<Badge size="sm" data-testid="badge">Small</Badge>);
      expect(screen.getByTestId('badge')).toHaveClass('sm');
      
      rerender(<Badge size="md" data-testid="badge">Medium</Badge>);
      expect(screen.getByTestId('badge')).toHaveClass('md');
      
      rerender(<Badge size="lg" data-testid="badge">Large</Badge>);
      expect(screen.getByTestId('badge')).toHaveClass('lg');
    });
  });

  // Style variants tests
  describe('Style Variants', () => {
    it('applies outline style correctly', () => {
      const { rerender } = render(<Badge outline data-testid="badge">Outline</Badge>);
      expect(screen.getByTestId('badge')).toHaveClass('outline');
      expect(screen.getByTestId('badge')).toHaveClass('outlineDefault');
      
      rerender(<Badge outline variant="primary" data-testid="badge">Outline Primary</Badge>);
      expect(screen.getByTestId('badge')).toHaveClass('outline');
      expect(screen.getByTestId('badge')).toHaveClass('outlinePrimary');
    });
    
    it('applies soft style correctly', () => {
      const { rerender } = render(<Badge soft data-testid="badge">Soft</Badge>);
      expect(screen.getByTestId('badge')).toHaveClass('soft');
      expect(screen.getByTestId('badge')).toHaveClass('softDefault');
      
      rerender(<Badge soft variant="primary" data-testid="badge">Soft Primary</Badge>);
      expect(screen.getByTestId('badge')).toHaveClass('soft');
      expect(screen.getByTestId('badge')).toHaveClass('softPrimary');
    });
    
    it('applies rounded style correctly', () => {
      render(<Badge rounded data-testid="badge">Rounded</Badge>);
      expect(screen.getByTestId('badge')).toHaveClass('rounded');
    });
  });

  // Features tests
  describe('Features', () => {
    it('renders with dot indicator correctly', () => {
      render(<Badge withDot data-testid="badge">With Dot</Badge>);
      
      expect(screen.getByTestId('badge')).toHaveClass('withDot');
      const dot = screen.getByTestId('badge').firstChild;
      expect(dot).toHaveClass('dot');
      expect(dot).toHaveClass('dotDefault');
    });
    
    it('renders with left icon correctly', () => {
      render(
        <Badge leftIcon={<span data-testid="left-icon">🔔</span>} data-testid="badge">
          With Left Icon
        </Badge>
      );
      
      expect(screen.getByTestId('badge')).toHaveClass('withIcon');
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    });
    
    it('renders with right icon correctly', () => {
      render(
        <Badge rightIcon={<span data-testid="right-icon">→</span>} data-testid="badge">
          With Right Icon
        </Badge>
      );
      
      expect(screen.getByTestId('badge')).toHaveClass('withIcon');
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });
    
    it('applies interactive style correctly', () => {
      render(<Badge interactive data-testid="badge">Interactive</Badge>);
      expect(screen.getByTestId('badge')).toHaveClass('interactive');
    });
  });

  // Animation tests
  describe('Animations', () => {
    it('applies animation classes correctly', () => {
      const { rerender } = render(<Badge animation="pulse" data-testid="badge">Pulse</Badge>);
      expect(screen.getByTestId('badge')).toHaveClass('badgeAnimation');
      expect(screen.getByTestId('badge')).toHaveClass('pulse');
      
      rerender(<Badge animation="glow" data-testid="badge">Glow</Badge>);
      expect(screen.getByTestId('badge')).toHaveClass('badgeAnimation');
      expect(screen.getByTestId('badge')).toHaveClass('glow');
      
      rerender(<Badge animation="bounce" data-testid="badge">Bounce</Badge>);
      expect(screen.getByTestId('badge')).toHaveClass('badgeAnimation');
      expect(screen.getByTestId('badge')).toHaveClass('bounce');
      
      rerender(<Badge animation="fadeIn" data-testid="badge">Fade In</Badge>);
      expect(screen.getByTestId('badge')).toHaveClass('badgeAnimation');
      expect(screen.getByTestId('badge')).toHaveClass('fadeIn');
      
      rerender(<Badge animation="none" data-testid="badge">None</Badge>);
      expect(screen.getByTestId('badge')).not.toHaveClass('badgeAnimation');
    });
    
    it('applies hover effect classes correctly', () => {
      const { rerender } = render(<Badge hoverEffect="scale" data-testid="badge">Scale</Badge>);
      expect(screen.getByTestId('badge')).toHaveClass('hoverScale');
      
      rerender(<Badge hoverEffect="lift" data-testid="badge">Lift</Badge>);
      expect(screen.getByTestId('badge')).toHaveClass('hoverLift');
      
      rerender(<Badge hoverEffect="none" data-testid="badge">None</Badge>);
      expect(screen.getByTestId('badge')).not.toHaveClass('hoverScale');
      expect(screen.getByTestId('badge')).not.toHaveClass('hoverLift');
    });
  });

  // Interaction tests
  describe('Interactions', () => {
    it('handles click events when interactive', () => {
      const handleClick = jest.fn();
      render(<Badge interactive onClick={handleClick}>Click Me</Badge>);
      
      fireEvent.click(screen.getByText('Click Me'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  // Accessibility tests
  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <div>
          <Badge>Default Badge</Badge>
          <Badge variant="primary">Primary Badge</Badge>
          <Badge variant="danger">Danger Badge</Badge>
          <Badge withDot>Badge with Dot</Badge>
          <Badge leftIcon={<span>🔔</span>}>Badge with Icon</Badge>
          <Badge interactive>Interactive Badge</Badge>
        </div>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  // Combination tests
  describe('Combinations', () => {
    it('combines multiple props correctly', () => {
      render(
        <Badge 
          variant="success" 
          size="lg" 
          rounded 
          outline 
          leftIcon={<span data-testid="icon">✓</span>}
          animation="pulse"
          data-testid="badge"
        >
          Combined
        </Badge>
      );
      
      const badge = screen.getByTestId('badge');
      expect(badge).toHaveClass('success');
      expect(badge).toHaveClass('lg');
      expect(badge).toHaveClass('rounded');
      expect(badge).toHaveClass('outline');
      expect(badge).toHaveClass('outlineSuccess');
      expect(badge).toHaveClass('withIcon');
      expect(badge).toHaveClass('pulse');
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByText('Combined')).toBeInTheDocument();
    });
  });
});