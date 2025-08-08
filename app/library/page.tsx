"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, Play, Plus, Eye, Bookmark, Heart } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { ConsistentHeader } from "@/components/consistent-header"
import Link from "next/link"
import { usePlayer } from "@/lib/player/player-context"
import { useBottomPadding } from "@/hooks/use-mobile"
import { getSavedBooks, type LibraryBook } from "@/lib/library-service"

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState<"reading" | "completed" | "wishlist">("reading")
  const [libraryBooks, setLibraryBooks] = useState<LibraryBook[]>([])
  const { setCurrentBookAndPlay, currentBook, isPlaying } = usePlayer()
  const bottomPadding = useBottomPadding()

  // Load saved books on component mount
  useEffect(() => {
    const savedBooks = getSavedBooks()
    setLibraryBooks(savedBooks)
  }, [])

  const currentlyReading = libraryBooks.filter(book => book.isCurrentlyReading)
  const completed = libraryBooks.filter(book => (book.progress || 0) === 100)
  const wishlist = libraryBooks.filter(book => (book.progress || 0) === 0 && !book.isCurrentlyReading)

  const tabs = [
    { id: "reading", label: "Currently Reading", count: currentlyReading.length, icon: BookOpen },
    { id: "completed", label: "Completed", count: completed.length, icon: Clock },
    { id: "wishlist", label: "Wishlist", count: wishlist.length, icon: Heart }
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

  const handlePlayBook = (book: LibraryBook) => {
    // Convert library book to Book type for player
    const bookForPlayer = {
      id: book.id,
      title: book.title,
      author: book.author,
      coverUrl: book.coverUrl,
      duration: book.duration,
      genres: book.genres || [],
      description: book.description || "",
      pages: book.pages || 0,
      category: book.category || "",
      listeners: book.listeners || 0,
      rating: book.rating || 0,
      reviewCount: book.reviewCount || 0,
      peopleReading: book.peopleReading || 0,
      comments: book.comments || 0,
      loves: book.loves || 0,
      chapters: book.chapters || []
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
          <div className="flex justify-between">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex flex-col items-center justify-center py-4 px-3 min-h-[70px] w-full transition-all duration-200 relative rounded-lg ${
                    isActive
                      ? "text-emerald-400 bg-emerald-400/10"
                      : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 active:text-gray-300"
                  }`}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-emerald-400 rounded-full" />
                  )}
                  
                  {/* Icon and Label */}
                  <div className="flex flex-col items-center space-y-1">
                    <Icon className={`h-5 w-5 ${isActive ? 'text-emerald-400' : 'text-gray-400'}`} />
                    <span className="text-xs font-medium leading-tight text-center">
                      {tab.label}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>



      {/* Books List */}
      <div className={`max-w-md mx-auto px-4 py-6 ${bottomPadding}`}>
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
                    {(book.progress || 0) > 0 && (book.progress || 0) < 100 && (
                      <div className="space-y-1 mb-3">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{book.progress || 0}% complete</span>
                          <span>{book.duration}</span>
                        </div>
                        <Progress value={book.progress || 0} className="h-1" />
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
                        {(book.progress || 0) === 100 && (
                          <Badge className="bg-blue-900 text-blue-200 text-xs">
                            Completed
                          </Badge>
                        )}
                        {(book.progress || 0) === 0 && !book.isCurrentlyReading && (
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