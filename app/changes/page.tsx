import { ChangeHistory } from "@/components/change-history"

export default function ChangesPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Change History</h1>
        </div>

        <ChangeHistory />
      </div>
    </div>
  )
}
