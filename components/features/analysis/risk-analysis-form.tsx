"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileUploader } from "@/components/file-uploader"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, AlertCircle } from "lucide-react"
import { ErrorBoundary } from "@/components/error-boundary"
import { reportHandledError } from "@/lib/client-error-handler"

interface RiskAnalysisFormProps {
  onAnalysisComplete: (results: any) => void
}

export function RiskAnalysisForm({ onAnalysisComplete }: RiskAnalysisFormProps) {
  const [projectName, setProjectName] = useState("")
  const [projectUrl, setProjectUrl] = useState("")
  const [documentFile, setDocumentFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const handleDocumentUpload = (file: File | null) => {
    setDocumentFile(file)
    setError(null)

    if (file) {
      toast({
        title: "Document uploaded",
        description: `${file.name} has been uploaded successfully.`,
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validation
    if (!projectName && !projectUrl && !documentFile) {
      setError("Please provide a project name, URL, or upload a document.")
      return
    }

    setIsAnalyzing(true)

    try {
      const formData = new FormData()
      if (projectName) formData.append("projectName", projectName)
      if (projectUrl) formData.append("projectUrl", projectUrl)
      if (documentFile) formData.append("document", documentFile)

      const response = await fetch("/api/analyze/document", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || "Failed to analyze document")
      }

      const results = await response.json()
      onAnalysisComplete(results)

      toast({
        title: "Analysis complete",
        description: "Document analysis has been completed successfully.",
      })
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err))

      // Report the error to our tracking system
      reportHandledError(error, {
        component: "RiskAnalysisForm",
        projectName,
        hasFile: !!documentFile,
      })

      setError(error.message || "An unexpected error occurred. Please try again.")

      toast({
        title: "Analysis failed",
        description: "Failed to analyze document. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <ErrorBoundary>
      <Card>
        <CardHeader>
          <CardTitle>Risk Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-destructive/10 text-destructive p-3 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

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
              <Label htmlFor="project-url">Project URL</Label>
              <Input
                id="project-url"
                value={projectUrl}
                onChange={(e) => setProjectUrl(e.target.value)}
                placeholder="e.g., https://github.com/uniswap"
              />
            </div>

            <div>
              <Label>Upload Document</Label>
              <FileUploader
                accept=".pdf,.doc,.docx,.zip,.tar.gz"
                onFileUpload={handleDocumentUpload}
                description="Upload a whitepaper or code repository"
              />
            </div>

            <Button type="submit" disabled={isAnalyzing} className="w-full">
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Start Analysis"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </ErrorBoundary>
  )
}
