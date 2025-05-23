import { LibraryGrid } from "@/components/library-grid"
import { GenreChannels } from "@/components/genre-channels"
import { SearchBar } from "@/components/search-bar"
import { Sparkles, Headphones } from "lucide-react"
import { FeaturedAudiobook } from "@/components/featured-audiobook"
import { PopularListens } from "@/components/popular-listens"

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <div className="flex items-center">
          <h1 className="text-4xl font-outfit font-bold tracking-tight">
            Bibo <span className="text-emerald-500">Audiobooks</span>
          </h1>
          <div className="ml-2 bg-emerald-500/10 p-1 rounded-full">
            <Headphones className="h-5 w-5 text-emerald-500" />
          </div>
        </div>
        <p className="text-muted-foreground font-nunito">
          Free AI-powered audiobooks with modern narration and personalized experience
        </p>
      </div>

      {/* Featured Audiobook with Player */}
      <div className="mb-10">
        <FeaturedAudiobook />
      </div>

      <div className="mb-6">
        <SearchBar />
      </div>

      {/* Netflix-style Channels/Genres */}
      <GenreChannels />

      {/* Popular Listens Section */}
      <div className="mb-10">
        <PopularListens />
      </div>

      <h2 className="text-2xl font-outfit font-bold mb-6 flex items-center">
        <Sparkles className="h-5 w-5 text-emerald-500 mr-2" />
        Browse Library
      </h2>
      <LibraryGrid />
    </main>
  )
}
