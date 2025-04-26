import { QuoteDisplay } from "@/components/common/QuoteDisplay";
import { StatCard } from "@/components/data-display/stat-card"; // Updated to new path
import { ActivityList } from "@/components/dashboard/ActivityList";
import { BarChart } from "@/components/dashboard/BarChart";
import { ProjectsList } from "@/components/dashboard/ProjectsList";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authOptions } from "@/lib/auth";
import { getIdeas } from "@/lib/db";
import { getProjects } from "@/lib/project-db";
import { formatDate } from "@/lib/utils/formatters";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/signin");
  }
  
  // Fetch ideas and projects
  const ideas = await getIdeas();
  const projects = await getProjects();
  
  // Calculate statistics
  const totalIdeas = ideas.length;
  const approvedIdeas = ideas.filter(idea => idea.status === 'approved').length;
  const rejectedIdeas = ideas.filter(idea => idea.status === 'rejected').length;
  const activeProjects = projects.filter(project => project.status === 'active').length;
  
  // Helper function to convert string to number
  const toNumber = (value: string | number): number => {
    if (typeof value === 'number') return value;
    return parseFloat(value) || 0;
  };
  
  // Calculate average confidence and rating
  const avgConfidence = ideas.length > 0
    ? ideas.reduce((sum, idea) => sum + toNumber(idea.confidence), 0) / ideas.length
    : 0;

  const avgRating = ideas.length > 0
    ? ideas.reduce((sum, idea) => sum + toNumber(idea.rating), 0) / ideas.length
    : 0;
    return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
              <StatCard 
                title="Total Ideas" 
          value={totalIdeas} 
          description="Ideas in your portfolio" 
          icon="lightbulb"
          variant="primary"
              />
              <StatCard 
          title="Approved Ideas" 
          value={approvedIdeas} 
          description="Ideas marked as approved" 
          icon="check"
          variant="success"
              />
              <StatCard 
          title="Active Projects" 
          value={activeProjects} 
          description="Projects in progress" 
          icon="rocket"
          variant="info"
              />
        <StatCard 
          title="Avg. Confidence" 
          value={`${avgConfidence.toFixed(1)}%`} 
          description="Average idea confidence" 
          icon="chart"
          variant="primary"
          trend={{
            value: 5.2,
            label: "vs last month",
            direction: "up",
            isGood: true
          }}
        />
          </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <ActivityList 
            ideas={ideas} 
          projects={projects}
          formatDate={formatDate} 
          />
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Idea Performance</CardTitle>
            <CardDescription>
              Confidence vs. Rating for your ideas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart 
              ideas={ideas} 
              toNumber={toNumber}
            />
          </CardContent>
        </Card>
                    </div>
      
      <div className="mb-6">
        <QuoteDisplay />
                    </div>
      
      <Tabs defaultValue="ideas" className="mb-6">
        <TabsList>
          <TabsTrigger value="ideas">Ideas</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>
        <TabsContent value="ideas">
          <ProjectsList 
            ideas={ideas} 
            toNumber={toNumber} 
            formatDate={formatDate}
          />
        </TabsContent>
        <TabsContent value="projects">
          <div className="rounded-md border">
            <div className="p-4">
              <h2 className="text-xl font-semibold">Active Projects</h2>
    </div>
            <div className="divide-y">
              {projects.length > 0 ? (
                projects.map((project, index) => (
                  <div key={index} className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <Link href={`/projects/${project.id}`}>
                        <h3 className="font-medium hover:underline">{project.name}</h3>
                      </Link>
                      <Badge variant={
                        project.status === 'active' ? 'success' :
                        project.status === 'planning' ? 'default' :
                        project.status === 'on-hold' ? 'warning' :
                        project.status === 'completed' ? 'secondary' : 'destructive'
                      }>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Created: {formatDate(project.createdAt)}</span>
                      {project.targetCompletionDate && (
                        <span>Target: {formatDate(project.targetCompletionDate)}</span>
                      )}
                      {project.budget && (
                        <span>Budget: {project.budget}</span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  No projects available
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}