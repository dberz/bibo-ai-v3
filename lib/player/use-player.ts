"use client"

// Create this file to implement the expected interface for the player
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getBookById } from "@/lib/books"
import { trackListenStart, trackListenComplete, trackSegmentPlay } from "@/lib/analytics"

interface PlayerState {
  isPlaying: boolean
  currentTime: number
  duration: number
  currentBookId: string | null
  currentVoiceId: string
  currentRewriteId: string
}

export function usePlayer() {
  const [state, setState] = useState<PlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 300, // 5 minutes default
    currentBookId: null,
    currentVoiceId: "emily-bright",
    currentRewriteId: "original",
  })
  const router = useRouter()

  // Simulate playback with a timer
  useEffect(() => {
    let timer: NodeJS.Timeout

    if (state.isPlaying) {
      timer = setInterval(() => {
        setState((prev) => {
          if (prev.currentTime >= prev.duration) {
            if (prev.currentBookId) {
              trackListenComplete(prev.currentBookId)
            }
            return { ...prev, isPlaying: false, currentTime: 0 }
          }

          // Track segment play every 15 seconds
          if (Math.floor(prev.currentTime / 15) !== Math.floor((prev.currentTime + 1) / 15) && prev.currentBookId) {
            trackSegmentPlay(prev.currentBookId, `segment-${Math.floor((prev.currentTime + 1) / 15)}`)
          }

          return { ...prev, currentTime: prev.currentTime + 1 }
        })
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [state.isPlaying, state.duration, state.currentBookId])

  const startPlayback = (bookId: string) => {
    const book = getBookById(bookId)
    if (!book) return

    setState((prev) => ({
      ...prev,
      currentBookId: bookId,
      currentTime: 0,
      isPlaying: true,
      duration: 300, // Set a default duration or calculate from book
    }))

    trackListenStart(bookId)
  }

  const stopPlayback = () => {
    setState((prev) => ({
      ...prev,
      isPlaying: false,
      currentTime: 0,
      currentBookId: null,
    }))
  }

  const togglePlayback = () => {
    setState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }))
  }

  const seekTo = (time: number) => {
    setState((prev) => ({ ...prev, currentTime: time }))
  }

  const skipForward = (seconds: number) => {
    setState((prev) => ({
      ...prev,
      currentTime: Math.min(prev.currentTime + seconds, prev.duration),
    }))
  }

  const skipBackward = (seconds: number) => {
    setState((prev) => ({
      ...prev,
      currentTime: Math.max(prev.currentTime - seconds, 0),
    }))
  }

  const setVoice = (voiceId: string) => {
    setState((prev) => ({ ...prev, currentVoiceId: voiceId }))
  }

  const setRewrite = (rewriteId: string) => {
    setState((prev) => ({ ...prev, currentRewriteId: rewriteId }))
  }

  return {
    ...state,
    startPlayback,
    stopPlayback,
    togglePlayback,
    seekTo,
    skipForward,
    skipBackward,
    setVoice,
    setRewrite,
  }
}
