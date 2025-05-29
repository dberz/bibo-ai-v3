"use client"

import { useState, useEffect } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { getAllVoices } from "@/lib/voices"
import type { Voice } from "@/types/voice"
import { usePlayer } from "@/lib/player/player-context"
import { Play, Pause, Check, Volume2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { getVoicePreferences, setDefaultVoice } from "@/lib/voice-storage"

// Global singleton for sample playback
let globalSampleAudio: HTMLAudioElement | null = null;

export function VoicePreference() {
  const [voices, setVoices] = useState<Voice[]>(() => getAllVoices())
  const { currentVoiceId, setVoice } = usePlayer()
  const [selectedVoice, setSelectedVoice] = useState(currentVoiceId)
  const [playingVoice, setPlayingVoice] = useState<string | null>(null)
  const { toast } = useToast()

  // Load saved preferences on mount
  useEffect(() => {
    const preferences = getVoicePreferences()
    setSelectedVoice(preferences.defaultVoiceId)
    setVoice(preferences.defaultVoiceId)
  }, [setVoice])

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

  const handleSave = () => {
    // Save to local storage
    setDefaultVoice(selectedVoice)

    // Update player context
    setVoice(selectedVoice)

    // Show success message
    const selectedVoiceName = voices.find((v) => v.id === selectedVoice)?.name
    toast({
      title: "Voice preference saved",
      description: `${selectedVoiceName} is now your default voice`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium flex items-center">
          <Volume2 className="mr-2 h-5 w-5 text-emerald-500" />
          Choose Your Default Voice
        </h3>
      </div>

      <RadioGroup value={selectedVoice} onValueChange={setSelectedVoice} className="space-y-4">
        {voices.map((voice) => (
          <div
            key={voice.id}
            className={`flex items-start space-x-3 p-4 rounded-lg transition-all duration-300 ${
              selectedVoice === voice.id
                ? "bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800"
                : "hover:bg-gray-50 dark:hover:bg-gray-800/50 border border-transparent"
            }`}
          >
            <RadioGroupItem value={voice.id} id={`pref-${voice.id}`} className="mt-1" />
            <div className="grid gap-1.5 flex-1">
              <Label htmlFor={`pref-${voice.id}`} className="font-medium text-base">
                {voice.name}
                {selectedVoice === voice.id && (
                  <span className="ml-2 inline-flex items-center text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    <Check className="mr-1 h-3 w-3" /> Selected
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

      <Button onClick={handleSave} className="w-full sm:w-auto">
        Save as Default Voice
      </Button>

      <p className="text-xs text-muted-foreground">
        Your default voice will be used for all audiobooks unless you choose a different voice for a specific book.
      </p>
    </div>
  )
}
