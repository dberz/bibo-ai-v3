"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Clock, Users, TrendingUp, Sparkles } from "lucide-react"
import Link from "next/link"

interface SmartPlaylistProps {
  title: string
  description: string
  books: Array<{
    id: string
    title: string
    author: string
    coverUrl: string
    duration: string
    listeners: number
    isTrending?: boolean
  }>
  type: "curated" | "trending" | "personalized"
  totalDuration: string
  listenerCount: number
}

export function SmartPlaylist({ title, description, books, type, totalDuration, listenerCount }: SmartPlaylistProps) {
  const getTypeIcon = () => {
    switch (type) {
      case "curated":
        return <Sparkles className="h-4 w-4 text-purple-400" />
      case "trending":
        return <TrendingUp className="h-4 w-4 text-orange-400" />
      case "personalized":
        return <Users className="h-4 w-4 text-blue-400" />
    }
  }

  const getTypeColor = () => {
    switch (type) {
      case "curated":
        return "bg-purple-900/20 border-purple-800/50"
      case "trending":
        return "bg-orange-900/20 border-orange-800/50"
      case "personalized":
        return "bg-blue-900/20 border-blue-800/50"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`${getTypeColor()} border`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {getTypeIcon()}
              <CardTitle className="text-lg">{title}</CardTitle>
            </div>
            <Badge variant="outline" className="text-xs">
              {type}
            </Badge>
          </div>
          <p className="text-sm text-gray-400">{description}</p>
        </CardHeader>
        
        <CardContent>
          {/* Book Covers Grid */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {books.slice(0, 4).map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-full h-16 object-cover rounded-md"
                />
                {book.isTrending && (
                  <div className="absolute -top-1 -right-1">
                    <TrendingUp className="h-3 w-3 text-orange-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{totalDuration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-3 w-3" />
                <span>{listenerCount.toLocaleString()} listeners</span>
              </div>
            </div>
            <span className="text-gray-500">{books.length} books</span>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button size="sm" className="flex-1">
              <Play className="h-4 w-4 mr-2" />
              Play All
            </Button>
            <Button size="sm" variant="outline">
              View All
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
} 