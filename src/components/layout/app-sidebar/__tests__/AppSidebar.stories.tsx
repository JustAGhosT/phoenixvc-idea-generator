import type { Meta, StoryObj } from '@storybook/react';
import { AppSidebar } from '../AppSidebar';
import { SidebarProvider } from '@/contexts/sidebar-context';

const meta: Meta<typeof AppSidebar> = {
  title: 'Layout/AppSidebar',
  component: AppSidebar,
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
type Story = StoryObj<typeof AppSidebar>;

/**
 * Default expanded sidebar
 */
export const Expanded: Story = {
  decorators: [
    (Story) => (
      <SidebarProvider initialOpen={true}>
        <div style={{ height: '100vh' }}>
          <Story />
        </div>
      </SidebarProvider>
    ),
  ],
};

/**
 * Collapsed sidebar
 */
export const Collapsed: Story = {
  decorators: [
    (Story) => (
      <SidebarProvider initialOpen={false}>
        <div style={{ height: '100vh' }}>
          <Story />
        </div>
      </SidebarProvider>
    ),
  ],
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
  decorators: [
    (Story) => (
      <SidebarProvider initialOpen={false}>
        <div style={{ height: '100vh' }}>
          <Story />
        </div>
      </SidebarProvider>
    ),
  ],
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
  decorators: [
    (Story) => (
      <SidebarProvider initialOpen={true}>
        <div style={{ height: '100vh' }}>
          <Story />
        </div>
      </SidebarProvider>
    ),
  ],
};