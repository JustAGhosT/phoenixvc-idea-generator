import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SegmentedControl } from '../SegmentedControl';

// Mock icons for stories
const DayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const WeekIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const MonthIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
    <path d="M8 14h.01"></path>
    <path d="M12 14h.01"></path>
    <path d="M16 14h.01"></path>
    <path d="M8 18h.01"></path>
    <path d="M12 18h.01"></path>
    <path d="M16 18h.01"></path>
  </svg>
);

const GridIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

const ListIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6"></line>
    <line x1="8" y1="12" x2="21" y2="12"></line>
    <line x1="8" y1="18" x2="21" y2="18"></line>
    <line x1="3" y1="6" x2="3.01" y2="6"></line>
    <line x1="3" y1="12" x2="3.01" y2="12"></line>
    <line x1="3" y1="18" x2="3.01" y2="18"></line>
  </svg>
);

const meta: Meta<typeof SegmentedControl> = {
  title: 'UI/Button/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description: 'The options to display in the segmented control'
    },
    value: {
      control: 'text',
      description: 'The currently selected value'
    },
    defaultValue: {
      control: 'text',
      description: 'Default value for uncontrolled usage'
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'The size of the segmented control'
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'default'],
      description: 'The color scheme of the segmented control'
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the control should take the full width of its container'
    },
    iconsOnly: {
      control: 'boolean',
      description: 'Whether to show icons only (no labels)'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the segmented control is disabled'
    },
    variant: {
      control: 'select',
      options: ['outline', 'ghost'],
      description: 'The visual style variant'
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'SegmentedControl component for selecting one option from a small set of options.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

// Basic example
export const Default: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState('week');
    
    const options = [
      { value: 'day', label: 'Day' },
      { value: 'week', label: 'Week' },
      { value: 'month', label: 'Month' }
    ];
    
    return (
      <SegmentedControl
        options={options}
        value={value}
        onChange={setValue}
      />
    );
  }
};

// With icons
export const WithIcons: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState('week');
    
    const options = [
      { value: 'day', label: 'Day', icon: <DayIcon /> },
      { value: 'week', label: 'Week', icon: <WeekIcon /> },
      { value: 'month', label: 'Month', icon: <MonthIcon /> }
    ];
    
    return (
      <SegmentedControl
        options={options}
        value={value}
        onChange={setValue}
      />
    );
  }
};

// Icons only
export const IconsOnly: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState('grid');
    
    const options = [
      { value: 'grid', label: 'Grid View', icon: <GridIcon /> },
      { value: 'list', label: 'List View', icon: <ListIcon /> }
    ];
    
    return (
      <SegmentedControl
        options={options}
        value={value}
        onChange={setValue}
        iconsOnly
      />
    );
  }
};

// Different sizes
export const Sizes: Story = {
  render: () => {
    const options = [
      { value: 'day', label: 'Day' },
      { value: 'week', label: 'Week' },
      { value: 'month', label: 'Month' }
    ];
    
    return (
      <div className="space-y-4">
        <SegmentedControl
          options={options}
          defaultValue="week"
          size="xs"
        />
        
        <SegmentedControl
          options={options}
          defaultValue="week"
          size="sm"
        />
        
        <SegmentedControl
          options={options}
          defaultValue="week"
          size="md"
        />
        
        <SegmentedControl
          options={options}
          defaultValue="week"
          size="lg"
        />
        
        <SegmentedControl
          options={options}
          defaultValue="week"
          size="xl"
        />
      </div>
    );
  }
};

// Different colors
export const Colors: Story = {
  render: () => {
    const options = [
      { value: 'day', label: 'Day' },
      { value: 'week', label: 'Week' },
      { value: 'month', label: 'Month' }
    ];
    
    return (
      <div className="space-y-4">
        <SegmentedControl
          options={options}
          defaultValue="week"
          color="primary"
        />
        
        <SegmentedControl
          options={options}
          defaultValue="week"
          color="secondary"
        />
        
        <SegmentedControl
          options={options}
          defaultValue="week"
          color="success"
        />
        
        <SegmentedControl
          options={options}
          defaultValue="week"
          color="warning"
        />
        
        <SegmentedControl
          options={options}
          defaultValue="week"
          color="danger"
        />
        
        <SegmentedControl
          options={options}
          defaultValue="week"
          color="info"
        />
      </div>
    );
  }
};

// Full width
export const FullWidth: Story = {
  render: () => {
    const options = [
      { value: 'day', label: 'Day' },
      { value: 'week', label: 'Week' },
      { value: 'month', label: 'Month' }
    ];
    
    return (
      <SegmentedControl
        options={options}
        defaultValue="week"
        fullWidth
      />
    );
  }
};

// Ghost variant
export const GhostVariant: Story = {
  render: () => {
    const options = [
      { value: 'day', label: 'Day' },
      { value: 'week', label: 'Week' },
      { value: 'month', label: 'Month' }
    ];
    
    return (
      <SegmentedControl
        options={options}
        defaultValue="week"
        variant="ghost"
      />
    );
  }
};

// Disabled state
export const DisabledState: Story = {
  render: () => {
    const options = [
      { value: 'day', label: 'Day' },
      { value: 'week', label: 'Week' },
      { value: 'month', label: 'Month' }
    ];
    
    return (
      <SegmentedControl
        options={options}
        defaultValue="week"
        disabled
      />
    );
  }
};

// Individual disabled options
export const IndividualDisabledOptions: Story = {
  render: () => {
    const options = [
      { value: 'day', label: 'Day' },
      { value: 'week', label: 'Week' },
      { value: 'month', label: 'Month', disabled: true }
    ];
    
    return (
      <SegmentedControl
        options={options}
        defaultValue="week"
      />
    );
  }
};

// Real-world example
export const RealWorldExample: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [timeRange, setTimeRange] = useState('30d');
    
    const options = [
      { value: '24h', label: '24h' },
      { value: '7d', label: '7d' },
      { value: '30d', label: '30d' },
      { value: '90d', label: '90d' },
      { value: 'custom', label: 'Custom' }
    ];
    
    return (
      <div className="p-4 border rounded-md">
        <div className="mb-2 text-sm font-medium">Time Range</div>
        <SegmentedControl
          options={options}
          value={timeRange}
          onChange={setTimeRange}
          size="sm"
        />
      </div>
    );
  }
};

// Playground
export const Playground: Story = {
  args: {
    options: [
      { value: 'day', label: 'Day' },
      { value: 'week', label: 'Week' },
      { value: 'month', label: 'Month' }
    ],
    defaultValue: 'week',
    size: 'md',
    color: 'primary',
    fullWidth: false,
    iconsOnly: false,
    disabled: false,
    variant: 'outline'
  }
};