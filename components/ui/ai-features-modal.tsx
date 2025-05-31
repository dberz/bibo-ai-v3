"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { Sparkles, BookOpen, Globe, User, Clock, Wand2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: <Clock className="h-8 w-8 text-emerald-400" />,
    title: "Short Version",
    description: "30% of original length. Get a concise summary or abridged version.",
    tab: "length",
  },
  {
    icon: <Globe className="h-8 w-8 text-blue-400" />,
    title: "Fantasy Version",
    description: "Same story, but reimagined in a magical setting.",
    tab: "genre",
  },
  {
    icon: <Wand2 className="h-8 w-8 text-pink-400" />,
    title: "Modern Setting",
    description: "Set the story in the present day for a contemporary feel.",
    tab: "time",
  },
  {
    icon: <User className="h-8 w-8 text-yellow-400" />,
    title: "Main Character POV",
    description: "Experience the story from a first-person perspective.",
    tab: "perspective",
  },
  {
    icon: <Sparkles className="h-8 w-8 text-purple-400" />,
    title: "Advanced Story Transformation",
    description: "Fine-tune length, genre, time period, and more with detailed AI controls.",
    tab: "custom",
  },
]

export function AiFeaturesModal({ 
  open, 
  onOpenChange, 
  bookId,
  initialContent 
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void; 
  bookId?: string;
  initialContent?: string;
}) {
  const handleFeatureClick = (tab: string) => {
    onOpenChange(false)
    // Small delay to ensure smooth transition
    setTimeout(() => {
      // Always navigate to Moby Dick for demo
      const url = new URL(`/book/moby-dick`, window.location.origin);
      url.hash = `story-transform-${tab}`;
      if (initialContent) {
        url.searchParams.set('content', encodeURIComponent(initialContent));
      }
      window.location.href = url.toString();
    }, 100)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl p-8 bg-background shadow-2xl border border-emerald-500/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-heading">
            <Sparkles className="h-7 w-7 text-emerald-400" /> Try AI Features
          </DialogTitle>
          <DialogDescription className="mt-2 text-base text-muted-foreground">
            Instantly reimagine classic books with the power of AI. Choose a transformation below to get started:
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-5 mt-6">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-center gap-4 p-4 rounded-lg bg-muted/40">
              <div>{feature.icon}</div>
              <div className="flex-1">
                <div className="font-semibold text-lg">{feature.title}</div>
                <div className="text-sm text-muted-foreground">{feature.description}</div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleFeatureClick(feature.tab)}
              >
                Try Now
              </Button>
            </div>
          ))}
        </div>
        <DialogClose asChild>
          <Button className="mt-6 w-full" variant="secondary">Close</Button>
        </DialogClose>
        <Button
          className="mt-2 w-full"
          variant="default"
          onClick={() => {
            onOpenChange(false)
            setTimeout(() => {
              window.location.href = `/book/moby-dick#story-transform`
            }, 100)
          }}
        >
          Try More
        </Button>
      </DialogContent>
    </Dialog>
  )
} 