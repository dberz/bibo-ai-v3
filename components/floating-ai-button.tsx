"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AiFeaturesModal } from "@/components/ui/ai-features-modal"
import { Sparkles, Wand2 } from "lucide-react"
import { motion } from "framer-motion"

export function FloatingAiButton() {
  const [aiModalOpen, setAiModalOpen] = useState(false)

  return (
    <>
      <motion.div
        className="fixed bottom-32 right-4 z-50"
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
      
      <AiFeaturesModal open={aiModalOpen} onOpenChange={setAiModalOpen} />
    </>
  )
} 