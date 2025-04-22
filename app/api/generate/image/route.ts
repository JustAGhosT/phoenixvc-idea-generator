import { NextResponse } from "next/server"
import { getServerAuthSession } from "@/auth"
import { saveProjectVisualization } from "@/lib/analysis-db"
import * as fal from "@fal-ai/serverless-client"

// Configure Fal AI client
fal.config({
  credentials: process.env.FAL_KEY,
})

export async function POST(req: Request) {
  try {
    // Check authentication
    const session = await getServerAuthSession()
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
    const result = await fal.run("fal-ai/stable-diffusion-xl", {
      input: {
        prompt,
        width: 1024,
        height: 1024,
        num_images: 1,
      },
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
