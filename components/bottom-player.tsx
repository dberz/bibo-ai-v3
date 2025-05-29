"use client"

import { usePlayer } from "@/lib/player/player-context";
import { BookAudioVisualizer } from "@/components/book-audio-visualizer";
import { useEffect, useRef, useState } from "react";
import { callTTS } from "@/lib/ai/tts";
import Image from "next/image";

// Use the user-provided ad audio file
const AD_AUDIO_SRC = "/ads/apple-ad-01-ttsmaker-file-2025-5-28-21-26-17.mp3";
// Optionally, if you want to play background music live, you could add a second audio element for music and play it at low volume during ad playback.
// For now, just play the TTS ad as is.

export default function BottomPlayer() {
  const { currentBook, isPlaying, togglePlayback, currentVoiceId } = usePlayer();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const adAudioRef = useRef<HTMLAudioElement | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPlayingAd, setIsPlayingAd] = useState(false);
  const [adPlayed, setAdPlayed] = useState(false);

  // Handle play button click - play ad immediately if not played yet
  useEffect(() => {
    if (!isPlaying || !adAudioRef.current || adPlayed || isPlayingAd) return;
    
    // Start playing the ad
    setIsPlayingAd(true);
    adAudioRef.current.currentTime = 0;
    adAudioRef.current.play().catch(err => {
      console.error("Failed to play ad:", err);
      setIsPlayingAd(false);
      setAdPlayed(true);
    });
  }, [isPlaying, adPlayed, isPlayingAd]);

  // Handle ad ending
  useEffect(() => {
    const adAudio = adAudioRef.current;
    if (!adAudio) return;

    const handleAdEnded = () => {
      setIsPlayingAd(false);
      setAdPlayed(true);
    };

    adAudio.addEventListener("ended", handleAdEnded);
    return () => adAudio.removeEventListener("ended", handleAdEnded);
  }, []);

  // Generate TTS audio when needed
  useEffect(() => {
    let mounted = true;

    async function generateAudio() {
      if (!currentBook?.chapters?.[0]?.content || !currentVoiceId) return;
      setIsLoading(true);
      setError(null);

      try {
        const text = currentBook.chapters[0].content;
        const url = await callTTS(text, currentVoiceId);
        
        if (mounted) {
          setAudioUrl(url);
          if (audioRef.current) {
            audioRef.current.src = url;
            // Only play if we're still playing and the ad is done
            if (isPlaying && adPlayed) {
              audioRef.current.play().catch(err => {
                setError("Failed to play audio. Please try again.");
              });
            }
          }
        }
      } catch (err) {
        if (mounted) setError("Failed to generate audio. Please try again.");
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    // Start TTS generation if we're playing and either the ad is done or we're not showing ads
    if (isPlaying && (adPlayed || !currentBook)) {
      generateAudio();
    }

    return () => {
      mounted = false;
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [currentBook, currentVoiceId, isPlaying, adPlayed]);

  // Handle book audio playback
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying && adPlayed && !isPlayingAd && audioUrl) {
      audioRef.current.play().catch(err => {
        setError("Failed to play audio. Please try again.");
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, adPlayed, isPlayingAd, audioUrl]);

  // Reset state when book changes or playback stops
  useEffect(() => {
    if (!isPlaying) {
      setAdPlayed(false);
      setIsPlayingAd(false);
    }
  }, [currentBook, isPlaying]);

  // Handle book audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      togglePlayback();
      setAudioUrl(null);
    };

    const handleError = () => {
      setError("Error playing audio. Please try again.");
      togglePlayback();
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [togglePlayback]);

  if (!currentBook) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t p-4 z-50">
      <div className="container mx-auto max-w-5xl">
        <audio ref={audioRef} className="hidden" />
        <audio ref={adAudioRef} src={AD_AUDIO_SRC} className="hidden" />
        {isPlayingAd && (
          <div className="flex items-center justify-center gap-2 mb-2 animate-fade-in">
            <span className="text-xs font-medium text-muted-foreground">Brought to you by</span>
            <Image src="/ads/Apple_logo_black.svg" alt="Apple logo" width={20} height={20} className="inline-block" style={{ filter: 'invert(0.7)' }} />
            <span className="text-xs font-semibold text-muted-foreground">Apple</span>
          </div>
        )}
        {error && (
          <div className="text-red-500 text-sm mb-2 text-center">{error}</div>
        )}
        {isLoading && !isPlayingAd && (
          <div className="text-sm mb-2 text-center">Generating audio...</div>
        )}
        <BookAudioVisualizer 
          book={currentBook} 
          compact 
        />
      </div>
    </div>
  );
} 