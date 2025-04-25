import { getProject } from "@/lib/project-db";
import { getIdea } from "@/lib/db";
import { formatDate } from "@/lib/utils/formatters";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { ArrowLeft, Calendar, DollarSign, Clock, Lightbulb } from "lucide-react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/signin");
  }
  
  // Fetch project
  const project = await getProject(params.id);
  
  if (!project) {
    return (
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Project Not Found</h1>
        <p>The requested project could not be found.</p>
        <Link href="/projects">
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
          </Button>
        </Link>
      </div>
    );
}
  
  // Fetch original idea if available
  let idea = null;
  if (project.ideaId) {
    try {
      idea = await getIdea(project.ideaId);
    } catch (error) {
      console.error("Error fetching idea:", error);
    }
  }
  
  // Helper function to get status badge variant
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'planning': return 'default';
      case 'active': return 'success';
      case 'on-hold': return 'warning';
      case 'completed': return 'secondary';
      case 'cancelled': return 'destructive';
      default: return 'default';
    }
  };
  
  return (
    <div className="container py-8">
      <div className="mb-6">
        <Link href="/projects">
          <Button variant="ghost" className="mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
          </Button>
        </Link>
        
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">{project.name}</h1>
            <p className="text-muted-foreground">
              Created on {formatDate(project.createdAt)}
              {project.updatedAt && project.updatedAt !== project.createdAt && 
                ` • Updated on ${formatDate(project.updatedAt)}`
              }
            </p>
          </div>
          <Badge variant={getStatusVariant(project.status)} className="text-sm">
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </Badge>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {project.startDate && (
          <Card></Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-primary mr-2" />
                <div>
                  <p className="text-sm font-medium">Start Date</p>
                  <p className="text-lg">{formatDate(project.startDate)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {project.targetCompletionDate && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-primary mr-2" />
                <div>
                  <p className="text-sm font-medium">Target Completion</p>
                  <p className="text-lg">{formatDate(project.targetCompletionDate)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {project.budget && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-primary mr-2" />
                <div>
                  <p className="text-sm font-medium">Budget</p>
                  <p className="text-lg">{project.budget}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      {project.description && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{project.description}</p>
          </CardContent>
        </Card>
      )}
      
      {idea && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Original Idea</CardTitle>
            <CardDescription>
              This project was created from an idea
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium text-lg">{idea.title}</h3>
                <p className="text-sm text-muted-foreground">
                  Created on {formatDate(idea.createdAt)}
                </p>
              </div>
              <Link href={`/ideas/${idea.id}`}>
                <Button variant="outline" size="sm">
                  <Lightbulb className="mr-2 h-4 w-4" /> View Idea
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Rating</p>
                <p>{idea.rating}/10</p>
              </div>
              <div>
                <p className="font-medium">Confidence</p>
                <p>{idea.confidence}%</p>
              </div>
              <div>
                <p className="font-medium">Key Differentiator</p>
                <p>{idea.keyDifferentiator || "None specified"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Tabs defaultValue="details" className="mb-6">
        <TabsList>
          <TabsTrigger value="details">Project Details</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Project Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Project details form would go here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analysis">
          <Card>
            <CardHeader>
              <CardTitle>Project Analysis</CardTitle>
              <CardDescription>
                Analysis data imported from the original idea
              </CardDescription>
            </CardHeader>
            <CardContent>
              {project.projectAnalysis ? (
                <div className="space-y-6">
                  {/* Render analysis data here */}
                  <div></div>
                    <h3 className="font-medium mb-2">SWOT Analysis</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium mb-1">Strengths</h4>
                        <ul className="list-disc pl-5 text-sm">
                          {project.projectAnalysis.swot?.strengths?.map((item: string, i: number) => (
                            <li key={i}>{item}</li>
                          )) || <li>No data</li>}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Weaknesses</h4>
                        <ul className="list-disc pl-5 text-sm">
                          {project.projectAnalysis.swot?.weaknesses?.map((item: string, i: number) => (
                            <li key={i}>{item}</li>
                          )) || <li>No data</li>}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Opportunities</h4>
                        <ul className="list-disc pl-5 text-sm">
                          {project.projectAnalysis.swot?.opportunities?.map((item: string, i: number) => (
                            <li key={i}>{item}</li>
                          )) || <li>No data</li>}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Threats</h4>
                        <ul className="list-disc pl-5 text-sm">
                          {project.projectAnalysis.swot?.threats?.map((item: string, i: number) => (
                            <li key={i}>{item}</li>
                          )) || <li>No data</li>}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  {/* Add more analysis sections as needed */}
                </div>
              ) : (
                <p className="text-center py-4 text-muted-foreground">
                  No analysis data available for this project
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>Project Tasks</CardTitle>
              <CardDescription>
                Manage tasks and milestones for this project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Project tasks would go here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}