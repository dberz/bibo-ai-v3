"use client"

import { SocialFeed } from "@/components/social-feed"
import { BottomNavigation } from "@/components/bottom-navigation"
import { ConsistentHeader } from "@/components/consistent-header"


export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <ConsistentHeader />

      {/* Social Feed */}
      <main className="pb-20">
        <SocialFeed />
      </main>

      {/* Audio player handled by layout */}

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}
