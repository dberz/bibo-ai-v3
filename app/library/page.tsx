"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, Play, Plus, Eye, Bookmark } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { ConsistentHeader } from "@/components/consistent-header"
import Link from "next/link"
import { usePlayer } from "@/lib/player/player-context"

// Mock library data
const mockLibraryBooks = [
  {
    id: "moby-dick",
    title: "Moby Dick",
    author: "Herman Melville",
    coverUrl: "/book-covers/moby-dick.png",
    progress: 45,
    duration: "24h",
    lastRead: "2 hours ago",
    isCurrentlyReading: true
  },
  {
    id: "pride-and-prejudice",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    coverUrl: "/book-covers/pride-and-prejudice.png",
    progress: 23,
    duration: "11h",
    lastRead: "1 day ago",
    isCurrentlyReading: true
  },
  {
    id: "the-great-gatsby",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverUrl: "/book-covers/the-great-gatsby.png",
    progress: 100,
    duration: "5h",
    lastRead: "3 days ago",
    isCurrentlyReading: false
  },
  {
    id: "the-great-gatsby",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverUrl: "/book-covers/the-great-gatsby.png",
    progress: 0,
    duration: "5h",
    lastRead: "Never read",
    isCurrentlyReading: false
  },
  {
    id: "frankenstein",
    title: "Frankenstein",
    author: "Mary Shelley",
    coverUrl: "/book-covers/frankenstein.png",
    progress: 78,
    duration: "8h",
    lastRead: "1 week ago",
    isCurrentlyReading: false
  },
  {
    id: "dracula",
    title: "Dracula",
    author: "Bram Stoker",
    coverUrl: "/book-covers/dracula.png",
    progress: 100,
    duration: "10h",
    lastRead: "1 month ago",
    isCurrentlyReading: false
  },
  {
    id: "jane-eyre",
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    coverUrl: "/book-covers/jane-eyre.png",
    progress: 100,
    duration: "15h",
    lastRead: "2 weeks ago",
    isCurrentlyReading: false
  },
  {
    id: "to-kill-a-mockingbird",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    coverUrl: "/book-covers/to-kill-a-mockingbird.png",
    progress: 100,
    duration: "6h 30m",
    lastRead: "3 weeks ago",
    isCurrentlyReading: false
  },
  {
    id: "the-secret-garden",
    title: "The Secret Garden",
    author: "Frances Hodgson Burnett",
    coverUrl: "/book-covers/the-secret-garden.png",
    progress: 0,
    duration: "6h",
    lastRead: "Never read",
    isCurrentlyReading: false
  },
  {
    id: "peter-pan",
    title: "Peter Pan",
    author: "J.M. Barrie",
    coverUrl: "/book-covers/peter-pan.png",
    progress: 0,
    duration: "4h",
    lastRead: "Never read",
    isCurrentlyReading: false
  },
  {
    id: "alice-in-wonderland",
    title: "Alice's Adventures in Wonderland",
    author: "Lewis Carroll",
    coverUrl: "/book-covers/alice-in-wonderland.png",
    progress: 0,
    duration: "3h",
    lastRead: "Never read",
    isCurrentlyReading: false
  },
  {
    id: "crime-and-punishment",
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    coverUrl: "/book-covers/crime-and-punishment.png",
    progress: 100,
    duration: "18h",
    lastRead: "1 month ago",
    isCurrentlyReading: false
  },
  {
    id: "anna-karenina",
    title: "Anna Karenina",
    author: "Leo Tolstoy",
    coverUrl: "/book-covers/anna-karenina.png",
    progress: 100,
    duration: "20h",
    lastRead: "2 months ago",
    isCurrentlyReading: false
  }
]

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState<"reading" | "completed" | "wishlist">("reading")
  const { setCurrentBookAndPlay, currentBook, isPlaying } = usePlayer()

  const currentlyReading = mockLibraryBooks.filter(book => book.isCurrentlyReading)
  const completed = mockLibraryBooks.filter(book => book.progress === 100)
  const wishlist = mockLibraryBooks.filter(book => book.progress === 0 && !book.isCurrentlyReading)

  const tabs = [
    { id: "reading", label: "Currently Reading", count: currentlyReading.length },
    { id: "completed", label: "Completed", count: completed.length },
    { id: "wishlist", label: "Wishlist", count: wishlist.length }
  ]

  const getCurrentBooks = () => {
    switch (activeTab) {
      case "reading":
        return currentlyReading
      case "completed":
        return completed
      case "wishlist":
        return wishlist
      default:
        return []
    }
  }

  const handlePlayBook = (book: any) => {
    // Convert mock book to Book type for player
    const bookForPlayer = {
      id: book.id,
      title: book.title,
      author: book.author,
      coverUrl: book.coverUrl,
      duration: book.duration,
      genres: [],
      description: "",
      pages: 0,
      category: "",
      listeners: 0,
      rating: 0,
      reviewCount: 0,
      peopleReading: 0,
      comments: 0,
      loves: 0,
      chapters: []
    }
    setCurrentBookAndPlay(bookForPlayer)
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Consistent Header */}
      <ConsistentHeader />
      
      {/* Tabs */}
      <div className="bg-gray-900 border-b border-gray-700">
        <div className="max-w-md mx-auto px-4">
          <div className="flex space-x-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-emerald-400 text-emerald-400"
                    : "border-transparent text-gray-400 hover:text-gray-200"
                }`}
              >
                <span className="font-medium">{tab.label}</span>
                <Badge variant="secondary" className="text-xs">
                  {tab.count}
                </Badge>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Books List */}
      <div className="max-w-md mx-auto px-4 py-6 pb-20">
        <div className="space-y-4">
          {getCurrentBooks().map((book) => (
            <Card key={book.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex space-x-4">
                  {/* Book Cover - Full Height */}
                  <div className="w-16 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Book Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm truncate">{book.title}</h3>
                    <p className="text-xs text-muted-foreground mb-2">by {book.author}</p>
                    
                    {/* Progress */}
                    {book.progress > 0 && book.progress < 100 && (
                      <div className="space-y-1 mb-3">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{book.progress}% complete</span>
                          <span>{book.duration}</span>
                        </div>
                        <Progress value={book.progress} className="h-1" />
                      </div>
                    )}

                    {/* Status */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                                                       {book.isCurrentlyReading && (
                                 <Badge className="bg-emerald-900 text-emerald-200 text-xs">
                                   Currently Reading
                                 </Badge>
                               )}
                               {book.progress === 100 && (
                                 <Badge className="bg-blue-900 text-blue-200 text-xs">
                                   Completed
                                 </Badge>
                               )}
                               {book.progress === 0 && !book.isCurrentlyReading && (
                                 <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                                   Not Started
                                 </Badge>
                               )}
                      </div>
                      
                      <div className="flex space-x-1">
                        {/* View Book Details */}
                        <Link href={`/book/${book.id}`}>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        
                        {/* Play/Pause Button */}
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0"
                          onClick={() => handlePlayBook(book)}
                        >
                          {currentBook?.id === book.id && isPlaying ? (
                            <BookOpen className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </Button>
                        
                        {/* Bookmark/Add to Wishlist */}
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Last Read */}
                    <p className="text-xs text-muted-foreground mt-2">
                      Last read: {book.lastRead}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {getCurrentBooks().length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              {activeTab === "reading" && "No books currently being read."}
              {activeTab === "completed" && "No completed books yet."}
              {activeTab === "wishlist" && "No books in your wishlist."}
            </p>
            <Button className="mt-4" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Book
            </Button>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
} 