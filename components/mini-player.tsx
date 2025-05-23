"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Play, Pause, X, Volume2, SkipBack, SkipForward } from "lucide-react"
import { usePlayer } from "@/lib/player/use-player"
import { getBookById } from "@/lib/books"
import type { Book } from "@/types/book"
import { Slider } from "@/components/ui/slider"
import { formatTime } from "@/lib/utils"
import { cn } from "@/lib/utils"

export function MiniPlayer() {
  const { currentBook, isPlaying, togglePlayPause } = usePlayer()
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(1)
  const [waveformData, setWaveformData] = useState<number[]>([])

  useEffect(() => {
    // Generate more detailed waveform data
    const generateWaveform = () => {
      const data = Array.from({ length: 100 }, () => Math.random() * 0.8 + 0.2)
      setWaveformData(data)
    }
    generateWaveform()
  }, [currentBook])

  if (!currentBook) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          <img 
            src={currentBook.coverUrl} 
            alt={currentBook.title} 
            className="h-12 w-12 rounded-md object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <div>
                <h3 className="font-heading font-medium line-clamp-1">{currentBook.title}</h3>
                <p className="text-sm text-muted-foreground font-body">{currentBook.author}</p>
              </div>
              <div className="flex-1 flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={togglePlayPause}
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
                <Button variant="ghost" size="icon">
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-4">
              <span className="text-sm text-muted-foreground min-w-[3ch] font-ui">
                {Math.floor(progress * 100)}%
              </span>
              <div className="flex-1 h-8 flex items-center">
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="relative w-full h-full">
                    {waveformData.map((height, i) => (
                      <div
                        key={i}
                        className={cn(
                          "absolute bottom-0 w-[1px] bg-primary transition-all",
                          i / waveformData.length <= progress ? "opacity-100" : "opacity-30"
                        )}
                        style={{
                          height: `${height * 100}%`,
                          left: `${(i / waveformData.length) * 100}%`,
                          transform: 'scaleY(1)',
                          transition: 'transform 0.2s ease-in-out',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scaleY(1.5)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scaleY(1)'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 min-w-[100px]">
                <Volume2 className="h-4 w-4 text-muted-foreground" />
                <Slider
                  value={[volume]}
                  max={1}
                  step={0.1}
                  onValueChange={([value]) => setVolume(value)}
                  className="w-[60px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
