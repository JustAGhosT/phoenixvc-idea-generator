import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ChartDataPoint, ChartSeries } from '../../types/base-types';
import { LineChart } from '../LineChart';

const meta: Meta<typeof LineChart> = {
  title: 'Data Visualization/LineChart',
  component: LineChart,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    data: { control: 'object' },
    width: { control: 'text' },
    height: { control: 'number' },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    showArea: { control: 'boolean' },
    showPoints: { control: 'boolean' },
    curved: { control: 'boolean' },
    lineWidth: { control: 'number' },
    pointRadius: { control: 'number' },
    showGridLines: { control: 'boolean' },
    useGradient: { control: 'boolean' },
    backgroundColor: { control: 'color' },
    showBorder: { control: 'boolean' },
    borderColor: { control: 'color' },
    borderWidth: { control: 'number' },
    borderRadius: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof LineChart>;

// Sample data
const singleSeriesData: ChartDataPoint[] = [
  { label: 'Jan', value: 100 },
  { label: 'Feb', value: 200 },
  { label: 'Mar', value: 150 },
  { label: 'Apr', value: 300 },
  { label: 'May', value: 250 },
  { label: 'Jun', value: 400 },
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
      { label: 'Jun', value: 400 },
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
      { label: 'Jun', value: 200 },
    ],
  },
];

const quarterlyData: ChartDataPoint[] = [
  { label: 'Q1', value: 450 },
  { label: 'Q2', value: 950 },
  { label: 'Q3', value: 700 },
  { label: 'Q4', value: 1200 },
];

// Basic Line Chart
export const Basic: Story = {
  args: {
    title: 'Monthly Revenue',
    data: singleSeriesData,
    width: 600,
    height: 300,
  },
};

// Multi-Series Line Chart
export const MultiSeries: Story = {
  args: {
    title: 'Monthly Performance',
    subtitle: 'Revenue vs Profit',
    data: multiSeriesData,
    width: 600,
    height: 300,
  },
};

// Area Chart
export const AreaChart: Story = {
  args: {
    title: 'Monthly Revenue',
    data: singleSeriesData,
    showArea: true,
    width: 600,
    height: 300,
  },
};

// Curved Line Chart
export const CurvedLines: Story = {
  args: {
    title: 'Monthly Revenue',
    data: singleSeriesData,
    curved: true,
    width: 600,
    height: 300,
  },
};

// Gradient Area Chart
export const GradientArea: Story = {
  args: {
    title: 'Monthly Revenue',
    data: singleSeriesData,
    showArea: true,
    useGradient: true,
    width: 600,
    height: 300,
  },
};

// No Points Chart
export const NoPoints: Story = {
  args: {
    title: 'Monthly Revenue',
    data: singleSeriesData,
    showPoints: false,
    width: 600,
    height: 300,
  },
};

// Custom Styling
export const CustomStyling: Story = {
  args: {
    title: 'Quarterly Revenue',
    data: quarterlyData,
    width: 600,
    height: 300,
    lineWidth: 3,
    pointRadius: 6,
    showBorder: true,
    borderColor: '#e2e8f0',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#f8fafc',
  },
};

// Interactive Legend
export const InteractiveLegend: Story = {
  render: (args) => {
    const [visibleSeries, setVisibleSeries] = useState<Record<string, boolean>>({
      revenue: true,
      profit: true,
    });
    
    const handleSeriesToggle = (seriesId: string, visible: boolean) => {
      setVisibleSeries(prev => ({
        ...prev,
        [seriesId]: visible,
      }));
    };
    
    const filteredData = multiSeriesData.map(series => ({
      ...series,
      visible: visibleSeries[series.id],
    }));
    
    return (
      <LineChart
        {...args}
        data={filteredData}
        onSeriesToggle={handleSeriesToggle}
      />
    );
  },
  args: {
    title: 'Monthly Performance',
    subtitle: 'Click legend items to toggle series',
    width: 600,
    height: 300,
  },
};

// Animated Chart
export const Animated: Story = {
  args: {
    title: 'Monthly Revenue',
    data: singleSeriesData,
    width: 600,
    height: 300,
    animation: {
      enabled: true,
      duration: 1000,
      easing: 'easeOut',
    },
  },
};

// No Data
export const NoData: Story = {
  args: {
    title: 'Monthly Revenue',
    data: [],
    width: 600,
    height: 300,
  },
};

// Responsive Chart
export const Responsive: Story = {
  args: {
    title: 'Monthly Revenue',
    data: singleSeriesData,
    width: '100%',
    height: 300,
  },
};