"use client";

import { ConvertToProjectForm } from "@/components/ideas/ConvertToProjectForm";
import { IdeaChanges } from "@/components/ideas/IdeaChanges";
import { IdeaForm } from "@/components/ideas/IdeaForm";
import { StatusControl } from "@/components/ideas/StatusControl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { ChangeRecord, Idea, IdeaStatus } from "@/lib/types";
import { formatDate } from "@/lib/utils/formatters";
import { ArrowLeft, BarChart, FileText, History, Share, Star, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function IdeaDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [idea, setIdea] = useState<Idea | null>(null);
  const [changes, setChanges] = useState<ChangeRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [convertDialogOpen, setConvertDialogOpen] = useState(false);
  
  useEffect(() => {
    const fetchIdeaAndChanges = async () => {
      try {
        setIsLoading(true);
        
        // Fetch idea details
        const ideaResponse = await fetch(`/api/ideas/${params.id}`);
        if (!ideaResponse.ok) throw new Error("Failed to fetch idea");
        const ideaData = await ideaResponse.json();
        
        // Fetch change history
        const changesResponse = await fetch(`/api/ideas/${params.id}/changes`);
        if (!changesResponse.ok) throw new Error("Failed to fetch changes");
        const changesData = await changesResponse.json();
        
        setIdea(ideaData);
        setChanges(changesData);
      } catch (error) {
        console.error("Error loading idea details:", error);
        toast({
          title: "Error",
          description: "Failed to load idea details",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchIdeaAndChanges();
  }, [params.id]);
  
  const handleUpdateIdea = async (data: Partial<Idea>) => {
    if (!idea) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/ideas/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error("Failed to update idea");
      
      const updatedIdea = await response.json();
      setIdea(updatedIdea);
      
      toast({
        title: "Idea updated",
        description: "Your idea has been updated successfully.",
      });
      
      // Refresh changes
      const changesResponse = await fetch(`/api/ideas/${params.id}/changes`);
      const changesData = await changesResponse.json();
      setChanges(changesData);
      
    } catch (error) {
      console.error("Error updating idea:", error);
      toast({
        title: "Error",
        description: "Failed to update idea. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleStatusChange = async (status: IdeaStatus) => {
    try {
      const response = await fetch(`/api/ideas/${params.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      
      if (!response.ok) throw new Error("Failed to update status");
      
      const updatedIdea = await response.json();
      setIdea(updatedIdea);
      
      toast({
        title: "Status updated",
        description: `Idea status changed to ${status}.`,
      });
      
      // Refresh changes
      const changesResponse = await fetch(`/api/ideas/${params.id}/changes`);
      const changesData = await changesResponse.json();
      setChanges(changesData);
      
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Error",
        description: "Failed to update status. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleDeleteIdea = async () => {
    if (!confirm("Are you sure you want to delete this idea? This action cannot be undone.")) {
      return;
    }
    
    try {
      const response = await fetch(`/api/ideas/${params.id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) throw new Error("Failed to delete idea");
      
      toast({
        title: "Idea deleted",
        description: "The idea has been deleted successfully.",
      });
      
      router.push("/dashboard");
    } catch (error) {
      console.error("Error deleting idea:", error);
      toast({
        title: "Error",
        description: "Failed to delete idea. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleConvertToProject = async (projectData: any) => {
    if (!idea) return;
    
    try {
      const response = await fetch(`/api/ideas/${params.id}/convert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });
      
      if (!response.ok) throw new Error("Failed to convert idea to project");
      
      const result = await response.json();
      
      toast({
        title: "Conversion successful",
        description: "Idea has been converted to a project successfully.",
      });
      
      // Redirect to the new project
      router.push(`/projects/${result.projectId}`);
    } catch (error) {
      console.error("Error converting idea to project:", error);
      toast({
        title: "Error",
        description: "Failed to convert idea to project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setConvertDialogOpen(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  if (!idea) {
    return (
      <div className="container max-w-4xl py-8">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Idea not found</h2>
            <p className="text-muted-foreground mb-6">The idea you're looking for doesn't exist or has been deleted.</p>
            <Button onClick={() => router.push("/dashboard")}>
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container max-w-5xl py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Idea Details</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <StatusControl 
            ideaId={idea.id} 
            currentStatus={idea.status as IdeaStatus || "created"} 
            onStatusChange={handleStatusChange} 
          />
          
          <Dialog open={convertDialogOpen} onOpenChange={setConvertDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="default">
                <Share className="h-4 w-4 mr-2" />
                Convert to Project
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Convert Idea to Project</DialogTitle>
                <DialogDescription>
                  Create a new project based on this idea. The idea will remain in your ideas list.
                </DialogDescription>
              </DialogHeader>
              <ConvertToProjectForm 
                idea={idea} 
                onSubmit={handleConvertToProject} 
                onCancel={() => setConvertDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
          
          <Button variant="destructive" size="icon" onClick={handleDeleteIdea}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{idea.title}</CardTitle>
              <CardDescription>
                Created on {formatDate(idea.createdAt)}
                {idea.updatedAt && idea.updatedAt !== idea.createdAt && 
                  ` • Updated on ${formatDate(idea.updatedAt)}`
                }
              </CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="font-medium">{idea.rating}/10</span>
                </div>
                <span className="text-xs text-muted-foreground">Rating</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center">
                  <BarChart className="h-4 w-4 text-blue-500 mr-1" />
                  <span className="font-medium">{idea.confidence}%</span>
                </div>
                <span className="text-xs text-muted-foreground">Confidence</span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
      
      <Tabs defaultValue="details" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="details">
            <FileText className="h-4 w-4 mr-2" />
            Details
          </TabsTrigger>
          <TabsTrigger value="history">
            <History className="h-4 w-4 mr-2" />
            Change History
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Idea Information</CardTitle>
            </CardHeader>
            <CardContent>
              <IdeaForm 
                idea={idea} 
                onSubmit={handleUpdateIdea} 
                isSubmitting={isSubmitting} 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Change History</CardTitle>
              <CardDescription>
                Track all changes made to this idea over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <IdeaChanges changes={changes} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}