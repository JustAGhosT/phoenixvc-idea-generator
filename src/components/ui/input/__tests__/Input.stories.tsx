import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Input from '../Input';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'The size of the input'
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url', 'search'],
      description: 'The type of the input'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled'
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required'
    },
    hasError: {
      control: 'boolean',
      description: 'Whether the input has an error'
    },
    success: {
      control: 'boolean',
      description: 'Whether the input has a success state'
    },
    rounded: {
      control: 'boolean',
      description: 'Whether the input has rounded corners'
    },
    pill: {
      control: 'boolean',
      description: 'Whether the input has fully rounded corners (pill shape)'
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the input takes the full width of its container'
    },
    showClearButton: {
      control: 'boolean',
      description: 'Whether to show a clear button'
    },
    showPasswordToggle: {
      control: 'boolean',
      description: 'Whether to show a password toggle button for password inputs'
    },
    floatingLabel: {
      control: 'boolean',
      description: 'Whether to use a floating label'
    },
    animateFocus: {
      control: 'boolean',
      description: 'Whether to animate the focus ring'
    },
    showCharacterCount: {
      control: 'boolean',
      description: 'Whether to show character count'
    },
    showErrorAnimation: {
      control: 'boolean',
      description: 'Whether to show error animation when error state changes'
    },
    loading: {
      control: 'boolean',
      description: 'Whether the input is in a loading state'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Input>;

// Basic example
export const Default: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    helpText: 'Choose a username that is at least 3 characters long'
  }
};

// Input sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Input size="xs" label="Extra Small" placeholder="Extra small input" />
      <Input size="sm" label="Small" placeholder="Small input" />
      <Input size="md" label="Medium" placeholder="Medium input (default)" />
      <Input size="lg" label="Large" placeholder="Large input" />
      <Input size="xl" label="Extra Large" placeholder="Extra large input" />
    </div>
  )
};

// Input shapes
export const Shapes: Story = {
  render: () => (
    <div className="space-y-4">
      <Input label="Default" placeholder="Default corners" />
      <Input label="Rounded" rounded placeholder="Rounded corners" />
      <Input label="Pill" pill placeholder="Pill shape" />
    </div>
  )
};

// Input states
export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <Input label="Default" placeholder="Default state" />
      <Input label="Disabled" disabled placeholder="Disabled input" />
      <Input label="Required" required placeholder="Required input" />
      <Input 
        label="Error" 
        hasError 
        errorMessage="This field has an error" 
        placeholder="Input with error" 
      />
      <Input 
        label="Success" 
        success 
        placeholder="Input with success state" 
      />
      <Input 
        label="Loading" 
        loading 
        placeholder="Loading state" 
      />
    </div>
  )
};

// Input with icons
export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <Input 
        label="Search" 
        placeholder="Search..." 
        leftIcon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        } 
      />
      
      <Input 
        label="Email" 
        placeholder="Enter your email" 
        leftIcon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        } 
      />
      
      <Input 
        label="URL" 
        placeholder="Enter website URL" 
        leftIcon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        } 
        rightIcon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        } 
      />
    </div>
  )
};

// Password input with toggle
export const PasswordInput: Story = {
  render: () => (
    <div className="space-y-4">
      <Input 
        label="Password" 
        type="password" 
        placeholder="Enter your password" 
        showPasswordToggle 
      />
      
      <Input 
        label="Password with Left Icon" 
        type="password" 
        placeholder="Enter your password" 
        showPasswordToggle 
        leftIcon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        } 
      />
    </div>
  )
};

// Input with clear button
export const WithClearButton: Story = {
  render: () => {
    const [value, setValue] = useState('Type something to see the clear button');
    
    return (
      <Input 
        label="Clearable Input" 
        value={value} 
        onChange={(e) => setValue(e.target.value)} 
        showClearButton 
        onClear={() => setValue('')} 
      />
    );
  }
};

// Input with character count
export const WithCharacterCount: Story = {
  render: () => {
    const [value, setValue] = useState('');
    
    return (
      <div className="space-y-4">
        <Input 
          label="Tweet" 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
          showCharacterCount 
          maxLength={280} 
          warningThreshold={80} 
          placeholder="What's happening?" 
        />
        
        <Input 
          label="Short Message" 
          showCharacterCount 
          maxLength={50} 
          warningThreshold={80} 
          placeholder="Keep it brief" 
        />
      </div>
    );
  }
};

// Floating label input
export const FloatingLabel: Story = {
  render: () => {
    const [value, setValue] = useState('');
    
    return (
      <div className="space-y-4">
        <Input 
          label="Email" 
          floatingLabel 
          placeholder=" " 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
        />
        
        <Input 
          label="Password" 
          type="password" 
          floatingLabel 
          placeholder=" " 
          showPasswordToggle 
        />
        
        <Input 
          label="Username" 
          floatingLabel 
          placeholder=" " 
          leftIcon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          } 
        />
      </div>
    );
  }
};

// Input with animations
export const WithAnimations: Story = {
  render: () => {
    const [hasError, setHasError] = useState(false);
    
    const triggerError = () => {
      setHasError(true);
      setTimeout(() => setHasError(false), 2000);
    };
    
    return (
      <div className="space-y-4">
        <Input 
          label="Focus Animation" 
          animateFocus 
          placeholder="Focus me to see animation" 
        />
        
        <Input 
          label="Error Animation" 
          hasError={hasError} 
          showErrorAnimation 
          errorMessage={hasError ? "This field has an error" : undefined} 
          placeholder="Watch the error animation" 
        />
        
        <button 
          onClick={triggerError}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Trigger Error Animation
        </button>
        
        <Input 
          label="Success Animation" 
          success 
          placeholder="Success state with animation" 
        />
        
        <Input 
          label="Floating Label with Animation" 
          floatingLabel 
          animateFocus 
          placeholder=" " 
        />
      </div>
    );
  }
};

// Form example
export const FormExample: Story = {
  render: () => {
    return (
      <div className="space-y-4 max-w-md p-6 border border-gray-200 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Sign Up Form</h2>
        
        <Input 
          label="Full Name" 
          placeholder="Enter your full name" 
          required 
          leftIcon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          } 
        />
        
        <Input 
          label="Email" 
          type="email" 
          placeholder="Enter your email" 
          required 
          leftIcon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          } 
        />
        
        <Input 
          label="Password" 
          type="password" 
          placeholder="Create a password" 
          required 
          showPasswordToggle 
          helpText="Password must be at least 8 characters" 
          leftIcon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          } 
        />
        
        <Input 
          label="Bio" 
          placeholder="Tell us about yourself" 
          showCharacterCount 
          maxLength={200} 
          warningThreshold={80} 
        />
        
        <div className="pt-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full">
            Sign Up
          </button>
        </div>
      </div>
    );
  }
};

// Interactive playground
export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    
    return (
      <Input 
        {...args} 
        value={value} 
        onChange={(e) => setValue(e.target.value)} 
      />
    );
  },
  args: {
    label: 'Interactive Input',
    placeholder: 'Type something...',
    helpText: 'This is a fully customizable input',
    animateFocus: true,
    showCharacterCount: true,
    maxLength: 100
  }
};