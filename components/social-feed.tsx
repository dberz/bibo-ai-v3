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
import { useRouter } from "next/navigation"
import { usePlayer } from "@/lib/player/player-context"
import { VideoPost } from "@/components/video-post"
import { VideoPost as VideoPostType } from "@/lib/video-posts"

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
    { name: "BookishEmma", type: "Influencer", avatar: "/users/bookish-emma.svg", badge: "BookTok" },
    { name: "Margaret Atwood", type: "Author", avatar: "/authors/margaret-atwood.jpg", badge: "Author" },
    { name: "Penguin Classics", type: "Publisher", avatar: "/publishers/penguin-classics.svg", badge: "Publisher" },
    
    // Additional diverse users
    { name: "Neil Gaiman", type: "Author", avatar: "/authors/neil-gaiman.jpg", badge: "Author" },
    { name: "LiteraryLiam", type: "Influencer", avatar: "/users/literary-liam.svg", badge: "BookTok" },
    { name: "Random House", type: "Publisher", avatar: "/publishers/random-house.svg", badge: "Publisher" },
    { name: "Roxane Gay", type: "Author", avatar: "/authors/roxane-gay.jpg", badge: "Author" },
    { name: "ReadingRaven", type: "Influencer", avatar: "/users/reading-raven.svg", badge: "BookTok" },
    { name: "HarperCollins", type: "Publisher", avatar: "/publishers/harpercollins.svg", badge: "Publisher" },
    
    // Book Clubs
    { name: "Classic Book Club", type: "Book Club", avatar: "/clubs/classic-book-club.svg", badge: "Book Club" },
    { name: "Sci-Fi Readers", type: "Book Club", avatar: "/clubs/sci-fi-readers.svg", badge: "Book Club" },
    { name: "Poetry Society", type: "Book Club", avatar: "/clubs/poetry-society.svg", badge: "Book Club" },
    
    // Literary Critics
    { name: "Dr. Sarah Chen", type: "Critic", avatar: "/critics/dr-sarah-chen.jpg", badge: "Critic" },
    { name: "Prof. Marcus Johnson", type: "Critic", avatar: "/critics/prof-marcus-johnson.jpg", badge: "Critic" },
    { name: "Literary Review", type: "Critic", avatar: "/critics/literary-review.svg", badge: "Critic" },
    
    // Regular Readers
    { name: "Alex Chen", type: "Reader", avatar: "/users/alex-chen.svg", badge: null },
    { name: "Sarah Williams", type: "Reader", avatar: "/users/sarah-williams.svg", badge: null },
    { name: "Michael Rodriguez", type: "Reader", avatar: "/users/michael-rodriguez.svg", badge: null },
  ];
  
  return userTypes[index % userTypes.length];
};

// Generate realistic comments from real Bibo users
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
    "Pride and Prejudice": [
      {
        id: "1",
        user: realUsers[2],
        text: "Mr. Darcy's character development is absolutely brilliant! This audiobook brings the Regency era to life.",
        timestamp: "2h ago"
      },
      {
        id: "2", 
        user: realUsers[3],
        text: "Perfect for my morning walks. The narrator's British accent is so authentic!",
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
    ],
    "Frankenstein": [
      {
        id: "1",
        user: realUsers[6],
        text: "The monster's story is heartbreaking. This audiobook really brings out the gothic atmosphere.",
        timestamp: "2h ago"
      },
      {
        id: "2", 
        user: realUsers[7],
        text: "Perfect for stormy nights! The narrator's voice is so atmospheric.",
        timestamp: "6h ago"
      }
    ],
    "Dracula": [
      {
        id: "1",
        user: realUsers[8],
        text: "This audiobook is absolutely blood-curdling! The epistolary format works brilliantly in audio.",
        timestamp: "1h ago"
      },
      {
        id: "2", 
        user: realUsers[9],
        text: "Each character's voice is so distinct! The narrator really brings the story to life.",
        timestamp: "3h ago"
      }
    ],
    "The Secret Garden": [
      {
        id: "1",
        user: realUsers[10],
        text: "The garden descriptions are so vivid! This audiobook is like a breath of fresh air.",
        timestamp: "2h ago"
      },
      {
        id: "2", 
        user: realUsers[11],
        text: "Perfect for children and adults alike. The narrator captures the magic perfectly.",
        timestamp: "4h ago"
      }
    ],
    "Peter Pan": [
      {
        id: "1",
        user: realUsers[12],
        text: "Second star to the right and straight on till morning! This audiobook makes me believe in magic.",
        timestamp: "1h ago"
      },
      {
        id: "2", 
        user: realUsers[0],
        text: "The narrator's voice for Tinker Bell is absolutely perfect!",
        timestamp: "3h ago"
      }
    ],
    "The Adventures of Tom Sawyer": [
      {
        id: "1",
        user: realUsers[1],
        text: "Whitewashing the fence never sounded so fun! Mark Twain's humor shines in this audiobook.",
        timestamp: "2h ago"
      },
      {
        id: "2", 
        user: realUsers[2],
        text: "The Mississippi River comes alive in this narration. Pure American classic!",
        timestamp: "5h ago"
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

export function SocialFeed({ initialBooks = [] }: SocialFeedProps) {
  const [books, setBooks] = useState<Book[]>(initialBooks)
  const [likedBooks, setLikedBooks] = useState<Set<string>>(new Set())
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const { setCurrentBookAndPlay, currentBook, isPlaying } = usePlayer()
  const router = useRouter()

  // Memoize comments to avoid regenerating on every render
  const bookComments = useMemo(() => {
    const comments: Record<string, Comment[]> = {}
    books.forEach(book => {
      comments[book.id] = generateCommentsForBook(book.title)
    })
    return comments
  }, [books])

  // Load initial books if none provided - start with Moby Dick and ensure no duplicates
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
      
      // Deduplicate books based on book ID
      setBooks(prev => {
        const existingIds = new Set(prev.map(book => book.id))
        const uniqueNewBooks = newBooks.filter(book => !existingIds.has(book.id))
        return [...prev, ...uniqueNewBooks]
      })
      
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
    setCurrentBookAndPlay(book);
  };

  const handleBookClick = (book: Book) => {
    router.push(`/book/${book.id}`);
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      {books.map((book, index) => {
        const comments = bookComments[book.id] || []
        const isLiked = likedBooks.has(book.id)
        
        // Check if this is a video post
        if (book.isVideoPost && book.videoPost) {
          return (
            <VideoPost
              key={`${book.id}-${index}-video`}
              book={book}
              videoUrl={book.videoPost.videoUrl}
              excerpt={book.videoPost.excerpt}
              index={index}
              generateFeedUser={generateFeedUser}
              onLike={handleLike}
              onPlayBook={handlePlayBook}
              onBookClick={handleBookClick}
              isLiked={isLiked}
            />
          )
        }
        
        return (
          <Card key={`${book.id}-${index}`} className="overflow-hidden">
            {/* Post Header */}
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage 
                    src={generateFeedUser(index).avatar} 
                    alt={generateFeedUser(index).name}
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
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
              {/* Listen Button Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <Button
                  size="sm"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={() => handleBookClick(book)}
                >
                  <Play className="h-3 w-3 mr-2" />
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
                  onClick={() => handleLike(book.id)}
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

              {/* Book Info */}
              <div className="space-y-2 cursor-pointer" onClick={() => handleBookClick(book)}>
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-lg hover:text-emerald-400 transition-colors">{book.title}</h3>
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
                      <AvatarImage 
                        src={comment.user.avatar} 
                        onError={(e) => {
                          // Fallback to placeholder if image fails to load
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