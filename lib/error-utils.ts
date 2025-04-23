// Define a custom error class for application errors
export class AppError extends Error {
  statusCode: number
  
  constructor(message: string, statusCode = 500) {
    super(message)
    this.statusCode = statusCode
    this.name = 'AppError'
    
    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError)
    }
  }
}

// Common error types
export const NotFoundError = (message = 'Resource not found') => 
  new AppError(message, 404)

export const UnauthorizedError = (message = 'Unauthorized access') => 
  new AppError(message, 401)

export const ForbiddenError = (message = 'Access forbidden') => 
  new AppError(message, 403)

export const ValidationError = (message = 'Validation failed') => 
  new AppError(message, 400)

// Helper to safely handle async operations
export async function tryCatch<T>(
  promise: Promise<T>,
  errorMessage = 'Operation failed'
): Promise<[T | null, AppError | null]> {
  try {
    const data = await promise
    return [data, null]
  } catch (error) {
    console.error('Error in tryCatch:', error)
    if (error instanceof AppError) {
      return [null, error]
    }
    return [null, new AppError(errorMessage)]
  }
}