export interface Book {
  id: string
  title: string
  author: string
  description: string
  coverUrl: string
  genres: string[]
  duration: string
  chapters: Chapter[]
}

export interface Chapter {
  id: string
  title: string
  duration: string
}
