"use client"

import { useState, useEffect } from "react"
import { getAllBooks } from "@/lib/books"
import { Book } from "@/types/book"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search as SearchIcon, Filter, ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BottomNavigation } from "@/components/bottom-navigation"
import { ConsistentHeader } from "@/components/consistent-header"
import { usePlayer } from "@/lib/player/player-context"
import { useBottomPadding } from "@/hooks/use-mobile"
import Link from "next/link"

export default function BrowsePage() {
  const bottomPadding = useBottomPadding()
  const [books, setBooks] = useState<Book[]>([])
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState<string>("all")
  const { setCurrentBookAndPlay } = usePlayer()

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

  const getSmartPlaylists = () => {
    // Return collections of books instead of individual books
    return [
      {
        id: "quick-listens",
        title: "Under-2-Hour Boosters",
        description: "Quick listens to boost your daily reading",
        books: books
          .filter(book => {
            const duration = book.duration.toLowerCase()
            return duration.includes("2h") || duration.includes("1h") || duration.includes("30m")
          })
          .sort((a, b) => b.listeners - a.listeners)
          .slice(0, 6)
      },
      {
        id: "greek-classics",
        title: "Greek Classics",
        description: "Timeless wisdom from ancient Greece",
        books: books
          .filter(book => 
            ["the-iliad", "the-odyssey", "the-republic", "the-art-or-war"].includes(book.id)
          )
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 6)
      },
      {
        id: "trending-remixes",
        title: "Trending Remixes",
        description: "Popular classics with modern twists",
        books: books
          .filter(book => 
            ["moby-dick", "pride-and-prejudice", "frankenstein", "dracula"].includes(book.id)
          )
          .sort((a, b) => b.listeners - a.listeners)
          .slice(0, 6)
      }
    ]
  }

  const genres = ["all", "classics", "romance", "sci-fi", "horror", "children", "adventure", "mystery", "thriller", "non-fiction"]

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Consistent Header */}
      <ConsistentHeader />

      {/* Search and Filters */}
      <div className={`max-w-4xl mx-auto px-4 py-6 ${bottomPadding}`}>
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search books, authors, or genres..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>

          {/* Genre Filters */}
          <div className="flex flex-wrap gap-3">
            {genres.map((genre) => (
              <Button
                key={genre}
                variant={selectedGenre === genre ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedGenre(genre)}
                className={`capitalize transition-all duration-200 ${
                  selectedGenre === genre 
                    ? 'bg-emerald-600 hover:bg-emerald-700' 
                    : 'border-gray-600 text-gray-300 hover:border-emerald-500 hover:text-emerald-400'
                }`}
              >
                {genre === "all" ? "All Genres" : genre}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`max-w-4xl mx-auto px-4 pb-8 ${bottomPadding}`}>
        {searchQuery || selectedGenre !== "all" ? (
          // Search Results
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-100">
                {searchQuery ? `Search Results for "${searchQuery}"` : `${selectedGenre} Books`}
              </h2>
              <span className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-full">
                {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'}
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredBooks.map((book) => (
                <Link key={book.id} href={`/book/${book.id}`}>
                  <Card className="hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-200 cursor-pointer border-gray-700 hover:border-emerald-500/50">
                    <CardContent className="p-4">
                      <div className="aspect-[2/3] mb-3 rounded-lg overflow-hidden">
                        <img
                          src={book.coverUrl}
                          alt={book.title}
                          className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                        />
                      </div>
                      <h3 className="font-semibold text-sm line-clamp-2 mb-1 text-gray-100">{book.title}</h3>
                      <p className="text-xs text-gray-400 mb-2">{book.author}</p>
                      <div className="flex flex-wrap gap-1">
                        {book.genres.slice(0, 2).map((genre) => (
                          <Badge key={genre} variant="secondary" className="text-xs bg-gray-800 text-gray-300 border-gray-600">
                            {genre}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            
            {filteredBooks.length === 0 && (
              <div className="text-center py-16">
                <SearchIcon className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-300 mb-2">No books found</h3>
                <p className="text-gray-500">
                  {searchQuery 
                    ? `Try adjusting your search terms or browse our collections below.`
                    : `Try selecting a different genre or browse our collections below.`
                  }
                </p>
              </div>
            )}
          </div>
        ) : (
          // Algorithmic Carousels
          <div className="space-y-12">
            {/* Back Catalog Hidden Gems */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-100 mb-1">Back Catalog Hidden Gems</h2>
                  <p className="text-sm text-gray-400">Discover lesser-known treasures</p>
                </div>
              </div>
              <div className="relative">
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {getBackCatalogHiddenGems().map((book) => (
                    <Link key={book.id} href={`/book/${book.id}`} className="flex-shrink-0">
                      <Card className="w-48 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-200 cursor-pointer border-gray-700 hover:border-emerald-500/50">
                        <CardContent className="p-4">
                          <div className="aspect-[2/3] mb-3 rounded-lg overflow-hidden">
                            <img
                              src={book.coverUrl}
                              alt={book.title}
                              className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                            />
                          </div>
                          <h3 className="font-semibold text-sm line-clamp-2 mb-1 text-gray-100">{book.title}</h3>
                          <p className="text-xs text-gray-400 mb-2">{book.author}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <span className="text-yellow-400">⭐ {book.rating}</span>
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
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-100 mb-1">Trending Now</h2>
                  <p className="text-sm text-gray-400">What everyone's listening to</p>
                </div>
              </div>
              <div className="relative">
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {getTrendingNow().map((book) => (
                    <Link key={book.id} href={`/book/${book.id}`} className="flex-shrink-0">
                      <Card className="w-48 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-200 cursor-pointer border-gray-700 hover:border-emerald-500/50">
                        <CardContent className="p-4">
                          <div className="aspect-[2/3] mb-3 rounded-lg overflow-hidden">
                            <img
                              src={book.coverUrl}
                              alt={book.title}
                              className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                            />
                          </div>
                          <h3 className="font-semibold text-sm line-clamp-2 mb-1 text-gray-100">{book.title}</h3>
                          <p className="text-xs text-gray-400 mb-2">{book.author}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <span className="text-orange-400">🔥 Trending</span>
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
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-100 mb-1">Read by Others Like Me</h2>
                  <p className="text-sm text-gray-400">Personalized recommendations</p>
                </div>
              </div>
              <div className="relative">
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {getReadByOthersLikeMe().map((book) => (
                    <Link key={book.id} href={`/book/${book.id}`} className="flex-shrink-0">
                      <Card className="w-48 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-200 cursor-pointer border-gray-700 hover:border-emerald-500/50">
                        <CardContent className="p-4">
                          <div className="aspect-[2/3] mb-3 rounded-lg overflow-hidden">
                            <img
                              src={book.coverUrl}
                              alt={book.title}
                              className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                            />
                          </div>
                          <h3 className="font-semibold text-sm line-clamp-2 mb-1 text-gray-100">{book.title}</h3>
                          <p className="text-xs text-gray-400 mb-2">{book.author}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <span className="text-yellow-400">⭐ {book.rating}</span>
                            <span>•</span>
                            <span className="text-emerald-400">Recommended</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            {/* Smart Playlists */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-900/20 rounded-lg">
                    <Sparkles className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-100 mb-1">Smart Playlists</h2>
                    <p className="text-sm text-gray-400">Curated collections for every mood</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                  {getSmartPlaylists().map((collection) => (
                    <div key={collection.id} className="flex-shrink-0 w-full max-w-sm">
                      <Card className="w-full h-full flex flex-col border-gray-700 hover:border-purple-500/50 transition-all duration-200">
                        <CardContent className="flex-1 p-6">
                          <h3 className="font-semibold text-lg mb-2 text-gray-100">{collection.title}</h3>
                          <p className="text-sm text-gray-400 mb-4">{collection.description}</p>
                          <div className="grid grid-cols-2 gap-3">
                            {collection.books.map((book) => (
                              <Link key={book.id} href={`/book/${book.id}`} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800/50 transition-colors">
                                <img
                                  src={book.coverUrl}
                                  alt={book.title}
                                  className="w-12 h-16 object-cover rounded"
                                />
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-sm line-clamp-1 text-gray-100">{book.title}</h4>
                                  <p className="text-xs text-gray-400">{book.author}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* All Books Grid */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-100 mb-1">All Books</h2>
                  <p className="text-sm text-gray-400">{books.length} titles available</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {books.map((book) => (
                  <Link key={book.id} href={`/book/${book.id}`}>
                    <Card className="hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-200 cursor-pointer border-gray-700 hover:border-emerald-500/50">
                      <CardContent className="p-4">
                        <div className="aspect-[2/3] mb-3 rounded-lg overflow-hidden">
                          <img
                            src={book.coverUrl}
                            alt={book.title}
                            className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                          />
                        </div>
                        <h3 className="font-semibold text-sm line-clamp-2 mb-1 text-gray-100">{book.title}</h3>
                        <p className="text-xs text-gray-400 mb-2">{book.author}</p>
                        <div className="flex flex-wrap gap-1">
                          {book.genres.slice(0, 2).map((genre) => (
                            <Badge key={genre} variant="secondary" className="text-xs bg-gray-800 text-gray-300 border-gray-600">
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