export interface FeedPost {
  id: string
  bookId: string
  type: 'featured' | 'popular' | 'trending' | 'recommended' | 'viral' | 'new'
  timestamp: string
  engagement: {
    loves: number
    comments: number
    peopleReading: number
    shares: number
  }
  algorithmScore: number
  tags: string[]
}

export interface FeedData {
  posts: FeedPost[]
  metadata: {
    lastUpdated: string
    totalPosts: number
    version: string
  }
}

export interface Comment {
  id: string
  userId: string
  bookId: string
  text: string
  timestamp: string
  likes: number
  replies: Comment[]
}

export interface User {
  id: string
  name: string
  avatar: string
  followers: number
  following: number
  isVerified: boolean
} 