import { Idea } from "@/lib/types";

interface ConfidenceChartProps {
  ideas: Idea[];
}

export function ConfidenceChart({ ideas }: ConfidenceChartProps) {
  // Sort ideas by confidence (descending)
  const sortedIdeas = [...ideas]
    .sort((a, b) => {
      const confA = typeof a.confidence === 'string' ? parseFloat(a.confidence) : (a.confidence || 0);
      const confB = typeof b.confidence === 'string' ? parseFloat(b.confidence) : (b.confidence || 0);
      return confB - confA;
    })
    .slice(0, 5); // Only show top 5
  
  return (
    <div className="w-full">
      <h3 className="text-sm font-medium mb-4">Confidence by Project</h3>
      <div className="space-y-3">
        {sortedIdeas.map((idea) => {
          const confidence = typeof idea.confidence === 'string' 
            ? parseFloat(idea.confidence) 
            : (idea.confidence || 0);
          
          return (
            <div key={idea.id} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{idea.title.length > 20 ? idea.title.substring(0, 20) + '...' : idea.title}</span>
                <span>{confidence.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-500 h-full rounded-full" 
                  style={{ width: `${confidence}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}