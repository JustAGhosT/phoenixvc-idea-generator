// Core data types
export type Idea = {
  id: number | string
  title: string
  confidence: number
  rating: number
  keyDifferentiator: string
  perspectives: {
    positive: string[]
    negative: string[]
  }
  jtbd: {
    core: string
    functional: string
    emotional: string
    social: string
  }
  pestel: {
    political: string
    economic: string
    social: string
    technological: string
    environmental: string
    legal: string
  }
  scenarios: string[]
  swot: {
    strengths: string[]
    weaknesses: string[]
    opportunities: string[]
    threats: string[]
  }
  portersFiveForces: {
    newEntrants: string
    supplierPower: string
    buyerPower: string
    substitutes: string
    rivalry: string
  }
  leanCanvas: {
    problem: string
    customerSegments: string
    uniqueValueProposition: string
    solution: string
    keyMetrics: string
    channels: string
    costStructure: string
    revenueStreams: string
    unfairAdvantage: string
  }
  blueOcean: {
    newMarketSpace: string
    makeCompetitionIrrelevant: string
  }
  marketSize: {
    tam: string
    sam: string
    som: string
  }
  createdAt?: string
  updatedAt?: string
  createdBy?: string
  updatedBy?: string
}

// Change tracking types
export type ChangeType = "create" | "update" | "delete" | "import" | "export"

export type FieldChange = {
  field: string
  oldValue: any
  newValue: any
  isSignificant: boolean
}

export type ChangeRecord = {
  id: string
  ideaId: number | string
  timestamp: string
  userId: string
  userName: string
  changeType: ChangeType
  description: string
  fields?: FieldChange[]
  audioLogUrl?: string
}

// User types
export type UserRole = "admin" | "editor" | "viewer"

export type User = {
  id: string
  name: string
  email: string
  role: UserRole
  createdAt: string
}

// Export types
export type ExportFormat = "json" | "csv" | "pdf" | "markdown"

// Template types
export type TemplateCategory = {
  id: string
  name: string
  description: string
}

export type Template = {
  id: number | string
  title: string
  category: string
  description: string
  template: string
  createdBy?: string
  createdAt?: string
}

// Audio log metadata types
export type AudioLogMetadata = {
  id: number
  userId: string
  filePath: string
  ideaId?: number | string
  title: string
  duration: number
  transcription?: string
  createdAt: string
}

// Scaling strategy types
export type ScalingDimension = {
  name: string
  description: string
  strategies: ScalingStrategy[]
}

export type ScalingStrategy = {
  title: string
  description: string
  steps: string[]
  timeline: string
  resources: string
  risks: string[]
}

export interface DocumentAnalysis {
  id: string
  userId: string
  projectId?: string | number
  documentName: string
  documentType: "whitepaper" | "code" | "other"
  documentUrl?: string
  analysisResults: any
  createdAt: string
}

export interface SentimentAnalysis {
  id: string
  userId: string
  projectId?: string | number
  projectName: string
  projectUrl?: string
  analysisResults: any
  createdAt: string
}

export interface ProjectVisualization {
  id: string
  userId: string
  projectId?: string | number
  projectName: string
  visualizationType: "tokenomics" | "architecture" | "riskProfile"
  imageUrl: string
  prompt: string
  createdAt: string
}

export interface ProjectSummary {
  id: string
  userId: string
  projectId?: string | number
  projectName: string
  summaryType: "executive" | "technical" | "financial" | "regulatory"
  summaryContent: any
  createdAt: string
}
