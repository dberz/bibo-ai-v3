"use client"

import { Book } from "@/types/book"
import { Heart, MessageCircle, Users, Play, Share2, Volume2, VolumeX } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { usePlayer } from "@/lib/player/player-context"

interface Comment {
  id: string
  user: {
    name: string
    avatar: string
  }
  text: string
  timestamp: string
}

interface VideoPostProps {
  book: Book
  videoUrl: string
  excerpt: string
  index: number
  generateFeedUser: (index: number) => any
  onLike: (bookId: string) => void
  onPlayBook: (book: Book) => void
  onBookClick: (book: Book) => void
  isLiked: boolean
}

const generateCommentsForBook = (bookTitle: string): Comment[] => {
  const realUsers = [
    { name: "Alex Chen", avatar: "/users/alex-chen.svg", type: "Reader" },
    { name: "Sarah Williams", avatar: "/users/sarah-williams.svg", type: "Reader" },
    { name: "Michael Rodriguez", avatar: "/users/michael-rodriguez.svg", type: "Reader" },
    { name: "Emma Thompson", avatar: "/users/emma-thompson.svg", type: "Reader" },
    { name: "David Kim", avatar: "/users/david-kim.svg", type: "Reader" },
    { name: "Lisa Patel", avatar: "/users/lisa-patel.svg", type: "Reader" },
    { name: "James Wilson", avatar: "/users/james-wilson.svg", type: "Reader" },
    { name: "Maria Garcia", avatar: "/users/maria-garcia.svg", type: "Reader" },
    { name: "BookishEmma", avatar: "/users/bookish-emma.svg", type: "Influencer" },
    { name: "LiteraryLiam", avatar: "/users/literary-liam.svg", type: "Influencer" },
    { name: "ReadingRaven", avatar: "/users/reading-raven.svg", type: "Influencer" },
    { name: "Dr. Sarah Chen", avatar: "/critics/dr-sarah-chen.jpg", type: "Critic" },
    { name: "Prof. Marcus Johnson", avatar: "/critics/prof-marcus-johnson.jpg", type: "Critic" },
  ];

  const commentTemplates: Record<string, Comment[]> = {
    "Moby Dick": [
      {
        id: "1",
        user: realUsers[0],
        text: "Just finished Chapter 1 and I'm completely hooked! The opening line is pure poetry. The audiobook narration is absolutely mesmerizing.",
        timestamp: "1h ago"
      },
      {
        id: "2", 
        user: realUsers[1],
        text: "This book completely changed how I see the ocean. The descriptions are so vivid, I can almost feel the salt spray!",
        timestamp: "3h ago"
      }
    ],
    "The Call of the Wild": [
      {
        id: "1",
        user: realUsers[2],
        text: "This story of survival and transformation is absolutely gripping. The audiobook captures the wild spirit perfectly!",
        timestamp: "2h ago"
      },
      {
        id: "2", 
        user: realUsers[3],
        text: "The descriptions of the Yukon are so vivid. I can almost feel the snow and hear the wolves!",
        timestamp: "5h ago"
      }
    ],
    "The Great Gatsby": [
      {
        id: "1",
        user: realUsers[4],
        text: "The green light at the end of the dock... this book captures the American Dream perfectly.",
        timestamp: "1h ago"
      },
      {
        id: "2", 
        user: realUsers[5],
        text: "Fitzgerald's prose is like jazz music - so smooth and rhythmic. Love this audiobook!",
        timestamp: "4h ago"
      }
    ]
  };
  
  return commentTemplates[bookTitle] || [
    {
      id: "1",
      user: realUsers[Math.floor(Math.random() * realUsers.length)],
      text: "This audiobook is absolutely fantastic! The narration brings the story to life.",
      timestamp: "2h ago"
    },
    {
      id: "2",
      user: realUsers[Math.floor(Math.random() * realUsers.length)],
      text: "Perfect for my daily commute. The story is so engaging!",
      timestamp: "4h ago"
    }
  ];
};

