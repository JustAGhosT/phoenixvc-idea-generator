import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScalingStrategy } from "@/components/scaling-strategy"

export default function ScalingPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Scaling Strategy</h1>

      <div className="grid grid-cols-1 gap-6">
        <ScalingStrategy />

        <Card>
          <CardHeader>
            <CardTitle>Scaling Considerations</CardTitle>
            <CardDescription>Key factors to consider when planning your scaling strategy</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Technical Considerations</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Current architecture limitations and bottlenecks</li>
                <li>Data storage and processing requirements</li>
                <li>API throughput and response time targets</li>
                <li>Security implications of scaling approaches</li>
                <li>Monitoring and observability requirements</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Business Considerations</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Cost implications of different scaling approaches</li>
                <li>Time-to-market requirements for new features</li>
                <li>User growth projections and capacity planning</li>
                <li>Competitive landscape and market differentiation</li>
                <li>Regulatory compliance across different jurisdictions</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Team Considerations</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Current team skills and knowledge gaps</li>
                <li>Hiring and training requirements for scaling</li>
                <li>Team structure and organization for scaled operations</li>
                <li>Development process adaptations for larger scale</li>
                <li>Knowledge sharing and documentation needs</li>
              </ul>
            </div>

            <div className="text-sm text-muted-foreground italic mt-6">
              "The art of scaling is knowing when to scale, what to scale, and how to scale it." — Malcolm Gladwell
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
