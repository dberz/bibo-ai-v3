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

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      variants={container}
      initial="hidden"
      animate="show"
      key={selectedGenre} // Re-animate when genre changes
    >
      {books.map((book) => (
        <motion.div key={book.id} variants={item}>
          <Card
            className={`overflow-hidden transition-all duration-300 hover:shadow-xl group relative ${successId === book.id ? "ring-2 ring-emerald-400" : ""}`}
            onMouseEnter={() => setHoveredBook(book.id)}
            onMouseLeave={() => setHoveredBook(null)}
          >
            <Link href={`/book/${book.id}`} className="block">
              <div className="aspect-[2/3] relative overflow-hidden">
                <motion.img
                  key={book.coverUrl}
                  src={book.coverUrl || "/placeholder.svg"}
                  alt={book.title}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Audio indicator */}
                <div className="absolute top-2 right-2 bg-black/60 p-1 rounded-full">
                  <Headphones className="h-4 w-4 text-emerald-500" />
                </div>

                {/* AI badge if generated */}
                {isAIGenerated(book.coverUrl) && (
                  <div className="absolute bottom-2 right-2 bg-emerald-600/90 text-white px-2 py-0.5 rounded-full flex items-center gap-1 text-xs shadow-lg">
                    <Sparkles className="h-3 w-3 mr-1" /> AI
                  </div>
                )}

                {hoveredBook === book.id && (
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <PlayButton bookId={book.id} />
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-outfit font-semibold line-clamp-1 group-hover:text-emerald-500 transition-colors">
                  {book.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-1 font-nunito">{book.author}</p>

                {/* Audio duration indicator */}
                <div className="flex items-center mt-1 text-xs text-muted-foreground font-nunito">
                  <Headphones className="h-3 w-3 mr-1" />
                  <span>{book.duration}</span>
                </div>
              </CardContent>
            </Link>
            {/* Generate Cover Button (dev/admin only) */}
            <div
              className={`absolute top-2 left-2 z-10 transition-opacity duration-200 ${hoveredBook === book.id ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              title="Generate a new AI cover"
            >
              <Button
                size="sm"
                variant="secondary"
                className="text-xs px-2 py-1"
                onClick={() => handleGenerateCover(book)}
                disabled={loadingId === book.id}
              >
                {loadingId === book.id ? (
                  <Loader2 className="animate-spin h-4 w-4 mr-1 inline" />
                ) : successId === book.id ? (
                  <CheckCircle className="h-4 w-4 mr-1 text-emerald-500 inline" />
                ) : null}
                Generate Cover
              </Button>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
