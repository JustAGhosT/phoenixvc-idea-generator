"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, MessageSquare, ImageIcon, FileBarChart, ExternalLink, Search } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"

export default function AnalysisHistoryPage() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState("documents")
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [documentAnalyses, setDocumentAnalyses] = useState<any[]>([])
  const [sentimentAnalyses, setSentimentAnalyses] = useState<any[]>([])
  const [visualizations, setVisualizations] = useState<any[]>([])
  const [summaries, setSummaries] = useState<any[]>([])

  useEffect(() => {
    if (session?.user) {
      fetchAnalysisHistory()
    }
  }, [session])

  const fetchAnalysisHistory = async () => {
    setIsLoading(true)
    try {
      // Fetch document analyses
      const docResponse = await fetch("/api/history/documents")
      if (docResponse.ok) {
        const data = await docResponse.json()
        setDocumentAnalyses(data)
      }

      // Fetch sentiment analyses
      const sentimentResponse = await fetch("/api/history/sentiment")
      if (sentimentResponse.ok) {
        const data = await sentimentResponse.json()
        setSentimentAnalyses(data)
      }

      // Fetch visualizations
      const vizResponse = await fetch("/api/history/visualizations")
      if (vizResponse.ok) {
        const data = await vizResponse.json()
        setVisualizations(data)
      }

      // Fetch summaries
      const summaryResponse = await fetch("/api/history/summaries")
      if (summaryResponse.ok) {
        const data = await summaryResponse.json()
        setSummaries(data)
      }
    } catch (error) {
      console.error("Error fetching analysis history:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredDocuments = documentAnalyses.filter((doc) =>
    doc.documentName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredSentiment = sentimentAnalyses.filter((analysis) =>
    analysis.projectName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredVisualizations = visualizations.filter((viz) =>
    viz.projectName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredSummaries = summaries.filter((summary) =>
    summary.projectName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Analysis History</h1>

      <div className="mb-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <Label htmlFor="search" className="sr-only">
              Search
            </Label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search by project or document name..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={fetchAnalysisHistory}>Refresh</Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Document Analysis
          </TabsTrigger>
          <TabsTrigger value="sentiment" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Sentiment Analysis
          </TabsTrigger>
          <TabsTrigger value="visualizations" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Visualizations
          </TabsTrigger>
          <TabsTrigger value="summaries" className="flex items-center gap-2">
            <FileBarChart className="h-4 w-4" />
            Project Summaries
          </TabsTrigger>
        </TabsList>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Document Analysis History</CardTitle>
              <CardDescription>View your past document analyses for whitepapers and code repositories</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">Loading document analyses...</div>
              ) : filteredDocuments.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {searchTerm ? "No matching document analyses found" : "No document analyses yet"}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Risk Score</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDocuments.map((analysis) => (
                      <TableRow key={analysis.id}>
                        <TableCell className="font-medium">{analysis.documentName}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {analysis.documentType.charAt(0).toUpperCase() + analysis.documentType.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{format(new Date(analysis.createdAt), "MMM d, yyyy")}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              analysis.analysisResults.score >= 80
                                ? "bg-green-500"
                                : analysis.analysisResults.score >= 60
                                  ? "bg-amber-500"
                                  : "bg-red-500"
                            }
                          >
                            {analysis.analysisResults.score}/100
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button asChild size="sm" variant="outline">
                              <Link href={`/analysis/${analysis.id}`}>View</Link>
                            </Button>
                            {analysis.documentUrl && (
                              <Button asChild size="sm" variant="outline">
                                <a href={analysis.documentUrl} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sentiment">
          <Card>
            <CardHeader>
              <CardTitle>Sentiment Analysis History</CardTitle>
              <CardDescription>View your past sentiment analyses across social platforms</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">Loading sentiment analyses...</div>
              ) : filteredSentiment.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {searchTerm ? "No matching sentiment analyses found" : "No sentiment analyses yet"}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Sentiment</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSentiment.map((analysis) => (
                      <TableRow key={analysis.id}>
                        <TableCell className="font-medium">{analysis.projectName}</TableCell>
                        <TableCell>{format(new Date(analysis.createdAt), "MMM d, yyyy")}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              analysis.analysisResults.overallSentiment.positive > 60
                                ? "bg-green-500"
                                : analysis.analysisResults.overallSentiment.positive > 40
                                  ? "bg-amber-500"
                                  : "bg-red-500"
                            }
                          >
                            {analysis.analysisResults.overallSentiment.positive > 60
                              ? "Positive"
                              : analysis.analysisResults.overallSentiment.positive > 40
                                ? "Neutral"
                                : "Negative"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button asChild size="sm" variant="outline">
                            <Link href={`/analysis/${analysis.id}?type=sentiment`}>View</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visualizations">
          <Card>
            <CardHeader>
              <CardTitle>Visualization History</CardTitle>
              <CardDescription>View your past project visualizations</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">Loading visualizations...</div>
              ) : filteredVisualizations.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {searchTerm ? "No matching visualizations found" : "No visualizations yet"}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {filteredVisualizations.map((viz) => (
                    <Card key={viz.id} className="overflow-hidden">
                      <div className="aspect-square relative">
                        <img
                          src={viz.imageUrl || "/placeholder.svg"}
                          alt={`${viz.projectName} - ${viz.visualizationType}`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium">{viz.projectName}</h3>
                            <p className="text-xs text-muted-foreground">
                              {format(new Date(viz.createdAt), "MMM d, yyyy")}
                            </p>
                          </div>
                          <Badge variant="outline">
                            {viz.visualizationType.charAt(0).toUpperCase() + viz.visualizationType.slice(1)}
                          </Badge>
                        </div>
                        <Button asChild size="sm" variant="outline" className="w-full mt-2">
                          <a href={viz.imageUrl} target="_blank" rel="noopener noreferrer">
                            View Full Size
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summaries">
          <Card>
            <CardHeader>
              <CardTitle>Project Summary History</CardTitle>
              <CardDescription>View your past project investment summaries</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">Loading project summaries...</div>
              ) : filteredSummaries.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {searchTerm ? "No matching project summaries found" : "No project summaries yet"}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Investment Potential</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSummaries.map((summary) => (
                      <TableRow key={summary.id}>
                        <TableCell className="font-medium">{summary.projectName}</TableCell>
                        <TableCell>{format(new Date(summary.createdAt), "MMM d, yyyy")}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              summary.summaryContent.executive?.investmentPotential === "High"
                                ? "bg-green-500"
                                : summary.summaryContent.executive?.investmentPotential === "Medium"
                                  ? "bg-amber-500"
                                  : "bg-red-500"
                            }
                          >
                            {summary.summaryContent.executive?.investmentPotential || "Unknown"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button asChild size="sm" variant="outline">
                            <Link href={`/analysis/${summary.id}?type=summary`}>View</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
