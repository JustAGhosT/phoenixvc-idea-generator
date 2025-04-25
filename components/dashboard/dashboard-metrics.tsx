import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardMetricsProps {
  totalIdeas: number;
  averageConfidence: number;
  averageRating: number;
}

export function DashboardMetrics({ totalIdeas, averageConfidence, averageRating }: DashboardMetricsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Ideas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalIdeas}</div>
          <p className="text-xs text-muted-foreground">
            Number of project ideas analyzed
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Confidence</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageConfidence.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">
            Across all project ideas
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageRating.toFixed(1)}/10</div>
          <p className="text-xs text-muted-foreground">
            Across all project ideas
          </p>
        </CardContent>
      </Card>
    </div>
  );
}