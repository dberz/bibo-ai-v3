"use client"

import { usePlayer } from "@/lib/player/player-context";
import { BookAudioVisualizer } from "@/components/book-audio-visualizer";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AUDIO_VERSIONS } from "@/lib/player/player-context";

// Use the local ad audio file
const AD_AUDIO_SRC = "/ads/apple ad 1 - sage_tts-1-hd_1x_2025-05-30T19_28_41-743Z.mp3";

export default function BottomPlayer() {
  const { 
    currentBook, 
    isPlaying, 
    togglePlayback, 
    currentVersion,
    currentTime,
    duration,
    seekTo,
    skipForward,
    skipBackward,
    setCurrentBook,
    adPlaying,
    playbackMode,
    hasUserInteracted
  } = usePlayer();
  
  const [error, setError] = useState<string | null>(null);

  // Handle errors
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  if (!currentBook) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t p-4 z-50">
      <div className="container mx-auto max-w-5xl">
        {adPlaying && (
          <div className="flex items-center justify-center gap-2 mb-2 animate-fade-in">
            <span className="text-xs font-medium text-muted-foreground">Brought to you by</span>
            <Image 
              src="/ads/Apple_logo_black.svg" 
              alt="Apple logo" 
              width={20} 
              height={20} 
              className="inline-block"
              style={{ filter: 'invert(0.7)', maxWidth: 32, maxHeight: 32, width: 'auto', height: 'auto', objectFit: 'contain' }}
            />
            <span className="text-xs font-semibold text-muted-foreground">Apple</span>
          </div>
        )}
        {error && (
          <div className="text-red-500 text-sm mb-2 text-center">{error}</div>
        )}
        {!hasUserInteracted && (
          <div className="text-sm text-muted-foreground mb-2 text-center">
            Click anywhere to enable audio playback
          </div>
        )}
        <BookAudioVisualizer 
          book={currentBook} 
          compact 
        />
      </div>
    </div>
  );
} 