"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import type { Book } from "@/types/book"
import { makeStoryClip } from "@/lib/ai/visual"

interface StoryClipWizardProps {
  book: Book
}

export function StoryClipWizard({ book }: StoryClipWizardProps) {
  const [selectedText, setSelectedText] = useState("")
  const [clipDuration, setClipDuration] = useState(15)
  const [isGenerating, setIsGenerating] = useState(false)
  const [clipUrl, setClipUrl] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!selectedText) return

    setIsGenerating(true)
    try {
      const url = await makeStoryClip(selectedText)
      setClipUrl(url)
    } catch (error) {
      console.error("Error generating clip:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium mb-2">1. Select a passage (max 320 characters)</h2>
        <Textarea
          value={selectedText}
          onChange={(e) => setSelectedText(e.target.value)}
          placeholder="Enter or paste a passage from the book..."
          className="h-32"
          maxLength={320}
        />
        <p className="text-sm text-muted-foreground mt-2">{selectedText.length}/320 characters</p>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-2">2. Adjust clip duration</h2>
        <div className="flex items-center space-x-4">
          <Slider
            value={[clipDuration]}
            min={5}
            max={15}
            step={1}
            onValueChange={(value) => setClipDuration(value[0])}
            className="w-64"
          />
          <span>{clipDuration} seconds</span>
        </div>
      </div>

      <Button onClick={handleGenerate} disabled={!selectedText || isGenerating} className="w-full">
        {isGenerating ? "Generating..." : "Generate StoryClip"}
      </Button>

      {clipUrl && (
        <div className="mt-8">
          <h2 className="text-lg font-medium mb-4">Your StoryClip</h2>
          <div className="aspect-[9/16] max-w-[320px] mx-auto bg-black rounded-lg overflow-hidden">
            <video
              src={clipUrl}
              controls
              className="w-full h-full"
              poster={`/placeholder.svg?height=640&width=360&query=AI generated visualization of book passage`}
            />
          </div>

          <div className="flex justify-center mt-4">
            <Button variant="outline">Download Clip</Button>
          </div>
        </div>
      )}
    </div>
  )
}
