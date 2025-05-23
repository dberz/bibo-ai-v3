import { BookDetail } from "@/components/book-detail"
import { RewriteSelector } from "@/components/rewrite-selector"
import { PlayButton } from "@/components/play-button"
import { getBookById } from "@/lib/books"
import { notFound } from "next/navigation"
import { AudioPreview } from "@/components/audio-preview"

export default function BookPage({ params }: { params: { id: string } }) {
  const book = getBookById(params.id)

  if (!book) {
    return notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BookDetail book={book} />

      {/* Audio Preview Player */}
      <div className="mt-8">
        <AudioPreview bookId={book.id} />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-inter font-semibold mb-4">Choose a Version</h2>
        <RewriteSelector bookId={book.id} />
      </div>

      <div className="mt-8 flex justify-center">
        <PlayButton bookId={book.id} large />
      </div>
    </div>
  )
}
