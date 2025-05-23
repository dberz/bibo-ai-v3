"use client"

import { createContext, useContext, useState, useEffect } from "react"
import type { Book } from "@/types/book"
import { getBookById } from "@/lib/books"
import { audioPlayer } from "@/lib/player/audio-player"

interface PlayerContextType {
  isPlaying: boolean
  currentBookId: string | null
  currentBook: Book | null
  currentTime: number
  duration: number
  currentRewriteId: string
  startPlayback: (bookId: string) => void
  stopPlayback: () => void
  togglePlayback: () => void
  togglePlayPause: () => void
  seekTo: (time: number) => void
  skipForward: (seconds: number) => void
  skipBackward: (seconds: number) => void
  setCurrentRewrite: (rewriteId: string) => void
  setVolume: (volume: number) => void
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined)

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentBookId, setCurrentBookId] = useState<string | null>(null)
  const [currentBook, setCurrentBook] = useState<Book | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentRewriteId, setCurrentRewriteId] = useState("original")

  useEffect(() => {
    if (!audioPlayer) return

    const timeUpdateCleanup = audioPlayer?.onTimeUpdate(() => {
      setCurrentTime(audioPlayer?.getCurrentTime() ?? 0)
      setDuration(audioPlayer?.getDuration() ?? 0)
    }) ?? (() => {})

    const endedCleanup = audioPlayer?.onEnded(() => {
      setIsPlaying(false)
    }) ?? (() => {})

    return () => {
      timeUpdateCleanup()
      endedCleanup()
    }
  }, [])

  useEffect(() => {
    if (currentBookId) {
      const book = getBookById(currentBookId)
      setCurrentBook(book || null)

      if (book && audioPlayer) {
        // Load the first paragraph or chapter of the book
        const text = book.description // For now, just use the description
        audioPlayer.loadAudio(currentBookId, text)
      }
    } else {
      setCurrentBook(null)
    }
  }, [currentBookId])

  const startPlayback = (bookId: string) => {
    setCurrentBookId(bookId)
    setIsPlaying(true)
    if (audioPlayer) {
      audioPlayer.play()
    }
  }

  const stopPlayback = () => {
    setCurrentBookId(null)
    setIsPlaying(false)
    if (audioPlayer) {
      audioPlayer.stop()
    }
  }

  const togglePlayback = () => {
    if (isPlaying) {
      if (audioPlayer) audioPlayer.pause()
    } else {
      if (audioPlayer) audioPlayer.play()
    }
    setIsPlaying(!isPlaying)
  }

  const togglePlayPause = togglePlayback

  const seekTo = (time: number) => {
    if (audioPlayer) {
      audioPlayer.setTime(time)
    }
  }

  const skipForward = (seconds: number) => {
    if (audioPlayer) {
      audioPlayer.setTime(audioPlayer.getCurrentTime() + seconds)
    }
  }

  const skipBackward = (seconds: number) => {
    if (audioPlayer) {
      audioPlayer.setTime(Math.max(audioPlayer.getCurrentTime() - seconds, 0))
    }
  }

  const setCurrentRewrite = (rewriteId: string) => {
    setCurrentRewriteId(rewriteId)
    if (audioPlayer) {
      audioPlayer.setRewrite(rewriteId)
    }
  }

  const setVolume = (volume: number) => {
    if (audioPlayer) {
      audioPlayer.setVolume(volume)
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        isPlaying,
        currentBookId,
        currentBook,
        currentTime,
        duration,
        currentRewriteId,
        startPlayback,
        stopPlayback,
        togglePlayback,
        togglePlayPause,
        seekTo,
        skipForward,
        skipBackward,
        setCurrentRewrite,
        setVolume,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const context = useContext(PlayerContext)
  if (context === undefined) {
    throw new Error("usePlayer must be used within a PlayerProvider")
  }
  return context
}
