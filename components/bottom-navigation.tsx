"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, BookOpen, Trophy } from "lucide-react"

export function BottomNavigation() {
  const pathname = usePathname()

  const navigation = [
    {
      name: "Feed",
      href: "/",
      icon: Home,
      current: pathname === "/"
    },
    {
      name: "Browse",
      href: "/search",
      icon: Search,
      current: pathname === "/search"
    },
    {
      name: "Library",
      href: "/library",
      icon: BookOpen,
      current: pathname === "/library"
    },
    {
      name: "Achievements",
      href: "/achievements",
      icon: Trophy,
      current: pathname === "/achievements"
    }
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-gray-700 shadow-lg">
      <div className="max-w-md mx-auto">
        <nav className="flex items-center justify-around px-2">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center py-3 px-4 text-sm font-medium transition-colors rounded-lg min-h-[60px] justify-center ${
                  item.current
                    ? "text-emerald-400 bg-emerald-400/10"
                    : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
                }`}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
} 