import type React from "react"
import type { Metadata } from "next"
import { Outfit, Montserrat, Nunito_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { PlayerProvider } from "@/lib/player/player-context"
import { MiniPlayer } from "@/components/mini-player"
import { Analytics } from "@/components/analytics"
import { Suspense } from "react"
import { GenreProvider } from "@/components/genre-provider"
import { Toaster } from "@/components/ui/toaster"

// Define fonts
const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
})

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-nunito",
})

export const metadata: Metadata = {
  title: "Bibo - AI-Powered Audiobooks",
  description: "Free, ad-supported audiobooks with AI narration and personalization",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${montserrat.variable} ${nunito.variable} min-h-screen bg-background antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <GenreProvider>
            <PlayerProvider>
              <Suspense fallback={<div>Loading...</div>}>
                <div className="flex min-h-screen flex-col pb-16">
                  <div className="flex-1">{children}</div>
                  <MiniPlayer />
                </div>
                <Analytics />
              </Suspense>
            </PlayerProvider>
          </GenreProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
