import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SegmentedControl } from '../SegmentedControl';

describe('SegmentedControl', () => {
  const options = [
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
  ];

  it('renders correctly with default props', () => {
    render(<SegmentedControl options={options} />);
    
    const segmentedControl = screen.getByRole('group', { name: 'Segmented Control' });
    expect(segmentedControl).toBeInTheDocument();
    expect(segmentedControl).toHaveClass('segmentedControl');
    
    options.forEach(option => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('selects the default value when provided', () => {
    render(<SegmentedControl options={options} defaultValue="week" />);
    
    const weekButton = screen.getByText('Week');
    expect(weekButton.closest('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('selects the controlled value when provided', () => {
    render(<SegmentedControl options={options} value="month" />);
    
    const monthButton = screen.getByText('Month');
    expect(monthButton.closest('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('calls onChange when an option is clicked', () => {
    const handleChange = jest.fn();
    render(<SegmentedControl options={options} onChange={handleChange} />);
    
    const weekButton = screen.getByText('Week');
    fireEvent.click(weekButton);
    
    expect(handleChange).toHaveBeenCalledWith('week');
  });

  it('does not call onChange when disabled', () => {
    const handleChange = jest.fn();
    render(<SegmentedControl options={options} onChange={handleChange} disabled />);
    
    const weekButton = screen.getByText('Week');
    fireEvent.click(weekButton);
    
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('applies fullWidth class when fullWidth is true', () => {
    render(<SegmentedControl options={options} fullWidth />);
    
    // The ButtonGroup inside should have fullWidth prop
    const buttonGroup = screen.getByRole('group').firstChild;
    expect(buttonGroup).toHaveClass('buttonGroup--fullWidth');
  });

  it('renders only icons when iconsOnly is true', () => {
    const optionsWithIcons = [
      { value: 'day', label: 'Day', icon: <span data-testid="day-icon">☀️</span> },
      { value: 'night', label: 'Night', icon: <span data-testid="night-icon">🌙</span> },
    ];
    
    render(<SegmentedControl options={optionsWithIcons} iconsOnly />);
    
    expect(screen.queryByText('Day')).not.toBeInTheDocument();
    expect(screen.queryByText('Night')).not.toBeInTheDocument();
    expect(screen.getByTestId('day-icon')).toBeInTheDocument();
    expect(screen.getByTestId('night-icon')).toBeInTheDocument();
  });

  it('passes additional props to the underlying div', () => {
    render(
      <SegmentedControl 
        options={options} 
        data-testid="custom-segmented-control" 
      />
    );
    
    expect(screen.getByTestId('custom-segmented-control')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<SegmentedControl options={options} className="custom-class" />);
    
    const segmentedControl = screen.getByRole('group', { name: 'Segmented Control' });
    expect(segmentedControl).toHaveClass('custom-class');
  });
});