"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Activity,
  BarChart,
  CheckCircle,
  Lightbulb,
  PieChart,
  Rocket,
  TrendingUp,
  Users
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon?: string;
}

export const StatCard = ({ title, value, description, icon }: StatCardProps) => {
  const getIcon = () => {
    switch (icon) {
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
    <Card>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && getIcon()}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">
        {description}
      </p>
    </CardContent>
  </Card>
);
};