"use client"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Play, Pause, SkipBack, SkipForward, Volume2, Rewind, FastForward } from "lucide-react"
import { usePlayer, AUDIO_VERSIONS } from "@/lib/player/player-context"
import { formatTime } from "@/lib/utils"
import { useState, useEffect } from "react"

interface AudioPlayerProps {
  bookId: string
}

export function AudioPlayer({ bookId }: AudioPlayerProps) {
  const { 
    isPlaying, 
    currentTime, 
    duration, 
    togglePlayback, 
    seekTo, 
    skipForward, 
    skipBackward,
    adPlaying,
    hasUserInteracted,
    currentBook,
    currentVersion
  } = usePlayer()
  const [volume, setVolume] = useState(80)
  const [error, setError] = useState<string | null>(null)

  // Handle play/pause button click
  const handlePlayPause = () => {
    try {
      togglePlayback();
    } catch (err) {
      console.error('Error toggling playback:', err);
      setError('Failed to play audio. Please try again.');
    }
  };

  // Handle seek
  const handleSeek = (value: number[]) => {
    if (!adPlaying) {
      try {
        seekTo(value[0]);
      } catch (err) {
        console.error('Error seeking:', err);
        setError('Failed to seek. Please try again.');
      }
    }
  };

  // Handle skip
  const handleSkip = (seconds: number) => {
    if (!adPlaying) {
      try {
        if (seconds > 0) {
          skipForward(seconds);
        } else {
          skipBackward(Math.abs(seconds));
        }
      } catch (err) {
        console.error('Error skipping:', err);
        setError('Failed to skip. Please try again.');
      }
    }
  };

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="space-y-6">
      {error && (
        <div className="text-red-500 text-sm text-center">{error}</div>
      )}
      {!hasUserInteracted && (
        <div className="text-sm text-muted-foreground text-center">
          Click anywhere to enable audio playback
        </div>
      )}
      <div className="flex items-center justify-between">
        <span className="text-sm">{formatTime(currentTime)}</span>
        <Slider
          value={[currentTime]}
          max={duration}
          step={1}
          onValueChange={handleSeek}
          className="mx-4 flex-1"
          disabled={adPlaying}
        />
        <span className="text-sm">{formatTime(duration)}</span>
      </div>

      <div className="flex items-center justify-center space-x-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => handleSkip(-30)} 
          className="hover:text-emerald-500"
          disabled={adPlaying}
        >
          <Rewind className="h-5 w-5" />
        </Button>

        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => handleSkip(-10)} 
          className="hover:text-emerald-500"
          disabled={adPlaying}
        >
          <SkipBack className="h-5 w-5" />
        </Button>

        <Button
          variant="default"
          size="icon"
          className={`h-16 w-16 rounded-full ${
            isPlaying ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-emerald-500 hover:bg-emerald-600'
          } shadow-lg hover:shadow-emerald-500/25 transition-all duration-300`}
          onClick={handlePlayPause}
          disabled={!hasUserInteracted}
        >
          {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
        </Button>

        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => handleSkip(10)} 
          className="hover:text-emerald-500"
          disabled={adPlaying}
        >
          <SkipForward className="h-5 w-5" />
        </Button>

        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => handleSkip(30)} 
          className="hover:text-emerald-500"
          disabled={adPlaying}
        >
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
