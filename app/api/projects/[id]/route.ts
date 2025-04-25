import { getServerAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await getServerAuthSession();
    if (!session) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const projectId = params.id;
    
    // Fetch the project from the database
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return new NextResponse(JSON.stringify({ error: "Project not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Check if the user has access to this project
    if (project.userId !== session.user.id) {
      return new NextResponse(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch project" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}