import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

// Helper to generate a cache key from book content and voice
function getCacheKey(text: string, voiceId: string): string {
  // Use first 100 chars of text + voice ID as filename
  const textHash = text.slice(0, 100).replace(/[^a-z0-9]/gi, '_').toLowerCase();
  return `${textHash}_${voiceId}.mp3`;
}

export async function POST(request: Request) {
  try {
    const { text, voiceId } = await request.json();
    
    // Check if we have a cached version
    const cacheKey = getCacheKey(text, voiceId);
    const cachePath = path.join(process.cwd(), 'public', 'tts', cacheKey);
    
    try {
      // Try to read from cache first
      await fs.access(cachePath);
      console.log('[TTS] Using cached audio file:', cacheKey);
      return NextResponse.json({ url: `/tts/${cacheKey}` });
    } catch (err) {
      // No cached version, generate new audio
      console.log('[TTS] Generating new audio for:', cacheKey);
    }

    // Ensure tts directory exists
    const ttsDir = path.join(process.cwd(), 'public', 'tts');
    try {
      await fs.access(ttsDir);
    } catch {
      await fs.mkdir(ttsDir, { recursive: true });
    }

    // Call OpenAI TTS API
    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'tts-1',
        input: text,
        voice: voiceId,
        response_format: 'mp3',
      }),
    });

    if (!response.ok) {
      throw new Error(`TTS API error: ${response.statusText}`);
    }

    // Get the audio data
    const audioData = await response.arrayBuffer();
    
    // Save to cache
    await fs.writeFile(cachePath, new Uint8Array(audioData));
    console.log('[TTS] Saved audio to cache:', cacheKey);

    // Return the public URL
    return NextResponse.json({ url: `/tts/${cacheKey}` });
  } catch (error) {
    console.error('TTS Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate speech' },
      { status: 500 }
    );
  }
} 