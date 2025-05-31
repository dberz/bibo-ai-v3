"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Wand2, Clock, BookText, Globe, Users, Sparkles, RefreshCw, Save, Play, Pause, Volume2, User, Mic, Palette, Calendar, Eye } from "lucide-react"
import type { Book } from "@/types/book"
import { usePlayer } from "@/lib/player/player-context"
import { AUDIO_VERSIONS, AudioVersionId } from "@/lib/player/player-context"
import { getAllVoices } from "@/lib/voices"
import { setBookVoice } from "@/lib/voice-storage"
import { QuickTransformations } from "@/components/quick-transformations"

interface ReimageStoryProps {
  book: Book
}

export function ReimageStory({ book }: ReimageStoryProps) {
  const [activeTab, setActiveTab] = useState("quick")
  const [isGenerating, setIsGenerating] = useState(false)
  const [previewText, setPreviewText] = useState<string | null>(null)
  const { toast } = useToast()
  const { 
    currentVersion, 
    setVersion, 
    isPlaying, 
    togglePlayback,
    currentBook,
    setCurrentBook,
    adPlaying
  } = usePlayer()

  // Get content from URL if available
  useEffect(() => {
    const url = new URL(window.location.href);
    const content = url.searchParams.get('content');
    if (content) {
      setPreviewText(decodeURIComponent(content));
    }
  }, []);

  // Story length settings
  const [lengthFactor, setLengthFactor] = useState(100)
  const [simplifyLanguage, setSimplifyLanguage] = useState(false)

  // Genre settings
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)
  const [genreIntensity, setGenreIntensity] = useState(50)

  // Time period settings
  const [timePeriod, setTimePeriod] = useState<string | null>(null)
  const [keepThemes, setKeepThemes] = useState(true)

  // Perspective settings
  const [perspective, setPerspective] = useState<string | null>(null)
  const [characterFocus, setCharacterFocus] = useState<string | null>(null)

  // Custom settings
  const [customPrompt, setCustomPrompt] = useState("")

  // Voice settings
  const voices = getAllVoices()
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null)
  const [playingVoice, setPlayingVoice] = useState<string | null>(null)
  const [voiceCustomization, setVoiceCustomization] = useState({
    age: "middle-aged",
    style: "formal",
    gender: "neutral",
    accent: "neutral",
    pace: 50,
    pitch: 50,
    clarity: 70,
    emotionality: 50,
  });

  // Available genres for transformation
  const genres = [
    { id: "fantasy", name: "Fantasy", description: "Magical world with fantastical elements" },
    { id: "mystery", name: "Mystery", description: "Add suspense and intrigue" },
    { id: "romance", name: "Romance", description: "Focus on relationships" },
    { id: "historical", name: "Historical", description: "Different time period" },
    { id: "adventure", name: "Adventure", description: "Action and exploration" },
  ]

  // Available time periods
  const timePeriods = [
    { id: "prehistoric", name: "Prehistoric" },
    { id: "ancient", name: "Ancient Civilization" },
    { id: "medieval", name: "Medieval" },
    { id: "renaissance", name: "Renaissance" },
    { id: "victorian", name: "Victorian" },
    { id: "1920s", name: "1920s" },
    { id: "1950s", name: "1950s" },
    { id: "1980s", name: "1980s" },
    { id: "modern", name: "Modern Day" },
    { id: "nearfuture", name: "Near Future" },
    { id: "farfuture", name: "Far Future" },
    { id: "postapocalyptic", name: "Post-Apocalyptic" },
  ]

  // Available perspectives
  const perspectives = [
    { id: "first", name: "First Person" },
    { id: "third-limited", name: "Third Person Limited" },
    { id: "third-omniscient", name: "Third Person Omniscient" },
    { id: "second", name: "Second Person" },
    { id: "epistolary", name: "Epistolary (Letters)" },
    { id: "multiple", name: "Multiple Perspectives" },
  ]

  // Generate characters based on the book
  const getBookCharacters = () => {
    const characterMap: Record<string, string[]> = {
      "pride-and-prejudice": ["Elizabeth Bennet", "Mr. Darcy", "Jane Bennet", "Mr. Bingley", "Lydia Bennet"],
      "sherlock-holmes": ["Sherlock Holmes", "Dr. Watson", "Inspector Lestrade", "Mrs. Hudson", "Irene Adler"],
      frankenstein: ["Victor Frankenstein", "The Creature", "Elizabeth Lavenza", "Henry Clerval"],
      dracula: ["Count Dracula", "Jonathan Harker", "Mina Murray", "Van Helsing", "Lucy Westenra"],
      "the-great-gatsby": ["Jay Gatsby", "Nick Carraway", "Daisy Buchanan", "Tom Buchanan", "Jordan Baker"],
    }

    return characterMap[book.id] || ["Main Character", "Supporting Character", "Antagonist"]
  }

  const handleGeneratePreview = () => {
    setIsGenerating(true)
    setPreviewText(null)

    setTimeout(() => {
      let previewContent = ""

      switch (activeTab) {
        case "length":
          const firstChapter = book.chapters?.[0]
          const chapterTitle = firstChapter?.title || 'Chapter 1'
          const chapterText = book.description
          previewContent = chapterTitle + ': ' + chapterText
          break

        case "genre":
          if (selectedGenre) {
            const firstChapter = book.chapters?.[0]
            const chapterTitle = firstChapter?.title || 'Chapter 1'
            const chapterText = book.description
            previewContent = chapterTitle + ': ' + chapterText
          } else {
            previewContent = "Select a genre to see a preview of how the story might be transformed."
          }
          break

        case "time":
          if (timePeriod) {
            const firstChapter = book.chapters?.[0]
            const chapterTitle = firstChapter?.title || 'Chapter 1'
            const chapterText = book.description
            previewContent = chapterTitle + ': ' + chapterText
          } else {
            previewContent = "Select a time period to see a preview of how the story might be transformed."
          }
          break

        case "perspective":
          if (perspective) {
            const firstChapter = book.chapters?.[0]
            const chapterTitle = firstChapter?.title || 'Chapter 1'
            const chapterText = book.description
            previewContent = chapterTitle + ': ' + chapterText
          } else {
            previewContent = "Select a perspective to see a preview of how the story might be transformed."
          }
          break

        case "custom":
          if (customPrompt) {
            const firstChapter = book.chapters?.[0]
            const chapterTitle = firstChapter?.title || 'Chapter 1'
            const chapterText = book.description
            previewContent = chapterTitle + ': ' + chapterText
          } else {
            previewContent = "Enter a custom prompt to see a preview of how the story might be transformed."
          }
          break

        default:
          previewContent = "Configure your transformation options and click 'Generate Preview' to see a sample."
      }

      setPreviewText(previewContent)
      setIsGenerating(false)
    }, 2000)
  }

  const handleSaveTransformation = () => {
    // Handle saving transformation
    toast({
      title: "Transformation Saved",
      description: "Your AI transformation has been saved and is ready to listen.",
    })
  }

  const handleVersionSelect = (versionId: AudioVersionId) => {
    setVersion(versionId)
    setCurrentBook(book)
  }

  return (
    <div className="space-y-6">
      <Card className="border-emerald-500/20 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-transparent pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <Wand2 className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <CardTitle className="text-xl">AI Transformations</CardTitle>
              <CardDescription className="text-base">
                Reimagine this story with AI-powered transformations
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 h-12">
              <TabsTrigger value="quick" className="text-sm font-medium">Quick</TabsTrigger>
              <TabsTrigger value="length" className="text-sm font-medium">Length</TabsTrigger>
              <TabsTrigger value="style" className="text-sm font-medium">Style</TabsTrigger>
              <TabsTrigger value="custom" className="text-sm font-medium">Custom</TabsTrigger>
            </TabsList>

            <TabsContent value="quick" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Popular Transformations</h3>
                <QuickTransformations book={book} />
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-lg font-semibold mb-4">Narrator Voice</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Voice</Label>
                    <Select value={selectedVoice || ''} onValueChange={setSelectedVoice}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select a voice" />
                      </SelectTrigger>
                      <SelectContent>
                        {voices.map(voice => (
                          <SelectItem key={voice.id} value={voice.id}>
                            {voice.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Style</Label>
                    <Select value={voiceCustomization.style} onValueChange={v => setVoiceCustomization(vc => ({ ...vc, style: v }))}>
                      <SelectTrigger className="mt-2">
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
                    className="mt-4 bg-emerald-500 hover:bg-emerald-600"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Voice
                  </Button>
                )}
              </div>
            </TabsContent>

            <TabsContent value="length" className="space-y-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Story Length</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <Label className="text-sm">Length Adjustment</Label>
                        <span className="text-sm font-medium">{lengthFactor}%</span>
                      </div>
                      <Slider
                        value={[lengthFactor]}
                        min={25}
                        max={200}
                        step={5}
                        onValueChange={(value) => setLengthFactor(value[0])}
                        className="w-full"
                      />
                      <p className="text-sm text-muted-foreground mt-2">
                        {lengthFactor < 50
                          ? "Condensed version that captures the essence"
                          : lengthFactor > 150
                            ? "Expanded with additional details and dialogue"
                            : "Similar length to the original"}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Switch 
                        id="simplify-language" 
                        checked={simplifyLanguage} 
                        onCheckedChange={setSimplifyLanguage} 
                      />
                      <Label htmlFor="simplify-language" className="text-sm">
                        Simplify language for easier reading
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="style" className="space-y-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Story Style</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-500/10 rounded-lg">
                        <Palette className="h-4 w-4 text-emerald-500" />
                      </div>
                      <div className="flex-1">
                        <Label className="text-sm font-medium">Genre Transformation</Label>
                        <Select value={selectedGenre || ""} onValueChange={setSelectedGenre}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select genre" />
                          </SelectTrigger>
                          <SelectContent>
                            {genres.map((genre) => (
                              <SelectItem key={genre.id} value={genre.id}>
                                {genre.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-500/10 rounded-lg">
                        <Calendar className="h-4 w-4 text-emerald-500" />
                      </div>
                      <div className="flex-1">
                        <Label className="text-sm font-medium">Time Period</Label>
                        <Select value={timePeriod || ""} onValueChange={setTimePeriod}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select time period" />
                          </SelectTrigger>
                          <SelectContent>
                            {timePeriods.map((period) => (
                              <SelectItem key={period.id} value={period.id}>
                                {period.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-500/10 rounded-lg">
                        <Eye className="h-4 w-4 text-emerald-500" />
                      </div>
                      <div className="flex-1">
                        <Label className="text-sm font-medium">Narrative Perspective</Label>
                        <Select value={perspective || ""} onValueChange={setPerspective}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select perspective" />
                          </SelectTrigger>
                          <SelectContent>
                            {perspectives.map((p) => (
                              <SelectItem key={p.id} value={p.id}>
                                {p.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {perspective && perspective !== "third-omniscient" && (
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-500/10 rounded-lg">
                          <User className="h-4 w-4 text-emerald-500" />
                        </div>
                        <div className="flex-1">
                          <Label className="text-sm font-medium">Character Focus</Label>
                          <Select value={characterFocus || ""} onValueChange={setCharacterFocus}>
                            <SelectTrigger className="mt-2">
                              <SelectValue placeholder="Select character" />
                            </SelectTrigger>
                            <SelectContent>
                              {getBookCharacters().map((character) => (
                                <SelectItem key={character} value={character}>
                                  {character}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}

                    {selectedGenre && (
                      <div className="pt-4 border-t">
                        <Label className="text-sm font-medium mb-2 block">Genre Intensity</Label>
                        <Slider
                          value={[genreIntensity]}
                          min={10}
                          max={100}
                          step={5}
                          onValueChange={(value) => setGenreIntensity(value[0])}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>Subtle</span>
                          <span>Extreme</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="custom" className="space-y-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Custom Transformation</h3>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Describe Your Vision</Label>
                      <Textarea
                        placeholder="Example: Rewrite this as a cyberpunk thriller with elements of Greek mythology..."
                        value={customPrompt}
                        onChange={(e) => setCustomPrompt(e.target.value)}
                        className="min-h-[120px] resize-none"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium mb-3 block">Quick Suggestions</Label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Hemingway Style",
                          "Magical Realism", 
                          "Epic Poem",
                          "Unreliable Narrator"
                        ].map((suggestion) => (
                          <Badge
                            key={suggestion}
                            variant="outline"
                            className="cursor-pointer hover:bg-emerald-500/10 text-sm"
                            onClick={() => setCustomPrompt(suggestion)}
                          >
                            {suggestion}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Generate Button */}
            {activeTab !== "quick" && (
              <div className="pt-4 border-t">
                <Button
                  onClick={handleGeneratePreview}
                  disabled={isGenerating}
                  className="w-full bg-emerald-500 hover:bg-emerald-600"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Generating Preview...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      Generate Preview
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Preview Section */}
            {activeTab !== "quick" && (
              <div className="pt-4 border-t">
                <h3 className="text-lg font-semibold mb-4">Preview</h3>
                <div className="bg-muted/30 rounded-lg p-4 min-h-[200px] border">
                  {isGenerating ? (
                    <div className="flex items-center justify-center h-full">
                      <RefreshCw className="h-8 w-8 text-emerald-500 animate-spin" />
                    </div>
                  ) : previewText ? (
                    <div className="space-y-3">
                      <p className="whitespace-pre-wrap text-sm leading-relaxed">{previewText}</p>
                      <p className="text-xs text-muted-foreground">
                        This is a preview of your reimagined story. Generate the full version to experience the complete transformation.
                      </p>
                      <Button
                        onClick={handleSaveTransformation}
                        className="bg-emerald-500 hover:bg-emerald-600"
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Save & Listen
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                      <Wand2 className="h-8 w-8 mb-3 text-muted-foreground/50" />
                      <p className="text-sm">
                        Configure your transformation and click "Generate Preview" to see a sample.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
