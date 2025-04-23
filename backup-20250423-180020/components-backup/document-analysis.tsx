"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileUploader } from "@/components/file-uploader"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FileText, AlertTriangle, FileCode, File } from "lucide-react"

interface Risk {
  category: string
  severity: "high" | "medium" | "low"
  description: string
  recommendation: string
}

interface DocumentAnalysisResult {
  risks: Risk[]
  summary: string
  score: number
  codeQuality?: {
    score: number
    issues: {
      category: string
      count: number
      examples: string[]
    }[]
  }
  tokenomics?: {
    score: number
    issues: {
      category: string
      severity: "high" | "medium" | "low"
      description: string
    }[]
  }
}

export function DocumentAnalysis() {
  const [file, setFile] = useState<File | null>(null)
  const [fileType, setFileType] = useState<"whitepaper" | "code">("whitepaper")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<DocumentAnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (uploadedFile: File | null) => {
    setFile(uploadedFile)
    setResult(null)
    setError(null)
  }

  const analyzeDocument = async () => {
    if (!file) {
      setError("Please upload a file before analyzing.")
      return
    }

    setIsAnalyzing(true)
    setProgress(0)
    setError(null)

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval)
          return prev
        }
        return prev + 5
      })
    }, 500)

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("fileType", fileType)

      const response = await fetch("/api/analyze/document", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to analyze document")
      }

      clearInterval(progressInterval)
      setProgress(100)

      // Simulate API response for demo
      setTimeout(() => {
        if (fileType === "whitepaper") {
          setResult({
            risks: [
              {
                category: "Regulatory",
                severity: "high",
                description:
                  "Project may face regulatory challenges in multiple jurisdictions due to token classification as a security.",
                recommendation: "Consult legal experts and consider restructuring token utility aspects.",
              },
              {
                category: "Tokenomics",
                severity: "medium",
                description:
                  "High initial token allocation to team (25%) with short vesting period may create selling pressure.",
                recommendation: "Extend vesting period and reduce initial team allocation.",
              },
              {
                category: "Technical",
                severity: "low",
                description: "Reliance on external oracles creates potential points of failure.",
                recommendation: "Implement multiple oracle sources and fallback mechanisms.",
              },
            ],
            summary:
              "The whitepaper presents a novel DeFi lending protocol with cross-chain capabilities. While the technical approach is sound, there are significant regulatory concerns and some tokenomics issues that need addressing.",
            score: 68,
            tokenomics: {
              score: 65,
              issues: [
                {
                  category: "Distribution",
                  severity: "medium",
                  description: "High initial token allocation to team (25%) with short vesting period.",
                },
                {
                  category: "Inflation",
                  severity: "medium",
                  description: "High emission rate in first year may dilute early investors.",
                },
                {
                  category: "Utility",
                  severity: "low",
                  description: "Token utility is primarily governance with limited other use cases.",
                },
              ],
            },
          })
        } else {
          setResult({
            risks: [
              {
                category: "Security",
                severity: "high",
                description: "Potential reentrancy vulnerability in lending contract.",
                recommendation: "Implement reentrancy guards and follow checks-effects-interactions pattern.",
              },
              {
                category: "Optimization",
                severity: "medium",
                description: "Inefficient gas usage in batch processing functions.",
                recommendation: "Refactor batch processing to reduce gas costs.",
              },
              {
                category: "Maintainability",
                severity: "low",
                description: "Limited documentation and test coverage.",
                recommendation: "Improve inline documentation and increase test coverage.",
              },
            ],
            summary:
              "The codebase implements a lending protocol with cross-chain capabilities. While functionally complete, there are several security concerns that should be addressed before deployment.",
            score: 72,
            codeQuality: {
              score: 68,
              issues: [
                {
                  category: "Security",
                  count: 3,
                  examples: ["Reentrancy vulnerability", "Unchecked return values", "Timestamp dependence"],
                },
                {
                  category: "Gas Optimization",
                  count: 5,
                  examples: ["Redundant storage reads", "Unoptimized loops", "Excessive event emissions"],
                },
                {
                  category: "Best Practices",
                  count: 7,
                  examples: ["Missing input validation", "Hardcoded addresses", "Insufficient error handling"],
                },
              ],
            },
          })
        }
        setIsAnalyzing(false)
      }, 2000)
    } catch (err) {
      clearInterval(progressInterval)
      setError("Failed to analyze document. Please try again.")
      setIsAnalyzing(false)
      console.error(err)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Document Analysis
        </CardTitle>
        <CardDescription>Upload a whitepaper or code repository for AI-powered risk analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="whitepaper" onValueChange={(value) => setFileType(value as "whitepaper" | "code")}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="whitepaper" className="flex items-center gap-2">
              <File className="h-4 w-4" />
              Whitepaper
            </TabsTrigger>
            <TabsTrigger value="code" className="flex items-center gap-2">
              <FileCode className="h-4 w-4" />
              Code Repository
            </TabsTrigger>
          </TabsList>

          <TabsContent value="whitepaper">
            <div className="space-y-4">
              <FileUploader
                accept=".pdf,.doc,.docx"
                maxSize={10}
                onFileChange={handleFileChange}
                description="Upload a whitepaper (PDF, DOC, DOCX up to 10MB)"
              />
            </div>
          </TabsContent>

          <TabsContent value="code">
            <div className="space-y-4">
              <FileUploader
                accept=".zip,.tar.gz,.rar"
                maxSize={50}
                onFileChange={handleFileChange}
                description="Upload a code repository (ZIP, TAR.GZ, RAR up to 50MB)"
              />
            </div>
          </TabsContent>
        </Tabs>

        {file && !isAnalyzing && !result && (
          <div className="mt-4">
            <Button onClick={analyzeDocument} className="w-full">
              Analyze {fileType === "whitepaper" ? "Whitepaper" : "Code"}
            </Button>
          </div>
        )}

        {isAnalyzing && (
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Analyzing document...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground">
              {progress < 30 && "Extracting content..."}
              {progress >= 30 && progress < 60 && "Identifying risk factors..."}
              {progress >= 60 && progress < 90 && "Generating recommendations..."}
              {progress >= 90 && "Finalizing analysis..."}
            </p>
          </div>
        )}

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result && (
          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Analysis Summary</h3>
              <p className="text-sm text-muted-foreground">{result.summary}</p>
              <div className="mt-4 flex items-center">
                <div className="text-2xl font-bold mr-2 flex items-center">
                  <span className={getScoreColor(result.score)}>{result.score}</span>
                  <span className="text-sm text-muted-foreground ml-1">/100</span>
                </div>
                <div className="flex-1">
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        result.score >= 80 ? "bg-green-500" : result.score >= 60 ? "bg-yellow-500" : "bg-red-500"
                      }`}
                      style={{ width: `${result.score}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Key Risk Factors</h3>
              <div className="space-y-3">
                {result.risks.map((risk, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium">{risk.category}</div>
                      <Badge className={getSeverityColor(risk.severity)}>
                        {risk.severity.charAt(0).toUpperCase() + risk.severity.slice(1)} Risk
                      </Badge>
                    </div>
                    <p className="text-sm mb-2">{risk.description}</p>
                    <div className="text-sm">
                      <span className="font-medium">Recommendation:</span> {risk.recommendation}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {result.codeQuality && (
              <div>
                <h3 className="text-lg font-medium mb-2">Code Quality Assessment</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="border rounded-lg p-3">
                    <div className="text-sm text-muted-foreground mb-1">Overall Score</div>
                    <div className={`text-2xl font-bold ${getScoreColor(result.codeQuality.score)}`}>
                      {result.codeQuality.score}/100
                    </div>
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="text-sm text-muted-foreground mb-1">Total Issues</div>
                    <div className="text-2xl font-bold">
                      {result.codeQuality.issues.reduce((acc, issue) => acc + issue.count, 0)}
                    </div>
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="text-sm text-muted-foreground mb-1">Categories</div>
                    <div className="text-2xl font-bold">{result.codeQuality.issues.length}</div>
                  </div>
                </div>
                <div className="space-y-3">
                  {result.codeQuality.issues.map((issue, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">{issue.category}</div>
                        <Badge variant="outline">{issue.count} issues</Badge>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Examples:</span>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          {issue.examples.map((example, i) => (
                            <li key={i}>{example}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.tokenomics && (
              <div>
                <h3 className="text-lg font-medium mb-2">Tokenomics Assessment</h3>
                <div className="border rounded-lg p-3 mb-4">
                  <div className="text-sm text-muted-foreground mb-1">Tokenomics Score</div>
                  <div className={`text-2xl font-bold ${getScoreColor(result.tokenomics.score)}`}>
                    {result.tokenomics.score}/100
                  </div>
                </div>
                <div className="space-y-3">
                  {result.tokenomics.issues.map((issue, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">{issue.category}</div>
                        <Badge className={getSeverityColor(issue.severity)}>
                          {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm">{issue.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">Powered by Deep Infra AI</div>
        {result && (
          <Button variant="outline" onClick={() => window.print()}>
            Export Analysis
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
