const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Log available models on the prisma client
console.log('Available models on prisma client:');
console.log(Object.keys(prisma));