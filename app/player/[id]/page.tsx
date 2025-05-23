import { AudioPlayer } from "@/components/audio-player"
import { VoiceSelector } from "@/components/voice-selector"
import { AdBanner } from "@/components/ad-banner"
import { getBookById } from "@/lib/books"
import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, Wand2, Mic, Sparkles, Settings2 } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function PlayerPage({ params }: { params: { id: string } }) {
  const book = getBookById(params.id)

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

      {/* AI Features Banner */}
      <div className="mb-6 bg-gradient-to-r from-emerald-500/20 via-emerald-500/10 to-transparent p-4 rounded-lg border border-emerald-500/30">
        <div className="flex items-center">
          <div className="bg-emerald-500/20 p-2 rounded-full mr-3">
            <Sparkles className="h-5 w-5 text-emerald-500" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold">AI Enhancements Active</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 flex items-center">
                <Wand2 className="h-3 w-3 mr-1" />
                Original Version
              </Badge>
              <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 flex items-center">
                <Mic className="h-3 w-3 mr-1" />
                Emily Bright (Default)
              </Badge>
            </div>
          </div>
          <Link href={`/book/${book.id}`}>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Settings2 className="h-3 w-3" />
              Customize
            </Button>
          </Link>
        </div>
      </div>

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
