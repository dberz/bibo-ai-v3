"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, Volume2, SkipBack, SkipForward } from "lucide-react"
import { usePlayer } from "@/lib/player/player-context"
import type { Book } from "@/types/book"
import { formatTime } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface BookAudioVisualizerProps {
  book: Book
  compact?: boolean
}

export function BookAudioVisualizer({ book, compact = false }: BookAudioVisualizerProps) {
  const { isPlaying, currentTime, duration, setCurrentBook, togglePlayback, seekTo } = usePlayer()
  const [volume, setVolume] = useState(80)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    setCurrentBook(book)
  }, [book, setCurrentBook])

  const handlePlay = () => {
    setCurrentBook(book)
    togglePlayback()
  }

  const handleSeek = (value: number[]) => {
    seekTo(value[0])
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
  }

  const handleSkip = (seconds: number) => {
    seekTo(currentTime + seconds)
  }

  if (compact) {
    return (
      <Card className="border-emerald-500/20 shadow-lg overflow-hidden">
        <CardContent className="p-3">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handlePlay}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{book.title}</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <Slider
                  value={[currentTime]}
                  max={duration}
                  step={1}
                  onValueChange={handleSeek}
                  className="flex-1"
                />
                <span>{formatTime(duration)}</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleVolumeChange([volume === 0 ? 80 : 0])}
            >
              <Volume2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-emerald-500/20 shadow-lg overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12"
                onClick={handlePlay}
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </Button>
              <div>
                <div className="text-lg font-medium">{book.title}</div>
                <div className="text-sm text-muted-foreground">{book.author}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleSkip(-10)}
              >
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleSkip(10)}
              >
                <SkipForward className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleVolumeChange([volume === 0 ? 80 : 0])}
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground w-12">
              {formatTime(currentTime)}
            </span>
            <Slider
              value={[currentTime]}
              max={duration}
              step={1}
              onValueChange={handleSeek}
              className="flex-1"
            />
            <span className="text-sm text-muted-foreground w-12">
              {formatTime(duration)}
            </span>
          </div>

          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex items-center gap-4"
              >
                <Volume2 className="h-4 w-4 text-muted-foreground" />
                <Slider
                  value={[volume]}
                  max={100}
                  step={1}
                  onValueChange={handleVolumeChange}
                  className="w-32"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  )
} 