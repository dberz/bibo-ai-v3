import { promises as fs } from 'fs';
import path from 'path';

/**
 * Calls the text-to-speech service to generate audio for the given text
 * @param text The text to convert to speech
 * @param voiceId The ID of the voice to use
 * @returns A URL to the generated audio stream
 */

// Helper to generate a cache key from book content and voice
function getCacheKey(text: string, voiceId: string): string {
  // Use first 100 chars of text + voice ID as filename
  const textHash = text.slice(0, 100).replace(/[^a-z0-9]/gi, '_').toLowerCase();
  return `${textHash}_${voiceId}.mp3`;
}

export async function callTTS(text: string, voiceId: string): Promise<string> {
  try {
    const response = await fetch('/api/tts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, voiceId }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to generate speech');
    }

    const { url } = await response.json();
    return url;
  } catch (error) {
    console.error('TTS Error:', error);
    throw error;
  }
}
