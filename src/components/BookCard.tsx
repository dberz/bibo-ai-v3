'use client'

import Image from 'next/image'
import { Heart, MessageCircle, Users, Play } from 'lucide-react'
import { Book } from '@/types/book'

interface BookCardProps {
  book: Book
  isTopBook?: boolean
}

export default function BookCard({ book, isTopBook = false }: BookCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6 overflow-hidden">
      {/* Book Cover and Info */}
      <div className="relative">
        <div className="aspect-[3/4] relative overflow-hidden">
          <Image
            src={book.coverUrl}
            alt={book.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {isTopBook && (
            <div className="absolute top-3 left-3 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Featured
            </div>
          )}
          <div className="absolute bottom-3 right-3 bg-black/70 text-white p-2 rounded-full">
            <Play size={16} />
          </div>
        </div>
      </div>

      {/* Book Details */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900 mb-1">{book.title}</h3>
            <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
          </div>
          <div className="flex items-center text-yellow-400 text-sm">
            ★ {book.rating}
          </div>
        </div>

        <p className="text-gray-700 text-sm mb-3 line-clamp-2">{book.description}</p>

        {/* Genres */}
        <div className="flex flex-wrap gap-1 mb-3">
          {book.genres.slice(0, 2).map((genre) => (
            <span
              key={genre}
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
            >
              {genre}
            </span>
          ))}
        </div>

        {/* Social Stats */}
        <div className="flex items-center justify-between text-gray-500 text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Users size={14} />
              <span>{book.peopleReading.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle size={14} />
              <span>{book.comments.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart size={14} />
              <span>{book.loves.toLocaleString()}</span>
            </div>
          </div>
          <div className="text-xs text-gray-400">
            {book.duration} • {book.pages} pages
          </div>
        </div>
      </div>
    </div>
  )
} 