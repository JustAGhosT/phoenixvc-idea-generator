import { Idea } from "@/lib/types";

interface RatingChartProps {
  ideas: Idea[];
}

export function RatingChart({ ideas }: RatingChartProps) {
  // Sort ideas by rating (descending)
  const sortedIdeas = [...ideas]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 5); // Only show top 5
  
  return (
    <div className="w-full">
      <h3 className="text-sm font-medium mb-4">Rating by Project</h3>
      <div className="space-y-3">
        {sortedIdeas.map((idea) => {
          const rating = idea.rating || 0;
          const percentage = (rating / 10) * 100; // Convert rating to percentage for the bar width
          
          return (
            <div key={idea.id} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{idea.title.length > 20 ? idea.title.substring(0, 20) + '...' : idea.title}</span>
                <span>{rating.toFixed(1)}/10</span>
              </div>
              <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-green-500 h-full rounded-full" 
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}