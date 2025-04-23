/**
 * Validates that required environment variables are present
 * @param requiredVars List of required environment variable names
 * @param prefix Optional prefix for error messages
 * @throws Error if any required variables are missing
 */
export function validateEnvConfig(
  requiredVars: string[], 
  prefix = 'Missing required environment variables'
): void {
  const missing = requiredVars.filter(
    varName => !process.env[varName]
  );
  
  if (missing.length > 0) {
    throw new Error(
      `${prefix}: ${missing.join(', ')}`
    );
  }
}

/**
 * Gets an environment variable with type checking
 * @param name Environment variable name
 * @param defaultValue Optional default value
 * @returns The environment variable value or default
 */
export function getEnv(name: string, defaultValue?: string): string {
  const value = process.env[name] || defaultValue;
  if (value === undefined) {
    throw new Error(`Environment variable ${name} is required but not set`);
  }
  return value;
}

/**
 * Gets an environment variable as a number
 * @param name Environment variable name
 * @param defaultValue Optional default value
 * @returns The environment variable as a number
 */
export function getEnvNumber(name: string, defaultValue?: number): number {
  const value = process.env[name];
  if (value === undefined) {
    if (defaultValue !== undefined) return defaultValue;
    throw new Error(`Environment variable ${name} is required but not set`);
  }
  
  const num = Number(value);
  if (isNaN(num)) {
    throw new Error(`Environment variable ${name} must be a number`);
  }
  
  return num;
}

/**
 * Gets an environment variable as a boolean
 * @param name Environment variable name
 * @param defaultValue Optional default value
 * @returns The environment variable as a boolean
 */
export function getEnvBoolean(name: string, defaultValue?: boolean): boolean {
  const value = process.env[name];
  if (value === undefined) {
    if (defaultValue !== undefined) return defaultValue;
    throw new Error(`Environment variable ${name} is required but not set`);
  }
  
  return value.toLowerCase() === 'true';
}