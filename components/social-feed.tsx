"use client"

import { Book } from "@/types/book"
import { Heart, MessageCircle, Users, Play, BookOpen, Share2, Loader2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect, useCallback, useMemo } from "react"
import { getPersonalizedFeed, hasMorePosts } from "@/lib/feed-service"
import Link from "next/link"
import { usePlayer } from "@/lib/player/player-context"

interface SocialFeedProps {
  initialBooks?: Book[]
}

interface Comment {
  id: string
  user: {
    name: string
    avatar: string
  }
  text: string
  timestamp: string
}

// Generate different types of users for the feed
const generateFeedUser = (index: number) => {
  const userTypes = [
    // Mix for top positions - ensure diversity in first 3
    { name: "BookishEmma", type: "Influencer", avatar: "/placeholder-user.jpg", badge: "BookTok" },
    { name: "Margaret Atwood", type: "Author", avatar: "/placeholder-user.jpg", badge: "Author" },
    { name: "Penguin Classics", type: "Publisher", avatar: "/placeholder-user.jpg", badge: "Publisher" },
    
    // Additional diverse users
    { name: "Neil Gaiman", type: "Author", avatar: "/placeholder-user.jpg", badge: "Author" },
    { name: "LiteraryLiam", type: "Influencer", avatar: "/placeholder-user.jpg", badge: "BookTok" },
    { name: "Random House", type: "Publisher", avatar: "/placeholder-user.jpg", badge: "Publisher" },
    { name: "Roxane Gay", type: "Author", avatar: "/placeholder-user.jpg", badge: "Author" },
    { name: "ReadingRaven", type: "Influencer", avatar: "/placeholder-user.jpg", badge: "BookTok" },
    { name: "HarperCollins", type: "Publisher", avatar: "/placeholder-user.jpg", badge: "Publisher" },
    
    // Book Clubs
    { name: "Classic Book Club", type: "Book Club", avatar: "/placeholder-user.jpg", badge: "Book Club" },
    { name: "Sci-Fi Readers", type: "Book Club", avatar: "/placeholder-user.jpg", badge: "Book Club" },
    { name: "Poetry Society", type: "Book Club", avatar: "/placeholder-user.jpg", badge: "Book Club" },
    
    // Literary Critics
    { name: "Dr. Sarah Chen", type: "Critic", avatar: "/placeholder-user.jpg", badge: "Critic" },
    { name: "Prof. Marcus Johnson", type: "Critic", avatar: "/placeholder-user.jpg", badge: "Critic" },
    { name: "Literary Review", type: "Critic", avatar: "/placeholder-user.jpg", badge: "Critic" },
    
    // Regular Readers
    { name: "Book Lover", type: "Reader", avatar: "/placeholder-user.jpg", badge: null },
    { name: "Audiobook Fan", type: "Reader", avatar: "/placeholder-user.jpg", badge: null },
    { name: "Classic Collector", type: "Reader", avatar: "/placeholder-user.jpg", badge: null }
  ];
  
  return userTypes[index % userTypes.length];
};

