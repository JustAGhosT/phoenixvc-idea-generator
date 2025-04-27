import { fireEvent, render, screen } from '@testing-library/react';
import { ChartDataPoint, ChartSeries } from '../../types/base-types';
import { LineChart } from '../LineChart';

// Mock data
const singleSeriesData: ChartDataPoint[] = [
  { label: 'Jan', value: 100 },
  { label: 'Feb', value: 200 },
  { label: 'Mar', value: 150 },
  { label: 'Apr', value: 300 },
  { label: 'May', value: 250 },
];

const multiSeriesData: ChartSeries<ChartDataPoint>[] = [
  {
    id: 'revenue',
    name: 'Revenue',
    data: [
      { label: 'Jan', value: 100 },
      { label: 'Feb', value: 200 },
      { label: 'Mar', value: 150 },
      { label: 'Apr', value: 300 },
      { label: 'May', value: 250 },
    ],
  },
  {
    id: 'profit',
    name: 'Profit',
    data: [
      { label: 'Jan', value: 50 },
      { label: 'Feb', value: 100 },
      { label: 'Mar', value: 75 },
      { label: 'Apr', value: 150 },
      { label: 'May', value: 125 },
    ],
  },
];

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe('LineChart', () => {
  it('renders with single series data', () => {
    render(
      <LineChart
        title="Monthly Revenue"
        data={singleSeriesData}
        animation={{ enabled: false }}
      />
    );
    
    expect(screen.getByText('Monthly Revenue')).toBeInTheDocument();
  });
  
  it('renders with multi-series data', () => {
    render(
      <LineChart
        title="Monthly Performance"
        data={multiSeriesData}
        animation={{ enabled: false }}
      />
    );
    
    expect(screen.getByText('Monthly Performance')).toBeInTheDocument();
  });
  
  it('displays a legend with multiple series', () => {
    render(
      <LineChart
        title="Monthly Performance"
        data={multiSeriesData}
        animation={{ enabled: false }}
      />
    );
    
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('Profit')).toBeInTheDocument();
  });
  
  it('does not display a legend with single series', () => {
    render(
      <LineChart
        title="Monthly Revenue"
        data={singleSeriesData}
        animation={{ enabled: false }}
      />
    );
    
    // Legend should not be rendered for single series
    expect(screen.queryByText('Default')).not.toBeInTheDocument();
  });
  
  it('calls onDataPointClick when a point is clicked', () => {
    const handleClick = jest.fn();
    
    render(
      <LineChart
        title="Monthly Revenue"
        data={singleSeriesData}
        onDataPointClick={handleClick}
        animation={{ enabled: false }}
      />
    );
    
    // Find and click a point
    const points = document.querySelectorAll('circle.point');
    fireEvent.click(points[0]);
    
    expect(handleClick).toHaveBeenCalled();
  });
  
  it('calls onSeriesToggle when a legend item is clicked', () => {
    const handleToggle = jest.fn();
    
    render(
      <LineChart
        title="Monthly Performance"
        data={multiSeriesData}
        onSeriesToggle={handleToggle}
        animation={{ enabled: false }}
      />
    );
    
    // Find and click a legend item
    const legendItems = document.querySelectorAll('.item');
    fireEvent.click(legendItems[0]);
    
    expect(handleToggle).toHaveBeenCalled();
  });
  
  it('renders with curved lines when curved prop is true', () => {
    render(
      <LineChart
        title="Monthly Revenue"
        data={singleSeriesData}
        curved={true}
        animation={{ enabled: false }}
      />
    );
    
    // Check that path contains C (cubic bezier) commands
    const path = document.querySelector('path.line');
    expect(path?.getAttribute('d')).toContain('C');
  });
  
  it('renders with straight lines when curved prop is false', () => {
    render(
      <LineChart
        title="Monthly Revenue"
        data={singleSeriesData}
        curved={false}
        animation={{ enabled: false }}
      />
    );
    
    // Check that path contains L (line) commands but not C (cubic bezier)
    const path = document.querySelector('path.line');
    expect(path?.getAttribute('d')).toContain('L');
    expect(path?.getAttribute('d')).not.toContain('C');
  });
  
  it('renders with area fill when showArea prop is true', () => {
    render(
      <LineChart
        title="Monthly Revenue"
        data={singleSeriesData}
        showArea={true}
        animation={{ enabled: false }}
      />
    );
    
    // Check that area path exists
    const areaPath = document.querySelector('path.area');
    expect(areaPath).toBeInTheDocument();
  });
  
  it('does not render area fill when showArea prop is false', () => {
    render(
      <LineChart
        title="Monthly Revenue"
        data={singleSeriesData}
        showArea={false}
        animation={{ enabled: false }}
      />
    );
    
    // Check that area path does not exist
    const areaPath = document.querySelector('path.area');
    expect(areaPath).not.toBeInTheDocument();
  });
  
  it('renders with points when showPoints prop is true', () => {
    render(
      <LineChart
        title="Monthly Revenue"
        data={singleSeriesData}
        showPoints={true}
        animation={{ enabled: false }}
      />
    );
    
    // Check that points exist
    const points = document.querySelectorAll('circle.point');
    expect(points.length).toBe(singleSeriesData.length);
  });
  
  it('does not render points when showPoints prop is false', () => {
    render(
      <LineChart
        title="Monthly Revenue"
        data={singleSeriesData}
        showPoints={false}
        animation={{ enabled: false }}
      />
    );
    
    // Check that points do not exist
    const points = document.querySelectorAll('circle.point');
    expect(points.length).toBe(0);
  });
  
  it('renders a no data message when data is empty', () => {
    render(
      <LineChart
        title="Monthly Revenue"
        data={[]}
        animation={{ enabled: false }}
      />
    );
    
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });
});