/**
 * Service for searching content
 */
export const searchService = {
  /**
   * Search for content
   */
  search: async (term: string, options: { 
    limit?: number, 
    category?: string
  } = {}) => {
    // Implement actual API call here
    // For now, return mock data
    return [
      { 
        id: "1", 
        title: `Result for ${term} 1`, 
        description: "This is a search result", 
        url: "/result/1",
        category: "Content",
        relevance: 0.9
      },
      { 
        id: "2", 
        title: `Result for ${term} 2`, 
        description: "This is another search result", 
        url: "/result/2",
        category: "Users",
        relevance: 0.8
      },
    ]
  },
  
  /**
   * Get a single search result by ID
   */
  getSearchResult: async (id: string) => {
    // Implement actual API call here
    // For now, return mock data
    return { 
      id, 
      title: `Search Result ${id}`, 
      description: "This is a search result", 
      url: `/result/${id}`,
      category: "Content",
      relevance: 0.9
    }
  }
}
