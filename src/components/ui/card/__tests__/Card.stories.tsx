import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../Card';
import { CardContent } from '../parts/CardContent';
import { CardDescription } from '../parts/CardDescription';
import { CardFooter } from '../parts/CardFooter';
import { CardHeader } from '../parts/CardHeader';
import { CardTitle } from '../parts/CardTitle';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'elevated', 'filled', 'gradient', 'ghost'],
      description: 'The visual style of the card'
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'The amount of padding inside the card'
    },
    animation: {
      control: 'select',
      options: ['none', 'enter', 'hover', 'elevate', 'pulse', 'gradient-shift', 'border-glow', 'staggered', 'flip'],
      description: 'The animation type for the card'
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the card should take the full width of its container'
    },
    interactive: {
      control: 'boolean',
      description: 'Makes the card interactive (clickable)'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Card>;

// Helper component for consistent card content in examples
const ExampleContent = () => (
  <>
    <CardHeader>
      <CardTitle>Card Title</CardTitle>
      <CardDescription>This is a description of the card content</CardDescription>
    </CardHeader>
    <CardContent>
      <p>This is the main content of the card. It can contain any elements.</p>
    </CardContent>
    <CardFooter>
      <button>Action</button>
    </CardFooter>
  </>
);

export const Default: Story = {
  args: {
    variant: 'default',
    padding: 'md',
    children: <ExampleContent />
  }
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
      <Card variant="default">
        <CardHeader>
          <CardTitle>Default</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Standard card with border</p>
        </CardContent>
      </Card>
      
      <Card variant="outline">
        <CardHeader>
          <CardTitle>Outline</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Just an outline with transparent background</p>
        </CardContent>
      </Card>
      
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Elevated</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card with shadow</p>
        </CardContent>
      </Card>
      
      <Card variant="filled">
        <CardHeader>
          <CardTitle>Filled</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Solid background color</p>
        </CardContent>
      </Card>
      
      <Card variant="gradient">
        <CardHeader>
          <CardTitle>Gradient</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Gradient background</p>
        </CardContent>
      </Card>
      
      <Card variant="ghost">
        <CardHeader>
          <CardTitle>Ghost</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No border or background, just spacing</p>
        </CardContent>
      </Card>
      
      <Card variant="default" interactive>
        <CardHeader>
          <CardTitle>Interactive</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Changes appearance on hover/focus</p>
        </CardContent>
      </Card>
    </div>
  )
};

export const AllAnimations: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
      <Card variant="default" animation="enter">
        <CardHeader>
          <CardTitle>Enter Animation</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Slides in from below with fade</p>
        </CardContent>
      </Card>
      
      <Card variant="default" animation="hover">
        <CardHeader>
          <CardTitle>Hover Animation</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Lifts up on hover</p>
        </CardContent>
      </Card>
      
      <Card variant="default" animation="elevate">
        <CardHeader>
          <CardTitle>Elevate Animation</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Adds shadow on hover</p>
        </CardContent>
      </Card>
      
      <Card variant="default" animation="pulse">
        <CardHeader>
          <CardTitle>Pulse Animation</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Subtle pulsing effect</p>
        </CardContent>
      </Card>
      
      <Card variant="gradient" animation="gradient-shift">
        <CardHeader>
          <CardTitle>Gradient Shift</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Moving gradient background</p>
        </CardContent>
      </Card>
      
      <Card variant="outline" animation="border-glow">
        <CardHeader>
          <CardTitle>Border Glow</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Pulsing border color</p>
        </CardContent>
      </Card>
      
      <Card variant="default" animation="staggered">
        <CardHeader>
          <CardTitle>Staggered Animation</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Elements animate in sequence</p>
        </CardContent>
        <CardFooter>
          <button>Action</button>
        </CardFooter>
      </Card>
      
      <Card variant="default" animation="flip">
        <CardHeader>
          <CardTitle>Flip Animation</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Flips on hover (hover me)</p>
        </CardContent>
      </Card>
    </div>
  )
};

