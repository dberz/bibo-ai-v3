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

export function FeaturedAudiobook() {
  const [featuredBook, setFeaturedBook] = useState<Book | null>(null)
  const { isPlaying, currentTime, duration, setCurrentBook, togglePlayback, seekTo } = usePlayer()
  const [volume, setVolume] = useState(80)
  const [isHovered, setIsHovered] = useState(false)
  const [aiModalOpen, setAiModalOpen] = useState(false)

  useEffect(() => {
    // Get a random featured book
    const books = getAllBooks()
    const randomIndex = Math.floor(Math.random() * books.length)
    setFeaturedBook(books[randomIndex])
  }, [])

  if (!featuredBook) return null

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
        <Link href={`/book/${featuredBook.id}`} className="flex flex-col w-full p-4 gap-3 items-center justify-center bg-muted/40 hover:bg-muted/60 transition-colors">
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
        </Link>
        {/* AI Features section below player */}
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
            onClick={() => setAiModalOpen(true)}
          >
            <span className="mr-1">✨</span> Try AI Features
          </button>
        </div>
      </div>
      <AiFeaturesModal open={aiModalOpen} onOpenChange={setAiModalOpen} bookId={featuredBook.id} />
    </div>
  )
}
