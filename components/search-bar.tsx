"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search, X, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SearchBar() {
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  const handleClear = () => {
    setQuery("")
  }

  return (
    <div className={`relative transition-all duration-300 ${isFocused ? "ring-2 ring-emerald-500 rounded-md" : ""}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="text"
        placeholder="Search audiobooks, authors, or narrators..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="pl-10 pr-10 border-emerald-500/20 focus-visible:ring-emerald-500/30 font-nunito"
      />
      {query ? (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground"
          onClick={handleClear}
        >
          <X className="h-4 w-4" />
        </Button>
      ) : (
        <Headphones className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      )}
    </div>
  )
}
