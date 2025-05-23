"use client"

import { useState } from "react"
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
import { Wand2, Clock, BookText, Globe, Users, Sparkles, RefreshCw, Save } from "lucide-react"
import type { Book } from "@/types/book"

interface ReimageStoryProps {
  book: Book
}

export function ReimageStory({ book }: ReimageStoryProps) {
  const [activeTab, setActiveTab] = useState("length")
  const [isGenerating, setIsGenerating] = useState(false)
  const [previewText, setPreviewText] = useState<string | null>(null)
  const { toast } = useToast()

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
    { id: "scifi", name: "Science Fiction" },
    { id: "fantasy", name: "Fantasy" },
    { id: "horror", name: "Horror" },
    { id: "romance", name: "Romance" },
    { id: "mystery", name: "Mystery" },
    { id: "western", name: "Western" },
    { id: "comedy", name: "Comedy" },
    { id: "drama", name: "Drama" },
    { id: "thriller", name: "Thriller" },
    { id: "dystopian", name: "Dystopian" },
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

    // Simulate AI generation with a timeout
    setTimeout(() => {
      let previewContent = ""

      // Generate different preview text based on the active tab
      switch (activeTab) {
        case "length":
          if (lengthFactor < 50) {
            previewContent =
              "It is a truth universally acknowledged, that a single man with money wants a wife. The Bennets had five daughters. Their mother wanted them married. Bingley, a rich bachelor, moved nearby. Mrs. Bennet was excited. She wanted him to marry one of her girls."
          } else if (lengthFactor > 150) {
            previewContent =
              "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters. The Bennet family of Longbourn was no exception to this principle. With five unmarried daughters and an estate entailed away from the female line, Mrs. Bennet considered the arrival of Mr. Bingley, a wealthy bachelor of four or five thousand a year, as the most fortuitous circumstance imaginable."
          } else {
            previewContent =
              "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. The Bennet family, with five unmarried daughters, viewed the arrival of wealthy Mr. Bingley with great excitement, particularly Mrs. Bennet who immediately set her sights on him as a potential husband for one of her girls."
          }
          break

        case "genre":
          if (selectedGenre === "scifi") {
            previewContent =
              "It is a truth universally acknowledged across the galaxy, that a single humanoid in possession of a good starship, must be in want of a life-partner. The Bennet family unit, residing on the modest agricultural planet of Longbourn-7, had five unmarried female offspring whose genetic compatibility scores were rapidly approaching their expiration dates."
          } else if (selectedGenre === "horror") {
            previewContent =
              "It is a truth universally dreaded, that a single man in possession of a dark fortune, must be in want of fresh souls. The Bennet family, with five vulnerable daughters, viewed the arrival of the pale, mysterious Mr. Bingley to Netherfield Manor with a mixture of fascination and unease, unaware of the ancient hunger that drove him to seek new blood in the countryside."
          } else if (selectedGenre === "mystery") {
            previewContent =
              "It was a truth not yet discovered, that a single man in possession of a suspicious fortune, must be hiding deadly secrets. When the enigmatic Mr. Bingley arrived at Netherfield under the cover of night, the five Bennet sisters found themselves drawn into a web of intrigue that would reveal the dark underbelly of polite society."
          } else {
            previewContent = "Select a genre to see a preview of how the story might be transformed."
          }
          break

        case "time":
          if (timePeriod === "modern") {
            previewContent =
              "It is a truth universally acknowledged, that a single man in possession of a good fortune—or in this case, a tech startup valued at several billion—must be in want of a wife. The Bennet family group chat exploded with notifications when news broke that the eligible bachelor Charles Bingley had purchased the luxury estate in their neighborhood and would be attending the charity gala that weekend."
          } else if (timePeriod === "1980s") {
            previewContent =
              "It is a truth universally acknowledged, that a single man in possession of a good fortune—or in this case, a Wall Street portfolio and a sweet Porsche—must be in want of a wife. The Bennet sisters, with their big hair and shoulder pads, couldn't stop talking about the new guy, Bingley, who had just moved into the mansion on the hill and was throwing the most radical housewarming party that weekend."
          } else if (timePeriod === "farfuture") {
            previewContent =
              "It is a truth universally acknowledged across the settled planets, that a single person in possession of a good fortune—measured now in terraforming rights and antimatter reserves—must be in want of a life companion. The Bennet family collective, residing in their modest habitat pod on Earth-that-was, received the neural notification that the eligible Charles Bingley had acquired the orbital estate in their sector."
          } else {
            previewContent = "Select a time period to see a preview of how the story might be transformed."
          }
          break

        case "perspective":
          if (perspective === "first" && characterFocus === "Elizabeth Bennet") {
            previewContent =
              "I have always found it to be true, though my father jokes about it, that wealthy single men must be looking for wives. When I heard that Netherfield Park had been rented by just such a man—a Mr. Bingley with four or five thousand a year—I could not help but notice how it set my mother's matchmaking schemes into motion. With five daughters and no sons to inherit, her anxiety about our futures is understandable, if exhausting."
          } else if (perspective === "first" && characterFocus === "Mr. Darcy") {
            previewContent =
              "I came to Netherfield at Bingley's insistence, though I had little interest in country society or its amusements. The local families, I was told, were already in a state of excitement over my friend's arrival—particularly those with unmarried daughters. How tedious. I resolved to keep my distance from such obvious matchmaking, especially after glimpsing the local beauties at the assembly. One in particular, with fine eyes but decidedly inferior connections, I deemed merely tolerable, but not handsome enough to tempt me."
          } else if (perspective === "second") {
            previewContent =
              "You know it to be true, that a wealthy bachelor must be seeking a wife. You hear your mother's excited voice from downstairs as she tells your father about the young man who has taken Netherfield Park. As the second eldest of five daughters, you understand what this means—another opportunity, another potential match to secure your family's future. You sigh, closing your book, wondering if this Mr. Bingley will be any different from the other gentlemen your mother has pushed toward you and your sisters."
          } else {
            previewContent =
              "Select a perspective and character to see a preview of how the story might be transformed."
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
        description:
          "This is how your reimagined story might begin. Generate the full story to experience the complete transformation.",
      })
    }, 1500)
  }

  const handleSaveTransformation = () => {
    toast({
      title: "Transformation saved",
      description: "Your reimagined story has been saved and is ready for listening.",
    })
  }

  return (
    <div className="space-y-6">
      {/* Quick Transformation Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Button
          variant="outline"
          className="h-auto py-6 flex flex-col items-center justify-center gap-2 border-emerald-500/30 hover:bg-emerald-500/10 hover:border-emerald-500"
          onClick={() => {
            setActiveTab("length")
            setLengthFactor(30)
            handleGeneratePreview()
          }}
        >
          <div className="bg-emerald-500/20 p-2 rounded-full">
            <Clock className="h-5 w-5 text-emerald-500" />
          </div>
          <span className="font-medium">Short Version</span>
          <span className="text-xs text-muted-foreground">30% of original length</span>
        </Button>

        <Button
          variant="outline"
          className="h-auto py-6 flex flex-col items-center justify-center gap-2 border-emerald-500/30 hover:bg-emerald-500/10 hover:border-emerald-500"
          onClick={() => {
            setActiveTab("genre")
            setSelectedGenre("scifi")
            setGenreIntensity(80)
            handleGeneratePreview()
          }}
        >
          <div className="bg-emerald-500/20 p-2 rounded-full">
            <BookText className="h-5 w-5 text-emerald-500" />
          </div>
          <span className="font-medium">Sci-Fi Version</span>
          <span className="text-xs text-muted-foreground">Same story, futuristic setting</span>
        </Button>

        <Button
          variant="outline"
          className="h-auto py-6 flex flex-col items-center justify-center gap-2 border-emerald-500/30 hover:bg-emerald-500/10 hover:border-emerald-500"
          onClick={() => {
            setActiveTab("time")
            setTimePeriod("modern")
            handleGeneratePreview()
          }}
        >
          <div className="bg-emerald-500/20 p-2 rounded-full">
            <Globe className="h-5 w-5 text-emerald-500" />
          </div>
          <span className="font-medium">Modern Setting</span>
          <span className="text-xs text-muted-foreground">Set in present day</span>
        </Button>

        <Button
          variant="outline"
          className="h-auto py-6 flex flex-col items-center justify-center gap-2 border-emerald-500/30 hover:bg-emerald-500/10 hover:border-emerald-500"
          onClick={() => {
            setActiveTab("perspective")
            setPerspective("first")
            setCharacterFocus(getBookCharacters()[0])
            handleGeneratePreview()
          }}
        >
          <div className="bg-emerald-500/20 p-2 rounded-full">
            <Users className="h-5 w-5 text-emerald-500" />
          </div>
          <span className="font-medium">Main Character POV</span>
          <span className="text-xs text-muted-foreground">First-person perspective</span>
        </Button>
      </div>

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
          <Tabs defaultValue="length" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="length" className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Length</span>
              </TabsTrigger>
              <TabsTrigger value="genre" className="flex items-center">
                <BookText className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Genre</span>
              </TabsTrigger>
              <TabsTrigger value="time" className="flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Time Period</span>
              </TabsTrigger>
              <TabsTrigger value="perspective" className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Perspective</span>
              </TabsTrigger>
              <TabsTrigger value="custom" className="flex items-center">
                <Sparkles className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Custom</span>
              </TabsTrigger>
            </TabsList>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
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
                <div className="bg-muted/30 rounded-md p-4 min-h-[300px] border border-border">
                  {isGenerating ? (
                    <div className="flex items-center justify-center h-full">
                      <RefreshCw className="h-8 w-8 text-emerald-500 animate-spin" />
                    </div>
                  ) : previewText ? (
                    <div className="prose dark:prose-invert max-w-none">
                      <p>{previewText}</p>
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
