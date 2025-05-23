import { BookDetail } from "@/components/book-detail"
import { PlayButton } from "@/components/play-button"
import { getBookById } from "@/lib/books"
import { notFound } from "next/navigation"
import { AudioPreview } from "@/components/audio-preview"
import { ReimageStory } from "@/components/reimage-story"
import { NarratorCustomizer } from "@/components/narrator-customizer"
import { Card, CardContent } from "@/components/ui/card"
import { Wand2, Mic, Sparkles } from "lucide-react"

export default function BookPage({ params }: { params: { id: string } }) {
  const book = getBookById(params.id)

  if (!book) {
    return notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* AI Features Hero Banner */}
      <Card className="mb-10 border-emerald-500 bg-gradient-to-r from-emerald-500/20 via-emerald-500/10 to-transparent overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-2/3 space-y-4">
              <div className="flex items-center">
                <Sparkles className="h-6 w-6 text-emerald-500 mr-2" />
                <h2 className="text-2xl font-bold">AI-Powered Experience</h2>
              </div>
              <p className="text-lg">
                Transform this classic with AI to reimagine the story or customize your narrator. Only on Bibo.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <div className="flex items-center bg-emerald-500/20 px-3 py-1.5 rounded-full">
                  <Wand2 className="h-4 w-4 text-emerald-500 mr-1.5" />
                  <span className="text-sm font-medium">Reimagine Story</span>
                </div>
                <div className="flex items-center bg-emerald-500/20 px-3 py-1.5 rounded-full">
                  <Mic className="h-4 w-4 text-emerald-500 mr-1.5" />
                  <span className="text-sm font-medium">Custom Narrator</span>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-1 bg-emerald-500 rounded-full opacity-75 blur-lg animate-pulse"></div>
                <div className="relative bg-emerald-500 text-white p-4 rounded-full">
                  <Sparkles className="h-12 w-12" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <BookDetail book={book} />

      {/* Audio Preview Player */}
      <div className="mt-8 mb-12">
        <AudioPreview bookId={book.id} />
      </div>

      {/* Prominent AI Features */}
      <div className="space-y-12">
        {/* Reimage Story Section */}
        <section>
          <div className="flex items-center mb-6">
            <div className="bg-emerald-500/10 p-2 rounded-full mr-3">
              <Wand2 className="h-6 w-6 text-emerald-500" />
            </div>
            <h2 className="text-3xl font-bold">Reimagine This Story</h2>
          </div>
          <ReimageStory book={book} />
        </section>

        {/* Narrator Customization Section */}
        <section>
          <div className="flex items-center mb-6">
            <div className="bg-emerald-500/10 p-2 rounded-full mr-3">
              <Mic className="h-6 w-6 text-emerald-500" />
            </div>
            <h2 className="text-3xl font-bold">Customize Your Narrator</h2>
          </div>
          <NarratorCustomizer bookId={book.id} />
        </section>
      </div>

      <div className="mt-12 flex justify-center">
        <PlayButton bookId={book.id} large />
      </div>
    </div>
  )
}
