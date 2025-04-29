import type { StoryObj } from '@storybook/react';
import { Button } from '../../button/Button';
import { ButtonToolbar } from '../ButtonToolbar';
import { ButtonGroup } from '../../button-group/ButtonGroup';

type Story = StoryObj<typeof ButtonToolbar>;

// Basic example
export const Default: Story = {
  render: () => (
    <ButtonToolbar>
      <ButtonGroup>
        <Button variant="outline">Copy</Button>
        <Button variant="outline">Paste</Button>
        <Button variant="outline">Cut</Button>
      </ButtonGroup>
      
      <ButtonGroup>
        <Button variant="outline">Undo</Button>
        <Button variant="outline">Redo</Button>
      </ButtonGroup>
    </ButtonToolbar>
  )
};