import type { StoryObj } from '@storybook/react';
import { Button } from '../../button/Button';
import { ButtonToolbar } from '../ButtonToolbar';
import { ButtonGroup } from '../../button-group/ButtonGroup';

type Story = StoryObj<typeof ButtonToolbar>;

// Spacing examples
export const Spacing: Story = {
  name: 'Spacing Options',
  render: (args) => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-2">Extra Small Spacing</h3>
        <ButtonToolbar spacing="xs">
          <ButtonGroup>
            <Button variant="outline">Button 1</Button>
            <Button variant="outline">Button 2</Button>
            <Button variant="outline">Button 3</Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Small Spacing</h3>
        <ButtonToolbar spacing="sm">
          <ButtonGroup>
            <Button variant="outline">Button 1</Button>
            <Button variant="outline">Button 2</Button>
            <Button variant="outline">Button 3</Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Medium Spacing (Default)</h3>
        <ButtonToolbar spacing="md">
          <ButtonGroup>
            <Button variant="outline">Button 1</Button>
            <Button variant="outline">Button 2</Button>
            <Button variant="outline">Button 3</Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Large Spacing</h3>
        <ButtonToolbar spacing="lg">
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