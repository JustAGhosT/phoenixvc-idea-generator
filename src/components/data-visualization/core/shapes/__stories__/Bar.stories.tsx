import { Meta, StoryObj } from '@storybook/react';
import { Bar } from '../Bar';

const meta: Meta<typeof Bar> = {
  title: 'Data Visualization/Core/Shapes/Bar',
  component: Bar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <svg width="300" height="200" style={{ border: '1px solid #ccc' }}>
        <defs>
          <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
        </defs>
        <Story />
      </svg>
    ),
  ],
  argTypes: {
    x: { control: { type: 'range', min: 0, max: 250, step: 10 } },
    y: { control: { type: 'range', min: 0, max: 150, step: 10 } },
    width: { control: { type: 'range', min: 10, max: 200, step: 10 } },
    height: { control: { type: 'range', min: 10, max: 150, step: 10 } },
    fill: { control: 'color' },
    radius: { control: { type: 'range', min: 0, max: 20, step: 1 } },
    useGradient: { control: 'boolean' },
    gradientId: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Bar>;

// Basic bar
export const Basic: Story = {
  args: {
    x: 50,
    y: 50,
    width: 100,
    height: 80,
    fill: '#3b82f6',
  },
};

// Rounded bar
export const Rounded: Story = {
  args: {
    x: 50,
    y: 50,
    width: 100,
    height: 80,
    fill: '#10b981',
    radius: 10,
  },
};

// Bar with gradient
export const WithGradient: Story = {
  args: {
    x: 50,
    y: 50,
    width: 100,
    height: 80,
    useGradient: true,
    gradientId: 'barGradient',
  },
};

// Bar with data attributes
export const WithDataAttributes: Story = {
  args: {
    x: 50,
    y: 50,
    width: 100,
    height: 80,
    fill: '#8b5cf6',
    dataAttributes: {
      label: 'Example Bar',
      value: '75',
      category: 'Category A',
    },
  },
};

// Interactive bar with event handlers
export const Interactive: Story = {
  args: {
    x: 50,
    y: 50,
    width: 100,
    height: 80,
    fill: '#f97316',
    onClick: () => alert('Bar clicked!'),
    onMouseEnter: () => console.log('Mouse entered'),
    onMouseLeave: () => console.log('Mouse left'),
  },
};