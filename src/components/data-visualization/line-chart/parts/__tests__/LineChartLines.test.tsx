import { render } from '@testing-library/react';
import { ChartDataPoint, ChartSeries } from '../../../types/base-types';
import LineChartLines from '../LineChartLines';

// Mock data
const singleSeries: ChartSeries<ChartDataPoint>[] = [
  {
    id: 'revenue',
    name: 'Revenue',
    data: [
      { label: 'Jan', value: 100 },
      { label: 'Feb', value: 200 },
      { label: 'Mar', value: 150 },
    ],
  },
];

const multiSeries: ChartSeries<ChartDataPoint>[] = [
  {
    id: 'revenue',
    name: 'Revenue',
    data: [
      { label: 'Jan', value: 100 },
      { label: 'Feb', value: 200 },
      { label: 'Mar', value: 150 },
    ],
  },
  {
    id: 'profit',
    name: 'Profit',
    data: [
      { label: 'Jan', value: 50 },
      { label: 'Feb', value: 100 },
      { label: 'Mar', value: 75 },
    ],
  },
];

describe('LineChartLines', () => {
  it('renders a single line', () => {
    const { container } = render(
      <svg>
        <LineChartLines
          series={singleSeries}
          width={300}
          height={200}
          maxValue={200}
        />
      </svg>
    );
    
    const lines = container.querySelectorAll('path.line');
    expect(lines.length).toBe(1);
  });
  
  it('renders multiple lines', () => {
    const { container } = render(
      <svg>
        <LineChartLines
          series={multiSeries}
          width={300}
          height={200}
          maxValue={200}
        />
      </svg>
    );
    
    const lines = container.querySelectorAll('path.line');
    expect(lines.length).toBe(2);
  });
  
  it('renders area when showArea is true', () => {
    const { container } = render(
      <svg>
        <LineChartLines
          series={singleSeries}
          width={300}
          height={200}
          maxValue={200}
          showArea={true}
        />
      </svg>
    );
    
    const areas = container.querySelectorAll('path.area');
    expect(areas.length).toBe(1);
  });
  
  it('does not render area when showArea is false', () => {
    const { container } = render(
      <svg>
        <LineChartLines
          series={singleSeries}
          width={300}
          height={200}
          maxValue={200}
          showArea={false}
        />
      </svg>
    );
    
    const areas = container.querySelectorAll('path.area');
    expect(areas.length).toBe(0);
  });
  
  it('renders curved lines when curved is true', () => {
    const { container } = render(
      <svg>
        <LineChartLines
          series={singleSeries}
          width={300}
          height={200}
          maxValue={200}
          curved={true}
        />
      </svg>
    );
    
    const line = container.querySelector('path.line');
    const pathData = line?.getAttribute('d');
    expect(pathData).toContain('C'); // Cubic bezier curve command
  });
  
  it('renders straight lines when curved is false', () => {
    const { container } = render(
      <svg>
        <LineChartLines
          series={singleSeries}
          width={300}
          height={200}
          maxValue={200}
          curved={false}
        />
      </svg>
    );
    
    const line = container.querySelector('path.line');
    const pathData = line?.getAttribute('d');
    expect(pathData).not.toContain('C'); // No cubic bezier curve command
    expect(pathData).toContain('L'); // Line command
  });
  
  it('respects line width prop', () => {
    const { container } = render(
      <svg>
        <LineChartLines
          series={singleSeries}
          width={300}
          height={200}
          maxValue={200}
          lineWidth={4}
        />
      </svg>
    );
    
    const line = container.querySelector('path.line');
    expect(line?.getAttribute('stroke-width')).toBe('4');
  });
  
  it('does not render invisible series', () => {
    const invisibleSeries = [
      {
        ...singleSeries[0],
        visible: false,
      },
    ];
    
    const { container } = render(
      <svg>
        <LineChartLines
          series={invisibleSeries}
          width={300}
          height={200}
          maxValue={200}
        />
      </svg>
    );
    
    const lines = container.querySelectorAll('path.line');
    expect(lines.length).toBe(0);
  });
  
  it('uses gradient when useGradient is true', () => {
    const { container } = render(
      <svg>
        <LineChartLines
          series={singleSeries}
          width={300}
          height={200}
          maxValue={200}
          showArea={true}
          useGradient={true}
        />
      </svg>
    );
    
    const defs = container.querySelector('defs');
    const linearGradient = container.querySelector('linearGradient');
    expect(defs).toBeInTheDocument();
    expect(linearGradient).toBeInTheDocument();
    
    const area = container.querySelector('path.area');
    expect(area?.getAttribute('fill')).toContain('url(#line-gradient-0)');
  });
});