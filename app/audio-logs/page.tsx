"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AudioLogsList } from "@/components/audio-logs-list"
import { AudioRecorder } from "@/components/audio-recorder"
import { useToast } from "@/components/ui/use-toast"
import { FileAudio, Plus } from "lucide-react"

export default function AudioLogsPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const { toast } = useToast()

  const handleAudioSaved = (url: string) => {
    toast({
      title: "Audio saved",
      description: "Your audio recording has been saved successfully.",
    })
    // Trigger a refresh of the audio logs list
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Audio Logs</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileAudio className="h-5 w-5" />
                Audio Logs Library
              </CardTitle>
              <CardDescription>Browse and manage your recorded audio notes</CardDescription>
            </CardHeader>
            <CardContent>
              <AudioLogsList key={refreshTrigger} />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Record New Audio
              </CardTitle>
              <CardDescription>Create a new audio note or recording</CardDescription>
            </CardHeader>
            <CardContent>
              <AudioRecorder onAudioSaved={handleAudioSaved} />
            </CardContent>
          </Card>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Audio Log Tips</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>
                  <strong>Keep it concise:</strong> Focus on key insights and decisions.
                </p>
                <p>
                  <strong>Structure your thoughts:</strong> Start with the main point, then provide supporting details.
                </p>
                <p>
                  <strong>Add context:</strong> Mention the project and specific area you're discussing.
                </p>
                <p>
                  <strong>End with actions:</strong> Summarize next steps or decisions made.
                </p>
                <p className="text-xs text-muted-foreground italic mt-4">
                  "Ideas are the beginning points of all fortunes." — Napoleon Hill
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
