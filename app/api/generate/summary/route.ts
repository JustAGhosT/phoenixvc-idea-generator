import { NextResponse } from "next/server"
import { getServerAuthSession } from "@/auth"
import { saveProjectSummary } from "@/lib/analysis-db"
import { generateText } from "ai"
import { deepinfra } from "@ai-sdk/deepinfra"

export async function POST(req: Request) {
  try {
    // Check authentication
    const session = await getServerAuthSession()
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Parse request body
    const body = await req.json()
    const { project, documentAnalysis, sentimentAnalysis, projectId } = body

    if (!project) {
      return NextResponse.json({ error: "Project information is required" }, { status: 400 })
    }

    // Generate project summary using DeepInfra
    const prompt = `
      You are a DeFi investment analyst working for a venture capital firm.
      Create a comprehensive investment summary for a project called "${project.title || project.projectName}".
      
      ${documentAnalysis ? `Document Analysis: ${JSON.stringify(documentAnalysis)}` : ""}
      ${sentimentAnalysis ? `Sentiment Analysis: ${JSON.stringify(sentimentAnalysis)}` : ""}
      
      Generate a detailed investment summary with the following sections:
      
      1. Executive Summary:
         - Overview of the project
         - Key strengths and risks
         - Investment potential (High, Medium, Low)
         - Recommended action
      
      2. Technical Analysis:
         - Architecture assessment
         - Smart contract evaluation
         - Security audit status
         - Technical risks and strengths
      
      3. Financial Analysis:
         - Tokenomics breakdown (distribution, vesting, utility)
         - Market potential (TAM, SAM, SOM)
         - Revenue model
         - Financial risks
      
      4. Regulatory Analysis:
         - Compliance status
         - KYC/AML implementation
         - Supported jurisdictions
         - Regulatory risks
      
      Format your response as JSON with appropriate sections and subsections.
    `

    // Use DeepInfra to generate project summary
    const { text } = await generateText({
      model: deepinfra("mistralai/Mixtral-8x7B-Instruct-v0.1"),
      prompt,
      temperature: 0.7,
      maxTokens: 4096,
    })

    // Parse the JSON response
    try {
      const summaryContent = JSON.parse(text)

      // Save the summary to the database
      await saveProjectSummary({
        userId: session.user.id,
        projectId: projectId || undefined,
        projectName: project.title || project.projectName || "Unnamed Project",
        summaryType: "executive",
        summaryContent,
      })

      return NextResponse.json(summaryContent)
    } catch (error) {
      console.error("Error parsing AI response:", error)
      return NextResponse.json({ error: "Failed to parse project summary" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error generating summary:", error)
    return NextResponse.json({ error: "Failed to generate summary" }, { status: 500 })
  }
}
