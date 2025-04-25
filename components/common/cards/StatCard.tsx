"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  CheckCircle, 
  Lightbulb, 
  Rocket,
  PieChart,
  TrendingUp,
  Users,
  Activity,
  LucideIcon
} from "lucide-react";

export interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon?: string | React.ReactNode;
  trend?: {
    value: number;
    label: string;
    direction: "up" | "down" | "neutral";
  };
  className?: string;
}

export function StatCard({ 
  title, 
  value, 
  description, 
  icon, 
  trend,
  className = ""
}: StatCardProps) {
  const getIcon = () => {
    if (React.isValidElement(icon)) {
      return icon;
    }
    
    switch (icon as string) {
      case "lightbulb":
        return <Lightbulb className="h-5 w-5 text-primary" />;
      case "check":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "rocket":
        return <Rocket className="h-5 w-5 text-blue-500" />;
      case "chart":
        return <BarChart className="h-5 w-5 text-purple-500" />;
      case "users":
        return <Users className="h-5 w-5 text-orange-500" />;
      case "trending":
        return <TrendingUp className="h-5 w-5 text-cyan-500" />;
      case "activity":
        return <Activity className="h-5 w-5 text-yellow-500" />;
      case "pie":
        return <PieChart className="h-5 w-5 text-pink-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && getIcon()}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
        {trend && (
          <div className={`flex items-center mt-2 text-xs ${
            trend.direction === "up" ? "text-green-500" : 
            trend.direction === "down" ? "text-red-500" : "text-gray-500"
          }`}>
            {trend.direction === "up" ? "↑" : trend.direction === "down" ? "↓" : "→"}
            <span className="ml-1">{trend.value}% {trend.label}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}