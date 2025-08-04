"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AiFeaturesModal } from "@/components/ui/ai-features-modal"
import { Sparkles, Wand2 } from "lucide-react"
import { motion } from "framer-motion"
import { usePlayer } from "@/lib/player/player-context"
import { usePathname } from "next/navigation"

export function FloatingAiButton() {
  const [aiModalOpen, setAiModalOpen] = useState(false)
  const { currentBook } = usePlayer()
  const pathname = usePathname()

  // Detect if we're on a book detail page and extract the book ID
  const [currentBookId, setCurrentBookId] = useState<string | undefined>(undefined)
  
  useEffect(() => {
    // Extract book ID from URL if we're on a book detail page
    const bookMatch = pathname.match(/^\/book\/([^\/]+)$/)
    if (bookMatch) {
      setCurrentBookId(bookMatch[1])
    } else {
      setCurrentBookId(undefined)
    }
  }, [pathname])

  // Position above audio player if it's visible, otherwise above bottom navigation
  const bottomPosition = currentBook ? "bottom-32" : "bottom-20"

  return (
    <>
      <motion.div
        className={`fixed ${bottomPosition} right-4 z-50`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Button
          onClick={() => setAiModalOpen(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-4 py-2 h-auto"
          size="sm"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">✨ Try AI Remix</span>
          <span className="sm:hidden">✨ AI</span>
        </Button>
      </motion.div>
      
      <AiFeaturesModal 
        open={aiModalOpen} 
        onOpenChange={setAiModalOpen} 
        bookId={currentBookId}
        initialContent={currentBook?.description}
      />
    </>
  )
} 