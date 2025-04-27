import { Meta, StoryObj } from '@storybook/react';
import { StatCard } from './StatCard';

const meta: Meta<typeof StatCard> = {
  component: StatCard,
  title: 'Data Display/StatCard',
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger', 'info'],
      description: 'The visual style of the card'
    },
    loading: {
      control: 'boolean',
      description: 'Whether the card is in a loading state'
    },
    compact: {
      control: 'boolean',
      description: 'Whether to use the compact layout'
    },
    icon: {
      control: 'select',
      options: [undefined, 'lightbulb', 'check', 'rocket', 'chart', 'users', 'trending', 'activity', 'pie', 'alert-circle'],
      description: 'Icon to display'
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler for interactive cards'
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'A component for displaying statistics and metrics with support for trends, icons, and various visual styles.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof StatCard>;

// Basic example
export const Basic: Story = {
  args: {
    title: 'Total Users',
    value: 1234,
    description: 'Active users this month'
  }
};

// With icon
export const WithIcon: Story = {
  args: {
    title: 'Total Ideas',
    value: 42,
    description: 'Ideas in your portfolio',
    icon: 'lightbulb',
    variant: 'primary'
  }
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
      isGood: true
    }
  }
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
      isGood: false
    }
  }
};

// Loading state
export const Loading: Story = {
  args: {
    title: 'Loading Data',
    value: '--',
    description: 'Data is loading...',
    loading: true
  }
};

// Compact version
export const Compact: Story = {
  args: {
    title: 'New Users',
    value: 24,
    description: 'Signed up today',
    icon: 'users',
    compact: true,
    variant: 'primary'
  }
};

// Interactive card
export const Interactive: Story = {
  args: {
    title: 'Clickable Card',
    value: 42,
    description: 'Click for details',
    variant: 'info',
    onClick: () => alert('Card clicked!')
  }
};

// With tooltip
export const WithTooltip: Story = {
  args: {
    title: 'Critical Issues',
    value: 3,
    description: 'Issues requiring attention',
    icon: 'alert-circle',
    variant: 'danger',
    tooltipContent: 'These issues require immediate attention'
  }
};

// With custom formatter
export const WithFormatter: Story = {
  args: {
    title: 'Revenue',
    value: 1234567,
    description: 'Annual revenue',
    formatter: (value) => `$${Number(value).toLocaleString()}`,
    variant: 'success'
  }
};

// Grid of variants
export const VariantsGrid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
      <StatCard 
        title="Default Variant" 
        value={1234} 
        variant="default" 
        description="Default style"
      />
      <StatCard 
        title="Primary Variant" 
        value={1234} 
        variant="primary" 
        description="Primary style"
      />
      <StatCard 
        title="Success Variant" 
        value={1234} 
        variant="success" 
        description="Success style"
      />
      <StatCard 
        title="Warning Variant" 
        value={1234} 
        variant="warning" 
        description="Warning style"
      />
      <StatCard 
        title="Danger Variant" 
        value={1234} 
        variant="danger" 
        description="Danger style"
      />
      <StatCard 
        title="Info Variant" 
        value={1234} 
        variant="info" 
        description="Info style"
      />
    </div>
  )
};

// Responsive grid
export const ResponsiveGrid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
      <StatCard 
        title="Users" 
        value={1234} 
        icon="users"
        variant="primary"
      />
      <StatCard 
        title="Revenue" 
        value="$8,492" 
        icon="trending"
        variant="success"
        trend={{
          value: 12.5,
          label: 'vs last month',
          direction: 'up',
          isGood: true
        }}
      />
      <StatCard 
        title="Ideas" 
        value={42} 
        icon="lightbulb"
        variant="info"
      />
      <StatCard 
        title="Issues" 
        value={7} 
        icon="alert-circle"
        variant="danger"
        trend={{
          value: 2,
          label: 'vs yesterday',
          direction: 'up',
          isGood: false
        }}
      />
    </div>
  )
};