import { BookDetail } from "@/components/book-detail"
import { getBookById } from "@/lib/books"
import { notFound } from "next/navigation"
import { ReimageStory } from "@/components/reimage-story"
import { NarratorCustomizer } from "@/components/narrator-customizer"
import { Card, CardContent } from "@/components/ui/card"
import { Wand2, Mic, Sparkles, Clock, BookText, Globe, Users } from "lucide-react"
import { BookAudioVisualizer } from "@/components/book-audio-visualizer"

export default async function BookPage({ params }: { params: { id: string } }) {
  const book = await getBookById(params.id)

  if (!book) {
    return notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 pb-32">
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
                <a href="#story-transform-length" className="flex items-center bg-emerald-500/20 px-3 py-1.5 rounded-full hover:bg-emerald-500/30 transition-colors">
                  <Clock className="h-4 w-4 text-emerald-500 mr-1.5" />
                  <span className="text-sm font-medium">Length</span>
                </a>
                <a href="#story-transform-genre" className="flex items-center bg-emerald-500/20 px-3 py-1.5 rounded-full hover:bg-emerald-500/30 transition-colors">
                  <BookText className="h-4 w-4 text-emerald-500 mr-1.5" />
                  <span className="text-sm font-medium">Genre</span>
                </a>
                <a href="#story-transform-time" className="flex items-center bg-emerald-500/20 px-3 py-1.5 rounded-full hover:bg-emerald-500/30 transition-colors">
                  <Globe className="h-4 w-4 text-emerald-500 mr-1.5" />
                  <span className="text-sm font-medium">Time Period</span>
                </a>
                <a href="#story-transform-perspective" className="flex items-center bg-emerald-500/20 px-3 py-1.5 rounded-full hover:bg-emerald-500/30 transition-colors">
                  <Users className="h-4 w-4 text-emerald-500 mr-1.5" />
                  <span className="text-sm font-medium">Perspective</span>
                </a>
                <a href="#story-transform-custom" className="flex items-center bg-emerald-500/20 px-3 py-1.5 rounded-full hover:bg-emerald-500/30 transition-colors">
                  <Wand2 className="h-4 w-4 text-emerald-500 mr-1.5" />
                  <span className="text-sm font-medium">Custom</span>
                </a>
                <a href="#narrator" className="flex items-center bg-emerald-500/20 px-3 py-1.5 rounded-full hover:bg-emerald-500/30 transition-colors">
                  <Mic className="h-4 w-4 text-emerald-500 mr-1.5" />
                  <span className="text-sm font-medium">Custom Narrator</span>
                </a>
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

      {/* Prominent AI Features */}
      <div className="space-y-12 mt-16">
        {/* Reimage Story Section */}
        <section id="story-transform" className="scroll-mt-24">
          <div className="flex items-center mb-6">
            <div className="bg-emerald-500/10 p-2 rounded-full mr-3">
              <Wand2 className="h-6 w-6 text-emerald-500" />
            </div>
            <h2 className="text-3xl font-bold">Reimagine This Story</h2>
          </div>
          <ReimageStory book={book} />
        </section>

        {/* Narrator Customization Section */}
        <section id="narrator" className="scroll-mt-24">
          <div className="flex items-center mb-6">
            <div className="bg-emerald-500/10 p-2 rounded-full mr-3">
              <Mic className="h-6 w-6 text-emerald-500" />
            </div>
            <h2 className="text-3xl font-bold">Customize Your Narrator</h2>
          </div>
          <NarratorCustomizer bookId={book.id} />
        </section>
      </div>

      {/* Sticky Player */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t p-4 z-50">
        <div className="container mx-auto max-w-5xl">
          <BookAudioVisualizer book={book} compact />
        </div>
      </div>
    </div>
  )
}
