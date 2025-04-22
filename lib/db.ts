import { createClient } from "@supabase/supabase-js"
import type { Idea, ChangeRecord, User, Template, FieldChange, ChangeType } from "./types"
import { CHANGE_THRESHOLDS } from "./config"
import { snakeToCamel, camelToSnake, createTimestamp } from "./db-utils"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
export const supabase = createClient(supabaseUrl, supabaseKey)

// Initialize admin client for operations that require more privileges
const supabaseAdminKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
export const adminClient = createClient(supabaseUrl, supabaseAdminKey)

// Ideas API
export async function getIdeas() {
  const { data, error } = await supabase.from("ideas").select("*").order("updated_at", { ascending: false })

  if (error) throw error
  return data.map(snakeToCamel) as Idea[]
}

export async function getIdea(id: number | string) {
  const { data, error } = await supabase.from("ideas").select("*").eq("id", id).single()

  if (error) throw error
  return snakeToCamel(data) as Idea
}

export async function createIdea(idea: Omit<Idea, "id" | "createdAt" | "updatedAt">, userId: string) {
  const timestamp = createTimestamp()
  const snakeIdea = camelToSnake(idea)

  const { data, error } = await supabase
    .from("ideas")
    .insert({
      ...snakeIdea,
      created_at: timestamp,
      updated_at: timestamp,
      created_by: userId,
      updated_by: userId,
    })
    .select()

  if (error) throw error
  return snakeToCamel(data[0]) as Idea
}

export async function updateIdea(id: number | string, idea: Partial<Idea>, userId: string, changes?: FieldChange[]) {
  const timestamp = createTimestamp()
  const snakeIdea = camelToSnake(idea)

  const { data, error } = await supabase
    .from("ideas")
    .update({
      ...snakeIdea,
      updated_at: timestamp,
      updated_by: userId,
    })
    .eq("id", id)
    .select()

  if (error) throw error

  // Record the change
  if (changes && changes.length > 0) {
    await recordChange({
      ideaId: id,
      userId,
      changeType: "update",
      description: `Updated ${changes.length} fields in ${idea.title || "idea"}`,
      fields: changes,
    })
  }

  return snakeToCamel(data[0]) as Idea
}

export async function deleteIdea(id: number | string, userId: string) {
  // Get the idea first for the change record
  const idea = await getIdea(id)

  const { error } = await supabase.from("ideas").delete().eq("id", id)

  if (error) throw error

  // Record the deletion
  await recordChange({
    ideaId: id,
    userId,
    changeType: "delete",
    description: `Deleted idea: ${idea.title}`,
  })

  return true
}

// Change tracking API
export async function getChanges(ideaId?: number | string) {
  let query = supabase
    .from("changes")
    .select(`
      *,
      users (
        name
      )
    `)
    .order("timestamp", { ascending: false })

  if (ideaId) {
    query = query.eq("idea_id", ideaId)
  }

  const { data, error } = await query

  if (error) throw error

  return data.map((change) => {
    const camelChange = snakeToCamel(change)
    // Ensure userName is properly extracted from the nested users object
    camelChange.userName = change.users?.name || "Unknown User"
    return camelChange
  }) as ChangeRecord[]
}

export async function recordChange({
  ideaId,
  userId,
  changeType,
  description,
  fields,
  audioLogUrl,
}: {
  ideaId: number | string
  userId: string
  changeType: ChangeType
  description: string
  fields?: FieldChange[]
  audioLogUrl?: string
}) {
  const timestamp = createTimestamp()

  const { data, error } = await supabase
    .from("changes")
    .insert({
      idea_id: ideaId,
      user_id: userId,
      timestamp,
      change_type: changeType,
      description,
      fields,
      audio_log_url: audioLogUrl,
    })
    .select()

  if (error) throw error
  return snakeToCamel(data[0]) as ChangeRecord
}

// User API
export async function getUser(id: string) {
  const { data, error } = await supabase.from("users").select("*").eq("id", id).single()

  if (error) throw error
  return snakeToCamel(data) as User
}

// Get user role
export async function getUserRole(id: string): Promise<string | null> {
  const { data, error } = await adminClient.from("users").select("role").eq("id", id).single()

  if (error || !data) {
    console.error("Error fetching user role:", error)
    return null
  }

  return data.role
}

// Templates API
export async function getTemplates() {
  const { data, error } = await supabase.from("templates").select("*").order("title")

  if (error) throw error
  return data.map(snakeToCamel) as Template[]
}

