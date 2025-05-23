class AudioPlayer {
  private audio: HTMLAudioElement | null = null
  private currentBookId: string | null = null
  private currentRewriteId: string = "original"
  private voice: string = "alloy"

  constructor() {
    if (typeof window !== "undefined") {
      this.audio = new Audio()
    }
  }

  async loadAudio(bookId: string, text: string) {
    if (!this.audio) return

    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          voice: this.voice,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate audio")
      }

      const audioBlob = await response.blob()
      const audioUrl = URL.createObjectURL(audioBlob)

      this.audio.src = audioUrl
      this.currentBookId = bookId
      
      // Clean up the old audio URL
      return () => URL.revokeObjectURL(audioUrl)
    } catch (error) {
      console.error("Failed to load audio:", error)
    }
  }

  play() {
    if (this.audio) {
      this.audio.play()
    }
  }

  pause() {
    if (this.audio) {
      this.audio.pause()
    }
  }

  stop() {
    if (this.audio) {
      this.audio.pause()
      this.audio.currentTime = 0
    }
  }

  setTime(time: number) {
    if (this.audio) {
      this.audio.currentTime = time
    }
  }

  setVolume(volume: number) {
    if (this.audio) {
      this.audio.volume = volume
    }
  }

  getCurrentTime(): number {
    return this.audio?.currentTime || 0
  }

  getDuration(): number {
    return this.audio?.duration || 0
  }

  setVoice(voice: string) {
    this.voice = voice
  }

  setRewrite(rewriteId: string) {
    this.currentRewriteId = rewriteId
  }

  onTimeUpdate(callback: () => void) {
    if (this.audio) {
      this.audio.addEventListener("timeupdate", callback)
      return () => this.audio?.removeEventListener("timeupdate", callback)
    }
    return () => {}
  }

  onEnded(callback: () => void) {
    if (this.audio) {
      this.audio.addEventListener("ended", callback)
      return () => this.audio?.removeEventListener("ended", callback)
    }
    return () => {}
  }
}

// Export a singleton instance
export const audioPlayer = typeof window !== "undefined" ? new AudioPlayer() : null 