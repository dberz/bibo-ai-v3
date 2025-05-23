"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Play, Pause, X, Volume2 } from "lucide-react"
import { usePlayer } from "@/lib/player/use-player"
import { getBookById } from "@/lib/books"
import type { Book } from "@/types/book"
import { Slider } from "@/components/ui/slider"
import { formatTime } from "@/lib/utils"

export function MiniPlayer() {
  const { isPlaying, currentBookId, currentTime, duration, togglePlayback, stopPlayback, seekTo } = usePlayer()
  const [book, setBook] = useState<Book | null>(null)
  const [volume, setVolume] = useState(80)
  const [showVolume, setShowVolume] = useState(false)

  useEffect(() => {
    if (currentBookId) {
      const foundBook = getBookById(currentBookId)
      setBook(foundBook || null)
    } else {
      setBook(null)
    }
  }, [currentBookId])

  if (!book) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-emerald-500/20 p-3 z-50 backdrop-blur-md bg-opacity-90 shadow-lg transition-all duration-300 ease-in-out">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href={`/player/${book.id}`} className="relative group">
            <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-20 rounded transition-opacity duration-300"></div>
            <img
              src={book.coverUrl || "/placeholder.svg"}
              alt={book.title}
              className="w-12 h-12 rounded object-cover shadow-md transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          <div className="flex flex-col">
            <Link href={`/player/${book.id}`} className="font-medium hover:text-emerald-500 transition-colors">
              {book.title}
            </Link>
            <p className="text-sm text-muted-foreground">{book.author}</p>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-2 flex-1 max-w-md mx-4">
          <span className="text-xs text-muted-foreground w-10">{formatTime(currentTime)}</span>
          <Slider
            value={[currentTime]}
            max={duration}
            step={1}
            onValueChange={(value) => seekTo(value[0])}
            className="flex-1"
          />
          <span className="text-xs text-muted-foreground w-10">{formatTime(duration)}</span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowVolume(!showVolume)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Volume2 className="h-4 w-4" />
            </Button>

            {showVolume && (
              <div className="absolute bottom-full right-0 mb-2 p-3 bg-card rounded-md shadow-lg border w-32">
                <Slider value={[volume]} max={100} step={1} onValueChange={(value) => setVolume(value[0])} />
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={togglePlayback}
            className="h-10 w-10 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500"
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={stopPlayback}
            className="text-muted-foreground hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
