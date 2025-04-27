import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../Badge';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'info'],
      description: 'The visual style variant of the badge'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the badge'
    },
    rounded: {
      control: 'boolean',
      description: 'Whether the badge should be rounded'
    },
    outline: {
      control: 'boolean',
      description: 'Whether the badge should be outlined instead of filled'
    },
    soft: {
      control: 'boolean',
      description: 'Whether the badge should have a soft/subtle appearance'
    },
    withDot: {
      control: 'boolean',
      description: 'Whether to show a dot indicator'
    },
    interactive: {
      control: 'boolean',
      description: 'Whether the badge is interactive (clickable)'
    },
    animation: {
      control: 'select',
      options: ['none', 'pulse', 'glow', 'bounce', 'fadeIn'],
      description: 'Animation effect to apply to the badge'
    },
    hoverEffect: {
      control: 'select',
      options: ['none', 'scale', 'lift'],
      description: 'Whether to apply a hover effect'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Badge>;

// Basic example
export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
    size: 'md'
  }
};

// Badge variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  )
};

// Badge sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  )
};

// Style variants
export const StyleVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-500">Default</h3>
        <div className="flex flex-wrap gap-4">
          <Badge variant="default">Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="danger">Danger</Badge>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-500">Outline</h3>
        <div className="flex flex-wrap gap-4">
          <Badge outline variant="default">Default</Badge>
          <Badge outline variant="primary">Primary</Badge>
          <Badge outline variant="success">Success</Badge>
          <Badge outline variant="danger">Danger</Badge>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-500">Soft</h3>
        <div className="flex flex-wrap gap-4">
          <Badge soft variant="default">Default</Badge>
          <Badge soft variant="primary">Primary</Badge>
          <Badge soft variant="success">Success</Badge>
          <Badge soft variant="danger">Danger</Badge>
        </div>
      </div>
    </div>
  )
};

// Rounded badges
export const Rounded: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge rounded>42</Badge>
      <Badge rounded variant="primary">New</Badge>
      <Badge rounded variant="success">Completed</Badge>
      <Badge rounded variant="warning">Pending</Badge>
      <Badge rounded variant="danger">Failed</Badge>
    </div>
  )
};

// Badges with dot indicators
export const WithDot: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge withDot>Default</Badge>
      <Badge withDot variant="primary">Online</Badge>
      <Badge withDot variant="success">Active</Badge>
      <Badge withDot variant="warning">Away</Badge>
      <Badge withDot variant="danger">Offline</Badge>
    </div>
  )
};

// Badges with icons
export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <Badge leftIcon={<span>✓</span>}>Completed</Badge>
        <Badge leftIcon={<span>⚠️</span>} variant="warning">Warning</Badge>
        <Badge leftIcon={<span>❌</span>} variant="danger">Error</Badge>
      </div>
      
      <div className="flex flex-wrap gap-4">
        <Badge rightIcon={<span>→</span>} variant="primary">Next</Badge>
        <Badge leftIcon={<span>📧</span>} rightIcon={<span>→</span>}>Messages</Badge>
      </div>
    </div>
  )
};

// Interactive badges
export const Interactive: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge interactive onClick={() => alert('Clicked default badge')}>Click me</Badge>
      <Badge interactive variant="primary" onClick={() => alert('Clicked primary badge')}>Click me</Badge>
      <Badge interactive variant="success" onClick={() => alert('Clicked success badge')}>Click me</Badge>
      <Badge interactive variant="danger" onClick={() => alert('Clicked danger badge')}>Click me</Badge>
    </div>
  )
};

// Badge animations
export const Animations: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-500">Pulse Animation</h3>
        <div className="flex flex-wrap gap-4">
          <Badge animation="pulse" variant="primary">Pulse</Badge>
          <Badge animation="pulse" variant="success">Pulse</Badge>
          <Badge animation="pulse" variant="danger">Pulse</Badge>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-500">Glow Animation</h3>
        <div className="flex flex-wrap gap-4">
          <Badge animation="glow" variant="primary">Glow</Badge>
          <Badge animation="glow" variant="success">Glow</Badge>
          <Badge animation="glow" variant="danger">Glow</Badge>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-500">Bounce Animation</h3>
        <div className="flex flex-wrap gap-4">
          <Badge animation="bounce" variant="primary">Bounce</Badge>
          <Badge animation="bounce" variant="success">Bounce</Badge>
          <Badge animation="bounce" variant="danger">Bounce</Badge>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-500">Fade In Animation</h3>
        <div className="flex flex-wrap gap-4">
          <Badge animation="fadeIn" variant="primary">Fade In</Badge>
          <Badge animation="fadeIn" variant="success">Fade In</Badge>
          <Badge animation="fadeIn" variant="danger">Fade In</Badge>
        </div>
      </div>
    </div>
  )
};

// Hover effects
export const HoverEffects: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-500">Scale on Hover</h3>
        <div className="flex flex-wrap gap-4">
          <Badge hoverEffect="scale" variant="primary">Hover me</Badge>
          <Badge hoverEffect="scale" variant="success">Hover me</Badge>
          <Badge hoverEffect="scale" variant="danger">Hover me</Badge>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-500">Lift on Hover</h3>
        <div className="flex flex-wrap gap-4">
          <Badge hoverEffect="lift" variant="primary">Hover me</Badge>
          <Badge hoverEffect="lift" variant="success">Hover me</Badge>
          <Badge hoverEffect="lift" variant="danger">Hover me</Badge>
        </div>
      </div>
    </div>
  )
};

// Badge combinations
export const Combinations: Story = {
  render: () => (
    <div className="space-y-4">
      <Badge 
        variant="success" 
        rounded 
        leftIcon={<span>✓</span>}
        animation="pulse"
      >
        Task Complete
      </Badge>
      
      <Badge 
        variant="primary" 
        outline 
        withDot 
        hoverEffect="scale"
        interactive
        onClick={() => alert('Clicked!')}
      >
        Interactive
      </Badge>
      
      <Badge 
        variant="warning" 
        soft 
        size="lg"
        rightIcon={<span>→</span>}
        animation="bounce"
      >
        Important Notice
      </Badge>
    </div>
  )
};

// Dark mode example
export const DarkMode: Story = {
  render: () => (
    <div className="p-6 bg-gray-900 rounded-lg space-y-6">
      <div className="flex flex-wrap gap-4">
        <Badge>Default</Badge>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="danger">Danger</Badge>
      </div>
      
      <div className="flex flex-wrap gap-4">
        <Badge outline>Outline</Badge>
        <Badge outline variant="primary">Primary</Badge>
        <Badge soft variant="success">Soft</Badge>
        <Badge withDot variant="danger">With Dot</Badge>
      </div>
      
      <div className="flex flex-wrap gap-4">
        <Badge animation="pulse" variant="primary">Pulse</Badge>
        <Badge animation="glow" variant="success">Glow</Badge>
        <Badge hoverEffect="scale" variant="danger">Hover</Badge>
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
    children: 'Badge',
    variant: 'primary',
    size: 'md',
    rounded: false,
    outline: false,
    soft: false,
    withDot: false,
    interactive: false,
    animation: 'none',
    hoverEffect: 'none',
  }
};