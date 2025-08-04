"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, Scissors, Rocket, Globe, Sparkles, Wand2, ChevronDown, ChevronUp, Clock, User } from "lucide-react"
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
    const baseTime = 60 // Assuming 1 hour base
    const actualTime = Math.round((percentage / 100) * baseTime)
    const hours = Math.floor(actualTime / 60)
    const minutes = actualTime % 60
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
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

  // Updated transformations to match the modal exactly
  const popularTransformations = [
    {
      id: "SHORTENED" as AudioVersionId,
      label: "Short Version",
      description: "30% of original length",
      icon: <Clock className="h-4 w-4" />,
      tab: "length",
    },
    {
      id: "SCIFI" as AudioVersionId,
      label: "Fantasy Version", 
      description: "Same story, but reimagined in a magical setting",
      icon: <Globe className="h-4 w-4" />,
      tab: "genre",
    },
    {
      id: "YA" as AudioVersionId,
      label: "Modern Setting",
      description: "Set the story in the present day for a contemporary feel",
      icon: <Wand2 className="h-4 w-4" />,
      tab: "time",
    },
    {
      id: "SPANISH" as AudioVersionId,
      label: "Main Character POV",
      description: "Experience the story from a first-person perspective",
      icon: <User className="h-4 w-4" />,
      tab: "perspective",
    },
    {
      id: "CLASSIC" as AudioVersionId,
      label: "Advanced Story Transformation",
      description: "Fine-tune length, genre, time period, and more with detailed AI controls",
      icon: <Sparkles className="h-4 w-4" />,
      tab: "custom",
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
        <CardTitle className="flex items-center space-x-2 text-lg">
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
          
          {/* Subtle More Options Link */}
          <div className="pt-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs text-gray-400 hover:text-purple-400 p-0 h-auto"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              {showAdvanced ? "Hide advanced options" : "Show advanced options"}
              {showAdvanced ? (
                <ChevronUp className="h-3 w-3 ml-1" />
              ) : (
                <ChevronDown className="h-3 w-3 ml-1" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>

      {/* Simplified Advanced Options */}
      {showAdvanced && (
        <CardContent className="pt-0 border-t border-gray-700">
          <div className="space-y-4">
            {/* Length Settings */}
            <div>
              <Label className="text-sm font-medium">Length: {getLengthLabel(lengthFactor)}</Label>
              <Slider
                value={[lengthFactor]}
                onValueChange={(value) => setLengthFactor(value[0])}
                max={200}
                min={25}
                step={15}
                className="w-full mt-2"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>15m</span>
                <span>2h</span>
              </div>
              <div className="flex items-center space-x-2 mt-3">
                <Switch
                  id="simplify-language"
                  checked={simplifyLanguage}
                  onCheckedChange={setSimplifyLanguage}
                />
                <Label htmlFor="simplify-language" className="text-xs">Simplify language</Label>
              </div>
            </div>

            {/* Genre Selection */}
            <div>
              <Label className="text-sm font-medium">Genre</Label>
              <Select value={selectedGenre || ''} onValueChange={setSelectedGenre}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Choose a genre" />
                </SelectTrigger>
                <SelectContent>
                  {genres.map(genre => (
                    <SelectItem key={genre.id} value={genre.id}>
                      {genre.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedGenre && (
                <div className="mt-3">
                  <Label className="text-sm font-medium">Intensity: {genreIntensity}%</Label>
                  <Slider
                    value={[genreIntensity]}
                    onValueChange={(value) => setGenreIntensity(value[0])}
                    max={100}
                    min={10}
                    step={10}
                    className="w-full mt-2"
                  />
                </div>
              )}
            </div>

            {/* Narration Settings */}
            <div>
              <Label className="text-sm font-medium">Narration</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                <Select value={selectedVoice || ''} onValueChange={setSelectedVoice}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select narrator" />
                  </SelectTrigger>
                  <SelectContent>
                    {voices.map(voice => (
                      <SelectItem key={voice.id} value={voice.id}>
                        {voice.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={voiceCustomization.style} onValueChange={v => setVoiceCustomization(vc => ({ ...vc, style: v }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="dramatic">Dramatic</SelectItem>
                    <SelectItem value="soothing">Soothing</SelectItem>
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
                  className="w-full mt-3 bg-purple-500 hover:bg-purple-600"
                >
                  Save Voice
                </Button>
              )}
            </div>

            {/* Custom Prompt */}
            <div>
              <Label className="text-sm font-medium">Custom Instructions</Label>
              <Textarea
                placeholder="e.g., 'Transform this into a detective story set in 1920s Chicago with a female protagonist'"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                className="mt-2"
                rows={2}
              />
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
} 