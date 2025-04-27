import type { StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import { ButtonToolbar } from '../ButtonToolbar';
import meta from './ButtonToolbar.stories-meta';

type Story = StoryObj<typeof ButtonToolbar>;

// Different spacing options
export const Spacing: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-2">Extra Small Spacing</h3>
        <ButtonToolbar spacing="xs">
          <ButtonGroup>
            <Button variant="outline">Copy</Button>
            <Button variant="outline">Paste</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="outline">Undo</Button>
            <Button variant="outline">Redo</Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Small Spacing</h3>
        <ButtonToolbar spacing="sm">
          <ButtonGroup>
            <Button variant="outline">Copy</Button>
            <Button variant="outline">Paste</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="outline">Undo</Button>
            <Button variant="outline">Redo</Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Medium Spacing (Default)</h3>
        <ButtonToolbar spacing="md">
          <ButtonGroup>
            <Button variant="outline">Copy</Button>
            <Button variant="outline">Paste</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="outline">Undo</Button>
            <Button variant="outline">Redo</Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Large Spacing</h3>
        <ButtonToolbar spacing="lg">
          <ButtonGroup>
            <Button variant="outline">Copy</Button>
            <Button variant="outline">Paste</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="outline">Undo</Button>
            <Button variant="outline">Redo</Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
    </div>
  )
};