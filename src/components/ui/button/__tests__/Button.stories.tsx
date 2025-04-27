import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'link'],
      description: 'The visual style variant of the button'
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'The size of the button'
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger', 'info', 'default'],
      description: 'The color scheme of the button'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled'
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in a loading state'
    },
    loadingText: {
      control: 'text',
      description: 'Text to display when in loading state'
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button should take the full width of its container'
    },
    rounded: {
      control: 'boolean',
      description: 'Whether the button has a rounded appearance'
    },
    pill: {
      control: 'boolean',
      description: 'Whether the button has a pill appearance (fully rounded)'
    },
    iconButton: {
      control: 'boolean',
      description: 'Whether the button is an icon-only button'
    },
    active: {
      control: 'boolean',
      description: 'Whether the button is in an active state'
    },
    animation: {
      control: 'select',
      options: ['none', 'scale', 'lift', 'pulse'],
      description: 'Animation effect to apply to the button'
    },
    ripple: {
      control: 'boolean',
      description: 'Whether to show ripple effect on click'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

// Basic example
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    color: 'primary'
  }
};

// Button variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  )
};

// Button sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  )
};

// Button colors
export const Colors: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <Button color="primary">Primary</Button>
        <Button color="success">Success</Button>
        <Button color="warning">Warning</Button>
        <Button color="danger">Danger</Button>
        <Button color="info">Info</Button>
        <Button color="default">Default</Button>
      </div>
      
      <div className="flex flex-wrap gap-4">
        <Button variant="outline" color="primary">Primary</Button>
        <Button variant="outline" color="success">Success</Button>
        <Button variant="outline" color="warning">Warning</Button>
        <Button variant="outline" color="danger">Danger</Button>
        <Button variant="outline" color="info">Info</Button>
        <Button variant="outline" color="default">Default</Button>
      </div>
      
      <div className="flex flex-wrap gap-4">
        <Button variant="ghost" color="primary">Primary</Button>
        <Button variant="ghost" color="success">Success</Button>
        <Button variant="ghost" color="warning">Warning</Button>
        <Button variant="ghost" color="danger">Danger</Button>
        <Button variant="ghost" color="info">Info</Button>
        <Button variant="ghost" color="default">Default</Button>
      </div>
    </div>
  )
};

// Button states
export const States: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>Normal</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
      <Button loading loadingText="Loading...">Submit</Button>
      <Button active>Active</Button>
    </div>
  )
};

// Button with icons
export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <Button leftIcon={<span>📧</span>}>With Left Icon</Button>
        <Button rightIcon={<span>→</span>}>With Right Icon</Button>
        <Button leftIcon={<span>📧</span>} rightIcon={<span>→</span>}>With Both Icons</Button>
      </div>
      
      <div className="flex flex-wrap gap-4">
        <Button variant="outline" leftIcon={<span>📧</span>}>Outline with Icon</Button>
        <Button variant="ghost" leftIcon={<span>📧</span>}>Ghost with Icon</Button>
        <Button variant="link" leftIcon={<span>📧</span>}>Link with Icon</Button>
      </div>
    </div>
  )
};

// Icon buttons
export const IconButtons: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <Button iconButton size="xs" aria-label="Search (extra small)">🔍</Button>
        <Button iconButton size="sm" aria-label="Search (small)">🔍</Button>
        <Button iconButton size="md" aria-label="Search (medium)">🔍</Button>
        <Button iconButton size="lg" aria-label="Search (large)">🔍</Button>
        <Button iconButton size="xl" aria-label="Search (extra large)">🔍</Button>
      </div>
      
      <div className="flex flex-wrap items-center gap-4">
        <Button iconButton variant="outline" aria-label="Edit">✏️</Button>
        <Button iconButton variant="ghost" aria-label="Delete">🗑️</Button>
        <Button iconButton variant="primary" color="success" aria-label="Add">➕</Button>
        <Button iconButton variant="primary" color="danger" aria-label="Remove">❌</Button>
      </div>
    </div>
  )
};