// Generate different comments based on book title
const generateCommentsForBook = (bookTitle: string): Comment[] => {
  const commentTemplates = {
    "Moby Dick": [
      {
        id: "1",
        user: { name: "Captain Ahab", avatar: "/placeholder.svg" },
        text: "Call me obsessed! This book completely changed how I see the ocean. The audiobook narration is absolutely mesmerizing.",
        timestamp: "1h ago"
      },
      {
        id: "2", 
        user: { name: "Ishmael", avatar: "/placeholder.svg" },
        text: "Just finished Chapter 1 and I'm already hooked. The opening line is pure poetry!",
        timestamp: "3h ago"
      }
    ],
    "Pride and Prejudice": [
      {
        id: "1",
        user: { name: "Elizabeth Bennet", avatar: "/placeholder.svg" },
        text: "Mr. Darcy's character development is absolutely brilliant! This audiobook brings the Regency era to life.",
        timestamp: "2h ago"
      },
      {
        id: "2", 
        user: { name: "Jane Austen Fan", avatar: "/placeholder.svg" },
        text: "Perfect for my morning walks. The narrator's British accent is so authentic!",
        timestamp: "5h ago"
      }
    ],
    "The Great Gatsby": [
      {
        id: "1",
        user: { name: "Jay Gatsby", avatar: "/placeholder.svg" },
        text: "The green light at the end of the dock... this book captures the American Dream perfectly.",
        timestamp: "1h ago"
      },
      {
        id: "2", 
        user: { name: "Daisy Buchanan", avatar: "/placeholder.svg" },
        text: "Fitzgerald's prose is like jazz music - so smooth and rhythmic. Love this audiobook!",
        timestamp: "4h ago"
      }
    ],
    "Frankenstein": [
      {
        id: "1",
        user: { name: "Victor Frankenstein", avatar: "/placeholder.svg" },
        text: "The monster's story is heartbreaking. This audiobook really brings out the gothic atmosphere.",
        timestamp: "2h ago"
      },
      {
        id: "2", 
        user: { name: "Gothic Reader", avatar: "/placeholder.svg" },
        text: "Perfect for stormy nights! The narrator's voice is so atmospheric.",
        timestamp: "6h ago"
      }
    ],
    "Dracula": [
      {
        id: "1",
        user: { name: "Count Dracula", avatar: "/placeholder.svg" },
        text: "I never drink... audiobooks. But this one is absolutely blood-curdling!",
        timestamp: "1h ago"
      },
      {
        id: "2", 
        user: { name: "Van Helsing", avatar: "/placeholder.svg" },
        text: "The epistolary format works brilliantly in audio. Each character's voice is distinct!",
        timestamp: "3h ago"
      }
    ],
    "The Secret Garden": [
      {
        id: "1",
        user: { name: "Mary Lennox", avatar: "/placeholder.svg" },
        text: "The garden descriptions are so vivid! This audiobook is like a breath of fresh air.",
        timestamp: "2h ago"
      },
      {
        id: "2", 
        user: { name: "Nature Lover", avatar: "/placeholder.svg" },
        text: "Perfect for children and adults alike. The narrator captures the magic perfectly.",
        timestamp: "4h ago"
      }
    ],
    "Peter Pan": [
      {
        id: "1",
        user: { name: "Peter Pan", avatar: "/placeholder.svg" },
        text: "Second star to the right and straight on till morning! This audiobook makes me believe in magic.",
        timestamp: "1h ago"
      },
      {
        id: "2", 
        user: { name: "Wendy Darling", avatar: "/placeholder.svg" },
        text: "The narrator's voice for Tinker Bell is absolutely perfect!",
        timestamp: "3h ago"
      }
    ],
    "The Adventures of Tom Sawyer": [
      {
        id: "1",
        user: { name: "Tom Sawyer", avatar: "/placeholder.svg" },
        text: "Whitewashing the fence never sounded so fun! Mark Twain's humor shines in this audiobook.",
        timestamp: "2h ago"
      },
      {
        id: "2", 
        user: { name: "Huck Finn", avatar: "/placeholder.svg" },
        text: "The Mississippi River comes alive in this narration. Pure American classic!",
        timestamp: "5h ago"
      }
    ]
  }

  // Return specific comments for the book, or default comments if not found
  return commentTemplates[bookTitle as keyof typeof commentTemplates] || [
    {
      id: "1",
      user: { name: "Book Lover", avatar: "/placeholder.svg" },
      text: "This book is absolutely amazing! The audiobook narration brings the story to life.",
      timestamp: "2h ago"
    },
    {
      id: "2", 
      user: { name: "Audiobook Fan", avatar: "/placeholder.svg" },
      text: "Perfect for my daily commute. The narrator's voice is so engaging!",
      timestamp: "4h ago"
    }
  ]
}

