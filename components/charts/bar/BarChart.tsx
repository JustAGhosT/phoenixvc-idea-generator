"use client";

import { BaseChartProps } from "../core/types";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export interface BarChartProps extends BaseChartProps {
  horizontal?: boolean;
  stacked?: boolean;
  maxItems?: number;
}

export function BarChart({
  height = "auto",
  width = "100%",
  title,
  description,
  series,
  colors = ["blue", "green", "purple", "orange", "red"],
  formatter = (value) => value.toString(),
  showLegend = true,
  maxItems = 5,
  className = "",
}: BarChartProps) {
  // Get the first series or return empty if none
  const primarySeries = series[0] || { name: "", data: [] };
  
  // Sort and limit data points
  const sortedData = [...primarySeries.data]
    .sort((a, b) => b.value - a.value)
    .slice(0, maxItems);
  
  // Get color classes
  const getColorClasses = (colorName: string) => {
    switch (colorName) {
      case "blue": return { bg: "bg-blue-100", indicator: "bg-blue-600" };
      case "green": return { bg: "bg-green-100", indicator: "bg-green-600" };
      case "purple": return { bg: "bg-purple-100", indicator: "bg-purple-600" };
      case "orange": return { bg: "bg-orange-100", indicator: "bg-orange-600" };
      case "red": return { bg: "bg-red-100", indicator: "bg-red-600" };
      default: return { bg: "bg-gray-100", indicator: "bg-gray-600" };
    }
  };
  
  const colorClasses = getColorClasses(colors[0]);
  
  return (
    <Card className={className}>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        <div style={{ height, width }} className="flex flex-col justify-center">
          <div className="space-y-4 w-full">
            {sortedData.map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="truncate max-w-[180px]">{item.label}</span>
                  <span>{formatter(item.value)}</span>
                </div>
                <Progress 
                  value={item.value} 
                  max={item.max || 100} 
                  className={colorClasses.bg} 
                  indicatorClassName={colorClasses.indicator} 
                />
                {i < sortedData.length - 1 && <div className="border-b my-2"></div>}
              </div>
            ))}
            
            {sortedData.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No data available
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}