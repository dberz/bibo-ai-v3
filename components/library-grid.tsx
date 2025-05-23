"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { getAllBooks } from "@/lib/books"
import type { Book } from "@/types/book"
import { PlayButton } from "@/components/play-button"
import { useGenre } from "./genre-provider"
import { motion } from "framer-motion"
import { Headphones } from "lucide-react"

export function LibraryGrid() {
  const [books, setBooks] = useState<Book[]>([])
  const [hoveredBook, setHoveredBook] = useState<string | null>(null)
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
            className="overflow-hidden transition-all duration-300 hover:shadow-xl group relative"
            onMouseEnter={() => setHoveredBook(book.id)}
            onMouseLeave={() => setHoveredBook(null)}
          >
            <Link href={`/book/${book.id}`} className="block">
              <div className="aspect-[2/3] relative overflow-hidden">
                <img
                  src={book.coverUrl || "/placeholder.svg"}
                  alt={book.title}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Audio indicator */}
                <div className="absolute top-2 right-2 bg-black/60 p-1 rounded-full">
                  <Headphones className="h-4 w-4 text-emerald-500" />
                </div>

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
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
