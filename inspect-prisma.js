const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Log the full structure of the prisma client
console.log('Full Prisma client structure:');
console.log(Object.getOwnPropertyNames(prisma));

// Check for specific models with different case variations
console.log('\nChecking specific models:');
console.log('prisma.project exists:', !!prisma.project);
console.log('prisma.Project exists:', !!prisma.Project);

// Check if the model might be under a different name
console.log('\nAll available models (excluding internal properties):');
const modelNames = Object.getOwnPropertyNames(prisma)
  .filter(name => !name.startsWith('_') && !name.startsWith('$') && typeof prisma[name] === 'object');
console.log(modelNames);

// Check if the model is available through a schema namespace
console.log('\nChecking if schemas are available:');
console.log('prisma.public exists:', !!prisma.public);
console.log('prisma.auth exists:', !!prisma.auth);

// If public schema exists, check if project is under it
if (prisma.public) {
  console.log('\nChecking models under public schema:');
  console.log('prisma.public.project exists:', !!prisma.public.project);
  console.log('prisma.public.Project exists:', !!prisma.public.Project);
}