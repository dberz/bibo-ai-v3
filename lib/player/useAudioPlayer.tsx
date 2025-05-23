"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import type { Book } from "@/types"
import { getAd } from "@/lib/ai/ads"
import { callTTS } from "@/lib/ai/tts"
import {
  trackListenStart,
  trackListenComplete,
  trackSegmentPlay,
  trackAdImpression,
  trackRewriteSelected,
  trackVoiceSelected,
} from "@/lib/analytics"

// Number of segments to play before showing an ad
const SEGMENTS_BEFORE_AD = 12

export interface AudioPlayerState {
  isPlaying: boolean
  currentBook: Book | null
  currentSegmentIndex: number
  currentRewriteId: string | null
  currentVoiceId: string
  isLoading: boolean
  progress: number
  duration: number
  currentTime: number
  adPlaying: boolean
  adBanner: string | null
  adCta: string | null
}

export interface AudioPlayerActions {
  play: (book: Book, segmentIndex?: number) => void
  pause: () => void
  togglePlayPause: () => void
  seekTo: (time: number) => void
  nextSegment: () => void
  previousSegment: () => void
  setRewrite: (rewriteId: string | null) => void
  setVoice: (voiceId: string) => void
}

export type AudioPlayerHook = AudioPlayerState & AudioPlayerActions

/**
 * Custom hook for managing audio playback across the application
 * Handles TTS streaming, ad insertion, and playback state
 */
