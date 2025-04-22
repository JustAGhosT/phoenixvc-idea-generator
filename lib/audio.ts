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

// Start recording audio using MediaRecorder API
export function startRecording(callback: (recorder: MediaRecorder) => void): void {
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {
      const recorder = new MediaRecorder(stream)
      callback(recorder)
      recorder.start()
    })
    .catch((error) => {
      console.error("Error starting recording:", error)
      throw error // Re-throw to be caught by the component
    })
}

// Stop recording audio
export function stopRecording(recorder: MediaRecorder): void {
  recorder.stop()
  recorder.stream.getTracks().forEach((track) => track.stop())
}

// Upload audio to Supabase storage
export async function uploadAudio(
  audioBlob: Blob,
  ideaId: number | string | undefined,
  title: string,
): Promise<string | null> {
  try {
    const filename = generateAudioFilename()
    const { data, error } = await supabase.storage.from("audio-logs").upload(filename, audioBlob, {
      contentType: "audio/webm",
    })

    if (error) {
      console.error("Error uploading audio:", error)
      return null
    }

    const duration = await getAudioDuration(audioBlob)

    // Save metadata to the database
    const session = await supabase.auth.getSession()
    const userId = session.data?.session?.user.id

    if (!userId) {
      console.error("User not authenticated")
      return null
    }

    await saveAudioLogMetadata({
      userId: userId,
      filePath: filename,
      ideaId: ideaId,
      title: title,
      duration: duration,
    })

    return filename
  } catch (error) {
    console.error("Error in uploadAudio:", error)
    return null
  }
}

// Save audio log metadata to the database
async function saveAudioLogMetadata(metadata: Omit<AudioLogMetadata, "id" | "createdAt">): Promise<void> {
  const { error } = await supabase.from("audio_logs").insert([metadata])

  if (error) {
    console.error("Error saving audio log metadata:", error)
    throw error
  }
}

// Get user audio logs
export async function getUserAudioLogs(): Promise<any[] | null> {
  try {
    const session = await supabase.auth.getSession()
    const userId = session.data?.session?.user.id

    if (!userId) {
      console.error("User not authenticated")
      return null
    }

    const { data, error } = await supabase
      .from("audio_logs")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching user audio logs:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error in getUserAudioLogs:", error)
    return null
  }
}

// Get idea audio logs
export async function getIdeaAudioLogs(ideaId: number | string): Promise<any[] | null> {
  try {
    const { data, error } = await supabase
      .from("audio_logs")
      .select("*")
      .eq("idea_id", ideaId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching idea audio logs:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error in getIdeaAudioLogs:", error)
    return null
  }
}

// Update audio log metadata
export async function updateAudioLogMetadata(id: number, updates: Partial<AudioLogMetadata>): Promise<boolean> {
  try {
    const { error } = await supabase.from("audio_logs").update(updates).eq("id", id)

    if (error) {
      console.error("Error updating audio log metadata:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Error in updateAudioLogMetadata:", error)
    return false
  }
}

// Delete audio log
export async function deleteAudioLog(id: number): Promise<boolean> {
  try {
    // First, get the file path
    const { data: audioLog, error: selectError } = await supabase
      .from("audio_logs")
      .select("file_path")
      .eq("id", id)
      .single()

    if (selectError) {
      console.error("Error fetching audio log for deletion:", selectError)
      return false
    }

    // Delete from storage
    const { error: storageError } = await supabase.storage.from("audio-logs").remove([audioLog.file_path])

    if (storageError) {
      console.error("Error deleting audio from storage:", storageError)
      return false
    }

    // Delete from database
    const { error: deleteError } = await supabase.from("audio_logs").delete().eq("id", id)

    if (deleteError) {
      console.error("Error deleting audio log from database:", deleteError)
      return false
    }

    return true
  } catch (error) {
    console.error("Error in deleteAudioLog:", error)
    return false
  }
}
