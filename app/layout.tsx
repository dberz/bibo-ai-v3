import type React from "react"
import type { Metadata } from "next"
import { Inter, Montserrat, Nunito_Sans, Roboto } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { PlayerProvider } from "@/components/player-provider"
import { MiniPlayer } from "@/components/mini-player"
import { Analytics } from "@/components/analytics"
import { Suspense } from "react"
import { GenreProvider } from "@/components/genre-provider"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// Define fonts
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
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

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
})

export const metadata: Metadata = {
  title: "Bibo – AI–Powered Audiobooks",
  description: "Free, ad–supported audiobooks with AI narration and personalization",
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
        className={`${inter.variable} ${montserrat.variable} ${nunito.variable} ${roboto.variable} min-h-screen bg-background antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <GenreProvider>
            <PlayerProvider>
              <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b p-4 flex justify-between items-center">
                <Link href="/" className="font-montserrat text-2xl font-bold hover:text-primary transition-colors">Bibo</Link>
                <nav className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="font-roboto">
                    Library
                  </Button>
                  <Button variant="ghost" size="sm" className="font-roboto">
                    My Books
                  </Button>
                  <Button variant="default" size="sm" className="font-roboto">
                    Try AI Features
                  </Button>
                </nav>
              </header>
              <Suspense>
                <div className="flex min-h-screen flex-col pb-16">
                  <div className="flex-1">{children}</div>
                  <MiniPlayer />
                </div>
                <Analytics />
              </Suspense>
            </PlayerProvider>
          </GenreProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
