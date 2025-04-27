import type { Meta, StoryObj } from '@storybook/react';
import { LinkButton } from '../variants/LinkButton';

// Mock icons for stories
const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const meta: Meta<typeof LinkButton> = {
  title: 'UI/Button/LinkButton',
  component: LinkButton,
  tags: ['autodocs'],
  argTypes: {
    href: { control: 'text', description: 'The URL to navigate to' },
    external: { control: 'boolean', description: 'Whether the link should open in a new tab' },
    underlined: { control: 'boolean', description: 'Whether the link should be styled as an underlined link' },
    buttonStyle: { control: 'boolean', description: 'Whether the link should be styled as a button' },
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
        component: 'LinkButton component for navigation actions, rendering as an anchor (`<a>`) element while maintaining button styling.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof LinkButton>;

// Basic example
export const Default: Story = {
  args: {
    href: '#',
    children: 'Link Button',
    color: 'primary',
    size: 'md',
    buttonStyle: true
  }
};

// Styles
export const Styles: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <LinkButton href="#" buttonStyle>Button Style</LinkButton>
        <LinkButton href="#">Link Style</LinkButton>
        <LinkButton href="#" underlined>Underlined Link</LinkButton>
      </div>
    </div>
  )
};

// External links
export const ExternalLinks: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <LinkButton 
          href="https://example.com" 
          external 
          buttonStyle
          icons={{ right: <ExternalLinkIcon /> }}
        >
          External Link (Button Style)
        </LinkButton>
        
        <LinkButton 
          href="https://example.com" 
          external
          icons={{ right: <ExternalLinkIcon /> }}
        >
          External Link
        </LinkButton>
        
        <LinkButton 
          href="https://example.com" 
          external 
          underlined
          icons={{ right: <ExternalLinkIcon /> }}
        >
          External Underlined Link
        </LinkButton>
      </div>
    </div>
  )
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <LinkButton href="#" size="xs" buttonStyle>Extra Small</LinkButton>
        <LinkButton href="#" size="sm" buttonStyle>Small</LinkButton>
        <LinkButton href="#" size="md" buttonStyle>Medium</LinkButton>
        <LinkButton href="#" size="lg" buttonStyle>Large</LinkButton>
        <LinkButton href="#" size="xl" buttonStyle>Extra Large</LinkButton>
      </div>
      
      <div className="flex flex-wrap items-center gap-4">
        <LinkButton href="#" size="xs">XS Link</LinkButton>
        <LinkButton href="#" size="sm">SM Link</LinkButton>
        <LinkButton href="#" size="md">MD Link</LinkButton>
        <LinkButton href="#" size="lg">LG Link</LinkButton>
        <LinkButton href="#" size="xl">XL Link</LinkButton>
      </div>
    </div>
  )
};

// Colors
export const Colors: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <LinkButton href="#" color="primary" buttonStyle>Primary</LinkButton>
        <LinkButton href="#" color="success" buttonStyle>Success</LinkButton>
        <LinkButton href="#" color="warning" buttonStyle>Warning</LinkButton>
        <LinkButton href="#" color="danger" buttonStyle>Danger</LinkButton>
        <LinkButton href="#" color="info" buttonStyle>Info</LinkButton>
        <LinkButton href="#" color="default" buttonStyle>Default</LinkButton>
      </div>
      
      <div className="flex flex-wrap gap-4">
        <LinkButton href="#" color="primary">Primary Link</LinkButton>
        <LinkButton href="#" color="success">Success Link</LinkButton>
        <LinkButton href="#" color="warning">Warning Link</LinkButton>
        <LinkButton href="#" color="danger">Danger Link</LinkButton>
        <LinkButton href="#" color="info">Info Link</LinkButton>
        <LinkButton href="#" color="default">Default Link</LinkButton>
      </div>
    </div>
  )
};

// With icons
export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <LinkButton 
          href="#" 
          buttonStyle
          icons={{ right: <ArrowRightIcon /> }}
        >
          Next Page
        </LinkButton>
        
        <LinkButton 
          href="#" 
          buttonStyle
          color="success"
          icons={{ left: <ArrowRightIcon /> }}
        >
          Previous Page
        </LinkButton>
        
        <LinkButton 
          href="https://example.com" 
          external 
          buttonStyle
          color="info"
          icons={{ right: <ExternalLinkIcon /> }}
        >
          Documentation
        </LinkButton>
      </div>
      
      <div className="flex flex-wrap gap-4">
        <LinkButton 
          href="#" 
          icons={{ right: <ArrowRightIcon /> }}
        >
          Next Page
        </LinkButton>
        
        <LinkButton 
          href="https://example.com" 
          external
          underlined
          icons={{ right: <ExternalLinkIcon /> }}
        >
          External Resource
        </LinkButton>
      </div>
    </div>
  )
};

// Disabled state
export const DisabledState: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <LinkButton href="#" buttonStyle disabled>Disabled Button Style</LinkButton>
        <LinkButton href="#" disabled>Disabled Link Style</LinkButton>
        <LinkButton href="#" underlined disabled>Disabled Underlined</LinkButton>
      </div>
    </div>
  )
};

// Playground
export const Playground: Story = {
  args: {
    href: '#',
    children: 'Link Button',
    buttonStyle: false,
    underlined: false,
    external: false,
    size: 'md',
    color: 'primary',
    disabled: false
  }
};