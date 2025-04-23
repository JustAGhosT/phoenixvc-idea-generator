"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { calculateTechnicalFeasibility, calculatePotentialImpact } from "@/lib/ai"
import type { Idea } from "@/lib/types"

interface ImpactAssessmentProps {
  idea: Idea
}

export function ImpactAssessment({ idea }: ImpactAssessmentProps) {
  const feasibility = calculateTechnicalFeasibility(idea)
  const impact = calculatePotentialImpact(idea)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Assessment</CardTitle>
        <CardDescription>Technical feasibility and potential impact analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="feasibility">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="feasibility">Technical Feasibility</TabsTrigger>
            <TabsTrigger value="impact">Potential Impact</TabsTrigger>
          </TabsList>

          <TabsContent value="feasibility">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <h3 className="font-medium">Overall Feasibility Score</h3>
                  <span className="font-medium">{Math.round(feasibility.score)}%</span>
                </div>
                <Progress value={feasibility.score} className="h-2" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Technical Complexity</h4>
                  <div className="flex items-center">
                    <Progress
                      value={100 - feasibility.complexity}
                      className="h-2"
                      indicatorClassName={
                        feasibility.complexity > 70
                          ? "bg-red-500"
                          : feasibility.complexity > 40
                            ? "bg-amber-500"
                            : "bg-green-500"
                      }
                    />
                    <span className="ml-2 text-sm">{Math.round(feasibility.complexity)}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Lower is better</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-1">Time to Market</h4>
                  <div className="flex items-center">
                    <Progress
                      value={feasibility.timeToMarket}
                      className="h-2"
                      indicatorClassName={
                        feasibility.timeToMarket < 30
                          ? "bg-red-500"
                          : feasibility.timeToMarket < 60
                            ? "bg-amber-500"
                            : "bg-green-500"
                      }
                    />
                    <span className="ml-2 text-sm">{Math.round(feasibility.timeToMarket)}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Higher is better</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-1">Resource Requirements</h4>
                  <div className="flex items-center">
                    <Progress
                      value={100 - feasibility.resourceRequirements}
                      className="h-2"
                      indicatorClassName={
                        feasibility.resourceRequirements > 70
                          ? "bg-red-500"
                          : feasibility.resourceRequirements > 40
                            ? "bg-amber-500"
                            : "bg-green-500"
                      }
                    />
                    <span className="ml-2 text-sm">{Math.round(feasibility.resourceRequirements)}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Lower is better</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Risk Factors</h4>
                <div className="flex flex-wrap gap-2">
                  {feasibility.riskFactors.map((factor, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-300"
                    >
                      {factor}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="impact">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <h3 className="font-medium">Overall Impact Score</h3>
                  <span className="font-medium">{Math.round(impact.score)}%</span>
                </div>
                <Progress value={impact.score} className="h-2" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Market Disruption</h4>
                  <div className="flex items-center">
                    <Progress value={impact.marketDisruption} className="h-2" indicatorClassName="bg-blue-500" />
                    <span className="ml-2 text-sm">{Math.round(impact.marketDisruption)}%</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-1">User Benefit</h4>
                  <div className="flex items-center">
                    <Progress value={impact.userBenefit} className="h-2" indicatorClassName="bg-green-500" />
                    <span className="ml-2 text-sm">{Math.round(impact.userBenefit)}%</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-1">Ecosystem Contribution</h4>
                  <div className="flex items-center">
                    <Progress value={impact.ecosystemContribution} className="h-2" indicatorClassName="bg-purple-500" />
                    <span className="ml-2 text-sm">{Math.round(impact.ecosystemContribution)}%</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Impact Areas</h4>
                <div className="flex flex-wrap gap-2">
                  {impact.impactAreas.map((area, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
                    >
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
