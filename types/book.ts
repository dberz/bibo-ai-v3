export interface Book {
  id: string
  title: string
  author: string
  description: string
  coverUrl: string
  genres: string[]
  duration: string
  pages: number
  category: string
  listeners: number
  rating: number
  reviewCount: number
  chapters: Chapter[]
  // Social stats for the feed
  peopleReading: number
  comments: number
  loves: number
  isCurrentlyReading?: boolean
  lastActivity?: string
  // Feed-specific properties
  postId?: string
  postType?: string
  engagement?: {
    loves: number
    comments: number
    peopleReading: number
    shares: number
  }
  algorithmScore?: number
  tags?: string[]
}

export interface Chapter {
  id: string
  title: string
  duration: string
  audioUrl: string
}
