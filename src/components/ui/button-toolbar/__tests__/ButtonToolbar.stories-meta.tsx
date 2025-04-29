import type { Meta } from '@storybook/react';
import { ButtonToolbar } from '../ButtonToolbar';

const meta: Meta<typeof ButtonToolbar> = {
  title: 'UI/ButtonToolbar',
  component: ButtonToolbar,
  argTypes: {
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'space-between'],
      description: 'Alignment of button groups within the toolbar'
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the toolbar should take up the full width of its container'
    },
    spacing: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Spacing between button groups'
    },
    vertical: {
      control: 'boolean',
      description: 'Whether the toolbar should be stacked vertically'
    },
    responsive: {
      control: 'boolean',
      description: 'Whether the toolbar should stack vertically on small screens'
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names'
    }
  }
};

export default meta;