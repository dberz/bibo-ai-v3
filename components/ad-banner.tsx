"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { getAd } from "@/lib/ai/ads"
import type { Ad } from "@/types/ad"
import { trackAdImpression } from "@/lib/analytics"
import { motion } from "framer-motion"

export function AdBanner() {
  const [ad, setAd] = useState<Ad | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Simulate ad loading
    const loadAd = async () => {
      const newAd = await getAd("book-1", "segment-1", "user-1")
      setAd(newAd)
      setIsVisible(true)

      if (newAd) {
        trackAdImpression(newAd.id)
      }
    }

    loadAd()

    // Hide ad after audio ad finishes
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 15000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible || !ad) return null

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="border-emerald-500/30 shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-500/10 to-transparent p-0.5">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="w-full md:w-1/3 overflow-hidden rounded-md">
                <img
                  src={ad.imageUrl || "/placeholder.svg"}
                  alt={ad.title}
                  className="w-full h-auto rounded-md transition-transform duration-700 hover:scale-110"
                />
              </div>

              <div className="w-full md:w-2/3 space-y-2">
                <h3 className="font-semibold text-lg">{ad.title}</h3>
                <p className="text-sm text-muted-foreground">{ad.description}</p>

                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/10"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {ad.cta}
                </Button>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  )
}
