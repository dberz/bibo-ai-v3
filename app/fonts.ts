import localFont from 'next/font/local'
import { Inter } from 'next/font/google'

// Gelica Medium for main headers and brand
export const fontGelica = localFont({
  src: './fonts/gelica-medium.otf',
  variable: '--font-gelica',
  display: 'swap',
})

// Gelica Light for secondary headers
export const fontGelicaLight = localFont({
  src: './fonts/gelica-light.otf',
  variable: '--font-gelica-light',
  display: 'swap',
})

// Inter for body text and UI
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
}) 