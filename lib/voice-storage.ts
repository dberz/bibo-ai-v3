"use client"

/**
 * Local storage utilities for voice preferences
 */

export interface VoicePreferences {
  defaultVoiceId: string
  bookVoicePreferences: Record<string, string> // bookId -> voiceId
}

const STORAGE_KEY = "bibo-voice-preferences"

export function getVoicePreferences(): VoicePreferences {
  if (typeof window === "undefined") {
    return {
      defaultVoiceId: "emily-bright",
      bookVoicePreferences: {},
    }
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error("Error reading voice preferences:", error)
  }

  return {
    defaultVoiceId: "emily-bright",
    bookVoicePreferences: {},
  }
}

export function saveVoicePreferences(preferences: VoicePreferences): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences))
  } catch (error) {
    console.error("Error saving voice preferences:", error)
  }
}

export function setDefaultVoice(voiceId: string): void {
  const preferences = getVoicePreferences()
  preferences.defaultVoiceId = voiceId
  saveVoicePreferences(preferences)
}

export function setBookVoice(bookId: string, voiceId: string): void {
  const preferences = getVoicePreferences()
  preferences.bookVoicePreferences[bookId] = voiceId
  saveVoicePreferences(preferences)
}

export function getBookVoice(bookId: string): string {
  const preferences = getVoicePreferences()
  return preferences.bookVoicePreferences[bookId] || preferences.defaultVoiceId
}

export function removeBookVoice(bookId: string): void {
  const preferences = getVoicePreferences()
  delete preferences.bookVoicePreferences[bookId]
  saveVoicePreferences(preferences)
}
