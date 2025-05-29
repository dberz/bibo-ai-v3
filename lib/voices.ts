import type { Voice } from "@/types/voice"

// OpenAI-supported voices only
const voices: Voice[] = [
  {
    id: "nova",
    name: "Nova",
    description: "Expressive, modern female voice (OpenAI)",
    sampleUrl: "/samples/voices/nova.mp3",
  },
  {
    id: "shimmer",
    name: "Shimmer",
    description: "Bright, clear female voice (OpenAI)",
    sampleUrl: "/samples/voices/shimmer.mp3",
  },
  {
    id: "echo",
    name: "Echo",
    description: "Warm, neutral male voice (OpenAI)",
    sampleUrl: "/samples/voices/echo.mp3",
  },
  {
    id: "onyx",
    name: "Onyx",
    description: "Deep, rich male voice (OpenAI)",
    sampleUrl: "/samples/voices/onyx.mp3",
  },
  {
    id: "fable",
    name: "Fable",
    description: "Storyteller, whimsical voice (OpenAI)",
    sampleUrl: "/samples/voices/fable.mp3",
  },
  {
    id: "alloy",
    name: "Alloy",
    description: "Balanced, classic narrator (OpenAI)",
    sampleUrl: "/samples/voices/alloy.mp3",
  },
  {
    id: "ash",
    name: "Ash",
    description: "Soft, gentle voice (OpenAI)",
    sampleUrl: "/samples/voices/ash.mp3",
  },
  {
    id: "sage",
    name: "Sage",
    description: "Calm, wise voice (OpenAI)",
    sampleUrl: "/samples/voices/sage.mp3",
  },
  {
    id: "coral",
    name: "Coral",
    description: "Friendly, upbeat voice (OpenAI)",
    sampleUrl: "/samples/voices/coral.mp3",
  },
]

export function getAllVoices(): Voice[] {
  return voices
}

export function getVoiceById(id: string): Voice | undefined {
  return voices.find((voice) => voice.id === id)
}
