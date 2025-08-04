"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

interface ConfettiPiece {
  id: number
  x: number
  y: number
  rotation: number
  scale: number
  color: string
}

interface ConfettiAnimationProps {
  isVisible: boolean
  onComplete?: () => void
  type?: "level-up" | "achievement" | "streak"
}

const colors = {
  "level-up": ["#FFD700", "#FFA500", "#FF6347", "#32CD32", "#4169E1", "#9370DB"],
  "achievement": ["#FFD700", "#C0C0C0", "#CD7F32", "#FF69B4", "#00CED1", "#FF4500"],
  "streak": ["#FF4500", "#FF6347", "#FF8C00", "#FFD700", "#FFA500", "#FF6B35"]
}

export function ConfettiAnimation({ isVisible, onComplete, type = "level-up" }: ConfettiAnimationProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    if (isVisible) {
      // Generate confetti pieces
      const newPieces: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -20,
        rotation: Math.random() * 360,
        scale: Math.random() * 0.5 + 0.5,
        color: colors[type][Math.floor(Math.random() * colors[type].length)]
      }))
      setPieces(newPieces)

      // Auto-hide after animation
      const timer = setTimeout(() => {
        if (onComplete) onComplete()
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isVisible, type, onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {pieces.map((piece) => (
            <motion.div
              key={piece.id}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: piece.color,
                left: `${piece.x}%`,
                top: `${piece.y}%`,
              }}
              initial={{
                y: -20,
                x: piece.x,
                rotate: 0,
                scale: 0,
              }}
              animate={{
                y: [piece.y, piece.y + 100 + Math.random() * 50],
                x: [piece.x, piece.x + (Math.random() - 0.5) * 40],
                rotate: [0, piece.rotation + 360],
                scale: [0, piece.scale, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 1,
                ease: "easeOut",
              }}
            />
          ))}
          
          {/* Center celebration effect */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <div className="text-6xl">
              {type === "level-up" && "🎉"}
              {type === "achievement" && "🏆"}
              {type === "streak" && "🔥"}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
} 