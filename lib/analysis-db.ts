import { supabase } from "./db"
import { camelToSnake, createTimestamp, snakeToCamel } from "./db-utils"
import type { DocumentAnalysis, ProjectSummary, ProjectVisualization, SentimentAnalysis } from "./types"

// Generic function to save any analysis type
async function saveAnalysis<T>(
  tableName: string, 
  data: Omit<T, "id" | "createdAt">
): Promise<T> {
  const timestamp = createTimestamp()
  const snakeData = camelToSnake(data)

  const { data: result, error } = await supabase
    .from(tableName)
    .insert({
      ...snakeData,
      created_at: timestamp,
    })
    .select()

  if (error) throw error
  return snakeToCamel(result[0]) as T
}

// Generic function to get analyses
async function getAnalyses<T>(
  tableName: string, 
  userId: string, 
  projectId?: string | number
): Promise<T[]> {
  let query = supabase
    .from(tableName)
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (projectId) {
    query = query.eq("project_id", projectId)
  }

  const { data, error } = await query

  if (error) throw error
  return data.map(snakeToCamel) as T[]
}

// Generic function to get a single analysis
async function getAnalysis<T>(
  tableName: string, 
  id: string
): Promise<T> {
  const { data, error } = await supabase
    .from(tableName)
    .select("*")
    .eq("id", id)
    .single()
  if (error) throw error
  return snakeToCamel(data) as T
}

// Document Analysis
export const saveDocumentAnalysis = (analysis: Omit<DocumentAnalysis, "id" | "createdAt">) => 
  saveAnalysis<DocumentAnalysis>("document_analyses", analysis)

export const getDocumentAnalyses = (userId: string, projectId?: string | number) => 
  getAnalyses<DocumentAnalysis>("document_analyses", userId, projectId)

export const getDocumentAnalysis = (id: string) => 
  getAnalysis<DocumentAnalysis>("document_analyses", id)

// Sentiment Analysis
export const saveSentimentAnalysis = (analysis: Omit<SentimentAnalysis, "id" | "createdAt">) => 
  saveAnalysis<SentimentAnalysis>("sentiment_analyses", analysis)

export const getSentimentAnalyses = (userId: string, projectId?: string | number) => 
  getAnalyses<SentimentAnalysis>("sentiment_analyses", userId, projectId)
// Project Visualizations
export const saveProjectVisualization = (visualization: Omit<ProjectVisualization, "id" | "createdAt">) => 
  saveAnalysis<ProjectVisualization>("project_visualizations", visualization)

export const getProjectVisualizations = (userId: string, projectId?: string | number) => 
  getAnalyses<ProjectVisualization>("project_visualizations", userId, projectId)
// Project Summaries
export const saveProjectSummary = (summary: Omit<ProjectSummary, "id" | "createdAt">) => 
  saveAnalysis<ProjectSummary>("project_summaries", summary)

export const getProjectSummaries = (userId: string, projectId?: string | number) => 
  getAnalyses<ProjectSummary>("project_summaries", userId, projectId)
