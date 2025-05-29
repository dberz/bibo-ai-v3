"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { getAllBooks } from "@/lib/books"
import type { Book } from "@/types/book"
import { PlayButton } from "@/components/play-button"
import { useGenre } from "./genre-provider"
import { motion } from "framer-motion"
import { Headphones, Loader2, CheckCircle, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LibraryGrid() {
  const [books, setBooks] = useState<Book[]>([])
  const [hoveredBook, setHoveredBook] = useState<string | null>(null)
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [successId, setSuccessId] = useState<string | null>(null)
  const { selectedGenre } = useGenre()

  useEffect(() => {
    const allBooks = getAllBooks()

    if (selectedGenre === "All") {
      setBooks(allBooks)
    } else {
      const filteredBooks = allBooks.filter((book) => book.genres.includes(selectedGenre))
      setBooks(filteredBooks)
    }
  }, [selectedGenre])

  // Animation variants for the grid items
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  async function handleGenerateCover(book: Book) {
    setLoadingId(book.id)
    setSuccessId(null)
    try {
      const res = await fetch("/api/generate-cover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: book.title, author: book.author, description: book.description }),
      })
      const data = await res.json()
      if (data.imageUrl) {
        setBooks((prev) => prev.map((b) => b.id === book.id ? { ...b, coverUrl: data.imageUrl } : b))
        setSuccessId(book.id)
        setTimeout(() => setSuccessId(null), 2000)
      }
    } finally {
      setLoadingId(null)
    }
  }

  function isAIGenerated(coverUrl: string) {
    return coverUrl && coverUrl.startsWith("/generated-covers/")
  }

  // Sort books: real covers first, placeholders last
  const sortedBooks = books.slice().sort((a, b) => {
    const aHasCover = !a.coverUrl.includes('placeholder.svg');
    const bHasCover = !b.coverUrl.includes('placeholder.svg');
    if (aHasCover === bHasCover) return 0;
    return aHasCover ? -1 : 1;
  });

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6"
      variants={container}
      initial="hidden"
      animate="show"
      key={selectedGenre}
    >
      {sortedBooks.map((book) => (
        <motion.div key={book.id} variants={item}>
          <Card
            className={`overflow-hidden transition-all duration-300 hover:shadow-xl active:shadow-lg group relative ${successId === book.id ? "ring-2 ring-emerald-400" : ""}`}
            onMouseEnter={() => setHoveredBook(book.id)}
            onMouseLeave={() => setHoveredBook(null)}
            onTouchStart={() => setHoveredBook(book.id)}
            onTouchEnd={() => setHoveredBook(null)}
          >
            <Link href={`/book/${book.id}`} className="block">
              <div className="aspect-[2/3] relative overflow-hidden">
                <motion.img
                  key={book.coverUrl}
                  src={book.coverUrl || "/placeholder.svg"}
                  alt={book.title}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105 group-active:scale-105"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300"></div>

                {/* Audio indicator - more compact on mobile */}
                <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-black/60 p-0.5 sm:p-1 rounded-full">
                  <Headphones className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-500" />
                </div>

                {(hoveredBook === book.id || window.matchMedia('(hover: none)').matches) && (
                  <div className="absolute bottom-2 sm:bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300">
                    <PlayButton bookId={book.id} />
                  </div>
                )}
              </div>
              <CardContent className="p-2 sm:p-3 md:p-4">
                <h3 className="font-outfit font-semibold text-sm sm:text-base line-clamp-1 group-hover:text-emerald-500 group-active:text-emerald-500 transition-colors">
                  {book.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1 font-nunito">{book.author}</p>

                {/* Audio duration indicator - more compact on mobile */}
                <div className="flex items-center mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-muted-foreground font-nunito">
                  <Headphones className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1" />
                  <span>{book.duration}</span>
                </div>
              </CardContent>
            </Link>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
