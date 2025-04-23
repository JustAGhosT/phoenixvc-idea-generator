"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Play, Pause, Save } from "lucide-react"
import { startRecording, stopRecording, uploadAudio } from "@/lib/audio"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AudioRecorderProps {
  onAudioSaved: (audioUrl: string) => void
  ideaId?: number | string
}

export function AudioRecorder({ onAudioSaved, ideaId }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [title, setTitle] = useState<string>("")
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    return () => {
      // Clean up when component unmounts
      if (recorder && recorder.state !== "inactive") {
        recorder.stop()
      }

      if (audio) {
        audio.pause()
        audio.src = ""
      }
    }
  }, [recorder, audio])

  const handleStartRecording = () => {
    setError(null)
    setAudioBlob(null)
    setAudioUrl(null)
    setTitle(`Audio Note - ${new Date().toLocaleString()}`)

    try {
      startRecording((newRecorder) => {
        setRecorder(newRecorder)
        setIsRecording(true)

        // Set up dataavailable event handler
        newRecorder.addEventListener("dataavailable", (event) => {
          const blob = new Blob([event.data], { type: "audio/webm" })
          setAudioBlob(blob)
          setAudioUrl(URL.createObjectURL(blob))
        })
      })
    } catch (err) {
      setError("Failed to start recording. Please check your microphone permissions.")
    }
  }

  const handleStopRecording = () => {
    if (recorder) {
      stopRecording(recorder)
      setIsRecording(false)
    }
  }

  const togglePlayback = () => {
    if (!audioUrl) return

    if (!audio) {
      const newAudio = new Audio(audioUrl)
      newAudio.addEventListener("ended", () => setIsPlaying(false))
      setAudio(newAudio)
      newAudio.play()
      setIsPlaying(true)
    } else {
      if (isPlaying) {
        audio.pause()
      } else {
        audio.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleSave = async () => {
    if (!audioBlob) return

    setIsSaving(true)

    try {
      const url = await uploadAudio(audioBlob, ideaId, title)

      if (url) {
        onAudioSaved(url)
        setError(null)
      } else {
        throw new Error("Failed to upload audio")
      }
    } catch (err) {
      setError("Failed to save audio recording.")
      console.error(err)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        {!isRecording ? (
          <Button type="button" variant="outline" size="sm" onClick={handleStartRecording}>
            <Mic className="h-4 w-4 mr-2" />
            Start Recording
          </Button>
        ) : (
          <Button type="button" variant="destructive" size="sm" onClick={handleStopRecording}>
            <MicOff className="h-4 w-4 mr-2" />
            Stop Recording
          </Button>
        )}

        {audioUrl && (
          <Button type="button" variant="outline" size="sm" onClick={togglePlayback}>
            {isPlaying ? (
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
        )}
      </div>

      {isRecording && <div className="text-sm text-red-500 animate-pulse">Recording in progress...</div>}

      {audioBlob && !isRecording && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="audio-title">Title</Label>
            <Input
              id="audio-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title for this recording"
            />
          </div>

          <Button type="button" onClick={handleSave} disabled={isSaving} className="w-full">
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Recording
              </>
            )}
          </Button>
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
