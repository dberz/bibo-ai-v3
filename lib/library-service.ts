import type { Book } from "@/types/book"

const LIBRARY_STORAGE_KEY = "bibo-library"

export interface LibraryBook extends Book {
  addedAt: string
  progress?: number
  lastRead?: string
  isCurrentlyReading?: boolean
}

export function getSavedBooks(): LibraryBook[] {
  if (typeof window === "undefined") {
    return []
  }

  try {
    const stored = localStorage.getItem(LIBRARY_STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      return Array.isArray(parsed) ? parsed : []
    }
  } catch (error) {
    console.error("Error reading library:", error)
  }

  return []
}

export function saveBook(book: Book): void {
  if (typeof window === "undefined") return

  try {
    const savedBooks = getSavedBooks()
    const existingBookIndex = savedBooks.findIndex(b => b.id === book.id)
    
    if (existingBookIndex >= 0) {
      // Update existing book
      savedBooks[existingBookIndex] = {
        ...savedBooks[existingBookIndex],
        ...book,
        addedAt: savedBooks[existingBookIndex].addedAt // Keep original added date
      }
    } else {
      // Add new book
      const libraryBook: LibraryBook = {
        ...book,
        addedAt: new Date().toISOString(),
        progress: 0,
        isCurrentlyReading: false
      }
      savedBooks.push(libraryBook)
    }

    localStorage.setItem(LIBRARY_STORAGE_KEY, JSON.stringify(savedBooks))
  } catch (error) {
    console.error("Error saving book to library:", error)
  }
}

export function removeBook(bookId: string): void {
  if (typeof window === "undefined") return

  try {
    const savedBooks = getSavedBooks()
    const filteredBooks = savedBooks.filter(b => b.id !== bookId)
    localStorage.setItem(LIBRARY_STORAGE_KEY, JSON.stringify(filteredBooks))
  } catch (error) {
    console.error("Error removing book from library:", error)
  }
}

export function isBookSaved(bookId: string): boolean {
  if (typeof window === "undefined") return false
  
  try {
    const savedBooks = getSavedBooks()
    return savedBooks.some(b => b.id === bookId)
  } catch (error) {
    console.error("Error checking if book is saved:", error)
    return false
  }
}

export function updateBookProgress(bookId: string, progress: number): void {
  if (typeof window === "undefined") return

  try {
    const savedBooks = getSavedBooks()
    const bookIndex = savedBooks.findIndex(b => b.id === bookId)
    
    if (bookIndex >= 0) {
      savedBooks[bookIndex].progress = progress
      savedBooks[bookIndex].lastRead = new Date().toISOString()
      savedBooks[bookIndex].isCurrentlyReading = progress > 0 && progress < 100
      
      localStorage.setItem(LIBRARY_STORAGE_KEY, JSON.stringify(savedBooks))
    }
  } catch (error) {
    console.error("Error updating book progress:", error)
  }
}
