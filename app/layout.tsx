import type React from "react"
import type { Metadata } from "next"
import { Outfit, Montserrat, Nunito_Sans, Roboto, Lato, Playfair_Display } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { PlayerProvider } from "@/components/player-provider"
import { MiniPlayer } from "@/components/mini-player"
import { Analytics } from "@/components/analytics"
import { Suspense } from "react"
import { GenreProvider } from "@/components/genre-provider"
import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

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

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
})

const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lato",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
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
        className={`${outfit.variable} ${montserrat.variable} ${nunito.variable} ${roboto.variable} ${lato.variable} ${playfair.variable} min-h-screen bg-background antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <GenreProvider>
            <PlayerProvider>
              <header className="slick sticky top–0 z–10 bg–white (or dark:bg–black) shadow (or dark:shadow–dark) p–4 flex justify–between items–center">
                <Link href="/" className="font–playfair text–2xl font–bold hover:underline">Bibo – AI–Powered Audiobooks</Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="font–roboto">Reimagine (AI Features)</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Change Narrator</DropdownMenuItem>
                    <DropdownMenuItem>Adjust Length</DropdownMenuItem>
                    <DropdownMenuItem>Translate</DropdownMenuItem>
                    <DropdownMenuItem>Change Genre</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
