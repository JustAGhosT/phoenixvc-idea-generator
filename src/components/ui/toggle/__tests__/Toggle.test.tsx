import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Toggle } from '../Toggle';

describe('Toggle Component', () => {
  it('renders with default props', () => {
    render(<Toggle />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('renders with a label', () => {
    render(<Toggle label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('handles checked state', () => {
    render(<Toggle label="Test Toggle" checked={true} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('calls onChange when clicked', () => {
    const handleChange = jest.fn();
    render(<Toggle label="Test Toggle" onChange={handleChange} />);
    
    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('displays helper text when provided', () => {
    render(<Toggle helperText="This is helper text" />);
    expect(screen.getByText('This is helper text')).toBeInTheDocument();
  });

  it('displays error message when provided', () => {
    render(<Toggle error="This is an error message" />);
    expect(screen.getByText('This is an error message')).toBeInTheDocument();
  });

  it('prioritizes error message over helper text', () => {
    render(<Toggle helperText="Helper text" error="Error message" />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
  });

  it('applies disabled state correctly', () => {
    render(<Toggle label="Disabled Toggle" disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('positions label on the left when labelLeft is true', () => {
    const { container } = render(<Toggle label="Left Label" labelLeft />);
    const wrapper = container.querySelector(`.toggleWrapper--labelLeft`);
    expect(wrapper).toBeInTheDocument();
  });

  it('applies different sizes correctly', () => {
    const { rerender, container } = render(<Toggle size="sm" />);
    expect(container.querySelector(`.toggleSwitch--sm`)).toBeInTheDocument();
    
    rerender(<Toggle size="md" />);
    expect(container.querySelector(`.toggleSwitch--md`)).toBeInTheDocument();
    
    rerender(<Toggle size="lg" />);
    expect(container.querySelector(`.toggleSwitch--lg`)).toBeInTheDocument();
  });

  it('applies different variants correctly', () => {
    const { rerender, container } = render(<Toggle variant="primary" checked />);
    expect(container.querySelector(`.toggleSwitch--primary`)).toBeInTheDocument();
    
    rerender(<Toggle variant="secondary" checked />);
    expect(container.querySelector(`.toggleSwitch--secondary`)).toBeInTheDocument();
    
    rerender(<Toggle variant="success" checked />);
    expect(container.querySelector(`.toggleSwitch--success`)).toBeInTheDocument();
    
    rerender(<Toggle variant="danger" checked />);
    expect(container.querySelector(`.toggleSwitch--danger`)).toBeInTheDocument();
  });
});