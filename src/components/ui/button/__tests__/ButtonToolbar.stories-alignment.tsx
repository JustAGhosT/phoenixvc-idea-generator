import type { StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import { ButtonToolbar } from '../ButtonToolbar';
import meta from './ButtonToolbar.stories-meta';

type Story = StoryObj<typeof ButtonToolbar>;

// Different alignment options
export const Alignment: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-2">Left Alignment (Default)</h3>
        <ButtonToolbar align="left" className="border p-4 w-full">
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
        <h3 className="text-sm font-medium mb-2">Center Alignment</h3>
        <ButtonToolbar align="center" className="border p-4 w-full">
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
        <h3 className="text-sm font-medium mb-2">Right Alignment</h3>
        <ButtonToolbar align="right" className="border p-4 w-full">
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
        <h3 className="text-sm font-medium mb-2">Space Between</h3>
        <ButtonToolbar align="space-between" className="border p-4 w-full">
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