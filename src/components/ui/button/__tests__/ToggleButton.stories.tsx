import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ToggleButton } from '../variants/ToggleButton';

// Mock icons for stories
const BoldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
    <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
  </svg>
);

const ItalicIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="4" x2="10" y2="4"></line>
    <line x1="14" y1="20" x2="5" y2="20"></line>
    <line x1="15" y1="4" x2="9" y2="20"></line>
  </svg>
);

const UnderlineIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"></path>
    <line x1="4" y1="21" x2="20" y2="21"></line>
  </svg>
);

const SunIcon = () => (
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

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const meta: Meta<typeof ToggleButton> = {
  title: 'UI/Button/ToggleButton',
  component: ToggleButton,
  tags: ['autodocs'],
  argTypes: {
    isPressed: { control: 'boolean', description: 'Whether the toggle button is pressed/selected' },
    onPressedChange: { action: 'pressed changed', description: 'Callback when the pressed state changes' },
    uncontrolled: { control: 'boolean', description: 'Whether the toggle button should manage its own state' },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
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
        component: 'ToggleButton component for toggling between two states, perfect for on/off controls or selection.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof ToggleButton>;

// Basic example
export const Default: Story = {
  args: {
    children: 'Toggle Me',
    variant: 'outline',
    color: 'primary',
    size: 'md',
    uncontrolled: true
  }
};

// Controlled example
export const Controlled: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isPressed, setIsPressed] = useState(false);
    
    return (
      <ToggleButton
        isPressed={isPressed}
        onPressedChange={setIsPressed}
        variant="outline"
      >
        {isPressed ? 'On' : 'Off'}
      </ToggleButton>
    );
  }
};

// Variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <ToggleButton variant="primary" uncontrolled>Primary</ToggleButton>
      <ToggleButton variant="secondary" uncontrolled>Secondary</ToggleButton>
      <ToggleButton variant="outline" uncontrolled>Outline</ToggleButton>
      <ToggleButton variant="ghost" uncontrolled>Ghost</ToggleButton>
    </div>
  )
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <ToggleButton size="xs" uncontrolled>Extra Small</ToggleButton>
      <ToggleButton size="sm" uncontrolled>Small</ToggleButton>
      <ToggleButton size="md" uncontrolled>Medium</ToggleButton>
      <ToggleButton size="lg" uncontrolled>Large</ToggleButton>
      <ToggleButton size="xl" uncontrolled>Extra Large</ToggleButton>
    </div>
  )
};

// Colors
export const Colors: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <ToggleButton color="primary" uncontrolled>Primary</ToggleButton>
        <ToggleButton color="success" uncontrolled>Success</ToggleButton>
        <ToggleButton color="warning" uncontrolled>Warning</ToggleButton>
        <ToggleButton color="danger" uncontrolled>Danger</ToggleButton>
        <ToggleButton color="info" uncontrolled>Info</ToggleButton>
        <ToggleButton color="default" uncontrolled>Default</ToggleButton>
      </div>
      
      <div className="flex flex-wrap gap-4">
        <ToggleButton variant="outline" color="primary" uncontrolled>Primary</ToggleButton>
        <ToggleButton variant="outline" color="success" uncontrolled>Success</ToggleButton>
        <ToggleButton variant="outline" color="warning" uncontrolled>Warning</ToggleButton>
        <ToggleButton variant="outline" color="danger" uncontrolled>Danger</ToggleButton>
        <ToggleButton variant="outline" color="info" uncontrolled>Info</ToggleButton>
        <ToggleButton variant="outline" color="default" uncontrolled>Default</ToggleButton>
      </div>
    </div>
  )
};

// Text formatting example
export const TextFormatting: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <ToggleButton 
        variant="ghost" 
        size="sm" 
        uncontrolled
        icons={{ left: <BoldIcon /> }}
        aria-label="Bold"
      >
        Bold
      </ToggleButton>
      
      <ToggleButton 
        variant="ghost" 
        size="sm" 
        uncontrolled
        icons={{ left: <ItalicIcon /> }}
        aria-label="Italic"
      >
        Italic
      </ToggleButton>
      
      <ToggleButton 
        variant="ghost" 
        size="sm" 
        uncontrolled
        icons={{ left: <UnderlineIcon /> }}
        aria-label="Underline"
      >
        Underline
      </ToggleButton>
    </div>
  )
};

// Icon-only toggle buttons
export const IconOnlyToggle: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <ToggleButton 
        variant="outline" 
        uncontrolled
        icons={{ only: true }}
        aria-label="Bold"
      >
        <BoldIcon />
      </ToggleButton>
      
      <ToggleButton 
        variant="outline" 
        uncontrolled
        icons={{ only: true }}
        aria-label="Italic"
      >
        <ItalicIcon />
      </ToggleButton>
      
      <ToggleButton 
        variant="outline" 
        uncontrolled
        icons={{ only: true }}
        aria-label="Underline"
      >
        <UnderlineIcon />
      </ToggleButton>
    </div>
  )
};

// Theme toggle example
export const ThemeToggle: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isDarkMode, setIsDarkMode] = useState(false);
    
    return (
      <ToggleButton
        isPressed={isDarkMode}
        onPressedChange={setIsDarkMode}
        variant="outline"
        color={isDarkMode ? 'primary' : 'default'}
        icons={{ left: isDarkMode ? <MoonIcon /> : <SunIcon /> }}
      >
        {isDarkMode ? 'Dark Mode' : 'Light Mode'}
      </ToggleButton>
    );
  }
};

// Disabled state
export const DisabledState: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <ToggleButton disabled>Disabled</ToggleButton>
      <ToggleButton isPressed disabled>Disabled & Pressed</ToggleButton>
    </div>
  )
};

// Playground
export const Playground: Story = {
  args: {
    children: 'Toggle Me',
    uncontrolled: true,
    variant: 'outline',
    size: 'md',
    color: 'primary',
    disabled: false
  }
};