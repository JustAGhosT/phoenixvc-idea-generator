import type { Idea } from "./types"
import { AI_SETTINGS } from "./config"

/**
 * AI-powered analysis service for DeFi project ideas
 */

// Define reusable word lists
const POSITIVE_WORDS = [
  "innovative", "growth", "opportunity", "advantage", 
  "efficient", "secure", "scalable", "profit",
]

const NEGATIVE_WORDS = [
  "risk", "challenge", "threat", "difficult", 
  "complex", "expensive", "vulnerable", "uncertain"
]

// Helper function to count word occurrences
function countWordOccurrences(text: string, wordList: string[]): number {
  const lowerText = text.toLowerCase()
  let count = 0
  
  wordList.forEach((word) => {
    const regex = new RegExp(`\\b${word}\\b`, "gi")
    const matches = lowerText.match(regex)
    if (matches) count += matches.length
  })
  
  return count
}

// Analyze the sentiment of text content
export function analyzeSentiment(text: string): { 
  score: number; 
  sentiment: "positive" | "neutral" | "negative" 
} {
  if (!text || !AI_SETTINGS.FEATURES_ENABLED) {
    return { score: 0.5, sentiment: "neutral" }
  }

  const lowerText = text.toLowerCase()
  
  // Count positive and negative words
  const positiveCount = countWordOccurrences(lowerText, POSITIVE_WORDS)
  const negativeCount = countWordOccurrences(lowerText, NEGATIVE_WORDS)
  
  // Calculate sentiment score
  const totalWords = text.split(/\s+/).length
  const sentimentScore = ((positiveCount - negativeCount) / Math.max(1, totalWords)) * 10

  // Normalize to 0-1 range
  const score = Math.min(Math.max(0.5 + sentimentScore * AI_SETTINGS.SENTIMENT_SENSITIVITY, 0), 1)

  // Determine sentiment category
  let sentiment: "positive" | "neutral" | "negative" = "neutral"
  if (score > 0.6) sentiment = "positive"
  if (score < 0.4) sentiment = "negative"

  return { score, sentiment }
}

// Generate recommendations for improving an idea
export function generateRecommendations(idea: Idea): { 
  text: string; 
  confidence: number; 
  category: string 
}[] {
  if (!idea || !AI_SETTINGS.FEATURES_ENABLED) return []

  const recommendations: { text: string; confidence: number; category: string }[] = []

  // Define recommendation rules
  const recommendationRules = [
    {
      condition: () => !idea.keyDifferentiator || idea.keyDifferentiator.length < 20,
      text: "Expand your key differentiator to clearly articulate what makes your project unique in the market.",
      confidence: 0.95,
      category: "value_proposition"
    },
    {
      condition: () => idea.confidence < 60,
      text: "Consider conducting additional market research to increase confidence in your project's viability.",
      confidence: 0.85,
      category: "research"
    },
    {
      condition: () => idea.swot.strengths.length < 2 || idea.swot.strengths.some((s) => s.length < 5),
      text: "Identify more specific strengths in your SWOT analysis to better highlight your competitive advantages.",
      confidence: 0.8,
      category: "analysis"
    },
    {
      condition: () => idea.swot.weaknesses.length < 2 || idea.swot.weaknesses.some((w) => w.length < 5),
      text: "Acknowledge more potential weaknesses to demonstrate a balanced understanding of your project.",
      confidence: 0.75,
      category: "analysis"
    },
    {
      condition: () => !idea.marketSize.tam || !idea.marketSize.sam || !idea.marketSize.som,
      text: "Complete your market size analysis (TAM/SAM/SOM) to better understand your project's market potential.",
      confidence: 0.9,
      category: "market"
    },
    {
      condition: () => idea.perspectives.positive.length < 2 || idea.perspectives.negative.length < 2,
      text: "Add more balanced perspectives (both positive and negative) to demonstrate thorough consideration.",
      confidence: 0.85,
      category: "analysis"
    }
  ]

  // Apply rules
  recommendationRules.forEach(rule => {
    if (rule.condition()) {
      recommendations.push({
        text: rule.text,
        confidence: rule.confidence,
        category: rule.category
      })
    }
  })

  // Filter by confidence threshold and limit number
  return recommendations
    .filter((rec) => rec.confidence >= AI_SETTINGS.MIN_CONFIDENCE_SCORE)
    .slice(0, AI_SETTINGS.MAX_RECOMMENDATIONS)
}

// Other analysis functions would follow similar refactoring patterns...