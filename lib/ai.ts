import { AI_SETTINGS } from "./config"
import type { Idea } from "./types"

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

// Calculate synergy score with potential partners
export function calculatePartnerSynergy(
  idea: Idea,
  partnerType: "exchange" | "protocol" | "infrastructure" | "investor",
): {
  score: number
  marketAlignment: number
  resourceCompatibility: number
  mutualBenefits: number
  technologyIntegration: number
  recommendation: string
} {
  // Default values
  let marketAlignment = 0.5
  let resourceCompatibility = 0.5
  let mutualBenefits = 0.5
  let technologyIntegration = 0.5

  // Analyze based on partner type and idea characteristics
  switch (partnerType) {
    case "exchange":
      // Exchanges benefit from liquidity and trading volume
      marketAlignment =
        idea.title.toLowerCase().includes("liquidity") || idea.title.toLowerCase().includes("trading") ? 0.8 : 0.4

      resourceCompatibility = idea.leanCanvas.problem.toLowerCase().includes("exchange") ? 0.7 : 0.5
      mutualBenefits = idea.leanCanvas.customerSegments.toLowerCase().includes("trader") ? 0.8 : 0.5
      technologyIntegration = 0.6 // Moderate by default
      break

    case "protocol":
      // Protocols benefit from interoperability and composability
      marketAlignment =
        idea.title.toLowerCase().includes("protocol") || idea.keyDifferentiator.toLowerCase().includes("interop")
          ? 0.9
          : 0.5

      resourceCompatibility = 0.7 // Generally good
      mutualBenefits = idea.leanCanvas.unfairAdvantage.length > 20 ? 0.8 : 0.5
      technologyIntegration = idea.portersFiveForces.newEntrants.length > 30 ? 0.7 : 0.5
      break

    case "infrastructure":
      // Infrastructure providers benefit from scalability needs
      marketAlignment = idea.pestel.technological.toLowerCase().includes("scale") ? 0.8 : 0.5
      resourceCompatibility = 0.6 // Moderate by default
      mutualBenefits = idea.leanCanvas.costStructure.length > 20 ? 0.7 : 0.5
      technologyIntegration = 0.8 // Usually high
      break

    case "investor":
      // Investors look for growth potential and market size
      marketAlignment = idea.rating > 7 ? 0.8 : 0.5
      resourceCompatibility = idea.confidence > 70 ? 0.7 : 0.4
      mutualBenefits = idea.marketSize.tam.length > 10 ? 0.9 : 0.5
      technologyIntegration = 0.5 // Less relevant
      break
  }

  // Calculate weighted score
  const score =
    (marketAlignment * 0.3 + resourceCompatibility * 0.25 + mutualBenefits * 0.25 + technologyIntegration * 0.2) * 100

  // Generate recommendation
  let recommendation = ""
  if (score > 75) {
    recommendation = `Strong synergy potential with ${partnerType}s. Consider prioritizing these partnerships.`
  } else if (score > 60) {
    recommendation = `Moderate synergy with ${partnerType}s. Worth exploring specific opportunities.`
  } else {
    recommendation = `Limited synergy with ${partnerType}s. Focus on other partnership types first.`
  }

  return {
    score,
    marketAlignment: marketAlignment * 100,
    resourceCompatibility: resourceCompatibility * 100,
    mutualBenefits: mutualBenefits * 100,
    technologyIntegration: technologyIntegration * 100,
    recommendation,
  }
}

// Calculate technical feasibility score
export function calculateTechnicalFeasibility(idea: Idea): {
  score: number
  complexity: number
  timeToMarket: number
  resourceRequirements: number
  riskFactors: string[]
} {
  // Default values
  let complexity = 0.5
  let timeToMarket = 0.5
  let resourceRequirements = 0.5
  const riskFactors: string[] = []

  // Analyze complexity based on idea characteristics
  if (idea.title.toLowerCase().includes("ai") || idea.title.toLowerCase().includes("machine learning")) {
    complexity = 0.8
    riskFactors.push("AI/ML implementation complexity")
  }

  if (
    idea.title.toLowerCase().includes("cross-chain") ||
    idea.keyDifferentiator.toLowerCase().includes("cross-chain")
  ) {
    complexity = 0.9
    riskFactors.push("Cross-chain interoperability challenges")
  }

  // Analyze time to market
  if (idea.leanCanvas.solution.length < 50) {
    timeToMarket = 0.7 // Less detailed solutions might be quicker to implement
  } else {
    timeToMarket = 0.4 // More complex solutions take longer
  }

  // Analyze resource requirements
  if (
    idea.leanCanvas.costStructure.toLowerCase().includes("infrastructure") ||
    idea.leanCanvas.costStructure.toLowerCase().includes("development")
  ) {
    resourceRequirements = 0.7
    riskFactors.push("High infrastructure/development costs")
  }

  // Add risk factors based on negative perspectives
  idea.perspectives.negative.forEach((perspective) => {
    if (
      perspective.toLowerCase().includes("technical") ||
      perspective.toLowerCase().includes("complex") ||
      perspective.toLowerCase().includes("challenge")
    ) {
      riskFactors.push("Self-identified technical challenges")
    }
  })

  // Calculate overall score (lower is better for complexity and resource requirements)
  const score = ((1 - complexity) * 0.4 + timeToMarket * 0.3 + (1 - resourceRequirements) * 0.3) * 100

  return {
    score,
    complexity: complexity * 100,
    timeToMarket: timeToMarket * 100,
    resourceRequirements: resourceRequirements * 100,
    riskFactors: riskFactors.length > 0 ? riskFactors : ["No major risk factors identified"],
  }
}

// Calculate potential impact score
export function calculatePotentialImpact(idea: Idea): {
  score: number
  marketDisruption: number
  userBenefit: number
  ecosystemContribution: number
  impactAreas: string[]
} {
  // Default values
  let marketDisruption = 0.5
  let userBenefit = 0.5
  let ecosystemContribution = 0.5
  const impactAreas: string[] = []

  // Analyze market disruption
  if (idea.blueOcean.newMarketSpace.length > 30) {
    marketDisruption = 0.8
    impactAreas.push("New market creation")
  }

  if (idea.blueOcean.makeCompetitionIrrelevant.length > 30) {
    marketDisruption = 0.9
    impactAreas.push("Competitive disruption")
  }

  // Analyze user benefit
  if (idea.jtbd.core.length > 20) {
    userBenefit = 0.7
    impactAreas.push("Core user need fulfillment")
  }

  if (idea.jtbd.emotional.length > 20 || idea.jtbd.social.length > 20) {
    userBenefit = 0.8
    impactAreas.push("Emotional/social user impact")
  }

  // Analyze ecosystem contribution
  if (
    idea.leanCanvas.unfairAdvantage.toLowerCase().includes("network") ||
    idea.leanCanvas.unfairAdvantage.toLowerCase().includes("ecosystem")
  ) {
    ecosystemContribution = 0.8
    impactAreas.push("Ecosystem network effects")
  }

  // Calculate overall score
  const score = (marketDisruption * 0.4 + userBenefit * 0.4 + ecosystemContribution * 0.2) * 100

  return {
    score,
    marketDisruption: marketDisruption * 100,
    userBenefit: userBenefit * 100,
    ecosystemContribution: ecosystemContribution * 100,
    impactAreas,
  }
}