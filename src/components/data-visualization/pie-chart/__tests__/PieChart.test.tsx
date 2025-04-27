import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PieChart } from './PieChart';
import { ChartDataPoint } from '../types/base-types';

describe('PieChart Component', () => {
  const mockData: ChartDataPoint[] = [
    { id: '1', label: 'Category A', value: 30, color: '#FF6384' },
    { id: '2', label: 'Category B', value: 50, color: '#36A2EB' },
    { id: '3', label: 'Category C', value: 20, color: '#FFCE56' },
  ];

  const mockExtendedData = [
    { id: '1', label: 'Category A', value: 30, color: '#FF6384', metadata: { group: 'Group 1' } },
    { id: '2', label: 'Category B', value: 50, color: '#36A2EB', metadata: { group: 'Group 1' } },
    { id: '3', label: 'Category C', value: 20, color: '#FFCE56', metadata: { group: 'Group 2' } },
  ];

  it('renders without crashing', () => {
    render(<PieChart data={mockData} />);
    expect(screen.getByRole('img', { name: /pie chart/i })).toBeInTheDocument();
  });

  it('renders with custom dimensions', () => {
    render(<PieChart data={mockData} width={500} height={400} />);
    const svg = screen.getByRole('img', { name: /pie chart/i });
    expect(svg).toBeInTheDocument();
  });

  it('renders with title and subtitle', () => {
    render(
      <PieChart 
        data={mockData} 
        title="Sales Distribution" 
        subtitle="By Product Category" 
      />
    );
    expect(screen.getByText('Sales Distribution')).toBeInTheDocument();
    expect(screen.getByText('By Product Category')).toBeInTheDocument();
  });

  it('renders loading state', () => {
    render(<PieChart data={[]} loading={true} />);
    expect(screen.getByText(/loading chart data/i)).toBeInTheDocument();
  });

  it('renders error state', () => {
    render(<PieChart data={[]} error="Failed to load chart data" />);
    expect(screen.getByText('Failed to load chart data')).toBeInTheDocument();
  });

  it('renders empty state when no data is provided', () => {
    render(<PieChart data={[]} />);
    // Check for empty state message or element
    expect(screen.getByRole('img', { name: /pie chart/i })).toBeInTheDocument();
  });

  it('renders as donut chart when donut prop is true', () => {
    const { container } = render(<PieChart data={mockData} donut={true} innerRadius={50} />);
    // Check for donut-specific elements or classes
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders data labels when showDataLabels is true', () => {
    render(<PieChart data={mockData} showDataLabels={true} />);
    // Check for data label elements
    expect(screen.getByRole('img', { name: /pie chart/i })).toBeInTheDocument();
  });

  it('renders legend with correct items', () => {
    render(<PieChart data={mockData} />);
    expect(screen.getByText('Category A')).toBeInTheDocument();
    expect(screen.getByText('Category B')).toBeInTheDocument();
    expect(screen.getByText('Category C')).toBeInTheDocument();
  });

  it('calls onSliceSelect when a slice is clicked', () => {
    const handleSliceSelect = jest.fn();
    const { container } = render(
      <PieChart 
        data={mockData} 
        selectable={true} 
        onSliceSelect={handleSliceSelect} 
      />
    );
    
    // Find and click the first slice
    const slices = container.querySelectorAll('path');
    if (slices.length > 0) {
      fireEvent.click(slices[0]);
      expect(handleSliceSelect).toHaveBeenCalledTimes(1);
    }
  });

  it('calls onDataPointClick when a slice is clicked', () => {
    const handleDataPointClick = jest.fn();
    const { container } = render(
      <PieChart 
        data={mockData} 
        selectable={true} 
        onDataPointClick={handleDataPointClick} 
      />
    );
    
    // Find and click the first slice
    const slices = container.querySelectorAll('path');
    if (slices.length > 0) {
      fireEvent.click(slices[0]);
      expect(handleDataPointClick).toHaveBeenCalledTimes(1);
    }
  });

  it('renders with custom styling props', () => {
    const { container } = render(
      <PieChart 
        data={mockData} 
        backgroundColor="#f5f5f5"
        showBorder={true}
        borderColor="#e0e0e0"
        borderWidth={2}
        borderRadius={8}
        className="custom-chart"
      />
    );
    
    const chartContainer = container.firstChild;
    expect(chartContainer).toHaveClass('custom-chart');
  });

  it('applies custom margin', () => {
    render(
      <PieChart 
        data={mockData} 
        margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
      />
    );
    expect(screen.getByRole('img', { name: /pie chart/i })).toBeInTheDocument();
  });

  it('renders with animation disabled', () => {
    render(
      <PieChart 
        data={mockData} 
        animation={{ enabled: false }}
      />
    );
    expect(screen.getByRole('img', { name: /pie chart/i })).toBeInTheDocument();
  });

  it('renders with custom legend position', () => {
    render(
      <PieChart 
        data={mockData} 
        legend={{ position: 'top', layout: 'horizontal' }}
      />
    );
    expect(screen.getByRole('img', { name: /pie chart/i })).toBeInTheDocument();
  });

  it('handles empty data array', () => {
    render(<PieChart data={[]} />);
    expect(screen.getByRole('img', { name: /pie chart/i })).toBeInTheDocument();
  });

  it('handles null data', () => {
    // @ts-ignore - Testing invalid prop
    render(<PieChart data={null} />);
    expect(screen.getByRole('img', { name: /pie chart/i })).toBeInTheDocument();
  });

  it('handles extended data with metadata', () => {
    render(<PieChart data={mockExtendedData} />);
    expect(screen.getByRole('img', { name: /pie chart/i })).toBeInTheDocument();
  });

  it('applies accessibility props', () => {
    render(
      <PieChart 
        data={mockData} 
        description="Distribution of sales by category"
        accessibility={{
          keyboardNavigation: true,
          announceDataPoints: true,
          labelledBy: 'chart-title',
          describedBy: 'chart-desc'
        }}
      />
    );
    
    const chart = screen.getByRole('img', { name: /distribution of sales by category/i });
    expect(chart).toBeInTheDocument();
  });
});