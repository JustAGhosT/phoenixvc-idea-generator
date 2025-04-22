"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import type { Idea } from "@/lib/types"
import { ArrowLeft, Save } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { AudioRecorder } from "@/components/audio-recorder"
import { useSession } from "next-auth/react"

// Empty idea template
const emptyIdea: Idea = {
  id: 0,
  title: "New Project Idea",
  confidence: 50,
  rating: 5,
  keyDifferentiator: "",
  perspectives: {
    positive: ["", "", ""],
    negative: ["", "", ""],
  },
  jtbd: {
    core: "",
    functional: "",
    emotional: "",
    social: "",
  },
  pestel: {
    political: "",
    economic: "",
    social: "",
    technological: "",
    environmental: "",
    legal: "",
  },
  scenarios: ["", "", ""],
  swot: {
    strengths: ["", "", ""],
    weaknesses: ["", "", ""],
    opportunities: ["", ""],
    threats: ["", ""],
  },
  portersFiveForces: {
    newEntrants: "",
    supplierPower: "",
    buyerPower: "",
    substitutes: "",
    rivalry: "",
  },
  leanCanvas: {
    problem: "",
    customerSegments: "",
    uniqueValueProposition: "",
    solution: "",
    keyMetrics: "",
    channels: "",
    costStructure: "",
    revenueStreams: "",
    unfairAdvantage: "",
  },
  blueOcean: {
    newMarketSpace: "",
    makeCompetitionIrrelevant: "",
  },
  marketSize: {
    tam: "",
    sam: "",
    som: "",
  },
}

export default function NewIdeaPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { data: session } = useSession()
  const [idea, setIdea] = useState<Idea>(emptyIdea)
  const [isLoading, setIsLoading] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const templateId = searchParams.get("template")

  useEffect(() => {
    // If a template ID is provided, load the template
    if (templateId) {
      const fetchTemplate = async () => {
        try {
          const response = await fetch(`/api/templates/${templateId}`)
          if (!response.ok) throw new Error("Failed to fetch template")

          const template = await response.json()
          // You could pre-fill some fields based on the template here
          setIdea((prev) => ({
            ...prev,
            title: `New ${template.title}`,
          }))

          toast({
            title: "Template loaded",
            description: `Using template: ${template.title}`,
          })
        } catch (error) {
          console.error("Error loading template:", error)
        }
      }

      fetchTemplate()
    }
  }, [templateId, toast])

  const handleSave = async () => {
    if (!session) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save your project idea.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/ideas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...idea,
          audioLogUrl: audioUrl,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create idea")
      }

      const newIdea = await response.json()

      toast({
        title: "Project created",
        description: "Your project idea has been created successfully.",
      })

      // Redirect to the edit page for the new idea
      router.push(`/editor/${newIdea.id}`)
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to create project. Please try again.",
        variant: "destructive",
      })
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const updateIdea = (field: string, value: any) => {
    setIdea((prev) => {
      const newIdea = { ...prev }

      // Handle nested fields with dot notation
      if (field.includes(".")) {
        const [parent, child] = field.split(".")
        ;(newIdea as any)[parent][child] = value
      } else {
        ;(newIdea as any)[field] = value
      }

      return newIdea
    })
  }

  const updateArrayItem = (field: string, index: number, value: string) => {
    setIdea((prev) => {
      const newIdea = { ...prev }

      // Handle nested fields with dot notation
      if (field.includes(".")) {
        const [parent, child] = field.split(".")
        const newArray = [...(newIdea as any)[parent][child]]
        newArray[index] = value
        ;(newIdea as any)[parent][child] = newArray
      } else {
        const newArray = [...(newIdea as any)[field]]
        newArray[index] = value
        ;(newIdea as any)[field] = newArray
      }

      return newIdea
    })
  }

  const handleAudioSaved = (url: string) => {
    setAudioUrl(url)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="icon">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Create New Project Idea</h1>
          </div>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Create Project
              </>
            )}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
            <CardDescription>Basic information about your project idea</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="title">Project Title</Label>
                <Input id="title" value={idea.title} onChange={(e) => updateIdea("title", e.target.value)} />
              </div>
              <div>
                <Label htmlFor="keyDifferentiator">Key Differentiator</Label>
                <Input
                  id="keyDifferentiator"
                  value={idea.keyDifferentiator}
                  onChange={(e) => updateIdea("keyDifferentiator", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="confidence">Confidence ({idea.confidence}%)</Label>
                  <Slider
                    id="confidence"
                    value={[idea.confidence]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => updateIdea("confidence", value[0])}
                  />
                </div>
                <div>
                  <Label htmlFor="rating">Rating ({idea.rating}/10)</Label>
                  <Slider
                    id="rating"
                    value={[idea.rating]}
                    min={1}
                    max={10}
                    step={1}
                    onValueChange={(value) => updateIdea("rating", value[0])}
                  />
                </div>
              </div>

              <div>
                <Label>Audio Notes</Label>
                <AudioRecorder onAudioSaved={handleAudioSaved} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="perspectives">
          <TabsList className="grid grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="perspectives">Perspectives</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="strategy">Strategy</TabsTrigger>
            <TabsTrigger value="market">Market</TabsTrigger>
          </TabsList>

          <TabsContent value="perspectives" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Positive Perspective</CardTitle>
                <CardDescription>Key strengths and opportunities of the project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {idea.perspectives.positive.map((point, index) => (
                  <div key={`positive-${index}`}>
                    <Label htmlFor={`positive-${index}`}>Point {index + 1}</Label>
                    <Textarea
                      id={`positive-${index}`}
                      value={point}
                      onChange={(e) => updateArrayItem("perspectives.positive", index, e.target.value)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Negative Perspective</CardTitle>
                <CardDescription>Key challenges and risks of the project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {idea.perspectives.negative.map((point, index) => (
                  <div key={`negative-${index}`}>
                    <Label htmlFor={`negative-${index}`}>Point {index + 1}</Label>
                    <Textarea
                      id={`negative-${index}`}
                      value={point}
                      onChange={(e) => updateArrayItem("perspectives.negative", index, e.target.value)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Jobs-To-Be-Done (JTBD)</CardTitle>
                <CardDescription>What jobs does your project solve for users?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="jtbd-core">Core Job</Label>
                  <Textarea
                    id="jtbd-core"
                    value={idea.jtbd.core}
                    onChange={(e) => updateIdea("jtbd.core", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="jtbd-functional">Functional</Label>
                  <Textarea
                    id="jtbd-functional"
                    value={idea.jtbd.functional}
                    onChange={(e) => updateIdea("jtbd.functional", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="jtbd-emotional">Emotional</Label>
                  <Textarea
                    id="jtbd-emotional"
                    value={idea.jtbd.emotional}
                    onChange={(e) => updateIdea("jtbd.emotional", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="jtbd-social">Social</Label>
                  <Textarea
                    id="jtbd-social"
                    value={idea.jtbd.social}
                    onChange={(e) => updateIdea("jtbd.social", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Additional tabs content similar to the editor/[id]/page.tsx */}
        </Tabs>
      </div>
    </div>
  )
}
