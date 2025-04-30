import { Meta } from '@storybook/react';
import { ButtonToolbar } from '../ButtonToolbar';

// Define the meta directly in this file
const meta: Meta<typeof ButtonToolbar> = {
  title: 'UI/ButtonToolbar',
  component: ButtonToolbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

// Import all stories from individual files
import { Alignment } from './ButtonToolbar.stories-alignment';
import { Default } from './ButtonToolbar.stories-default';
import { PaginationExample, TextEditorToolbar } from './ButtonToolbar.stories-realworld';
import { FullWidthAndResponsive } from './ButtonToolbar.stories-responsive';
import { Spacing } from './ButtonToolbar.stories-spacing';

// Export the meta as default
export default meta;

// Re-export all stories
export {
  Alignment, Default, FullWidthAndResponsive, PaginationExample, Spacing, TextEditorToolbar
};
