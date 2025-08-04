"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react"

interface FilterOption {
  id: string
  label: string
  count?: number
}

interface AdvancedFiltersProps {
  onFiltersChange: (filters: any) => void
}

export function AdvancedFilters({ onFiltersChange }: AdvancedFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState({
    genres: [] as string[],
    length: [] as string[],
    narratorStyle: [] as string[],
    language: [] as string[],
    mood: [] as string[],
    popularity: [] as string[],
    durationRange: [0, 1000] as [number, number]
  })

  const filterOptions = {
    genres: [
      { id: "classics", label: "Classics", count: 45 },
      { id: "sci-fi", label: "Science Fiction", count: 32 },
      { id: "fantasy", label: "Fantasy", count: 28 },
      { id: "mystery", label: "Mystery & Thriller", count: 41 },
      { id: "romance", label: "Romance", count: 23 },
      { id: "philosophy", label: "Philosophy", count: 18 },
      { id: "history", label: "History", count: 35 },
      { id: "biography", label: "Biography", count: 29 }
    ],
    length: [
      { id: "short", label: "Under 2 Hours", count: 12 },
      { id: "medium", label: "2-8 Hours", count: 67 },
      { id: "long", label: "8-15 Hours", count: 89 },
      { id: "epic", label: "15+ Hours", count: 34 }
    ],
    narratorStyle: [
      { id: "deep-voice", label: "Deep Baritone", count: 23 },
      { id: "british", label: "British Accent", count: 31 },
      { id: "female", label: "Female Narrator", count: 45 },
      { id: "dramatic", label: "Dramatic Reading", count: 28 },
      { id: "calm", label: "Calm & Soothing", count: 19 }
    ],
    language: [
      { id: "english", label: "English", count: 156 },
      { id: "spanish", label: "Spanish", count: 23 },
      { id: "french", label: "French", count: 18 },
      { id: "german", label: "German", count: 14 }
    ],
    mood: [
      { id: "inspiring", label: "Inspiring", count: 34 },
      { id: "relaxing", label: "Relaxing", count: 28 },
      { id: "thrilling", label: "Thrilling", count: 41 },
      { id: "thoughtful", label: "Thoughtful", count: 23 },
      { id: "romantic", label: "Romantic", count: 19 }
    ],
    popularity: [
      { id: "trending", label: "Trending Now", count: 15 },
      { id: "popular", label: "Popular", count: 67 },
      { id: "hidden-gem", label: "Hidden Gems", count: 23 },
      { id: "new", label: "New Releases", count: 12 }
    ]
  }

  const handleFilterChange = (category: string, value: string, checked: boolean) => {
    const newFilters = { ...selectedFilters }
    
    if (checked) {
      newFilters[category as keyof typeof selectedFilters] = [
        ...(newFilters[category as keyof typeof selectedFilters] as string[]),
        value
      ]
    } else {
      newFilters[category as keyof typeof selectedFilters] = (
        newFilters[category as keyof typeof selectedFilters] as string[]
      ).filter(item => item !== value)
    }
    
    setSelectedFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearAllFilters = () => {
    const clearedFilters = {
      genres: [],
      length: [],
      narratorStyle: [],
      language: [],
      mood: [],
      popularity: [],
      durationRange: [0, 1000]
    }
    setSelectedFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const getActiveFilterCount = () => {
    return Object.values(selectedFilters).reduce((total, filters) => {
      return total + (Array.isArray(filters) ? filters.length : 0)
    }, 0)
  }

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <CardTitle className="text-sm">Advanced Filters</CardTitle>
            {getActiveFilterCount() > 0 && (
              <Badge variant="secondary" className="text-xs">
                {getActiveFilterCount()} active
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {getActiveFilterCount() > 0 && (
              <Button
                size="sm"
                variant="ghost"
                onClick={clearAllFilters}
                className="text-xs h-6 px-2"
              >
                <X className="h-3 w-3 mr-1" />
                Clear
              </Button>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs h-6 px-2"
            >
              {isExpanded ? (
                <ChevronUp className="h-3 w-3" />
              ) : (
                <ChevronDown className="h-3 w-3" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Genres */}
                <div>
                  <h4 className="font-medium text-sm mb-3">Genres</h4>
                  <div className="space-y-2">
                    {filterOptions.genres.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={option.id}
                          checked={selectedFilters.genres.includes(option.id)}
                          onCheckedChange={(checked) => 
                            handleFilterChange("genres", option.id, checked as boolean)
                          }
                        />
                        <label htmlFor={option.id} className="text-sm text-gray-300 flex-1">
                          {option.label}
                        </label>
                        <span className="text-xs text-gray-500">({option.count})</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Length */}
                <div>
                  <h4 className="font-medium text-sm mb-3">Length</h4>
                  <div className="space-y-2">
                    {filterOptions.length.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={option.id}
                          checked={selectedFilters.length.includes(option.id)}
                          onCheckedChange={(checked) => 
                            handleFilterChange("length", option.id, checked as boolean)
                          }
                        />
                        <label htmlFor={option.id} className="text-sm text-gray-300 flex-1">
                          {option.label}
                        </label>
                        <span className="text-xs text-gray-500">({option.count})</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Narrator Style */}
                <div>
                  <h4 className="font-medium text-sm mb-3">Narrator Style</h4>
                  <div className="space-y-2">
                    {filterOptions.narratorStyle.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={option.id}
                          checked={selectedFilters.narratorStyle.includes(option.id)}
                          onCheckedChange={(checked) => 
                            handleFilterChange("narratorStyle", option.id, checked as boolean)
                          }
                        />
                        <label htmlFor={option.id} className="text-sm text-gray-300 flex-1">
                          {option.label}
                        </label>
                        <span className="text-xs text-gray-500">({option.count})</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Language */}
                <div>
                  <h4 className="font-medium text-sm mb-3">Language</h4>
                  <div className="space-y-2">
                    {filterOptions.language.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={option.id}
                          checked={selectedFilters.language.includes(option.id)}
                          onCheckedChange={(checked) => 
                            handleFilterChange("language", option.id, checked as boolean)
                          }
                        />
                        <label htmlFor={option.id} className="text-sm text-gray-300 flex-1">
                          {option.label}
                        </label>
                        <span className="text-xs text-gray-500">({option.count})</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mood */}
                <div>
                  <h4 className="font-medium text-sm mb-3">Mood</h4>
                  <div className="space-y-2">
                    {filterOptions.mood.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={option.id}
                          checked={selectedFilters.mood.includes(option.id)}
                          onCheckedChange={(checked) => 
                            handleFilterChange("mood", option.id, checked as boolean)
                          }
                        />
                        <label htmlFor={option.id} className="text-sm text-gray-300 flex-1">
                          {option.label}
                        </label>
                        <span className="text-xs text-gray-500">({option.count})</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Popularity */}
                <div>
                  <h4 className="font-medium text-sm mb-3">Popularity</h4>
                  <div className="space-y-2">
                    {filterOptions.popularity.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={option.id}
                          checked={selectedFilters.popularity.includes(option.id)}
                          onCheckedChange={(checked) => 
                            handleFilterChange("popularity", option.id, checked as boolean)
                          }
                        />
                        <label htmlFor={option.id} className="text-sm text-gray-300 flex-1">
                          {option.label}
                        </label>
                        <span className="text-xs text-gray-500">({option.count})</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
} 