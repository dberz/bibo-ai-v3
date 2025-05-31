"use client"

import { useState, useEffect } from "react"
import { getAllBooks } from "@/lib/books"
import { Book } from "@/types/book"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search as SearchIcon, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BottomNavigation } from "@/components/bottom-navigation"
import { ConsistentHeader } from "@/components/consistent-header"
import Link from "next/link"

export default function BrowsePage() {
  const [books, setBooks] = useState<Book[]>([])
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState<string>("all")

  useEffect(() => {
    const loadBooks = async () => {
      const allBooks = getAllBooks()
      setBooks(allBooks)
      setFilteredBooks(allBooks)
    }
    loadBooks()
  }, [])

  useEffect(() => {
    let filtered = books

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.genres.some(genre => genre.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Filter by genre
    if (selectedGenre !== "all") {
      filtered = filtered.filter(book =>
        book.genres.some(genre => genre.toLowerCase() === selectedGenre.toLowerCase())
      )
    }

    setFilteredBooks(filtered)
  }, [books, searchQuery, selectedGenre])

  // Algorithmic sorts
  const getBackCatalogHiddenGems = () => {
    // Non-public domain titles (modern books) with lower engagement
    return books
      .filter(book => 
        !["moby-dick", "pride-and-prejudice", "the-great-gatsby", "to-kill-a-mockingbird", 
           "jane-eyre", "wuthering-heights", "crime-and-punishment", "anna-karenina", 
           "the-time-machine", "don-quixote", "the-divine-comedy", "frankenstein", 
           "dracula", "the-secret-garden", "peter-pan", "alice-in-wonderland", 
           "call-of-the-wild", "a-room-with-a-view"].includes(book.id)
      )
      .sort((a, b) => a.listeners - b.listeners) // Sort by lowest listeners
      .slice(0, 8)
  }

  const getTrendingNow = () => {
    // Random selection of popular books
    const popularBooks = books
      .filter(book => book.listeners > 15000)
      .sort((a, b) => b.listeners - a.listeners)
    
    // Shuffle and take first 8
    return popularBooks
      .sort(() => Math.random() - 0.5)
      .slice(0, 8)
  }

  const getReadByOthersLikeMe = () => {
    // Simulate recommendations based on user preferences
    const recommendationGenres = ["Romance", "Sci-Fi", "Mystery", "Adventure"]
    const recommendedBooks = books
      .filter(book => recommendationGenres.some(genre => book.genres.includes(genre)))
      .sort((a, b) => b.rating - a.rating) // Sort by highest rating
    
    return recommendedBooks.slice(0, 8)
  }

  const genres = ["all", "classics", "romance", "sci-fi", "horror", "children", "adventure", "mystery", "thriller", "non-fiction"]

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Consistent Header */}
      <ConsistentHeader />

      {/* Search and Filters */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search books, authors, or genres..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Genre Filters */}
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <Button
                key={genre}
                variant={selectedGenre === genre ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedGenre(genre)}
                className="capitalize"
              >
                {genre === "all" ? "All Genres" : genre}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 pb-20">
        {searchQuery || selectedGenre !== "all" ? (
          // Search Results
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">
              Search Results ({filteredBooks.length} books)
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredBooks.map((book) => (
                <Link key={book.id} href={`/book/${book.id}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="aspect-[2/3] mb-3">
                        <img
                          src={book.coverUrl}
                          alt={book.title}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <h3 className="font-semibold text-sm line-clamp-2 mb-1">{book.title}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{book.author}</p>
                      <div className="flex flex-wrap gap-1">
                        {book.genres.slice(0, 2).map((genre) => (
                          <Badge key={genre} variant="secondary" className="text-xs">
                            {genre}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          // Algorithmic Carousels
          <div className="space-y-8">
            {/* Back Catalog Hidden Gems */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Back Catalog Hidden Gems</h2>
                <p className="text-sm text-muted-foreground">Discover lesser-known treasures</p>
              </div>
              <div className="relative">
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {getBackCatalogHiddenGems().map((book) => (
                    <Link key={book.id} href={`/book/${book.id}`} className="flex-shrink-0">
                      <Card className="w-48 hover:shadow-lg transition-shadow cursor-pointer">
                        <CardContent className="p-4">
                          <div className="aspect-[2/3] mb-3">
                            <img
                              src={book.coverUrl}
                              alt={book.title}
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                          <h3 className="font-semibold text-sm line-clamp-2 mb-1">{book.title}</h3>
                          <p className="text-xs text-muted-foreground mb-2">{book.author}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>⭐ {book.rating}</span>
                            <span>•</span>
                            <span>{book.listeners.toLocaleString()} listeners</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            {/* Trending Now */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Trending Now</h2>
                <p className="text-sm text-muted-foreground">What everyone's listening to</p>
              </div>
              <div className="relative">
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {getTrendingNow().map((book) => (
                    <Link key={book.id} href={`/book/${book.id}`} className="flex-shrink-0">
                      <Card className="w-48 hover:shadow-lg transition-shadow cursor-pointer">
                        <CardContent className="p-4">
                          <div className="aspect-[2/3] mb-3">
                            <img
                              src={book.coverUrl}
                              alt={book.title}
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                          <h3 className="font-semibold text-sm line-clamp-2 mb-1">{book.title}</h3>
                          <p className="text-xs text-muted-foreground mb-2">{book.author}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>🔥 Trending</span>
                            <span>•</span>
                            <span>{book.listeners.toLocaleString()} listeners</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            {/* Read by Others Like Me */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Read by Others Like Me</h2>
                <p className="text-sm text-muted-foreground">Personalized recommendations</p>
              </div>
              <div className="relative">
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {getReadByOthersLikeMe().map((book) => (
                    <Link key={book.id} href={`/book/${book.id}`} className="flex-shrink-0">
                      <Card className="w-48 hover:shadow-lg transition-shadow cursor-pointer">
                        <CardContent className="p-4">
                          <div className="aspect-[2/3] mb-3">
                            <img
                              src={book.coverUrl}
                              alt={book.title}
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                          <h3 className="font-semibold text-sm line-clamp-2 mb-1">{book.title}</h3>
                          <p className="text-xs text-muted-foreground mb-2">{book.author}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>⭐ {book.rating}</span>
                            <span>•</span>
                            <span>Recommended</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            {/* All Books Grid */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">All Books</h2>
                <p className="text-sm text-muted-foreground">{books.length} titles available</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {books.map((book) => (
                  <Link key={book.id} href={`/book/${book.id}`}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="aspect-[2/3] mb-3">
                          <img
                            src={book.coverUrl}
                            alt={book.title}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <h3 className="font-semibold text-sm line-clamp-2 mb-1">{book.title}</h3>
                        <p className="text-xs text-muted-foreground mb-2">{book.author}</p>
                        <div className="flex flex-wrap gap-1">
                          {book.genres.slice(0, 2).map((genre) => (
                            <Badge key={genre} variant="secondary" className="text-xs">
                              {genre}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
} 