export function SocialFeed({ initialBooks = [] }: SocialFeedProps) {
  const [books, setBooks] = useState<Book[]>(initialBooks)
  const [likedBooks, setLikedBooks] = useState<Set<string>>(new Set())
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const { setCurrentBookAndPlay, currentBook, isPlaying } = usePlayer()

  // Memoize comments to avoid regenerating on every render
  const bookComments = useMemo(() => {
    const comments: Record<string, Comment[]> = {}
    books.forEach(book => {
      comments[book.id] = generateCommentsForBook(book.title)
    })
    return comments
  }, [books])

  // Load initial books if none provided - reduced to 3 for faster initial load
  useEffect(() => {
    if (initialBooks.length === 0 && isInitialLoad) {
      setIsInitialLoad(false)
      loadMoreBooks(3) // Load only 3 books initially
    }
  }, [initialBooks.length, isInitialLoad])

  const loadMoreBooks = useCallback(async (limit: number = 6) => {
    if (loading || !hasMore) return
    
    setLoading(true)
    try {
      // Reduced delay for faster loading
      await new Promise(resolve => setTimeout(resolve, 200))
      
      const newBooks = getPersonalizedFeed(page, limit)
      setBooks(prev => [...prev, ...newBooks])
      setPage(prev => prev + 1)
      setHasMore(hasMorePosts(page, limit))
    } catch (error) {
      console.error('Error loading more books:', error)
    } finally {
      setLoading(false)
    }
  }, [page, loading, hasMore])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMoreBooks(6) // Load 6 more books on scroll
        }
      },
      { threshold: 0.1 }
    )

    const sentinel = document.getElementById('scroll-sentinel')
    if (sentinel) {
      observer.observe(sentinel)
    }

    return () => observer.disconnect()
  }, [loadMoreBooks, hasMore, loading])

  const handleLike = (bookId: string) => {
    const newLikedBooks = new Set(likedBooks)
    if (newLikedBooks.has(bookId)) {
      newLikedBooks.delete(bookId)
    } else {
      newLikedBooks.add(bookId)
    }
    setLikedBooks(newLikedBooks)
  }

  const handlePlayBook = (book: Book) => {
    console.log('Playing book:', book.title);
    setCurrentBookAndPlay(book);
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      {books.map((book, index) => {
        const comments = bookComments[book.id] || []
        const isLiked = likedBooks.has(book.id)
        
        return (
          <Card key={`${book.id}-${index}`} className="overflow-hidden">
            {/* Post Header */}
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder-user.jpg" alt="User" />
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
                    {generateFeedUser(index).type === "Publisher" && "Recommended a book"}
                    {generateFeedUser(index).type === "Author" && "Shared their work"}
                    {generateFeedUser(index).type === "Influencer" && "BookTok review"}
                    {generateFeedUser(index).type === "Book Club" && "Club pick"}
                    {generateFeedUser(index).type === "Critic" && "Literary review"}
                    {generateFeedUser(index).type === "Reader" && "Shared a book"}
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <BookOpen className="h-4 w-4 text-gray-300" />
                </Button>
              </div>
            </div>

            {/* Book Cover Image */}
            <div className="relative">
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full aspect-[2/3] object-cover"
                loading="lazy"
              />
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="lg"
                  className="rounded-full h-16 w-16 bg-white/90 hover:bg-white text-black transition-all duration-300 hover:scale-110"
                  onClick={() => handlePlayBook(book)}
                >
                  <Play className="h-6 w-6 ml-1" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-4 space-y-3">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`flex items-center space-x-2 transition-all duration-200 ${
                    isLiked ? 'text-red-500' : 'text-gray-300'
                  }`}
                  onClick={() => handleLike(book.id)}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                  <span className="text-sm">{isLiked ? book.loves + 1 : book.loves}</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-gray-300">
                  <MessageCircle className="h-5 w-5" />
                  <span className="text-sm">{book.comments}</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-gray-300">
                  <Users className="h-5 w-5" />
                  <span className="text-sm">{book.peopleReading}</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2 ml-auto text-gray-300">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Book Info */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-lg">{book.title}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {book.duration}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">by {book.author}</p>
                <p className="text-sm line-clamp-2">{book.description}</p>
                
                {/* Genre Tags */}
                <div className="flex flex-wrap gap-1">
                  {book.genres.slice(0, 3).map((genre) => (
                    <Badge key={genre} variant="outline" className="text-xs">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Comments Preview */}
              <div className="space-y-2">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg" />
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
          </Card>
        )
      })}

      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center py-8">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
            <span className="text-sm text-muted-foreground">Loading more books...</span>
          </div>
        </div>
      )}

      {/* Scroll sentinel for infinite scroll */}
      <div id="scroll-sentinel" className="h-4" />
    </div>
  )
} 