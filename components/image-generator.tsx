"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImageIcon, PieChart, Network, Loader2, Download, Share2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ImageGeneratorProps {
  projectName: string
  projectDescription?: string
}

export function ImageGenerator({ projectName, projectDescription = "" }: ImageGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [imageType, setImageType] = useState("tokenomics")
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const { toast } = useToast()

  // Predefined prompts based on image type
  const predefinedPrompts = {
    tokenomics: `Professional visualization of ${projectName}'s token distribution model showing allocation percentages for team, investors, community, and treasury in a clean pie chart style with blue and purple colors`,
    architecture: `Technical diagram of ${projectName}'s blockchain architecture showing network nodes, smart contracts, and data flow in a modern, minimalist style with blue accent colors`,
    riskProfile: `Risk assessment visualization for ${projectName} DeFi project showing security, regulatory, and market risk factors in a professional infographic style suitable for venture capital presentations`,
  }

  // Set initial prompt based on project name
  useState(() => {
    setPrompt(predefinedPrompts[imageType as keyof typeof predefinedPrompts])
  })

  // Update prompt when image type changes
  const handleImageTypeChange = (value: string) => {
    setImageType(value)
    setPrompt(predefinedPrompts[value as keyof typeof predefinedPrompts])
  }

  const generateImage = async () => {
    if (!prompt) {
      toast({
        title: "Prompt Required",
        description: "Please enter a prompt to generate an image",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    try {
      const response = await fetch("/api/generate/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          projectName,
          projectDescription,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate image")
      }

      const data = await response.json()
      setGeneratedImage(data.imageUrl)
      toast({
        title: "Image Generated",
        description: "Your visualization has been generated successfully",
      })
    } catch (error) {
      console.error("Error generating image:", error)
      toast({
        title: "Generation Failed",
        description: "Failed to generate the visualization. Please try again.",
        variant: "destructive",
      })

      // For demo purposes, set a placeholder image
      setGeneratedImage(`/placeholder.svg?height=512&width=512&query=${encodeURIComponent(prompt)}`)
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadImage = () => {
    if (!generatedImage) return

    const link = document.createElement("a")
    link.href = generatedImage
    link.download = `${projectName.toLowerCase().replace(/\s+/g, "-")}-${imageType}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Image Downloaded",
      description: "The visualization has been downloaded successfully",
    })
  }

  const getImageTypeIcon = () => {
    switch (imageType) {
      case "tokenomics":
        return <PieChart className="h-5 w-5" />
      case "architecture":
        return <Network className="h-5 w-5" />
      case "riskProfile":
        return <Share2 className="h-5 w-5" />
      default:
        return <ImageIcon className="h-5 w-5" />
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          Project Visualization Generator
        </CardTitle>
        <CardDescription>Generate visual representations of key project aspects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="image-type">Visualization Type</Label>
            <Select value={imageType} onValueChange={handleImageTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select visualization type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tokenomics">Tokenomics Distribution</SelectItem>
                <SelectItem value="architecture">Network Architecture</SelectItem>
                <SelectItem value="riskProfile">Risk Profile</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="prompt">Customization Prompt</Label>
            <Input
              id="prompt"
              placeholder="Describe the visualization you want to generate"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <Button onClick={generateImage} disabled={isGenerating} className="w-full">
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                {getImageTypeIcon()}
                <span className="ml-2">
                  Generate {imageType.charAt(0).toUpperCase() + imageType.slice(1)} Visualization
                </span>
              </>
            )}
          </Button>

          {generatedImage && (
            <div className="space-y-4 mt-4">
              <div className="border rounded-md overflow-hidden">
                <img
                  src={generatedImage || "/placeholder.svg"}
                  alt={`Generated ${imageType} visualization for ${projectName}`}
                  className="w-full h-auto"
                />
              </div>
              <Button onClick={downloadImage} variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Visualization
              </Button>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        Visualizations powered by AI for venture capital decision-making
      </CardFooter>
    </Card>
  )
}
