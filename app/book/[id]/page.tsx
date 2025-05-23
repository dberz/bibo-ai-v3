import { BookDetail } from "@/components/book-detail"
import { RewriteSelector } from "@/components/rewrite-selector"
import { PlayButton } from "@/components/play-button"
import { getBookById } from "@/lib/books"
import { notFound } from "next/navigation"
import { AudioPreview } from "@/components/audio-preview"

export default async function BookPage({ params }: { params: { id: string } }) {
  const book = await getBookById(params.id)

  if (!book) {
    return notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {book.title} (by {book.author})
      </h1>
      <p className="text-muted-foreground mb-8">
        {book.description}
      </p>
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
