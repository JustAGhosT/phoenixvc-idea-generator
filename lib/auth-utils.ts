import { ExtendedUser, UserRole } from "@/contexts/core/auth-context"
import { jwtDecode } from "jwt-decode"

/**
 * Type for JWT token payload with custom claims
 */
interface JwtPayload {
  sub?: string
  name?: string
  email?: string
  picture?: string
  roles?: UserRole[]
  iat?: number
  exp?: number
  jti?: string
}

/**
 * Extracts user roles from a JWT token
 * 
 * @param token JWT token string
 * @returns Array of user roles or default ["user"] role
 */
export function getRolesFromToken(token: string): UserRole[] {
  try {
    const decoded = jwtDecode<JwtPayload>(token)
    return decoded.roles || ["user"]
  } catch (error) {
    console.error("Error decoding JWT token:", error)
    return ["user"]
  }
}

/**
 * Extracts user information from a JWT token
 * 
 * @param token JWT token string
 * @returns User object or null if token is invalid
 */
export function getUserFromToken(token: string): ExtendedUser | null {
  try {
    const decoded = jwtDecode<JwtPayload>(token)
    
    return {
      id: decoded.sub,
      name: decoded.name,
      email: decoded.email,
      image: decoded.picture,
      roles: decoded.roles || ["user"]
    }
  } catch (error) {
    console.error("Error decoding JWT token:", error)
    return null
  }
}

/**
 * Checks if a token is expired
 * 
 * @param token JWT token string
 * @returns True if token is expired, false otherwise
 */
export function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<JwtPayload>(token)
    if (!decoded.exp) return true
    
    // Convert expiration time to milliseconds and compare with current time
    const expirationTime = decoded.exp * 1000
    return Date.now() >= expirationTime
  } catch (error) {
    console.error("Error checking token expiration:", error)
    return true
  }
}

/**
 * Checks if a user has a specific role
 * 
 * @param user User object
 * @param role Role or array of roles to check
 * @returns True if user has the role, false otherwise
 */
export function userHasRole(user: ExtendedUser | null, role: UserRole | UserRole[]): boolean {
  if (!user || !user.roles) return false
  
  if (Array.isArray(role)) {
    return role.some(r => user.roles?.includes(r))
  }
  
  return user.roles.includes(role)
}

/**
 * Gets a display name for a user
 * 
 * @param user User object
 * @returns Display name string
 */
export function getUserDisplayName(user: ExtendedUser | null): string {
  if (!user) return "Guest"
  
  return user.name || user.email?.split("@")[0] || "Anonymous User"
}

/**
 * Safely stores auth state in localStorage with expiration
 * 
 * @param key Storage key
 * @param value Value to store
 * @param expirationInMinutes Expiration time in minutes
 */
export function setAuthStorage(key: string, value: any, expirationInMinutes = 60): void {
  try {
    const item = {
      value,
      expiry: Date.now() + expirationInMinutes * 60 * 1000
    }
    localStorage.setItem(key, JSON.stringify(item))
  } catch (error) {
    console.error("Error setting auth storage:", error)
  }
}

/**
 * Retrieves auth state from localStorage with expiration check
 * 
 * @param key Storage key
 * @returns Stored value or null if expired or not found
 */
export function getAuthStorage<T>(key: string): T | null {
  try {
    const itemStr = localStorage.getItem(key)
    if (!itemStr) return null
    
    const item = JSON.parse(itemStr)
    if (Date.now() > item.expiry) {
      localStorage.removeItem(key)
      return null
    }
    
    return item.value
  } catch (error) {
    console.error("Error getting auth storage:", error)
    return null
  }
}