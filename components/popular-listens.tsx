"use client"

import { useState, useEffect, useRef } from "react"
import { getAllBooks } from "@/lib/books"
import type { Book } from "@/types/book"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Headphones, ChevronLeft, ChevronRight } from "lucide-react"
import { usePlayer } from "@/lib/player/use-player"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function PopularListens() {
  const [popularBooks, setPopularBooks] = useState<Book[]>([])
  const { startPlayback, isPlaying, currentBookId } = usePlayer()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  useEffect(() => {
    // Get a few books to display as popular
    const books = getAllBooks()
    const shuffled = [...books].sort(() => 0.5 - Math.random())
    setPopularBooks(shuffled.slice(0, 6))
  }, [])

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-outfit font-bold mb-4 flex items-center">
        <Headphones className="h-5 w-5 text-emerald-500 mr-2" />
        Popular Listens
      </h2>

      <div className="relative">
        {showLeftArrow && (
          <Button
            variant="outline"
            size="icon"
            className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-600 rounded-full shadow-lg"
            onClick={scrollLeft}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        )}

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto pb-4 pt-1 px-1 scrollbar-hide snap-x"
          onScroll={handleScroll}
        >
          <div className="flex gap-6">
            {popularBooks.map((book) => (
              <Card
                key={book.id}
                className="overflow-hidden hover:shadow-md transition-shadow min-w-[300px] snap-start"
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="aspect-[16/9] relative overflow-hidden">
                      <img
                        src={book.coverUrl || "/placeholder.svg"}
                        alt={book.title}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                      <div className="absolute top-2 right-2 bg-black/60 p-1 rounded-full">
                        <Headphones className="h-4 w-4 text-emerald-500" />
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => startPlayback(book.id)}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div className="bg-emerald-500/90 rounded-full p-3 shadow-lg">
                          <Play className="h-8 w-8 text-white ml-1" />
                        </div>
                      </motion.button>

                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <Link href={`/book/${book.id}`} className="hover:text-emerald-500 transition-colors">
                          <h3 className="font-outfit font-semibold text-lg line-clamp-1 text-white">{book.title}</h3>
                        </Link>
                        <p className="text-sm text-white/80 line-clamp-1 font-nunito">{book.author}</p>

                        <div className="flex items-center mt-2 justify-between">
                          <Badge
                            variant="outline"
                            className="text-xs px-2 py-0 h-5 bg-black/50 text-white border-white/20"
                          >
                            {book.duration}
                          </Badge>
                          <div className="flex items-center">
                            <div className="w-16 h-1 bg-white/30 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 rounded-full" style={{ width: "30%" }}></div>
                            </div>
                            <span className="text-xs text-white/70 ml-1">30%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {showRightArrow && (
          <Button
            variant="outline"
            size="icon"
            className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-600 rounded-full shadow-lg"
            onClick={scrollRight}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        )}
      </div>
    </div>
  )
}
