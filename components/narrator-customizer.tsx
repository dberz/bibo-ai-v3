"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Mic, Play, Pause, Save, RefreshCw, Volume2, AudioWaveformIcon as Waveform, User, Sparkles } from "lucide-react"
import { getAllVoices } from "@/lib/voices"
import type { Voice } from "@/types/voice"
import { usePlayer } from "@/lib/player/player-context"
import { setBookVoice } from "@/lib/voice-storage"

interface NarratorCustomizerProps {
  bookId: string
}

// Define the extended voice properties
interface VoiceCustomization {
  age: "young" | "middle-aged" | "elderly"
  style: "formal" | "casual" | "dramatic" | "soothing" | "energetic"
  gender: "male" | "female" | "neutral"
  accent: string
  pace: number // 0-100
  pitch: number // 0-100
  clarity: number // 0-100
  emotionality: number // 0-100
}

// Global singleton for sample playback
let globalSampleAudio: HTMLAudioElement | null = null;

export function NarratorCustomizer({ bookId }: NarratorCustomizerProps) {
  const [voices, setVoices] = useState<Voice[]>(() => getAllVoices())
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null)
  const [playingVoice, setPlayingVoice] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState("voice")
  const { toast } = useToast()
  const { setVoice } = usePlayer()

  // Voice customization state
  const [customization, setCustomization] = useState<VoiceCustomization>({
    age: "middle-aged",
    style: "formal",
    gender: "neutral",
    accent: "neutral",
    pace: 50,
    pitch: 50,
    clarity: 70,
    emotionality: 50,
  })

  // Available accents
  const accents = [
    { id: "neutral", name: "Neutral" },
    { id: "british", name: "British" },
    { id: "american", name: "American" },
    { id: "australian", name: "Australian" },
    { id: "irish", name: "Irish" },
    { id: "scottish", name: "Scottish" },
    { id: "french", name: "French" },
    { id: "german", name: "German" },
    { id: "spanish", name: "Spanish" },
    { id: "italian", name: "Italian" },
    { id: "russian", name: "Russian" },
    { id: "japanese", name: "Japanese" },
    { id: "indian", name: "Indian" },
  ]

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio()
    globalSampleAudio = audio

    // Set initial voice
    if (voices.length > 0) {
      setSelectedVoice(voices[0].id)
    }

    return () => {
      // Clean up audio element
      audio.pause()
      audio.src = ""
    }
  }, [voices])

  // Handle playing voice sample
  const handlePlaySample = (voiceId: string) => {
    if (!globalSampleAudio) {
      globalSampleAudio = new Audio();
    }

    if (playingVoice === voiceId) {
      // Stop playing
      globalSampleAudio.pause();
      globalSampleAudio.currentTime = 0;
      setPlayingVoice(null);
    } else {
      // Stop any currently playing audio
      globalSampleAudio.pause();
      globalSampleAudio.currentTime = 0;

      // Get voice sample URL
      const voice = voices.find((v) => v.id === voiceId);
      if (voice?.sampleUrl) {
        globalSampleAudio.src = voice.sampleUrl;
        globalSampleAudio.onended = () => setPlayingVoice(null);
        globalSampleAudio.play().catch((err) => {
          console.error("Error playing audio:", err);
          setPlayingVoice(null);
        });
        setPlayingVoice(voiceId);
      }
    }
  };

  // Generate a custom voice sample
  const handleGenerateCustomSample = () => {
    if (!selectedVoice) return

    setIsGenerating(true)

    // Simulate AI voice generation with a timeout
    setTimeout(() => {
      setIsGenerating(false)

      // Get base voice sample URL
      const voice = voices.find((v) => v.id === selectedVoice)
      if (voice?.sampleUrl && globalSampleAudio) {
        // In a real implementation, we would call an API to generate a custom voice sample
        // For now, we'll just play the base voice sample
        globalSampleAudio.src = voice.sampleUrl
        globalSampleAudio.onended = () => setPlayingVoice(null)
        globalSampleAudio.play().catch((err) => {
          console.error("Error playing audio:", err)
        })
        setPlayingVoice(selectedVoice)
      }

      toast({
        title: "Custom voice generated",
        description: "Your personalized narrator voice has been created. Listen to the sample to hear how it sounds.",
      })
    }, 2000)
  }

  // Save the custom voice
  const handleSaveVoice = () => {
    if (!selectedVoice) return

    // Save to local storage or database
    setBookVoice(bookId, selectedVoice)

    // Update player context
    setVoice(selectedVoice)

    toast({
      title: "Narrator saved",
      description: "Your custom narrator has been saved for this book.",
    })
  }

  // Update a specific customization property
  const updateCustomization = (key: keyof VoiceCustomization, value: any) => {
    setCustomization((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  // Quick voice presets
  const voicePresets = [
    {
      name: "Dramatic Narrator",
      icon: <Volume2 className="h-5 w-5 text-emerald-500" />,
      description: "Expressive and theatrical",
      settings: {
        style: "dramatic" as const,
        emotionality: 90,
        pace: 60,
      },
    },
    {
      name: "Soothing Storyteller",
      icon: <Volume2 className="h-5 w-5 text-emerald-500" />,
      description: "Calm and relaxing",
      settings: {
        style: "soothing" as const,
        emotionality: 40,
        pace: 40,
        pitch: 45,
      },
    },
    {
      name: "Character Voices",
      icon: <User className="h-5 w-5 text-emerald-500" />,
      description: "Distinct voices for each character",
      settings: {
        style: "dramatic" as const,
        emotionality: 80,
        clarity: 85,
      },
    },
    {
      name: "Classic Audiobook",
      icon: <Volume2 className="h-5 w-5 text-emerald-500" />,
      description: "Traditional narration style",
      settings: {
        style: "formal" as const,
        emotionality: 50,
        clarity: 90,
        pace: 50,
      },
    },
  ]

  const applyPreset = (preset: (typeof voicePresets)[0]) => {
    setCustomization((prev) => ({
      ...prev,
      ...preset.settings,
    }))
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      if (selectedVoice && globalSampleAudio) {
        const voice = voices.find((v) => v.id === selectedVoice)
        if (voice?.sampleUrl) {
          globalSampleAudio.src = voice.sampleUrl
          globalSampleAudio.play().catch(console.error)
          setPlayingVoice(selectedVoice)
        }
      }
      toast({
        title: `${preset.name} applied`,
        description: "Listen to the sample to hear how it sounds.",
      })
    }, 1500)
  }

  return (
    <div className="space-y-6">
      {/* Quick Voice Presets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {voicePresets.map((preset) => (
          <Button
            key={preset.name}
            variant="outline"
            className="h-auto py-6 flex flex-col items-center justify-center gap-2 border-emerald-500/30 hover:bg-emerald-500/10 hover:border-emerald-500"
            onClick={() => applyPreset(preset)}
          >
            <div className="bg-emerald-500/20 p-2 rounded-full">{preset.icon}</div>
            <span className="font-medium">{preset.name}</span>
            <span className="text-xs text-muted-foreground">{preset.description}</span>
          </Button>
        ))}
      </div>

      <Card className="border-emerald-500/20 shadow-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-transparent">
          <div className="flex items-center">
            <Mic className="h-5 w-5 text-emerald-500 mr-2" />
            <CardTitle>Advanced Narrator Customization</CardTitle>
          </div>
          <CardDescription>
            Fine-tune every aspect of your AI narrator's voice for a personalized listening experience
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <Tabs defaultValue="voice" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="voice" className="flex items-center">
                <Volume2 className="h-4 w-4 mr-2" />
                <span>Base Voice</span>
              </TabsTrigger>
              <TabsTrigger value="characteristics" className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>Characteristics</span>
              </TabsTrigger>
              <TabsTrigger value="advanced" className="flex items-center">
                <Waveform className="h-4 w-4 mr-2" />
                <span>Advanced</span>
              </TabsTrigger>
            </TabsList>

            <div className="space-y-6">
              <TabsContent value="voice" className="space-y-6 mt-0">
                <div>
                  <h3 className="text-lg font-medium mb-4">Select Base Voice</h3>
                  <RadioGroup value={selectedVoice || ""} onValueChange={setSelectedVoice}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {voices.map((voice) => (
                        <div
                          key={voice.id}
                          className={`flex items-start space-x-3 p-4 rounded-lg transition-all duration-300 cursor-pointer ${
                            selectedVoice === voice.id
                              ? "bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800"
                              : "hover:bg-gray-50 dark:hover:bg-gray-800/50 border border-transparent"
                          }`}
                          onClick={() => setSelectedVoice(voice.id)}
                        >
                          <RadioGroupItem value={voice.id} id={`voice-${voice.id}`} className="mt-1" />
                          <div className="grid gap-1.5 flex-1">
                            <Label htmlFor={`voice-${voice.id}`} className="font-medium text-base">
                              {voice.name}
                            </Label>
                            <p className="text-sm text-muted-foreground">{voice.description}</p>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className={`text-xs w-fit px-2 py-1 h-auto mt-1 ${
                                playingVoice === voice.id
                                  ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20"
                                  : "text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/20"
                              }`}
                              onClick={(e) => {
                                e.stopPropagation()
                                handlePlaySample(voice.id)
                              }}
                            >
                              {playingVoice === voice.id ? (
                                <>
                                  <Pause className="h-3 w-3 mr-1.5" />
                                  Stop sample
                                </>
                              ) : (
                                <>
                                  <Play className="h-3 w-3 mr-1.5" />
                                  Play sample
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              </TabsContent>

              <TabsContent value="characteristics" className="space-y-6 mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Voice Age</h3>
                      <RadioGroup
                        value={customization.age}
                        onValueChange={(value: "young" | "middle-aged" | "elderly") =>
                          updateCustomization("age", value)
                        }
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="young" id="age-young" />
                          <Label htmlFor="age-young">Young</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="middle-aged" id="age-middle" />
                          <Label htmlFor="age-middle">Middle-aged</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="elderly" id="age-elderly" />
                          <Label htmlFor="age-elderly">Elderly</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Voice Gender</h3>
                      <RadioGroup
                        value={customization.gender}
                        onValueChange={(value: "male" | "female" | "neutral") => updateCustomization("gender", value)}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="gender-male" />
                          <Label htmlFor="gender-male">Male</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="gender-female" />
                          <Label htmlFor="gender-female">Female</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="neutral" id="gender-neutral" />
                          <Label htmlFor="gender-neutral">Gender Neutral</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Narration Style</h3>
                      <RadioGroup
                        value={customization.style}
                        onValueChange={(value: "formal" | "casual" | "dramatic" | "soothing" | "energetic") =>
                          updateCustomization("style", value)
                        }
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="formal" id="style-formal" />
                          <Label htmlFor="style-formal">Formal</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="casual" id="style-casual" />
                          <Label htmlFor="style-casual">Casual</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="dramatic" id="style-dramatic" />
                          <Label htmlFor="style-dramatic">Dramatic</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="soothing" id="style-soothing" />
                          <Label htmlFor="style-soothing">Soothing</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="energetic" id="style-energetic" />
                          <Label htmlFor="style-energetic">Energetic</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Accent</h3>
                      <Select
                        value={customization.accent}
                        onValueChange={(value) => updateCustomization("accent", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select an accent" />
                        </SelectTrigger>
                        <SelectContent>
                          {accents.map((accent) => (
                            <SelectItem key={accent.id} value={accent.id}>
                              {accent.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-6 mt-0">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-md font-medium">Speaking Pace</h3>
                      <span className="text-sm font-medium">{customization.pace}%</span>
                    </div>
                    <Slider
                      value={[customization.pace]}
                      min={10}
                      max={100}
                      step={5}
                      onValueChange={(value) => updateCustomization("pace", value[0])}
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-muted-foreground">Slower</span>
                      <span className="text-xs text-muted-foreground">Faster</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-md font-medium">Voice Pitch</h3>
                      <span className="text-sm font-medium">{customization.pitch}%</span>
                    </div>
                    <Slider
                      value={[customization.pitch]}
                      min={10}
                      max={100}
                      step={5}
                      onValueChange={(value) => updateCustomization("pitch", value[0])}
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-muted-foreground">Lower</span>
                      <span className="text-xs text-muted-foreground">Higher</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-md font-medium">Clarity</h3>
                      <span className="text-sm font-medium">{customization.clarity}%</span>
                    </div>
                    <Slider
                      value={[customization.clarity]}
                      min={10}
                      max={100}
                      step={5}
                      onValueChange={(value) => updateCustomization("clarity", value[0])}
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-muted-foreground">Natural</span>
                      <span className="text-xs text-muted-foreground">Crisp</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-md font-medium">Emotionality</h3>
                      <span className="text-sm font-medium">{customization.emotionality}%</span>
                    </div>
                    <Slider
                      value={[customization.emotionality]}
                      min={10}
                      max={100}
                      step={5}
                      onValueChange={(value) => updateCustomization("emotionality", value[0])}
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-muted-foreground">Neutral</span>
                      <span className="text-xs text-muted-foreground">Expressive</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  onClick={handleGenerateCustomSample}
                  disabled={isGenerating || !selectedVoice}
                  className="flex-1"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Generating Voice...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Voice Sample
                    </>
                  )}
                </Button>

                <Button
                  onClick={handleSaveVoice}
                  disabled={!selectedVoice}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Narrator
                </Button>
              </div>
            </div>
          </Tabs>
        </CardContent>

        <CardFooter className="bg-muted/30 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-muted-foreground">
          <p>AI narration adapts to the story's tone and characters for a more immersive experience.</p>
          <Badge variant="outline" className="mt-2 sm:mt-0">
            Powered by Bibo AI
          </Badge>
        </CardFooter>
      </Card>
    </div>
  )
}
