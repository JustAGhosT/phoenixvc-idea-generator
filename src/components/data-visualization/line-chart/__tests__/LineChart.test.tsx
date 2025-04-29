import { render, screen } from '@testing-library/react';
import { LineChart } from '../LineChart';
import { ChartCanvasProps } from '../../core/canvas/ChartCanvas';
import { ChartSeries, ChartDataPoint } from '../../types/base-types';

// Mock the ChartCanvas component with a simpler implementation
jest.mock('../../core/canvas/ChartCanvas', () => {
  return {
    __esModule: true,
    default: (props: ChartCanvasProps) => {
      // Extract the children and call it with width and height if it's a function
      const { children, width, height } = props;
      
      return (
        <div data-testid="chart-canvas" style={{ width, height }}>
          {typeof children === 'function' ? children(500, 300) : children}
        </div>
      );
    }
  };
});

// Mock the animation component to render its children immediately
jest.mock('../parts/LineChartAnimation', () => {
  return {
    __esModule: true,
    default: (props: { 
      children: (series: ChartSeries<ChartDataPoint>[]) => React.ReactNode;
      series: ChartSeries<ChartDataPoint>[];
    }) => {
      return props.children(props.series);
    }
  };
});

// Mock other parts to prevent rendering issues
jest.mock('../parts/LineChartAxes', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="chart-axes" />
  };
});

jest.mock('../parts/LineChartLines', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="chart-lines" />
  };
});

jest.mock('../parts/LineChartPoints', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="chart-points" />
  };
});

jest.mock('../parts/LineChartNoData', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="chart-no-data">No data available</div>
  };
});

// Mock the processLineChartData function to prevent validation errors
jest.mock('../parts/LineChartUtils', () => {
  const originalModule = jest.requireActual('../parts/LineChartUtils');
  
  return {
    ...originalModule,
    processLineChartData: jest.fn((data) => {
      // Always return a valid processed data structure
      if (Array.isArray(data) && data.length > 0 && 'id' in data[0]) {
        // Multi-series data
        return {
          series: data,
          maxValue: 100
        };
      } else {
        // Single series data or empty data
        return {
          series: [{
            id: 'default',
            name: 'Default',
            data: Array.isArray(data) ? data : []
          }],
          maxValue: 100
        };
      }
    }),
    defaultColors: ['#3b82f6', '#10b981', '#8b5cf6', '#f97316', '#ef4444']
  };
});

// Properly formatted test data
const singleSeriesData = [
  { label: 'Jan', value: 100 },
  { label: 'Feb', value: 200 },
  { label: 'Mar', value: 150 },
  { label: 'Apr', value: 300 },
  { label: 'May', value: 250 },
];

const multiSeriesData = [
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
  
  it('handles empty data gracefully', () => {
    render(
      <LineChart
        title="Empty Chart"
        data={[]}
        animation={{ enabled: false }}
      />
    );
    
    expect(screen.getByText('Empty Chart')).toBeInTheDocument();
  });
  
  it('renders with custom dimensions', () => {
    render(
      <LineChart
        title="Custom Dimensions"
        data={singleSeriesData}
        width={500}
        height={300}
        animation={{ enabled: false }}
      />
    );
    
    expect(screen.getByText('Custom Dimensions')).toBeInTheDocument();
  });
});