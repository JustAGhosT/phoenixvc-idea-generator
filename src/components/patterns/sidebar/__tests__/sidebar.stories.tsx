import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from '../index';
import { SidebarProvider } from '@/contexts/sidebar-context';
import { Home, Settings, FileText, ChevronRight } from 'lucide-react';

const meta: Meta<typeof Sidebar.Root> = {
  title: 'Patterns/Sidebar',
  component: Sidebar.Root,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <SidebarProvider>
        <div style={{ height: '100vh' }}>
          <Story />
        </div>
      </SidebarProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Sidebar.Root>;

/**
 * Default sidebar with all components
 */
export const Default: Story = {
  render: () => (
    <Sidebar.Root>
      <Sidebar.Header>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ChevronRight />
          <span>My Application</span>
        </div>
        <Sidebar.Trigger isOpen={true} />
      </Sidebar.Header>
      <Sidebar.Content>
        <Sidebar.Section title="Main">
          <Sidebar.Item 
            href="#" 
            icon={<Home />}
            title="Home"
            isActive={true}
          />
          <Sidebar.Item 
            href="#" 
            icon={<FileText />}
            title="Documents"
            isActive={false}
          />
        </Sidebar.Section>
        <Sidebar.Section title="Settings">
          <Sidebar.Item 
            href="#" 
            icon={<Settings />}
            title="Settings"
            isActive={false}
          />
        </Sidebar.Section>
      </Sidebar.Content>
      <Sidebar.Footer>
        <div style={{ padding: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px' }}>
          Footer content
        </div>
      </Sidebar.Footer>
      <Sidebar.Rail onResize={() => {}} />
    </Sidebar.Root>
  ),
};

/**
 * Collapsed sidebar with only icons visible
 */
export const Collapsed: Story = {
  render: () => (
    <Sidebar.Root expanded={false}>
      <Sidebar.Header collapsed={true}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ChevronRight />
        </div>
      </Sidebar.Header>
      <Sidebar.Content>
        <Sidebar.Section title="Main">
          <Sidebar.Item 
            href="#" 
            icon={<Home />}
            title="Home"
            isActive={true}
          />
          <Sidebar.Item 
            href="#" 
            icon={<FileText />}
            title="Documents"
            isActive={false}
          />
        </Sidebar.Section>
        <Sidebar.Section title="Settings">
          <Sidebar.Item 
            href="#" 
            icon={<Settings />}
            title="Settings"
            isActive={false}
          />
        </Sidebar.Section>
      </Sidebar.Content>
      <Sidebar.Rail onResize={() => {}} />
    </Sidebar.Root>
  ),
};

/**
 * Mobile view with closed sidebar
 */
export const MobileClosed: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => (
    <Sidebar.Root open={false}>
      <Sidebar.Header>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ChevronRight />
          <span>My Application</span>
        </div>
        <Sidebar.Trigger isOpen={false} />
      </Sidebar.Header>
      <Sidebar.Content>
        <Sidebar.Section title="Main">
          <Sidebar.Item 
            href="#" 
            icon={<Home />}
            title="Home"
            isActive={true}
          />
          <Sidebar.Item 
            href="#" 
            icon={<FileText />}
            title="Documents"
            isActive={false}
          />
        </Sidebar.Section>
      </Sidebar.Content>
    </Sidebar.Root>
  ),
};

/**
 * Mobile view with open sidebar
 */
export const MobileOpen: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => (
    <Sidebar.Root open={true}>
      <Sidebar.Header>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ChevronRight />
          <span>My Application</span>
        </div>
        <Sidebar.Trigger isOpen={true} />
      </Sidebar.Header>
      <Sidebar.Content>
        <Sidebar.Section title="Main">
          <Sidebar.Item 
            href="#" 
            icon={<Home />}
            title="Home"
            isActive={true}
          />
          <Sidebar.Item 
            href="#" 
            icon={<FileText />}
            title="Documents"
            isActive={false}
          />
        </Sidebar.Section>
      </Sidebar.Content>
    </Sidebar.Root>
  ),
};