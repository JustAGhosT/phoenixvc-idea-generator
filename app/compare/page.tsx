"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ideas } from "@/lib/data"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, RadarChart } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { Download, Eye } from "lucide-react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Add this import at the top of the file
import { calculateTechnicalFeasibility, calculatePotentialImpact } from "@/lib/ai"

export default function ComparePage() {
  const [selectedIdeas, setSelectedIdeas] = useState<number[]>(ideas.map((idea) => idea.id))

  const toggleIdea = (id: number) => {
    if (selectedIdeas.includes(id)) {
      setSelectedIdeas(selectedIdeas.filter((ideaId) => ideaId !== id))
    } else {
      setSelectedIdeas([...selectedIdeas, id])
    }
  }

  const filteredIdeas = ideas.filter((idea) => selectedIdeas.includes(idea.id))

  // Prepare data for charts
  const confidenceData = {
    labels: filteredIdeas.map((idea) => idea.title.split(" ").slice(0, 2).join(" ")),
    datasets: [
      {
        label: "Confidence",
        data: filteredIdeas.map((idea) => idea.confidence),
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 1,
      },
    ],
  }

  const ratingData = {
    labels: filteredIdeas.map((idea) => idea.title.split(" ").slice(0, 2).join(" ")),
    datasets: [
      {
        label: "Rating",
        data: filteredIdeas.map((idea) => idea.rating),
        backgroundColor: "rgba(16, 185, 129, 0.5)",
        borderColor: "rgb(16, 185, 129)",
        borderWidth: 1,
      },
    ],
  }

  // Update the radarData object in the component
  const radarData = {
    labels: ["Confidence", "Rating", "Market Potential", "Technical Feasibility", "Impact Score", "Competitive Edge"],
    datasets: filteredIdeas.map((idea, index) => {
      // Calculate additional metrics
      const feasibility = calculateTechnicalFeasibility(idea)
      const impact = calculatePotentialImpact(idea)

      return {
        label: idea.title.split(" ").slice(0, 2).join(" "),
        data: [
          idea.confidence / 10, // Scale to 0-10
          idea.rating,
          impact.marketDisruption / 10, // Scale to 0-10
          feasibility.score / 10, // Scale to 0-10
          impact.score / 10, // Scale to 0-10
          10 - feasibility.complexity / 10, // Invert complexity for competitive edge
        ],
        backgroundColor: `rgba(${index * 40}, ${150 - index * 10}, ${200 - index * 20}, 0.2)`,
        borderColor: `rgba(${index * 40}, ${150 - index * 10}, ${200 - index * 20}, 1)`,
        borderWidth: 2,
      }
    }),
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Compare Project Ideas</h1>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Comparison
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Select Ideas to Compare</CardTitle>
            <CardDescription>Choose which project ideas to include in the comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {ideas.map((idea) => (
                <div key={idea.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`idea-${idea.id}`}
                    checked={selectedIdeas.includes(idea.id)}
                    onCheckedChange={() => toggleIdea(idea.id)}
                  />
                  <Label htmlFor={`idea-${idea.id}`} className="cursor-pointer">
                    {idea.title.split(" ").slice(0, 3).join(" ")}...
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="charts">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="charts">Visual Comparison</TabsTrigger>
            <TabsTrigger value="table">Table Comparison</TabsTrigger>
            <TabsTrigger value="details">Detailed Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="charts" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Confidence Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <BarChart
                      data={confidenceData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                          y: {
                            beginAtZero: true,
                            max: 100,
                          },
                        },
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Rating Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <BarChart
                      data={ratingData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                          y: {
                            beginAtZero: true,
                            max: 10,
                          },
                        },
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Multi-dimensional Comparison</CardTitle>
                <CardDescription>Comparing projects across multiple metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <RadarChart
                    data={radarData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        r: {
                          beginAtZero: true,
                          max: 10,
                          ticks: {
                            stepSize: 2,
                          },
                        },
                      },
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="table">
            <Card>
              <CardHeader>
                <CardTitle>Comparison Table</CardTitle>
                <CardDescription>Side-by-side comparison of selected project ideas</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Metric</TableHead>
                      {filteredIdeas.map((idea) => (
                        <TableHead key={idea.id}>{idea.title.split(" ").slice(0, 2).join(" ")}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Confidence</TableCell>
                      {filteredIdeas.map((idea) => (
                        <TableCell key={idea.id}>{idea.confidence}%</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Rating</TableCell>
                      {filteredIdeas.map((idea) => (
                        <TableCell key={idea.id}>{idea.rating}/10</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Key Differentiator</TableCell>
                      {filteredIdeas.map((idea) => (
                        <TableCell key={idea.id}>{idea.keyDifferentiator}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Core Job</TableCell>
                      {filteredIdeas.map((idea) => (
                        <TableCell key={idea.id}>{idea.jtbd.core}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Market Size (TAM)</TableCell>
                      {filteredIdeas.map((idea) => (
                        <TableCell key={idea.id}>{idea.marketSize.tam}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Value Proposition</TableCell>
                      {filteredIdeas.map((idea) => (
                        <TableCell key={idea.id}>{idea.leanCanvas.uniqueValueProposition}</TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details">
            <div className="grid grid-cols-1 gap-6">
              {filteredIdeas.map((idea) => (
                <Card key={idea.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{idea.title}</CardTitle>
                        <CardDescription>
                          Rating: {idea.rating}/10 • Confidence: {idea.confidence}%
                        </CardDescription>
                      </div>
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/editor?id=${idea.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Full Details
                        </Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-1">Key Differentiator</h3>
                        <p>{idea.keyDifferentiator}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Positive Perspective</h3>
                        <ul className="list-disc pl-5">
                          {idea.perspectives.positive.map((point, index) => (
                            <li key={index}>{point}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Negative Perspective</h3>
                        <ul className="list-disc pl-5">
                          {idea.perspectives.negative.map((point, index) => (
                            <li key={index}>{point}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">SWOT Analysis</h3>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <h4 className="text-sm font-medium">Strengths</h4>
                            <ul className="list-disc pl-5 text-sm">
                              {idea.swot.strengths.map((point, index) => (
                                <li key={index}>{point}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Weaknesses</h4>
                            <ul className="list-disc pl-5 text-sm">
                              {idea.swot.weaknesses.map((point, index) => (
                                <li key={index}>{point}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Opportunities</h4>
                            <ul className="list-disc pl-5 text-sm">
                              {idea.swot.opportunities.map((point, index) => (
                                <li key={index}>{point}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Threats</h4>
                            <ul className="list-disc pl-5 text-sm">
                              {idea.swot.threats.map((point, index) => (
                                <li key={index}>{point}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
