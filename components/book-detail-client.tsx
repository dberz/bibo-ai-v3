"use client"

import { usePlayer } from "@/lib/player/player-context"
import { BookSocialGamification } from "@/components/book-social-gamification"
import { AiExperiencesSimplified } from "@/components/ai-experiences-simplified"
import { ErrorBoundary } from "@/components/error-boundary"
import type { Book } from "@/types/book"

interface BookDetailClientProps {
  book: Book
}

export function BookDetailClient({ book }: BookDetailClientProps) {
  const { setCurrentBookAndPlay, currentBook, isPlaying } = usePlayer()
  const isCurrent = currentBook?.id === book.id

  const handlePlay = () => {
    if (!isPlaying || !isCurrent) {
      setCurrentBookAndPlay(book)
    }
  }

  return (
    <>
      {/* AI Experiences Section */}
      <div className="mt-12">
        <ErrorBoundary>
          <AiExperiencesSimplified book={book} />
        </ErrorBoundary>
      </div>

      {/* Social and Gamification Section */}
      <div className="mt-12">
        <ErrorBoundary>
          <BookSocialGamification book={book} />
        </ErrorBoundary>
      </div>
    </>
  )
} 