"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { BookOpen, Sparkles } from "lucide-react"

interface CategoryToggleProps {
  selectedCategory: 'classics' | 'modern classics'
  onCategoryChange: (category: 'classics' | 'modern classics') => void
}

export function CategoryToggle({ selectedCategory, onCategoryChange }: CategoryToggleProps) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <div className="flex bg-muted rounded-lg p-1">
        <Button
          variant={selectedCategory === 'classics' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onCategoryChange('classics')}
          className="flex items-center gap-2"
        >
          <BookOpen className="h-4 w-4" />
          Classics
        </Button>
        <Button
          variant={selectedCategory === 'modern classics' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onCategoryChange('modern classics')}
          className="flex items-center gap-2"
        >
          <Sparkles className="h-4 w-4" />
          Modern Classics
        </Button>
      </div>
    </div>
  )
} 