import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '../Switch';

const meta: Meta<typeof Switch> = {
  component: Switch,
  title: 'UI/Switch',
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

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    label: 'Switch me',
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked switch',
    checked: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'With helper text',
    helperText: 'This is some helpful information about the switch',
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
    label: 'Disabled switch',
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
    label: 'Small switch',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    label: 'Medium switch',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    label: 'Large switch',
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