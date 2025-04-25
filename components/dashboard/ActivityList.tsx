"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "@/lib/project-db";
import type { Idea } from "@/lib/types";
import Link from "next/link";

interface ActivityListProps {
  ideas: Idea[];
  projects?: Project[];
  formatDate: (date: string | Date | undefined) => string;
}

export function ActivityList({ ideas, projects = [], formatDate }: ActivityListProps) {
  // Get the status badge variant
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

  // Get the project status badge variant
  const getProjectStatusVariant = (status: string) => {
    switch (status) {
      case 'planning': return 'default';
      case 'active': return 'success';
      case 'on-hold': return 'warning';
      case 'completed': return 'secondary';
      case 'cancelled': return 'destructive';
      default: return 'default';
    }
  };

  // Combine and sort activities by date
  const activities = [
    ...ideas.map(idea => ({
      type: 'idea' as const,
      id: idea.id,
      title: idea.title,
      status: idea.status || 'updated',
      date: idea.status === 'created' ? idea.createdAt : (idea.updatedAt || idea.createdAt),
    })),
    ...projects.map(project => ({
      type: 'project' as const,
      id: project.id,
      title: project.name,
      status: project.status,
      date: project.createdAt,
      ideaId: project.ideaId,
    })),
  ].sort((a, b) => {
    const dateA = new Date(a.date || 0).getTime();
    const dateB = new Date(b.date || 0).getTime();
    return dateB - dateA; // Sort by most recent first
  }).slice(0, 5); // Take only the 5 most recent activities

  return (
    <Card>
    <CardHeader>
      <CardTitle>Recent Activity</CardTitle>
    </CardHeader>
    <CardContent>
        <ul className="space-y-2">
          {activities.length > 0 ? (
            activities.map((activity, index) => (
              <li key={index} className="text-sm flex items-center justify-between">
                <div>
                  {activity.type === 'idea' ? (
                    <>
                      <Link href={`/ideas/${activity.id}`} className="font-medium hover:underline">
                        {activity.title}
                      </Link>{' '}
                      was <span className="capitalize">{activity.status}</span> on{' '}
                      {formatDate(activity.date)}
                    </>
                  ) : (
                    <>
                      Project{' '}
                      <Link href={`/projects/${activity.id}`} className="font-medium hover:underline">
                        {activity.title}
                      </Link>{' '}
                      was created from{' '}
                      <Link href={`/ideas/${activity.ideaId}`} className="hover:underline">
                        idea
                      </Link>{' '}
                      on {formatDate(activity.date)}
                    </>
                  )}
                </div>
                <Badge 
                  variant={
                    activity.type === 'idea' 
                      ? getStatusVariant(activity.status) 
                      : getProjectStatusVariant(activity.status)
                  }
                >
                  {activity.type === 'idea' ? activity.status : `Project: ${activity.status}`}
                </Badge>
              </li>
            ))
          ) : (
            <li className="text-sm text-muted-foreground">No recent activity</li>
          )}
        </ul>
    </CardContent>
  </Card>
);
}