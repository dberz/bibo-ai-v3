"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, Volume2 } from "lucide-react"
import { usePlayer } from "@/lib/player/player-context"
import { getAllBooks } from "@/lib/books"
import type { Book } from "@/types/book"
import Link from "next/link"
import { formatTime } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { BookAudioVisualizer } from "@/components/book-audio-visualizer"
import { AiFeaturesModal } from "@/components/ui/ai-features-modal"
import { useRouter } from "next/navigation"

export function FeaturedAudiobook() {
  const [featuredBook, setFeaturedBook] = useState<Book | null>(null)
  const { isPlaying, currentTime, duration, setCurrentBook, togglePlayback, seekTo, currentBook } = usePlayer()
  const [volume, setVolume] = useState(80)
  const [isHovered, setIsHovered] = useState(false)
  const [aiModalOpen, setAiModalOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Always show Moby Dick as the featured book
    const books = getAllBooks();
    const mobyDick = books.find(book => book.id === "moby-dick");
    if (mobyDick) {
      setFeaturedBook(mobyDick);
      // Always load Moby Dick into the player on mount
      setCurrentBook(mobyDick);
    } else {
      // Fallback to a random book with real cover if Moby Dick not found
      const booksWithCover = books.filter(b => !b.coverUrl.includes('placeholder.svg'));
      if (booksWithCover.length > 0) {
        const randomIndex = Math.floor(Math.random() * booksWithCover.length);
        const fallbackBook = booksWithCover[randomIndex];
        setFeaturedBook(fallbackBook);
        setCurrentBook(fallbackBook);
      } else {
        setFeaturedBook(null);
      }
    }
  }, []); // Remove currentBook and setCurrentBook from dependencies to prevent re-runs

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling
    if (featuredBook) {
      if (currentBook?.id !== featuredBook.id) {
        setCurrentBook(featuredBook);
      }
      // Add a small delay to ensure the book is loaded before playing
      setTimeout(() => {
        togglePlayback();
      }, 100);
    }
  };

  const handleBookClick = (e: React.MouseEvent) => {
    // Only navigate if we're not clicking the play button
    if (!(e.target as HTMLElement).closest('button')) {
      router.push(`/book/${featuredBook?.id}`);
    }
  };

  if (!featuredBook) return null;

  return (
    <div>
      <h2 className="text-2xl font-outfit font-bold mb-4 flex items-center">
        <span className="bg-emerald-500/10 p-1 rounded-full mr-2">
          <span role="img" aria-label="headphones">🎧</span>
        </span>
        Featured Listen
      </h2>
      <div className="bg-background border border-emerald-500/20 rounded-xl shadow-lg flex flex-col items-stretch overflow-hidden">
        {/* Top: Cover and metadata */}
        <div 
          onClick={handleBookClick}
          className="flex flex-col w-full p-4 gap-3 items-center justify-center bg-muted/40 hover:bg-muted/60 transition-colors cursor-pointer"
        >
          <img
            src={featuredBook.coverUrl || "/placeholder.svg"}
            alt={featuredBook.title}
            className="w-40 h-60 object-cover rounded-lg shadow-lg mb-4"
          />
          <div className="text-lg font-bold text-center leading-tight">{featuredBook.title}</div>
          <div className="text-sm text-muted-foreground text-center mb-1">{featuredBook.author}</div>
          <div className="flex flex-wrap gap-1 justify-center mb-2">
            {featuredBook.genres.slice(0, 3).map((genre) => (
              <span key={genre} className="bg-emerald-500/10 text-emerald-500 text-xs px-2 py-0.5 rounded-full font-medium">
                {genre}
              </span>
            ))}
          </div>
          <div className="text-xs text-muted-foreground text-center line-clamp-3 mb-2">{featuredBook.description}</div>
          
          {/* Play button */}
          <Button
            onClick={handlePlayClick}
            className="mt-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-full flex items-center gap-2"
          >
            {isPlaying && currentBook?.id === featuredBook.id ? (
              <>
                <Pause className="h-5 w-5" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-5 w-5" />
                Play
              </>
            )}
          </Button>
        </div>

        {/* AI Features section */}
        <div className="w-full flex flex-col items-center justify-center p-4 gap-3 bg-muted/30 border-t border-emerald-100/20">
          <h3 className="text-lg font-bold flex items-center gap-2 mb-1">
            <span className="bg-emerald-500/10 p-1 rounded-full"><span role="img" aria-label="sparkles">✨</span></span>
            AI Features
          </h3>
          <p className="text-xs text-muted-foreground text-center max-w-xs mb-2">
            Instantly reimagine this book with the power of AI. Try rewrites, summaries, and more.
          </p>
          <button
            type="button"
            className="inline-flex items-center gap-1 bg-emerald-100/60 text-emerald-700 text-xs px-3 py-1 rounded-full font-semibold hover:bg-emerald-200 transition"
            onClick={() => {
              setAiModalOpen(true);
              // Navigate to the book page with AI features open
              router.push(`/book/${featuredBook.id}?ai=true`);
            }}
          >
            <span className="mr-1">✨</span> Try AI Features
          </button>
        </div>
      </div>
      <AiFeaturesModal 
        open={aiModalOpen} 
        onOpenChange={setAiModalOpen} 
        bookId={featuredBook.id}
        initialContent={featuredBook.description} // Pass the book's description as initial content
      />
    </div>
  );
}
