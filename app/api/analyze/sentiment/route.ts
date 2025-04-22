import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { generateText } from "ai"
import { deepinfra } from "@ai-sdk/deepinfra"

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth()
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Parse request body
    const body = await request.json()
    const { projectName, projectUrl, timeframe = "30d" } = body

    if (!projectName && !projectUrl) {
      return NextResponse.json({ error: "Project name or URL is required" }, { status: 400 })
    }

    // In a real implementation, we would fetch data from social media APIs
    // For this demo, we'll generate mock data using AI

    // Generate sentiment analysis using DeepInfra
    const prompt = `
      You are a DeFi sentiment analysis expert. Generate a comprehensive sentiment analysis report for a DeFi project called "${projectName || "the project"}".
      ${projectUrl ? `The project's website/repository is at ${projectUrl}.` : ""}
      
      The analysis should include:
      1. Overall sentiment distribution (positive, neutral, negative percentages)
      2. Platform-specific sentiment for Twitter, Reddit, Discord, and Telegram
      3. Trending direction for each platform (up, down, or stable)
      4. Top discussion topics for each platform
      5. Key risk factors identified from sentiment analysis
      6. Top keywords with their sentiment
      7. A summary of the sentiment analysis
      
      Format the response as a JSON object with the following structure:
      {
        "overallSentiment": {
          "positive": number,
          "neutral": number,
          "negative": number
        },
        "platforms": [
          {
            "platform": string,
            "positive": number,
            "neutral": number,
            "negative": number,
            "volume": number,
            "trending": "up" | "down" | "stable",
            "topTopics": string[],
            "timeData": {
              "labels": string[],
              "positive": number[],
              "neutral": number[],
              "negative": number[]
            }
          }
        ],
        "riskFactors": [
          {
            "category": string,
            "severity": "high" | "medium" | "low",
            "description": string
          }
        ],
        "topKeywords": [
          {
            "word": string,
            "count": number,
            "sentiment": "positive" | "neutral" | "negative"
          }
        ],
        "summary": string
      }
      
      Make the data realistic and insightful for a VC evaluating the project.
    `

    // Use DeepInfra to generate sentiment analysis
    const { text } = await generateText({
      model: deepinfra("mistralai/Mixtral-8x7B-Instruct-v0.1"),
      prompt,
      temperature: 0.7,
      maxTokens: 2048,
    })

    // Parse the JSON response
    try {
      const sentimentData = JSON.parse(text)
      return NextResponse.json(sentimentData)
    } catch (error) {
      console.error("Error parsing AI response:", error)
      return NextResponse.json({ error: "Failed to parse sentiment analysis" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error analyzing sentiment:", error)
    return NextResponse.json({ error: "Failed to analyze sentiment" }, { status: 500 })
  }
}
