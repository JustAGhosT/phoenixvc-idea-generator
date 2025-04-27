import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { Checkbox } from '../Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The label for the checkbox'
    },
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked'
    },
    indeterminate: {
      control: 'boolean',
      description: 'Whether the checkbox is in an indeterminate state'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the checkbox'
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary'],
      description: 'The visual style variant'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled'
    },
    helperText: {
      control: 'text',
      description: 'Optional helper text to display below the checkbox'
    },
    error: {
      control: 'text',
      description: 'Error message to display'
    },
    animate: {
      control: 'boolean',
      description: 'Whether to animate the checkbox state changes'
    },
    showErrorAnimation: {
      control: 'boolean',
      description: 'Whether to show error animation when error state changes'
    },
    showSuccessAnimation: {
      control: 'boolean',
      description: 'Whether to show a success animation when checked'
    },
    showHoverAnimation: {
      control: 'boolean',
      description: 'Whether to show a hover animation'
    },
    showFocusAnimation: {
      control: 'boolean',
      description: 'Whether to show a focus ring animation'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// Basic example
export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  }
};

// Controlled example
export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    
    return (
      <Checkbox 
        label="Remember me" 
        checked={checked} 
        onChange={(e) => setChecked(e.target.checked)} 
        animate={true}
      />
    );
  }
};

// Checkbox states
export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" checked animate={true} />
      <Checkbox label="Indeterminate" indeterminate animate={true} />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled and Checked" disabled checked />
      <Checkbox label="Disabled and Indeterminate" disabled indeterminate />
    </div>
  )
};

// Checkbox sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Checkbox size="sm" label="Small checkbox" animate={true} />
      <Checkbox size="md" label="Medium checkbox (default)" animate={true} />
      <Checkbox size="lg" label="Large checkbox" animate={true} />
    </div>
  )
};

// Checkbox variants
export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <Checkbox variant="default" label="Default variant" checked animate={true} />
      <Checkbox variant="primary" label="Primary variant" checked animate={true} />
      <Checkbox variant="secondary" label="Secondary variant" checked animate={true} />
    </div>
  )
};

// With helper text
export const WithHelperText: Story = {
  render: () => (
    <div className="space-y-4">
      <Checkbox 
        label="Subscribe to newsletter" 
        helperText="We'll send you updates about our product" 
        animate={true}
      />
      <Checkbox 
        label="Accept terms" 
        error="You must accept the terms to continue" 
        showErrorAnimation={true}
      />
    </div>
  )
};

// Animation examples
export const Animations: Story = {
  render: () => {
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const [checked4, setChecked4] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    
    // Toggle error message for demonstration
    useEffect(() => {
      const timer = setInterval(() => {
        setError(prev => prev ? undefined : "This field is required");
      }, 3000);
      
      return () => clearInterval(timer);
    }, []);
    
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Check Animation</h3>
          <Checkbox 
            label="Click me to see the check animation" 
            checked={checked1} 
            onChange={(e) => setChecked1(e.target.checked)} 
            animate={true}
          />
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Success Animation</h3>
          <Checkbox 
            label="Click me to see the success animation" 
            checked={checked2} 
            onChange={(e) => setChecked2(e.target.checked)} 
            animate={true}
            showSuccessAnimation={true}
          />
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Hover Animation</h3>
          <Checkbox 
            label="Hover over me to see the hover animation" 
            checked={checked3} 
            onChange={(e) => setChecked3(e.target.checked)} 
            animate={true}
            showHoverAnimation={true}
          />
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Focus Animation</h3>
          <Checkbox 
            label="Focus me to see the focus animation (click or tab to focus)" 
            checked={checked4} 
            onChange={(e) => setChecked4(e.target.checked)} 
            animate={true}
            showFocusAnimation={true}
          />
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Error Animation</h3>
          <Checkbox 
            label="Error animation demo" 
            error={error}
            showErrorAnimation={true}
          />
          <p className="text-sm text-gray-500 mt-1">Error message changes every 3 seconds</p>
        </div>
      </div>
    );
  }
};

// Indeterminate state example
export const IndeterminateExample: Story = {
  render: () => {
    const [checkedItems, setCheckedItems] = useState({
      option1: false,
      option2: false,
      option3: false,
    });
    
    const allChecked = Object.values(checkedItems).every(Boolean);
    const someChecked = Object.values(checkedItems).some(Boolean) && !allChecked;
    
    const handleParentChange = () => {
      const newValue = !allChecked;
      setCheckedItems({
        option1: newValue,
        option2: newValue,
        option3: newValue,
      });
    };
    
    const handleChildChange = (option: keyof typeof checkedItems) => {
      setCheckedItems({
        ...checkedItems,
        [option]: !checkedItems[option],
      });
    };
    
    return (
      <div className="space-y-2">
        <Checkbox 
          label="Select all" 
          checked={allChecked} 
          indeterminate={someChecked} 
          onChange={handleParentChange} 
          animate={true}
        />
        <div className="ml-6 space-y-1">
          <Checkbox 
            label="Option 1" 
            checked={checkedItems.option1} 
            onChange={() => handleChildChange('option1')} 
            animate={true}
          />
          <Checkbox 
            label="Option 2" 
            checked={checkedItems.option2} 
            onChange={() => handleChildChange('option2')} 
            animate={true}
          />
          <Checkbox 
            label="Option 3" 
            checked={checkedItems.option3} 
            onChange={() => handleChildChange('option3')} 
            animate={true}
          />
        </div>
      </div>
    );
  }
};

