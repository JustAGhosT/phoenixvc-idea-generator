"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { ideas, type Idea } from "@/lib/data"
import { ArrowLeft, Check, Copy, Save, Trash } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

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

export default function EditorPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const idParam = searchParams.get("id")

  const [idea, setIdea] = useState<Idea>(emptyIdea)
  const [isNew, setIsNew] = useState(false)

  useEffect(() => {
    if (idParam === "new") {
      setIdea({ ...emptyIdea, id: ideas.length + 1 })
      setIsNew(true)
    } else if (idParam) {
      const foundIdea = ideas.find((i) => i.id === Number.parseInt(idParam))
      if (foundIdea) {
        setIdea(foundIdea)
        setIsNew(false)
      }
    }
  }, [idParam])

  const handleSave = () => {
    toast({
      title: "Project saved",
      description: "Your project idea has been saved successfully.",
    })

    if (isNew) {
      router.push(`/editor?id=${idea.id}`)
      setIsNew(false)
    }
  }

  const handleCopyToClipboard = () => {
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
            <h1 className="text-3xl font-bold">{isNew ? "Create New Project Idea" : "Edit Project Idea"}</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCopyToClipboard}>
              <Copy className="mr-2 h-4 w-4" />
              Copy to Clipboard
            </Button>
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Project
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
                <CardTitle>Market Size</CardTitle>
                <CardDescription>TAM, SAM, and SOM for the project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="market-tam">Total Addressable Market (TAM)</Label>
                  <Textarea
                    id="market-tam"
                    value={idea.marketSize.tam}
                    onChange={(e) => updateIdea("marketSize.tam", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="market-sam">Serviceable Addressable Market (SAM)</Label>
                  <Textarea
                    id="market-sam"
                    value={idea.marketSize.sam}
                    onChange={(e) => updateIdea("marketSize.sam", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="market-som">Serviceable Obtainable Market (SOM)</Label>
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

        <div className="flex justify-between">
          <Button variant="outline" className="text-destructive">
            <Trash className="mr-2 h-4 w-4" />
            Delete Project
          </Button>
          <Button onClick={handleSave}>
            <Check className="mr-2 h-4 w-4" />
            {isNew ? "Create Project" : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  )
}
