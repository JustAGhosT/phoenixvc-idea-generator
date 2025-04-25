import { createClient } from "@supabase/supabase-js";
import { camelToSnake, createTimestamp, snakeToCamel } from "./db-utils";
import { Idea } from "./types";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if required environment variables are set
if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables. Please check your .env file.");
}

// Create client only if both URL and key are available
export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Helper function to get the appropriate client with error handling
function getClient() {
  if (!supabase) {
    throw new Error("Supabase client not initialized. Check your environment variables.");
  }
  
  return supabase;
}

// Project type definition
export interface Project {
  id: string | number;
  name: string;
  description?: string;
  status: 'planning' | 'active' | 'on-hold' | 'completed' | 'cancelled';
  startDate?: string;
  targetCompletionDate?: string;
  actualCompletionDate?: string;
  budget?: string;
  ideaId?: string | number;
  createdAt: string;
  updatedAt?: string;
  createdBy: string;
  updatedBy?: string;
}

// Create a new project
export async function createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'> & { ideaData?: Idea | null }) {
  const client = getClient();
  const timestamp = createTimestamp();
  
  // Extract ideaData for separate handling
  const { ideaData, ...projectData } = project;
  const snakeProject = camelToSnake(projectData);
  
  // Insert the project
  const { data, error } = await client
    .from("projects")
    .insert({
      ...snakeProject,
      created_at: timestamp,
      updated_at: timestamp,
    })
    .select();
  
  if (error) throw error;
  
  const newProject = snakeToCamel(data[0]) as Project;
  
  // If ideaData is provided, store the idea analysis data in project_analysis table
  if (ideaData) {
    await storeProjectAnalysis(newProject.id, ideaData);
  }
  
  return newProject;
}

// Store idea analysis data in project_analysis table
async function storeProjectAnalysis(projectId: string | number, idea: Idea) {
  const client = getClient();
  const timestamp = createTimestamp();
  
  // Extract relevant analysis data from the idea
  const analysisData = {
    project_id: projectId,
    perspectives: idea.perspectives,
    jtbd: idea.jtbd,
    pestel: idea.pestel,
    scenarios: idea.scenarios,
    swot: idea.swot,
    porters_five_forces: idea.portersFiveForces,
    lean_canvas: idea.leanCanvas,
    blue_ocean: idea.blueOcean,
    market_size: idea.marketSize,
    created_at: timestamp,
  };
  
  const { error } = await client
    .from("project_analysis")
    .insert(analysisData);
  
  if (error) throw error;
}

// Get all projects
export async function getProjects() {
  const client = getClient();
  const { data, error } = await client
    .from("projects")
    .select("*")
    .order("updated_at", { ascending: false });
  
  if (error) throw error;
  return data.map(snakeToCamel) as Project[];
}

// Get a single project by ID
export async function getProject(id: string | number) {
  const client = getClient();
  const { data, error } = await client
    .from("projects")
    .select(`
      *,
      project_analysis (*)
    `)
    .eq("id", id)
    .single();
  
  if (error) throw error;
  
  // Convert snake_case to camelCase
  const project = snakeToCamel(data) as Project & { projectAnalysis?: any };
  
  // If project has analysis data, convert it too
  if (data.project_analysis) {
    project.projectAnalysis = snakeToCamel(data.project_analysis);
  }
  
  return project;
}

// Update a project
export async function updateProject(id: string | number, project: Partial<Project>, userId: string) {
  const client = getClient();
  const timestamp = createTimestamp();
  const snakeProject = camelToSnake(project);
  
  const { data, error } = await client
    .from("projects")
    .update({
      ...snakeProject,
      updated_at: timestamp,
      updated_by: userId,
    })
    .eq("id", id)
    .select();
  
  if (error) throw error;
  return snakeToCamel(data[0]) as Project;
}

// Delete a project
export async function deleteProject(id: string | number) {
  const client = getClient();
  const { error } = await client.from("projects").delete().eq("id", id);
  
  if (error) throw error;
  return true;
}

// Get projects by idea ID
export async function getProjectsByIdeaId(ideaId: string | number) {
  const client = getClient();
  const { data, error } = await client
    .from("projects")
    .select("*")
    .eq("idea_id", ideaId)
    .order("created_at", { ascending: false });
  
  if (error) throw error;
  return data.map(snakeToCamel) as Project[];
}

// Update project status
export async function updateProjectStatus(id: string | number, status: Project['status'], userId: string) {
  return updateProject(id, { status }, userId);
}