export function VideoPost({ 
  book, 
  videoUrl, 
  excerpt, 
  index, 
  generateFeedUser, 
  onLike, 
  onPlayBook, 
  onBookClick, 
  isLiked 
}: VideoPostProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [showOverlay, setShowOverlay] = useState(false)
  const [hasError, setHasError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter()

  // Autoplay video when component mounts
  useEffect(() => {
    if (videoRef.current) {
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
            setShowOverlay(false)
          })
          .catch((error) => {
            console.log("Autoplay prevented:", error)
            setShowOverlay(true)
          })
      }
    }
  }, [])

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVideoClick = () => {
    handlePlayPause()
    setShowOverlay(false)
  }

  const handleVideoEnd = () => {
    setIsPlaying(false)
    setShowOverlay(true)
    if (videoRef.current) {
      videoRef.current.currentTime = 0
    }
  }

  const handleVideoError = () => {
    setHasError(true)
    console.error("Video failed to load:", videoUrl)
  }

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage 
              src={generateFeedUser(index).avatar} 
              alt={generateFeedUser(index).name}
              onError={(e) => {
                e.currentTarget.src = "/placeholder-user.jpg"
              }}
            />
            <AvatarFallback>{generateFeedUser(index).name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <div className="font-semibold text-sm text-white">{generateFeedUser(index).name}</div>
              {generateFeedUser(index).badge && (
                <Badge variant="outline" className="text-xs border-emerald-500/30 text-emerald-400">
                  {generateFeedUser(index).badge}
                </Badge>
              )}
            </div>
            <div className="text-xs text-gray-400">
              {generateFeedUser(index).type === "Publisher" && "Book trailer"}
              {generateFeedUser(index).type === "Author" && "Author spotlight"}
              {generateFeedUser(index).type === "Influencer" && "BookTok video"}
              {generateFeedUser(index).type === "Book Club" && "Club preview"}
              {generateFeedUser(index).type === "Critic" && "Literary review"}
              {generateFeedUser(index).type === "Reader" && "Book preview"}
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <Play className="h-4 w-4 text-gray-300" />
          </Button>
        </div>
      </div>

      {/* Video Container */}
      <div className="relative bg-black">
        {hasError ? (
          <div className="w-full aspect-[9/16] bg-gray-800 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <p>Video unavailable</p>
              <p className="text-sm">{book.title}</p>
            </div>
          </div>
        ) : (
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full aspect-[9/16] object-cover"
            muted={isMuted}
            loop
            playsInline
            onEnded={handleVideoEnd}
            onClick={handleVideoClick}
            onError={handleVideoError}
          />
        )}
        
        {/* Video Controls Overlay */}
        {showOverlay && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <Button
              size="lg"
              className="rounded-full h-16 w-16 bg-white/90 hover:bg-white text-black transition-all duration-300 hover:scale-110"
              onClick={handlePlayPause}
            >
              <Play className="h-6 w-6 ml-1" />
            </Button>
          </div>
        )}

        {/* Book Metadata Overlay - Moved to top */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/90 via-black/60 to-transparent p-6 pb-24">
          <div className="space-y-4">
            <h3 
              className="font-bold text-3xl text-white leading-tight cursor-pointer hover:text-emerald-300 transition-colors"
              onClick={() => onBookClick(book)}
            >
              {book.title}
            </h3>
            <div className="flex items-center space-x-3">
              <p className="text-lg text-gray-200 font-medium">by {book.author}</p>
              <Badge variant="secondary" className="text-sm bg-white/20 text-white px-2 py-1">
                {book.duration}
              </Badge>
            </div>
            <p className="text-lg text-white/95 italic line-clamp-3 leading-relaxed font-light">"{excerpt}"</p>
          </div>
        </div>

        {/* Mute/Unmute Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white"
          onClick={handleMuteToggle}
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>

        {/* Listen Button - Positioned at bottom to avoid overlap */}
        <div className="absolute bottom-6 left-6 right-6">
          <Button
            size="sm"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3"
            onClick={() => onBookClick(book)}
          >
            <Play className="h-4 w-4 mr-2" />
            Listen
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 space-y-3">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className={`flex items-center space-x-2 transition-all duration-200 px-3 py-2 ${
              isLiked ? 'text-red-500' : 'text-gray-300'
            }`}
            onClick={() => onLike(book.id)}
          >
            <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
            <span className="text-sm">{isLiked ? book.loves + 1 : book.loves}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-gray-300 px-3 py-2">
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm">{book.comments}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-gray-300 px-3 py-2">
            <Users className="h-5 w-5" />
            <span className="text-sm">{book.peopleReading}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center space-x-2 ml-auto text-gray-300 px-3 py-2">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>

        {/* Comments Preview */}
        <div className="space-y-2">
          {generateCommentsForBook(book.title).slice(0, 2).map((comment) => (
            <div key={comment.id} className="flex space-x-2">
              <Avatar className="h-6 w-6">
                <AvatarImage 
                  src={comment.user.avatar} 
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder-user.jpg"
                  }}
                />
                <AvatarFallback className="text-xs">
                  {comment.user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="text-sm">
                  <span className="font-semibold">{comment.user.name}</span>
                  <span className="ml-2">{comment.text}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {comment.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Comments */}
        {book.comments > 2 && (
          <Button variant="ghost" size="sm" className="text-muted-foreground p-0 h-auto">
            View all {book.comments} comments
          </Button>
        )}
      </div>
    </div>
  )
} 