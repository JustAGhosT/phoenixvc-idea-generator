"use client"

import { AudioRecorder } from "@/components/features/media/audio-recorder"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/hooks/use-auth"
import type { Idea } from "@/lib/types"
import { ArrowLeft, Copy, Download, Save } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { AIRecommendations } from "@/components/features/analysis/ai-recommendations"
import { ImpactAssessment } from "@/components/features/analysis/impact-assessment"
import { SynergyEvaluation } from "@/components/features/analysis/synergy-evaluation"
import { ChangeHistory } from "@/components/misc/change-history"

export default function EditorPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()
  const [idea, setIdea] = useState<Idea | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchIdea = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/ideas/${params.id}`)

        if (!response.ok) {
          throw new Error("Failed to fetch idea")
        }

        const data = await response.json()
        setIdea(data)
      } catch (err) {
        setError("Error loading idea")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchIdea()
  }, [params.id])

  const handleSave = async () => {
    if (!idea || !user) return

    setIsSaving(true)

    try {
      const response = await fetch(`/api/ideas/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...idea,
          audioLogUrl: audioUrl,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save idea")
      }

      toast({
        title: "Project saved",
        description: "Your project idea has been saved successfully.",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to save project. Please try again.",
        variant: "destructive",
      })
      console.error(err)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCopyToClipboard = () => {
    if (!idea) return

    const formattedIdea = `# ${idea.title}

## Positive Perspective
${idea.perspectives.positive.map((p) => `- ${p}`).join("\n")}

## Negative Perspective
${idea.perspectives.negative.map((p) => `- ${p}`).join("\n")}

## 1. Jobs-To-Be-Done (JTBD)
- **Core Job**: ${idea.jtbd.core}
- **Functional**: ${idea.jtbd.functional}
- **Emotional**: ${idea.jtbd.emotional}
- **Social**: ${idea.jtbd.social}

## 2. PESTEL Analysis
- **Political**: ${idea.pestel.political}
- **Economic**: ${idea.pestel.economic}
- **Social**: ${idea.pestel.social}
- **Technological**: ${idea.pestel.technological}
- **Environmental**: ${idea.pestel.environmental}
- **Legal**: ${idea.pestel.legal}

## 3. Scenario Planning
${idea.scenarios.map((s) => `- ${s}`).join("\n")}

## 4. SWOT Analysis
- **Strengths**: ${idea.swot.strengths.join(", ")}
- **Weaknesses**: ${idea.swot.weaknesses.join(", ")}
- **Opportunities**: ${idea.swot.opportunities.join(", ")}
- **Threats**: ${idea.swot.threats.join(", ")}

## 5. Porter's Five Forces
- **Threat of New Entrants**: ${idea.portersFiveForces.newEntrants}
- **Supplier Power**: ${idea.portersFiveForces.supplierPower}
- **Buyer Power**: ${idea.portersFiveForces.buyerPower}
- **Threat of Substitutes**: ${idea.portersFiveForces.substitutes}
- **Competitive Rivalry**: ${idea.portersFiveForces.rivalry}

## 6. Lean Canvas
- **Problem**: ${idea.leanCanvas.problem}
- **Customer Segments**: ${idea.leanCanvas.customerSegments}
- **Unique Value Proposition**: ${idea.leanCanvas.uniqueValueProposition}
- **Solution**: ${idea.leanCanvas.solution}
- **Key Metrics**: ${idea.leanCanvas.keyMetrics}
- **Channels**: ${idea.leanCanvas.channels}
- **Cost Structure**: ${idea.leanCanvas.costStructure}
- **Revenue Streams**: ${idea.leanCanvas.revenueStreams}
- **Unfair Advantage**: ${idea.leanCanvas.unfairAdvantage}

## 7. Blue Ocean Strategy
- **New Market Space**: ${idea.blueOcean.newMarketSpace}
- **Make Competition Irrelevant**: ${idea.blueOcean.makeCompetitionIrrelevant}

## 8. TAM/SAM/SOM
- **TAM**: ${idea.marketSize.tam}
- **SAM**: ${idea.marketSize.sam}
- **SOM**: ${idea.marketSize.som}

## Summary
- **Confidence**: ${idea.confidence}%
- **Rating**: ${idea.rating}/10
- **Key Differentiator**: ${idea.keyDifferentiator}
`

    navigator.clipboard.writeText(formattedIdea)
    toast({
      title: "Copied to clipboard",
      description: "Project idea has been copied to clipboard in Markdown format.",
    })
  }

  const handleExport = (format: string) => {
    if (!idea) return

    window.open(`/api/export/${params.id}/${format}`, "_blank")
  }

  const updateIdea = (field: string, value: any) => {
    if (!idea) return

    setIdea((prev) => {
      if (!prev) return prev

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
    if (!idea) return

    setIdea((prev) => {
      if (!prev) return prev

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

  const handleDelete = async () => {
    if (!idea || !user) return

    if (!confirm("Are you sure you want to delete this idea? This action cannot be undone.")) {
      return
    }

    try {
      const response = await fetch(`/api/ideas/${params.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete idea")
      }

      toast({
        title: "Project deleted",
        description: "Your project idea has been deleted successfully.",
      })

      router.push("/")
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete project. Please try again.",
        variant: "destructive",
      })
      console.error(err)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4">Loading idea...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !idea) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <p className="text-red-500">{error || "Failed to load idea"}</p>
            <Button asChild className="mt-4">
              <Link href="/">Return to Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    )
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
            <h1 className="text-3xl font-bold">Edit Project Idea</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCopyToClipboard}>
              <Copy className="mr-2 h-4 w-4" />
              Copy to Clipboard
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleExport("json")}>Export as JSON</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("csv")}>Export as CSV</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("markdown")}>Export as Markdown</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("pdf")}>Export as PDF</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Project
                </>
              )}
            </Button>
          </div>
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

          <TabsContent value="analysis" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>PESTEL Analysis</CardTitle>
                <CardDescription>External factors affecting the project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="pestel-political">Political</Label>
                  <Textarea
                    id="pestel-political"
                    value={idea.pestel.political}
                    onChange={(e) => updateIdea("pestel.political", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="pestel-economic">Economic</Label>
                  <Textarea
                    id="pestel-economic"
                    value={idea.pestel.economic}
                    onChange={(e) => updateIdea("pestel.economic", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="pestel-social">Social</Label>
                  <Textarea
                    id="pestel-social"
                    value={idea.pestel.social}
                    onChange={(e) => updateIdea("pestel.social", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="pestel-technological">Technological</Label>
                  <Textarea
                    id="pestel-technological"
                    value={idea.pestel.technological}
                    onChange={(e) => updateIdea("pestel.technological", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="pestel-environmental">Environmental</Label>
                  <Textarea
                    id="pestel-environmental"
                    value={idea.pestel.environmental}
                    onChange={(e) => updateIdea("pestel.environmental", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="pestel-legal">Legal</Label>
                  <Textarea
                    id="pestel-legal"
                    value={idea.pestel.legal}
                    onChange={(e) => updateIdea("pestel.legal", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Scenario Planning</CardTitle>
                <CardDescription>Potential future scenarios for the project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {idea.scenarios.map((scenario, index) => (
                  <div key={`scenario-${index}`}>
                    <Label htmlFor={`scenario-${index}`}>Scenario {index + 1}</Label>
                    <Textarea
                      id={`scenario-${index}`}
                      value={scenario}
                      onChange={(e) => updateArrayItem("scenarios", index, e.target.value)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SWOT Analysis</CardTitle>
                <CardDescription>Strengths, Weaknesses, Opportunities, and Threats</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Strengths</h3>
                    {idea.swot.strengths.map((strength, index) => (
                      <div key={`strength-${index}`}>
                        <Input
                          value={strength}
                          onChange={(e) => updateArrayItem("swot.strengths", index, e.target.value)}
                          placeholder={`Strength ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold">Weaknesses</h3>
                    {idea.swot.weaknesses.map((weakness, index) => (
                      <div key={`weakness-${index}`}>
                        <Input
                          value={weakness}
                          onChange={(e) => updateArrayItem("swot.weaknesses", index, e.target.value)}
                          placeholder={`Weakness ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold">Opportunities</h3>
                    {idea.swot.opportunities.map((opportunity, index) => (
                      <div key={`opportunity-${index}`}>
                        <Input
                          value={opportunity}
                          onChange={(e) => updateArrayItem("swot.opportunities", index, e.target.value)}
                          placeholder={`Opportunity ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold">Threats</h3>
                    {idea.swot.threats.map((threat, index) => (
                      <div key={`threat-${index}`}>
                        <Input
                          value={threat}
                          onChange={(e) => updateArrayItem("swot.threats", index, e.target.value)}
                          placeholder={`Threat ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Porter's Five Forces</CardTitle>
                <CardDescription>Competitive forces affecting the project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="porter-newEntrants">Threat of New Entrants</Label>
                  <Textarea
                    id="porter-newEntrants"
                    value={idea.portersFiveForces.newEntrants}
                    onChange={(e) => updateIdea("portersFiveForces.newEntrants", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="porter-supplierPower">Supplier Power</Label>
                  <Textarea
                    id="porter-supplierPower"
                    value={idea.portersFiveForces.supplierPower}
                    onChange={(e) => updateIdea("portersFiveForces.supplierPower", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="porter-buyerPower">Buyer Power</Label>
                  <Textarea
                    id="porter-buyerPower"
                    value={idea.portersFiveForces.buyerPower}
                    onChange={(e) => updateIdea("portersFiveForces.buyerPower", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="porter-substitutes">Threat of Substitutes</Label>
                  <Textarea
                    id="porter-substitutes"
                    value={idea.portersFiveForces.substitutes}
                    onChange={(e) => updateIdea("portersFiveForces.substitutes", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="porter-rivalry">Competitive Rivalry</Label>
                  <Textarea
                    id="porter-rivalry"
                    value={idea.portersFiveForces.rivalry}
                    onChange={(e) => updateIdea("portersFiveForces.rivalry", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="strategy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Lean Canvas</CardTitle>
                <CardDescription>Business model canvas for the project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="lean-problem">Problem</Label>
                  <Textarea
                    id="lean-problem"
                    value={idea.leanCanvas.problem}
                    onChange={(e) => updateIdea("leanCanvas.problem", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="lean-customerSegments">Customer Segments</Label>
                  <Textarea
                    id="lean-customerSegments"
                    value={idea.leanCanvas.customerSegments}
                    onChange={(e) => updateIdea("leanCanvas.customerSegments", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="lean-uniqueValueProposition">Unique Value Proposition</Label>
                  <Textarea
                    id="lean-uniqueValueProposition"
                    value={idea.leanCanvas.uniqueValueProposition}
                    onChange={(e) => updateIdea("leanCanvas.uniqueValueProposition", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="lean-solution">Solution</Label>
                  <Textarea
                    id="lean-solution"
                    value={idea.leanCanvas.solution}
                    onChange={(e) => updateIdea("leanCanvas.solution", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="lean-keyMetrics">Key Metrics</Label>
                  <Textarea
                    id="lean-keyMetrics"
                    value={idea.leanCanvas.keyMetrics}
                    onChange={(e) => updateIdea("leanCanvas.keyMetrics", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="lean-channels">Channels</Label>
                  <Textarea
                    id="lean-channels"
                    value={idea.leanCanvas.channels}
                    onChange={(e) => updateIdea("leanCanvas.channels", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="lean-costStructure">Cost Structure</Label>
                  <Textarea
                    id="lean-costStructure"
                    value={idea.leanCanvas.costStructure}
                    onChange={(e) => updateIdea("leanCanvas.costStructure", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="lean-revenueStreams">Revenue Streams</Label>
                  <Textarea
                    id="lean-revenueStreams"
                    value={idea.leanCanvas.revenueStreams}
                    onChange={(e) => updateIdea("leanCanvas.revenueStreams", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="lean-unfairAdvantage">Unfair Advantage</Label>
                  <Textarea
                    id="lean-unfairAdvantage"
                    value={idea.leanCanvas.unfairAdvantage}
                    onChange={(e) => updateIdea("leanCanvas.unfairAdvantage", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Blue Ocean Strategy</CardTitle>
                <CardDescription>Creating uncontested market space</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="blue-newMarketSpace">New Market Space</Label>
                  <Textarea
                    id="blue-newMarketSpace"
                    value={idea.blueOcean.newMarketSpace}
                    onChange={(e) => updateIdea("blueOcean.newMarketSpace", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="blue-makeCompetitionIrrelevant">Make Competition Irrelevant</Label>
                  <Textarea
                    id="blue-makeCompetitionIrrelevant"
                    value={idea.blueOcean.makeCompetitionIrrelevant}
                    onChange={(e) => updateIdea("blueOcean.makeCompetitionIrrelevant", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="market" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>TAM/SAM/SOM</CardTitle>
                <CardDescription>
                  Total Addressable Market, Serviceable Available Market, Serviceable Obtainable Market
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="market-tam">TAM</Label>
                  <Textarea
                    id="market-tam"
                    value={idea.marketSize.tam}
                    onChange={(e) => updateIdea("marketSize.tam", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="market-sam">SAM</Label>
                  <Textarea
                    id="market-sam"
                    value={idea.marketSize.sam}
                    onChange={(e) => updateIdea("marketSize.sam", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="market-som">SOM</Label>
                  <Textarea
                    id="market-som"
                    value={idea.marketSize.som}
                    onChange={(e) => updateIdea("marketSize.som", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {idea && (
          <div className="space-y-6">
            <AIRecommendations idea={idea} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SynergyEvaluation idea={idea} />
              <ImpactAssessment idea={idea} />
            </div>

            <ChangeHistory ideaId={params.id} />
          </div>
        )}
      </div>
    </div>
  )
}