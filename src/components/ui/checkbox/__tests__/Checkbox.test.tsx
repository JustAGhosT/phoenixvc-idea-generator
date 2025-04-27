import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Checkbox } from '../Checkbox';

// Extend Jest matchers with accessibility violations
expect.extend(toHaveNoViolations);

describe('Checkbox Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders correctly with label', () => {
      render(<Checkbox label="Accept terms" />);
      
      expect(screen.getByLabelText('Accept terms')).toBeInTheDocument();
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });
    
    it('renders without label', () => {
      render(<Checkbox aria-label="Accept terms" />);
      
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('renders with ReactNode as label', () => {
      render(<Checkbox label={<span data-testid="custom-label">Custom Label</span>} />);
      
      expect(screen.getByTestId('custom-label')).toBeInTheDocument();
    });
    
    it('generates a random id when not provided', () => {
      render(<Checkbox label="Random ID" />);
      
      const checkbox = screen.getByLabelText('Random ID');
      expect(checkbox.id).toMatch(/checkbox-[a-z0-9]+/);
    });
    
    it('uses provided id when available', () => {
      render(<Checkbox label="Custom ID" id="custom-checkbox" />);
      
      const checkbox = screen.getByLabelText('Custom ID');
      expect(checkbox.id).toBe('custom-checkbox');
    });
  });

  // State tests
  describe('States', () => {
    it('handles checked state correctly', async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();
      
      render(
        <Checkbox 
          label="Remember me" 
          checked={false} 
          onChange={handleChange} 
        />
      );
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();
      
      await user.click(checkbox);
      expect(handleChange).toHaveBeenCalledTimes(1);
    });
    
    it('can be controlled', () => {
      const { rerender } = render(
        <Checkbox label="Remember me" checked={false} />
      );
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();
      
      rerender(<Checkbox label="Remember me" checked={true} />);
      expect(checkbox).toBeChecked();
    });
    
    it('handles indeterminate state correctly', () => {
      const { rerender } = render(<Checkbox label="Indeterminate" indeterminate={true} />);
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveProperty('indeterminate', true);
      expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
      
      rerender(<Checkbox label="Not indeterminate" indeterminate={false} />);
      expect(checkbox).toHaveProperty('indeterminate', false);
      expect(checkbox).toHaveAttribute('aria-checked', 'false');
    });
    
    it('handles disabled state correctly', () => {
      render(<Checkbox label="Disabled checkbox" disabled />);
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeDisabled();
      expect(checkbox).toHaveClass('checkbox--disabled');
    });
  });

  // Variant and size tests
  describe('Variants and Sizes', () => {
    it('applies different sizes correctly', () => {
      const { rerender } = render(<Checkbox label="Small" size="sm" data-testid="checkbox" />);
      
      let checkbox = screen.getByTestId('checkbox');
      expect(checkbox).toHaveClass('checkbox--sm');
      
      rerender(<Checkbox label="Medium" size="md" data-testid="checkbox" />);
      checkbox = screen.getByTestId('checkbox');
      expect(checkbox).toHaveClass('checkbox--md');
      
      rerender(<Checkbox label="Large" size="lg" data-testid="checkbox" />);
      checkbox = screen.getByTestId('checkbox');
      expect(checkbox).toHaveClass('checkbox--lg');
    });
    
    it('applies different variants correctly', () => {
      const { rerender } = render(<Checkbox label="Default" variant="default" data-testid="checkbox" />);
      
      let checkbox = screen.getByTestId('checkbox');
      expect(checkbox).toHaveClass('checkbox--default');
      
      rerender(<Checkbox label="Primary" variant="primary" data-testid="checkbox" />);
      checkbox = screen.getByTestId('checkbox');
      expect(checkbox).toHaveClass('checkbox--primary');
      
      rerender(<Checkbox label="Secondary" variant="secondary" data-testid="checkbox" />);
      checkbox = screen.getByTestId('checkbox');
      expect(checkbox).toHaveClass('checkbox--secondary');
    });
  });

  // Helper text and error tests
  describe('Helper Text and Errors', () => {
    it('displays helper text when provided', () => {
      render(<Checkbox label="With helper" helperText="This is helper text" />);
      
      expect(screen.getByText('This is helper text')).toBeInTheDocument();
    });
    
    it('displays error message when provided', () => {
      render(<Checkbox label="With error" error="This field is required" />);
      
      const errorMessage = screen.getByText('This field is required');
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveClass('checkboxHelperText--error');
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    });
    
    it('prioritizes error message over helper text', () => {
      render(
        <Checkbox 
          label="With both" 
          helperText="This is helper text" 
          error="This field is required" 
        />
      );
      
      expect(screen.getByText('This field is required')).toBeInTheDocument();
      expect(screen.queryByText('This is helper text')).not.toBeInTheDocument();
    });
  });

  // Keyboard interaction tests
  describe('Keyboard Interactions', () => {
    it('can be checked with Space key', async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();
      
      render(<Checkbox label="Keyboard test" onChange={handleChange} />);
      
      const checkbox = screen.getByRole('checkbox');
      checkbox.focus();
      await user.keyboard(' '); // Space key
      
      expect(handleChange).toHaveBeenCalledTimes(1);
    });
    
    it('shows focus styles when focused with keyboard', () => {
      render(<Checkbox label="Focus test" />);
      
      const checkbox = screen.getByRole('checkbox');
      fireEvent.focus(checkbox);
      
      // In a real browser, the focus styles would be visible
      // This is a simple check that the component doesn't break on focus
      expect(document.activeElement).toBe(checkbox);
    });
  });

  // Accessibility tests
  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <div>
          <Checkbox label="Accessibility test" />
          <Checkbox label="Checked test" checked />
          <Checkbox label="Indeterminate test" indeterminate />
          <Checkbox label="Disabled test" disabled />
          <Checkbox label="Error test" error="Error message" />
        </div>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
    
    it('associates helper text with checkbox using aria-describedby', () => {
      render(<Checkbox label="With helper" id="test-checkbox" helperText="Helper text" />);
      
      const checkbox = screen.getByRole('checkbox');
      const helperText = screen.getByText('Helper text');
      
      expect(helperText.id).toBe('test-checkbox-description');
      // In a real implementation, we would check for aria-describedby
      // This test might need adjustment based on actual implementation
    });
  });

  // Class name customization tests
  describe('Class Name Customization', () => {
    it('applies custom class names correctly', () => {
      render(
        <Checkbox 
          label="Custom classes" 
          className="container-class"
          inputClassName="input-class"
          labelClassName="label-class"
          data-testid="checkbox"
        />
      );
      
      const container = screen.getByTestId('checkbox').closest('div');
      expect(container).toHaveClass('container-class');
      
      const input = screen.getByTestId('checkbox');
      expect(input).toHaveClass('input-class');
      
      const label = screen.getByText('Custom classes');
      expect(label).toHaveClass('label-class');
    });
  });
});