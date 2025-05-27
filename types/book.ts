export interface Book {
  id: string
  title: string
  author: string
  description: string
  coverUrl: string
  genres: string[]
  chapters: Chapter[]
  pages: number
  // New properties for My Books feature
  duration?: string
  progress?: number
  isFavorite?: boolean
  lastRead?: string | null
  addedAt?: string
}

export interface Chapter {
  id: string
  title: string
  duration: string
  audioUrl: string
}
