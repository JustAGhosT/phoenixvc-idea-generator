import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { updateIdeaStatus } from '@/lib/db';
import { IdeaStatus } from '@/lib/types';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
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
    
    const { status } = await request.json();
    
    if (!status || !['created', 'updated', 'reviewed', 'approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      );
    }
    
    const updatedIdea = await updateIdeaStatus(
      params.id, 
      status as IdeaStatus, 
      session.user.id
    );
    
    return NextResponse.json(updatedIdea);
  } catch (error) {
    console.error('Error updating idea status:', error);
    return NextResponse.json(
      { error: 'Failed to update idea status' },
      { status: 500 }
    );
  }
}