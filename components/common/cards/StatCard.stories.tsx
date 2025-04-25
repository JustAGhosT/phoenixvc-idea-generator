import type { Meta, StoryObj } from '@storybook/react';
import { StatCard } from './StatCard';
import { Rocket, Zap, AlertCircle } from 'lucide-react';

const meta: Meta<typeof StatCard> = {
  title: 'Components/Cards/StatCard',
  component: StatCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger', 'info'],
    },
    icon: {
      control: 'select',
      options: [undefined, 'lightbulb', 'check', 'rocket', 'chart', 'users', 'trending', 'activity', 'pie', 'alert-circle'],
    },
    loading: {
      control: 'boolean',
    },
    compact: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatCard>;

// Basic example
export const Basic: Story = {
  args: {
    title: 'Total Users',
    value: 1234,
    description: 'Active users this month',
  },
};

// With icon
export const WithIcon: Story = {
  args: {
    title: 'Total Ideas',
    value: 42,
    description: 'Ideas in your portfolio',
    icon: 'lightbulb',
    variant: 'primary',
  },
};

// With custom icon
export const WithCustomIcon: Story = {
  args: {
    title: 'Energy Usage',
    value: '87 kWh',
    description: 'Average daily consumption',
    icon: <Zap className="h-5 w-5 text-yellow-500" />,
  },
};

// With trend (positive)
export const WithPositiveTrend: Story = {
  args: {
    title: 'Revenue',
    value: '$8,492',
    description: 'Monthly revenue',
    icon: 'trending',
    variant: 'success',
    trend: {
          value: 12.5,
      label: 'vs last month',
      direction: 'up',
      isGood: true,
    },
  },
};

// With trend (negative)
export const WithNegativeTrend: Story = {
  args: {
    title: 'Bounce Rate',
    value: '24.8%',
    description: 'User bounce rate',
    icon: 'activity',
    variant: 'danger',
    trend: {
      value: 3.2,
      label: 'vs last month',
      direction: 'up',
      isGood: false,
    },
  },
};

// Loading state
export const Loading: Story = {
  args: {
    title: 'Loading Data',
    value: '--',
    description: 'Data is loading...',
    loading: true,
  },
};

// Compact version
export const Compact: Story = {
  args: {
    title: 'New Users',
    value: 24,
    description: 'Signed up today',
    icon: 'users',
    compact: true,
    variant: 'primary',
  },
};

// Interactive card
export const Interactive: Story = {
  args: {
    title: 'Clickable Card',
    value: 42,
    description: 'Click for details',
    onClick: () => alert('Card clicked!'),
    variant: 'info',
  },
};

// With tooltip
export const WithTooltip: Story = {
  args: {
    title: 'Critical Issues',
    value: 3,
    description: 'Issues requiring attention',
    icon: <AlertCircle className="h-5 w-5 text-red-500" />,
    variant: 'danger',
    tooltipContent: 'These issues require immediate attention',
  },
};

// All variants
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', maxWidth: '800px' }}></div>
      <StatCard title="Default Variant" value={42} variant="default" />
      <StatCard title="Primary Variant" value={42} variant="primary" />
      <StatCard title="Success Variant" value={42} variant="success" />
      <StatCard title="Warning Variant" value={42} variant="warning" />
      <StatCard title="Danger Variant" value={42} variant="danger" />
      <StatCard title="Info Variant" value={42} variant="info" />
    </div>
  ),
};

// Responsive grid
export const ResponsiveGrid: Story = {
  render: () => (
    <div className="stat-card-grid" style={{ maxWidth: '100%', width: '100%' }}></div>
      <StatCard title="Total Users" value={1234} icon="users" variant="primary" />
      <StatCard title="Active Projects" value={18} icon="rocket" variant="success" />
      <StatCard title="Revenue" value="$12,345" icon="trending" variant="info" />
      <StatCard title="Issues" value={7} icon="alert-circle" variant="danger" />
    </div>
  ),
};