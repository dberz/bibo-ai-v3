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
import Image from "next/image"

interface BookAudioVisualizerProps {
  book: Book
  compact?: boolean
}

export function BookAudioVisualizer({ book, compact = false }: BookAudioVisualizerProps) {
  const { isPlaying, currentTime, duration, setCurrentBook, togglePlayback, seekTo, currentBook, adPlaying, playbackMode } = usePlayer()
  const [volume, setVolume] = useState(80)
  const [isHovered, setIsHovered] = useState(false)

  const handlePlay = () => {
    if (!isPlaying || currentBook?.id !== book.id) {
      setCurrentBook(book)
    }
    togglePlayback()
  }

  const handleSeek = (value: number[]) => {
    if (!adPlaying) seekTo(value[0])
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
  }

  const handleSkip = (seconds: number) => {
    if (!adPlaying) seekTo(currentTime + seconds)
  }

  // Calculate progress for framer-motion
  const progress = duration > 0 ? Math.min(currentTime / duration, 1) : 0

  if (compact) {
    return (
      <Card className="border-emerald-500/20 shadow-lg overflow-hidden">
        <CardContent className="p-3">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={togglePlayback}
              disabled={adPlaying}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">
                {playbackMode === 'ad' ? 'Sponsored Message' : book.title}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <div className="relative flex-1 h-2 rounded bg-muted/30 overflow-hidden">
                  <motion.div
                    className="absolute left-0 top-0 h-full bg-emerald-500 rounded"
                    style={{ width: progress * 100 + '%' }}
                    initial={{ width: 0 }}
                    animate={{ width: progress * 100 + '%' }}
                    transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                  />
                  <Slider
                    value={[currentTime]}
                    max={duration}
                    step={1}
                    onValueChange={handleSeek}
                    className="absolute left-0 top-0 w-full h-2 opacity-0 cursor-pointer"
                    disabled={adPlaying}
                  />
                </div>
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
          {playbackMode === 'ad' && (
            <div className="flex items-center justify-center gap-2 mb-2 animate-fade-in">
              <span className="text-xs font-medium text-muted-foreground">Brought to you by</span>
              <Image src="/ads/Apple_logo_black.svg" alt="Apple logo" width={20} height={20} className="inline-block" style={{ filter: 'invert(0.7)', maxWidth: 32, maxHeight: 32, width: 'auto', height: 'auto', objectFit: 'contain' }} />
              <span className="text-xs font-semibold text-muted-foreground">Apple</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12"
                onClick={togglePlayback}
                disabled={adPlaying}
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </Button>
              <div>
                <div className="text-lg font-medium">
                  {playbackMode === 'ad' ? 'Sponsored Message' : book.title}
                </div>
                <div className="text-sm text-muted-foreground">{book.author}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleSkip(-10)}
                disabled={adPlaying}
              >
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleSkip(10)}
                disabled={adPlaying}
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
            <div className="relative flex-1 h-3 rounded bg-muted/30 overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 h-full bg-emerald-500 rounded"
                style={{ width: progress * 100 + '%' }}
                initial={{ width: 0 }}
                animate={{ width: progress * 100 + '%' }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              />
              <Slider
                value={[currentTime]}
                max={duration}
                step={1}
                onValueChange={handleSeek}
                className="absolute left-0 top-0 w-full h-3 opacity-0 cursor-pointer"
                disabled={adPlaying}
              />
            </div>
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