import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Toggle } from './Toggle';

describe('Toggle', () => {
  it('renders correctly with label', () => {
    render(<Toggle label="Dark mode" />);
    
    expect(screen.getByLabelText('Dark mode')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });
  
  it('handles checked state correctly', () => {
    const handleChange = jest.fn();
    
    render(
      <Toggle 
        label="Notifications" 
        checked={false} 
        onChange={handleChange} 
      />
    );
    
    const toggle = screen.getByRole('checkbox');
    expect(toggle).not.toBeChecked();
    
    fireEvent.click(toggle);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
  
  it('can be controlled', () => {
    const { rerender } = render(
      <Toggle label="Notifications" checked={false} />
    );
    
    const toggle = screen.getByRole('checkbox');
    expect(toggle).not.toBeChecked();
    
    rerender(<Toggle label="Notifications" checked={true} />);
    expect(toggle).toBeChecked();
  });
  
  it('applies different sizes correctly', () => {
    const { rerender } = render(<Toggle label="Size" size="sm" data-testid="toggle" />);
    
    const toggleSwitch = screen.getByTestId('toggle').nextSibling;
    expect(toggleSwitch).toHaveClass('toggleSwitch--sm');
    
    rerender(<Toggle label="Size" size="md" data-testid="toggle" />);
    expect(toggleSwitch).toHaveClass('toggleSwitch--md');
    
    rerender(<Toggle label="Size" size="lg" data-testid="toggle" />);
    expect(toggleSwitch).toHaveClass('toggleSwitch--lg');
  });
  
  it('applies different variants correctly', () => {
    const { rerender } = render(<Toggle label="Variant" variant="primary" data-testid="toggle" />);
    
    const toggleSwitch = screen.getByTestId('toggle').nextSibling;
    expect(toggleSwitch).toHaveClass('toggleSwitch--primary');
    
    rerender(<Toggle label="Variant" variant="secondary" data-testid="toggle" />);
    expect(toggleSwitch).toHaveClass('toggleSwitch--secondary');
    
    rerender(<Toggle label="Variant" variant="success" data-testid="toggle" />);
    expect(toggleSwitch).toHaveClass('toggleSwitch--success');
    
    rerender(<Toggle label="Variant" variant="danger" data-testid="toggle" />);
    expect(toggleSwitch).toHaveClass('toggleSwitch--danger');
  });
  
  it('handles disabled state correctly', () => {
    render(<Toggle label="Disabled toggle" disabled />);
    
    const toggle = screen.getByRole('checkbox');
    expect(toggle).toBeDisabled();
    expect(toggle.nextSibling).toHaveClass('toggleSwitch--disabled');
  });
  
  it('displays helper text when provided', () => {
    render(<Toggle label="With helper" helperText="This is helper text" />);
    
    expect(screen.getByText('This is helper text')).toBeInTheDocument();
  });
  
  it('displays error message when provided', () => {
    render(<Toggle label="With error" error="This field is required" />);
    
    const errorMessage = screen.getByText('This field is required');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('toggleHelperText--error');
    expect(screen.getByRole('checkbox').nextSibling).toHaveClass('toggleSwitch--error');
  });
  
  it('positions label on the left when labelLeft is true', () => {
    render(<Toggle label="Left label" labelLeft />);
    
    const wrapper = screen.getByText('Left label').closest('div');
    expect(wrapper).toHaveClass('toggleWrapper--labelLeft');
  });
  
  it('generates a random id when not provided', () => {
    render(<Toggle label="Random ID" />);
    
    const toggle = screen.getByLabelText('Random ID');
    expect(toggle.id).toMatch(/toggle-[a-z0-9]+/);
  });
  
  it('uses provided id when available', () => {
    render(<Toggle label="Custom ID" id="custom-toggle" />);
    
    const toggle = screen.getByLabelText('Custom ID');
    expect(toggle.id).toBe('custom-toggle');
  });
});