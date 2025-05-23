"use client"

import { useState, useEffect, useRef } from "react"
import { callTTS } from "@/lib/ai/tts"
import { getAd } from "@/lib/ai/ads"
import { trackAdImpression } from "@/lib/analytics"

interface UseAudioPlayerProps {
  bookId: string
  voiceId: string
  rewriteId: string
}

interface UseAudioPlayerReturn {
  isPlaying: boolean
  currentTime: number
  duration: number
  play: () => void
  pause: () => void
  seekTo: (time: number) => void
  skipForward: (seconds: number) => void
  skipBackward: (seconds: number) => void
  onAdStart: () => void
  onAdEnd: () => void
}

/**
 * Custom hook for audio playback with ad insertion
 */
export function useAudioPlayer({ bookId, voiceId, rewriteId }: UseAudioPlayerProps): UseAudioPlayerReturn {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isAdPlaying, setIsAdPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio()
    audioRef.current = audio

    // Set up event listeners
    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("loadedmetadata", handleMetadataLoaded)
    audio.addEventListener("ended", handleEnded)

    // Clean up
    return () => {
      audio.pause()
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("loadedmetadata", handleMetadataLoaded)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [])

  // Handle time update
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)

      // Check if we need to insert an ad
      // In a real implementation, this would check if we've reached a segment boundary
      if (currentTime > 0 && currentTime % 180 < 1 && !isAdPlaying) {
        insertAd()
      }
    }
  }

  // Handle metadata loaded
  const handleMetadataLoaded = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  // Handle playback ended
  const handleEnded = () => {
    if (isAdPlaying) {
      setIsAdPlaying(false)
      resumeContentPlayback()
    } else {
      setIsPlaying(false)
      setCurrentTime(0)
    }
  }

  // Insert an ad
  const insertAd = async () => {
    if (audioRef.current) {
      // Pause content playback
      audioRef.current.pause()
      setIsPlaying(false)

      // Get an ad
      const ad = await getAd(bookId, `segment-${Math.floor(currentTime / 15)}`, "user-1")

      // Track ad impression
      trackAdImpression(ad.id)

      // Play ad
      audioRef.current.src = ad.audioUrl
      audioRef.current.play()
      setIsAdPlaying(true)

      // Notify ad start
      onAdStart()
    }
  }

  // Resume content playback after ad
  const resumeContentPlayback = async () => {
    if (audioRef.current) {
      // Get TTS URL for current segment
      const ttsUrl = await callTTS(`This is segment ${Math.floor(currentTime / 15)} of the book.`, voiceId)

      // Resume content playback
      audioRef.current.src = ttsUrl
      audioRef.current.play()
      setIsPlaying(true)

      // Notify ad end
      onAdEnd()
    }
  }

  // Play
  const play = async () => {
    if (audioRef.current) {
      if (!audioRef.current.src) {
        // Get TTS URL for current segment
        const ttsUrl = await callTTS(`This is the beginning of the book.`, voiceId)
        audioRef.current.src = ttsUrl
      }

      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  // Pause
  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  // Seek to time
  const seekTo = (time: number) => {
    if (audioRef.current && !isAdPlaying) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  // Skip forward
  const skipForward = (seconds: number) => {
    if (audioRef.current && !isAdPlaying) {
      audioRef.current.currentTime += seconds
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  // Skip backward
  const skipBackward = (seconds: number) => {
    if (audioRef.current && !isAdPlaying) {
      audioRef.current.currentTime -= seconds
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  // Ad callbacks
  const onAdStart = () => {
    console.log("Ad started")
  }

  const onAdEnd = () => {
    console.log("Ad ended")
  }

  return {
    isPlaying,
    currentTime,
    duration,
    play,
    pause,
    seekTo,
    skipForward,
    skipBackward,
    onAdStart,
    onAdEnd,
  }
}
