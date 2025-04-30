import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Idea {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'review' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
  tags: string[];
  createdBy: string;
  votes?: number;
  comments?: IdeaComment[];
}

export interface IdeaComment {
  id: string;
  text: string;
  createdAt: string;
  createdBy: string;
  ideaId: string;
}

interface IdeaState {
  ideas: Idea[];
  selectedIdea: Idea | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchIdeas: () => Promise<void>;
  getIdea: (id: string) => Promise<void>;
  createIdea: (idea: Omit<Idea, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateIdea: (id: string, ideaData: Partial<Idea>) => Promise<void>;
  deleteIdea: (id: string) => Promise<void>;
  voteForIdea: (id: string) => Promise<void>;
  addComment: (ideaId: string, text: string, userId: string) => Promise<void>;
  convertToProject: (ideaId: string) => Promise<void>;
  clearSelectedIdea: () => void;
  clearError: () => void;
}

export const useIdeaStore = create<IdeaState>()(
  persist(
    (set, get) => ({
      ideas: [],
      selectedIdea: null,
      isLoading: false,
      error: null,

      fetchIdeas: async () => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // In a real app, you would make an API call here
          // const response = await fetch('/api/ideas');
          // const data = await response.json();
          
          // For demo purposes, we'll just set some mock ideas
          const mockIdeas: Idea[] = [
            {
              id: '1',
              title: 'AI-Powered Market Analysis Tool',
              description: 'Create a tool that uses AI to analyze market trends and provide investment recommendations',
              status: 'approved',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              tags: ['AI', 'Market Analysis', 'Investment'],
              createdBy: 'user1',
              votes: 12,
              comments: [
                {
                  id: 'c1',
                  text: 'This could be a game-changer for our investment strategy',
                  createdAt: new Date().toISOString(),
                  createdBy: 'user2',
                  ideaId: '1'
                }
              ]
            },
            {
              id: '2',
              title: 'Blockchain-Based Voting System',
              description: 'Implement a secure voting system using blockchain technology',
              status: 'review',
              createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
              updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
              tags: ['Blockchain', 'Voting', 'Security'],
              createdBy: 'user3',
              votes: 8
            },
          ];
          
          set({ ideas: mockIdeas, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch ideas', 
            isLoading: false 
          });
        }
      },

      getIdea: async (id) => {
        set({ isLoading: true, error: null });
        try {
          // Check if we already have the idea in state
          const existingIdea = get().ideas.find(i => i.id === id);
          
          if (existingIdea) {
            set({ selectedIdea: existingIdea, isLoading: false });
            return;
          }
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // In a real app, you would make an API call here
          // const response = await fetch(`/api/ideas/${id}`);
          // const data = await response.json();
          
          // For demo purposes, we'll just set a mock idea
          const mockIdea: Idea = {
            id,
            title: `Idea ${id}`,
            description: 'This is a sample idea description',
            status: 'draft',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            tags: ['Sample', 'Demo'],
            createdBy: 'user1',
            votes: 0
          };
          
          set({ selectedIdea: mockIdea, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : `Failed to fetch idea ${id}`, 
            isLoading: false 
          });
        }
      },

      createIdea: async (idea) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // In a real app, you would make an API call here
          // const response = await fetch('/api/ideas', { method: 'POST', ... });
          // const data = await response.json();
          
          // For demo purposes, we'll just create a mock idea
          const newIdea: Idea = {
            ...idea,
            id: Math.random().toString(36).substring(2, 9),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            votes: 0,
            comments: []
          };
          
          set(state => ({ 
            ideas: [...state.ideas, newIdea],
            selectedIdea: newIdea,
            isLoading: false 
          }));
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to create idea', 
            isLoading: false 
          });
        }
      },

      updateIdea: async (id, ideaData) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 800));
          
          // In a real app, you would make an API call here
          // const response = await fetch(`/api/ideas/${id}`, { method: 'PUT', ... });
          // const data = await response.json();
          
          set(state => {
            const updatedIdeas = state.ideas.map(idea => 
              idea.id === id 
                ? { 
                    ...idea, 
                    ...ideaData, 
                    updatedAt: new Date().toISOString() 
                  } 
                : idea
            );
            
            const updatedSelectedIdea = state.selectedIdea?.id === id
              ? { ...state.selectedIdea, ...ideaData, updatedAt: new Date().toISOString() }
              : state.selectedIdea;
            
            return { 
              ideas: updatedIdeas,
              selectedIdea: updatedSelectedIdea,
              isLoading: false 
            };
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : `Failed to update idea ${id}`, 
            isLoading: false 
          });
        }
      },

      deleteIdea: async (id) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 800));
          
          // In a real app, you would make an API call here
          // await fetch(`/api/ideas/${id}`, { method: 'DELETE' });
          
          set(state => ({ 
            ideas: state.ideas.filter(idea => idea.id !== id),
            selectedIdea: state.selectedIdea?.id === id ? null : state.selectedIdea,
            isLoading: false 
          }));
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : `Failed to delete idea ${id}`, 
            isLoading: false 
          });
        }
      },

      voteForIdea: async (id) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 300));
          
          // In a real app, you would make an API call here
          // await fetch(`/api/ideas/${id}/vote`, { method: 'POST' });
          
          set(state => {
            const updatedIdeas = state.ideas.map(idea => 
              idea.id === id 
                ? { 
                    ...idea, 
                    votes: (idea.votes || 0) + 1,
                    updatedAt: new Date().toISOString() 
                  } 
                : idea
            );
            
            const updatedSelectedIdea = state.selectedIdea?.id === id
              ? { 
                  ...state.selectedIdea, 
                  votes: (state.selectedIdea.votes || 0) + 1,
                  updatedAt: new Date().toISOString() 
                }
              : state.selectedIdea;
            
            return { 
              ideas: updatedIdeas,
              selectedIdea: updatedSelectedIdea,
              isLoading: false 
            };
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : `Failed to vote for idea ${id}`, 
            isLoading: false 
          });
        }
      },

      addComment: async (ideaId, text, userId) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // In a real app, you would make an API call here
          // await fetch(`/api/ideas/${ideaId}/comments`, { method: 'POST', ... });
          
          const newComment: IdeaComment = {
            id: Math.random().toString(36).substring(2, 9),
            text,
            createdAt: new Date().toISOString(),
            createdBy: userId,
            ideaId
          };
          
          set(state => {
            const updatedIdeas = state.ideas.map(idea => 
              idea.id === ideaId 
                ? { 
                    ...idea, 
                    comments: [...(idea.comments || []), newComment],
                    updatedAt: new Date().toISOString() 
                  } 
                : idea
            );
            
            const updatedSelectedIdea = state.selectedIdea?.id === ideaId
              ? { 
                  ...state.selectedIdea, 
                  comments: [...(state.selectedIdea.comments || []), newComment],
                  updatedAt: new Date().toISOString() 
                }
              : state.selectedIdea;
            
            return { 
              ideas: updatedIdeas,
              selectedIdea: updatedSelectedIdea,
              isLoading: false 
            };
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : `Failed to add comment to idea ${ideaId}`, 
            isLoading: false 
          });
        }
      },

      convertToProject: async (ideaId) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // In a real app, you would make API calls here
          // await fetch(`/api/ideas/${ideaId}/convert`, { method: 'POST' });
          
          // Mark the idea as converted
          set(state => {
            const updatedIdeas = state.ideas.map(idea => 
              idea.id === ideaId 
                ? { 
                    ...idea, 
                    status: 'approved' as const,
                    updatedAt: new Date().toISOString() 
                  } 
                : idea
            );
            
            return { 
              ideas: updatedIdeas,
              isLoading: false 
            };
          });
          
          // Note: In a real implementation, you would also create a new project
          // and potentially integrate with the project store
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : `Failed to convert idea ${ideaId} to project`, 
            isLoading: false 
          });
        }
      },

      clearSelectedIdea: () => set({ selectedIdea: null }),
      clearError: () => set({ error: null }),
    }),
    {
      name: 'idea-storage', // unique name for localStorage
      partialize: (state) => ({ ideas: state.ideas }),
    }
  )
);