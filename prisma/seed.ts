import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // First, get a user to associate projects with
  const user = await prisma.user.findFirst();
  
  if (!user) {
    console.error('No users found in the database. Please create a user first.');
    return;
  }
  
  // Create sample projects
  const projects = [
    {
      name: 'Sample Project 1',
      description: 'This is a sample project for testing',
      userId: user.id,
    },
    {
      name: 'Sample Project 2',
      description: 'Another sample project with more details',
      userId: user.id,
    },
    {
      name: 'Risk Analysis Tool',
      description: 'A project for analyzing financial risks',
      userId: user.id,
    },
  ];
  
  // Insert projects
  console.log('Creating projects...');
  for (const project of projects) {
    await prisma.project.create({
      data: project,
    });
  }
  
  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error('Error in seed script:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });