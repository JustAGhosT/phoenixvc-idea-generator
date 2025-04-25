import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/auth-utils";
import { getTemplates } from "@/lib/db";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function NewProjectPage() {
  // This will redirect to login if not authenticated
  const session = await requireAuth();
  
  // Fetch templates for project creation
  const templates = await getTemplates().catch(() => []);
  
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link href="/projects">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Link>
        </Button>
      </div>
      
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New Project</h1>
        <p className="text-muted-foreground">Start a new DeFi project analysis</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Start from scratch */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Start from Scratch</h2>
          <p className="text-muted-foreground mb-6">Create a new project with a blank template</p>
          <Button asChild>
            <Link href="/editor/new">Create Blank Project</Link>
          </Button>
        </div>
        
        {/* Use a template */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Use a Template</h2>
          <p className="text-muted-foreground mb-6">Start with a pre-configured template</p>
          
          {templates.length > 0 ? (
            <div className="space-y-4">
              {templates.map((template) => (
                <div key={template.id} className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">{template.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/editor/new?templateId=${template.id}`}>
                      Use Template
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No templates available</p>
          )}
        </div>
      </div>
    </div>
  );
}