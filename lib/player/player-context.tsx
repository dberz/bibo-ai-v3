"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { Book } from "@/types/book"
import { getVoicePreferences } from "@/lib/voice-storage"

interface PlayerState {
  currentBook: Book | null
  isPlaying: boolean
  currentTime: number
  duration: number
  currentVoiceId: string
  currentRewriteId: string
  volume: number
}

interface PlayerContextType extends PlayerState {
  setCurrentBook: (book: Book | null) => void
  play: () => void
  pause: () => void
  togglePlayback: () => void
  seekTo: (time: number) => void
  skipForward: (seconds: number) => void
  skipBackward: (seconds: number) => void
  setVoice: (voiceId: string) => void
  setRewrite: (rewriteId: string) => void
  setVolume: (volume: number) => void
  startPlayback: (bookId: string) => void
}

// Create the context with a default undefined value
const PlayerContext = createContext<PlayerContextType | undefined>(undefined)

// Provider component
export function PlayerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PlayerState>(() => {
    const preferences = typeof window !== "undefined" ? getVoicePreferences() : { defaultVoiceId: "emily-bright" }
    return {
      currentBook: null,
      isPlaying: false,
      currentTime: 0,
      duration: 240,
      currentVoiceId: preferences.defaultVoiceId,
      currentRewriteId: "original",
      volume: 1,
    }
  })

  const setCurrentBook = useCallback((book: Book | null) => {
    setState((prev) => ({ ...prev, currentBook: book, isPlaying: false, currentTime: 0 }))
  }, [])

  const play = useCallback(() => {
    setState((prev) => ({ ...prev, isPlaying: true }))
  }, [])

  const pause = useCallback(() => {
    setState((prev) => ({ ...prev, isPlaying: false }))
  }, [])

  const togglePlayback = useCallback(() => {
    setState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }))
  }, [])

  const seekTo = useCallback((time: number) => {
    setState((prev) => ({ ...prev, currentTime: time }))
  }, [])

  const skipForward = useCallback((seconds: number) => {
    setState((prev) => ({
      ...prev,
      currentTime: Math.min(prev.currentTime + seconds, prev.duration),
    }))
  }, [])

  const skipBackward = useCallback((seconds: number) => {
    setState((prev) => ({
      ...prev,
      currentTime: Math.max(prev.currentTime - seconds, 0),
    }))
  }, [])

  const setVoice = useCallback((voiceId: string) => {
    setState((prev) => ({ ...prev, currentVoiceId: voiceId }))
  }, [])

  const setRewrite = useCallback((rewriteId: string) => {
    setState((prev) => ({ ...prev, currentRewriteId: rewriteId }))
  }, [])

  const setVolume = useCallback((volume: number) => {
    setState((prev) => ({ ...prev, volume }))
  }, [])

  const startPlayback = useCallback((bookId: string) => {
    // In a real implementation, this would fetch the book and start playback
    // For now, we'll just simulate it
    import("@/lib/books").then(({ getBookById }) => {
      const book = getBookById(bookId)
      if (book) {
        setState((prev) => ({
          ...prev,
          currentBook: book,
          isPlaying: true,
          currentTime: 0,
        }))
      }
    })
  }, [])

  // Create the context value object
  const value: PlayerContextType = {
    ...state,
    setCurrentBook,
    play,
    pause,
    togglePlayback,
    seekTo,
    skipForward,
    skipBackward,
    setVoice,
    setRewrite,
    setVolume,
    startPlayback,
  }

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
}

// Hook to use the player context
export function usePlayer() {
  const context = useContext(PlayerContext)
  if (context === undefined) {
    throw new Error("usePlayer must be used within a PlayerProvider")
  }
  return context
}
