import { getServerAuthSession } from "@/lib/auth";
import { getIdea } from "@/lib/db";
import { exportToCsv, exportToJson, exportToMarkdown, exportToPdf } from "@/lib/export";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string; format: string } }) {
  try {
    const session = await getServerAuthSession()

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const idea = await getIdea(params.id)

    switch (params.format) {
      case "json":
        return new NextResponse(exportToJson(idea), {
          headers: {
            "Content-Type": "application/json",
            "Content-Disposition": `attachment; filename="${idea.title.replace(/\s+/g, "-")}.json"`,
          },
        })

      case "csv":
        return new NextResponse(exportToCsv(idea), {
          headers: {
            "Content-Type": "text/csv",
            "Content-Disposition": `attachment; filename="${idea.title.replace(/\s+/g, "-")}.csv"`,
          },
        })

      case "markdown":
      case "md":
        return new NextResponse(exportToMarkdown(idea), {
          headers: {
            "Content-Type": "text/markdown",
            "Content-Disposition": `attachment; filename="${idea.title.replace(/\s+/g, "-")}.md"`,
          },
        })

      case "pdf":
        const pdf = exportToPdf(idea)
        return new NextResponse(pdf.output("arraybuffer"), {
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="${idea.title.replace(/\s+/g, "-")}.pdf"`,
          },
        })

      default:
        return NextResponse.json({ error: "Unsupported export format" }, { status: 400 })
    }
  } catch (error) {
    console.error(`Error exporting idea ${params.id} to ${params.format}:`, error)
    return NextResponse.json({ error: "Failed to export idea" }, { status: 500 })
  }
}
