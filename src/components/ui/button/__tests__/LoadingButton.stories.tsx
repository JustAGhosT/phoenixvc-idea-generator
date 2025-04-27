import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { LoadingButton } from '../variants/LoadingButton';

// Mock icons for stories
const SaveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
    <polyline points="17 21 17 13 7 13 7 21"></polyline>
    <polyline points="7 3 7 8 15 8"></polyline>
  </svg>
);

const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="17 8 12 3 7 8"></polyline>
    <line x1="12" y1="3" x2="12" y2="15"></line>
  </svg>
);

const meta: Meta<typeof LoadingButton> = {
  title: 'UI/Button/LoadingButton',
  component: LoadingButton,
  tags: ['autodocs'],
  argTypes: {
    isLoading: { control: 'boolean', description: 'Whether the button is in a loading state' },
    loadingText: { control: 'text', description: 'Text to display when in loading state' },
    showSpinner: { control: 'boolean', description: 'Whether to show a spinner when in loading state' },
    progress: { control: { type: 'range', min: 0, max: 100, step: 1 }, description: 'Progress value for controlled loading (0-100)' },
    autoLoading: { control: 'boolean', description: 'Whether the button should automatically enter loading state when clicked' },
    loadingDuration: { control: 'number', description: 'Duration in milliseconds for the loading state when autoLoading is true' },
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
        component: 'LoadingButton component for actions that require processing time, with built-in loading states and progress indicators.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof LoadingButton>;

// Basic example
export const Default: Story = {
  args: {
    children: 'Save Changes',
    loadingText: 'Saving...',
    isLoading: false,
    variant: 'primary',
    size: 'md',
    color: 'primary'
  }
};

// Loading state
export const Loading: Story = {
  args: {
    children: 'Save Changes',
    loadingText: 'Saving...',
    isLoading: true,
    variant: 'primary',
    size: 'md',
    color: 'primary'
  }
};

// Auto loading example
export const AutoLoading: Story = {
  render: () => (
    <LoadingButton 
      autoLoading 
      loadingDuration={3000}
      loadingText="Processing..."
      onClick={() => console.log('Clicked! Auto loading for 3 seconds.')}
    >
      Process
    </LoadingButton>
  )
};

// With progress indicator
export const WithProgress: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [progress, setProgress] = useState(0);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isLoading, setIsLoading] = useState(false);
    
    const handleClick = () => {
      setIsLoading(true);
      setProgress(0);
      
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsLoading(false);
            return 0;
          }
          return prev + 5;
        });
      }, 150);
    };
    
    return (
      <LoadingButton 
        isLoading={isLoading}
        progress={progress}
        loadingText="Uploading..."
        onClick={handleClick}
        color="success"
      >
        Upload File
      </LoadingButton>
    );
  }
};

// Variants
export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <LoadingButton variant="primary" isLoading>Primary</LoadingButton>
        <LoadingButton variant="secondary" isLoading>Secondary</LoadingButton>
        <LoadingButton variant="outline" isLoading>Outline</LoadingButton>
        <LoadingButton variant="ghost" isLoading>Ghost</LoadingButton>
        <LoadingButton variant="link" isLoading>Link</LoadingButton>
      </div>
      
      <div className="flex flex-wrap gap-4">
        <LoadingButton variant="primary">Primary</LoadingButton>
        <LoadingButton variant="secondary">Secondary</LoadingButton>
        <LoadingButton variant="outline">Outline</LoadingButton>
        <LoadingButton variant="ghost">Ghost</LoadingButton>
        <LoadingButton variant="link">Link</LoadingButton>
      </div>
    </div>
  )
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <LoadingButton size="xs" isLoading loadingText="XS">Extra Small</LoadingButton>
        <LoadingButton size="sm" isLoading loadingText="SM">Small</LoadingButton>
        <LoadingButton size="md" isLoading loadingText="MD">Medium</LoadingButton>
        <LoadingButton size="lg" isLoading loadingText="LG">Large</LoadingButton>
        <LoadingButton size="xl" isLoading loadingText="XL">Extra Large</LoadingButton>
      </div>
    </div>
  )
};

// With icons
export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <LoadingButton 
          icons={{ left: <SaveIcon /> }}
          loadingText="Saving..."
          autoLoading
          loadingDuration={2000}
        >
          Save
        </LoadingButton>
        
        <LoadingButton 
          icons={{ left: <UploadIcon /> }}
          loadingText="Uploading..."
          autoLoading
          loadingDuration={2000}
          color="success"
        >
          Upload
        </LoadingButton>
      </div>
    </div>
  )
};

// Colors
export const Colors: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <LoadingButton color="primary" isLoading loadingText="Primary">Primary</LoadingButton>
        <LoadingButton color="success" isLoading loadingText="Success">Success</LoadingButton>
        <LoadingButton color="warning" isLoading loadingText="Warning">Warning</LoadingButton>
        <LoadingButton color="danger" isLoading loadingText="Danger">Danger</LoadingButton>
        <LoadingButton color="info" isLoading loadingText="Info">Info</LoadingButton>
        <LoadingButton color="default" isLoading loadingText="Default">Default</LoadingButton>
      </div>
    </div>
  )
};

// Without spinner
export const WithoutSpinner: Story = {
  args: {
    children: 'Submit',
    loadingText: 'Submitting...',
    isLoading: true,
    showSpinner: false,
    color: 'primary'
  }
};

// Interactive example with controlled state
export const Interactive: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isLoading, setIsLoading] = useState(false);
    
    const handleClick = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2000);
    };
    
    return (
      <LoadingButton 
        isLoading={isLoading}
        loadingText="Submitting..."
        onClick={handleClick}
        color="success"
      >
        Submit Form
      </LoadingButton>
    );
  }
};

// Disabled state
export const DisabledState: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <LoadingButton disabled>Disabled</LoadingButton>
      <LoadingButton isLoading disabled>Disabled & Loading</LoadingButton>
    </div>
  )
};

// Playground
export const Playground: Story = {
  args: {
    children: 'Click Me',
    loadingText: 'Loading...',
    isLoading: false,
    showSpinner: true,
    progress: undefined,
    autoLoading: false,
    loadingDuration: 2000,
    variant: 'primary',
    size: 'md',
    color: 'primary',
    disabled: false
  }
};