import type React from "react"
import type { Metadata } from "next"
import { fontGelica, fontGelicaLight } from "./fonts"
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
import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: "Bibo AI - AI-Powered Audiobooks",
  description: "Experience classic literature reimagined with AI-powered audiobooks.",
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
    <html lang="en" suppressHydrationWarning className={`${fontGelica.variable} ${fontGelicaLight.variable} ${inter.variable} font-sans min-h-screen bg-background antialiased`}>
      <body>
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
