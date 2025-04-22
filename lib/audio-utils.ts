import { supabase } from "./db"

// Generate a unique filename for audio uploads
export function generateAudioFilename(): string {
  return `audio-log-${Date.now()}.webm`
}

// Get audio duration from blob
export async function getAudioDuration(audioBlob: Blob): Promise<number> {
  return new Promise((resolve) => {
    const audio = new Audio()
    audio.src = URL.createObjectURL(audioBlob)

    audio.onloadedmetadata = () => {
      resolve(Math.round(audio.duration))
    }
  })
}

// Get public URL for audio file
export function getAudioUrl(path: string): string {
  const { data } = supabase.storage.from("audio-logs").getPublicUrl(path)
  return data.publicUrl
}

// Format audio duration for display
export function formatAudioDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}
