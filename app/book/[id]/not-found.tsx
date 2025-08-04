import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, ArrowLeft } from "lucide-react"
import { ConsistentHeader } from "@/components/consistent-header"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function BookNotFound() {
  return (
    <div className="min-h-screen bg-gray-900">
      <ConsistentHeader />
      <div className="container mx-auto px-4 py-8 pb-32">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-3xl font-bold text-white">Book Not Found</h1>
          <p className="text-gray-400 max-w-md">
            Sorry, we couldn't find the book you're looking for. It might have been removed or the link might be incorrect.
          </p>
          <div className="flex gap-4">
            <Button asChild variant="outline">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button asChild>
              <Link href="/library" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Browse Library
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  )
} 