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
        <nav className="flex items-center justify-around">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                                       className={`flex flex-col items-center py-2 px-3 text-sm font-medium transition-colors ${
                         item.current
                           ? "text-emerald-400"
                           : "text-gray-400 hover:text-gray-200"
                       }`}
              >
                <Icon className="h-6 w-6 mb-1" />
                <span className="text-xs">{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
} 