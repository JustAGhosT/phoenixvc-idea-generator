import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Get your Vercel team ID and project ID from environment variables
    const teamId = process.env.VERCEL_TEAM_ID;
    const projectId = process.env.VERCEL_PROJECT_ID;
    const token = process.env.VERCEL_API_TOKEN;

    if (!teamId || !projectId || !token) {
      throw new Error('Missing required environment variables for Vercel Analytics');
    }

    // Fetch analytics data from Vercel API
    const response = await fetch(
      `https://api.vercel.com/v1/teams/${teamId}/projects/${projectId}/analytics/views`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch analytics data: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Process the data for your dashboard
    const processedData = {
      totalVisits: data.views?.total || 0,
      uniqueVisitors: data.views?.unique || 0,
      bounceRate: data.bounceRate || 0,
      avgSessionDuration: data.averageSessionDuration || 0,
      // Add more metrics as needed
    };

    return NextResponse.json(processedData);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics data', details: (error as Error).message },
      { status: 500 }
    );
  }
}