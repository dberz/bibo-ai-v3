"use client"

import { createContext, useState, useContext, type ReactNode } from "react"

type GenreContextType = {
  selectedGenre: string
  setSelectedGenre: (genre: string) => void
}

const GenreContext = createContext<GenreContextType | undefined>(undefined)

export function GenreProvider({ children }: { children: ReactNode }) {
  const [selectedGenre, setSelectedGenre] = useState("All")

  return <GenreContext.Provider value={{ selectedGenre, setSelectedGenre }}>{children}</GenreContext.Provider>
}

export function useGenre() {
  const context = useContext(GenreContext)
  if (context === undefined) {
    throw new Error("useGenre must be used within a GenreProvider")
  }
  return context
}
