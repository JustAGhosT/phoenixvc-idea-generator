import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from '../Radio';

const meta: Meta<typeof Radio> = {
  component: Radio,
  title: 'UI/Radio',
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' },
    size: { 
      control: 'select', 
      options: ['sm', 'md', 'lg'],
      defaultValue: 'md'
    },
    variant: { 
      control: 'select', 
      options: ['default', 'primary', 'secondary'],
      defaultValue: 'default'
    },
    helperText: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    name: { control: 'text' },
    value: { control: 'text' },
  },
  args: {
    name: 'radio-story'
  }
};

export default meta;

type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    label: 'Radio option',
    value: 'option1'
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked radio',
    value: 'option1',
    checked: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'With helper text',
    value: 'option1',
    helperText: 'This is some helpful information about the option',
  },
};

export const WithError: Story = {
  args: {
    label: 'With error',
    value: 'option1',
    error: 'This field is required',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled radio',
    value: 'option1',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled checked radio',
    value: 'option1',
    disabled: true,
    checked: true,
  },
};

export const Small: Story = {
  args: {
    label: 'Small radio',
    value: 'option1',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    label: 'Medium radio',
    value: 'option1',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    label: 'Large radio',
    value: 'option1',
    size: 'lg',
  },
};

export const DefaultVariant: Story = {
  args: {
    label: 'Default variant',
    value: 'option1',
    variant: 'default',
    checked: true,
  },
};

export const PrimaryVariant: Story = {
  args: {
    label: 'Primary variant',
    value: 'option1',
    variant: 'primary',
    checked: true,
  },
};

export const SecondaryVariant: Story = {
  args: {
    label: 'Secondary variant',
    value: 'option1',
    variant: 'secondary',
    checked: true,
  },
};

// Story showing a group of radio buttons
export const RadioGroup: Story = {
  render: () => (
    <div className="space-y-2">
      <Radio 
        name="fruit" 
        value="apple" 
        label="Apple" 
        defaultChecked 
      />
      <Radio 
        name="fruit" 
        value="banana" 
        label="Banana" 
      />
      <Radio 
        name="fruit" 
        value="cherry" 
        label="Cherry" 
      />
      <Radio 
        name="fruit" 
        value="durian" 
        label="Durian" 
        disabled 
      />
    </div>
  ),
};