"use client"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Play, Pause, SkipBack, SkipForward, Volume2, Rewind, FastForward, X } from "lucide-react"
import { usePlayer } from "@/lib/player/player-context"
import { formatTime } from "@/lib/utils"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface MobileAudioPlayerProps {
  bookId?: string
}

export function MobileAudioPlayer({ bookId }: MobileAudioPlayerProps) {
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
    currentVersion,
    closePlayer
  } = usePlayer()
  const [volume, setVolume] = useState(80)
  const [error, setError] = useState<string | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  // Don't render if no book is playing
  if (!currentBook) return null

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
    <div className="fixed bottom-16 left-0 right-0 z-50 bg-white border-t shadow-lg">
      <Card className="mx-4 mb-2">
        <CardContent className="p-4">
          {/* Error message */}
          {error && (
            <div className="text-red-500 text-sm text-center mb-2">{error}</div>
          )}

          {/* Ad playing indicator */}
          {adPlaying && (
            <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-2 mb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-yellow-200 text-yellow-800">
                    Sponsored
                  </Badge>
                  <span className="text-sm text-yellow-800">Advertisement playing...</span>
                </div>
                <span className="text-xs text-yellow-600">Skip in 5s</span>
              </div>
            </div>
          )}

          {/* Book info and controls */}
          <div className="flex items-center space-x-3">
            {/* Book cover */}
            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <img 
                src={currentBook.coverUrl} 
                alt={currentBook.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Book details */}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm truncate">{currentBook.title}</h4>
              <p className="text-xs text-muted-foreground truncate">by {currentBook.author}</p>
              {currentVersion && (
                <p className="text-xs text-emerald-600">{currentVersion}</p>
              )}
            </div>

            {/* Play/Pause button */}
            <Button
              variant="default"
              size="icon"
              className={`h-10 w-10 rounded-full ${
                isPlaying ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-emerald-500 hover:bg-emerald-600'
              } shadow-lg hover:shadow-emerald-500/25 transition-all duration-300`}
              onClick={handlePlayPause}
              disabled={!hasUserInteracted}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
            </Button>

            {/* Expand button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <SkipForward className="h-4 w-4" />
            </Button>

            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={closePlayer}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress bar */}
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <Slider
              value={[currentTime]}
              max={duration}
              step={1}
              onValueChange={handleSeek}
              className="w-full"
              disabled={adPlaying}
            />
          </div>

          {/* Expanded controls */}
          {isExpanded && (
            <div className="mt-4 space-y-3">
              {/* Skip controls */}
              <div className="flex items-center justify-center space-x-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleSkip(-30)} 
                  className="hover:text-emerald-500"
                  disabled={adPlaying}
                >
                  <Rewind className="h-4 w-4" />
                </Button>

                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleSkip(-10)} 
                  className="hover:text-emerald-500"
                  disabled={adPlaying}
                >
                  <SkipBack className="h-4 w-4" />
                </Button>

                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleSkip(10)} 
                  className="hover:text-emerald-500"
                  disabled={adPlaying}
                >
                  <SkipForward className="h-4 w-4" />
                </Button>

                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleSkip(30)} 
                  className="hover:text-emerald-500"
                  disabled={adPlaying}
                >
                  <FastForward className="h-4 w-4" />
                </Button>
              </div>

              {/* Volume control */}
              <div className="flex items-center justify-center space-x-2">
                <Volume2 className="h-4 w-4 text-muted-foreground" />
                <Slider 
                  value={[volume]} 
                  max={100} 
                  step={1} 
                  onValueChange={(value) => setVolume(value[0])} 
                  className="w-32" 
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 