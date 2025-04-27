import type { StoryObj } from '@storybook/react';
import { Button } from '../../button/Button';
import { ButtonToolbar } from '../../button/ButtonToolbar';
import { ButtonGroup } from '../ButtonGroup';

type Story = StoryObj<typeof ButtonToolbar>;

// Full width and responsive examples
export const FullWidthAndResponsive: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-2">Full Width</h3>
        <ButtonToolbar fullWidth className="border p-4">
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
        <h3 className="text-sm font-medium mb-2">Responsive (resize browser to see)</h3>
        <ButtonToolbar responsive className="border p-4">
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
        <h3 className="text-sm font-medium mb-2">Full Width & Responsive</h3>
        <ButtonToolbar fullWidth responsive className="border p-4">
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