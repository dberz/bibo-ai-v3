"use client"

import { useEffect, useRef } from "react"
import { Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MirrorChillVisualizerProps {
  currentTime: number
  duration: number
  isPlaying: boolean
  onPlayPause: () => void
  onSeek: (time: number) => void
}

export function MirrorChillVisualizer({
  currentTime,
  duration,
  isPlaying,
  onPlayPause,
  onSeek,
}: MirrorChillVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animRef = useRef<number | undefined>(undefined)
  const phaseRef = useRef<number>(0)
  const noiseRef = useRef<number[]>([])

  // Initialize noise array for smoother random visualization
  useEffect(() => {
    const points = 120
    noiseRef.current = Array.from({ length: points }, () => Math.random())
  }, [])

  // Draw animated visualization
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    let running = true

    function draw() {
      if (!canvas) return
      const dpr = window.devicePixelRatio || 1
      const width = canvas.clientWidth * dpr
      const height = canvas.clientHeight * dpr
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext("2d")
      if (!ctx) return
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
      ctx.clearRect(0, 0, width, height)

      const centerY = height / dpr / 2
      const amplitude = (height / dpr) * 0.25
      const points = noiseRef.current.length
      const phase = phaseRef.current

      // Update noise values smoothly when playing
      if (isPlaying) {
        for (let i = 0; i < points; i++) {
          // Smoothly interpolate between current and new random value
          noiseRef.current[i] += (Math.random() - 0.5) * 0.1
          noiseRef.current[i] = Math.max(-1, Math.min(1, noiseRef.current[i]))
        }
      }

      // Draw mirrored waves
      ctx.save()
      ctx.beginPath()
      
      // Upper wave
      for (let i = 0; i <= points; i++) {
        const x = (i / points) * canvas.clientWidth
        // Combine noise with a subtle sine wave for more organic movement
        const noise = noiseRef.current[i] ?? 0
        const sine = Math.sin((i / points) * Math.PI * 2 + phase) * 0.3
        const y = centerY + amplitude * (noise + sine)
        ctx.lineTo(x, y)
      }
      
      // Lower wave (mirrored)
      for (let i = points; i >= 0; i--) {
        const x = (i / points) * canvas.clientWidth
        const noise = noiseRef.current[i] ?? 0
        const sine = Math.sin((i / points) * Math.PI * 2 + phase) * 0.3
        const y = centerY - amplitude * (noise + sine)
        ctx.lineTo(x, y)
      }
      
      ctx.closePath()
      const gradient = ctx.createLinearGradient(0, 0, 0, height)
      gradient.addColorStop(0, "rgba(135, 206, 235, 0.25)")
      gradient.addColorStop(0.5, "rgba(0, 105, 148, 0.35)")
      gradient.addColorStop(1, "rgba(135, 206, 235, 0.25)")
      ctx.fillStyle = gradient
      ctx.shadowColor = "rgba(135, 206, 235, 0.35)"
      ctx.shadowBlur = 16
      ctx.fill()
      ctx.restore()
    }

    function animate() {
      if (isPlaying) {
        phaseRef.current += 0.02
      }
      draw()
      if (running) animRef.current = requestAnimationFrame(animate)
    }
    animate()
    return () => {
      running = false
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [isPlaying])

  function safePercent(n: number, d: number) {
    if (!isFinite(n) || !isFinite(d) || d === 0) return 0
    return (n / d) * 100
  }

  return (
    <div className="relative w-full h-full">
      {/* Canvas for wave visualization */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      {/* Playback controls */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Button
          variant="ghost"
          size="icon"
          className="text-white/80 hover:text-white hover:bg-white/10"
          onClick={onPlayPause}
        >
          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </Button>
      </div>

      {/* Timeline */}
      <div className="absolute bottom-0 left-0 right-0 p-2">
        <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="absolute h-full bg-emerald-500 transition-all"
            style={{ width: `${safePercent(currentTime, duration)}%` }}
          />
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={safePercent(currentTime, duration)}
            onChange={e => onSeek((parseFloat(e.target.value) / 100) * (isFinite(duration) && duration > 0 ? duration : 0))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  return h > 0
    ? `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
    : `${m}:${s.toString().padStart(2, "0")}`
} 