export const AnimatedParts: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Card variant="elevated">
        <CardHeader animate>
          <CardTitle>Animated Header</CardTitle>
          <CardDescription>The header slides in from above</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Static content</p>
        </CardContent>
        <CardFooter>
          <button>Action</button>
        </CardFooter>
      </Card>
      
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Static Header</CardTitle>
        </CardHeader>
        <CardContent animate>
          <p>This content fades in</p>
        </CardContent>
        <CardFooter>
          <button>Action</button>
        </CardFooter>
      </Card>
      
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Static Header</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Static content</p>
        </CardContent>
        <CardFooter animate>
          <button>Action</button>
        </CardFooter>
      </Card>
      
      <Card variant="elevated">
        <CardHeader animate>
          <CardTitle>Fully Animated Card</CardTitle>
        </CardHeader>
        <CardContent animate>
          <p>All parts of this card are animated individually</p>
        </CardContent>
        <CardFooter animate>
          <button>Action</button>
        </CardFooter>
      </Card>
    </div>
  )
};

export const WithDifferentPadding: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Card variant="default" padding="none">
        <div style={{ padding: '1rem', background: '#f0f0f0' }}>No padding</div>
      </Card>
      <Card variant="default" padding="sm">
        <CardHeader>
          <CardTitle>Small Padding</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This card has small padding</p>
        </CardContent>
      </Card>
      <Card variant="default" padding="md">
        <CardHeader>
          <CardTitle>Medium Padding (Default)</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This card has medium padding</p>
        </CardContent>
      </Card>
      <Card variant="default" padding="lg">
        <CardHeader>
          <CardTitle>Large Padding</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This card has large padding</p>
        </CardContent>
      </Card>
    </div>
  )
};

export const WithHeaderActions: Story = {
  render: () => (
    <Card variant="elevated">
      <CardHeader withActions>
        <CardTitle>Card with Actions</CardTitle>
        <div>
          <button style={{ marginRight: '0.5rem' }}>Edit</button>
          <button>Delete</button>
        </div>
      </CardHeader>
      <CardContent>
        <p>This card has a header with action buttons aligned to the right.</p>
      </CardContent>
    </Card>
  )
};

export const Interactive: Story = {
  args: {
    variant: 'default',
    interactive: true,
    animation: 'hover',
    children: (
      <>
        <CardHeader>
          <CardTitle>Interactive Card</CardTitle>
          <CardDescription>Click or focus on this card</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card responds to user interaction.</p>
          <p>Hover, click, or focus to see the effect.</p>
        </CardContent>
      </>
    )
  }
};

export const CustomGradient: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Card 
        variant="gradient" 
        animation="gradient-shift"
        style={{ 
          background: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
          color: 'white'
        }}
      >
        <CardHeader>
          <CardTitle>Animated Blue Gradient</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Custom blue gradient background with animation</p>
        </CardContent>
      </Card>
      
      <Card 
        variant="gradient" 
        animation="gradient-shift"
        style={{ 
          background: 'linear-gradient(to right, #ff9a9e 0%, #fad0c4 100%)',
          color: '#4a5568'
        }}
      >
        <CardHeader>
          <CardTitle>Animated Pink Gradient</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Custom pink gradient background with animation</p>
        </CardContent>
      </Card>
      
      <Card 
        variant="gradient" 
        animation="gradient-shift"
        style={{ 
          background: 'linear-gradient(to right, #43e97b 0%, #38f9d7 100%)',
          color: '#2d3748'
        }}
      >
        <CardHeader>
          <CardTitle>Animated Green Gradient</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Custom green gradient background with animation</p>
        </CardContent>
      </Card>
    </div>
  )
};

export const CardGrid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i} variant="elevated" interactive animation="hover">
          <CardHeader>
            <CardTitle>Card {i}</CardTitle>
            <CardDescription>Interactive grid card</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is a grid of interactive cards.</p>
          </CardContent>
          <CardFooter>
            <button>View Details</button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
};

export const SequentialAnimation: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ marginBottom: '1rem' }}>
        <p>These cards demonstrate staggered animations with different delays:</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
        {[1, 2, 3, 4].map((i) => (
          <Card 
            key={i} 
            variant="elevated" 
            animation="enter"
            style={{ 
              animationDelay: `${i * 0.1}s`,
            }}
          >
            <CardHeader>
              <CardTitle>Card {i}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>This card appears with a delay.</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
};