export function useAudioPlayer(): AudioPlayerHook {
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentBook: null,
    currentSegmentIndex: 0,
    currentRewriteId: null,
    currentVoiceId: "emily-bright", // Default voice
    isLoading: false,
    progress: 0,
    duration: 0,
    currentTime: 0,
    adPlaying: false,
    adBanner: null,
    adCta: null,
  })

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const segmentCountRef = useRef<number>(0)
  const router = useRouter()

  // Initialize audio element
  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio()

      // Clean up on unmount
      return () => {
        if (audioRef.current) {
          audioRef.current.pause()
          audioRef.current.src = ""
        }
      }
    }
  }, [])

  // Handle audio events
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => {
      setState((prev) => ({
        ...prev,
        currentTime: audio.currentTime,
        progress: audio.currentTime / (audio.duration || 1),
      }))
    }

    const handleDurationChange = () => {
      setState((prev) => ({
        ...prev,
        duration: audio.duration,
      }))
    }

    const handleEnded = () => {
      // Check if we need to play an ad
      if (segmentCountRef.current >= SEGMENTS_BEFORE_AD && !state.adPlaying) {
        playAd()
      } else {
        nextSegment()
      }
    }

    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("durationchange", handleDurationChange)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("durationchange", handleDurationChange)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [state.adPlaying, state.currentBook])

  // Play an advertisement
  const playAd = useCallback(async () => {
    if (!state.currentBook || !audioRef.current) return

    try {
      setState((prev) => ({ ...prev, isLoading: true, adPlaying: true }))

      // Get an ad relevant to the current book and user
      const ad = await getAd(
        state.currentBook.id,
        state.currentSegmentIndex,
        "user-123", // TODO: Replace with actual user ID
      )

      // Set ad banner and CTA
      setState((prev) => ({
        ...prev,
        adBanner: ad.img,
        adCta: ad.cta,
        isLoading: false,
      }))

      // Play ad audio
      audioRef.current.src = ad.audio
      audioRef.current.play()

      // Track ad impression
      trackAdImpression(ad.id)

      // Reset segment counter
      segmentCountRef.current = 0
    } catch (error) {
      console.error("Error playing ad:", error)
      setState((prev) => ({ ...prev, isLoading: false, adPlaying: false }))
      nextSegment()
    }
  }, [state.currentBook, state.currentSegmentIndex])

  // Play a specific segment of the book
  const playSegment = useCallback(
    async (segmentIndex: number) => {
      if (!state.currentBook || !audioRef.current) return

      try {
        setState((prev) => ({ ...prev, isLoading: true, currentSegmentIndex: segmentIndex }))

        // Get the text for this segment (potentially with rewrite)
        const segmentText = state.currentBook.segments[segmentIndex]

        // Get TTS audio URL for this segment
        const audioUrl = await callTTS(segmentText, state.currentVoiceId)

        audioRef.current.src = audioUrl
        audioRef.current.play()

        setState((prev) => ({
          ...prev,
          isPlaying: true,
          isLoading: false,
          adPlaying: false,
          adBanner: null,
          adCta: null,
        }))

        // Increment segment counter
        segmentCountRef.current += 1

        // Track segment play
        trackSegmentPlay(state.currentBook.id, `segment-${segmentIndex}`)
      } catch (error) {
        console.error("Error playing segment:", error)
        setState((prev) => ({ ...prev, isLoading: false }))
      }
    },
    [state.currentBook, state.currentVoiceId, state.currentRewriteId],
  )

  // Play a book from a specific segment
  const play = useCallback(
    (book: Book, segmentIndex = 0) => {
      setState((prev) => ({ ...prev, currentBook: book }))

      // Navigate to player if not already there
      if (typeof window !== "undefined") {
        router.push(`/player/${book.id}`)
      }

      // Start playback
      playSegment(segmentIndex)

      // Track listen start
      trackListenStart(book.id)
    },
    [playSegment, router, state.currentVoiceId, state.currentRewriteId],
  )

  // Pause playback
  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      setState((prev) => ({ ...prev, isPlaying: false }))
    }
  }, [])

  // Toggle play/pause
  const togglePlayPause = useCallback(() => {
    if (state.isPlaying) {
      pause()
    } else if (state.currentBook) {
      if (audioRef.current) {
        audioRef.current.play()
        setState((prev) => ({ ...prev, isPlaying: true }))
      }
    }
  }, [state.isPlaying, state.currentBook, pause])

  // Seek to a specific time
  const seekTo = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
    }
  }, [])

  // Play next segment
  const nextSegment = useCallback(() => {
    if (!state.currentBook) return

    const nextIndex = state.currentSegmentIndex + 1
    if (nextIndex < state.currentBook.segments.length) {
      playSegment(nextIndex)
    } else {
      // End of book
      setState((prev) => ({ ...prev, isPlaying: false }))

      // Track listen complete
      trackListenComplete(state.currentBook.id)
    }
  }, [state.currentBook, state.currentSegmentIndex, playSegment, state.currentVoiceId, state.currentRewriteId])

  // Play previous segment
  const previousSegment = useCallback(() => {
    if (!state.currentBook) return

    const prevIndex = state.currentSegmentIndex - 1
    if (prevIndex >= 0) {
      playSegment(prevIndex)
    }
  }, [state.currentBook, state.currentSegmentIndex, playSegment])

  // Set rewrite version
  const setRewrite = useCallback(
    (rewriteId: string | null) => {
      setState((prev) => ({ ...prev, currentRewriteId: rewriteId }))

      // Track rewrite selection
      if (state.currentBook && rewriteId) {
        trackRewriteSelected(state.currentBook.id, rewriteId)
      }

      // Restart current segment with new rewrite
      if (state.currentBook) {
        playSegment(state.currentSegmentIndex)
      }
    },
    [state.currentBook, state.currentSegmentIndex, playSegment],
  )

  // Set voice
  const setVoice = useCallback(
    (voiceId: string) => {
      setState((prev) => ({ ...prev, currentVoiceId: voiceId }))

      // Track voice selection - we'll handle this with a custom function
      if (state.currentBook) {
        trackVoiceSelected(state.currentBook.id, voiceId)
      }

      // Restart current segment with new voice
      if (state.currentBook) {
        playSegment(state.currentSegmentIndex)
      }
    },
    [state.currentBook, state.currentSegmentIndex, playSegment],
  )

  return {
    ...state,
    play,
    pause,
    togglePlayPause,
    seekTo,
    nextSegment,
    previousSegment,
    setRewrite,
    setVoice,
  }
}
