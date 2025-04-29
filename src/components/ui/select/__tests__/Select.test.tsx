import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from '../Select';

const mockOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry', disabled: true }
];

// Create a no-op onChange handler to avoid React warnings
const noop = () => {};

describe('Select Component', () => {
  it('renders correctly with options', () => {
    render(<Select options={mockOptions} />);
    
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
    
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(3);
    expect(options[0]).toHaveTextContent('Apple');
    expect(options[1]).toHaveTextContent('Banana');
    expect(options[2]).toHaveTextContent('Cherry');
    expect(options[2]).toBeDisabled();
  });
  
  it('renders with label when provided', () => {
    render(<Select options={mockOptions} label="Fruit" />);
    
    expect(screen.getByLabelText('Fruit')).toBeInTheDocument();
  });
  
  it('handles value changes correctly', () => {
    const handleChange = jest.fn();
    
    render(
      <Select 
        options={mockOptions} 
        onChange={handleChange} 
        data-testid="select"
      />
    );
    
    const selectElement = screen.getByTestId('select');
    fireEvent.change(selectElement, { target: { value: 'banana' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(selectElement).toHaveValue('banana');
  });
  
  it('can be controlled', () => {
    const { rerender } = render(
      <Select options={mockOptions} value="apple" onChange={noop} data-testid="select" />
    );
    
    const selectElement = screen.getByTestId('select');
    expect(selectElement).toHaveValue('apple');
    
    rerender(<Select options={mockOptions} value="banana" onChange={noop} data-testid="select" />);
    expect(selectElement).toHaveValue('banana');
  });
  
  it('applies different sizes correctly', () => {
    const { rerender } = render(
      <Select options={mockOptions} size="sm" data-testid="select" />
    );
    
    let selectElement = screen.getByTestId('select');
    expect(selectElement).toHaveClass('select--sm');
    
    rerender(<Select options={mockOptions} size="md" data-testid="select" />);
    selectElement = screen.getByTestId('select');
    expect(selectElement).toHaveClass('select--md');
    
    rerender(<Select options={mockOptions} size="lg" data-testid="select" />);
    selectElement = screen.getByTestId('select');
    expect(selectElement).toHaveClass('select--lg');
  });
  
  it('applies different variants correctly', () => {
    const { rerender } = render(
      <Select options={mockOptions} variant="default" data-testid="select" />
    );
    
    let selectElement = screen.getByTestId('select');
    expect(selectElement).toHaveClass('select--default');
    
    rerender(<Select options={mockOptions} variant="outline" data-testid="select" />);
    selectElement = screen.getByTestId('select');
    expect(selectElement).toHaveClass('select--outline');
    
    rerender(<Select options={mockOptions} variant="filled" data-testid="select" />);
    selectElement = screen.getByTestId('select');
    expect(selectElement).toHaveClass('select--filled');
  });
  
  it('handles disabled state correctly', () => {
    render(<Select options={mockOptions} disabled data-testid="select" />);
    
    const selectElement = screen.getByTestId('select');
    expect(selectElement).toBeDisabled();
    expect(selectElement).toHaveClass('select--disabled');
  });
  
  it('displays helper text when provided', () => {
    render(<Select options={mockOptions} helperText="Select your favorite fruit" />);
    
    expect(screen.getByText('Select your favorite fruit')).toBeInTheDocument();
  });
  
  it('displays error message when provided', () => {
    render(<Select options={mockOptions} error="Please select a fruit" />);
    
    const errorMessage = screen.getByText('Please select a fruit');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('selectHelperText--error');
  });
  
  it('displays placeholder when provided', () => {
    render(<Select options={mockOptions} placeholder="Select a fruit" />);
    
    const placeholderOption = screen.getByText('Select a fruit');
    expect(placeholderOption).toBeInTheDocument();
    expect(placeholderOption.tagName).toBe('OPTION');
    expect(placeholderOption).toBeDisabled();
  });
  
  it('applies fullWidth class when fullWidth prop is true', () => {
    const { container } = render(<Select options={mockOptions} fullWidth />);
    
    const selectContainer = container.firstChild;
    expect(selectContainer).toHaveClass('selectContainer--fullWidth');
  });
  
  it('generates a random id when not provided', () => {
    render(<Select options={mockOptions} label="Fruit" />);
    
    const selectElement = screen.getByLabelText('Fruit');
    expect(selectElement.id).toMatch(/select-[a-z0-9]+/);
  });
  
  it('uses provided id when available', () => {
    render(<Select options={mockOptions} label="Fruit" id="custom-select" />);
    
    const selectElement = screen.getByLabelText('Fruit');
    expect(selectElement.id).toBe('custom-select');
  });
  
  it('uses defaultValue for uncontrolled component', () => {
    render(
      <Select 
        options={mockOptions} 
        defaultValue="banana" 
        data-testid="select" 
      />
    );
    
    const selectElement = screen.getByTestId('select');
    expect(selectElement).toHaveValue('banana');
  });
  
  it('uses readOnly attribute when needed', () => {
    render(
      <Select 
        options={mockOptions} 
        value="apple" 
        readOnly 
        data-testid="select" 
      />
    );
    
    const selectElement = screen.getByTestId('select');
    expect(selectElement).toHaveAttribute('readOnly');
    expect(selectElement).toHaveValue('apple');
  });
});