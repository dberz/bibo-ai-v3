"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getRewritesByBookId } from "@/lib/rewrites"
import type { Rewrite } from "@/types/rewrite"
import { motion } from "framer-motion"

interface RewriteSelectorProps {
  bookId: string
}

export function RewriteSelector({ bookId }: RewriteSelectorProps) {
  const [rewrites, setRewrites] = useState<Rewrite[]>(() => getRewritesByBookId(bookId))
  const [selectedRewrite, setSelectedRewrite] = useState("original")
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)

  // Group rewrites into sets of 10 for the tabs
  const rewriteGroups = [
    { id: "original", name: "Original" },
    { id: "james-1-10", name: "James 1-10" },
    { id: "james-11-20", name: "James 11-20" },
    { id: "james-21-30", name: "James 21-30" },
    { id: "james-31-40", name: "James 31-40" },
    { id: "james-41-50", name: "James 41-50" },
  ]

  return (
    <Card className="border-emerald-500/20 shadow-lg">
      <Tabs defaultValue="original" onValueChange={setSelectedRewrite}>
        <TabsList className="w-full grid grid-cols-3 md:grid-cols-6 p-1 bg-muted/50">
          {rewriteGroups.map((group) => (
            <TabsTrigger
              key={group.id}
              value={group.id}
              className={`relative ${selectedRewrite === group.id ? "text-emerald-500" : ""}`}
            >
              {group.name}
              {selectedRewrite === group.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {rewriteGroups.map((group) => (
          <TabsContent key={group.id} value={group.id} className="p-4">
            {group.id === "original" ? (
              <div className="prose dark:prose-invert max-w-none">
                <p>
                  This is the original text as written by the author, preserving the classic style and language of the
                  period.
                </p>
                <blockquote className="italic border-l-4 border-emerald-500 pl-4 my-4 bg-emerald-500/5 p-3 rounded-r-md">
                  "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in
                  want of a wife."
                </blockquote>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Select from AI-generated rewrites in the style of "James #{group.id.split("-")[1]}-
                  {group.id.split("-")[2]}". Each rewrite preserves the original meaning but with a different voice and
                  style.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {Array.from({ length: 10 }, (_, i) => {
                    const num = Number.parseInt(group.id.split("-")[1]) + i
                    const styleId = `james-${num}`
                    return (
                      <Card
                        key={styleId}
                        className={`cursor-pointer transition-all duration-300 ${
                          selectedStyle === styleId
                            ? "border-emerald-500 bg-emerald-500/10"
                            : "hover:border-emerald-500/50 hover:bg-emerald-500/5"
                        }`}
                        onClick={() => setSelectedStyle(styleId)}
                      >
                        <CardContent className="p-3 text-center">James #{num}</CardContent>
                      </Card>
                    )
                  })}
                </div>

                {selectedStyle && (
                  <motion.div
                    className="mt-4 p-3 bg-card rounded-md border border-emerald-500/20"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-sm font-medium mb-2">Sample:</p>
                    <p className="italic text-muted-foreground">
                      "It's widely known that a wealthy bachelor is definitely looking for a wife. (James variant #
                      {selectedStyle.split("-")[1]})"
                    </p>
                  </motion.div>
                )}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  )
}
