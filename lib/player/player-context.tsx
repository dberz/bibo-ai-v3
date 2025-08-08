"use client"

import { createContext, useContext, useState, useCallback, type ReactNode, useRef, useEffect } from "react"
import type { Book } from "@/types/book"
import { getVoicePreferences } from "@/lib/voice-storage"

export type AudioVersionId = 'CLASSIC' | 'SHORTENED' | 'SCIFI' | 'SPANISH' | 'YA';

export interface PlayerState {
  currentBook: Book | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  currentVoiceId: string;
  currentRewriteId: string | null;
  volume: number;
  isLoading: boolean;
  adPlaying: boolean;
  adBanner: string | null;
  adCta: string | null;
  currentVersion: AudioVersionId;
}

export interface PlayerContextType {
  currentBook: Book | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  currentVoiceId: string;
  currentRewriteId: string | null;
  volume: number;
  isLoading: boolean;
  adPlaying: boolean;
  adBanner: string | null;
  adCta: string | null;
  currentVersion: AudioVersionId;
  currentAdIndex: number;
  hasUserInteracted: boolean;
  setCurrentBook: (book: Book | null) => void;
  setCurrentBookAndPlay: (book: Book | null) => void;
  play: () => void;
  pause: () => void;
  togglePlayback: () => void;
  seekTo: (time: number) => void;
  skipForward: (seconds: number) => void;
  skipBackward: (seconds: number) => void;
  setVoice: (voiceId: string) => void;
  setRewrite: (rewriteId: string) => void;
  setVolume: (volume: number) => void;
  startPlayback: (bookId: string) => void;
  setVersion: (versionId: AudioVersionId) => void;
  playbackMode: PlaybackMode;
  closePlayer: () => void;
}

// Create the context with a default undefined value
const PlayerContext = createContext<PlayerContextType | undefined>(undefined)

// Define the available audio versions with direct paths to local files
export const AUDIO_VERSIONS = {
  CLASSIC: {
    id: 'classic',
    title: 'Classic Deep Baritone',
    file: '/book-audio/Moby Dick - Classic Deep-Baritone - onyx_tts-1-hd_1x_2025-05-30T18_37_50-135Z.mp3'
  },
  SHORTENED: {
    id: 'shortened',
    title: 'Dramatically Shortened Story Version',
    file: '/book-audio/Moby Dick - Dramatically Shortened Story Version - fable_tts-1-hd_1x_2025-05-30T18_41_09-676Z.mp3'
  },
  YA: {
    id: 'ya',
    title: 'Modern YA Adventure Rewrite',
    file: '/book-audio/Moby Dick - Modern YA Adventure - fable_tts-1-hd_1x_2025-05-30T18_35_54-666Z.mp3'
  },
  SCIFI: {
    id: 'scifi',
    title: 'Sci-Fi Genre Reimagination',
    file: '/book-audio/Moby Dick - Sci-Fi Genre Reimagination - echo_tts-1-hd_1x_2025-05-30T18_38_42-749Z.mp3'
  },
  SPANISH: {
    id: 'spanish',
    title: 'Spanish Literary Translation',
    file: '/book-audio/Moby Dick - Spanish Literary Translation - shimmer_gpt-4o-mini-tts_1x_2025-05-30T18_33_39-939Z.mp3'
  }
} as const;

// Define available ads with direct paths to local files
const ADS = [
  '/ads/apple ad 1 - sage_tts-1-hd_1x_2025-05-30T19_28_41-743Z.mp3',
  '/ads/apple ad 2 - sage_tts-1-hd_1x_2025-05-30T19_29_57-658Z.mp3'
];

let currentAdIndex = 0; // Start with apple ad 1

export type PlaybackMode = 'ad' | 'book' | null;

