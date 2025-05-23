"use client"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Play, Pause, SkipBack, SkipForward, Volume2, Rewind, FastForward } from "lucide-react"
import { usePlayer } from "@/lib/player/use-player"
import { formatTime } from "@/lib/utils"
import { useState } from "react"

interface AudioPlayerProps {
  bookId: string
}

export function AudioPlayer({ bookId }: AudioPlayerProps) {
  const { isPlaying, currentTime, duration, togglePlayback, seekTo, skipForward, skipBackward } = usePlayer()
  const [volume, setVolume] = useState(80)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-sm">{formatTime(currentTime)}</span>
        <Slider
          value={[currentTime]}
          max={duration}
          step={1}
          onValueChange={(value) => seekTo(value[0])}
          className="mx-4 flex-1"
        />
        <span className="text-sm">{formatTime(duration)}</span>
      </div>

      <div className="flex items-center justify-center space-x-6">
        <Button variant="ghost" size="icon" onClick={() => skipBackward(30)} className="hover:text-emerald-500">
          <Rewind className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon" onClick={() => skipBackward(10)} className="hover:text-emerald-500">
          <SkipBack className="h-5 w-5" />
        </Button>

        <Button
          variant="default"
          size="icon"
          className="h-16 w-16 rounded-full bg-emerald-500 hover:bg-emerald-600 shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
          onClick={togglePlayback}
        >
          {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
        </Button>

        <Button variant="ghost" size="icon" onClick={() => skipForward(10)} className="hover:text-emerald-500">
          <SkipForward className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon" onClick={() => skipForward(30)} className="hover:text-emerald-500">
          <FastForward className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex items-center justify-center">
        <Volume2 className="h-4 w-4 mr-2 text-muted-foreground" />
        <Slider value={[volume]} max={100} step={1} onValueChange={(value) => setVolume(value[0])} className="w-32" />
      </div>
    </div>
  )
}
