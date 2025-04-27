import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../button/Button';
import { ButtonGroup } from '../ButtonGroup';

// Mock icons for stories
const LeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const RightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const GridIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

const ListIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6"></line>
    <line x1="8" y1="12" x2="21" y2="12"></line>
    <line x1="8" y1="18" x2="21" y2="18"></line>
    <line x1="3" y1="6" x2="3.01" y2="6"></line>
    <line x1="3" y1="12" x2="3.01" y2="12"></line>
    <line x1="3" y1="18" x2="3.01" y2="18"></line>
  </svg>
);

const meta: Meta<typeof ButtonGroup> = {
  title: 'UI/Button/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the button group'
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the buttons should take up the full width of the container'
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'The size to apply to all buttons in the group'
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'default'],
      description: 'The color to apply to all buttons in the group'
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'link'],
      description: 'The variant to apply to all buttons in the group'
    },
    dividers: {
      control: 'boolean',
      description: 'Whether to show dividers between buttons'
    },
    attached: {
      control: 'boolean',
      description: 'Whether the buttons should be attached without spacing'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether to disable all buttons in the group'
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'ButtonGroup component for grouping related buttons with consistent styling.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

// Basic example
export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button>Left</Button>
      <Button>Middle</Button>
      <Button>Right</Button>
    </ButtonGroup>
  )
};

// Vertical orientation
export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical">
      <Button>Top</Button>
      <Button>Middle</Button>
      <Button>Bottom</Button>
    </ButtonGroup>
  )
};

// With variant
export const WithVariant: Story = {
  render: () => (
    <ButtonGroup variant="outline" color="primary">
      <Button>Left</Button>
      <Button>Middle</Button>
      <Button>Right</Button>
    </ButtonGroup>
  )
};

// With dividers
export const WithDividers: Story = {
  render: () => (
    <ButtonGroup dividers>
      <Button>Left</Button>
      <Button>Middle</Button>
      <Button>Right</Button>
    </ButtonGroup>
  )
};

// Attached buttons
export const Attached: Story = {
  render: () => (
    <div className="space-y-4">
      <ButtonGroup attached variant="outline">
        <Button>Left</Button>
        <Button>Middle</Button>
        <Button>Right</Button>
      </ButtonGroup>
      
      <ButtonGroup attached orientation="vertical" variant="outline">
        <Button>Top</Button>
        <Button>Middle</Button>
        <Button>Bottom</Button>
      </ButtonGroup>
    </div>
  )
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <ButtonGroup size="xs" variant="outline">
        <Button>Left</Button>
        <Button>Middle</Button>
        <Button>Right</Button>
      </ButtonGroup>
      
      <ButtonGroup size="sm" variant="outline">
        <Button>Left</Button>
        <Button>Middle</Button>
        <Button>Right</Button>
      </ButtonGroup>
      
      <ButtonGroup size="md" variant="outline">
        <Button>Left</Button>
        <Button>Middle</Button>
        <Button>Right</Button>
      </ButtonGroup>
      
      <ButtonGroup size="lg" variant="outline">
        <Button>Left</Button>
        <Button>Middle</Button>
        <Button>Right</Button>
      </ButtonGroup>
      
      <ButtonGroup size="xl" variant="outline">
        <Button>Left</Button>
        <Button>Middle</Button>
        <Button>Right</Button>
      </ButtonGroup>
    </div>
  )
};

// Different colors
export const Colors: Story = {
  render: () => (
    <div className="space-y-4">
      <ButtonGroup color="primary" variant="outline">
        <Button>Left</Button>
        <Button>Middle</Button>
        <Button>Right</Button>
      </ButtonGroup>
      
      <ButtonGroup color="secondary" variant="outline">
        <Button>Left</Button>
        <Button>Middle</Button>
        <Button>Right</Button>
      </ButtonGroup>
      
      <ButtonGroup color="success" variant="outline">
        <Button>Left</Button>
        <Button>Middle</Button>
        <Button>Right</Button>
      </ButtonGroup>
      
      <ButtonGroup color="warning" variant="outline">
        <Button>Left</Button>
        <Button>Middle</Button>
        <Button>Right</Button>
      </ButtonGroup>
      
      <ButtonGroup color="danger" variant="outline">
        <Button>Left</Button>
        <Button>Middle</Button>
        <Button>Right</Button>
      </ButtonGroup>
      
      <ButtonGroup color="info" variant="outline">
        <Button>Left</Button>
        <Button>Middle</Button>
        <Button>Right</Button>
      </ButtonGroup>
    </div>
  )
};

// Full width
export const FullWidth: Story = {
  render: () => (
    <ButtonGroup fullWidth variant="outline">
      <Button>Left</Button>
      <Button>Middle</Button>
      <Button>Right</Button>
    </ButtonGroup>
  )
};

// With icons
export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <ButtonGroup variant="outline">
        <Button icons={{ left: <LeftIcon /> }}>Previous</Button>
        <Button>Current</Button>
        <Button icons={{ right: <RightIcon /> }}>Next</Button>
      </ButtonGroup>
      
      <ButtonGroup variant="outline">
        <Button icons={{ only: true }} aria-label="Grid view">
          <GridIcon />
        </Button>
        <Button icons={{ only: true }} aria-label="List view">
          <ListIcon />
        </Button>
      </ButtonGroup>
    </div>
  )
};

// Pagination example
export const PaginationExample: Story = {
  render: () => (
    <ButtonGroup attached variant="outline">
      <Button icons={{ left: <LeftIcon /> }} aria-label="Previous page">
        Prev
      </Button>
      <Button>1</Button>
      <Button variant="primary">2</Button>
      <Button>3</Button>
      <Button>...</Button>
      <Button>10</Button>
      <Button icons={{ right: <RightIcon /> }} aria-label="Next page">
        Next
      </Button>
    </ButtonGroup>
  )
};

// Disabled state
export const DisabledState: Story = {
  render: () => (
    <ButtonGroup disabled variant="outline">
      <Button>Left</Button>
      <Button>Middle</Button>
      <Button>Right</Button>
    </ButtonGroup>
  )
};

// Mixed button types
export const MixedButtonTypes: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Cancel</Button>
      <Button variant="primary">Submit</Button>
      <Button variant="ghost" icons={{ only: true }} aria-label="More options">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="12" cy="5" r="1"></circle>
          <circle cx="12" cy="19" r="1"></circle>
        </svg>
      </Button>
    </ButtonGroup>
  )
};

// Playground
export const Playground: Story = {
  args: {
    orientation: 'horizontal',
    fullWidth: false,
    size: 'md',
    color: 'primary',
    variant: 'outline',
    dividers: false,
    attached: true,
    disabled: false,
    children: [
      <Button key="1">Left</Button>,
      <Button key="2">Middle</Button>,
      <Button key="3">Right</Button>
    ]
  }
};