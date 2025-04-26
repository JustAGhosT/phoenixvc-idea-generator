import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '../Input';

describe('Input Component', () => {
  // Basic rendering tests
  it('renders correctly with default props', () => {
    render(<Input aria-label="Test input" />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('renders with a label', () => {
    render(<Input label="Username" />);
    const label = screen.getByText('Username');
    expect(label).toBeInTheDocument();
    const input = screen.getByLabelText('Username');
    expect(input).toBeInTheDocument();
  });

  it('renders with a placeholder', () => {
    render(<Input placeholder="Enter your name" />);
    const input = screen.getByPlaceholderText('Enter your name');
    expect(input).toBeInTheDocument();
  });

  it('renders with help text', () => {
    render(<Input label="Email" helpText="We'll never share your email" />);
    const helpText = screen.getByText("We'll never share your email");
    expect(helpText).toBeInTheDocument();
  });

  it('renders with error message when hasError is true', () => {
    render(
      <Input 
        label="Username" 
        hasError={true} 
        errorMessage="Username is already taken" 
      />
    );
    const errorMessage = screen.getByText('Username is already taken');
    expect(errorMessage).toBeInTheDocument();
    const input = screen.getByLabelText('Username');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  // Interaction tests
  it('calls onChange when the input value changes', async () => {
    const handleChange = jest.fn();
    render(<Input label="Username" onChange={handleChange} />);
    
    const input = screen.getByLabelText('Username');
    await userEvent.type(input, 'test');
    
    expect(handleChange).toHaveBeenCalledTimes(4); // Once for each character
  });

  it('calls onFocus when the input is focused', () => {
    const handleFocus = jest.fn();
    render(<Input label="Username" onFocus={handleFocus} />);
    
    const input = screen.getByLabelText('Username');
    fireEvent.focus(input);
    
    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it('calls onBlur when the input loses focus', () => {
    const handleBlur = jest.fn();
    render(<Input label="Username" onBlur={handleBlur} />);
    
    const input = screen.getByLabelText('Username');
    fireEvent.focus(input);
    fireEvent.blur(input);
    
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  // Feature tests
  it('toggles password visibility when showPasswordToggle is true', async () => {
    render(
      <Input 
        label="Password" 
        type="password" 
        showPasswordToggle={true} 
      />
    );
    
    const input = screen.getByLabelText('Password');
    expect(input).toHaveAttribute('type', 'password');
    
    const toggleButton = screen.getByRole('button', { name: /show password/i });
    await userEvent.click(toggleButton);
    
    expect(input).toHaveAttribute('type', 'text');
    
    const hideButton = screen.getByRole('button', { name: /hide password/i });
    await userEvent.click(hideButton);
    
    expect(input).toHaveAttribute('type', 'password');
  });

  it('clears the input when the clear button is clicked', async () => {
    const handleClear = jest.fn();
    render(
      <Input 
        label="Search" 
        value="test query" 
        showClearButton={true} 
        onClear={handleClear} 
        onChange={() => {}}
      />
    );
    
    const clearButton = screen.getByRole('button', { name: /clear input/i });
    await userEvent.click(clearButton);
    
    expect(handleClear).toHaveBeenCalledTimes(1);
  });

  it('shows character count when showCharacterCount is true', async () => {
    render(
      <Input 
        label="Bio" 
        showCharacterCount={true} 
        maxLength={100} 
      />
    );
    
    const input = screen.getByLabelText('Bio');
    await userEvent.type(input, 'Hello world');
    
    const charCount = screen.getByText('11/100');
    expect(charCount).toBeInTheDocument();
  });

  it('applies warning class to character count when approaching maxLength', async () => {
    render(
      <Input 
        label="Tweet" 
        showCharacterCount={true} 
        maxLength={10} 
        warningThreshold={80} 
      />
    );
    
    const input = screen.getByLabelText('Tweet');
    await userEvent.type(input, '12345678');
    
    // 8 characters is 80% of the 10 character limit
    const charCount = screen.getByText('8/10');
    expect(charCount).toHaveClass('characterCount--warning');
  });

  // Animation tests
  it('applies shake animation when hasError changes to true', async () => {
    const { rerender } = render(
      <Input 
        label="Username" 
        hasError={false} 
        showErrorAnimation={true} 
      />
    );
    
    const input = screen.getByLabelText('Username');
    expect(input).not.toHaveClass('inputErrorShake');
    
    rerender(
      <Input 
        label="Username" 
        hasError={true} 
        showErrorAnimation={true} 
      />
    );
    
    expect(input).toHaveClass('inputErrorShake');
    
    // Wait for animation to end
    await waitFor(() => {
      expect(input).not.toHaveClass('inputErrorShake');
    }, { timeout: 600 });
  });

  // Floating label tests
  it('animates the floating label when input is focused', async () => {
    render(
      <Input 
        label="Email" 
        floatingLabel={true} 
        placeholder=" " 
      />
    );
    
    const input = screen.getByRole('textbox');
    const label = screen.getByText('Email');
    
    expect(label).not.toHaveClass('labelFloatActive');
    
    await userEvent.click(input);
    
    expect(label).toHaveClass('labelFloatActive');
  });

  // Accessibility tests
  it('supports aria attributes', () => {
    render(
      <Input 
        label="Username" 
        aria-describedby="custom-description" 
        aria-details="more-details" 
      />
    );
    
    const input = screen.getByLabelText('Username');
    expect(input).toHaveAttribute('aria-describedby', 'custom-description');
    expect(input).toHaveAttribute('aria-details', 'more-details');
  });

  it('marks required inputs appropriately', () => {
    render(<Input label="Username" required />);
    
    const label = screen.getByText('Username');
    expect(label).toHaveClass('label--required');
    
    const input = screen.getByLabelText('Username');
    expect(input).toHaveAttribute('required');
  });

  it('disables the input when disabled prop is true', () => {
    render(<Input label="Username" disabled />);
    
    const input = screen.getByLabelText('Username');
    expect(input).toBeDisabled();
  });

  it('supports data-testid attribute', () => {
    render(<Input label="Username" data-testid="username-input" />);
    
    const input = screen.getByTestId('username-input');
    expect(input).toBeInTheDocument();
  });
});