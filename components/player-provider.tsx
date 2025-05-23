"use client"

import { createContext, type ReactNode } from "react"
import { usePlayer } from "@/lib/player/use-player"

interface PlayerContextType {
  isPlaying: boolean
  currentTime: number
  duration: number
  currentBookId: string | null
  currentVoiceId: string
  currentRewriteId: string
  startPlayback: (bookId: string) => void
  stopPlayback: () => void
  togglePlayback: () => void
  seekTo: (time: number) => void
  skipForward: (seconds: number) => void
  skipBackward: (seconds: number) => void
  setVoice: (voiceId: string) => void
  setRewrite: (rewriteId: string) => void
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined)

export function PlayerProvider({ children }: { children: ReactNode }) {
  // We're now using the hook directly in the provider
  const player = usePlayer()

  return <PlayerContext.Provider value={player}>{children}</PlayerContext.Provider>
}

// This is now just a re-export of the hook
export { usePlayer }
