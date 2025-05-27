"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AiFeaturesModal } from "@/components/ui/ai-features-modal"
import { FeedbackModal } from "@/components/ui/feedback-modal"

export function HeaderWithAiModal() {
  const [aiModalOpen, setAiModalOpen] = useState(false)
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b p-4 flex justify-between items-center">
        <Link href="/" className="flex items-baseline gap-2
         hover:text-primary transition-colors">
          <span className="font-gelica text-2xl">Bibo</span>
          <span className="font-gelica-light text-xl text-muted-foreground">audiobooks</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            Library
          </Button>
          <Link href="/my-books">
            <Button variant="ghost" size="sm">
              My Books
            </Button>
          </Link>
          <Button variant="ghost" size="sm" onClick={() => setFeedbackModalOpen(true)}>
            Give Feedback
          </Button>
          <Button variant="default" size="sm" onClick={() => setAiModalOpen(true)}>
            Try AI Features
          </Button>
        </nav>
      </header>
      <AiFeaturesModal open={aiModalOpen} onOpenChange={setAiModalOpen} />
      <FeedbackModal open={feedbackModalOpen} onOpenChange={setFeedbackModalOpen} />
    </>
  )
} 