"use client";

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  indicatorClassName?: string;
}

export const Progress = ({ value, max = 100, className = "", indicatorClassName = "" }: ProgressProps) => (
  <div className={`h-2 w-full bg-muted rounded-full ${className}`}>
    <div 
      className={`h-full rounded-full ${indicatorClassName || "bg-primary"}`} 
      style={{ width: `${(value / max) * 100}%` }}
    ></div>
  </div>
);