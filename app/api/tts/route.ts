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
    
    // Check if we have a cached version (only in local development)
    const cacheKey = getCacheKey(text, voiceId);
    const cachePath = path.join(process.cwd(), 'public', 'tts', cacheKey);
    
    try {
      // Try to read from cache first
      await fs.access(cachePath);
      return NextResponse.json({ url: `/tts/${cacheKey}` });
    } catch (err) {
      // No cached version, generate new audio
    }

    // Ensure tts directory exists (only in local development)
    const ttsDir = path.join(process.cwd(), 'public', 'tts');
    try {
      await fs.access(ttsDir);
    } catch {
      try {
        await fs.mkdir(ttsDir, { recursive: true });
      } catch (mkdirError) {
        // Directory creation failed, continue without caching
      }
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
    
    // Try to save to cache, fallback to data URL if it fails
    try {
      await fs.writeFile(cachePath, new Uint8Array(audioData));
      return NextResponse.json({ url: `/tts/${cacheKey}` });
    } catch (fsError) {
      // If file system operations fail (e.g., on Vercel), return a data URL
      const base64Audio = Buffer.from(audioData).toString('base64');
      const dataUrl = `data:audio/mp3;base64,${base64Audio}`;
      return NextResponse.json({ url: dataUrl });
    }
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate speech' },
      { status: 500 }
    );
  }
} 