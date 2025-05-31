import { getSocialFeedBooks } from '@/lib/books'
import BookCard from '@/components/BookCard'
import { Search, Bell, User } from 'lucide-react'

export default function Home() {
  const books = getSocialFeedBooks()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Bibo</h1>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Search size={20} />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Bell size={20} />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <User size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Feed */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Feed Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Discover Great Books</h2>
          <p className="text-gray-600">Find your next favorite read from our community</p>
        </div>

        {/* Book Feed */}
        <div className="space-y-6">
          {books.map((book, index) => (
            <BookCard 
              key={book.id} 
              book={book} 
              isTopBook={index === 0} // Moby Dick gets featured badge
            />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
            Load More Books
          </button>
        </div>
      </main>
    </div>
  )
} 