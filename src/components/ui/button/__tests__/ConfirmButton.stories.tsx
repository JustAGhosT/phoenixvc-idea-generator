import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ConfirmButton } from '../variants/ConfirmButton';

// Mock icons for stories
const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

const meta: Meta<typeof ConfirmButton> = {
  title: 'UI/Button/ConfirmButton',
  component: ConfirmButton,
  tags: ['autodocs'],
  argTypes: {
    confirmText: { control: 'text', description: 'Text to show when in confirmation state' },
    onConfirm: { action: 'confirmed', description: 'Function to call when the action is confirmed' },
    onCancel: { action: 'canceled', description: 'Function to call when the action is canceled' },
    confirmColor: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger', 'info', 'default'],
      description: 'The color to use for the confirmation state'
    },
    confirmVariant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'link'],
      description: 'The variant to use for the confirmation state'
    },
    timeout: { control: 'number', description: 'Time in milliseconds before reverting to initial state if not confirmed' },
    showCountdown: { control: 'boolean', description: 'Whether to show a countdown indicator' },
    autoRevert: { control: 'boolean', description: 'Whether to automatically revert to initial state after timeout' },
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
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'ConfirmButton component for actions that require confirmation before execution, with built-in timeout and visual feedback.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof ConfirmButton>;

// Basic example
export const Default: Story = {
  args: {
    children: 'Delete Item',
    confirmText: 'Are you sure?',
    onConfirm: () => console.log('Item deleted'),
    color: 'danger',
    variant: 'outline',
    size: 'md',
    timeout: 3000,
    showCountdown: true,
    autoRevert: true
  }
};

// Different colors and variants
export const ColorsAndVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <ConfirmButton
          onConfirm={() => console.log('Primary confirmed')}
          color="primary"
          confirmColor="danger"
        >
          Primary → Danger
        </ConfirmButton>
        
        <ConfirmButton
          onConfirm={() => console.log('Success confirmed')}
          color="success"
          confirmColor="warning"
        >
          Success → Warning
        </ConfirmButton>
        
        <ConfirmButton
          onConfirm={() => console.log('Outline confirmed')}
          variant="outline"
          color="primary"
          confirmColor="danger"
          confirmVariant="primary"
        >
          Outline → Solid
        </ConfirmButton>
      </div>
    </div>
  )
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <ConfirmButton size="xs" onConfirm={() => console.log('XS confirmed')}>
        Extra Small
      </ConfirmButton>
      
      <ConfirmButton size="sm" onConfirm={() => console.log('SM confirmed')}>
        Small
      </ConfirmButton>
      
      <ConfirmButton size="md" onConfirm={() => console.log('MD confirmed')}>
        Medium
      </ConfirmButton>
      
      <ConfirmButton size="lg" onConfirm={() => console.log('LG confirmed')}>
        Large
      </ConfirmButton>
      
      <ConfirmButton size="xl" onConfirm={() => console.log('XL confirmed')}>
        Extra Large
      </ConfirmButton>
    </div>
  )
};

// With custom timeout
export const CustomTimeout: Story = {
  render: () => (
    <div className="space-y-4">
      <ConfirmButton
        onConfirm={() => console.log('Quick timeout confirmed')}
        timeout={1500}
        confirmText="Quick! Confirm now!"
        color="warning"
      >
        Quick Timeout (1.5s)
      </ConfirmButton>
      
      <ConfirmButton
        onConfirm={() => console.log('Long timeout confirmed')}
        timeout={5000}
        confirmText="Take your time..."
        color="info"
      >
        Long Timeout (5s)
      </ConfirmButton>
      
      <ConfirmButton
        onConfirm={() => console.log('No auto-revert confirmed')}
        autoRevert={false}
        confirmText="I'll wait forever"
        color="primary"
      >
        No Auto-Revert
      </ConfirmButton>
    </div>
  )
};

// Without countdown
export const WithoutCountdown: Story = {
  args: {
    children: 'Delete Item',
    confirmText: 'Are you sure?',
    onConfirm: () => console.log('Item deleted'),
    color: 'danger',
    showCountdown: false
  }
};

// With icons
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <ConfirmButton
        onConfirm={() => console.log('Delete confirmed')}
        confirmText="Delete permanently?"
        color="danger"
        icons={{ left: <DeleteIcon /> }}
      >
        Delete Item
      </ConfirmButton>
      
      <ConfirmButton
        onConfirm={() => console.log('Logout confirmed')}
        confirmText="Really logout?"
        color="primary"
        variant="outline"
        icons={{ left: <LogoutIcon /> }}
      >
        Logout
      </ConfirmButton>
    </div>
  )
};

// Real-world examples
export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="p-4 border rounded-md">
        <h3 className="text-lg font-medium mb-2">Delete Account</h3>
        <p className="text-gray-600 mb-4">This action cannot be undone. All your data will be permanently deleted.</p>
        <ConfirmButton
          onConfirm={() => console.log('Account deleted')}
          confirmText="Yes, delete my account"
          color="danger"
          variant="outline"
          timeout={5000}
        >
          Delete Account
        </ConfirmButton>
      </div>
      
      <div className="p-4 border rounded-md">
        <h3 className="text-lg font-medium mb-2">Publish Article</h3>
        <p className="text-gray-600 mb-4">Your article will be visible to the public.</p>
        <ConfirmButton
          onConfirm={() => console.log('Article published')}
          confirmText="Yes, publish now"
          color="success"
          confirmColor="success"
        >
          Publish
        </ConfirmButton>
      </div>
    </div>
  )
};

// Interactive example with callbacks
export const Interactive: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [status, setStatus] = useState<string>('Idle');
    
    const handleConfirm = () => {
      setStatus('Action confirmed!');
      setTimeout(() => setStatus('Idle'), 2000);
    };
    
    const handleCancel = () => {
      setStatus('Action canceled');
      setTimeout(() => setStatus('Idle'), 2000);
    };
    
    return (
      <div className="space-y-4">
        <div className="p-2 border rounded">
          Status: <span className="font-bold">{status}</span>
        </div>
        
        <ConfirmButton
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          confirmText="Are you absolutely sure?"
          color="danger"
        >
          Perform Action
        </ConfirmButton>
      </div>
    );
  }
};

// Disabled state
export const DisabledState: Story = {
  args: {
    children: 'Delete Item',
    confirmText: 'Are you sure?',
    onConfirm: () => console.log('Item deleted'),
    color: 'danger',
    disabled: true
  }
};

// Playground
export const Playground: Story = {
  args: {
    children: 'Click to Confirm',
    confirmText: 'Are you sure?',
    onConfirm: () => console.log('Confirmed'),
    onCancel: () => console.log('Canceled'),
    color: 'primary',
    confirmColor: 'danger',
    variant: 'primary',
    confirmVariant: undefined,
    size: 'md',
    timeout: 3000,
    showCountdown: true,
    autoRevert: true,
    disabled: false
  }
};