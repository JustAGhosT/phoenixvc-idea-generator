import { fireEvent, render, screen } from '@testing-library/react';
import BarChart from '../BarChart';

describe('BarChart', () => {
  const mockData = [
    { label: 'Project A', value: 85 },
    { label: 'Project B', value: 65 },
    { label: 'Project C', value: 45 },
  ];

  it('renders with basic props', () => {
    render(<BarChart data={mockData} title="Test Chart" />);
    
    // Check if title is rendered
    expect(screen.getByText('Test Chart')).toBeInTheDocument();
    
    // Check if bars are rendered
    const bars = document.querySelectorAll('.bar');
    expect(bars.length).toBe(mockData.length);
  });

  it('renders with vertical orientation by default', () => {
    const { container } = render(<BarChart data={mockData} />);
    
    // In vertical orientation, bars should have height but fixed width
    const firstBar = container.querySelector('.bar');
    const barStyle = window.getComputedStyle(firstBar as Element);
    
    // The actual values will depend on the container size, but we can check if height is set
    expect(firstBar).toHaveAttribute('height');
  });

  it('renders with horizontal orientation when specified', () => {
    const { container } = render(<BarChart data={mockData} orientation="horizontal" />);
    
    // In horizontal orientation, bars should have width but fixed height
    const firstBar = container.querySelector('.bar');
    const barStyle = window.getComputedStyle(firstBar as Element);
    
    // The actual values will depend on the container size, but we can check if width is set
    expect(firstBar).toHaveAttribute('width');
  });

  it('handles empty data gracefully', () => {
    render(<BarChart data={[]} title="Empty Chart" />);
    
    // Should show "No data available" message
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('calls onDataPointClick when a bar is clicked', () => {
    const handleClick = jest.fn();
    const { container } = render(
      <BarChart data={mockData} onDataPointClick={handleClick} />
    );
    
    // Click the first bar
    const firstBar = container.querySelector('.bar');
    fireEvent.click(firstBar as Element);
    
    // Check if click handler was called
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows tooltip on hover', async () => {
    const { container } = render(<BarChart data={mockData} />);
    
    // Hover over the first bar
    const firstBar = container.querySelector('.bar');
    fireEvent.mouseEnter(firstBar as Element);
    
    // Check if tooltip is visible
    const tooltip = container.querySelector('.tooltip');
    expect(tooltip).toBeVisible();
    
    // Check if tooltip contains the correct data
    expect(tooltip).toHaveTextContent('Project A');
    expect(tooltip).toHaveTextContent('85');
  });

  it('hides tooltip on mouse leave', async () => {
    const { container } = render(<BarChart data={mockData} />);
    
    // Hover over and then leave the first bar
    const firstBar = container.querySelector('.bar');
    fireEvent.mouseEnter(firstBar as Element);
    fireEvent.mouseLeave(firstBar as Element);
    
    // Check if tooltip is hidden
    const tooltip = container.querySelector('.tooltip');
    expect(tooltip).not.toBeVisible();
  });
});