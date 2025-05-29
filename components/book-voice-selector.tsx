"use client"

import { useState, useEffect } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import { getAllVoices } from "@/lib/voices"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Voice } from "@/types/voice"
import { Play, Pause, Volume2 } from "lucide-react"

interface BookVoiceSelectorProps {
  bookId: string
}

// Global singleton for sample playback
let globalSampleAudio: HTMLAudioElement | null = null;

export function BookVoiceSelector({ bookId }: BookVoiceSelectorProps) {
  const [voices, setVoices] = useState<Voice[]>(() => getAllVoices())
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null)
  const [defaultVoice, setDefaultVoice] = useState<string | null>(null)
  const [playingVoice, setPlayingVoice] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const supabase = createClientComponentClient()
  const { toast } = useToast()

  // Fetch user's voice preferences on component mount
  useEffect(() => {
    async function fetchVoicePreferences() {
      try {
        setLoading(true)

        // Get current user
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          setLoading(false)
          return
        }

        // Get user's default voice preference
        const { data: preferences, error: prefError } = await supabase
          .from("user_preferences")
          .select("preferred_voice_id")
          .eq("user_id", user.id)
          .single()

        if (prefError && prefError.code !== "PGRST116") {
          console.error("Error fetching default voice preference:", prefError)
        }

        if (preferences?.preferred_voice_id) {
          setDefaultVoice(preferences.preferred_voice_id)
        } else {
          // Default to first voice if no preference is set
          setDefaultVoice(voices[0]?.id || null)
        }

        // Get book-specific voice preference if it exists
        const { data: bookPreference, error: bookError } = await supabase
          .from("book_voice_preferences")
          .select("voice_id")
          .eq("user_id", user.id)
          .eq("book_id", bookId)
          .single()

        if (bookError && bookError.code !== "PGRST116") {
          console.error("Error fetching book voice preference:", bookError)
        }

        // Set selected voice to book preference if it exists, otherwise use default
        if (bookPreference?.voice_id) {
          setSelectedVoice(bookPreference.voice_id)
        } else {
          setSelectedVoice(preferences?.preferred_voice_id || voices[0]?.id || null)
        }
      } catch (error) {
        console.error("Error:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchVoicePreferences()
  }, [supabase, bookId, voices])

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

  // Save book-specific voice preference
  const handleSave = async () => {
    if (!selectedVoice) return

    try {
      setSaving(true)

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to save your preferences",
          variant: "destructive",
        })
        return
      }

      // Check if we're using the default voice
      const usingDefaultVoice = selectedVoice === defaultVoice

      if (usingDefaultVoice) {
        // If using default voice, delete any book-specific preference
        const { error } = await supabase
          .from("book_voice_preferences")
          .delete()
          .eq("user_id", user.id)
          .eq("book_id", bookId)

        if (error) throw error
      } else {
        // Otherwise, upsert book-specific preference
        const { error } = await supabase.from("book_voice_preferences").upsert({
          user_id: user.id,
          book_id: bookId,
          voice_id: selectedVoice,
          updated_at: new Date().toISOString(),
        })

        if (error) throw error
      }

      toast({
        title: "Voice preference saved",
        description: usingDefaultVoice
          ? "This book will now use your default voice"
          : "Your voice preference for this book has been saved",
        variant: "default",
      })
    } catch (error) {
      console.error("Error saving preference:", error)
      toast({
        title: "Failed to save preference",
        description: "There was an error saving your voice preference",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  // Reset to default voice
  const handleResetToDefault = () => {
    setSelectedVoice(defaultVoice)
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-4 w-32" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-start space-x-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          ))}
        </div>
        <Skeleton className="h-9 w-24" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium flex items-center">
          <Volume2 className="mr-2 h-5 w-5 text-emerald-500" />
          Choose Voice for This Book
        </h3>

        {selectedVoice !== defaultVoice && (
          <Button variant="outline" size="sm" onClick={handleResetToDefault} className="text-xs">
            Reset to Default
          </Button>
        )}
      </div>

      <RadioGroup value={selectedVoice || undefined} onValueChange={setSelectedVoice} className="space-y-4">
        {voices.map((voice) => (
          <div
            key={voice.id}
            className={`flex items-start space-x-3 p-4 rounded-lg transition-all duration-300 ${
              selectedVoice === voice.id
                ? "bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800"
                : "hover:bg-gray-50 dark:hover:bg-gray-800/50 border border-transparent"
            }`}
          >
            <RadioGroupItem value={voice.id} id={`book-${voice.id}`} className="mt-1" />
            <div className="grid gap-1.5 flex-1">
              <Label htmlFor={`book-${voice.id}`} className="font-medium text-base">
                {voice.name}
                {voice.id === defaultVoice && (
                  <span className="ml-2 inline-flex items-center text-xs font-medium text-gray-500 dark:text-gray-400">
                    (Your Default)
                  </span>
                )}
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
                onClick={() => handlePlaySample(voice.id)}
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
      </RadioGroup>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={handleSave} disabled={saving || !selectedVoice} className="w-full sm:w-auto">
          {saving ? "Saving..." : "Save Voice for This Book"}
        </Button>

        <Button
          variant="outline"
          onClick={() => setSelectedVoice(defaultVoice)}
          disabled={selectedVoice === defaultVoice}
          className="w-full sm:w-auto"
        >
          Use Default Voice
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        You can set a specific voice for this book or use your default voice preference.
      </p>
    </div>
  )
}
