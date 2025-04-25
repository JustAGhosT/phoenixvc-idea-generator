const { PrismaClient } = require('@prisma/client');

// Create a Prisma client with explicit DATABASE_URL to bypass any caching issues
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  },
  log: ['query', 'info', 'warn', 'error'],
});

async function testConnection() {
  console.log('Testing database connection with explicit DATABASE_URL...');
  console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
  
  // Add a timeout to the operation
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Operation timed out after 15 seconds')), 15000); // 15 seconds
  });

  try {
    // Try a simple query with timeout
    console.log('Attempting simple query...');
    const result = await Promise.race([
      prisma.$queryRaw`SELECT 1 as test`,
      timeoutPromise
    ]);
    
    console.log('Connection successful:', result);
    
    // Try to list available tables
    console.log('Attempting to list tables...');
    const tables = await Promise.race([
      prisma.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`,
      new Promise((_, reject) => setTimeout(() => reject(new Error('Table listing timed out')), 15000))
    ]);
    
    console.log('Available tables:', tables);
    
  } catch (error) {
    console.error('Connection test failed:', error.message);
    if (error.stack) {
      console.error('Error stack:', error.stack);
    }
  } finally {
    try {
      await prisma.$disconnect();
      console.log('Prisma client disconnected');
    } catch (e) {
      console.error('Error disconnecting Prisma client:', e);
    }
    console.log('Test completed');
  }
}

testConnection();