// Form example
export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      acceptTerms: false,
      newsletter: false,
      updates: false,
    });
    
    const [errors, setErrors] = useState<Record<string, string>>({});
    
    const handleChange = (field: keyof typeof formData) => {
      setFormData({
        ...formData,
        [field]: !formData[field],
      });
      
      // Clear error when checked
      if (!formData[field] && errors[field]) {
        setErrors({
          ...errors,
          [field]: '',
        });
      }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      const newErrors: Record<string, string> = {};
      
      if (!formData.acceptTerms) {
        newErrors.acceptTerms = 'You must accept the terms to continue';
      }
      
      setErrors(newErrors);
      
      if (Object.keys(newErrors).length === 0) {
        alert('Form submitted successfully!');
      }
    };
    
    return (
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md p-6 border border-gray-200 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Sign Up Preferences</h2>
        
        <Checkbox 
          label="I accept the terms and conditions" 
          checked={formData.acceptTerms} 
          onChange={() => handleChange('acceptTerms')} 
          error={errors.acceptTerms}
          showErrorAnimation={true}
          animate={true}
        />
        
        <Checkbox 
          label="Subscribe to newsletter" 
          checked={formData.newsletter} 
          onChange={() => handleChange('newsletter')} 
          helperText="We'll send you weekly updates about our product" 
          animate={true}
          showSuccessAnimation={true}
        />
        
        <Checkbox 
          label="Receive product updates" 
          checked={formData.updates} 
          onChange={() => handleChange('updates')} 
          helperText="Get notified when we release new features" 
          animate={true}
          showHoverAnimation={true}
        />
        
        <div className="pt-4">
          <button 
            type="submit" 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
};

// With custom label content
export const CustomLabelContent: Story = {
  render: () => (
    <div className="space-y-4">
      <Checkbox 
        label={
          <span className="flex items-center">
            Accept terms
            <span className="ml-1 px-1 py-0.5 text-xs bg-blue-100 text-blue-800 rounded">Required</span>
          </span>
        } 
        animate={true}
      />
      
      <Checkbox 
        label={
          <span className="flex items-center">
            Premium feature
            <svg className="ml-1 h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
          </span>
        } 
        animate={true}
      />
      
      <Checkbox 
        label={
          <div>
            <div className="font-medium">Privacy Policy</div>
            <div className="text-sm text-gray-500">I agree to the privacy policy and terms</div>
          </div>
        } 
        animate={true}
      />
    </div>
  )
};

// Dark mode example
export const DarkMode: Story = {
  render: () => (
    <div className="p-6 bg-gray-900 text-white rounded-lg">
      <div className="space-y-4">
        <Checkbox label="Unchecked" animate={true} />
        <Checkbox label="Checked" checked animate={true} />
        <Checkbox label="Indeterminate" indeterminate animate={true} />
        <Checkbox 
          label="With animations" 
          helperText="Helper text in dark mode" 
          animate={true}
          showHoverAnimation={true}
          showFocusAnimation={true}
        />
        <Checkbox 
          label="With error" 
          error="Error message in dark mode" 
          showErrorAnimation={true}
        />
        <Checkbox label="Disabled" disabled />
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  }
};

// Reduced motion example
export const ReducedMotion: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Reduced Motion Support</h3>
        <p className="text-sm text-gray-500 mb-4">
          These checkboxes respect the "prefers-reduced-motion" setting. 
          If you have reduced motion enabled in your system preferences, 
          animations will be disabled.
        </p>
        
        <div className="space-y-4">
          <Checkbox 
            label="Check animation (respects reduced motion)" 
            animate={true}
          />
          
          <Checkbox 
            label="Success animation (respects reduced motion)" 
            animate={true}
            showSuccessAnimation={true}
          />
          
          <Checkbox 
            label="Error animation (respects reduced motion)" 
            error="Error message"
            showErrorAnimation={true}
          />
        </div>
      </div>
    </div>
  )
};

// Interactive playground
export const Playground: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(args.checked || false);
    
    return (
      <Checkbox 
        {...args} 
        checked={checked} 
        onChange={(e) => setChecked(e.target.checked)} 
      />
    );
  },
  args: {
    label: 'Interactive checkbox',
    helperText: 'This is a fully customizable checkbox',
    size: 'md',
    variant: 'default',
    animate: true,
    showHoverAnimation: true,
    showFocusAnimation: true,
    showSuccessAnimation: false,
    showErrorAnimation: false,
  }
};