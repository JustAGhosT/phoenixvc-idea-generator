"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Idea } from "@/lib/types";

interface ActivityListProps {
  ideas: Idea[];
  formatDate: (dateString?: string) => string;
}

export const ActivityList = ({ ideas, formatDate }: ActivityListProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Recent Activity</CardTitle>
    </CardHeader>
    <CardContent>
      {ideas.length > 0 ? (
        <div className="space-y-4">
          {ideas
            .sort((a, b) => {
              const dateA = a.updatedAt ? new Date(a.updatedAt) : new Date(0);
              const dateB = b.updatedAt ? new Date(b.updatedAt) : new Date(0);
              return dateB.getTime() - dateA.getTime();
            })
            .slice(0, 5)
            .map(idea => (
              <div key={`activity-${idea.id}`} className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <div>
                  <p className="text-sm">
                    Updated <span className="font-medium">{idea.title}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(idea.updatedAt)}
                  </p>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No recent activity
        </div>
      )}
    </CardContent>
  </Card>
);