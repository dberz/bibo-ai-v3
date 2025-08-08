import { Book } from "@/types/book"
import { FeedPost, FeedData } from "@/types/feed"
import { getAllBooks } from "./books"
import { VideoPost, getAllVideoPosts } from "./video-posts"

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

// Get personalized feed with pagination including video posts
export const getPersonalizedFeed = (page: number = 1, limit: number = 6): (Book & { 
  postId: string
  postType: string
  engagement: any
  algorithmScore: number
  tags: string[]
  isVideoPost?: boolean
  videoPost?: VideoPost
})[] => {
  const posts = getFeedPosts(page, limit)
  const videoPosts = getAllVideoPosts()
  const allBooks = getAllBooks()
  
  // Remove duplicates based on book ID
  const uniquePosts = posts.filter((post, index, self) => 
    index === self.findIndex(p => p.id === post.id)
  )
  
  // Create a set of book IDs that have videos
  const booksWithVideos = new Set(videoPosts.map(vp => vp.bookId))
  
  // Filter out static posts for books that have videos
  const filteredPosts = uniquePosts.filter(post => !booksWithVideos.has(post.id))
  
  // Start with Moby Dick video post
  const mixedPosts = []
  let videoIndex = 0
  let postIndex = 0
  
  // Find Moby Dick video post and add it first
  const mobyDickVideo = videoPosts.find(vp => vp.bookId === "moby-dick")
  if (mobyDickVideo) {
    const mobyDickBook = allBooks.find(b => b.id === "moby-dick")
    if (mobyDickBook) {
      mixedPosts.push({
        ...mobyDickBook,
        postId: mobyDickVideo.id,
        postType: 'video',
        engagement: mobyDickBook.engagement || { loves: mobyDickBook.loves || 0, comments: mobyDickBook.comments || 0, peopleReading: mobyDickBook.peopleReading || 0, shares: 0 },
        algorithmScore: (mobyDickBook.algorithmScore || 0) + 1.0,
        tags: [...(mobyDickBook.tags || []), 'video'],
        isVideoPost: true,
        videoPost: mobyDickVideo
      })
      videoIndex++
    }
  }
  
  // Then alternate between regular posts and remaining video posts
  while (postIndex < filteredPosts.length || videoIndex < videoPosts.length) {
    // Add regular post if available
    if (postIndex < filteredPosts.length) {
      mixedPosts.push(filteredPosts[postIndex])
      postIndex++
    }
    
    // Add video post if available (skip Moby Dick as it's already added)
    if (videoIndex < videoPosts.length) {
      const videoPost = videoPosts[videoIndex]
      const book = allBooks.find(b => b.id === videoPost.bookId)
      if (book && !mixedPosts.some(p => p.id === book.id)) {
        mixedPosts.push({
          ...book,
          postId: videoPost.id,
          postType: 'video',
          engagement: book.engagement || { loves: book.loves || 0, comments: book.comments || 0, peopleReading: book.peopleReading || 0, shares: 0 },
          algorithmScore: (book.algorithmScore || 0) + 1.0,
          tags: [...(book.tags || []), 'video'],
          isVideoPost: true,
          videoPost: videoPost
        })
        videoIndex++
      } else {
        videoIndex++
      }
    }
  }
  
  // Sort by algorithm score but ensure Moby Dick stays at the top
  const sortedPosts = mixedPosts.sort((a, b) => {
    // If one is Moby Dick, prioritize it
    if (a.id === "moby-dick") return -1
    if (b.id === "moby-dick") return 1
    // Otherwise sort by algorithm score
    return (b.algorithmScore || 0) - (a.algorithmScore || 0)
  })
  
  return sortedPosts
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