import type { Ad } from "@/types/ad"

/**
 * Gets a contextual ad based on the book, segment, and user
 * @param bookId The ID of the book being listened to
 * @param segmentId The ID of the current segment
 * @param userId The ID of the user
 * @returns An ad object with audio and visual components
 */
export async function getAd(bookId: string, segmentId: string, userId: string): Promise<Ad> {
  // Check if we should use real AI or mock data
  if (process.env.USE_REAL_AI === "true") {
    // In a real implementation, this would call an ML service to get a contextual ad
    // For now, we'll just return a mock ad
    return getMockAd()
  }

  // Return mock data
  return getMockAd()
}

function getMockAd(): Ad {
  // Randomly select one of our mock ads
  const ads: Ad[] = [
    {
      id: "travel-1",
      title: "Explore the World with TravelPlus",
      description: "Book your dream vacation today and get 15% off with code BIBO15",
      imageUrl: "/tropical-beach-ad.png",
      audioUrl: "/ads/audio/travel-1.mp3",
      cta: "Book Now",
    },
    {
      id: "finance-1",
      title: "Smart Investing with FinanceWise",
      description: "Start your investment journey with just $5. No fees for Bibo listeners!",
      imageUrl: "/placeholder.svg?key=260c6",
      audioUrl: "/ads/audio/finance-1.mp3",
      cta: "Start Investing",
    },
    {
      id: "coffee-1",
      title: "Literary Brews Coffee Club",
      description: "Coffee inspired by classic literature. Get your first box free!",
      imageUrl: "/placeholder.svg?height=300&width=600&query=coffee advertisement with books and coffee cup",
      audioUrl: "/ads/audio/coffee-1.mp3",
      cta: "Try for Free",
    },
    {
      id: "bibo-premium",
      title: "Upgrade to Bibo Premium",
      description: "Enjoy ad-free listening, unlimited StoryClips, and exclusive voices",
      imageUrl: "/placeholder.svg?height=300&width=600&query=premium subscription advertisement with gold elements",
      audioUrl: "/ads/audio/bibo-premium.mp3",
      cta: "Upgrade Now",
    },
  ]

  return ads[Math.floor(Math.random() * ads.length)]
}
