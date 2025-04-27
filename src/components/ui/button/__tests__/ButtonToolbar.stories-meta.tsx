import type { Meta } from '@storybook/react';
import { ButtonToolbar } from '../ButtonToolbar';

const meta: Meta<typeof ButtonToolbar> = {
  title: 'UI/Button/ButtonToolbar',
  component: ButtonToolbar,
  tags: ['autodocs'],
  argTypes: {
    fullWidth: {
      control: 'boolean',
      description: 'Whether the toolbar should take up the full width of its container'
    },
    spacing: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'The spacing between button groups'
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'space-between'],
      description: 'The alignment of the button groups'
    },
    responsive: {
      control: 'boolean',
      description: 'Whether to stack the button groups vertically on small screens'
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'ButtonToolbar component for grouping multiple ButtonGroups together.'
      }
    }
  }
};

export default meta;