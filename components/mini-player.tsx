"use client"

import { usePlayer } from "@/lib/player/player-context"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react"
import { formatTime } from "@/lib/utils"
import Image from "next/image"

export function MiniPlayer() {
  const {
    currentBook,
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlayback,
    seekTo,
    skipForward,
    skipBackward,
    setVolume,
  } = usePlayer()

  if (!currentBook) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Book Info */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
              <Image
                src={currentBook.coverUrl || "/placeholder.svg"}
                alt={currentBook.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-medium text-sm truncate">{currentBook.title}</h4>
              <p className="text-xs text-muted-foreground truncate">{currentBook.author}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => skipBackward(10)}>
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePlayback}
              className="bg-emerald-500 hover:bg-emerald-600 text-white"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => skipForward(10)}>
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress */}
          <div className="hidden md:flex items-center gap-2 flex-1 max-w-md">
            <span className="text-xs text-muted-foreground w-10">{formatTime(currentTime)}</span>
            <Slider
              value={[currentTime]}
              max={duration}
              step={1}
              onValueChange={([value]) => seekTo(value)}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground w-10">{formatTime(duration)}</span>
          </div>

          {/* Volume */}
          <div className="hidden lg:flex items-center gap-2 w-24">
            <Volume2 className="h-4 w-4 text-muted-foreground" />
            <Slider
              value={[volume * 100]}
              max={100}
              step={1}
              onValueChange={([value]) => setVolume(value / 100)}
              className="flex-1"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
