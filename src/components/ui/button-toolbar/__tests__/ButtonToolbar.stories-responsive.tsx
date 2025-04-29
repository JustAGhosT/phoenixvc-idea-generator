import type { StoryObj } from '@storybook/react';
import { Button } from '../../button/Button';
import { ButtonToolbar } from '../ButtonToolbar';
import { ButtonGroup } from '../../button-group/ButtonGroup';

type Story = StoryObj<typeof ButtonToolbar>;

// Responsive examples
export const Responsive: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-2">Full Width</h3>
        <ButtonToolbar fullWidth className="border p-4">
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
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Responsive (Stacks on Mobile)</h3>
        <ButtonToolbar responsive className="border p-4">
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
        <p className="text-sm text-gray-500 mt-2">Resize the window to see the responsive behavior</p>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Vertical</h3>
        <ButtonToolbar vertical className="border p-4">
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
      </div>
    </div>
  )
};