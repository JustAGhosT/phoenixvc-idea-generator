import { type NextRequest, NextResponse } from "next/server"
import { getIdea, updateIdea, deleteIdea, generateFieldChanges } from "@/lib/db"
import { auth } from "@/auth"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const idea = await getIdea(params.id)
    return NextResponse.json(idea)
  } catch (error) {
    console.error(`Error fetching idea ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to fetch idea" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const updatedIdea = await request.json()

    // Get the original idea to compare changes
    const originalIdea = await getIdea(params.id)

    // Generate field changes
    const changes = generateFieldChanges(originalIdea, updatedIdea)

    // Update the idea with changes
    const result = await updateIdea(params.id, updatedIdea, session.user.id, changes)

    return NextResponse.json(result)
  } catch (error) {
    console.error(`Error updating idea ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to update idea" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await deleteIdea(params.id, session.user.id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error deleting idea ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to delete idea" }, { status: 500 })
  }
}
