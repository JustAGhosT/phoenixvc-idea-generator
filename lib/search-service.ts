// lib/search-service.ts
export const searchService = {
  search: async (term: string) => {
    // In a real application, this would call an API endpoint
    // For now, we'll just simulate with a timeout
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = [
          { id: "1", title: `Result for ${term} 1` },
          { id: "2", title: `Result for ${term} 2` },
        ]
        resolve(results)
      }, 500)
    })
  },
}
