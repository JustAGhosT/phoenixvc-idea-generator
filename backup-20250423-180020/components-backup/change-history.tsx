"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Play } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import type { ChangeRecord, FieldChange } from "@/lib/types"
import { exportChangesToCsv } from "@/lib/export"

interface ChangeHistoryProps {
  ideaId?: number | string
}

export function ChangeHistory({ ideaId }: ChangeHistoryProps) {
  const [changes, setChanges] = useState<ChangeRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchChanges = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const url = ideaId ? `/api/changes?ideaId=${ideaId}` : "/api/changes"

        const response = await fetch(url)

        if (!response.ok) {
          throw new Error("Failed to fetch changes")
        }

        const data = await response.json()
        setChanges(data)
      } catch (err) {
        setError("Error loading change history")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchChanges()
  }, [ideaId])

  const handleExportChanges = () => {
    const csv = exportChangesToCsv(changes)
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `changes${ideaId ? `-idea-${ideaId}` : ""}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const renderChangeType = (type: string) => {
    switch (type) {
      case "create":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Created
          </Badge>
        )
      case "update":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            Updated
          </Badge>
        )
      case "delete":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800">
            Deleted
          </Badge>
        )
      case "import":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-800">
            Imported
          </Badge>
        )
      case "export":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            Exported
          </Badge>
        )
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  const renderFieldChanges = (fields?: FieldChange[]) => {
    if (!fields || fields.length === 0) return null

    return (
      <div className="mt-2 space-y-1">
        {fields.map((field, index) => (
          <div key={index} className="text-sm">
            <span className="font-medium">{field.field}:</span>
            {field.isSignificant && <Badge className="ml-2 bg-amber-100 text-amber-800">Significant Change</Badge>}
            <div className="grid grid-cols-2 gap-2 mt-1">
              <div className="bg-red-50 p-1 rounded text-xs overflow-auto max-h-20">
                {typeof field.oldValue === "object" ? JSON.stringify(field.oldValue) : String(field.oldValue)}
              </div>
              <div className="bg-green-50 p-1 rounded text-xs overflow-auto max-h-20">
                {typeof field.newValue === "object" ? JSON.stringify(field.newValue) : String(field.newValue)}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading change history...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>
  }

  if (!ideaId) {
    return <div className="text-center py-8 text-red-500">Error: Missing ideaId parameter</div>
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Change History</CardTitle>
          <CardDescription>Track all modifications made to {ideaId ? "this idea" : "ideas"}</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={handleExportChanges}>
          <Download className="h-4 w-4 mr-2" />
          Export Changes
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Changes</TabsTrigger>
            <TabsTrigger value="significant">Significant Changes</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Audio</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {changes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      No changes recorded yet
                    </TableCell>
                  </TableRow>
                ) : (
                  changes.map((change) => (
                    <TableRow key={change.id}>
                      <TableCell className="whitespace-nowrap">
                        {formatDistanceToNow(new Date(change.timestamp), { addSuffix: true })}
                      </TableCell>
                      <TableCell>{change.userName}</TableCell>
                      <TableCell>{renderChangeType(change.changeType)}</TableCell>
                      <TableCell>
                        <div>{change.description}</div>
                        {renderFieldChanges(change.fields)}
                      </TableCell>
                      <TableCell>
                        {change.audioLogUrl && (
                          <Button variant="ghost" size="sm">
                            <Play className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="significant">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Field</TableHead>
                  <TableHead>Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {changes.filter((c) => c.fields?.some((f) => f.isSignificant)).length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4">
                      No significant changes recorded
                    </TableCell>
                  </TableRow>
                ) : (
                  changes
                    .filter((c) => c.fields?.some((f) => f.isSignificant))
                    .flatMap(
                      (change) =>
                        change.fields
                          ?.filter((f) => f.isSignificant)
                          .map((field, idx) => (
                            <TableRow key={`${change.id}-${idx}`}>
                              <TableCell className="whitespace-nowrap">
                                {formatDistanceToNow(new Date(change.timestamp), { addSuffix: true })}
                              </TableCell>
                              <TableCell>{change.userName}</TableCell>
                              <TableCell>{field.field}</TableCell>
                              <TableCell>
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="bg-red-50 p-1 rounded text-xs">
                                    {typeof field.oldValue === "object"
                                      ? JSON.stringify(field.oldValue)
                                      : String(field.oldValue)}
                                  </div>
                                  <div className="bg-green-50 p-1 rounded text-xs">
                                    {typeof field.newValue === "object"
                                      ? JSON.stringify(field.newValue)
                                      : String(field.newValue)}
                                  </div>
                                </div>
                              </TableCell>
                            </TableRow>
                          )) || [],
                    )
                )}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
