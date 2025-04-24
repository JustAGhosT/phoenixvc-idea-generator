"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { ArrowLeft } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  // Add other project fields as needed
}

export function ProjectDetails({ id }: { id: string }) {
  const { data: session } = useSession();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProject() {
      try {
        setLoading(true);
        const response = await fetch(`/api/projects/${id}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch project: ${response.statusText}`);
        }
        
        const data = await response.json();
        setProject(data);
      } catch (err) {
        console.error("Error fetching project:", err);
        setError(err instanceof Error ? err.message : "Failed to load project");
      } finally {
        setLoading(false);
      }
    }

    if (session) {
      fetchProject();
    }
  }, [id, session]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h2 className="text-xl font-semibold text-red-600">Error</h2>
        <p>{error}</p>
        <Button asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h2 className="text-xl font-semibold">Project Not Found</h2>
        <Button asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Button variant="outline" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{project.name}</CardTitle>
          <CardDescription>
            Created on {new Date(project.createdAt).toLocaleDateString()}
            {project.updatedAt && ` • Last updated on ${new Date(project.updatedAt).toLocaleDateString()}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Description</h3>
              <p className="mt-1">{project.description || "No description provided."}</p>
            </div>
            
            {/* Add more project details as needed */}
            
            <div className="flex gap-4 mt-8">
              <Button>Edit Project</Button>
              <Button variant="outline">Share</Button>
              <Button variant="destructive">Delete</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}