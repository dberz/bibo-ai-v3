"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { getAllBooks } from "@/lib/books"
import type { Book } from "@/types/book"
import { PlayButton } from "@/components/play-button"
import { motion } from "framer-motion"
import { Headphones, Heart, Clock, MoreVertical, Trash2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

interface MyBooksGridProps {
  view: "grid" | "list"
  searchQuery: string
  filter?: "favorites" | "recent" | "in-progress"
}

// Mock data for saved books - in a real app, this would come from a backend
const mockSavedBooks = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverUrl: "/covers/great-gatsby.jpg",
    duration: "4h 30m",
    progress: 45,
    isFavorite: true,
    lastRead: "2024-03-15",
    addedAt: "2024-03-01",
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    coverUrl: "/covers/1984.jpg",
    duration: "5h 15m",
    progress: 0,
    isFavorite: false,
    lastRead: null,
    addedAt: "2024-03-10",
  },
  // Add more mock books as needed
]

export function MyBooksGrid({ view, searchQuery, filter }: MyBooksGridProps) {
  const [books, setBooks] = useState<Book[]>([])
  const [hoveredBook, setHoveredBook] = useState<string | null>(null)

  useEffect(() => {
    // In a real app, this would fetch from your backend
    let filteredBooks = [...mockSavedBooks]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filteredBooks = filteredBooks.filter(
        book => 
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query)
      )
    }

    // Apply category filter
    if (filter) {
      switch (filter) {
        case "favorites":
          filteredBooks = filteredBooks.filter(book => book.isFavorite)
          break
        case "recent":
          filteredBooks.sort((a, b) => 
            new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
          )
          break
        case "in-progress":
          filteredBooks = filteredBooks.filter(book => book.progress > 0 && book.progress < 100)
          break
      }
    }

    setBooks(filteredBooks)
  }, [searchQuery, filter])

  const handleFavorite = (bookId: string) => {
    setBooks(prev => prev.map(book => 
      book.id === bookId ? { ...book, isFavorite: !book.isFavorite } : book
    ))
  }

  const handleRemove = (bookId: string) => {
    setBooks(prev => prev.filter(book => book.id !== bookId))
  }

  // Animation variants
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

  if (view === "list") {
    return (
      <motion.div
        className="space-y-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {books.map((book) => (
          <motion.div key={book.id} variants={item}>
            <Card className="overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="flex gap-4 p-4">
                <Link href={`/book/${book.id}`} className="flex-shrink-0">
                  <div className="relative w-24 aspect-[2/3] rounded-md overflow-hidden">
                    <img
                      src={book.coverUrl || "/placeholder.svg"}
                      alt={book.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <Link href={`/book/${book.id}`}>
                        <h3 className="font-semibold text-lg hover:text-emerald-500 transition-colors truncate">
                          {book.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground">{book.author}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleFavorite(book.id)}
                        className={book.isFavorite ? "text-red-500" : ""}
                      >
                        <Heart className="h-4 w-4" fill={book.isFavorite ? "currentColor" : "none"} />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleRemove(book.id)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove from Library
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Headphones className="h-4 w-4" />
                      <span>{book.duration}</span>
                    </div>
                    {book.progress > 0 && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{book.progress}% complete</span>
                      </div>
                    )}
                  </div>
                  {book.progress > 0 && (
                    <Progress value={book.progress} className="mt-2" />
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    )
  }

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      variants={container}
      initial="hidden"
      animate="show"
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

                {/* Progress indicator */}
                {book.progress > 0 && (
                  <div className="absolute bottom-2 left-2 right-2">
                    <Progress value={book.progress} className="h-1" />
                  </div>
                )}

                {hoveredBook === book.id && (
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <PlayButton bookId={book.id} />
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-semibold line-clamp-1 group-hover:text-emerald-500 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{book.author}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 ${book.isFavorite ? "text-red-500" : ""}`}
                    onClick={(e) => {
                      e.preventDefault()
                      handleFavorite(book.id)
                    }}
                  >
                    <Heart className="h-4 w-4" fill={book.isFavorite ? "currentColor" : "none"} />
                  </Button>
                </div>

                {/* Audio duration indicator */}
                <div className="flex items-center mt-1 text-xs text-muted-foreground">
                  <Headphones className="h-3 w-3 mr-1" />
                  <span>{book.duration}</span>
                  {book.progress > 0 && (
                    <>
                      <span className="mx-2">•</span>
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{book.progress}% complete</span>
                    </>
                  )}
                </div>
              </CardContent>
            </Link>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
} 