import { Meta } from '@storybook/react';
import { ButtonToolbar } from '../ButtonToolbar';

const meta: Meta<typeof ButtonToolbar> = {
  title: 'UI/ButtonToolbar',
  component: ButtonToolbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
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
      description: 'Whether to stack the button groups vertically on small screens'
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'space-between'],
      description: 'Alignment of the button groups'
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the toolbar should take up the full width of its container'
    }
  }
};

export default meta;