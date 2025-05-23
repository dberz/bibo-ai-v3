import type { Voice } from "@/types/voice"

// Mock data for voices
const voices: Voice[] = [
  {
    id: "emily-bright",
    name: "Emily Bright",
    description: "Energetic and clear female voice, perfect for contemporary fiction",
    sampleUrl: "/samples/voices/emily-bright.mp3",
  },
  {
    id: "morgan-calm",
    name: "Morgan Calm",
    description: "Soothing gender-neutral voice, ideal for relaxing listening",
    sampleUrl: "/samples/voices/morgan-calm.mp3",
  },
  {
    id: "li-warm",
    name: "Li Warm",
    description: "Warm and expressive voice with slight accent, great for diverse stories",
    sampleUrl: "/samples/voices/li-warm.mp3",
  },
  {
    id: "riley-story",
    name: "Riley Storyteller",
    description: "Dramatic and engaging, perfect for adventure and mystery",
    sampleUrl: "/samples/voices/riley-story.mp3",
  },
  {
    id: "james-classic",
    name: "James Classic",
    description: "Traditional male narrator with rich tone, ideal for classics",
    sampleUrl: "/samples/voices/james-classic.mp3",
  },
  {
    id: "james-future",
    name: "James Future",
    description: "Modern take on the classic James voice with enhanced clarity",
    sampleUrl: "/samples/voices/james-future.mp3",
  },
]

export function getAllVoices(): Voice[] {
  return voices
}

export function getVoiceById(id: string): Voice | undefined {
  return voices.find((voice) => voice.id === id)
}
