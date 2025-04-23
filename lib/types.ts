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
// Change tracking types
export type ChangeType = "create" | "update" | "delete" | "import" | "export"

export type FieldChange = {
  field: string
  oldValue: any
  newValue: any
  isSignificant: boolean
}
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
// User types
export type UserRole = "admin" | "editor" | "viewer"

export type User = {
  id: string
  name: string
  email: string
  role: UserRole
  createdAt: string
}
export type User = {
  id: string
  name: string
  email: string
  role: UserRole
  createdAt: string
}

// Export types
export type ExportFormat = "json" | "csv" | "pdf" | "markdown"
// Export types
export type ExportFormat = "json" | "csv" | "pdf" | "markdown"

// Template types
export type TemplateCategory = {
  id: string
  name: string
  description: string
}
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
export interface ProjectSummary {
  id: string
  userId: string
  projectId?: string | number
  projectName: string
  summaryType: "executive" | "technical" | "financial" | "regulatory"
  summaryContent: any
  createdAt: string
}

/**
 * Breadcrumb type
 */
export interface Breadcrumb {
  id: string
  label: string
  path: string
  isActive?: boolean
}

/**
 * Notification type
 */
export type NotificationType = "info" | "success" | "warning" | "error"

export interface Notification {
  id: string
  title: string
  message: string
  type: NotificationType
  read: boolean
  createdAt: Date
  readAt?: Date
  priority?: string
  category?: string
  link?: string
  autoClose?: boolean
  autoCloseDelay?: number
}

/**
 * Theme type
 */
export interface Theme {
  id: string
  name: string
  colors: {
    primary: string
    secondary: string
    background: string
    text: string
    [key: string]: string
  }
  isDark: boolean
}

/**
 * Search result type
 */
export interface SearchResult {
  id: string
  title: string
  description?: string
  url: string
  category?: string
  relevance?: number
}