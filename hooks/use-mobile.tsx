"use client"

import { useEffect, useState } from "react"
import { usePlayer } from "@/lib/player/player-context"

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return isMobile
}

export function useBottomPadding() {
  const { currentBook } = usePlayer()
  
  // Return dynamic bottom padding based on whether audio player is visible
  return currentBook ? "pb-32" : "pb-20"
}
