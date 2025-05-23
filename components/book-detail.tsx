import type { Book } from "@/types/book"
import { Badge } from "@/components/ui/badge"
import { Clock, BookOpen } from "lucide-react"
import { VersionSelector } from "@/components/version-selector"

interface BookDetailProps {
  book: Book
}

export function BookDetail({ book }: BookDetailProps) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3 lg:w-1/4">
          <div className="relative group">
            <img
              src={book.coverUrl || "/placeholder.svg"}
              alt={book.title}
              className="w-full h-auto rounded-lg shadow-xl transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
          </div>
        </div>

        <div className="w-full md:w-2/3 lg:w-3/4 space-y-6">
          <div>
            <h1 className="text-4xl font-heading font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              {book.title}
            </h1>
            <p className="text-xl text-muted-foreground mt-2 font-body">{book.author}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {book.genres.map((genre) => (
              <Badge
                key={genre}
                variant="secondary"
                className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 font-body"
              >
                {genre}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-6 text-muted-foreground font-body">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-emerald-500" />
              <span>{book.duration}</span>
            </div>

            <div className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-emerald-500" />
              <span>{book.chapters.length} chapters</span>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg leading-relaxed font-body">{book.description}</p>
          </div>
        </div>
      </div>

      {/* Version Selector */}
      <VersionSelector />
    </div>
  )
}
