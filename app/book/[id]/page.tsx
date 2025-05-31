import { BookDetail } from "@/components/book-detail"
import { getBookById } from "@/lib/books"
import { notFound } from "next/navigation"
import { ReimageStory } from "@/components/reimage-story"
import { NarratorCustomizer } from "@/components/narrator-customizer"
import { Card, CardContent } from "@/components/ui/card"
import { Wand2, Mic, Sparkles, Clock, BookText, Globe, Users, Scissors, Rocket, Play } from "lucide-react"
import { BookAudioVisualizer } from "@/components/book-audio-visualizer"
import { QuickTransformations } from "@/components/quick-transformations"
import { BottomNavigation } from "@/components/bottom-navigation"
import { ConsistentHeader } from "@/components/consistent-header"

export default async function BookPage({ params }: { params: { id: string } }) {
  const awaitedParams = await params;
  const book = await getBookById(awaitedParams.id)

  if (!book) {
    return notFound()
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <ConsistentHeader />
      <div className="container mx-auto px-4 py-8 pb-32">
        {/* AI Features Hero Banner */}
        <Card className="mb-8 border-emerald-500 bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent overflow-hidden">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="w-full md:w-2/3 space-y-2">
                <div className="flex items-center mb-1">
                  <div className="relative mr-2">
                    <div className="absolute -inset-1 bg-emerald-500 rounded-full opacity-75 blur-lg animate-pulse"></div>
                    <div className="relative bg-emerald-500 text-white p-2 rounded-full">
                      <Sparkles className="h-5 w-5" />
                    </div>
                  </div>
                  <h2 className="text-xl font-bold">AI-Powered Experiences</h2>
                </div>
                <p className="text-base text-muted-foreground mb-1">
                  Instantly reimagine this book with the power of AI. Only from Bibo.
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  Try one of these popular transformations or <a href="#story-transform" className="underline text-emerald-700 hover:text-emerald-900">click here for more options</a>.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <BookDetail book={book} />

        {/* Prominent AI Features */}
        <div className="space-y-12 mt-16">
          {/* Advanced Story Transformations */}
          <section id="story-transform" className="scroll-mt-24">
            <ReimageStory book={book} />
          </section>
        </div>
      </div>

      {/* Audio Player - positioned above bottom navigation */}
      <div className="fixed bottom-16 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t p-4 z-40">
        <div className="container mx-auto max-w-5xl">
          <BookAudioVisualizer book={book} compact />
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}
