import type { StoryObj } from '@storybook/react';
import { Button } from '../../button/Button';
import { ButtonToolbar } from '../ButtonToolbar';
import { ButtonGroup } from '../../button-group/ButtonGroup';

export type ResponsiveStory = StoryObj<typeof ButtonToolbar>;

// Responsive examples
export const FullWidthAndResponsive: ResponsiveStory = {
  name: 'Full Width & Responsive',
  args: {
    fullWidth: true,
    responsive: true,
    children: (
      <>
        <Button fullWidth>Full Width</Button>
        <Button fullWidth>Responsive</Button>
        <Button fullWidth>Buttons</Button>
      </>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'This toolbar is set to full width and will stack vertically on small screens.'
      }
    }
  }
};

export const VerticalLayout: ResponsiveStory = {
  name: 'Vertical Layout',
  args: {
    vertical: true,
    children: (
      <>
        <Button>First Button</Button>
        <Button>Second Button</Button>
        <Button>Third Button</Button>
      </>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'This toolbar is set to vertical layout, stacking buttons vertically regardless of screen size.'
      }
    }
  }
};