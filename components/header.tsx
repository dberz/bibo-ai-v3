"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { FeedbackModal } from "@/components/ui/feedback-modal"
import { Menu } from "lucide-react"

export function Header() {
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
        <div className="flex justify-between items-center w-full sm:w-auto">
          <Link href="/" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Image 
              src="/bibo-logo-header.svg" 
              alt="Bibo" 
              width={32} 
              height={32} 
              className="w-8 h-8"
            />
            <div className="flex items-baseline gap-1">
              <span className="font-gelica text-2xl">Bibo</span>
              <span className="font-gelica-light text-xl text-muted-foreground">audiobooks</span>
            </div>
          </Link>
          <button className="sm:hidden p-2" onClick={() => setMobileMenuOpen(v => !v)} aria-label="Open menu">
            <Menu className="h-6 w-6" />
          </button>
        </div>
        <nav className={`flex-col sm:flex-row flex gap-2 sm:gap-4 items-start sm:items-center w-full sm:w-auto ${mobileMenuOpen ? 'flex' : 'hidden'} sm:flex bg-background sm:bg-transparent p-2 sm:p-0 rounded-md sm:rounded-none shadow sm:shadow-none`}>
          <Button variant="ghost" size="sm" className="w-full sm:w-auto text-left" onClick={() => setFeedbackModalOpen(true)}>
            Give Feedback
          </Button>
        </nav>
      </header>
      <FeedbackModal open={feedbackModalOpen} onOpenChange={setFeedbackModalOpen} />
    </>
  )
} 