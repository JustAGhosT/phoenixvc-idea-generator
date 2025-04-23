import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart } from "@/components/ui/chart"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, FileText, PenSquare } from "lucide-react"
import { getIdeas } from "@/lib/db"
import { calculateTechnicalFeasibility, calculatePotentialImpact } from "@/lib/ai"
import { getServerAuthSession } from "@/auth"
import { setTag } from "@/lib/sentry"
import { useRef } from "react"

export default async function Home() {
  // Add Sentry tag for this page
  if (typeof window !== "undefined") {
    setTag("page", "home")
  }

  // Fetch ideas from the database
  const ideas = await getIdeas()

  // Calculate average confidence and rating
  const avgConfidence = ideas.reduce((acc, idea) => acc + idea.confidence, 0) / ideas.length
  const avgRating = ideas.reduce((acc, idea) => acc + idea.rating, 0) / ideas.length

  // Prepare data for charts
  const confidenceData = {
    labels: ideas.map((idea) => idea.title.split(" ").slice(0, 2).join(" ")),
    datasets: [
      {
        label: "Confidence",
        data: ideas.map((idea) => idea.confidence),
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 1,
      },
    ],
  }

  const ratingData = {
    labels: ideas.map((idea) => idea.title.split(" ").slice(0, 2).join(" ")),
    datasets: [
      {
        label: "Rating",
        data: ideas.map((idea) => idea.rating),
        backgroundColor: "rgba(16, 185, 129, 0.5)",
        borderColor: "rgb(16, 185, 129)",
        borderWidth: 1,
      },
    ],
  }

  // Top ideas by rating
  const topIdeas = [...ideas].sort((a, b) => b.rating - a.rating).slice(0, 3)

  const session = await getServerAuthSession()

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">DeFi Project Analyzer Dashboard</h1>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/compare">
                <BarChart3 className="mr-2 h-4 w-4" />
                Compare Ideas
              </Link>
            </Button>
            <Button asChild>
              <Link href="/editor/new">
                <PenSquare className="mr-2 h-4 w-4" />
                New Idea
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total Ideas</CardTitle>
              <CardDescription>Number of project ideas analyzed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{ideas.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Average Confidence</CardTitle>
              <CardDescription>Across all project ideas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{avgConfidence.toFixed(1)}%</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Average Rating</CardTitle>
              <CardDescription>Across all project ideas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{avgRating.toFixed(1)}/10</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Confidence by Project</CardTitle>
              <CardDescription>Confidence level for each project idea</CardDescription>
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
              <CardTitle>Rating by Project</CardTitle>
              <CardDescription>Rating score for each project idea</CardDescription>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Technical Feasibility</CardTitle>
              <CardDescription>Average feasibility score across projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <BarChart
                  data={{
                    labels: ideas.map((idea) => idea.title.split(" ").slice(0, 2).join(" ")),
                    datasets: [
                      {
                        label: "Technical Feasibility",
                        data: ideas.map((idea) => calculateTechnicalFeasibility(idea).score),
                        backgroundColor: "rgba(16, 185, 129, 0.5)",
                        borderColor: "rgb(16, 185, 129)",
                        borderWidth: 1,
                      },
                    ],
                  }}
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
              <CardTitle>Potential Impact</CardTitle>
              <CardDescription>Impact assessment across projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <BarChart
                  data={{
                    labels: ideas.map((idea) => idea.title.split(" ").slice(0, 2).join(" ")),
                    datasets: [
                      {
                        label: "Potential Impact",
                        data: ideas.map((idea) => calculatePotentialImpact(idea).score),
                        backgroundColor: "rgba(124, 58, 237, 0.5)",
                        borderColor: "rgb(124, 58, 237)",
                        borderWidth: 1,
                      },
                    ],
                  }}
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
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Top Rated Project Ideas</CardTitle>
            <CardDescription>Highest rated project ideas based on analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {topIdeas.map((idea) => (
                <Card key={idea.id} className="overflow-hidden">
                  <CardHeader className="bg-primary/5 pb-2">
                    <CardTitle className="text-lg">{idea.title}</CardTitle>
                    <CardDescription>
                      Rating: {idea.rating}/10 • Confidence: {idea.confidence}%
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-sm mb-3">{idea.keyDifferentiator}</p>
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <Link href={`/editor/${idea.id}`}>
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button asChild variant="outline" className="h-24 flex flex-col items-center justify-center">
                <Link href="/compare">
                  <BarChart3 className="h-8 w-8 mb-2" />
                  <span>Compare All Ideas</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-24 flex flex-col items-center justify-center">
                <Link href="/editor/new">
                  <PenSquare className="h-8 w-8 mb-2" />
                  <span>Create New Idea</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-24 flex flex-col items-center justify-center">
                <Link href="/templates">
                  <FileText className="h-8 w-8 mb-2" />
                  <span>Browse Templates</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
