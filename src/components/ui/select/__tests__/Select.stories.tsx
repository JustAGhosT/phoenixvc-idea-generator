import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '../Select';

const mockOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'durian', label: 'Durian', disabled: true },
  { value: 'elderberry', label: 'Elderberry' }
];

const meta: Meta<typeof Select> = {
  component: Select,
  title: 'UI/Select',
  argTypes: {
    options: { control: 'object' },
    label: { control: 'text' },
    size: { 
      control: 'select', 
      options: ['sm', 'md', 'lg'],
      defaultValue: 'md'
    },
    variant: { 
      control: 'select', 
      options: ['default', 'outline', 'filled'],
      defaultValue: 'default'
    },
    helperText: { control: 'text' },
    error: { control: 'text' },
    placeholder: { control: 'text' },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    options: mockOptions
  }
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    label: 'Select a fruit',
  },
};

export const WithPlaceholder: Story = {
  args: {
    label: 'Select a fruit',
    placeholder: 'Choose a fruit...',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Select a fruit',
    value: 'banana',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Select a fruit',
    helperText: 'Choose your favorite fruit',
  },
};

export const WithError: Story = {
  args: {
    label: 'Select a fruit',
    error: 'Please select a fruit',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Select a fruit',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Select a fruit',
    fullWidth: true,
  },
};

export const Small: Story = {
  args: {
    label: 'Small select',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    label: 'Medium select',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    label: 'Large select',
    size: 'lg',
  },
};

export const DefaultVariant: Story = {
  args: {
    label: 'Default variant',
    variant: 'default',
  },
};

export const OutlineVariant: Story = {
  args: {
    label: 'Outline variant',
    variant: 'outline',
  },
};

export const FilledVariant: Story = {
  args: {
    label: 'Filled variant',
    variant: 'filled',
  },
};