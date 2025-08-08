import { Book } from "@/types/book"

export interface VideoPost {
  id: string
  bookId: string
  videoUrl: string
  excerpt: string
  excerptSource: string
  style: string
  duration: string
  thumbnail?: string
}

export const videoPosts: VideoPost[] = [
  {
    id: "moby-dick-video-1",
    bookId: "moby-dick",
    videoUrl: "/video-clips/moby-dick.mp4",
    excerpt: "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    excerptSource: "Chapter 1: Loomings",
    style: "Ocean waves, stormy seas, whale imagery",
    duration: "15s"
  },
  {
    id: "call-of-the-wild-video-1",
    bookId: "call-of-the-wild", 
    videoUrl: "/video-clips/the-call-of-the-wild.mp4",
    excerpt: "Buck did not read the newspapers, or he would have known that trouble was brewing, not alone for himself, but for every tide-water dog, strong of muscle and with warm, long hair, from Puget Sound to San Diego.",
    excerptSource: "Chapter 1: Into the Primitive",
    style: "Forest scenes, snow, wolf imagery",
    duration: "18s"
  },
  {
    id: "great-gatsby-video-1",
    bookId: "the-great-gatsby",
    videoUrl: "/video-clips/the-great-gatsby.mp4",
    excerpt: "In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since. 'Whenever you feel like criticizing any one,' he told me, 'just remember that all the people in this world haven't had the advantages that you've had.'",
    excerptSource: "Chapter 1",
    style: "Art deco, 1920s glamour, green light imagery",
    duration: "20s"
  }
]

export const getVideoPostsForBook = (bookId: string): VideoPost[] => {
  return videoPosts.filter(post => post.bookId === bookId)
}

export const getAllVideoPosts = (): VideoPost[] => {
  return videoPosts
}

export const getRandomVideoPost = (): VideoPost => {
  const randomIndex = Math.floor(Math.random() * videoPosts.length)
  return videoPosts[randomIndex]
} 