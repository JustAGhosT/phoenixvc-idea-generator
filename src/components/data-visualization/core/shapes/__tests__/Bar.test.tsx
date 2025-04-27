import { fireEvent, render } from '@testing-library/react';
import { Bar } from '../Bar';

describe('Bar', () => {
  it('renders with basic props', () => {
    const { container } = render(
      <svg>
        <Bar x={10} y={20} width={100} height={50} />
      </svg>
    );
    
    const bar = container.querySelector('rect');
    expect(bar).toBeInTheDocument();
    expect(bar).toHaveAttribute('x', '10');
    expect(bar).toHaveAttribute('y', '20');
    expect(bar).toHaveAttribute('width', '100');
    expect(bar).toHaveAttribute('height', '50');
  });

  it('applies custom fill color', () => {
    const { container } = render(
      <svg>
        <Bar x={10} y={20} width={100} height={50} fill="#ff0000" />
      </svg>
    );
    
    const bar = container.querySelector('rect');
    expect(bar).toHaveAttribute('fill', '#ff0000');
  });

  it('applies border radius when specified', () => {
    const { container } = render(
      <svg>
        <Bar x={10} y={20} width={100} height={50} radius={5} />
      </svg>
    );
    
    const bar = container.querySelector('rect');
    expect(bar).toHaveAttribute('rx', '5');
    expect(bar).toHaveAttribute('ry', '5');
  });

  it('limits radius to half of width or height', () => {
    const { container } = render(
      <svg>
        <Bar x={10} y={20} width={20} height={10} radius={20} />
      </svg>
    );
    
    // Radius should be limited to 5 (half of height)
    const bar = container.querySelector('rect');
    expect(bar).toHaveAttribute('rx', '5');
    expect(bar).toHaveAttribute('ry', '5');
  });

  it('applies gradient when useGradient and gradientId are provided', () => {
    const { container } = render(
      <svg>
        <defs>
          <linearGradient id="testGradient">
            <stop offset="0%" stopColor="#ff0000" />
            <stop offset="100%" stopColor="#0000ff" />
          </linearGradient>
        </defs>
        <Bar 
          x={10} 
          y={20} 
          width={100} 
          height={50} 
          useGradient={true} 
          gradientId="testGradient" 
        />
      </svg>
    );
    
    const bar = container.querySelector('rect');
    expect(bar).toHaveAttribute('fill', 'url(#testGradient)');
  });

  it('applies data attributes', () => {
    const { container } = render(
      <svg>
        <Bar 
          x={10} 
          y={20} 
          width={100} 
          height={50} 
          dataAttributes={{ 
            label: 'Test Bar', 
            value: '75',
            category: 'Test Category'
          }} 
        />
      </svg>
    );
    
    const bar = container.querySelector('rect');
    expect(bar).toHaveAttribute('data-label', 'Test Bar');
    expect(bar).toHaveAttribute('data-value', '75');
    expect(bar).toHaveAttribute('data-category', 'Test Category');
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    const { container } = render(
      <svg>
        <Bar 
          x={10} 
          y={20} 
          width={100} 
          height={50} 
          onClick={handleClick} 
        />
      </svg>
    );
    
    const bar = container.querySelector('rect');
    fireEvent.click(bar as Element);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('calls onMouseEnter when mouse enters', () => {
    const handleMouseEnter = jest.fn();
    const { container } = render(
      <svg>
        <Bar 
          x={10} 
          y={20} 
          width={100} 
          height={50} 
          onMouseEnter={handleMouseEnter} 
        />
      </svg>
    );
    
    const bar = container.querySelector('rect');
    fireEvent.mouseEnter(bar as Element);
    expect(handleMouseEnter).toHaveBeenCalledTimes(1);
  });

  it('calls onMouseLeave when mouse leaves', () => {
    const handleMouseLeave = jest.fn();
    const { container } = render(
      <svg>
        <Bar 
          x={10} 
          y={20} 
          width={100} 
          height={50} 
          onMouseLeave={handleMouseLeave} 
        />
      </svg>
    );
    
    const bar = container.querySelector('rect');
    fireEvent.mouseLeave(bar as Element);
    expect(handleMouseLeave).toHaveBeenCalledTimes(1);
  });
});