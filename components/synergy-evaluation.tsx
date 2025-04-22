"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadarChart } from "@/components/ui/chart"
import { calculatePartnerSynergy } from "@/lib/ai"
import type { Idea } from "@/lib/types"
import { SYNERGY_THRESHOLDS } from "@/lib/config"

interface SynergyEvaluationProps {
  idea: Idea
}

export function SynergyEvaluation({ idea }: SynergyEvaluationProps) {
  const [partnerType, setPartnerType] = useState<"exchange" | "protocol" | "infrastructure" | "investor">("protocol")

  const synergy = calculatePartnerSynergy(idea, partnerType)

  const chartData = {
    labels: ["Market Alignment", "Resource Compatibility", "Mutual Benefits", "Technology Integration"],
    datasets: [
      {
        label: `${partnerType.charAt(0).toUpperCase() + partnerType.slice(1)} Synergy`,
        data: [
          synergy.marketAlignment,
          synergy.resourceCompatibility,
          synergy.mutualBenefits,
          synergy.technologyIntegration,
        ],
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 2,
        pointBackgroundColor: "rgb(59, 130, 246)",
      },
    ],
  }

  const chartOptions = {
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
        },
      },
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Partner Synergy Evaluation</CardTitle>
        <CardDescription>Assess potential synergies with different partner types</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={partnerType} onValueChange={(value) => setPartnerType(value as any)}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="exchange">Exchanges</TabsTrigger>
            <TabsTrigger value="protocol">Protocols</TabsTrigger>
            <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
            <TabsTrigger value="investor">Investors</TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="h-64">
                <RadarChart data={chartData} options={chartOptions} />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Overall Synergy Score</h3>
                <div className="flex items-center mt-2">
                  <div className="w-full bg-muted rounded-full h-4">
                    <div
                      className={`h-4 rounded-full ${
                        synergy.score > SYNERGY_THRESHOLDS.MIN_VALUABLE_SCORE
                          ? "bg-green-500"
                          : synergy.score > 50
                            ? "bg-amber-500"
                            : "bg-red-500"
                      }`}
                      style={{ width: `${synergy.score}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 font-medium">{Math.round(synergy.score)}%</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium">Recommendation</h3>
                <p className="mt-1 text-muted-foreground">{synergy.recommendation}</p>
              </div>

              <div>
                <h3 className="text-lg font-medium">Key Factors</h3>
                <ul className="mt-1 space-y-1">
                  <li className="flex justify-between">
                    <span>Market Alignment:</span>
                    <span className="font-medium">{Math.round(synergy.marketAlignment)}%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Resource Compatibility:</span>
                    <span className="font-medium">{Math.round(synergy.resourceCompatibility)}%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Mutual Benefits:</span>
                    <span className="font-medium">{Math.round(synergy.mutualBenefits)}%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Technology Integration:</span>
                    <span className="font-medium">{Math.round(synergy.technologyIntegration)}%</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
