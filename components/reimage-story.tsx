"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Wand2, Clock, BookText, Globe, Users, Sparkles, RefreshCw, Save, Play, Pause, Volume2, User, Mic } from "lucide-react"
import type { Book } from "@/types/book"
import { usePlayer } from "@/lib/player/player-context"
import { AUDIO_VERSIONS, AudioVersionId } from "@/lib/player/player-context"
import { getAllVoices } from "@/lib/voices"
import { setBookVoice } from "@/lib/voice-storage"

interface ReimageStoryProps {
  book: Book
}

export function ReimageStory({ book }: ReimageStoryProps) {
  const [activeTab, setActiveTab] = useState("length")
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
  const [lengthFactor, setLengthFactor] = useState(100) // 100% = original length
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

  // Available genres for transformation
  const genres = [
    { id: "fantasy", name: "Fantasy", description: "Reimagine the story in a magical world with fantastical elements" },
    { id: "mystery", name: "Mystery", description: "Add suspense and intrigue to the narrative" },
    { id: "romance", name: "Romance", description: "Focus on relationships and emotional connections" },
    { id: "historical", name: "Historical Fiction", description: "Set in a different historical period" },
    { id: "adventure", name: "Adventure", description: "Emphasize action and exploration" },
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
    { id: "epistolary", name: "Epistolary (Letters/Documents)" },
    { id: "multiple", name: "Multiple Perspectives" },
  ]

  // Generate characters based on the book
  const getBookCharacters = () => {
    // This would ideally come from a database of characters for each book
    // For now, we'll use some hardcoded examples based on the book ID
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
    setPreviewText(null) // Clear previous preview

    // Simulate AI generation with a timeout
    setTimeout(() => {
      let previewContent = ""

      // Generate different preview text based on the active tab
      switch (activeTab) {
        case "length":
          const firstChapter = book.chapters?.[0]
          const chapterTitle = firstChapter?.title || 'Chapter 1'
          const chapterText = book.description
          previewContent = chapterTitle + ': ' + chapterText
          break

        case "genre":
          if (selectedGenre === "fantasy") {
            const firstChapter = book.chapters?.[0]
            const chapterTitle = firstChapter?.title || 'Chapter 1'
            const chapterText = book.description
            previewContent = chapterTitle + ': ' + chapterText
          } else if (selectedGenre === "mystery") {
            const firstChapter = book.chapters?.[0]
            const chapterTitle = firstChapter?.title || 'Chapter 1'
            const chapterText = book.description
            previewContent = chapterTitle + ': ' + chapterText
          } else if (selectedGenre === "romance") {
            const firstChapter = book.chapters?.[0]
            const chapterTitle = firstChapter?.title || 'Chapter 1'
            const chapterText = book.description
            previewContent = chapterTitle + ': ' + chapterText
          } else {
            previewContent = "Select a genre to see a preview of how the story might be transformed."
          }
          break

        case "time":
          if (timePeriod === "modern") {
            const firstChapter = book.chapters?.[0]
            const chapterTitle = firstChapter?.title || 'Chapter 1'
            const chapterText = book.description
            previewContent = chapterTitle + ': ' + chapterText
          } else if (timePeriod === "1980s") {
            const firstChapter = book.chapters?.[0]
            const chapterTitle = firstChapter?.title || 'Chapter 1'
            const chapterText = book.description
            previewContent = chapterTitle + ': ' + chapterText
          } else if (timePeriod === "farfuture") {
            const firstChapter = book.chapters?.[0]
            const chapterTitle = firstChapter?.title || 'Chapter 1'
            const chapterText = book.description
            previewContent = chapterTitle + ': ' + chapterText
          } else {
            previewContent = "Select a time period to see a preview of how the story might be transformed."
          }
          break

        case "perspective":
          if (perspective === "first" && characterFocus === "Elizabeth Bennet") {
            const firstChapter = book.chapters?.[0]
            const chapterTitle = firstChapter?.title || 'Chapter 1'
            const chapterText = book.description
            previewContent = chapterTitle + ': ' + chapterText
          } else if (perspective === "first" && characterFocus === "Mr. Darcy") {
            const firstChapter = book.chapters?.[0]
            const chapterTitle = firstChapter?.title || 'Chapter 1'
            const chapterText = book.description
            previewContent = chapterTitle + ': ' + chapterText
          } else if (perspective === "second") {
            const firstChapter = book.chapters?.[0]
            const chapterTitle = firstChapter?.title || 'Chapter 1'
            const chapterText = book.description
            previewContent = chapterTitle + ': ' + chapterText
          } else {
            previewContent = "Select a perspective and character to see a preview of how the story might be transformed."
          }
          break

        case "custom":
          if (customPrompt) {
            previewContent =
              "Your custom reimagining would be generated here based on your specific instructions. The AI would transform the original text according to your creative direction while maintaining the essence of the story."
          } else {
            previewContent =
              "Enter a custom prompt to see a preview of how the story might be transformed according to your specific instructions."
          }
          break
      }

      setPreviewText(previewContent)
      setIsGenerating(false)

      toast({
        title: "Preview generated",
        description: "This is how your reimagined story might begin. Generate the full story to experience the complete transformation.",
      })
    }, 1500)
  }

  const handleSaveTransformation = () => {
    toast({
      title: "Transformation saved",
      description: "Your reimagined story has been saved and is ready for listening.",
    })
  }

  // Handle URL hash for tab selection
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash.startsWith('story-transform-')) {
        const tab = hash.replace('story-transform-', '')
        if (['length', 'genre', 'time', 'perspective', 'custom'].includes(tab)) {
          setActiveTab(tab)
        }
      }
    }

    // Initial check
    handleHashChange()

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const versions = [
    {
      id: 'SHORTENED' as AudioVersionId,
      title: "Dramatically Shortened Story Version",
      description: "Experience the essence of the story in a concise format",
      icon: <Play className="h-4 w-4" />
    },
    {
      id: 'SCIFI' as AudioVersionId,
      title: "Sci-Fi Genre Reimagination",
      description: "Journey through space and time with this futuristic retelling",
      icon: <Play className="h-4 w-4" />
    },
    {
      id: 'SPANISH' as AudioVersionId,
      title: "Spanish Literary Translation",
      description: "Immerse yourself in the Spanish language version",
      icon: <Play className="h-4 w-4" />
    },
    {
      id: 'YA' as AudioVersionId,
      title: "Modern YA Adventure Rewrite",
      description: "A contemporary take for young adult readers",
      icon: <Play className="h-4 w-4" />
    }
  ]

  const handleVersionSelect = (versionId: AudioVersionId) => {
    // Always pause and reset audio before starting a new version
    if (typeof window !== 'undefined') {
      const audio = document.querySelector('audio');
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    }
    // Set the new version and book first
    setVersion(versionId);
    setCurrentBook(book);
    // Use setTimeout to ensure state updates have completed
    setTimeout(() => {
      togglePlayback();
    }, 0);
  };

  // Narrator customization state
  const [voices] = useState(() => getAllVoices());
  const [selectedVoice, setSelectedVoice] = useState<string | null>(voices[0]?.id || null);
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const [isGeneratingVoice, setIsGeneratingVoice] = useState(false);
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

  return (
    <div className="space-y-6">
      <Card className="border-emerald-500/20 shadow-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-transparent">
          <div className="flex items-center">
            <Wand2 className="h-5 w-5 text-emerald-500 mr-2" />
            <CardTitle>Advanced Story Transformation</CardTitle>
          </div>
          <CardDescription>
            Fine-tune exactly how you want this story reimagined with detailed AI controls
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="flex flex-row gap-2 mb-6 scroll-mt-24 sticky top-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 py-2 overflow-x-auto whitespace-nowrap scrollbar-hide border-b border-emerald-900 h-14">
              <TabsTrigger
                key="narrator"
                value="narrator"
                id="story-transform-narrator"
                className="flex flex-col items-center justify-center min-w-[90px] h-12 px-3 py-1 text-emerald-100 border-b-2 border-transparent data-[state=active]:border-emerald-400 data-[state=active]:text-emerald-400 bg-transparent data-[state=active]:bg-transparent transition-all duration-200 overflow-hidden"
                title="Narrator"
              >
                <Mic className="h-4 w-4 mr-2" />
                <span className="text-xs mt-1 whitespace-normal break-words w-full text-center">Narrator</span>
              </TabsTrigger>
              <TabsTrigger
                key="length"
                value="length"
                id="story-transform-length"
                className="flex flex-col items-center justify-center min-w-[90px] h-12 px-3 py-1 text-emerald-100 border-b-2 border-transparent data-[state=active]:border-emerald-400 data-[state=active]:text-emerald-400 bg-transparent data-[state=active]:bg-transparent transition-all duration-200 overflow-hidden"
                title="Length"
              >
                <Clock className="h-4 w-4 mr-2" />
                <span className="text-xs mt-1 whitespace-normal break-words w-full text-center">Length</span>
              </TabsTrigger>
              <TabsTrigger
                key="genre"
                value="genre"
                id="story-transform-genre"
                className="flex flex-col items-center justify-center min-w-[90px] h-12 px-3 py-1 text-emerald-100 border-b-2 border-transparent data-[state=active]:border-emerald-400 data-[state=active]:text-emerald-400 bg-transparent data-[state=active]:bg-transparent transition-all duration-200 overflow-hidden"
                title="Genre"
              >
                <BookText className="h-4 w-4 mr-2" />
                <span className="text-xs mt-1 whitespace-normal break-words w-full text-center">Genre</span>
              </TabsTrigger>
              <TabsTrigger
                key="time"
                value="time"
                id="story-transform-time"
                className="flex flex-col items-center justify-center min-w-[90px] h-12 px-3 py-1 text-emerald-100 border-b-2 border-transparent data-[state=active]:border-emerald-400 data-[state=active]:text-emerald-400 bg-transparent data-[state=active]:bg-transparent transition-all duration-200 overflow-hidden"
                title="Time Period"
              >
                <Globe className="h-4 w-4 mr-2" />
                <span className="text-xs mt-1 whitespace-normal break-words w-full text-center">Time Period</span>
              </TabsTrigger>
              <TabsTrigger
                key="perspective"
                value="perspective"
                id="story-transform-perspective"
                className="flex flex-col items-center justify-center min-w-[90px] h-12 px-3 py-1 text-emerald-100 border-b-2 border-transparent data-[state=active]:border-emerald-400 data-[state=active]:text-emerald-400 bg-transparent data-[state=active]:bg-transparent transition-all duration-200 overflow-hidden"
                title="Perspective"
              >
                <Users className="h-4 w-4 mr-2" />
                <span className="text-xs mt-1 whitespace-normal break-words w-full text-center">Perspective</span>
              </TabsTrigger>
              <TabsTrigger
                key="custom"
                value="custom"
                id="story-transform-custom"
                className="flex flex-col items-center justify-center min-w-[90px] h-12 px-3 py-1 text-emerald-100 border-b-2 border-transparent data-[state=active]:border-emerald-400 data-[state=active]:text-emerald-400 bg-transparent data-[state=active]:bg-transparent transition-all duration-200 overflow-hidden"
                title="Custom"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                <span className="text-xs mt-1 whitespace-normal break-words w-full text-center">Custom</span>
              </TabsTrigger>
            </TabsList>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <TabsContent value="narrator" className="space-y-6 mt-0">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Customize Your Narrator</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Base Voice</label>
                        <Select value={selectedVoice || ''} onValueChange={setSelectedVoice}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a voice" />
                          </SelectTrigger>
                          <SelectContent>
                            {voices.map(voice => (
                              <SelectItem key={voice.id} value={voice.id}>{voice.name} – {voice.description}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          type="button"
                          variant="outline"
                          className="mt-2"
                          onClick={() => {
                            if (!selectedVoice) return;
                            const voice = voices.find(v => v.id === selectedVoice);
                            if (voice?.sampleUrl) {
                              const audio = new Audio(voice.sampleUrl);
                              setPlayingVoice(selectedVoice);
                              audio.onended = () => setPlayingVoice(null);
                              audio.play().catch(() => setPlayingVoice(null));
                            }
                          }}
                        >
                          {playingVoice === selectedVoice ? <><Pause className="h-4 w-4 mr-1" />Stop</> : <><Play className="h-4 w-4 mr-1" />Play Sample</>}
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Voice Age</label>
                        <Select value={voiceCustomization.age} onValueChange={v => setVoiceCustomization(vc => ({ ...vc, age: v }))}>
                          <SelectTrigger><SelectValue placeholder="Select age" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="young">Young</SelectItem>
                            <SelectItem value="middle-aged">Middle-aged</SelectItem>
                            <SelectItem value="elderly">Elderly</SelectItem>
                          </SelectContent>
                        </Select>
                        <label className="text-sm font-medium mt-2">Voice Gender</label>
                        <Select value={voiceCustomization.gender} onValueChange={v => setVoiceCustomization(vc => ({ ...vc, gender: v }))}>
                          <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="neutral">Gender Neutral</SelectItem>
                          </SelectContent>
                        </Select>
                        <label className="text-sm font-medium mt-2">Narration Style</label>
                        <Select value={voiceCustomization.style} onValueChange={v => setVoiceCustomization(vc => ({ ...vc, style: v }))}>
                          <SelectTrigger><SelectValue placeholder="Select style" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="formal">Formal</SelectItem>
                            <SelectItem value="casual">Casual</SelectItem>
                            <SelectItem value="dramatic">Dramatic</SelectItem>
                            <SelectItem value="soothing">Soothing</SelectItem>
                            <SelectItem value="energetic">Energetic</SelectItem>
                          </SelectContent>
                        </Select>
                        <label className="text-sm font-medium mt-2">Accent</label>
                        <Select value={voiceCustomization.accent} onValueChange={v => setVoiceCustomization(vc => ({ ...vc, accent: v }))}>
                          <SelectTrigger><SelectValue placeholder="Select accent" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="neutral">Neutral</SelectItem>
                            <SelectItem value="british">British</SelectItem>
                            <SelectItem value="american">American</SelectItem>
                            <SelectItem value="australian">Australian</SelectItem>
                            <SelectItem value="irish">Irish</SelectItem>
                            <SelectItem value="scottish">Scottish</SelectItem>
                            <SelectItem value="french">French</SelectItem>
                            <SelectItem value="german">German</SelectItem>
                            <SelectItem value="spanish">Spanish</SelectItem>
                            <SelectItem value="italian">Italian</SelectItem>
                            <SelectItem value="russian">Russian</SelectItem>
                            <SelectItem value="japanese">Japanese</SelectItem>
                            <SelectItem value="indian">Indian</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="text-sm font-medium">Speaking Pace</label>
                        <input type="range" min="10" max="100" step="5" value={voiceCustomization.pace} onChange={e => setVoiceCustomization(v => ({ ...v, pace: Number(e.target.value) }))} className="w-full" />
                        <div className="flex justify-between text-xs"><span>Slower</span><span>Faster</span></div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Pitch</label>
                        <input type="range" min="10" max="100" step="5" value={voiceCustomization.pitch} onChange={e => setVoiceCustomization(v => ({ ...v, pitch: Number(e.target.value) }))} className="w-full" />
                        <div className="flex justify-between text-xs"><span>Lower</span><span>Higher</span></div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Clarity</label>
                        <input type="range" min="10" max="100" step="5" value={voiceCustomization.clarity} onChange={e => setVoiceCustomization(v => ({ ...v, clarity: Number(e.target.value) }))} className="w-full" />
                        <div className="flex justify-between text-xs"><span>Natural</span><span>Crisp</span></div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Emotionality</label>
                        <input type="range" min="10" max="100" step="5" value={voiceCustomization.emotionality} onChange={e => setVoiceCustomization(v => ({ ...v, emotionality: Number(e.target.value) }))} className="w-full" />
                        <div className="flex justify-between text-xs"><span>Neutral</span><span>Expressive</span></div>
                      </div>
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={() => {
                          if (!selectedVoice) return;
                          setBookVoice(book.id, selectedVoice);
                        }}
                        className="bg-emerald-500 hover:bg-emerald-600"
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Save Narrator
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="length" className="space-y-6 mt-0">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Story Length</h3>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Shorter</span>
                        <span className="text-sm font-medium">{lengthFactor}%</span>
                        <span className="text-sm text-muted-foreground">Longer</span>
                      </div>
                      <Slider
                        value={[lengthFactor]}
                        min={25}
                        max={200}
                        step={5}
                        onValueChange={(value) => setLengthFactor(value[0])}
                      />
                      <p className="text-sm text-muted-foreground mt-2">
                        {lengthFactor < 50
                          ? "Create a significantly condensed version that captures the essence of the story."
                          : lengthFactor > 150
                            ? "Expand the narrative with additional details, descriptions, and dialogue."
                            : "Maintain a length similar to the original work."}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="simplify-language" checked={simplifyLanguage} onCheckedChange={setSimplifyLanguage} />
                      <Label htmlFor="simplify-language">Simplify language for easier reading</Label>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="genre" className="space-y-6 mt-0">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Transform Genre</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Reimagine this story in a completely different genre while preserving the core narrative
                      </p>

                      <div className="grid grid-cols-2 gap-2">
                        {genres.map((genre) => (
                          <Button
                            key={genre.id}
                            variant={selectedGenre === genre.id ? "default" : "outline"}
                            className={selectedGenre === genre.id ? "border-emerald-500 bg-emerald-500" : ""}
                            onClick={() => setSelectedGenre(genre.id)}
                          >
                            {genre.name}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {selectedGenre && (
                      <div>
                        <h4 className="text-md font-medium mb-2">Genre Intensity</h4>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Subtle</span>
                          <span className="text-sm font-medium">{genreIntensity}%</span>
                          <span className="text-sm text-muted-foreground">Extreme</span>
                        </div>
                        <Slider
                          value={[genreIntensity]}
                          min={10}
                          max={100}
                          step={5}
                          onValueChange={(value) => setGenreIntensity(value[0])}
                        />
                        <p className="text-sm text-muted-foreground mt-2">
                          {genreIntensity < 30
                            ? "Light genre elements while staying close to the original tone."
                            : genreIntensity > 70
                              ? "Full genre transformation with all associated tropes and conventions."
                              : "Balanced approach with moderate genre elements."}
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="time" className="space-y-6 mt-0">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Change Time Period</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Transport this story to a different era while maintaining its themes and characters
                      </p>

                      <Select value={timePeriod || ""} onValueChange={setTimePeriod}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a time period" />
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

                    {timePeriod && (
                      <div className="flex items-center space-x-2">
                        <Switch id="keep-themes" checked={keepThemes} onCheckedChange={setKeepThemes} />
                        <Label htmlFor="keep-themes">Preserve original themes and social commentary</Label>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="perspective" className="space-y-6 mt-0">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Change Narrative Perspective</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Retell the story from a different viewpoint or narrative style
                      </p>

                      <RadioGroup value={perspective || ""} onValueChange={setPerspective} className="space-y-2">
                        {perspectives.map((p) => (
                          <div key={p.id} className="flex items-center space-x-2">
                            <RadioGroupItem value={p.id} id={`perspective-${p.id}`} />
                            <Label htmlFor={`perspective-${p.id}`}>{p.name}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    {perspective && perspective !== "third-omniscient" && (
                      <div>
                        <h4 className="text-md font-medium mb-2">Character Focus</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Select which character's perspective to follow
                        </p>

                        <Select value={characterFocus || ""} onValueChange={setCharacterFocus}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a character" />
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
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="custom" className="space-y-6 mt-0">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Custom Transformation</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Describe exactly how you want the AI to reimagine this story
                      </p>

                      <Textarea
                        placeholder="Example: Rewrite this as a cyberpunk thriller with elements of Greek mythology, focusing on themes of technology addiction and fate."
                        value={customPrompt}
                        onChange={(e) => setCustomPrompt(e.target.value)}
                        className="min-h-[120px]"
                      />
                    </div>

                    <div>
                      <h4 className="text-md font-medium mb-2">Suggested Prompts</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge
                          variant="outline"
                          className="cursor-pointer hover:bg-emerald-500/10"
                          onClick={() =>
                            setCustomPrompt(
                              "Rewrite as if written by Ernest Hemingway with his distinctive terse style.",
                            )
                          }
                        >
                          Hemingway Style
                        </Badge>
                        <Badge
                          variant="outline"
                          className="cursor-pointer hover:bg-emerald-500/10"
                          onClick={() =>
                            setCustomPrompt("Transform into a magical realism story with subtle supernatural elements.")
                          }
                        >
                          Magical Realism
                        </Badge>
                        <Badge
                          variant="outline"
                          className="cursor-pointer hover:bg-emerald-500/10"
                          onClick={() => setCustomPrompt("Retell as an epic poem in the style of Homer's Odyssey.")}
                        >
                          Epic Poem
                        </Badge>
                        <Badge
                          variant="outline"
                          className="cursor-pointer hover:bg-emerald-500/10"
                          onClick={() =>
                            setCustomPrompt(
                              "Reimagine with an unreliable narrator who gradually reveals their deceptions.",
                            )
                          }
                        >
                          Unreliable Narrator
                        </Badge>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <Button
                  onClick={handleGeneratePreview}
                  disabled={
                    isGenerating ||
                    (activeTab === "genre" && !selectedGenre) ||
                    (activeTab === "time" && !timePeriod) ||
                    (activeTab === "perspective" &&
                      (!perspective || (perspective !== "third-omniscient" && !characterFocus))) ||
                    (activeTab === "custom" && !customPrompt)
                  }
                  className="w-full"
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

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Preview</h3>
                <div className="bg-muted/30 rounded-md p-4 min-h-[300px] border border-border relative">
                  {isGenerating ? (
                    <div className="flex items-center justify-center h-full absolute inset-0 bg-background/80 backdrop-blur-sm">
                      <RefreshCw className="h-8 w-8 text-emerald-500 animate-spin" />
                    </div>
                  ) : previewText ? (
                    <div className="prose dark:prose-invert max-w-none">
                      <p className="whitespace-pre-wrap">{previewText}</p>
                      <p className="text-sm text-muted-foreground mt-4">
                        This is just a preview of how your reimagined story might begin. Generate the full story to
                        experience the complete transformation.
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                      <Wand2 className="h-12 w-12 mb-4 text-muted-foreground/50" />
                      <p>
                        Configure your transformation options and click "Generate Preview" to see a sample of your
                        reimagined story.
                      </p>
                    </div>
                  )}
                </div>

                {previewText && (
                  <Button
                    onClick={handleSaveTransformation}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Transformation & Listen
                  </Button>
                )}
              </div>
            </div>
          </Tabs>
        </CardContent>

        <CardFooter className="bg-muted/30 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-muted-foreground">
          <p>AI transformations preserve the essence of the original work while reimagining its presentation.</p>
          <Badge variant="outline" className="mt-2 sm:mt-0">
            Powered by Bibo AI
          </Badge>
        </CardFooter>
      </Card>
    </div>
  )
}