// Button shapes
export const Shapes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <Button>Default</Button>
        <Button rounded>Rounded</Button>
        <Button pill>Pill</Button>
      </div>
      
      <div className="flex flex-wrap gap-4">
        <Button variant="outline">Default</Button>
        <Button variant="outline" rounded>Rounded</Button>
        <Button variant="outline" pill>Pill</Button>
      </div>
      
      <div className="flex flex-wrap gap-4">
        <Button iconButton aria-label="Default">🔍</Button>
        <Button iconButton rounded aria-label="Rounded">🔍</Button>
        <Button iconButton pill aria-label="Pill">🔍</Button>
      </div>
    </div>
  )
};

// Full width buttons
export const FullWidth: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <Button fullWidth>Full Width Button</Button>
      <Button fullWidth variant="outline">Full Width Outline</Button>
      <Button fullWidth variant="ghost">Full Width Ghost</Button>
    </div>
  )
};

// Button animations
export const Animations: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Scale Animation</h3>
        <div className="flex flex-wrap gap-4">
          <Button animation="scale">Scale</Button>
          <Button animation="scale" variant="outline">Scale Outline</Button>
          <Button animation="scale" variant="ghost">Scale Ghost</Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Lift Animation</h3>
        <div className="flex flex-wrap gap-4">
          <Button animation="lift">Lift</Button>
          <Button animation="lift" variant="outline">Lift Outline</Button>
          <Button animation="lift" variant="ghost">Lift Ghost</Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Pulse Animation</h3>
        <div className="flex flex-wrap gap-4">
          <Button animation="pulse">Pulse</Button>
          <Button animation="pulse" variant="outline">Pulse Outline</Button>
          <Button animation="pulse" variant="ghost">Pulse Ghost</Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Ripple Effect</h3>
        <div className="flex flex-wrap gap-4">
          <Button ripple>With Ripple</Button>
          <Button ripple={false}>Without Ripple</Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Loading Animation</h3>
        <div className="flex flex-wrap gap-4">
          <Button loading>Loading</Button>
          <Button loading loadingText="Saving...">Save</Button>
        </div>
      </div>
    </div>
  )
};

// Button combinations
export const Combinations: Story = {
  render: () => (
    <div className="space-y-4">
      <Button 
        variant="primary" 
        color="success" 
        size="lg" 
        rounded 
        leftIcon={<span>✓</span>}
        animation="scale"
      >
        Submit Form
      </Button>
      
      <Button 
        variant="outline" 
        color="danger" 
        pill 
        rightIcon={<span>🗑️</span>}
        animation="lift"
      >
        Delete Item
      </Button>
      
      <Button 
        variant="ghost" 
        color="primary" 
        size="sm" 
        leftIcon={<span>↩️</span>}
        animation="none"
      >
        Go Back
      </Button>
    </div>
  )
};

// Interactive example
export const Interactive: Story = {
  render: () => {
    const [loading, setLoading] = useState(false);
    
    const handleClick = () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 2000);
    };
    
    return (
      <Button 
        loading={loading}
        loadingText="Submitting..."
        onClick={handleClick}
        animation="scale"
        variant="primary"
        color="success"
        rounded
      >
        Submit
      </Button>
    );
  }
};

// Dark mode example
export const DarkMode: Story = {
  render: () => (
    <div className="p-6 bg-gray-900 rounded-lg space-y-6">
      <div className="flex flex-wrap gap-4">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
      
      <div className="flex flex-wrap gap-4">
        <Button color="success">Success</Button>
        <Button color="warning">Warning</Button>
        <Button color="danger">Danger</Button>
        <Button color="info">Info</Button>
      </div>
      
      <div className="flex flex-wrap gap-4">
        <Button loading>Loading</Button>
        <Button disabled>Disabled</Button>
        <Button iconButton aria-label="Search">🔍</Button>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  }
};

// Playground
export const Playground: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    color: 'primary',
    disabled: false,
    loading: false,
    rounded: false,
    pill: false,
    fullWidth: false,
    animation: 'none',
    ripple: true,
  }
};