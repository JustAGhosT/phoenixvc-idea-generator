import { NextResponse } from "next/server"
import { createProtectedApiRoute } from "@/lib/api-utils"
import { ValidationError } from "@/lib/error-handler"
import { saveDocumentAnalysis } from "@/lib/analysis-db"
import { supabase } from "@/lib/db"
import { generateText } from "ai"
import { deepinfra } from "@ai-sdk/deepinfra"
import { createLogger } from "@/lib/logger"

const logger = createLogger("api:analyze:document")

export const POST = createProtectedApiRoute(async (req: Request, user) => {
  // Parse form data
  const formData = await req.formData()
  const document = formData.get("document") as File | null
  const url = formData.get("url") as string | null
  const projectName = formData.get("projectName") as string | null
  const projectId = formData.get("projectId") as string | null
  const documentType = (formData.get("documentType") as string) || "whitepaper"

  if (!document && !url) {
    logger.warn("Document analysis attempted without document or URL", { userId: user.id })
    throw new ValidationError("Document or URL is required")
  }

  logger.info("Starting document analysis", {
    userId: user.id,
    documentType,
    hasDocument: !!document,
    hasUrl: !!url,
    projectName,
  })

  let documentUrl = url || ""
  let documentName = ""

  // If a document was uploaded, store it in Supabase Storage
  if (document) {
    documentName = document.name
    const fileExt = document.name.split(".").pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`
    const filePath = `documents/${user.id}/${fileName}`

    logger.debug("Uploading document to storage", { fileName, filePath })

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("project-documents")
      .upload(filePath, document)

    if (uploadError) {
      logger.error("Error uploading document", uploadError, { filePath })
      throw new Error("Failed to upload document")
    }

    // Get the public URL for the uploaded document
    const { data: publicUrlData } = supabase.storage.from("project-documents").getPublicUrl(filePath)
    documentUrl = publicUrlData.publicUrl

    logger.debug("Document uploaded successfully", { documentUrl })
  }

  // Generate document analysis using DeepInfra
  logger.info("Generating document analysis with AI", { documentType })

  const prompt = `
      You are a DeFi risk analysis expert working for a venture capital firm. 
      Analyze the following ${documentType} document ${documentName ? `named "${documentName}"` : ""} from the URL: ${documentUrl || "provided document"}
      ${projectName ? `The project name is: ${projectName}` : ""}
      
      Provide a comprehensive risk assessment including:
      1. Overall summary of the project
      2. Key risk factors with severity (high, medium, low) and recommendations
      3. Project strengths
      4. Tokenomics analysis (distribution, vesting, utility)
      5. Technical architecture evaluation
      5. Security measures assessment
      
      Format your response as JSON with the following structure:
      {
        "summary": "Brief project summary",
        "riskFactors": [
          {
            "category": "Category name",
            "severity": "high|medium|low",
            "description": "Description of the risk",
            "recommendation": "Recommendation to mitigate the risk"
          }
        ],
        "strengths": ["Strength 1", "Strength 2", "Strength 3"],
        "tokenomics": {
          "distribution": {
            "team": "Percentage",
            "investors": "Percentage",
            "community": "Percentage",
            "treasury": "Percentage",
            "liquidity": "Percentage"
          },
          "vesting": "Vesting schedule description"
        },
        "technicalArchitecture": "Description of technical architecture",
        "securityMeasures": "Description of security measures"
      }
    `

  try {
    // Use DeepInfra to generate document analysis
    const { text } = await generateText({
      model: deepinfra("mistralai/Mixtral-8x7B-Instruct-v0.1"),
      prompt,
      temperature: 0.7,
      maxTokens: 2048,
    })

    // Parse the JSON response
    try {
      const analysisResults = JSON.parse(text)

      logger.info("Document analysis completed successfully", {
        userId: user.id,
        documentName,
        riskFactorsCount: analysisResults.riskFactors?.length,
      })

      // Save the analysis results to the database
      await saveDocumentAnalysis({
        userId: user.id,
        projectId: projectId || undefined,
        documentName: documentName || "Unnamed Document",
        documentType: documentType as any,
        documentUrl,
        analysisResults,
      })

      return NextResponse.json(analysisResults)
    } catch (error) {
      logger.error("Error parsing AI response", error as Error, { userId: user.id })
      throw new Error("Failed to parse document analysis")
    }
  } catch (error) {
    logger.error("Error generating document analysis", error as Error, {
      userId: user.id,
      documentName,
    })
    throw error
  }
}, "Failed to analyze document")
