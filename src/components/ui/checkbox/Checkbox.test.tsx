import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders correctly with label', () => {
    render(<Checkbox label="Accept terms" />);
    
    expect(screen.getByLabelText('Accept terms')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });
  
  it('handles checked state correctly', () => {
    const handleChange = jest.fn();
    
    render(
      <Checkbox 
        label="Remember me" 
        checked={false} 
        onChange={handleChange} 
      />
    );
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    
    fireEvent.click(checkbox);
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
  
  it('handles disabled state correctly', () => {
    render(<Checkbox label="Disabled checkbox" disabled />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
    expect(checkbox).toHaveClass('checkbox--disabled');
  });
  
  it('displays helper text when provided', () => {
    render(<Checkbox label="With helper" helperText="This is helper text" />);
    
    expect(screen.getByText('This is helper text')).toBeInTheDocument();
  });
  
  it('displays error message when provided', () => {
    render(<Checkbox label="With error" error="This field is required" />);
    
    const errorMessage = screen.getByText('This field is required');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('checkboxHelperText--error');
  });
  
  it('handles indeterminate state correctly', () => {
    const { rerender } = render(<Checkbox label="Indeterminate" indeterminate={true} />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveProperty('indeterminate', true);
    
    rerender(<Checkbox label="Not indeterminate" indeterminate={false} />);
    expect(checkbox).toHaveProperty('indeterminate', false);
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