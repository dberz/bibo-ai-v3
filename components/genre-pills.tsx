"use client"

import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { useGenre } from "./genre-provider"

const genres = [
  "All",
  "Classics",
  "Fiction",
  "Mystery",
  "Romance",
  "Adventure",
  "Biography",
  "History",
  "Fantasy",
  "Horror",
  "Children",
  "Poetry",
  "Philosophy",
  "Gothic",
  "Military",
  "Spirituality",
]

export function GenrePills() {
  const { selectedGenre, setSelectedGenre } = useGenre()

  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((genre) => (
        <div key={genre} className="relative">
          <Badge
            variant={selectedGenre === genre ? "default" : "outline"}
            className={`cursor-pointer transition-all duration-300 font-nunito ${
              selectedGenre === genre
                ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                : "hover:bg-emerald-500/10 hover:text-emerald-500 hover:border-emerald-500/30"
            }`}
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </Badge>
          {selectedGenre === genre && (
            <motion.div
              layoutId="activeGenre"
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-500 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </div>
      ))}
    </div>
  )
}
