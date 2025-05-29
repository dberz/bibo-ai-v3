"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AiFeaturesModal } from "@/components/ui/ai-features-modal"
import { FeedbackModal } from "@/components/ui/feedback-modal"
import { Menu } from "lucide-react"

export function HeaderWithAiModal() {
  const [aiModalOpen, setAiModalOpen] = useState(false)
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
        <div className="flex justify-between items-center w-full sm:w-auto">
          <Link href="/" className="flex items-baseline gap-2 hover:text-primary transition-colors">
            <span className="font-gelica text-2xl">Bibo</span>
            <span className="font-gelica-light text-xl text-muted-foreground">audiobooks</span>
          </Link>
          <button className="sm:hidden p-2" onClick={() => setMobileMenuOpen(v => !v)} aria-label="Open menu">
            <Menu className="h-6 w-6" />
          </button>
        </div>
        <nav className={`flex-col sm:flex-row flex gap-2 sm:gap-4 items-start sm:items-center w-full sm:w-auto ${mobileMenuOpen ? 'flex' : 'hidden'} sm:flex bg-background sm:bg-transparent p-2 sm:p-0 rounded-md sm:rounded-none shadow sm:shadow-none`}>
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="ghost" size="sm" className="w-full sm:w-auto text-left">Library</Button>
          </Link>
          <Link href="/my-books" className="w-full sm:w-auto">
            <Button variant="ghost" size="sm" className="w-full sm:w-auto text-left">My Books</Button>
          </Link>
          <Button variant="ghost" size="sm" className="w-full sm:w-auto text-left" onClick={() => setFeedbackModalOpen(true)}>
            Give Feedback
          </Button>
          <Button variant="default" size="sm" className="w-full sm:w-auto text-left" onClick={() => setAiModalOpen(true)}>
            Try AI Features
          </Button>
        </nav>
      </header>
      <AiFeaturesModal open={aiModalOpen} onOpenChange={setAiModalOpen} />
      <FeedbackModal open={feedbackModalOpen} onOpenChange={setFeedbackModalOpen} />
    </>
  )
} 