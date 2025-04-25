import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Idea } from "@/lib/types";

interface TechnicalImpactProps {
  ideas: Idea[];
}

export function TechnicalImpact({ ideas }: TechnicalImpactProps) {
  // Calculate average technical feasibility using the correct property name 'technological'
  const avgFeasibility = ideas.length > 0
    ? ideas.reduce((sum, idea) => {
        // Access the technological property from pestel
        const techValue = idea.pestel?.technological;
        // Convert to number if it's a string, or default to 0
        const techNumber = typeof techValue === 'string' 
          ? parseFloat(techValue) || 0 
          : (techValue || 0);
        return sum + techNumber;
      }, 0) / ideas.length
    : 0;
    
  // Calculate average market impact using TAM (Total Addressable Market) as a proxy for potential
  const avgImpact = ideas.length > 0
    ? ideas.reduce((sum, idea) => {
        // Use TAM as a proxy for market potential
        const tamValue = idea.marketSize?.tam;
        // Convert to number if it's a string, or default to 0
        const tamNumber = typeof tamValue === 'string' 
          ? parseFloat(tamValue) || 0 
          : (tamValue || 0);
        return sum + tamNumber;
      }, 0) / ideas.length
    : 0;
  
  return (
    <div className="grid gap-4 grid-cols-2">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Technical Feasibility</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgFeasibility.toFixed(1)}/10</div>
          <p className="text-xs text-muted-foreground">Average across projects</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Market Potential</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgImpact.toFixed(1)}</div>
          <p className="text-xs text-muted-foreground">Average TAM across projects</p>
        </CardContent>
      </Card>
    </div>
  );
}