// lib/theme-service.ts
export const themeService = {
  getTheme: async () => {
    // In a real application, this would call an API endpoint
    // For now, we'll just simulate with a timeout
    return new Promise((resolve) => {
      setTimeout(() => {
        const theme = "light"
        resolve(theme)
      }, 500)
    })
  },
}
