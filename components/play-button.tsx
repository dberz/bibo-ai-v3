"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Play, Headphones } from "lucide-react"
import { usePlayer } from "@/lib/player/use-player"

interface PlayButtonProps {
  bookId: string
  large?: boolean
}

export function PlayButton({ bookId, large = false }: PlayButtonProps) {
  const router = useRouter()
  const { startPlayback } = usePlayer()

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation if inside a link
    startPlayback(bookId)
    router.push(`/player/${bookId}`)
  }

  return (
    <Button
      onClick={handlePlay}
      size={large ? "lg" : "default"}
      className={`${
        large ? "px-8" : ""
      } bg-emerald-500 hover:bg-emerald-600 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 font-nunito`}
    >
      {large ? (
        <>
          <Headphones className="mr-2 h-5 w-5" />
          Listen to Audiobook
        </>
      ) : (
        <>
          <Play className="mr-2 h-4 w-4" />
          Play
        </>
      )}
    </Button>
  )
}
