"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, Volume2, Headphones } from "lucide-react"
import { usePlayer } from "@/lib/player/use-player"
import { formatTime } from "@/lib/utils"
import { getBookById } from "@/lib/books"
import type { Book } from "@/types/book"

interface AudioPreviewProps {
  bookId: string
}

export function AudioPreview({ bookId }: AudioPreviewProps) {
  const { isPlaying, currentTime, duration, startPlayback, togglePlayback, seekTo } = usePlayer()
  const [book, setBook] = useState<Book | null>(null)
  const [volume, setVolume] = useState(80)

  useEffect(() => {
    const foundBook = getBookById(bookId)
    setBook(foundBook || null)
  }, [bookId])

  if (!book) return null

  const handlePlay = () => {
    if (!isPlaying) {
      startPlayback(bookId)
    } else {
      togglePlayback()
    }
  }

  // Generate a simple waveform visualization
  const waveformBars = Array.from({ length: 60 }, (_, i) => {
    // Create a more random but still somewhat sinusoidal pattern
    const height = Math.sin(i * 0.2) * 0.3 + Math.random() * 0.4 + 0.3
    return height * 100
  })

  return (
    <Card className="border-emerald-500/20">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <Headphones className="h-5 w-5 text-emerald-500 mr-2" />
          <h3 className="text-xl font-outfit font-semibold">Audio Preview</h3>
        </div>

        <div className="space-y-4">
          {/* Waveform visualization */}
          <div className="flex items-center h-16 gap-[2px]">
            {waveformBars.map((height, i) => (
              <div
                key={i}
                className={`w-1 rounded-full ${
                  i / waveformBars.length < currentTime / duration ? "bg-emerald-500" : "bg-emerald-500/20"
                }`}
                style={{ height: `${height}%` }}
              ></div>
            ))}
          </div>

          <div className="flex items-center justify-between font-nunito">
            <span className="text-sm text-muted-foreground">{formatTime(currentTime)}</span>
            <span className="text-sm text-muted-foreground">{formatTime(duration)}</span>
          </div>

          <Slider
            value={[currentTime]}
            max={duration}
            step={1}
            onValueChange={(value) => seekTo(value[0])}
            className="mt-2"
          />

          <div className="flex items-center justify-between">
            <Button onClick={handlePlay} className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-6">
              {isPlaying ? (
                <>
                  <Pause className="h-4 w-4 mr-2" /> Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" /> Play Sample
                </>
              )}
            </Button>

            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-muted-foreground" />
              <Slider
                value={[volume]}
                max={100}
                step={1}
                onValueChange={(value) => setVolume(value[0])}
                className="w-24"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
