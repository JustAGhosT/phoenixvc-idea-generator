import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getIdea } from '@/lib/db';
import { createProject } from '@/lib/project-db';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get the idea data
    const idea = await getIdea(params.id);
    
    if (!idea) {
      return NextResponse.json(
        { error: 'Idea not found' },
        { status: 404 }
      );
    }
    
    // Get project data from request
    const projectData = await request.json();
    
    // Create the project
    const project = await createProject({
      name: projectData.name,
      description: projectData.description,
      startDate: projectData.startDate,
      targetCompletionDate: projectData.targetCompletionDate,
      budget: projectData.budget,
      status: 'active',
      ideaId: idea.id,
      ideaData: projectData.copyIdeaData ? idea : null,
      createdBy: session.user.id,
    });
    
    // Update idea status to "approved" if it's not already
    if (idea.status !== 'approved') {
      await updateIdeaStatus(idea.id, 'approved', session.user.id);
    }
    
    return NextResponse.json({
      success: true,
      projectId: project.id,
      message: 'Idea successfully converted to project'
    });
  } catch (error) {
    console.error('Error converting idea to project:', error);
    return NextResponse.json(
      { error: 'Failed to convert idea to project' },
      { status: 500 }
    );
  }
}