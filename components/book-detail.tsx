"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, BookOpen, Play, Pause, Heart, MessageCircle, Users, Share2, Star, Bookmark } from "lucide-react"
import type { Book } from "@/types/book"
import Image from "next/image"
import { usePlayer } from "@/lib/player/player-context"
import { BookSocialGamification } from "@/components/book-social-gamification"
import { AiExperiencesSimplified } from "@/components/ai-experiences-simplified"
import { ErrorBoundary } from "@/components/error-boundary"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { saveBook, removeBook, isBookSaved } from "@/lib/library-service"

interface BookDetailProps {
  book: Book
}

export function BookDetail({ book }: BookDetailProps) {
  const { setCurrentBookAndPlay, currentBook, isPlaying } = usePlayer()
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const { toast } = useToast()
  const isCurrent = currentBook?.id === book.id

  // Check if book is saved on component mount
  useEffect(() => {
    try {
      setIsSaved(isBookSaved(book.id))
    } catch (error) {
      console.error('Error checking if book is saved:', error)
      setIsSaved(false)
    }
  }, [book.id])

  const handlePlay = () => {
    try {
      if (!isPlaying || !isCurrent) {
        setCurrentBookAndPlay(book)
      }
    } catch (error) {
      console.error('Error playing book:', error)
    }
  }

  const handleLike = () => {
    try {
      setIsLiked(!isLiked)
      toast({
        title: isLiked ? "Removed from favorites" : "Added to favorites",
        description: isLiked ? `Removed ${book.title} from your favorites` : `Added ${book.title} to your favorites`,
      })
    } catch (error) {
      console.error('Error handling like:', error)
    }
  }

  const handleSave = () => {
    try {
      if (isSaved) {
        removeBook(book.id)
        setIsSaved(false)
        toast({
          title: "Removed from library",
          description: `Removed ${book.title} from your library`,
        })
      } else {
        saveBook(book)
        setIsSaved(true)
        toast({
          title: "Added to library",
          description: `Added ${book.title} to your library`,
        })
      }
    } catch (error) {
      console.error('Error handling save:', error)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: book.title,
          text: `Check out ${book.title} by ${book.author} on Bibo!`,
          url: window.location.href,
        })
      } catch (error) {
        // User cancelled the share or there was an error
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Share error:', error)
          toast({
            title: "Share failed",
            description: "Unable to share this book. Please try again.",
            variant: "destructive",
          })
        }
        // Don't show error for user cancellation
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href)
        toast({
          title: "Link copied",
          description: "Book link has been copied to your clipboard",
        })
      } catch (error) {
        console.error('Clipboard error:', error)
        toast({
          title: "Copy failed",
          description: "Unable to copy link to clipboard. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3 lg:w-1/4">
          <div className="relative group aspect-[2/3]">
            <Image
              src={book.coverUrl || "/placeholder.svg"}
              alt={book.title}
              fill
              className="object-cover rounded-xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
          </div>
        </div>

        <div className="flex-1 space-y-6">
          {/* Book Title and Author */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{book.title}</h1>
            <p className="text-xl text-muted-foreground font-medium">by {book.author}</p>
          </div>

          {/* Social Stats Section */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Reading Stats */}
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Users className="h-5 w-5 text-emerald-400" />
                  <span className="text-2xl font-bold text-emerald-400">{book.peopleReading || 1247}</span>
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">Reading</div>
                <div className="text-xs text-gray-500">({book.listeners || 23400} read)</div>
              </div>
              
              {/* Loves */}
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Heart className="h-5 w-5 text-red-400" />
                  <span className="text-2xl font-bold text-red-400">{isLiked ? book.loves + 1 : book.loves || 342}</span>
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">Loves</div>
              </div>
              
              {/* Comments */}
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <MessageCircle className="h-5 w-5 text-blue-400" />
                  <span className="text-2xl font-bold text-blue-400">{book.comments || 89}</span>
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">Comments</div>
              </div>
              
              {/* Ratings */}
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="text-2xl font-bold text-yellow-400">{book.rating?.toFixed(1) || "4.3"}</span>
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">Avg Rating</div>
                <div className="text-xs text-gray-500">({book.reviewCount || 156} ratings)</div>
              </div>
            </div>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2">
            {book.genres?.map((genre) => (
              <Badge key={genre} variant="secondary" className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                {genre}
              </Badge>
            ))}
          </div>

          {/* Book Info */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-emerald-400" />
              <span>{book.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-emerald-400" />
              <span>{book.chapters?.length ?? 0} chapters</span>
            </div>
          </div>

          {/* Description */}
          <div className="prose prose-emerald max-w-none">
            <p className="text-gray-300 leading-relaxed text-base">
              {book.description || `"${book.title}" by ${book.author} is a literary masterpiece that has captivated readers for generations. This timeless work explores profound themes of human nature, society, and the human condition through rich storytelling and unforgettable characters. The narrative weaves together complex plotlines with masterful prose, creating an immersive experience that resonates with readers across different eras and cultures. Whether you're discovering this classic for the first time or revisiting it as a beloved favorite, this audiobook adaptation brings the story to life with exceptional narration that captures the essence and emotion of the original text.`}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button 
              size="lg" 
              className="text-xl px-8 py-6 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg rounded-full transition-all duration-300 hover:scale-105 flex-1 sm:flex-none" 
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
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="lg"
                className={`flex items-center space-x-2 transition-all duration-200 ${
                  isLiked ? 'text-red-500 border-red-500/50' : 'text-gray-300 border-gray-600'
                }`}
                onClick={handleLike}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                <span>{isLiked ? book.loves + 1 : book.loves}</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className={`flex items-center space-x-2 transition-all duration-200 ${
                  isSaved ? 'text-emerald-500 border-emerald-500/50' : 'text-gray-300 border-gray-600'
                }`}
                onClick={handleSave}
              >
                <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
                <span>Save</span>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="flex items-center space-x-2 text-gray-300 border-gray-600 hover:text-emerald-400 hover:border-emerald-500/50 transition-all duration-200"
                onClick={handleShare}
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Your Progress Section */}
      {isPlaying && isCurrent && (
        <div className="mt-12">
          <Card className="border-emerald-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg font-semibold">
                <BookOpen className="h-5 w-5 text-emerald-500" />
                <span>Your Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="font-medium text-emerald-400">45%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-emerald-500" />
                    <span className="text-gray-300">2h 15m listened</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4 text-blue-500" />
                    <span className="text-gray-300">3/8 chapters</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* AI Experiences Section */}
      <div className="mt-12">
        <ErrorBoundary>
          <AiExperiencesSimplified book={book} />
        </ErrorBoundary>
      </div>

      {/* Related Reading Challenges Section */}
      <div className="mt-12">
        <ErrorBoundary>
          <BookSocialGamification book={book} />
        </ErrorBoundary>
      </div>
    </div>
  )
}
