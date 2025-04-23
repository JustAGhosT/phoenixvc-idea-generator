"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Play, Pause, Trash2, Edit, Save, Clock, FileAudio } from "lucide-react"
import { getUserAudioLogs, getIdeaAudioLogs, updateAudioLogMetadata, deleteAudioLog, getAudioUrl } from "@/lib/audio"
import { useToast } from "@/components/ui/use-toast"
import { formatDistanceToNow } from "date-fns"

interface AudioLog {
  id: number
  file_path: string
  idea_id: number | null
  title: string
  duration: number
  transcription: string | null
  created_at: string
}

interface AudioLogsListProps {
  ideaId?: number | string
}

export function AudioLogsList({ ideaId }: AudioLogsListProps) {
  const [audioLogs, setAudioLogs] = useState<AudioLog[]>([])
  const [loading, setLoading] = useState(true)
  const [playingId, setPlayingId] = useState<number | null>(null)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [editTranscription, setEditTranscription] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    fetchAudioLogs()
  }, [ideaId])

  const fetchAudioLogs = async () => {
    setLoading(true)
    try {
      const logs = ideaId ? await getIdeaAudioLogs(ideaId) : await getUserAudioLogs()
      setAudioLogs(logs as AudioLog[])
    } catch (error) {
      console.error("Error fetching audio logs:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handlePlay = (id: number, filePath: string) => {
    if (audio) {
      audio.pause()
    }

    if (playingId === id) {
      setPlayingId(null)
      return
    }

    const audioUrl = getAudioUrl(filePath)
    const newAudio = new Audio(audioUrl)

    newAudio.addEventListener("ended", () => {
      setPlayingId(null)
    })

    newAudio.play()
    setAudio(newAudio)
    setPlayingId(id)
  }

  const handleEdit = (log: AudioLog) => {
    setEditingId(log.id)
    setEditTitle(log.title)
    setEditTranscription(log.transcription || "")
  }

  const handleSave = async (id: number) => {
    try {
      await updateAudioLogMetadata(id, {
        title: editTitle,
        transcription: editTranscription,
      })

      setAudioLogs((logs) =>
        logs.map((log) => (log.id === id ? { ...log, title: editTitle, transcription: editTranscription } : log)),
      )

      setEditingId(null)
      toast({
        title: "Audio log updated",
        description: "The audio log metadata has been updated successfully.",
      })
    } catch (error) {
      console.error("Error updating audio log:", error)
      toast({
        title: "Update failed",
        description: "Failed to update audio log metadata.",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this audio log?")) {
      return
    }

    try {
      const success = await deleteAudioLog(id)

      if (success) {
        setAudioLogs((logs) => logs.filter((log) => log.id !== id))
        toast({
          title: "Audio log deleted",
          description: "The audio log has been deleted successfully.",
        })
      } else {
        throw new Error("Failed to delete audio log")
      }
    } catch (error) {
      console.error("Error deleting audio log:", error)
      toast({
        title: "Deletion failed",
        description: "Failed to delete audio log.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (audioLogs.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            <FileAudio className="mx-auto h-12 w-12 opacity-50" />
            <p className="mt-2">No audio logs found</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Audio Logs ({audioLogs.length})</h3>

      {audioLogs.map((log) => (
        <Card key={log.id} className="overflow-hidden">
          <CardHeader className="pb-3">
            {editingId === log.id ? (
              <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="font-medium" />
            ) : (
              <CardTitle className="text-base">{log.title}</CardTitle>
            )}
            <CardDescription className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatDistanceToNow(new Date(log.created_at), { addSuffix: true })}
              {log.duration && <span className="ml-2">• {formatDuration(log.duration)}</span>}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {editingId === log.id ? (
              <div className="space-y-2">
                <Label htmlFor={`transcription-${log.id}`}>Transcription</Label>
                <textarea
                  id={`transcription-${log.id}`}
                  value={editTranscription}
                  onChange={(e) => setEditTranscription(e.target.value)}
                  className="w-full min-h-[100px] p-2 border rounded-md"
                />
              </div>
            ) : (
              <div className="text-sm">
                {log.transcription ? (
                  <p>{log.transcription}</p>
                ) : (
                  <p className="text-muted-foreground italic">No transcription available</p>
                )}
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between pt-0">
            <Button variant="outline" size="sm" onClick={() => handlePlay(log.id, log.file_path)}>
              {playingId === log.id ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Play
                </>
              )}
            </Button>

            <div className="flex gap-2">
              {editingId === log.id ? (
                <Button variant="outline" size="sm" onClick={() => handleSave(log.id)}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              ) : (
                <Button variant="outline" size="sm" onClick={() => handleEdit(log)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}

              <Button
                variant="outline"
                size="sm"
                className="text-destructive hover:text-destructive"
                onClick={() => handleDelete(log.id)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
