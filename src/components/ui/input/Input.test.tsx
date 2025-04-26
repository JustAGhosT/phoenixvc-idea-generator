import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';

describe('Input Component', () => {
  it('renders correctly with default props', () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text');
    
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('border-gray-300');
    expect(input).not.toBeDisabled();
  });

  it('renders with a label correctly', () => {
    render(<Input label="Username" placeholder="Enter username" />);
    
    const label = screen.getByText('Username');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', expect.stringMatching(/input-/));
    
    const input = screen.getByPlaceholderText('Enter username');
    expect(input).toBeInTheDocument();
    expect(input.id).toMatch(/input-/);
  });

  it('renders with help text correctly', () => {
    render(
      <Input 
        label="Email" 
        placeholder="Enter email" 
        helpText="We'll never share your email" 
      />
    );
    
    const helpText = screen.getByText("We'll never share your email");
    expect(helpText).toBeInTheDocument();
  });

  it('renders with error state correctly', () => {
    render(
      <Input 
        label="Username" 
        placeholder="Enter username" 
        hasError={true}
        errorMessage="Username is already taken" 
      />
    );
    
    const input = screen.getByPlaceholderText('Enter username');
    expect(input).toHaveClass('border-danger');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    
    const errorMessage = screen.getByText('Username is already taken');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('text-danger');
  });

  it('renders different sizes correctly', () => {
    const { rerender } = render(<Input size="sm" placeholder="Small" />);
    expect(screen.getByPlaceholderText('Small')).toHaveClass('text-sm');
    
    rerender(<Input size="lg" placeholder="Large" />);
    expect(screen.getByPlaceholderText('Large')).toHaveClass('text-lg');
  });

  it('handles disabled state correctly', () => {
    render(<Input disabled placeholder="Disabled input" />);
    const input = screen.getByPlaceholderText('Disabled input');
    
    expect(input).toBeDisabled();
    expect(input).toHaveClass('opacity-50');
    expect(input).toHaveClass('cursor-not-allowed');
  });

  it('handles required state correctly', () => {
    render(<Input label="Username" required placeholder="Required input" />);
    
    const input = screen.getByPlaceholderText('Required input');
    expect(input).toHaveAttribute('required');
    
    const label = screen.getByText('Username');
    expect(label).toHaveClass('required');
  });

  it('renders with left icon correctly', () => {
    const leftIcon = <svg data-testid="left-icon" />;
    render(<Input leftIcon={leftIcon} placeholder="With left icon" />);
    
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('With left icon')).toHaveClass('pl-10');
  });

  it('renders with right icon correctly', () => {
    const rightIcon = <svg data-testid="right-icon" />;
    render(<Input rightIcon={rightIcon} placeholder="With right icon" />);
    
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('With right icon')).toHaveClass('pr-10');
  });

  it('handles clear button correctly', () => {
    const handleClear = jest.fn();
    render(
      <Input 
        value="Test value" 
        onChange={() => {}} 
        showClearButton 
        onClear={handleClear} 
        placeholder="Clearable input" 
      />
    );
    
    const clearButton = screen.getByLabelText('Clear input');
    expect(clearButton).toBeInTheDocument();
    
    fireEvent.click(clearButton);
    expect(handleClear).toHaveBeenCalledTimes(1);
  });

  it('handles password toggle correctly', () => {
    render(
      <Input 
        type="password" 
        showPasswordToggle 
        placeholder="Password" 
      />
    );
    
    const input = screen.getByPlaceholderText('Password');
    expect(input).toHaveAttribute('type', 'password');
    
    const toggleButton = screen.getByLabelText('Show password');
    expect(toggleButton).toBeInTheDocument();
    
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'text');
    
    const hideButton = screen.getByLabelText('Hide password');
    expect(hideButton).toBeInTheDocument();
    
    fireEvent.click(hideButton);
    expect(input).toHaveAttribute('type', 'password');
  });

  it('handles loading state correctly', () => {
    render(<Input loading placeholder="Loading input" />);
    
    const input = screen.getByPlaceholderText('Loading input');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('cursor-wait');
    
    const spinner = document.querySelector('svg.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('forwards refs correctly', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} placeholder="Ref input" />);
    
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('INPUT');
    expect(ref.current?.placeholder).toBe('Ref input');
  });

  it('applies shape props correctly', () => {
    const { rerender } = render(<Input rounded placeholder="Rounded input" />);
    expect(screen.getByPlaceholderText('Rounded input')).toHaveClass('rounded-md');
    
    rerender(<Input pill placeholder="Pill input" />);
    expect(screen.getByPlaceholderText('Pill input')).toHaveClass('rounded-full');
  });

  it('handles change events correctly', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} placeholder="Test input" />);
    
    const input = screen.getByPlaceholderText('Test input');
    fireEvent.change(input, { target: { value: 'New value' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});