import { Home, TrendingUp, Heart, BookOpen, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface FeedNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function FeedNavigation({ activeTab, onTabChange }: FeedNavigationProps) {
  const tabs = [
    { id: "for-you", label: "For You", icon: Home },
    { id: "trending", label: "Trending", icon: TrendingUp },
    { id: "following", label: "Following", icon: Heart },
    { id: "library", label: "Library", icon: BookOpen },
  ]

  return (
    <div className="sticky top-16 z-40 bg-white border-b">
      <div className="max-w-md mx-auto px-4">
        <div className="flex space-x-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            
            return (
              <Button
                key={tab.id}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                className="flex-1 flex items-center space-x-2"
                onClick={() => onTabChange(tab.id)}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm">{tab.label}</span>
              </Button>
            )
          })}
          <Link href="/achievements">
            <Button variant="ghost" size="sm" className="flex items-center space-x-2">
              <Trophy className="h-4 w-4" />
              <span className="text-sm">Achievements</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 