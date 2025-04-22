import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authConfig } from "@/app/api/auth/[...nextauth]/auth"
import { saveProjectVisualization } from "@/lib/analysis-db"
import { generateImage } from "@fal-ai/serverless-client"

export async function POST(req: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authConfig)
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Parse request body
    const body = await req.json()
    const { prompt, projectName, projectId, visualizationType } = body

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    // Generate image using Fal AI
    const result = await generateImage({
      prompt,
      modelName: "stable-diffusion-xl",
      width: 1024,
      height: 1024,
      numberOfImages: 1,
    })

    if (!result.images || result.images.length === 0) {
      return NextResponse.json({ error: "Failed to generate image" }, { status: 500 })
    }

    const imageUrl = result.images[0].url

    // Save the visualization to the database
    await saveProjectVisualization({
      userId: session.user.id,
      projectId: projectId || undefined,
      projectName: projectName || "Unnamed Project",
      visualizationType: visualizationType || "tokenomics",
      imageUrl,
      prompt,
    })

    return NextResponse.json({ imageUrl })
  } catch (error) {
    console.error("Error generating image:", error)
    return NextResponse.json({ error: "Failed to generate image" }, { status: 500 })
  }
}
