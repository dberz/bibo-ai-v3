"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, Scissors, Rocket, Globe, Sparkles, Wand2, ChevronDown, ChevronUp, Clock, User, BookOpen, Zap } from "lucide-react"
import { usePlayer } from "@/lib/player/player-context"
import type { AudioVersionId } from "@/lib/player/player-context"
import type { Book } from "@/types/book"
import { useState, useEffect, useRef } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { getAllVoices } from "@/lib/voices"
import { setBookVoice } from "@/lib/voice-storage"
import { useToast } from "@/hooks/use-toast"

interface AiExperiencesSimplifiedProps {
  book: Book
}

export function AiExperiencesSimplified({ book }: AiExperiencesSimplifiedProps) {
  const { setVersion, setCurrentBook, play, pause, isPlaying, currentVersion, currentBook } = usePlayer()
  const [pending, setPending] = useState<{ version: AudioVersionId | null; bookId: string | null }>({ version: null, bookId: null })
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [activeTab, setActiveTab] = useState("length")
  const { toast } = useToast()
  const sectionRef = useRef<HTMLDivElement>(null)

  // Voice settings
  const voices = getAllVoices() || []
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null)
  const [voiceCustomization, setVoiceCustomization] = useState({
    age: "middle-aged",
    style: "formal",
    gender: "neutral",
    accent: "neutral",
    pace: 50,
    pitch: 50,
    clarity: 70,
    emotionality: 50,
  })

  // Story length settings
  const [lengthFactor, setLengthFactor] = useState(100)
  const [simplifyLanguage, setSimplifyLanguage] = useState(false)

  // Convert percentage to time labels
  const getLengthLabel = (percentage: number) => {
    // Convert percentage to minutes (15-120 range)
    const minutes = Math.round((percentage / 100) * 105) + 15 // 15 to 120 minutes
    // Round to nearest 15 minutes
    const roundedMinutes = Math.round(minutes / 15) * 15
    const hours = Math.floor(roundedMinutes / 60)
    const remainingMinutes = roundedMinutes % 60
    
    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`
    }
    return `${remainingMinutes}m`
  }

  // Genre settings
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)
  const [genreIntensity, setGenreIntensity] = useState(50)

  // Custom settings
  const [customPrompt, setCustomPrompt] = useState("")

  // Available genres for transformation
  const genres = [
    { id: "fantasy", name: "Fantasy", description: "Magical world with fantastical elements" },
    { id: "mystery", name: "Mystery", description: "Add suspense and intrigue" },
    { id: "romance", name: "Romance", description: "Focus on relationships" },
    { id: "historical", name: "Historical", description: "Different time period" },
    { id: "adventure", name: "Adventure", description: "Action and exploration" },
  ]

  // Handle hash-based navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash.startsWith('#story-transform-')) {
        const tab = hash.replace('#story-transform-', '')
        setActiveTab(tab)
        setShowAdvanced(true)
        
        // Scroll to the AI transformations section
        setTimeout(() => {
          sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      } else if (hash === '#story-transform') {
        setShowAdvanced(true)
        setTimeout(() => {
          sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }

    // Handle initial load
    handleHashChange()

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    if (
      pending.version &&
      pending.bookId &&
      currentVersion === pending.version &&
      currentBook?.id === pending.bookId
    ) {
      play()
      setPending({ version: null, bookId: null })
    }
  }, [currentVersion, currentBook, pending, play])

  // Popular transformations (removed Advanced Story transformation)
  const popularTransformations = [
    {
      id: "CLASSIC" as AudioVersionId,
      label: "Classic Version",
      description: "Original classic deep baritone narration",
      icon: <BookOpen className="h-4 w-4" />,
      tab: "classic",
    },
    {
      id: "SHORTENED" as AudioVersionId,
      label: "Shortened Version",
      description: "Condensed version focusing on key plot points",
      icon: <Scissors className="h-4 w-4" />,
      tab: "length",
    },
    {
      id: "YA" as AudioVersionId,
      label: "Modern YA Adventure",
      description: "Modern YA adventure rewrite for contemporary audiences",
      icon: <Wand2 className="h-4 w-4" />,
      tab: "time",
    },
    {
      id: "SCIFI" as AudioVersionId,
      label: "Sci-Fi Reimagination",
      description: "Sci-Fi genre reimagination of the classic story",
      icon: <Zap className="h-4 w-4" />,
      tab: "genre",
    },
    {
      id: "SPANISH" as AudioVersionId,
      label: "Spanish Translation",
      description: "Spanish literary translation of the story",
      icon: <Globe className="h-4 w-4" />,
      tab: "language",
    },
  ]

  const handleTransformation = (versionId: AudioVersionId) => {
    pause()
    setVersion(versionId)
    setCurrentBook(book)
    setPending({ version: versionId, bookId: book.id })
  }

  return (
    <Card className="border-purple-500/20" ref={sectionRef}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-lg font-semibold">
          <Wand2 className="h-5 w-5 text-purple-500" />
          <span>AI Transformations</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Simplified Popular Transformations - now matching modal exactly */}
          <div className="flex flex-wrap gap-2">
            {popularTransformations.map((transformation) => {
              const isActive = isPlaying && currentVersion === transformation.id && currentBook?.id === book.id
              return (
                <Button
                  key={transformation.id}
                  size="sm"
                  variant={isActive ? "default" : "outline"}
                  className={`${
                    isActive 
                      ? 'bg-purple-500 hover:bg-purple-600 text-white' 
                      : 'border-gray-600 text-gray-300 hover:border-purple-500/50 hover:text-purple-400'
                  }`}
                  onClick={() => handleTransformation(transformation.id)}
                >
                  {transformation.icon}
                  <span className="ml-2 text-xs">{transformation.label}</span>
                </Button>
              )
            })}
          </div>
          
          {/* Advanced Options Accordion */}
          <div className="pt-4 border-t border-gray-700">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-sm text-purple-400 hover:text-purple-300 p-2 h-auto w-full justify-between"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <span className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4" />
                <span>Advanced Story Transformation</span>
              </span>
              {showAdvanced ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>

      {/* Simplified Advanced Options */}
      {showAdvanced && (
        <CardContent className="pt-0 border-t border-gray-700">
          <div className="space-y-8">
            {/* Header */}
            <div className="pb-6 border-b border-gray-700 mt-4">
              <h3 className="text-xl font-semibold text-white mb-3">Advanced Story Transformation</h3>
              <p className="text-sm text-gray-400">Customize your listening experience with detailed AI controls</p>
            </div>

            {/* Length Settings */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-white">Story Length</Label>
                <span className="text-sm text-emerald-400 font-medium">{getLengthLabel(lengthFactor)}</span>
              </div>
              <Slider
                value={[lengthFactor]}
                onValueChange={(value) => setLengthFactor(value[0])}
                max={120}
                min={15}
                step={15}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>15m</span>
                <span>30m</span>
                <span>45m</span>
                <span>1h</span>
                <span>1.5h</span>
                <span>2h</span>
              </div>
              <div className="flex items-center space-x-2 pt-3">
                <Switch
                  id="simplify-language"
                  checked={simplifyLanguage}
                  onCheckedChange={setSimplifyLanguage}
                />
                <Label htmlFor="simplify-language" className="text-xs text-gray-300">Simplify language for easier understanding</Label>
              </div>
            </div>

            {/* Genre Selection */}
            <div className="space-y-4">
              <Label className="text-sm font-medium text-white">Genre Transformation</Label>
              <Select value={selectedGenre || ''} onValueChange={setSelectedGenre}>
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                  <SelectValue placeholder="Choose a genre to transform the story" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {genres.map(genre => (
                    <SelectItem key={genre.id} value={genre.id} className="text-white hover:bg-gray-700">
                      {genre.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedGenre && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-white">Transformation Intensity</Label>
                    <span className="text-sm text-emerald-400 font-medium">{genreIntensity}%</span>
                  </div>
                  <Slider
                    value={[genreIntensity]}
                    onValueChange={(value) => setGenreIntensity(value[0])}
                    max={100}
                    min={10}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Subtle</span>
                    <span>Moderate</span>
                    <span>Strong</span>
                  </div>
                </div>
              )}
            </div>

            {/* Narration Settings */}
            <div className="space-y-4">
              <Label className="text-sm font-medium text-white">Narration Style</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Select value={selectedVoice || ''} onValueChange={setSelectedVoice}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue placeholder="Select narrator voice" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {voices.map(voice => (
                      <SelectItem key={voice.id} value={voice.id} className="text-white hover:bg-gray-700">
                        {voice.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={voiceCustomization.style} onValueChange={v => setVoiceCustomization(vc => ({ ...vc, style: v }))}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="formal" className="text-white hover:bg-gray-700">Formal</SelectItem>
                    <SelectItem value="casual" className="text-white hover:bg-gray-700">Casual</SelectItem>
                    <SelectItem value="dramatic" className="text-white hover:bg-gray-700">Dramatic</SelectItem>
                    <SelectItem value="soothing" className="text-white hover:bg-gray-700">Soothing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {selectedVoice && (
                <Button
                  onClick={() => {
                    setBookVoice(book.id, selectedVoice);
                    toast({
                      title: "Voice Saved",
                      description: "Your narrator voice has been saved.",
                    })
                  }}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Save Voice Preference
                </Button>
              )}
            </div>

            {/* Custom Prompt */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-white">Custom Instructions</Label>
              <Textarea
                placeholder="e.g., 'Transform this into a detective story set in 1920s Chicago with a female protagonist'"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                rows={3}
              />
              <p className="text-xs text-gray-400">Be specific about the changes you'd like to see in the story transformation.</p>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
} 