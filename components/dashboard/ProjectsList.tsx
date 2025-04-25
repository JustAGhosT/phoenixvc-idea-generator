"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Idea } from "@/lib/types";
import { formatDate, toNumber } from "@/lib/utils/formatters";
import Link from "next/link";

interface ProjectsListProps {
  ideas: Idea[];
  toNumber: typeof toNumber;
  formatDate: typeof formatDate;
}

export const ProjectsList = ({ ideas, toNumber, formatDate }: ProjectsListProps) => {
  // Function to get badge variant based on status
  const getStatusVariant = (status: string | undefined) => {
    switch (status) {
      case 'created': return 'default';
      case 'updated': return 'secondary';
      case 'reviewed': return 'outline';
      case 'approved': return 'success';
      case 'rejected': return 'destructive';
      default: return 'default';
    }
  };

  return (
    <Card>
    <CardHeader>
        <CardTitle>Projects</CardTitle>
    </CardHeader>
    <CardContent>
      {ideas.length > 0 ? (
        <div className="space-y-4">
            {ideas.map((idea, index) => (
              <div key={index} className="border-b pb-4 last:border-0">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{idea.title}</h3>
                  <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                      <span>Rating: {toNumber(idea.rating).toFixed(1)}/10</span>
                      <span>Confidence: {toNumber(idea.confidence).toFixed(1)}%</span>
                      <Badge variant={getStatusVariant(idea.status)}>
                        {idea.status ? (idea.status.charAt(0).toUpperCase() + idea.status.slice(1)) : 'Updated'}
                      </Badge>
                </div>
                  </div>
                  <Link 
                    href={`/editor/${idea.id}`}
                    className="text-sm text-primary hover:underline"
                  >
                    Edit
                  </Link>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Created {formatDate(idea.createdAt)}
                </p>
        </div>
            ))}
        </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No projects available
          </div>
        )}
    </CardContent>
  </Card>
);
};