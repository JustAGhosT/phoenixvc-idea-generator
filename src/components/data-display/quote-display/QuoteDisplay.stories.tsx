import { Meta, StoryObj } from '@storybook/react';
import { Star } from 'lucide-react';
import { QuoteDisplay } from './QuoteDisplay';

const meta: Meta<typeof QuoteDisplay> = {
  component: QuoteDisplay,
  title: 'Data Display/QuoteDisplay',
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'info'],
      description: 'The visual style of the quote'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the quote'
    },
    layout: {
      control: 'select',
      options: ['default', 'centered', 'bordered', 'minimal'],
      description: 'The layout style of the quote'
    },
    showIcon: {
      control: 'boolean',
      description: 'Whether to show the quote icon'
    },
    loading: {
      control: 'boolean',
      description: 'Whether the quote is in a loading state'
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler for interactive quotes'
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'A component for displaying quotes, testimonials, or pull quotes with attribution and styling options.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof QuoteDisplay>;

// Basic example
export const Basic: Story = {
  args: {
    quote: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
    source: "1971 meeting"
  }
};

// With variant
export const WithVariant: Story = {
  args: {
    quote: "Design is not just what it looks like and feels like. Design is how it works.",
    author: "Steve Jobs",
    variant: "primary"
  }
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <QuoteDisplay
        quote="Small quote size example."
        author="Small Author"
        size="sm"
      />
      <QuoteDisplay
        quote="Medium quote size example (default)."
        author="Medium Author"
        size="md"
      />
      <QuoteDisplay
        quote="Large quote size example with more emphasis."
        author="Large Author"
        size="lg"
      />
    </div>
  )
};

// Different layouts
export const Layouts: Story = {
  render: () => (
    <div className="space-y-6">
      <QuoteDisplay
        quote="Default layout with left alignment and border."
        author="Default Layout"
        layout="default"
      />
      <QuoteDisplay
        quote="Centered layout with top border instead of left border."
        author="Centered Layout"
        layout="centered"
      />
      <QuoteDisplay
        quote="Bordered layout with border on all sides."
        author="Bordered Layout"
        layout="bordered"
      />
      <QuoteDisplay
        quote="Minimal layout without background or padding."
        author="Minimal Layout"
        layout="minimal"
      />
    </div>
  )
};

// With custom icon
export const WithCustomIcon: Story = {
  args: {
    quote: "This is a testimonial with a star icon instead of a quote icon.",
    author: "Happy Customer",
    source: "Product Review",
    icon: <Star className="text-yellow-500" />,
    variant: "success"
  }
};

// Full attribution
export const FullAttribution: Story = {
  args: {
    quote: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
    source: "Long Walk to Freedom",
    date: "1995"
  }
};

// Loading state
export const Loading: Story = {
  args: {
    quote: "This content is loading...",
    author: "Loading Author",
    loading: true
  }
};

// Interactive quote
export const Interactive: Story = {
  args: {
    quote: "Click me to see more details about this quote.",
    author: "Interactive Quote",
    onClick: () => alert('Quote clicked!')
  }
};

// Variants grid
export const VariantsGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <QuoteDisplay
        quote="Default variant example."
        author="Default Author"
        variant="default"
      />
      <QuoteDisplay
        quote="Primary variant example."
        author="Primary Author"
        variant="primary"
      />
      <QuoteDisplay
        quote="Secondary variant example."
        author="Secondary Author"
        variant="secondary"
      />
      <QuoteDisplay
        quote="Success variant example."
        author="Success Author"
        variant="success"
      />
      <QuoteDisplay
        quote="Warning variant example."
        author="Warning Author"
        variant="warning"
      />
      <QuoteDisplay
        quote="Danger variant example."
        author="Danger Author"
        variant="danger"
      />
      <QuoteDisplay
        quote="Info variant example."
        author="Info Author"
        variant="info"
      />
    </div>
  )
};

// Testimonial example
export const Testimonial: Story = {
  args: {
    quote: "This product has completely transformed our workflow. We've seen a 40% increase in productivity since implementing it.",
    author: "Jane Smith",
    source: "CEO, Acme Inc.",
    variant: "success",
    size: "lg"
  }
};

// Literary quote example
export const LiteraryQuote: Story = {
  args: {
    quote: "All that is gold does not glitter, not all those who wander are lost; the old that is strong does not wither, deep roots are not reached by the frost.",
    author: "J.R.R. Tolkien",
    source: "The Fellowship of the Ring",
    date: "1954",
    variant: "primary",
    size: "md"
  }
};