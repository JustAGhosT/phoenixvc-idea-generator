import { PrismaClient } from '@prisma/client';

// Define the QueryEvent interface if needed for logging
interface QueryEvent {
  query: string;
  params: string;
  duration: number;
  timestamp: Date;
}

// Global type for TypeScript
declare global {
  var prisma: PrismaClient | undefined
}

// PrismaClient singleton factory with connection pool configuration
const prismaClientSingleton = () => {
  // Create Prisma client with special configuration for PgBouncer
  const client = new PrismaClient({
    log: [
      {
        emit: 'event',
        level: 'query',
      },
      {
        emit: 'stdout',
        level: 'error',
      },
      {
        emit: 'stdout',
        level: 'warn',
      },
    ],
    
    // Configure datasources
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });
    
  // Add event listeners for connection issues using the properly typed approach
  // @ts-ignore - This is needed because the event types might not be properly exposed
  client.$on('query', (e: any) => {
    if (e.duration > 1000) { // Log slow queries (over 1 second)
      console.warn(`Slow query (${e.duration}ms):`, e.query);
    }
  });

  // Add a custom extension for error handling
  return client.$extends({
    query: {
      async $allOperations({ operation, model, args, query }) {
        try {
          return await query(args);
        } catch (error: any) {
          // Log the error but don't re-throw to prevent app crashes
          console.error(`Prisma query error in ${model}.${operation}:`, error);
          
          // For read operations, return null instead of throwing
          if (
            operation.startsWith('find') || 
            operation.startsWith('get') || 
            operation === 'count' || 
            operation === 'aggregate'
          ) {
            // For findMany, return empty array instead of null
            if (operation === 'findMany') {
              return [];
            }
            return null;
          }

          // For write operations, we need to throw to maintain data integrity
          throw error;
        }
      },
    },
  });
};

// Use global variable to prevent multiple instances during hot reloading
const globalForPrisma = global as unknown as { prisma: ReturnType<typeof prismaClientSingleton> };

// Create or reuse the Prisma client instance
export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// Save to global object in non-production environments
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Handle shutdown gracefully
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

// Also handle termination signals
['SIGINT', 'SIGTERM'].forEach(signal => {
  process.on(signal, async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
});