// Provider component
export function PlayerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PlayerState>({
    currentBook: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    currentVoiceId: 'default',
    currentRewriteId: null,
    volume: 1,
    isLoading: false,
    adPlaying: false,
    adBanner: null,
    adCta: null,
    currentVersion: 'CLASSIC'
  });
  const [playbackMode, setPlaybackMode] = useState<PlaybackMode>(null);
  const [adIndex, setAdIndex] = useState(0);
  const [adPlayed, setAdPlayed] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasUserInteractedRef = useRef(false);
  const [isAudioReady, setIsAudioReady] = useState(false);

  // Initialize audio element with proper settings
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = 'metadata';
      audioRef.current.autoplay = false;
    }
    const audio = audioRef.current;

    const handleCanPlay = () => {
      setIsAudioReady(true);
    };

    const handleTimeUpdate = () => {
      setState(prev => ({ ...prev, currentTime: audio.currentTime }));
    };

    const handleLoadedMetadata = () => {
      setState(prev => ({ ...prev, duration: audio.duration }));
    };

    const handleEnded = () => {
      if (playbackMode === 'ad') {
        setAdPlayed(true);
        setPlaybackMode('book');
        setState(prev => ({ ...prev, adPlaying: false }));
        // Alternate ad index for next time
        setAdIndex((prev) => (prev + 1) % ADS.length);
        // Only start book playback if user has interacted and we have a valid book
        if (hasUserInteractedRef.current && state.currentBook) {
          // Add a small delay to ensure state updates are processed
          setTimeout(() => {
            playBook();
          }, 100);
        }
      } else {
        setState(prev => ({ ...prev, isPlaying: false }));
      }
    };

    const handleError = (error: Event) => {
      console.error('Audio playback error:', error);
      setState(prev => ({ ...prev, isPlaying: false, adPlaying: false }));
      setPlaybackMode(null);
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [playbackMode, state.currentBook]);

  // Play ad audio
  const playAd = useCallback(() => {
    if (!audioRef.current || !hasUserInteractedRef.current || adPlayed) return;
    
    setPlaybackMode('ad');
    setState(prev => ({ ...prev, adPlaying: true, isPlaying: true }));
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current.src = ADS[adIndex];
    audioRef.current.load();
    
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.error('Error playing ad:', err);
        setState(prev => ({ ...prev, adPlaying: false, isPlaying: false }));
        setPlaybackMode(null);
      });
    }
  }, [adIndex, adPlayed]);

  // Play book audio
  const playBook = useCallback(() => {
    if (!audioRef.current || !state.currentBook || !hasUserInteractedRef.current) return;
    
    // Validate currentVersion exists in AUDIO_VERSIONS
    const audioVersion = AUDIO_VERSIONS[state.currentVersion];
    if (!audioVersion || !audioVersion.file) {
      console.error('Invalid audio version:', state.currentVersion);
      // Fallback to CLASSIC version
      const fallbackVersion = AUDIO_VERSIONS.CLASSIC;
      if (!fallbackVersion || !fallbackVersion.file) {
        console.error('No valid audio version found');
        return;
      }
      audioRef.current.src = fallbackVersion.file;
    } else {
      audioRef.current.src = audioVersion.file;
    }
    
    setPlaybackMode('book');
    setState(prev => ({ ...prev, adPlaying: false, isPlaying: true }));
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current.load();
    
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.error('Error playing book audio:', err);
        setState(prev => ({ ...prev, isPlaying: false }));
        setPlaybackMode(null);
      });
    }
  }, [state.currentBook, state.currentVersion]);

  // Play button handler
  const play = useCallback(() => {
    if (!audioRef.current) return;
    hasUserInteractedRef.current = true;
    if (state.currentBook) {
      if (!adPlayed) {
        playAd();
      } else {
        playBook();
      }
    }
  }, [state.currentBook, adPlayed, playAd, playBook]);

  // Pause button handler
  const pause = useCallback(() => {
    if (!audioRef.current) return;
    
    audioRef.current.pause();
    setState(prev => ({ ...prev, isPlaying: false }));
  }, []);

  const togglePlayback = useCallback(() => {
    if (!hasUserInteractedRef.current) {
      hasUserInteractedRef.current = true;
    }
    
    if (state.isPlaying) {
      pause();
    } else {
      play();
    }
  }, [state.isPlaying, play, pause]);

  const seekTo = useCallback((time: number) => {
    if (audioRef.current && playbackMode === 'book') {
      audioRef.current.currentTime = time;
      setState(prev => ({ ...prev, currentTime: time }));
    }
  }, [playbackMode]);

  const skipForward = useCallback((seconds: number) => {
    setState((prev) => ({
      ...prev,
      currentTime: Math.min(prev.currentTime + seconds, prev.duration),
    }))
    if (audioRef.current && playbackMode === 'book') {
      audioRef.current.currentTime = Math.min(audioRef.current.currentTime + seconds, audioRef.current.duration);
    }
  }, [playbackMode]);

  const skipBackward = useCallback((seconds: number) => {
    setState((prev) => ({
      ...prev,
      currentTime: Math.max(prev.currentTime - seconds, 0),
    }))
    if (audioRef.current && playbackMode === 'book') {
      audioRef.current.currentTime = Math.max(audioRef.current.currentTime - seconds, 0);
    }
  }, [playbackMode]);

  const setVoice = useCallback((voiceId: string) => {
    setState((prev) => ({ ...prev, currentVoiceId: voiceId }))
  }, [])

  const setRewrite = useCallback((rewriteId: string) => {
    setState((prev) => ({ ...prev, currentRewriteId: rewriteId }))
  }, [])

  const setVolume = useCallback((volume: number) => {
    setState((prev) => ({ ...prev, volume }))
  }, [])

  const startPlayback = useCallback((bookId: string) => {
    // In a real implementation, this would fetch the book and start playback
    // For now, we'll just simulate it
    import("@/lib/books").then(({ getBookById }) => {
      const book = getBookById(bookId)
      if (book) {
        setState((prev) => ({
          ...prev,
          currentBook: book,
          isPlaying: true,
          currentTime: 0,
        }))
      }
    })
  }, [])

  // Set version (does not auto-play)
  const setVersion = useCallback((versionId: AudioVersionId) => {
    // Validate that the version exists in AUDIO_VERSIONS
    if (!AUDIO_VERSIONS[versionId]) {
      console.error('Invalid audio version:', versionId);
      return;
    }
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setState(prev => ({ ...prev, currentVersion: versionId, isPlaying: false, adPlaying: false }));
    setPlaybackMode(null);
    setAdPlayed(false); // Reset ad played state when changing versions
  }, []);

  // Set current book (does not auto-play)
  const setCurrentBook = useCallback((book: Book | null) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setState(prev => ({ ...prev, currentBook: book, isPlaying: false, adPlaying: false }));
    setPlaybackMode(null);
    setAdPlayed(false); // Reset ad played state when changing books
  }, []);

  // Set current book and start playback
  const setCurrentBookAndPlay = useCallback((book: Book | null) => {
    if (!book) return;
    
    hasUserInteractedRef.current = true;
    setCurrentBook(book);
    
    // Start playback immediately with the book
    if (!adPlayed) {
      // Play ad first
      playAd();
    } else {
      // Play book content directly
      playBook();
    }
  }, [setCurrentBook, adPlayed, playAd, playBook]);

  // Close player and reset state
  const closePlayer = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
    setState(prev => ({
      ...prev,
      currentBook: null,
      isPlaying: false,
      adPlaying: false,
      currentTime: 0,
      duration: 0
    }))
    setPlaybackMode(null)
    setAdPlayed(false)
  }, [])

  // Create the context value object
  const value: PlayerContextType = {
    ...state,
    setCurrentBook,
    setCurrentBookAndPlay,
    play,
    pause,
    togglePlayback,
    seekTo,
    skipForward,
    skipBackward,
    setVoice,
    setRewrite,
    setVolume,
    startPlayback,
    setVersion,
    closePlayer,
    playbackMode,
    adPlaying: state.adPlaying,
    currentAdIndex: adIndex,
    hasUserInteracted: hasUserInteractedRef.current
  }

  return (
    <PlayerContext.Provider value={value}>
      {children}
      <audio ref={audioRef} className="hidden" />
    </PlayerContext.Provider>
  );
}

// Hook to use the player context
export function usePlayer() {
  const context = useContext(PlayerContext)
  if (context === undefined) {
    throw new Error("usePlayer must be used within a PlayerProvider")
  }
  return context
}
