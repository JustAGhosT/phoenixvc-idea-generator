import { supabase } from "./db"
import type { DocumentAnalysis, SentimentAnalysis, ProjectVisualization, ProjectSummary } from "./types"
import { snakeToCamel, camelToSnake, createTimestamp } from "./db-utils"

// Document Analysis
export async function saveDocumentAnalysis(analysis: Omit<DocumentAnalysis, "id" | "createdAt">) {
  const timestamp = createTimestamp()
  const snakeAnalysis = camelToSnake(analysis)

  const { data, error } = await supabase
    .from("document_analyses")
    .insert({
      ...snakeAnalysis,
      created_at: timestamp,
    })
    .select()

  if (error) throw error
  return snakeToCamel(data[0]) as DocumentAnalysis
}

export async function getDocumentAnalyses(userId: string, projectId?: string | number) {
  let query = supabase
    .from("document_analyses")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (projectId) {
    query = query.eq("project_id", projectId)
  }

  const { data, error } = await query

  if (error) throw error
  return data.map(snakeToCamel) as DocumentAnalysis[]
}

export async function getDocumentAnalysis(id: string) {
  const { data, error } = await supabase.from("document_analyses").select("*").eq("id", id).single()

  if (error) throw error
  return snakeToCamel(data) as DocumentAnalysis
}

// Sentiment Analysis
export async function saveSentimentAnalysis(analysis: Omit<SentimentAnalysis, "id" | "createdAt">) {
  const timestamp = createTimestamp()
  const snakeAnalysis = camelToSnake(analysis)

  const { data, error } = await supabase
    .from("sentiment_analyses")
    .insert({
      ...snakeAnalysis,
      created_at: timestamp,
    })
    .select()

  if (error) throw error
  return snakeToCamel(data[0]) as SentimentAnalysis
}

export async function getSentimentAnalyses(userId: string, projectId?: string | number) {
  let query = supabase
    .from("sentiment_analyses")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (projectId) {
    query = query.eq("project_id", projectId)
  }

  const { data, error } = await query

  if (error) throw error
  return data.map(snakeToCamel) as SentimentAnalysis[]
}

// Project Visualizations
export async function saveProjectVisualization(visualization: Omit<ProjectVisualization, "id" | "createdAt">) {
  const timestamp = createTimestamp()
  const snakeVisualization = camelToSnake(visualization)

  const { data, error } = await supabase
    .from("project_visualizations")
    .insert({
      ...snakeVisualization,
      created_at: timestamp,
    })
    .select()

  if (error) throw error
  return snakeToCamel(data[0]) as ProjectVisualization
}

export async function getProjectVisualizations(userId: string, projectId?: string | number) {
  let query = supabase
    .from("project_visualizations")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (projectId) {
    query = query.eq("project_id", projectId)
  }

  const { data, error } = await query

  if (error) throw error
  return data.map(snakeToCamel) as ProjectVisualization[]
}

// Project Summaries
export async function saveProjectSummary(summary: Omit<ProjectSummary, "id" | "createdAt">) {
  const timestamp = createTimestamp()
  const snakeSummary = camelToSnake(summary)

  const { data, error } = await supabase
    .from("project_summaries")
    .insert({
      ...snakeSummary,
      created_at: timestamp,
    })
    .select()

  if (error) throw error
  return snakeToCamel(data[0]) as ProjectSummary
}

export async function getProjectSummaries(userId: string, projectId?: string | number) {
  let query = supabase
    .from("project_summaries")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (projectId) {
    query = query.eq("project_id", projectId)
  }

  const { data, error } = await query

  if (error) throw error
  return data.map(snakeToCamel) as ProjectSummary[]
}
