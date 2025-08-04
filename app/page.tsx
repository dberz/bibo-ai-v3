"use client"

import { SocialFeed } from "@/components/social-feed"
import { BottomNavigation } from "@/components/bottom-navigation"
import { ConsistentHeader } from "@/components/consistent-header"
import { useBottomPadding } from "@/hooks/use-mobile"

export default function HomePage() {
  const bottomPadding = useBottomPadding()

  return (
    <div className="min-h-screen bg-gray-900">
      <ConsistentHeader />

      {/* Social Feed */}
      <main className={bottomPadding}>
        <SocialFeed />
      </main>

      {/* Audio player handled by layout */}

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}
