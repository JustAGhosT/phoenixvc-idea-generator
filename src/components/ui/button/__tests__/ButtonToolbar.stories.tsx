import type { Meta, StoryObj } from '@storybook/react';
import { ButtonToolbar } from '../ButtonToolbar';
import meta from './ButtonToolbar.stories-meta';

// Import all stories from individual files
import { Default } from './ButtonToolbar.stories-default';
import { Spacing } from './ButtonToolbar.stories-spacing';
import { Alignment } from './ButtonToolbar.stories-alignment';
import { FullWidthAndResponsive } from './ButtonToolbar.stories-responsive';
import { TextEditorToolbar, PaginationExample } from './ButtonToolbar.stories-realworld';

// Re-export the meta
export default meta;

// Re-export all stories
export {
  Default,
  Spacing,
  Alignment,
  FullWidthAndResponsive,
  TextEditorToolbar,
  PaginationExample
};