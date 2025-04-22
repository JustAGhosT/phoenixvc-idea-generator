"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useSession } from "next-auth/react"
import { FileUploader } from "@/components/file-uploader"
import { ImageGenerator } from "@/components/image-generator"
import { ProjectSummary } from "@/components/project-summary"
import { SentimentAnalysis } from "@/components/sentiment-analysis"
import { DocumentAnalysis } from "@/components/document-analysis"
import { Loader2, FileText, MessageSquare, ImageIcon, FileBarChart, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function RiskAnalysisPage() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("document")
  const [projectName, setProjectName] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const [projectUrl, setProjectUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [documentFile, setDocumentFile] = useState<File | null>(null)
  const [documentType, setDocumentType] = useState<"whitepaper" | "code">("whitepaper")
  const [analysisResults, setAnalysisResults] = useState<any>(null)
  const [sentimentResults, setSentimentResults] = useState<any>(null)
  const [projectId, setProjectId] = useState<string | null>(null)

  const handleDocumentUpload = (file: File | null) => {
    setDocumentFile(file)
    if (file) {
      toast({
        title: "Document uploaded",
        description: `${file.name} has been uploaded successfully.`,
      })
    }
  }

  const handleDocumentAnalysis = async () => {
    if (!documentFile && !projectUrl) {
      toast({
        title: "Missing information",
        description: "Please upload a document or provide a project URL.",
        variant: "destructive",
      })
      return
    }

    if (!session?.user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to analyze documents.",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)

    try {
      const formData = new FormData()
      if (documentFile) {
        formData.append("document", documentFile)
      }
      if (projectUrl) {
        formData.append("url", projectUrl)
      }
      if (projectName) {
        formData.append("projectName", projectName)
      }
      if (projectId) {
        formData.append("projectId", projectId)
      }
      formData.append("documentType", documentType)

      const response = await fetch("/api/analyze/document", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to analyze document")
      }

      const data = await response.json()
      setAnalysisResults(data)

      toast({
        title: "Analysis complete",
        description: "Document analysis has been completed successfully.",
      })
    } catch (error) {
      console.error("Error analyzing document:", error)
      toast({
        title: "Analysis failed",
        description: "Failed to analyze document. Please try again.",
        variant: "destructive",
      })

      // For demo purposes, set mock analysis results
      setAnalysisResults({
        summary:
          "This project aims to create a cross-chain DeFi protocol that enables seamless liquidity provision across multiple blockchains.",
        riskFactors: [
          {
            category: "Security",
            description: "Complex cross-chain operations may introduce security vulnerabilities",
            severity: "high",
            recommendation: "Implement comprehensive security audits and formal verification",
          },
          {
            category: "Technical",
            description: "Dependency on external oracle services for price feeds",
            severity: "medium",
            recommendation: "Use multiple oracle sources with fallback mechanisms",
          },
          {
            category: "Regulatory",
            description: "Unclear regulatory status in multiple jurisdictions",
            severity: "high",
            recommendation: "Consult legal experts and consider geo-fencing certain features",
          },
        ],
        strengths: [
          "Innovative approach to cross-chain liquidity",
          "Strong technical team with proven track record",
          "Clear market positioning and differentiation",
        ],
        tokenomics: {
          distribution: {
            team: "15%",
            investors: "20%",
            community: "40%",
            treasury: "15%",
            liquidity: "10%",
          },
          vesting: "4-year vesting schedule with 1-year cliff for team and investors",
        },
        technicalArchitecture: "Multi-chain approach with cross-chain interoperability protocols",
        securityMeasures: "Multi-signature requirements for critical operations and time-locked upgrades",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleSentimentAnalysis = async () => {
    if (!projectName && !projectUrl) {
      toast({
        title: "Missing information",
        description: "Please provide a project name or URL.",
        variant: "destructive",
      })
      return
    }

    if (!session?.user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to analyze sentiment.",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)

    try {
      const response = await fetch("/api/analyze/sentiment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectName,
          projectUrl,
          projectId,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze sentiment")
      }

      const data = await response.json()
      setSentimentResults(data)

      toast({
        title: "Analysis complete",
        description: "Sentiment analysis has been completed successfully.",
      })
    } catch (error) {
      console.error("Error analyzing sentiment:", error)
      toast({
        title: "Analysis failed",
        description: "Failed to analyze sentiment. Please try again.",
        variant: "destructive",
      })

      // For demo purposes, set mock sentiment results
      setSentimentResults({
        overallSentiment: {
          positive: 65,
          neutral: 25,
          negative: 10,
        },
        platforms: [
          {
            platform: "Twitter",
            positive: 70,
            neutral: 20,
            negative: 10,
            volume: 5200,
            trending: "up",
            topTopics: ["Liquidity", "Cross-chain", "Security", "Governance"],
            timeData: {
              labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
              positive: [60, 65, 68, 70],
              neutral: [25, 22, 20, 20],
              negative: [15, 13, 12, 10],
            },
          },
          {
            platform: "Reddit",
            positive: 60,
            neutral: 30,
            negative: 10,
            volume: 3800,
            trending: "stable",
            topTopics: ["Technical", "Tokenomics", "Roadmap", "Team"],
            timeData: {
              labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
              positive: [58, 59, 60, 60],
              neutral: [32, 31, 30, 30],
              negative: [10, 10, 10, 10],
            },
          },
          {
            platform: "Discord",
            positive: 75,
            neutral: 20,
            negative: 5,
            volume: 8500,
            trending: "up",
            topTopics: ["Development", "Features", "Community", "Updates"],
            timeData: {
              labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
              positive: [70, 72, 73, 75],
              neutral: [22, 21, 20, 20],
              negative: [8, 7, 7, 5],
            },
          },
          {
            platform: "Telegram",
            positive: 55,
            neutral: 30,
            negative: 15,
            volume: 4200,
            trending: "down",
            topTopics: ["Price", "Marketing", "Partnerships", "Competition"],
            timeData: {
              labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
              positive: [60, 58, 56, 55],
              neutral: [25, 27, 29, 30],
              negative: [15, 15, 15, 15],
            },
          },
        ],
        riskFactors: [
          {
            category: "Community Perception",
            severity: "medium",
            description: "Concerns about centralization in governance structure",
          },
          {
            category: "Market Sentiment",
            severity: "low",
            description: "Questions about long-term sustainability of tokenomics",
          },
          {
            category: "Technical Perception",
            severity: "medium",
            description: "Skepticism about cross-chain security measures",
          },
        ],
        topKeywords: [
          { word: "innovative", sentiment: "positive", count: 45 },
          { word: "secure", sentiment: "positive", count: 38 },
          { word: "complex", sentiment: "negative", count: 22 },
          { word: "potential", sentiment: "positive", count: 35 },
          { word: "risky", sentiment: "negative", count: 18 },
          { word: "promising", sentiment: "positive", count: 42 },
          { word: "scalable", sentiment: "positive", count: 30 },
          { word: "expensive", sentiment: "negative", count: 15 },
        ],
        summary:
          "Overall, the project has a positive sentiment across most platforms, with particularly strong support on Discord. There are some concerns about governance centralization and cross-chain security, but the general perception is that the project is innovative and has significant potential. Twitter sentiment is improving, while Telegram shows some declining sentiment that may need attention.",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">DeFi Risk Intelligence</h1>
        <Button asChild variant="outline">
          <Link href="/analysis-history">
            View Analysis History
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Project Information</CardTitle>
            <CardDescription>Enter basic project details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="project-name">Project Name</Label>
                <Input
                  id="project-name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g., Uniswap, Aave, Compound"
                />
              </div>
              <div>
                <Label htmlFor="project-description">Project Description</Label>
                <Textarea
                  id="project-description"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="Brief description of the project"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="project-url">Project URL</Label>
                <Input
                  id="project-url"
                  value={projectUrl}
                  onChange={(e) => setProjectUrl(e.target.value)}
                  placeholder="e.g., https://github.com/uniswap"
                />
              </div>
              <div>
                <Label>Upload Whitepaper or Documentation</Label>
                <div className="mb-2">
                  <Tabs value={documentType} onValueChange={(value) => setDocumentType(value as "whitepaper" | "code")}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="whitepaper">Whitepaper</TabsTrigger>
                      <TabsTrigger value="code">Code Repository</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <FileUploader
                  accept={documentType === "whitepaper" ? ".pdf,.doc,.docx" : ".zip,.tar.gz,.rar"}
                  onFileUpload={handleDocumentUpload}
                  description={
                    documentType === "whitepaper"
                      ? "Upload a whitepaper (PDF, DOC, DOCX)"
                      : "Upload a code repository (ZIP, TAR.GZ, RAR)"
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button onClick={handleDocumentAnalysis} disabled={isAnalyzing} variant="outline">
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-4 w-4" />
                      Analyze Docs
                    </>
                  )}
                </Button>
                <Button onClick={handleSentimentAnalysis} disabled={isAnalyzing} variant="outline">
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Analyze Sentiment
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Risk Intelligence Dashboard</CardTitle>
            <CardDescription>Comprehensive risk assessment for venture capitalists</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="document" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Document Analysis
                </TabsTrigger>
                <TabsTrigger value="sentiment" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Sentiment Analysis
                </TabsTrigger>
                <TabsTrigger value="visualization" className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Visualization
                </TabsTrigger>
                <TabsTrigger value="summary" className="flex items-center gap-2">
                  <FileBarChart className="h-4 w-4" />
                  Investment Summary
                </TabsTrigger>
              </TabsList>

              <TabsContent value="document">
                <DocumentAnalysis
                  file={documentFile}
                  fileType={documentType}
                  onAnalysisComplete={(results) => setAnalysisResults(results)}
                  analysisResults={analysisResults}
                />
              </TabsContent>

              <TabsContent value="sentiment">
                <SentimentAnalysis results={sentimentResults} projectName={projectName} />
              </TabsContent>

              <TabsContent value="visualization">
                <ImageGenerator projectId={projectId} projectName={projectName || "DeFi Project"} />
              </TabsContent>

              <TabsContent value="summary">
                <ProjectSummary
                  projectName={projectName || "DeFi Project"}
                  projectId={projectId}
                  documentAnalysis={analysisResults}
                  sentimentAnalysis={sentimentResults}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
