import { Progress } from "@/components/ui/progress";
import { Idea } from "@/lib/types";
import Link from "next/link";

interface ProjectsOverviewProps {
  ideas: Idea[];
}

export function ProjectsOverview({ ideas }: ProjectsOverviewProps) {
  // Sort ideas by rating (descending)
  const sortedIdeas = [...ideas].sort((a, b) => (b.rating || 0) - (a.rating || 0));
  
  return (
    <div className="space-y-4">
      {sortedIdeas.slice(0, 5).map((idea) => (
        <Link 
          key={idea.id} 
          href={`/editor/${idea.id}`}
          className="block border rounded-md p-3 hover:bg-accent/50 transition-colors"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">{idea.title}</h3>
            <span className="text-sm font-medium">{idea.rating || 0}/10</span>
          </div>
          {/* Convert confidence to number and ensure it's between 0-100 */}
          <Progress 
            value={typeof idea.confidence === 'string' 
              ? parseFloat(idea.confidence) 
              : (idea.confidence || 0)} 
            className="h-2" 
          />
          <div className="flex justify-between mt-2">
            <span className="text-xs text-muted-foreground">
              Confidence: {typeof idea.confidence === 'string' 
                ? idea.confidence 
                : `${idea.confidence || 0}%`}
            </span>
            <span className="text-xs text-muted-foreground">
              Updated {idea.updatedAt 
                ? new Date(idea.updatedAt).toLocaleDateString() 
                : 'N/A'}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}