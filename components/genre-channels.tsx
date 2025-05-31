"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { useGenre } from "./genre-provider"
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Skull,
  Heart,
  Compass,
  BookMarked,
  History,
  Wand2,
  Baby,
  BookText,
  Feather,
  Brain,
  Castle,
  Swords,
  Sparkles,
  Theater,
  Scroll,
  Lightbulb,
  Glasses,
  Landmark,
  Crown,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAllBooks } from "@/lib/books"

// Define genre icons and colors
const genreConfig = {
  All: { icon: BookOpen, color: "bg-gradient-to-br from-emerald-500 to-teal-600" },
  "Public Domain": { icon: Crown, color: "bg-gradient-to-br from-amber-500 to-orange-600" },
  "Back Catalog": { icon: Clock, color: "bg-gradient-to-br from-purple-500 to-violet-600" },
  Classics: { icon: BookMarked, color: "bg-gradient-to-br from-amber-500 to-orange-600" },
  Fiction: { icon: BookText, color: "bg-gradient-to-br from-blue-500 to-indigo-600" },
  Mystery: { icon: Compass, color: "bg-gradient-to-br from-purple-500 to-violet-600" },
  Romance: { icon: Heart, color: "bg-gradient-to-br from-pink-500 to-rose-600" },
  Adventure: { icon: Compass, color: "bg-gradient-to-br from-yellow-500 to-amber-600" },
  Biography: { icon: BookMarked, color: "bg-gradient-to-br from-sky-500 to-blue-600" },
  History: { icon: History, color: "bg-gradient-to-br from-stone-500 to-stone-700" },
  Fantasy: { icon: Wand2, color: "bg-gradient-to-br from-violet-500 to-purple-600" },
  Horror: { icon: Skull, color: "bg-gradient-to-br from-red-500 to-rose-600" },
  Children: { icon: Baby, color: "bg-gradient-to-br from-cyan-500 to-sky-600" },
  Poetry: { icon: Feather, color: "bg-gradient-to-br from-fuchsia-500 to-pink-600" },
  Philosophy: { icon: Brain, color: "bg-gradient-to-br from-slate-500 to-slate-700" },
  Gothic: { icon: Castle, color: "bg-gradient-to-br from-zinc-500 to-zinc-700" },
  Military: { icon: Swords, color: "bg-gradient-to-br from-neutral-500 to-neutral-700" },
  Spirituality: { icon: Sparkles, color: "bg-gradient-to-br from-indigo-500 to-violet-600" },
  "Epic Poetry": { icon: Scroll, color: "bg-gradient-to-br from-amber-600 to-yellow-700" },
  "Science Fiction": { icon: Lightbulb, color: "bg-gradient-to-br from-cyan-600 to-blue-700" },
  Satire: { icon: Theater, color: "bg-gradient-to-br from-orange-500 to-red-600" },
  Literary: { icon: Glasses, color: "bg-gradient-to-br from-blue-600 to-indigo-700" },
  Philosophical: { icon: Brain, color: "bg-gradient-to-br from-violet-600 to-purple-700" },
  Political: { icon: Landmark, color: "bg-gradient-to-br from-slate-600 to-gray-700" },
  War: { icon: Swords, color: "bg-gradient-to-br from-red-600 to-rose-700" },
  Religious: { icon: Sparkles, color: "bg-gradient-to-br from-amber-600 to-yellow-700" },
  Psychological: { icon: Brain, color: "bg-gradient-to-br from-purple-600 to-fuchsia-700" },
  "Coming of Age": { icon: BookText, color: "bg-gradient-to-br from-green-500 to-emerald-600" },
  "Historical Fiction": { icon: History, color: "bg-gradient-to-br from-amber-500 to-orange-600" },
  Play: { icon: Theater, color: "bg-gradient-to-br from-violet-500 to-purple-600" },
  Comedy: { icon: Theater, color: "bg-gradient-to-br from-pink-500 to-rose-600" },
  Detective: { icon: Compass, color: "bg-gradient-to-br from-blue-500 to-indigo-600" },
  "Short Story": { icon: BookText, color: "bg-gradient-to-br from-emerald-500 to-teal-600" },
  "Cosmic Horror": { icon: Skull, color: "bg-gradient-to-br from-purple-600 to-indigo-700" },
  Modernist: { icon: Glasses, color: "bg-gradient-to-br from-blue-500 to-indigo-600" },
}

export function GenreChannels() {
  const { selectedGenre, setSelectedGenre } = useGenre()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  // Get all unique genres from books
  const books = getAllBooks()
  const allGenres = ["All"]
  books.forEach((book) => {
    book.genres.forEach((genre) => {
      if (!allGenres.includes(genre)) {
        allGenres.push(genre)
      }
    })
  })

  // Sort genres alphabetically, keeping "All" at the beginning
  const sortedGenres = allGenres.slice(1).sort()
  
  // Add category toggles as first-class chips
  const genres = ["All", "Public Domain", "Back Catalog", ...sortedGenres]

  // Get book counts for each genre/category
  const genreCounts = genres.reduce(
    (counts, genre) => {
      if (genre === "All") {
        counts[genre] = books.length
      } else if (genre === "Public Domain") {
        counts[genre] = books.filter((book) => book.category === "classics").length
      } else if (genre === "Back Catalog") {
        counts[genre] = books.filter((book) => book.category === "modern classics").length
      } else {
        counts[genre] = books.filter((book) => book.genres.includes(genre)).length
      }
      return counts
    },
    {} as Record<string, number>,
  )

  // Filter out genres with less than 2 books (except 'All' and category toggles)
  const filteredGenres = genres.filter(
    (genre) => 
      genre === "All" || 
      genre === "Public Domain" || 
      genre === "Back Catalog" ||
      genreCounts[genre] >= 2
  )

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
    <div className="relative mb-10">
      <h2 className="text-2xl font-outfit font-bold mb-4 flex items-center">
        <BookOpen className="h-5 w-5 text-emerald-500 mr-2" />
        Channels
      </h2>

      <div className="relative">
        {showLeftArrow && (
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-600 rounded-full shadow-lg"
            onClick={scrollLeft}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        )}

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto pb-4 pt-1 px-1 scrollbar-hide snap-x snap-mandatory"
          onScroll={handleScroll}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="flex gap-4">
            {filteredGenres.map((genre) => {
              const config = genreConfig[genre as keyof typeof genreConfig] || genreConfig["All"]
              const Icon = config.icon

              return (
                <div key={genre} className="snap-start">
                  <motion.div
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedGenre(genre)}
                    className={`w-[180px] h-[100px] rounded-lg cursor-pointer transition-all duration-300 overflow-hidden ${
                      selectedGenre === genre
                        ? "ring-4 ring-emerald-500 shadow-lg shadow-emerald-500/20"
                        : "ring-1 ring-white/10 hover:ring-emerald-500/50"
                    }`}
                  >
                    <div
                      className={`w-full h-full ${config.color} flex flex-col items-center justify-center p-4 relative`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                      <Icon className="h-8 w-8 text-white mb-2 z-10" />

                      <div className="z-10 text-center">
                        <h3 className="font-outfit font-semibold text-white">{genre}</h3>
                        <p className="text-xs text-white/80 font-nunito">{genreCounts[genre]} titles</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>

        {showRightArrow && (
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-600 rounded-full shadow-lg"
            onClick={scrollRight}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        )}
      </div>
    </div>
  )
}
