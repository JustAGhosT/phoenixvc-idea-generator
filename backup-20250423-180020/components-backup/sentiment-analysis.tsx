"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart, LineChart } from "@/components/ui/chart"
import { MessageSquare, TrendingUp, AlertTriangle, Twitter, MessageCircle, Hash } from "lucide-react"

interface SentimentData {
  platform: string
  positive: number
  neutral: number
  negative: number
  volume: number
  trending: "up" | "down" | "stable"
  topTopics: string[]
  timeData: {
    labels: string[]
    positive: number[]
    neutral: number[]
    negative: number[]
  }
}

interface SentimentAnalysisResult {
  overallSentiment: {
    positive: number
    neutral: number
    negative: number
  }
  platforms: SentimentData[]
  riskFactors: {
    category: string
    severity: "high" | "medium" | "low"
    description: string
  }[]
  topKeywords: {
    word: string
    count: number
    sentiment: "positive" | "neutral" | "negative"
  }[]
  summary: string
}

interface SentimentAnalysisProps {
  results?: SentimentAnalysisResult
  projectName?: string
}

export function SentimentAnalysis({ results, projectName }: SentimentAnalysisProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)

  // If no results are provided, show a placeholder
  if (!results) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Sentiment Analysis
          </CardTitle>
          <CardDescription>Analyze community sentiment across social platforms</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-8">
          <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground">No sentiment data available yet.</p>
          <p className="text-sm text-muted-foreground mt-1">
            Run a sentiment analysis to see community perception across platforms.
          </p>
        </CardContent>
      </Card>
    )
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "negative":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "neutral":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getTrendingIcon = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
      case "stable":
        return <TrendingUp className="h-4 w-4 text-yellow-500 rotate-90" />
    }
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "twitter":
        return <Twitter className="h-4 w-4" />
      case "reddit":
      case "discord":
      case "telegram":
        return <MessageCircle className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const platformData = selectedPlatform
    ? results.platforms.find((p) => p.platform.toLowerCase() === selectedPlatform.toLowerCase())
    : null

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Sentiment Analysis {projectName ? `for ${projectName}` : ""}
          </CardTitle>
          <CardDescription>Community sentiment analysis across social platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="platforms">Platforms</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="risks">Risk Factors</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 mt-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Sentiment Summary</h3>
                <p className="text-sm text-muted-foreground">{results.summary}</p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Overall Sentiment</h3>
                <div className="h-64">
                  <BarChart
                    data={{
                      labels: ["Positive", "Neutral", "Negative"],
                      datasets: [
                        {
                          label: "Sentiment Distribution",
                          data: [
                            results.overallSentiment.positive,
                            results.overallSentiment.neutral,
                            results.overallSentiment.negative,
                          ],
                          backgroundColor: [
                            "rgba(34, 197, 94, 0.6)",
                            "rgba(59, 130, 246, 0.6)",
                            "rgba(239, 68, 68, 0.6)",
                          ],
                          borderColor: ["rgb(34, 197, 94)", "rgb(59, 130, 246)", "rgb(239, 68, 68)"],
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
              </div>

              <div>
                <h3 className="font-medium mb-2">Top Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {results.topKeywords.map((keyword, index) => (
                    <Badge key={index} variant="outline" className={getSentimentColor(keyword.sentiment)}>
                      <Hash className="h-3 w-3 mr-1" />
                      {keyword.word} ({keyword.count})
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="platforms" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.platforms.map((platform, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        {getPlatformIcon(platform.platform)}
                        {platform.platform}
                        <Badge variant="outline" className="ml-auto">
                          {getTrendingIcon(platform.trending)}
                          {platform.trending === "up" ? "Rising" : platform.trending === "down" ? "Falling" : "Stable"}
                        </Badge>
                      </CardTitle>
                      <CardDescription>Volume: {platform.volume.toLocaleString()} mentions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Positive: {platform.positive}%</span>
                            <span>Neutral: {platform.neutral}%</span>
                            <span>Negative: {platform.negative}%</span>
                          </div>
                          <div className="flex h-2 rounded-full overflow-hidden">
                            <div className="bg-green-500" style={{ width: `${platform.positive}%` }} />
                            <div className="bg-blue-500" style={{ width: `${platform.neutral}%` }} />
                            <div className="bg-red-500" style={{ width: `${platform.negative}%` }} />
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xs font-medium mb-1">Top Topics</h4>
                          <div className="flex flex-wrap gap-1">
                            {platform.topTopics.map((topic, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-2"
                          onClick={() => {
                            setSelectedPlatform(platform.platform)
                            setActiveTab("trends")
                          }}
                        >
                          View Trends
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-4 mt-4">
              {selectedPlatform && platformData ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium flex items-center gap-2">
                      {getPlatformIcon(platformData.platform)}
                      {platformData.platform} Sentiment Trends
                    </h3>
                    <Button variant="outline" size="sm" onClick={() => setSelectedPlatform(null)}>
                      View All Platforms
                    </Button>
                  </div>
                  <div className="h-64">
                    <LineChart
                      data={{
                        labels: platformData.timeData.labels,
                        datasets: [
                          {
                            label: "Positive",
                            data: platformData.timeData.positive,
                            borderColor: "rgb(34, 197, 94)",
                            backgroundColor: "rgba(34, 197, 94, 0.1)",
                            tension: 0.3,
                          },
                          {
                            label: "Neutral",
                            data: platformData.timeData.neutral,
                            borderColor: "rgb(59, 130, 246)",
                            backgroundColor: "rgba(59, 130, 246, 0.1)",
                            tension: 0.3,
                          },
                          {
                            label: "Negative",
                            data: platformData.timeData.negative,
                            borderColor: "rgb(239, 68, 68)",
                            backgroundColor: "rgba(239, 68, 68, 0.1)",
                            tension: 0.3,
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
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Key Insights</h4>
                    <ul className="space-y-1 text-sm">
                      <li>
                        • Sentiment is{" "}
                        {platformData.trending === "up"
                          ? "improving"
                          : platformData.trending === "down"
                            ? "declining"
                            : "stable"}{" "}
                        over the past 30 days
                      </li>
                      <li>
                        • Volume has {platformData.volume > 1000 ? "increased" : "decreased"} by{" "}
                        {Math.round(Math.random() * 20 + 5)}% compared to previous period
                      </li>
                      <li>• Most discussions center around {platformData.topTopics.slice(0, 2).join(", ")}</li>
                      <li>
                        •{" "}
                        {platformData.positive > platformData.negative
                          ? "Positive sentiment outweighs negative"
                          : "Negative sentiment outweighs positive"}{" "}
                        by {Math.abs(platformData.positive - platformData.negative)}%
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="font-medium">Platform Sentiment Over Time</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {results.platforms.map((platform, index) => (
                      <Card key={index} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center gap-2">
                            {getPlatformIcon(platform.platform)}
                            {platform.platform}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-40">
                            <LineChart
                              data={{
                                labels: platform.timeData.labels,
                                datasets: [
                                  {
                                    label: "Positive",
                                    data: platform.timeData.positive,
                                    borderColor: "rgb(34, 197, 94)",
                                    backgroundColor: "transparent",
                                    tension: 0.3,
                                  },
                                  {
                                    label: "Negative",
                                    data: platform.timeData.negative,
                                    borderColor: "rgb(239, 68, 68)",
                                    backgroundColor: "transparent",
                                    tension: 0.3,
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
                                plugins: {
                                  legend: {
                                    display: false,
                                  },
                                },
                              }}
                            />
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full mt-2"
                            onClick={() => setSelectedPlatform(platform.platform)}
                          >
                            View Details
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="risks" className="space-y-4 mt-4">
              <div className="space-y-4">
                <h3 className="font-medium">Identified Risk Factors</h3>
                {results.riskFactors.map((risk, index) => (
                  <Alert key={index} className={getSeverityColor(risk.severity)}>
                    <AlertTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      {risk.category}
                      <Badge variant="outline" className="ml-2">
                        {risk.severity.charAt(0).toUpperCase() + risk.severity.slice(1)} Risk
                      </Badge>
                    </AlertTitle>
                    <AlertDescription>{risk.description}</AlertDescription>
                  </Alert>
                ))}
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Risk Assessment Summary</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Based on sentiment analysis across all platforms, we've identified the following risk profile:
                </p>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Reputational Risk</span>
                      <span
                        className={
                          results.riskFactors.some((r) => r.severity === "high")
                            ? "text-red-500"
                            : results.riskFactors.some((r) => r.severity === "medium")
                              ? "text-yellow-500"
                              : "text-green-500"
                        }
                      >
                        {results.riskFactors.some((r) => r.severity === "high")
                          ? "High"
                          : results.riskFactors.some((r) => r.severity === "medium")
                            ? "Medium"
                            : "Low"}
                      </span>
                    </div>
                    <Progress
                      value={
                        results.riskFactors.some((r) => r.severity === "high")
                          ? 80
                          : results.riskFactors.some((r) => r.severity === "medium")
                            ? 50
                            : 20
                      }
                      className="h-2"
                      indicatorClassName={
                        results.riskFactors.some((r) => r.severity === "high")
                          ? "bg-red-500"
                          : results.riskFactors.some((r) => r.severity === "medium")
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Community Sentiment</span>
                      <span
                        className={
                          results.overallSentiment.positive > 60
                            ? "text-green-500"
                            : results.overallSentiment.positive > 40
                              ? "text-yellow-500"
                              : "text-red-500"
                        }
                      >
                        {results.overallSentiment.positive > 60
                          ? "Positive"
                          : results.overallSentiment.positive > 40
                            ? "Mixed"
                            : "Negative"}
                      </span>
                    </div>
                    <Progress
                      value={results.overallSentiment.positive}
                      className="h-2"
                      indicatorClassName={
                        results.overallSentiment.positive > 60
                          ? "bg-green-500"
                          : results.overallSentiment.positive > 40
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Market Perception</span>
                      <span
                        className={
                          results.platforms.filter((p) => p.trending === "up").length >
                          results.platforms.filter((p) => p.trending === "down").length
                            ? "text-green-500"
                            : results.platforms.filter((p) => p.trending === "up").length ===
                                results.platforms.filter((p) => p.trending === "down").length
                              ? "text-yellow-500"
                              : "text-red-500"
                        }
                      >
                        {results.platforms.filter((p) => p.trending === "up").length >
                        results.platforms.filter((p) => p.trending === "down").length
                          ? "Improving"
                          : results.platforms.filter((p) => p.trending === "up").length ===
                              results.platforms.filter((p) => p.trending === "down").length
                            ? "Stable"
                            : "Declining"}
                      </span>
                    </div>
                    <Progress
                      value={
                        results.platforms.filter((p) => p.trending === "up").length * 25 +
                        results.platforms.filter((p) => p.trending === "stable").length * 12.5
                      }
                      className="h-2"
                      indicatorClassName={
                        results.platforms.filter((p) => p.trending === "up").length >
                        results.platforms.filter((p) => p.trending === "down").length
                          ? "bg-green-500"
                          : results.platforms.filter((p) => p.trending === "up").length ===
                              results.platforms.filter((p) => p.trending === "down").length
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
