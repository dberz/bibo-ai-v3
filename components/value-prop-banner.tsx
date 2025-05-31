"use client"

import { Sparkles, Headphones, Wand2 } from "lucide-react"

export function ValuePropBanner() {
  return (
    <div className="bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 border-b border-emerald-500/20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Headphones className="h-4 w-4 text-emerald-500" />
          <span className="font-medium">Free, ad-supported audiobooks</span>
          <span className="text-muted-foreground/60">+</span>
          <Wand2 className="h-4 w-4 text-purple-500" />
          <span className="font-medium">AI remixes</span>
        </div>
      </div>
    </div>
  )
} 