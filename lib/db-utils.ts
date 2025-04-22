// Helper function to convert snake_case to camelCase
export function snakeToCamel(obj: any): any {
  if (obj === null || typeof obj !== "object") {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(snakeToCamel)
  }

  return Object.keys(obj).reduce((acc, key) => {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
    acc[camelKey] = snakeToCamel(obj[key])
    return acc
  }, {} as any)
}

// Helper function to convert camelCase to snake_case
export function camelToSnake(obj: any): any {
  if (obj === null || typeof obj !== "object") {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(camelToSnake)
  }

  return Object.keys(obj).reduce((acc, key) => {
    const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
    acc[snakeKey] = camelToSnake(obj[key])
    return acc
  }, {} as any)
}

// Create a timestamp in ISO format
export function createTimestamp(): string {
  return new Date().toISOString()
}
