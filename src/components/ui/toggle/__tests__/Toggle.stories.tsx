import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from '../Toggle';

const meta: Meta<typeof Toggle> = {
  component: Toggle,
  title: 'UI/Toggle',
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
      options: ['primary', 'secondary', 'success', 'danger'],
      defaultValue: 'primary'
    },
    helperText: { control: 'text' },
    error: { control: 'text' },
    labelLeft: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    label: 'Toggle me',
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked toggle',
    checked: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'With helper text',
    helperText: 'This is some helpful information about the toggle',
  },
};

export const WithError: Story = {
  args: {
    label: 'With error',
    error: 'This field is required',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled toggle',
    disabled: true,
  },
};

export const LabelOnLeft: Story = {
  args: {
    label: 'Label on left',
    labelLeft: true,
  },
};

export const Small: Story = {
  args: {
    label: 'Small toggle',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    label: 'Medium toggle',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    label: 'Large toggle',
    size: 'lg',
  },
};

export const Primary: Story = {
  args: {
    label: 'Primary variant',
    variant: 'primary',
    checked: true,
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary variant',
    variant: 'secondary',
    checked: true,
  },
};

export const Success: Story = {
  args: {
    label: 'Success variant',
    variant: 'success',
    checked: true,
  },
};

export const Danger: Story = {
  args: {
    label: 'Danger variant',
    variant: 'danger',
    checked: true,
  },
};