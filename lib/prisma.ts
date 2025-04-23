// This is a simpler approach using type assertions
// to avoid TypeScript errors
// Import any to avoid TypeScript errors
import * as Prisma from '@prisma/client'

// Type assertion
const PrismaClient = (Prisma as any).PrismaClient

// Global type
declare global {
  var prisma: InstanceType<typeof PrismaClient> | undefined
}

// Create client
export const prisma = 
  global.prisma || 
  new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

// Save to global object
if (process.env.NODE_ENV !== 'production') global.prisma = prisma