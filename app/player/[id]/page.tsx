import { AudioPlayer } from "@/components/audio-player"
import { VoiceSelector } from "@/components/voice-selector"
import { AdBanner } from "@/components/ad-banner"
import { getBookById } from "@/lib/books"
import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function PlayerPage({ params }: { params: { id: string } }) {
  const id = params.id
  const book = getBookById(id)

  if (!book) {
    return notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Link
        href={`/book/${book.id}`}
        className="inline-flex items-center text-sm text-muted-foreground hover:text-emerald-500 mb-6 transition-colors"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to book details
      </Link>

      <Card className="border-emerald-500/20 shadow-xl overflow-hidden">
        <div className="bg-gradient-to-b from-emerald-500/20 to-transparent p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              <img
                src={book.coverUrl || "/placeholder.svg"}
                alt={book.title}
                className="w-full h-auto rounded-md shadow-md"
              />
            </div>

            <div className="w-full md:w-2/3 space-y-4">
              <h1 className="text-3xl font-bold">{book.title}</h1>
              <p className="text-muted-foreground">{book.author}</p>

              <div className="mt-4">
                <AudioPlayer bookId={book.id} />
              </div>
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="mt-8">
            <VoiceSelector />
          </div>

          <div className="mt-8">
            <AdBanner />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
