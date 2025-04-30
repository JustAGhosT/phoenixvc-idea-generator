import type { StoryObj } from '@storybook/react';
import { ButtonGroup } from '../../button-group/ButtonGroup';
import { Button } from '../../button/Button';
import { ButtonToolbar } from '../ButtonToolbar';

type Story = StoryObj<typeof ButtonToolbar>;

// Alignment examples
export const Alignment: Story = {
  name: 'Alignment Options',
  render: (args) => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-2">Left Alignment (Default)</h3>
        <ButtonToolbar align="left" className="border p-4 w-full">
          <ButtonGroup>
            <Button variant="outline">Button 1</Button>
            <Button variant="outline">Button 2</Button>
            <Button variant="outline">Button 3</Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Center Alignment</h3>
        <ButtonToolbar align="center" className="border p-4 w-full">
          <ButtonGroup>
            <Button variant="outline">Button 1</Button>
            <Button variant="outline">Button 2</Button>
            <Button variant="outline">Button 3</Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Right Alignment</h3>
        <ButtonToolbar align="right" className="border p-4 w-full">
          <ButtonGroup>
            <Button variant="outline">Button 1</Button>
            <Button variant="outline">Button 2</Button>
            <Button variant="outline">Button 3</Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Space Between</h3>
        <ButtonToolbar align="space-between" className="border p-4 w-full">
          <ButtonGroup>
            <Button variant="outline">Button 1</Button>
            <Button variant="outline">Button 2</Button>
            <Button variant="outline">Button 3</Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
    </div>
  )
};