export async function getTemplate(id: number | string) {
  const { data, error } = await supabase.from("templates").select("*").eq("id", id).single()

  if (error) throw error
  return snakeToCamel(data) as Template
}

export async function createTemplate(template: Omit<Template, "id" | "createdAt">, userId: string) {
  const timestamp = createTimestamp()
  const snakeTemplate = camelToSnake(template)

  const { data, error } = await supabase
    .from("templates")
    .insert({
      ...snakeTemplate,
      created_at: timestamp,
      created_by: userId,
    })
    .select()

  if (error) throw error
  return snakeToCamel(data[0]) as Template
}

// Helper function to detect significant changes
export function detectSignificantChanges(oldValue: any, newValue: any): boolean {
  // For numeric values, check if change is more than the configured threshold
  if (typeof oldValue === "number" && typeof newValue === "number") {
    // Special case for rating (1-10 scale)
    if (oldValue <= 10 && newValue <= 10) {
      return Math.abs(newValue - oldValue) >= CHANGE_THRESHOLDS.MIN_RATING_CHANGE
    }

    // Special case for confidence (percentage)
    if (
      oldValue <= 100 &&
      newValue <= 100 &&
      (oldValue.toString().includes("%") || newValue.toString().includes("%"))
    ) {
      return Math.abs(newValue - oldValue) >= CHANGE_THRESHOLDS.MIN_CONFIDENCE_CHANGE
    }

    // Default percentage change threshold for other numeric values
    const percentChange = Math.abs((newValue - oldValue) / oldValue) * 100
    return percentChange > CHANGE_THRESHOLDS.NUMERIC_PERCENT_THRESHOLD
  }

  // For strings, check if length changed significantly
  if (typeof oldValue === "string" && typeof newValue === "string") {
    const oldLength = oldValue.length
    const newLength = newValue.length

    if (oldLength === 0) return newLength > CHANGE_THRESHOLDS.MIN_STRING_LENGTH

    const percentChange = Math.abs((newLength - oldLength) / oldLength) * 100
    return percentChange > CHANGE_THRESHOLDS.STRING_LENGTH_PERCENT_THRESHOLD
  }

  // For arrays, check if length changed
  if (Array.isArray(oldValue) && Array.isArray(newValue)) {
    return oldValue.length !== newValue.length
  }

  // For objects, check if keys changed
  if (typeof oldValue === "object" && typeof newValue === "object") {
    const oldKeys = Object.keys(oldValue || {})
    const newKeys = Object.keys(newValue || {})
    return oldKeys.length !== newKeys.length
  }

  return false
}

// Function to compare two ideas and generate field changes
export function generateFieldChanges(oldIdea: Idea, newIdea: Idea): FieldChange[] {
  const changes: FieldChange[] = []

  // Compare simple fields
  const simpleFields = ["title", "confidence", "rating", "keyDifferentiator"] as const
  simpleFields.forEach((field) => {
    if (oldIdea[field] !== newIdea[field]) {
      changes.push({
        field,
        oldValue: oldIdea[field],
        newValue: newIdea[field],
        isSignificant: detectSignificantChanges(oldIdea[field], newIdea[field]),
      })
    }
  })

  // Compare nested objects
  const compareNestedObject = (path: string, oldObj: Record<string, any>, newObj: Record<string, any>) => {
    Object.keys(oldObj).forEach((key) => {
      const fullPath = `${path}.${key}`

      if (typeof oldObj[key] === "object" && !Array.isArray(oldObj[key])) {
        compareNestedObject(fullPath, oldObj[key], newObj[key] || {})
      } else if (JSON.stringify(oldObj[key]) !== JSON.stringify(newObj[key])) {
        changes.push({
          field: fullPath,
          oldValue: oldObj[key],
          newValue: newObj[key],
          isSignificant: detectSignificantChanges(oldObj[key], newObj[key]),
        })
      }
    })
  }

  // Compare nested objects
  const nestedObjects = [
    "perspectives",
    "jtbd",
    "pestel",
    "swot",
    "portersFiveForces",
    "leanCanvas",
    "blueOcean",
    "marketSize",
  ] as const
  nestedObjects.forEach((obj) => {
    compareNestedObject(obj, oldIdea[obj], newIdea[obj])
  })

  // Compare arrays
  if (JSON.stringify(oldIdea.scenarios) !== JSON.stringify(newIdea.scenarios)) {
    changes.push({
      field: "scenarios",
      oldValue: oldIdea.scenarios,
      newValue: newIdea.scenarios,
      isSignificant: detectSignificantChanges(oldIdea.scenarios, newIdea.scenarios),
    })
  }

  return changes
}
