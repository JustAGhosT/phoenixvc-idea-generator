"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, AlertTriangle, CheckCircle, Loader2, Copy, FileBarChart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"

interface ProjectSummaryProps {
  projectName: string
  documentAnalysis?: any
  sentimentAnalysis?: any
}

export function ProjectSummary({ projectName, documentAnalysis, sentimentAnalysis }: ProjectSummaryProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [summary, setSummary] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("executive")
  const { toast } = useToast()

  const generateSummary = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch("/api/generate/summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectName,
          documentAnalysis,
          sentimentAnalysis,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate summary")
      }

      const data = await response.json()
      setSummary(data)
      toast({
        title: "Summary Generated",
        description: "Project summary has been generated successfully",
      })
    } catch (error) {
      console.error("Error generating summary:", error)
      toast({
        title: "Generation Failed",
        description: "Failed to generate the summary. Please try again.",
        variant: "destructive",
      })

      // For demo purposes, generate a mock summary
      setSummary({
        executive: {
          overview: `${projectName} is a promising DeFi project that aims to address key challenges in the decentralized finance space. Based on our analysis, this project shows moderate to strong potential for venture capital investment.`,
          keyStrengths: [
            "Innovative approach to cross-chain liquidity",
            "Strong technical team with proven track record",
            "Clear market positioning and differentiation",
          ],
          keyRisks: [
            "Regulatory uncertainty in key markets",
            "High competition in the DeFi lending space",
            "Technical complexity may delay time-to-market",
          ],
          investmentPotential: "Medium-High",
          recommendedAction: "Consider for investment with standard due diligence",
        },
        technical: {
          architecture:
            "The project utilizes a multi-chain approach with cross-chain interoperability protocols to enable seamless asset transfers and liquidity provision across different blockchain networks.",
          smartContracts:
            "Smart contracts are well-designed with proper security measures in place, including multi-signature requirements for critical operations and time-locked upgrades.",
          securityAudit: "Pending",
          technicalRisks: [
            "Complex cross-chain operations may introduce security vulnerabilities",
            "Dependency on external oracle services for price feeds",
          ],
          technicalStrengths: [
            "Innovative approach to solving cross-chain liquidity issues",
            "Well-documented codebase with comprehensive test coverage",
          ],
        },
        financial: {
          tokenomics: {
            distribution: {
              team: "15%",
              investors: "20%",
              community: "40%",
              treasury: "15%",
              liquidity: "10%",
            },
            vesting: "4-year vesting schedule with 1-year cliff for team and investors",
            tokenUtility: "Governance, staking, fee discounts, and protocol access",
          },
          marketPotential: {
            tam: "~$200 billion DeFi market",
            sam: "~$50 billion in cross-chain liquidity",
            som: "~$5 billion (10% market capture)",
          },
          revenueModel: "Fee-based model with revenue sharing for token holders",
          financialRisks: [
            "High competition in the DeFi space may limit market share",
            "Regulatory uncertainty could impact token value and utility",
          ],
        },
        regulatory: {
          complianceStatus: "Partial compliance, some jurisdictions pending",
          kyc: "Planned",
          aml: "Planned",
          jurisdictions: ["US (excluding certain states)", "EU", "UK", "Singapore", "Japan"],
          regulatoryRisks: [
            "Evolving regulatory landscape for DeFi projects",
            "Potential classification as a security in some jurisdictions",
          ],
        },
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = () => {
    if (!summary) return

    let text = `# ${projectName} - Investment Summary\n\n`

    // Executive Summary
    text += `## Executive Summary\n\n${summary.executive.overview}\n\n`
    text += `**Key Strengths:**\n${summary.executive.keyStrengths.map((s: string) => `- ${s}`).join("\n")}\n\n`
    text += `**Key Risks:**\n${summary.executive.keyRisks.map((r: string) => `- ${r}`).join("\n")}\n\n`
    text += `**Investment Potential:** ${summary.executive.investmentPotential}\n`
    text += `**Recommended Action:** ${summary.executive.recommendedAction}\n\n`

    // Technical Analysis
    text += `## Technical Analysis\n\n`
    text += `**Architecture:** ${summary.technical.architecture}\n\n`
    text += `**Smart Contracts:** ${summary.technical.smartContracts}\n\n`
    text += `**Security Audit:** ${summary.technical.securityAudit}\n\n`
    text += `**Technical Risks:**\n${summary.technical.technicalRisks.map((r: string) => `- ${r}`).join("\n")}\n\n`

    // Financial Analysis
    text += `## Financial Analysis\n\n`
    text += `**Token Distribution:**\n`
    Object.entries(summary.financial.tokenomics.distribution).forEach(([key, value]) => {
      text += `- ${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}\n`
    })
    text += `\n**Vesting:** ${summary.financial.tokenomics.vesting}\n\n`
    text += `**Market Potential:**\n`
    text += `- TAM: ${summary.financial.marketPotential.tam}\n`
    text += `- SAM: ${summary.financial.marketPotential.sam}\n`
    text += `- SOM: ${summary.financial.marketPotential.som}\n\n`

    // Regulatory Analysis
    text += `## Regulatory Analysis\n\n`
    text += `**Compliance Status:** ${summary.regulatory.complianceStatus}\n\n`
    text += `**KYC/AML:** KYC: ${summary.regulatory.kyc}, AML: ${summary.regulatory.aml}\n\n`
    text += `**Jurisdictions:** ${summary.regulatory.jurisdictions.join(", ")}\n\n`
    text += `**Regulatory Risks:**\n${summary.regulatory.regulatoryRisks.map((r: string) => `- ${r}`).join("\n")}\n\n`

    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to Clipboard",
      description: "The summary has been copied to your clipboard",
    })
  }

  const renderInvestmentPotentialBadge = (potential: string) => {
    switch (potential.toLowerCase()) {
      case "high":
        return <Badge className="bg-green-500">High Potential</Badge>
      case "medium-high":
        return <Badge className="bg-green-400">Medium-High Potential</Badge>
      case "medium":
        return <Badge className="bg-amber-500">Medium Potential</Badge>
      case "medium-low":
        return <Badge className="bg-amber-400">Medium-Low Potential</Badge>
      case "low":
        return <Badge variant="destructive">Low Potential</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileBarChart className="h-5 w-5" />
          Project Investment Summary
        </CardTitle>
        <CardDescription>AI-generated investment summary for venture capital decision-making</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {!summary ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Generate a concise, data-driven summary of the DeFi project highlighting key investment potential,
                critical risk factors, and overall project viability, tailored for quick review by VCs.
              </p>
              <Button onClick={generateSummary} disabled={isGenerating} className="w-full">
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Summary...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Investment Summary
                  </>
                )}
              </Button>
            </div>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid grid-cols-4">
                <TabsTrigger value="executive">Executive</TabsTrigger>
                <TabsTrigger value="technical">Technical</TabsTrigger>
                <TabsTrigger value="financial">Financial</TabsTrigger>
                <TabsTrigger value="regulatory">Regulatory</TabsTrigger>
              </TabsList>

              <TabsContent value="executive" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium">Executive Summary</h3>
                    {renderInvestmentPotentialBadge(summary.executive.investmentPotential)}
                  </div>

                  <p>{summary.executive.overview}</p>

                  <div>
                    <h4 className="font-medium mb-2">Key Strengths</h4>
                    <div className="space-y-2">
                      {summary.executive.keyStrengths.map((strength: string, index: number) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <p>{strength}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Key Risks</h4>
                    <div className="space-y-2">
                      {summary.executive.keyRisks.map((risk: string, index: number) => (
                        <div key={index} className="flex items-start gap-2">
                          <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                          <p>{risk}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-md">
                    <h4 className="font-medium mb-2">Recommendation</h4>
                    <p>{summary.executive.recommendedAction}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="technical" className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Technical Architecture</h3>
                  <p>{summary.technical.architecture}</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Smart Contracts</h3>
                  <p>{summary.technical.smartContracts}</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Security Audit Status</h3>
                  <div className="flex items-center gap-2">
                    {summary.technical.securityAudit === "Passed" ? (
                      <Badge className="bg-green-500">Passed</Badge>
                    ) : (
                      <Badge variant="outline" className="bg-amber-100 text-amber-800">
                        Pending
                      </Badge>
                    )}
                    <span>
                      {summary.technical.securityAudit === "Passed"
                        ? "Security audit completed with no critical issues"
                        : "Security audit in progress or pending"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Technical Risks</h4>
                    <div className="space-y-2">
                      {summary.technical.technicalRisks.map((risk: string, index: number) => (
                        <div key={index} className="flex items-start gap-2">
                          <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                          <p className="text-sm">{risk}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Technical Strengths</h4>
                    <div className="space-y-2">
                      {summary.technical.technicalStrengths.map((strength: string, index: number) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <p className="text-sm">{strength}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="financial" className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Tokenomics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {Object.entries(summary.financial.tokenomics.distribution).map(([key, value]) => (
                      <div key={key} className="bg-muted p-3 rounded-md text-center">
                        <div className="text-lg font-bold">{value}</div>
                        <div className="text-xs text-muted-foreground">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 text-sm">
                    <strong>Vesting:</strong> {summary.financial.tokenomics.vesting}
                  </div>
                  <div className="mt-1 text-sm">
                    <strong>Token Utility:</strong> {summary.financial.tokenomics.tokenUtility}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Market Potential</h3>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Total Addressable Market (TAM)</span>
                        <span>{summary.financial.marketPotential.tam}</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Serviceable Available Market (SAM)</span>
                        <span>{summary.financial.marketPotential.sam}</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Serviceable Obtainable Market (SOM)</span>
                        <span>{summary.financial.marketPotential.som}</span>
                      </div>
                      <Progress value={20} className="h-2" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Revenue Model</h3>
                  <p>{summary.financial.revenueModel}</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Financial Risks</h3>
                  <div className="space-y-2">
                    {summary.financial.financialRisks.map((risk: string, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                        <p>{risk}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="regulatory" className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Compliance Status</h3>
                  <p>{summary.regulatory.complianceStatus}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">KYC Implementation</h4>
                    <div className="flex items-center gap-2">
                      {summary.regulatory.kyc === "Implemented" ? (
                        <Badge className="bg-green-500">Implemented</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-amber-100 text-amber-800">
                          Planned
                        </Badge>
                      )}
                      <span>{summary.regulatory.kyc}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">AML Implementation</h4>
                    <div className="flex items-center gap-2">
                      {summary.regulatory.aml === "Implemented" ? (
                        <Badge className="bg-green-500">Implemented</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-amber-100 text-amber-800">
                          Planned
                        </Badge>
                      )}
                      <span>{summary.regulatory.aml}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Supported Jurisdictions</h3>
                  <div className="flex flex-wrap gap-2">
                    {summary.regulatory.jurisdictions.map((jurisdiction: string, index: number) => (
                      <Badge key={index} variant="outline">
                        {jurisdiction}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Regulatory Risks</h3>
                  <div className="space-y-2">
                    {summary.regulatory.regulatoryRisks.map((risk: string, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                        <p>{risk}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </CardContent>
      {summary && (
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">Generated using Deep Infra AI</div>
          <Button variant="outline" onClick={copyToClipboard}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Summary
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
