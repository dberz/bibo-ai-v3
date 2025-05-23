"use client"

import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { getAllVoices } from "@/lib/voices"
import type { Voice } from "@/types/voice"
import { Play, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function VoiceSelector() {
  const [voices, setVoices] = useState<Voice[]>(() => getAllVoices())
  const [selectedVoice, setSelectedVoice] = useState("emily-bright")
  const [playingVoice, setPlayingVoice] = useState<string | null>(null)

  const handlePlaySample = (voiceId: string) => {
    if (playingVoice === voiceId) {
      setPlayingVoice(null)
    } else {
      setPlayingVoice(voiceId)
      // In a real app, this would play the audio sample
      setTimeout(() => setPlayingVoice(null), 3000)
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium flex items-center">
        <Volume2 className="mr-2 h-5 w-5 text-emerald-500" />
        Choose a Voice
      </h3>

      <RadioGroup
        value={selectedVoice}
        onValueChange={setSelectedVoice}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
      >
        {voices.map((voice) => (
          <div
            key={voice.id}
            className={`flex items-start space-x-2 p-3 rounded-lg transition-all duration-300 ${
              selectedVoice === voice.id ? "bg-emerald-500/10 border border-emerald-500/30" : "hover:bg-card/60"
            }`}
          >
            <RadioGroupItem value={voice.id} id={voice.id} className="mt-1" />
            <div className="grid gap-1.5 flex-1">
              <Label htmlFor={voice.id} className="font-medium cursor-pointer">
                {voice.name}
              </Label>
              <p className="text-sm text-muted-foreground">{voice.description}</p>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-emerald-500 hover:text-emerald-600 hover:bg-emerald-500/10 p-0 h-auto mt-1 justify-start"
                onClick={(e) => {
                  e.preventDefault()
                  handlePlaySample(voice.id)
                }}
              >
                <Play className={`h-3 w-3 mr-1 ${playingVoice === voice.id ? "animate-pulse" : ""}`} />
                {playingVoice === voice.id ? "Playing..." : "Play sample"}
              </Button>
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}
