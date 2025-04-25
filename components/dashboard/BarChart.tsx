"use client";

import { Progress } from "@/components/ui/progress";

export interface ChartDataItem {
  name: string;
  value: number;
  [key: string]: any;
}

export interface BarChartProps {
  data: ChartDataItem[];
  index: string;
  categories: string[];
  colors: string[];
  valueFormatter: (value: number) => string;
  yAxisWidth: number;
}

export const BarChart = ({ data, index, categories, colors, valueFormatter, yAxisWidth }: BarChartProps) => (
  <div className="h-full flex items-center justify-center">
    <div className="space-y-4 w-full">
      {data.map((item, i) => (
        <div key={i} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="truncate max-w-[180px]">{item[index]}</span>
            <span>{valueFormatter(item[categories[0]])}</span>
          </div>
          <Progress 
            value={item[categories[0]]} 
            max={categories[0] === "value" && valueFormatter(100) === "100%" ? 100 : 10} 
            className={colors[0] === "blue" ? "bg-blue-100" : "bg-green-100"} 
            indicatorClassName={colors[0] === "blue" ? "bg-blue-600" : "bg-green-600"} 
          />
        </div>
      ))}
    </div>
  </div>
);