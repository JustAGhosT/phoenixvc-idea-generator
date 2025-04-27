import { Meta, StoryObj } from '@storybook/react';
import { ChartDataPoint, ChartSeries } from '../../types/base-types';
import BarChart from '../BarChart';

const meta: Meta<typeof BarChart> = {
  title: 'Data Visualization/BarChart',
  component: BarChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Orientation of the bar chart',
    },
    stacked: {
      control: 'boolean',
      description: 'Whether to stack bars for multi-series data',
    },
    grouped: {
      control: 'boolean',
      description: 'Whether to group bars for multi-series data',
    },
    barRadius: {
      control: { type: 'range', min: 0, max: 20, step: 1 },
      description: 'Border radius of the bars',
    },
    barGap: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Gap between bars as a fraction of bar width',
    },
    showDataLabels: {
      control: 'boolean',
      description: 'Whether to show data labels on bars',
    },
    useGradient: {
      control: 'boolean',
      description: 'Whether to use gradient fills for bars',
    },
    showBorder: {
      control: 'boolean',
      description: 'Whether to show a border around the chart',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BarChart>;

// Basic bar chart with single series
export const Basic: Story = {
  args: {
    title: 'Basic Bar Chart',
    subtitle: 'Sample data visualization',
    data: [
      { label: 'Project A', value: 85 },
      { label: 'Project B', value: 65 },
      { label: 'Project C', value: 45 },
      { label: 'Project D', value: 75 },
      { label: 'Project E', value: 55 },
    ],
    width: 600,
    height: 400,
  },
};

// Horizontal bar chart
export const Horizontal: Story = {
  args: {
    ...Basic.args,
    title: 'Horizontal Bar Chart',
    orientation: 'horizontal',
  },
};

// Bar chart with rounded corners
export const RoundedBars: Story = {
  args: {
    ...Basic.args,
    title: 'Rounded Bar Chart',
    barRadius: 10,
  },
};

// Multi-series data for stacked and grouped charts
const multiSeriesData: ChartSeries<ChartDataPoint>[] = [
  {
    id: 'series1',
    name: 'Series 1',
    data: [
      { label: 'Category A', value: 45 },
      { label: 'Category B', value: 65 },
      { label: 'Category C', value: 55 },
      { label: 'Category D', value: 75 },
      { label: 'Category E', value: 35 },
    ],
  },
  {
    id: 'series2',
    name: 'Series 2',
    data: [
      { label: 'Category A', value: 25 },
      { label: 'Category B', value: 35 },
      { label: 'Category C', value: 45 },
      { label: 'Category D', value: 15 },
      { label: 'Category E', value: 55 },
    ],
  },
  {
    id: 'series3',
    name: 'Series 3',
    data: [
      { label: 'Category A', value: 15 },
      { label: 'Category B', value: 25 },
      { label: 'Category C', value: 35 },
      { label: 'Category D', value: 45 },
      { label: 'Category E', value: 25 },
    ],
  },
];

// Stacked bar chart
export const Stacked: Story = {
  args: {
    title: 'Stacked Bar Chart',
    subtitle: 'Multiple series stacked',
    data: multiSeriesData,
    width: 600,
    height: 400,
    stacked: true,
  },
};

// Grouped bar chart
export const Grouped: Story = {
  args: {
    title: 'Grouped Bar Chart',
    subtitle: 'Multiple series grouped',
    data: multiSeriesData,
    width: 600,
    height: 400,
    grouped: true,
  },
};

// Bar chart with gradient fills
export const Gradient: Story = {
  args: {
    ...Basic.args,
    title: 'Gradient Bar Chart',
    useGradient: true,
  },
};

// Bar chart with data labels
export const WithDataLabels: Story = {
  args: {
    ...Basic.args,
    title: 'Bar Chart with Data Labels',
    showDataLabels: true,
  },
};

// Bar chart with custom styling
export const CustomStyling: Story = {
  args: {
    ...Basic.args,
    title: 'Custom Styled Bar Chart',
    showBorder: true,
    borderRadius: 8,
    borderColor: '#e2e8f0',
    borderWidth: 2,
    backgroundColor: '#f8fafc',
  },
};

// Bar chart with custom axis configuration
export const CustomAxis: Story = {
  args: {
    ...Basic.args,
    title: 'Bar Chart with Custom Axes',
    xAxis: {
      title: 'Projects',
      visible: true,
      showLine: true,
      showTicks: true,
    },
    yAxis: {
      title: 'Completion (%)',
      visible: true,
      showLine: true,
      showTicks: true,
    },
  },
};

// Empty bar chart
export const Empty: Story = {
  args: {
    title: 'Empty Bar Chart',
    subtitle: 'No data available',
    data: [],
    width: 600,
    height: 400,
  },
};