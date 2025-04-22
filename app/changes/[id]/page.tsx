import { ChangeHistory } from "@/components/change-history"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function IdeaChangesPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="icon">
            <Link href="/changes">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Idea Change History</h1>
        </div>

        <ChangeHistory ideaId={params.id} />
      </div>
    </div>
  )
}
