import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from '../variants/IconButton';

// Mock icons for stories
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const meta: Meta<typeof IconButton> = {
  title: 'UI/Button/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    icon: { control: 'object', description: 'The icon to display' },
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
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible label for the button (required)'
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'IconButton component for icon-only actions with built-in accessibility features.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof IconButton>;

// Basic example
export const Default: Story = {
  args: {
    icon: <SearchIcon />,
    'aria-label': 'Search',
    variant: 'primary',
    size: 'md',
    color: 'primary'
  }
};

// Variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <IconButton icon={<SearchIcon />} variant="primary" aria-label="Search (primary)" />
      <IconButton icon={<SearchIcon />} variant="secondary" aria-label="Search (secondary)" />
      <IconButton icon={<SearchIcon />} variant="outline" aria-label="Search (outline)" />
      <IconButton icon={<SearchIcon />} variant="ghost" aria-label="Search (ghost)" />
    </div>
  )
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <IconButton icon={<SearchIcon />} size="xs" aria-label="Search (extra small)" />
      <IconButton icon={<SearchIcon />} size="sm" aria-label="Search (small)" />
      <IconButton icon={<SearchIcon />} size="md" aria-label="Search (medium)" />
      <IconButton icon={<SearchIcon />} size="lg" aria-label="Search (large)" />
      <IconButton icon={<SearchIcon />} size="xl" aria-label="Search (extra large)" />
    </div>
  )
};

// Colors
export const Colors: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <IconButton icon={<SearchIcon />} color="primary" aria-label="Search (primary)" />
        <IconButton icon={<SearchIcon />} color="success" aria-label="Search (success)" />
        <IconButton icon={<SearchIcon />} color="warning" aria-label="Search (warning)" />
        <IconButton icon={<SearchIcon />} color="danger" aria-label="Search (danger)" />
        <IconButton icon={<SearchIcon />} color="info" aria-label="Search (info)" />
        <IconButton icon={<SearchIcon />} color="default" aria-label="Search (default)" />
      </div>
      
      <div className="flex flex-wrap gap-4">
        <IconButton icon={<SearchIcon />} variant="outline" color="primary" aria-label="Search (primary outline)" />
        <IconButton icon={<SearchIcon />} variant="outline" color="success" aria-label="Search (success outline)" />
        <IconButton icon={<SearchIcon />} variant="outline" color="warning" aria-label="Search (warning outline)" />
        <IconButton icon={<SearchIcon />} variant="outline" color="danger" aria-label="Search (danger outline)" />
        <IconButton icon={<SearchIcon />} variant="outline" color="info" aria-label="Search (info outline)" />
        <IconButton icon={<SearchIcon />} variant="outline" color="default" aria-label="Search (default outline)" />
      </div>
      
      <div className="flex flex-wrap gap-4">
        <IconButton icon={<SearchIcon />} variant="ghost" color="primary" aria-label="Search (primary ghost)" />
        <IconButton icon={<SearchIcon />} variant="ghost" color="success" aria-label="Search (success ghost)" />
        <IconButton icon={<SearchIcon />} variant="ghost" color="warning" aria-label="Search (warning ghost)" />
        <IconButton icon={<SearchIcon />} variant="ghost" color="danger" aria-label="Search (danger ghost)" />
        <IconButton icon={<SearchIcon />} variant="ghost" color="info" aria-label="Search (info ghost)" />
        <IconButton icon={<SearchIcon />} variant="ghost" color="default" aria-label="Search (default ghost)" />
      </div>
    </div>
  )
};

// Different icons
export const DifferentIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <IconButton icon={<SearchIcon />} variant="primary" aria-label="Search" />
      <IconButton icon={<EditIcon />} variant="secondary" aria-label="Edit" />
      <IconButton icon={<DeleteIcon />} variant="outline" color="danger" aria-label="Delete" />
      <IconButton icon={<HeartIcon />} variant="ghost" color="danger" aria-label="Like" />
    </div>
  )
};

// States
export const States: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <IconButton icon={<SearchIcon />} aria-label="Normal" />
      <IconButton icon={<SearchIcon />} disabled aria-label="Disabled" />
      <IconButton icon={<SearchIcon />} active aria-label="Active" />
    </div>
  )
};

// Rounded and Pill shapes
export const Shapes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <IconButton icon={<SearchIcon />} aria-label="Default shape" />
      <IconButton icon={<SearchIcon />} rounded aria-label="Rounded" />
      <IconButton icon={<SearchIcon />} pill aria-label="Pill" />
    </div>
  )
};

// Playground
export const Playground: Story = {
  args: {
    icon: <SearchIcon />,
    'aria-label': 'Search',
    variant: 'primary',
    size: 'md',
    color: 'primary',
    disabled: false,
    rounded: false,
    pill: false,
  }
};