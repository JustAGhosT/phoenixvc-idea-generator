import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Radio } from '../Radio';

// Create a no-op onChange handler to avoid React warnings
const noop = () => {};

describe('Radio Component', () => {
  it('renders correctly with label', () => {
    render(<Radio name="test" label="Option 1" />);
    
    expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });
  
  it('handles checked state correctly', () => {
    const handleChange = jest.fn();
    
    render(
      <Radio 
        name="test" 
        label="Option 1" 
        checked={false} 
        onChange={handleChange} 
      />
    );
    
    const radio = screen.getByRole('radio');
    expect(radio).not.toBeChecked();
    
    fireEvent.click(radio);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
  
  it('can be controlled', () => {
    const { rerender } = render(
      <Radio name="test" label="Option 1" checked={false} onChange={noop} />
    );
    
    const radio = screen.getByRole('radio');
    expect(radio).not.toBeChecked();
    
    rerender(<Radio name="test" label="Option 1" checked={true} onChange={noop} />);
    expect(radio).toBeChecked();
  });
  
  it('applies different sizes correctly', () => {
    const { rerender } = render(<Radio name="test" label="Small" size="sm" data-testid="radio" />);
    
    let radio = screen.getByTestId('radio');
    expect(radio).toHaveClass('radio--sm');
    
    rerender(<Radio name="test" label="Medium" size="md" data-testid="radio" />);
    radio = screen.getByTestId('radio');
    expect(radio).toHaveClass('radio--md');
    
    rerender(<Radio name="test" label="Large" size="lg" data-testid="radio" />);
    radio = screen.getByTestId('radio');
    expect(radio).toHaveClass('radio--lg');
  });
  
  it('applies different variants correctly', () => {
    const { rerender } = render(<Radio name="test" label="Default" variant="default" data-testid="radio" />);
    
    let radio = screen.getByTestId('radio');
    expect(radio).toHaveClass('radio--default');
    
    rerender(<Radio name="test" label="Primary" variant="primary" data-testid="radio" />);
    radio = screen.getByTestId('radio');
    expect(radio).toHaveClass('radio--primary');
    
    rerender(<Radio name="test" label="Secondary" variant="secondary" data-testid="radio" />);
    radio = screen.getByTestId('radio');
    expect(radio).toHaveClass('radio--secondary');
  });
  
  it('handles disabled state correctly', () => {
    render(<Radio name="test" label="Disabled radio" disabled data-testid="radio" />);
    
    const radio = screen.getByTestId('radio');
    expect(radio).toBeDisabled();
    expect(radio).toHaveClass('radio--disabled');
  });
  
  it('displays helper text when provided', () => {
    render(<Radio name="test" label="With helper" helperText="This is helper text" />);
    
    expect(screen.getByText('This is helper text')).toBeInTheDocument();
  });
  
  it('displays error message when provided', () => {
    render(<Radio name="test" label="With error" error="Please select an option" />);
    
    const errorMessage = screen.getByText('Please select an option');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('radioHelperText--error');
  });
  
  it('generates a random id when not provided', () => {
    render(<Radio name="test" label="Random ID" />);
    
    const radio = screen.getByLabelText('Random ID');
    expect(radio.id).toMatch(/radio-[a-z0-9]+/);
  });
  
  it('uses provided id when available', () => {
    render(<Radio name="test" label="Custom ID" id="custom-radio" />);
    
    const radio = screen.getByLabelText('Custom ID');
    expect(radio.id).toBe('custom-radio');
  });
  
  it('passes additional props to the radio element', () => {
    render(<Radio name="test" label="With value" value="test-value" data-testid="radio" />);
    
    const radio = screen.getByTestId('radio');
    expect(radio).toHaveAttribute('value', 'test-value');
  });
});