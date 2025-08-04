import { Book } from "@/types/book"
import { FeedPost, FeedData } from "@/types/feed"
import { getAllBooks } from "./books"

// Load feed data
const loadFeedData = (): FeedData => {
  // In a real app, this would be an API call
  return require("./feed.json")
}

// Get books by IDs
const getBooksByIds = (bookIds: string[]): Book[] => {
  const booksData = getAllBooks()
  return booksData.filter(book => bookIds.includes(book.id))
}

// Merge book data with feed posts
export const getFeedPosts = (page: number = 1, limit: number = 6): (Book & { 
  postId: string
  postType: string
  engagement: {
    loves: number
    comments: number
    peopleReading: number
    shares: number
  }
  algorithmScore: number
  tags: string[]
})[] => {
  const feedData = loadFeedData()
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const pagePosts = feedData.posts.slice(startIndex, endIndex)
  
  const bookIds = pagePosts.map(post => post.bookId)
  const books = getBooksByIds(bookIds)
  
  const mergedPosts = pagePosts.map(post => {
    const book = books.find(b => b.id === post.bookId)
    if (!book) {
      console.warn(`Book not found: ${post.bookId}, skipping...`)
      return null
    }
    
    return {
      ...book,
      postId: post.id,
      postType: post.type,
      engagement: post.engagement,
      algorithmScore: post.algorithmScore,
      tags: post.tags,
      // Override book social stats with feed engagement data
      loves: post.engagement.loves,
      comments: post.engagement.comments,
      peopleReading: post.engagement.peopleReading
    }
  }).filter(Boolean) as any // Remove null entries
  
  // Remove duplicates based on book ID
  return mergedPosts.filter((post: any, index: number, self: any[]) => 
    index === self.findIndex((p: any) => p.id === post.id)
  )
}

// Get personalized feed with pagination
export const getPersonalizedFeed = (page: number = 1, limit: number = 6): (Book & { 
  postId: string
  postType: string
  engagement: any
  algorithmScore: number
  tags: string[]
})[] => {
  const posts = getFeedPosts(page, limit)
  
  // Remove duplicates based on book ID
  const uniquePosts = posts.filter((post, index, self) => 
    index === self.findIndex(p => p.id === post.id)
  )
  
  // For now, just sort by algorithm score
  // In the future, this would use user preferences, reading history, etc.
  return uniquePosts.sort((a, b) => b.algorithmScore - a.algorithmScore)
}

// Check if there are more posts available
export const hasMorePosts = (page: number, limit: number = 6): boolean => {
  const feedData = loadFeedData()
  const startIndex = page * limit
  return startIndex < feedData.posts.length
}

// Get total number of posts
export const getTotalPosts = (): number => {
  const feedData = loadFeedData()
  return feedData.posts.length
}

// Refresh feed data
export const refreshFeed = async (): Promise<void> => {
  // In a real app, this would fetch fresh data from the API
  // For now, we'll just simulate a refresh
  console.log("Refreshing feed data...")
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  console.log("Feed refreshed!")
} 