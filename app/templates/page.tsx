"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { templateCategories, templates } from "@/lib/data"
import { ArrowRight, Copy, Download, FileText, Plus } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function TemplatesPage() {
  const { toast } = useToast()
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0])
  const [customTemplate, setCustomTemplate] = useState("")
  const [customTitle, setCustomTitle] = useState("")
  const [customDescription, setCustomDescription] = useState("")
  const [customCategory, setCustomCategory] = useState("defi")

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(selectedTemplate.template)
    toast({
      title: "Template copied",
      description: "Template has been copied to clipboard.",
    })
  }

  const handleDownloadTemplate = () => {
    const blob = new Blob([selectedTemplate.template], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${selectedTemplate.title.toLowerCase().replace(/\s+/g, "-")}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Template downloaded",
      description: "Template has been downloaded as a Markdown file.",
    })
  }

  const handleSaveCustomTemplate = () => {
    toast({
      title: "Template saved",
      description: "Your custom template has been saved.",
    })

    // Reset form
    setCustomTitle("")
    setCustomDescription("")
    setCustomTemplate("")
    setCustomCategory("defi")
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Analysis Templates</h1>
          <Button asChild>
            <Link href="#custom-template">
              <Plus className="mr-2 h-4 w-4" />
              Create Custom Template
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="browse">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="browse">Browse Templates</TabsTrigger>
            <TabsTrigger value="custom">Create Custom Template</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {templateCategories.map((category) => (
                <Card key={category.id} className="overflow-hidden">
                  <CardHeader className="bg-primary/5 pb-2">
                    <CardTitle>{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      {templates
                        .filter((template) => template.category === category.id)
                        .map((template) => (
                          <Button
                            key={template.id}
                            variant="outline"
                            className="w-full justify-start"
                            onClick={() => setSelectedTemplate(template)}
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            {template.title}
                          </Button>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{selectedTemplate.title}</CardTitle>
                    <CardDescription>{selectedTemplate.description}</CardDescription>
                  </div>
                  <Badge>{templateCategories.find((c) => c.id === selectedTemplate.category)?.name}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-md p-4 overflow-auto max-h-[500px]">
                  <pre className="text-sm whitespace-pre-wrap">{selectedTemplate.template}</pre>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleCopyTemplate}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Template
                  </Button>
                  <Button variant="outline" onClick={handleDownloadTemplate}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
                <Button asChild>
                  <Link href={`/editor?id=new&template=${selectedTemplate.id}`}>
                    Use Template
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="custom" id="custom-template" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create Custom Template</CardTitle>
                <CardDescription>Design your own analysis template for future use</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="custom-title">Template Title</Label>
                    <Input
                      id="custom-title"
                      value={customTitle}
                      onChange={(e) => setCustomTitle(e.target.value)}
                      placeholder="E.g., DeFi Protocol Analysis"
                    />
                  </div>
                  <div>
                    <Label htmlFor="custom-category">Category</Label>
                    <select
                      id="custom-category"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                    >
                      {templateCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="custom-description">Description</Label>
                  <Input
                    id="custom-description"
                    value={customDescription}
                    onChange={(e) => setCustomDescription(e.target.value)}
                    placeholder="Brief description of what this template is for"
                  />
                </div>
                <div>
                  <Label htmlFor="custom-template">Template Content (Markdown)</Label>
                  <Textarea
                    id="custom-template"
                    value={customTemplate}
                    onChange={(e) => setCustomTemplate(e.target.value)}
                    placeholder="# [Project Name] Analysis

## Section 1
- Point 1
- Point 2

## Section 2
- Point 1
- Point 2"
                    className="min-h-[400px] font-mono"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Preview Template</Button>
                <Button onClick={handleSaveCustomTemplate}>Save Template</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Template Tips</CardTitle>
                <CardDescription>Guidelines for creating effective analysis templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Structure</h3>
                    <p className="text-sm">
                      Use clear headings (# for main title, ## for sections, ### for subsections) to organize your
                      template.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Placeholders</h3>
                    <p className="text-sm">
                      Use square brackets [like this] to indicate where users should fill in their own content.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Formatting</h3>
                    <p className="text-sm">
                      Use Markdown formatting for emphasis: **bold**, *italic*, and bullet points with hyphens (-).
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Guidance</h3>
                    <p className="text-sm">
                      Include brief instructions or examples to help users understand what to include in each section.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Prompting Guide</CardTitle>
            <CardDescription>How to create effective prompts for AI-assisted analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Basic Prompt Structure</h3>
                <div className="bg-muted rounded-md p-4">
                  <pre className="text-sm whitespace-pre-wrap">{`Analyze the following [project type] idea:

# [Project Name]

## Brief Description
[2-3 sentence description of the project]

## Key Features
- [Feature 1]
- [Feature 2]
- [Feature 3]

Please provide a comprehensive analysis including:
1. SWOT Analysis
2. Market potential
3. Technical feasibility
4. Competitive landscape
5. Recommendations for improvement`}</pre>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-2">Advanced Prompt Techniques</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Specify Analysis Frameworks</h4>
                    <p className="text-sm">
                      Request specific frameworks like PESTEL, Porter's Five Forces, or Blue Ocean Strategy.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Include Constraints</h4>
                    <p className="text-sm">
                      Specify market conditions, regulatory environment, or technical limitations.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Request Multiple Perspectives</h4>
                    <p className="text-sm">Ask for both optimistic and pessimistic views on the project.</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Specify Output Format</h4>
                    <p className="text-sm">Request specific formats like bullet points, tables, or markdown.</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-2">Example Prompts by Category</h3>
                <Tabs defaultValue="defi">
                  <TabsList>
                    {templateCategories.map((category) => (
                      <TabsTrigger key={category.id} value={category.id}>
                        {category.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  <TabsContent value="defi" className="mt-4">
                    <div className="bg-muted rounded-md p-4">
                      <pre className="text-sm whitespace-pre-wrap">{`Analyze this DeFi protocol idea:

# [Protocol Name]

## Core Mechanism
[Describe the core financial mechanism]

## Target Users
[Who would use this protocol and why]

## Technical Architecture
[Brief description of how it would be implemented]

Please provide:
1. Analysis of capital efficiency compared to existing protocols
2. Potential risks (smart contract, economic, regulatory)
3. Liquidity acquisition strategy
4. Tokenomics recommendations
5. Go-to-market strategy for DeFi users`}</pre>
                    </div>
                  </TabsContent>

                  <TabsContent value="nft" className="mt-4">
                    <div className="bg-muted rounded-md p-4">
                      <pre className="text-sm whitespace-pre-wrap">{`Analyze this NFT project idea:

# [Collection Name]

## Concept
[Describe the artistic concept or utility]

## Unique Features
[What makes this collection different]

## Revenue Model
[How the project will generate ongoing revenue]

Please provide:
1. Analysis of market fit and timing
2. Community building strategy
3. Technical implementation recommendations
4. Secondary market potential
5. Partnerships and marketing approach`}</pre>
                    </div>
                  </TabsContent>

                  <TabsContent value="dao" className="mt-4">
                    <div className="bg-muted rounded-md p-4">
                      <pre className="text-sm whitespace-pre-wrap">{`Analyze this DAO structure:

# [DAO Name]

## Purpose
[What the DAO aims to achieve]

## Governance Model
[How decisions will be made]

## Treasury Management
[How funds will be managed]

Please provide:
1. Analysis of governance efficiency
2. Potential coordination problems
3. Incentive alignment recommendations
4. Legal structure considerations
5. Operational workflow suggestions`}</pre>
                    </div>
                  </TabsContent>

                  <TabsContent value="infrastructure" className="mt-4">
                    <div className="bg-muted rounded-md p-4">
                      <pre className="text-sm whitespace-pre-wrap">{`Analyze this blockchain infrastructure project:

# [Project Name]

## Technical Innovation
[Core technical advancement]

## Scalability Approach
[How it addresses blockchain scalability]

## Security Model
[Security approach and assumptions]

Please provide:
1. Technical feasibility assessment
2. Competitive analysis vs. existing solutions
3. Developer adoption strategy
4. Potential technical bottlenecks
5. Go-to-market recommendations`}</pre>
                    </div>
                  </TabsContent>

                  <TabsContent value="gaming" className="mt-4">
                    <div className="bg-muted rounded-md p-4">
                      <pre className="text-sm whitespace-pre-wrap">{`Analyze this blockchain gaming project:

# [Game Name]

## Core Gameplay
[Description of main gameplay loop]

## Web3 Integration
[How blockchain is integrated]

## Monetization
[Revenue model and token utility]

Please provide:
1. Analysis of player acquisition and retention
2. Economic sustainability assessment
3. Technical implementation recommendations
4. Competitive analysis vs. traditional games
5. Community building strategy`}</pre>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
