// db-test.js
const { PrismaClient } = require('@prisma/client');

async function testConnection() {
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });

  try {
    console.log('Testing database connection...');
    // Try a simple query
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('Connection successful!', result);
    return true;
  } catch (error) {
    console.error('Connection failed:', error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

testConnection()
  .then(success => {
    console.log('Test completed with result:', success);
    process.exit(success ? 0 : 1);
  })
  .catch(e => {
    console.error('Unexpected error:', e);
    process.exit(1);
  });