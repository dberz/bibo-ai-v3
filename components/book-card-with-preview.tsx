"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, Volume2, Eye, Heart, Bookmark, Clock, Star } from "lucide-react"
import Link from "next/link"

interface BookCardWithPreviewProps {
  book: {
    id: string
    title: string
    author: string
    coverUrl: string
    duration: string
    rating: number
    reviewCount: number
    listeners: number
    genres: string[]
    description: string
  }
  onPlay?: (bookId: string) => void
  isCurrentlyPlaying?: boolean
}

export function BookCardWithPreview({ book, onPlay, isCurrentlyPlaying }: BookCardWithPreviewProps) {
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false)
  const [previewProgress, setPreviewProgress] = useState(0)
  const [showPreview, setShowPreview] = useState(false)

  const handlePreviewPlay = () => {
    setIsPreviewPlaying(true)
    setShowPreview(true)
    
    // Simulate 45-second preview
    const duration = 45
    const interval = setInterval(() => {
      setPreviewProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsPreviewPlaying(false)
          setShowPreview(false)
          return 0
        }
        return prev + (100 / duration)
      })
    }, 1000)
  }

  const handlePreviewPause = () => {
    setIsPreviewPlaying(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="overflow-hidden group">
        <CardContent className="p-4">
          <div className="flex space-x-4">
            {/* Book Cover */}
            <div className="relative w-16 h-24 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full h-full object-cover"
              />
              
              {/* Preview Overlay */}
              <AnimatePresence>
                {showPreview && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center"
                  >
                    <div className="text-center">
                      <div className="text-white text-xs mb-1">Preview</div>
                      <div className="text-white text-lg font-bold">
                        {formatTime(Math.floor((previewProgress / 100) * 45))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Book Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate">{book.title}</h3>
                  <p className="text-xs text-gray-400 mb-1">by {book.author}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-2">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(book.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">
                      ({book.reviewCount.toLocaleString()})
                    </span>
                  </div>
                </div>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-1 mb-3">
                {book.genres.slice(0, 2).map((genre) => (
                  <Badge key={genre} variant="outline" className="text-xs">
                    {genre}
                  </Badge>
                ))}
                {book.genres.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{book.genres.length - 2}
                  </Badge>
                )}
              </div>

              {/* Preview Progress */}
              {showPreview && (
                <div className="mb-3">
                  <Progress value={previewProgress} className="h-1 mb-1" />
                  <div className="text-xs text-gray-400">
                    {formatTime(Math.floor((previewProgress / 100) * 45))} / 0:45
                  </div>
                </div>
              )}

              {/* Stats */}
              <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{book.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Volume2 className="h-3 w-3" />
                    <span>{book.listeners.toLocaleString()} listeners</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex space-x-1">
                  {/* Preview Button */}
                  <Button
                    size="sm"
                    variant={showPreview ? "default" : "outline"}
                    className="h-8 px-3 text-xs"
                    onClick={isPreviewPlaying ? handlePreviewPause : handlePreviewPlay}
                  >
                    {isPreviewPlaying ? (
                      <Pause className="h-3 w-3 mr-1" />
                    ) : (
                      <Play className="h-3 w-3 mr-1" />
                    )}
                    {showPreview ? "Stop" : "Preview"}
                  </Button>

                  {/* Play Full Book */}
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 px-3 text-xs"
                    onClick={() => onPlay?.(book.id)}
                  >
                    <Play className="h-3 w-3 mr-1" />
                    Play
                  </Button>
                </div>

                <div className="flex space-x-1">
                  {/* View Details */}
                  <Link href={`/book/${book.id}`}>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  
                  {/* Bookmark */}
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                  
                  {/* Like */}
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
} 