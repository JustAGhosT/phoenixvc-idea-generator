"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Lightbulb, ThumbsUp, ThumbsDown } from "lucide-react"
import { generateRecommendations } from "@/lib/ai"
import type { Idea } from "@/lib/types"
import { AI_SETTINGS } from "@/lib/config"

interface AIRecommendationsProps {
  idea: Idea
}

export function AIRecommendations({ idea }: AIRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Array<{ text: string; confidence: number; category: string }>>(
    [],
  )
  const [loading, setLoading] = useState(true)
  const [feedbackGiven, setFeedbackGiven] = useState<Record<number, "helpful" | "unhelpful" | null>>({})

  useEffect(() => {
    if (!AI_SETTINGS.FEATURES_ENABLED) {
      setLoading(false)
      return
    }

    // Generate recommendations
    const recs = generateRecommendations(idea)
    setRecommendations(recs)
    setLoading(false)
  }, [idea])

  const handleFeedback = (index: number, type: "helpful" | "unhelpful") => {
    setFeedbackGiven((prev) => ({
      ...prev,
      [index]: type,
    }))

    // In a real app, we would send this feedback to the server to improve the AI
    console.log(`Feedback for recommendation ${index}: ${type}`)
  }

  if (!AI_SETTINGS.FEATURES_ENABLED) {
    return null
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="mr-2 h-5 w-5" />
            AI Recommendations
          </CardTitle>
          <CardDescription>Analyzing your project idea...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (recommendations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="mr-2 h-5 w-5" />
            AI Recommendations
          </CardTitle>
          <CardDescription>No recommendations at this time</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Your project idea looks solid! We don't have any specific recommendations to improve it at this time.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Lightbulb className="mr-2 h-5 w-5" />
          AI Recommendations
        </CardTitle>
        <CardDescription>Suggestions to improve your project idea</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="bg-muted/50 rounded-lg p-3 relative">
              <div className="flex justify-between items-start">
                <p>{rec.text}</p>
                <Badge variant="outline" className="ml-2 shrink-0">
                  {rec.category.replace("_", " ")}
                </Badge>
              </div>

              <div className="flex gap-2 mt-2 justify-end">
                {feedbackGiven[index] ? (
                  <p className="text-xs text-muted-foreground">Thank you for your feedback!</p>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2"
                      onClick={() => handleFeedback(index, "helpful")}
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Helpful
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2"
                      onClick={() => handleFeedback(index, "unhelpful")}
                    >
                      <ThumbsDown className="h-4 w-4 mr-1" />
                      Not helpful
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
