import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'active' | 'completed' | 'archived';
  createdAt: string;
  updatedAt: string;
  tags: string[];
  metrics?: {
    confidence?: number;
    technicalImpact?: number;
    marketPotential?: number;
  };
}

interface ProjectState {
  projects: Project[];
  selectedProject: Project | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchProjects: () => Promise<void>;
  getProject: (id: string) => Promise<void>;
  createProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProject: (id: string, projectData: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  clearSelectedProject: () => void;
  clearError: () => void;
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set, get) => ({
      projects: [],
      selectedProject: null,
      isLoading: false,
      error: null,

      fetchProjects: async () => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // In a real app, you would make an API call here
          // const response = await fetch('/api/projects');
          // const data = await response.json();
          
          // For demo purposes, we'll just set some mock projects
          const mockProjects: Project[] = [
            {
              id: '1',
              title: 'AI-Powered Customer Service',
              description: 'Develop an AI system to automate customer service interactions',
              status: 'active',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              tags: ['AI', 'Customer Service', 'Automation'],
              metrics: {
                confidence: 85,
                technicalImpact: 70,
                marketPotential: 90
              }
            },
            {
              id: '2',
              title: 'Blockchain Supply Chain',
              description: 'Implement blockchain technology for supply chain transparency',
              status: 'draft',
              createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
              updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
              tags: ['Blockchain', 'Supply Chain', 'Transparency'],
              metrics: {
                confidence: 75,
                technicalImpact: 80,
                marketPotential: 65
              }
            },
          ];
          
          set({ projects: mockProjects, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch projects', 
            isLoading: false 
          });
        }
      },

      getProject: async (id) => {
        set({ isLoading: true, error: null });
        try {
          // Check if we already have the project in state
          const existingProject = get().projects.find(p => p.id === id);
          
          if (existingProject) {
            set({ selectedProject: existingProject, isLoading: false });
            return;
          }
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // In a real app, you would make an API call here
          // const response = await fetch(`/api/projects/${id}`);
          // const data = await response.json();
          
          // For demo purposes, we'll just set a mock project
          const mockProject: Project = {
            id,
            title: `Project ${id}`,
            description: 'This is a sample project description',
            status: 'active',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            tags: ['Sample', 'Demo'],
            metrics: {
              confidence: 80,
              technicalImpact: 75,
              marketPotential: 85
            }
          };
          
          set({ selectedProject: mockProject, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : `Failed to fetch project ${id}`, 
            isLoading: false 
          });
        }
      },

      createProject: async (project) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // In a real app, you would make an API call here
          // const response = await fetch('/api/projects', { method: 'POST', ... });
          // const data = await response.json();
          
          // For demo purposes, we'll just create a mock project
          const newProject: Project = {
            ...project,
            id: Math.random().toString(36).substring(2, 9),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          
          set(state => ({ 
            projects: [...state.projects, newProject],
            selectedProject: newProject,
            isLoading: false 
          }));
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to create project', 
            isLoading: false 
          });
        }
      },

      updateProject: async (id, projectData) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 800));
          
          // In a real app, you would make an API call here
          // const response = await fetch(`/api/projects/${id}`, { method: 'PUT', ... });
          // const data = await response.json();
          
          set(state => {
            const updatedProjects = state.projects.map(project => 
              project.id === id 
                ? { 
                    ...project, 
                    ...projectData, 
                    updatedAt: new Date().toISOString() 
                  } 
                : project
            );
            
            const updatedSelectedProject = state.selectedProject?.id === id
              ? { ...state.selectedProject, ...projectData, updatedAt: new Date().toISOString() }
              : state.selectedProject;
            
            return { 
              projects: updatedProjects,
              selectedProject: updatedSelectedProject,
              isLoading: false 
            };
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : `Failed to update project ${id}`, 
            isLoading: false 
          });
        }
      },

      deleteProject: async (id) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 800));
          
          // In a real app, you would make an API call here
          // await fetch(`/api/projects/${id}`, { method: 'DELETE' });
          
          set(state => ({ 
            projects: state.projects.filter(project => project.id !== id),
            selectedProject: state.selectedProject?.id === id ? null : state.selectedProject,
            isLoading: false 
          }));
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : `Failed to delete project ${id}`, 
            isLoading: false 
          });
        }
      },

      clearSelectedProject: () => set({ selectedProject: null }),
      clearError: () => set({ error: null }),
    }),
    {
      name: 'project-storage', // unique name for localStorage
      partialize: (state) => ({ projects: state.projects }),
    }
  )
);