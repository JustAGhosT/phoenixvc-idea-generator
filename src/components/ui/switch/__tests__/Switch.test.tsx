import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Switch } from '../Switch';

describe('Switch Component', () => {
  it('renders with default props', () => {
    render(<Switch />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('renders with a label', () => {
    render(<Switch label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('handles checked state', () => {
    render(<Switch label="Test Switch" checked={true} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('calls onChange when clicked', () => {
    const handleChange = jest.fn();
    render(<Switch label="Test Switch" onChange={handleChange} />);
    
    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('displays helper text when provided', () => {
    render(<Switch helperText="This is helper text" />);
    expect(screen.getByText('This is helper text')).toBeInTheDocument();
  });

  it('displays error message when provided', () => {
    render(<Switch error="This is an error message" />);
    expect(screen.getByText('This is an error message')).toBeInTheDocument();
  });

  it('prioritizes error message over helper text', () => {
    render(<Switch helperText="Helper text" error="Error message" />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
  });

  it('applies disabled state correctly', () => {
    render(<Switch label="Disabled Switch" disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('positions label on the left when labelLeft is true', () => {
    const { container } = render(<Switch label="Left Label" labelLeft />);
    const wrapper = container.querySelector(`.switchWrapper--labelLeft`);
    expect(wrapper).toBeInTheDocument();
  });

  it('applies different sizes correctly', () => {
    const { rerender, container } = render(<Switch size="sm" />);
    expect(container.querySelector(`.switchTrack--sm`)).toBeInTheDocument();
    
    rerender(<Switch size="md" />);
    expect(container.querySelector(`.switchTrack--md`)).toBeInTheDocument();
    
    rerender(<Switch size="lg" />);
    expect(container.querySelector(`.switchTrack--lg`)).toBeInTheDocument();
  });

  it('applies different variants correctly', () => {
    const { rerender, container } = render(<Switch variant="primary" checked />);
    expect(container.querySelector(`.switchTrack--primary`)).toBeInTheDocument();
    
    rerender(<Switch variant="secondary" checked />);
    expect(container.querySelector(`.switchTrack--secondary`)).toBeInTheDocument();
    
    rerender(<Switch variant="success" checked />);
    expect(container.querySelector(`.switchTrack--success`)).toBeInTheDocument();
    
    rerender(<Switch variant="danger" checked />);
    expect(container.querySelector(`.switchTrack--danger`)).toBeInTheDocument();
  });
});