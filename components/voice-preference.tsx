"use client"

import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { getAllVoices } from "@/lib/voices"
import type { Voice } from "@/types/voice"
import { usePlayer } from "@/lib/player/use-player"

export function VoicePreference() {
  const [voices, setVoices] = useState<Voice[]>(() => getAllVoices())
  const { currentVoiceId, setVoice } = usePlayer()
  const [selectedVoice, setSelectedVoice] = useState(currentVoiceId)

  const handleSave = () => {
    setVoice(selectedVoice)
  }

  return (
    <div className="space-y-4">
      <RadioGroup value={selectedVoice} onValueChange={setSelectedVoice} className="space-y-3">
        {voices.map((voice) => (
          <div key={voice.id} className="flex items-start space-x-2">
            <RadioGroupItem value={voice.id} id={`pref-${voice.id}`} />
            <div className="grid gap-1.5">
              <Label htmlFor={`pref-${voice.id}`} className="font-medium">
                {voice.name}
              </Label>
              <p className="text-sm text-muted-foreground">{voice.description}</p>
              <button
                className="text-xs text-emerald-500 hover:underline mt-1"
                onClick={(e) => {
                  e.preventDefault()
                  // Play sample
                }}
              >
                Play sample
              </button>
            </div>
          </div>
        ))}
      </RadioGroup>

      <Button onClick={handleSave}>Save Preference</Button>
    </div>
  )
}
