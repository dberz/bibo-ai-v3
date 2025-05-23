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

export function FeaturedAudiobook() {
  const [featuredBook, setFeaturedBook] = useState<Book | null>(null)
  const { isPlaying, currentTime, duration, setCurrentBook, togglePlayback, seekTo } = usePlayer()
  const [volume, setVolume] = useState(80)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    // Get a random featured book
    const books = getAllBooks()
    const randomIndex = Math.floor(Math.random() * books.length)
    setFeaturedBook(books[randomIndex])
  }, [])

  if (!featuredBook) return null

  const handlePlay = () => {
    if (!isPlaying) {
      setCurrentBook(featuredBook)
    } else {
      togglePlayback()
    }
  }

  // Audio waveform visualization (simplified)
  const waveformBars = Array.from({ length: 40 }, (_, i) => {
    const height = Math.sin(i * 0.2) * 0.5 + 0.5 // Generate a sine wave pattern
    return height * 100
  })

  return (
    <div>
      <h2 className="text-2xl font-outfit font-bold mb-4 flex items-center">
        <span className="bg-emerald-500/10 p-1 rounded-full mr-2">
          <Pause className="h-5 w-5 text-emerald-500" />
        </span>
        Featured Listen
      </h2>

      <Card className="overflow-hidden border-emerald-500/20">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            <div
              className="w-full md:w-1/3 relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="aspect-[2/3] md:h-full relative overflow-hidden">
                <img
                  src={featuredBook.coverUrl || "/placeholder.svg"}
                  alt={featuredBook.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <Button
                        onClick={handlePlay}
                        size="lg"
                        className="rounded-full w-16 h-16 bg-emerald-500 hover:bg-emerald-600 shadow-lg"
                      >
                        {isPlaying ? (
                          <Pause className="h-8 w-8 text-white" />
                        ) : (
                          <Play className="h-8 w-8 text-white ml-1" />
                        )}
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="w-full md:w-2/3 p-6 space-y-4">
              <div>
                <Link href={`/book/${featuredBook.id}`} className="hover:text-emerald-500 transition-colors">
                  <h3 className="text-2xl font-outfit font-bold">{featuredBook.title}</h3>
                </Link>
                <p className="text-muted-foreground font-nunito">{featuredBook.author}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {featuredBook.genres.slice(0, 3).map((genre) => (
                  <Badge key={genre} variant="secondary" className="bg-emerald-500/10 text-emerald-500 font-nunito">
                    {genre}
                  </Badge>
                ))}
              </div>

              <p className="text-sm font-nunito line-clamp-2">{featuredBook.description}</p>

              <div className="pt-2">
                {/* Audio waveform visualization */}
                <div className="flex items-center h-8 gap-[2px] mb-2">
                  {waveformBars.map((height, i) => (
                    <div
                      key={i}
                      className={`w-1 rounded-full ${
                        i / waveformBars.length < currentTime / duration ? "bg-emerald-500" : "bg-emerald-500/30"
                      }`}
                      style={{ height: `${height}%` }}
                    ></div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>

                <div className="flex items-center gap-4">
                  <Button
                    onClick={handlePlay}
                    size="sm"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-4"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="h-4 w-4 mr-2" /> Pause
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" /> Play
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
                      className="w-20"
                    />
                  </div>

                  <Link
                    href={`/book/${featuredBook.id}`}
                    className="text-sm text-emerald-500 hover:text-emerald-600 hover:underline ml-auto font-nunito"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
