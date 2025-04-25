import { getServerAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerAuthSession();
    if (!session) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Get query parameters for pagination
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const status = url.searchParams.get("status") || "active";

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Fetch projects from the database
    const projects = await prisma.project.findMany({
      where: {
        userId: session.user.id,
        status: status,
      },
      orderBy: {
        updatedAt: "desc",
      },
      skip,
      take: limit,
    });

    // Get total count for pagination
    const total = await prisma.project.count({
      where: {
        userId: session.user.id,
        status: status,
      },
    });

    return NextResponse.json({
      projects,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch projects" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerAuthSession();
    if (!session) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Parse request body
    const body = await request.json();
    
    // Validate required fields
    if (!body.name) {
      return new NextResponse(
        JSON.stringify({ error: "Project name is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Create new project
    const project = await prisma.project.create({
      data: {
        name: body.name,
        description: body.description || "",
        userId: session.user.id,
        status: "active",
        metadata: body.metadata || {},
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to create project" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}