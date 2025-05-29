import { LibraryGrid } from "@/components/library-grid"
import { GenreChannels } from "@/components/genre-channels"
import { SearchBar } from "@/components/search-bar"
import { Sparkles, Headphones } from "lucide-react"
import { FeaturedAudiobook } from "@/components/featured-audiobook"
import { PopularListens } from "@/components/popular-listens"

export default function HomePage() {
  return (
    <main className="container mx-auto px-2 sm:px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        {/* Left: Featured Audiobook, 1/3 width */}
        <div className="md:col-span-1">
          <FeaturedAudiobook />
        </div>
        {/* Right: Browsing content, 2/3 width */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <SearchBar />
          <PopularListens />
          <GenreChannels />
          <h2 className="text-2xl font-outfit font-bold mb-6 flex items-center">
            <Sparkles className="h-5 w-5 text-emerald-500 mr-2" />
            Browse Library
          </h2>
          <LibraryGrid />
        </div>
      </div>
    </main>
  )
}
