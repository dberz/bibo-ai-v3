"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, BookOpen, Play, Pause } from "lucide-react"
import type { Book } from "@/types/book"
import Image from "next/image"
import { usePlayer } from "@/lib/player/player-context"

interface BookDetailProps {
  book: Book
}

export function BookDetail({ book }: BookDetailProps) {
  const { setCurrentBook, togglePlayback, currentBook, isPlaying } = usePlayer()
  const isCurrent = currentBook?.id === book.id

  const handlePlay = () => {
    setCurrentBook(book)
    if (!isPlaying || !isCurrent) {
      togglePlayback()
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3 lg:w-1/4">
          <div className="relative group aspect-[2/3]">
            <Image
              src={book.coverUrl || "/placeholder.svg"}
              alt={book.title}
              fill
              className="object-cover rounded-lg shadow-xl transition-transform duration-500 group-hover:scale-105"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
            <p className="text-xl text-muted-foreground">{book.author}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {book.genres?.map((genre) => (
              <Badge key={genre} variant="secondary">
                {genre}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{book.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>{book.chapters?.length ?? 0} chapters</span>
            </div>
          </div>

          <div className="prose prose-emerald max-w-none">
            <p>{book.description}</p>
          </div>

          <div className="flex justify-center md:justify-start pt-4">
            <Button 
              size="lg" 
              className="text-xl px-8 py-6 bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg rounded-full transition-all duration-300 hover:scale-105" 
              onClick={handlePlay}
            >
              {isPlaying && isCurrent ? (
                <>
                  <Pause className="h-6 w-6 mr-2" />
                  Pause Book
                </>
              ) : (
                <>
                  <Play className="h-6 w-6 mr-2" />
                  Play Book
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
