import type React from "react"
import type { Metadata } from "next"
import { fontGelica, fontGelicaLight, inter } from "./fonts"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { PlayerProvider, usePlayer } from "@/lib/player/player-context"
import { Analytics } from "@/components/analytics"
import { Suspense } from "react"
import { GenreProvider } from "@/components/genre-provider"
import { Toaster } from "@/components/ui/toaster"
import { HeaderWithAiModal } from "@/components/header-with-ai-modal"
import { BookAudioVisualizer } from '@/components/book-audio-visualizer'
import BottomPlayer from '@/components/bottom-player'

export const metadata: Metadata = {
  title: "Bibo - AI-Powered Audiobooks",
  description: "Free, ad-supported audiobooks with AI narration and personalization",
  generator: 'v0.dev',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontGelica.variable} ${fontGelicaLight.variable} ${inter.variable} font-sans min-h-screen bg-background antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <GenreProvider>
            <PlayerProvider>
              <HeaderWithAiModal />
              <Suspense fallback={<div>Loading...</div>}>
                <div className="flex min-h-screen flex-col">
                  <div className="flex-1">{children}</div>
                </div>
                <Analytics />
              </Suspense>
              <BottomPlayer />
            </PlayerProvider>
          </GenreProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
