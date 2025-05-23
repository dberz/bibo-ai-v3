"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Sparkles, Brain, Wand2, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePlayer } from "@/lib/player/use-player"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

const versions = [
  {
    id: "original",
    name: "Original",
    description: "The classic version as written by the author",
    icon: BookOpen,
    color: "bg-blue-500",
  },
  {
    id: "modern",
    name: "Modern Adaptation",
    description: "Updated with contemporary language and references",
    icon: Wand2,
    color: "bg-purple-500",
  },
  {
    id: "simplified",
    name: "Simplified",
    description: "Easier to understand with simpler language",
    icon: Brain,
    color: "bg-emerald-500",
  },
]

export function VersionSelector() {
  const { currentRewriteId, setRewrite } = usePlayer()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mb-8">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="versions">
          <AccordionTrigger className="flex items-center gap-2 text-lg font-heading">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            AI-Powered Adaptations
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-4 p-4">
              <p className="text-sm text-muted-foreground font-body">
                Experience this classic reimagined through AI. Choose from different adaptations while maintaining the original story's essence.
              </p>
              <div className="grid gap-3">
                {versions.map((version) => {
                  const isSelected = currentRewriteId === version.id
                  return (
                    <button
                      key={version.id}
                      className={cn(
                        "relative flex items-start gap-4 rounded-lg border p-4 hover:bg-accent transition-colors",
                        isSelected && "border-emerald-500/50 bg-emerald-500/5"
                      )}
                      onClick={() => setRewrite(version.id)}
                    >
                      <div className={cn(
                        "rounded-full p-2 text-white",
                        version.color
                      )}>
                        <version.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="font-heading font-medium flex items-center gap-2">
                          {version.name}
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="h-2 w-2 rounded-full bg-emerald-500"
                            />
                          )}
                        </h3>
                        <p className="text-sm text-muted-foreground font-body">
                          {version.description}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
} 