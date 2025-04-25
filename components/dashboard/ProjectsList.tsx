"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Idea } from "@/lib/types";
import Link from "next/link";

interface ProjectsListProps {
  ideas: Idea[];
  toNumber: (value: any) => number;
  formatDate: (dateString?: string) => string;
}

export const ProjectsList = ({ ideas, toNumber, formatDate }: ProjectsListProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Projects Overview</CardTitle>
    </CardHeader>
    <CardContent>
      {ideas.length > 0 ? (
        <div className="space-y-4">
          {ideas.map(idea => (
            <div key={idea.id.toString()} className="border-b pb-4 last:border-0">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{idea.title}</h3>
                  <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                    <span>Rating: {toNumber(idea.rating)}/10</span>
                    <span>Confidence: {toNumber(idea.confidence)}%</span>
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
                Updated {formatDate(idea.updatedAt)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No projects yet. Create your first project to get started.
        </div>
      )}
    </CardContent>
  </Card>
);