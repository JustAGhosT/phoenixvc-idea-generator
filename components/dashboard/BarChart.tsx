"use client";

import { Progress } from "@/components/ui/progress";
import type { Idea } from "@/lib/types";

export interface ChartDataItem {
  name: string;
  value: number;
  [key: string]: any;
}

export interface BarChartProps {
  ideas: Idea[];
  toNumber: (value: string | number) => number;
}

export function BarChart({ ideas, toNumber }: BarChartProps) {
  // Transform ideas data for visualization
  const chartData = ideas
    .filter(idea => idea.title && (idea.confidence || idea.rating))
    .map(idea => ({
      name: idea.title,
      confidence: toNumber(idea.confidence),
      rating: toNumber(idea.rating)
    }))
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 5); // Show top 5 by confidence

  return (
    <div className="h-full flex flex-col justify-center">
    <div className="space-y-4 w-full">
        {chartData.map((item, i) => (
          <div key={i} className="space-y-3">
          <div className="flex justify-between text-sm">
              <span className="truncate max-w-[180px]">{item.name}</span>
              <span>{item.confidence.toFixed(1)}%</span>
          </div>
          <Progress 
              value={item.confidence} 
              max={100} 
              className="bg-blue-100" 
              indicatorClassName="bg-blue-600" 
          />
            
            <div className="flex justify-between text-sm mt-2">
              <span>Rating</span>
              <span>{item.rating.toFixed(1)}/10</span>
        </div>
            <Progress 
              value={item.rating} 
              max={10} 
              className="bg-green-100" 
              indicatorClassName="bg-green-600" 
            />
            
            {i < chartData.length - 1 && <div className="border-b my-2"></div>}
    </div>
        ))}
        
        {chartData.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No data available
  </div>
        )}
      </div>
    </div>
);
}