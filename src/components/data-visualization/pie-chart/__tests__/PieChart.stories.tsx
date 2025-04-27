import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { PieChart } from '../PieChart';
import { ChartDataPoint } from '../../types/base-types';

/**
 * The PieChart component visualizes data as slices of a circle, with each slice representing a proportion of the whole.
 * It supports both standard pie charts and donut charts, with various customization options.
 */
const meta: Meta<typeof PieChart> = {
  title: 'Data Visualization/Charts/PieChart',
  component: PieChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile pie chart component for displaying proportional data. Supports donut charts, data labels, animations, and interactive features.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    data: { 
      control: 'object',
      description: 'Data for the pie chart'
    },
    width: { 
      control: { type: 'text' },
      description: 'Chart width (can be number or percentage string)'
    },
    height: { 
      control: { type: 'text' },
      description: 'Chart height (can be number or percentage string)'
    },
    title: { 
      control: 'text',
      description: 'Chart title'
    },
    subtitle: { 
      control: 'text',
      description: 'Chart subtitle'
    },
    donut: { 
      control: 'boolean',
      description: 'Whether to render as a donut chart'
    },
    innerRadius: { 
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Inner radius for donut charts (as percentage of outer radius)'
    },
    showDataLabels: { 
      control: 'boolean',
      description: 'Whether to show data labels'
    },
    showPercentage: { 
      control: 'boolean',
      description: 'Whether to show percentage in labels'
    },
    startAngle: { 
      control: { type: 'range', min: 0, max: 360, step: 1 },
      description: 'Start angle in degrees'
    },
    endAngle: { 
      control: { type: 'range', min: 0, max: 360, step: 1 },
      description: 'End angle in degrees'
    },
    padAngle: { 
      control: { type: 'range', min: 0, max: 10, step: 0.1 },
      description: 'Padding between slices in degrees'
    },
    sortSlices: { 
      control: 'boolean',
      description: 'Whether to sort slices by value'
    },
    selectable: { 
      control: 'boolean',
      description: 'Whether to enable slice selection'
    },
    selectedSlice: { 
      control: { type: 'number' },
      description: 'Index of the initially selected slice'
    },
    backgroundColor: { 
      control: 'color',
      description: 'Background color of the chart'
    },
    showBorder: { 
      control: 'boolean',
      description: 'Whether to show a border around the chart'
    },
    borderColor: { 
      control: 'color',
      description: 'Border color'
    },
    borderWidth: { 
      control: { type: 'range', min: 0, max: 10, step: 1 },
      description: 'Border width'
    },
    borderRadius: { 
      control: { type: 'range', min: 0, max: 20, step: 1 },
      description: 'Border radius'
    },
    margin: { 
      control: 'object',
      description: 'Chart margins'
    },
    legend: { 
      control: 'object',
      description: 'Legend configuration'
    },
    tooltip: { 
      control: 'object',
      description: 'Tooltip configuration'
    },
    animation: { 
      control: 'object',
      description: 'Animation configuration'
    },
    loading: { 
      control: 'boolean',
      description: 'Whether the chart is in a loading state'
    },
    error: { 
      control: 'text',
      description: 'Error message to display if chart data failed to load'
    }
  }
};

export default meta;
type Story = StoryObj<typeof PieChart>;

// Sample data for the stories
const sampleData: ChartDataPoint[] = [
  { id: '1', label: 'Category A', value: 30, color: '#FF6384' },
  { id: '2', label: 'Category B', value: 50, color: '#36A2EB' },
  { id: '3', label: 'Category C', value: 20, color: '#FFCE56' },
  { id: '4', label: 'Category D', value: 40, color: '#4BC0C0' },
  { id: '5', label: 'Category E', value: 15, color: '#9966FF' }
];

/**
 * Default pie chart with basic configuration
 */
export const Default: Story = {
  args: {
    data: sampleData,
    width: 500,
    height: 400,
    title: 'Sample Pie Chart',
    subtitle: 'Data distribution by category',
    margin: { top: 20, right: 20, bottom: 20, left: 20 }
  }
};

/**
 * Donut chart variation
 */
export const DonutChart: Story = {
  args: {
    ...Default.args,
    title: 'Sample Donut Chart',
    donut: true,
    innerRadius: 60
  }
};

/**
 * Pie chart with data labels
 */
export const WithDataLabels: Story = {
  args: {
    ...Default.args,
    title: 'Pie Chart with Data Labels',
    showDataLabels: true,
    showPercentage: true
  }
};

/**
 * Pie chart with custom angles
 */
export const CustomAngles: Story = {
  args: {
    ...Default.args,
    title: 'Pie Chart with Custom Angles',
    startAngle: 90,
    endAngle: 450,
    padAngle: 2
  }
};

/**
 * Interactive pie chart with selectable slices
 */
export const Interactive: Story = {
  args: {
    ...Default.args,
    title: 'Interactive Pie Chart',
    selectable: true,
    onSliceSelect: (slice, index) => console.log('Selected slice:', slice, 'at index:', index)
  }
};

/**
 * Pie chart with custom styling
 */
export const CustomStyling: Story = {
  args: {
    ...Default.args,
    title: 'Custom Styled Pie Chart',
    backgroundColor: '#f8f9fa',
    showBorder: true,
    borderColor: '#dee2e6',
    borderWidth: 2,
    borderRadius: 8
  }
};

/**
 * Pie chart with custom legend
 */
export const CustomLegend: Story = {
  args: {
    ...Default.args,
    title: 'Pie Chart with Custom Legend',
    legend: {
      position: 'right',
      layout: 'vertical',
      interactive: true
    }
  }
};

// Custom tooltip component for safe rendering
const CustomTooltipContent = ({ dataPoint }: { dataPoint: ChartDataPoint }) => (
  <div style={{ padding: '8px' }}>
    <div style={{ fontWeight: 'bold' }}>{dataPoint.label}</div>
    <div>Value: {dataPoint.value}</div>
    <div>Percentage: {dataPoint.percentage !== undefined ? `${(dataPoint.percentage * 100).toFixed(1)}%` : 'N/A'}</div>
  </div>
);

/**
 * Pie chart with custom tooltip
 */
export const CustomTooltip: Story = {
  args: {
    ...Default.args,
    title: 'Pie Chart with Custom Tooltip',
    tooltip: {
      formatter: (dataPoint) => <CustomTooltipContent dataPoint={dataPoint} />
    }
  }
};

/**
 * Pie chart with custom animation
 */
export const CustomAnimation: Story = {
  args: {
    ...Default.args,
    title: 'Pie Chart with Custom Animation',
    animation: {
      enabled: true,
      duration: 1000,
      easing: 'easeInOut'
    }
  }
};

/**
 * Pie chart in loading state
 */
export const Loading: Story = {
  args: {
    ...Default.args,
    data: [],
    loading: true
  }
};

/**
 * Pie chart with error
 */
export const Error: Story = {
  args: {
    ...Default.args,
    data: [],
    error: 'Failed to load chart data. Please try again later.'
  }
};

/**
 * Pie chart with no data
 */
export const NoData: Story = {
  args: {
    ...Default.args,
    data: [],
    title: 'Pie Chart with No Data'
  }
};

/**
 * Pie chart with accessibility features
 */
export const Accessible: Story = {
  args: {
    ...Default.args,
    title: 'Accessible Pie Chart',
    description: 'This chart shows the distribution of data across different categories',
    accessibility: {
      keyboardNavigation: true,
      announceDataPoints: true,
      labelledBy: 'pie-chart-title',
      describedBy: 'pie-chart-description'
    }
  }
};