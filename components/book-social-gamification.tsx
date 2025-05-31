"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Users, Trophy, Target, Award, Star, BookOpen, Clock } from "lucide-react"
import type { Book } from "@/types/book"

interface BookSocialGamificationProps {
  book: Book
}

export function BookSocialGamification({ book }: BookSocialGamificationProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [showComments, setShowComments] = useState(false)

  // Mock gamification data
  const userProgress = {
    progress: 45,
    timeListened: "2h 15m",
    chaptersCompleted: 3,
    totalChapters: 8,
    streak: 5,
    points: 1250
  }

  // Reading challenges specific to the current book
  const getBookChallenges = (bookTitle: string) => {
    const challenges = {
      "Moby Dick": [
        { id: "whale-hunter", title: "Whale Hunter", icon: "🐋", description: "Complete Moby Dick", progress: 45, total: 100, unlocked: false },
        { id: "classic-master", title: "Classic Master", icon: "🏛️", description: "Read 5 classic novels", progress: 3, total: 5, unlocked: false },
        { id: "maritime-explorer", title: "Maritime Explorer", icon: "⚓", description: "Read 3 sea-themed books", progress: 1, total: 3, unlocked: false }
      ],
      "Pride and Prejudice": [
        { id: "regency-romance", title: "Regency Romance", icon: "💕", description: "Complete Pride and Prejudice", progress: 23, total: 100, unlocked: false },
        { id: "austen-fan", title: "Austen Fan", icon: "👑", description: "Read 3 Jane Austen novels", progress: 1, total: 3, unlocked: false },
        { id: "romance-reader", title: "Romance Reader", icon: "🌹", description: "Read 5 romance classics", progress: 2, total: 5, unlocked: false }
      ],
      "The Great Gatsby": [
        { id: "jazz-age", title: "Jazz Age Explorer", icon: "🎷", description: "Complete The Great Gatsby", progress: 0, total: 100, unlocked: false },
        { id: "american-dream", title: "American Dream", icon: "🇺🇸", description: "Read 3 American classics", progress: 1, total: 3, unlocked: false },
        { id: "fitzgerald-fan", title: "Fitzgerald Fan", icon: "📚", description: "Read 2 Fitzgerald works", progress: 0, total: 2, unlocked: false }
      ],
      "Frankenstein": [
        { id: "gothic-horror", title: "Gothic Horror", icon: "🏰", description: "Complete Frankenstein", progress: 0, total: 100, unlocked: false },
        { id: "sci-fi-pioneer", title: "Sci-Fi Pioneer", icon: "🔬", description: "Read 3 science fiction classics", progress: 1, total: 3, unlocked: false },
        { id: "shelley-fan", title: "Shelley Fan", icon: "⚡", description: "Read 2 Shelley works", progress: 0, total: 2, unlocked: false }
      ],
      "Dracula": [
        { id: "vampire-hunter", title: "Vampire Hunter", icon: "🧛", description: "Complete Dracula", progress: 0, total: 100, unlocked: false },
        { id: "horror-master", title: "Horror Master", icon: "👻", description: "Read 3 horror classics", progress: 1, total: 3, unlocked: false },
        { id: "stoker-fan", title: "Stoker Fan", icon: "🦇", description: "Read 2 Stoker works", progress: 0, total: 2, unlocked: false }
      ]
    };
    
    return challenges[bookTitle as keyof typeof challenges] || [
      { id: "general-reader", title: "Book Explorer", icon: "📖", description: "Complete this book", progress: userProgress.progress, total: 100, unlocked: false },
      { id: "genre-explorer", title: "Genre Explorer", icon: "🎭", description: "Read 3 books in this genre", progress: 1, total: 3, unlocked: false },
      { id: "author-fan", title: "Author Fan", icon: "✍️", description: "Read 2 books by this author", progress: 1, total: 2, unlocked: false }
    ];
  };

  const bookChallenges = getBookChallenges(book.title);

  // Mock social data
  const socialStats = {
    peopleReading: 1247,
    comments: 89,
    loves: 342,
    reviews: 156
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  return (
    <div className="space-y-6">
      {/* Reading Progress */}
      <Card className="border-emerald-500/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-emerald-500" />
            <span>Your Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Progress</span>
              <span className="font-medium">{userProgress.progress}%</span>
            </div>
            <Progress value={userProgress.progress} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-emerald-500" />
              <span>{userProgress.timeListened} listened</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-blue-500" />
              <span>{userProgress.chaptersCompleted}/{userProgress.totalChapters} chapters</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reading Challenges */}
      <Card className="border-yellow-500/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-yellow-500" />
            <span>Reading Challenges</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bookChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className="flex items-center space-x-3 p-3 rounded-lg border border-gray-700 bg-gray-800/30"
              >
                <div className="text-2xl">{challenge.icon}</div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{challenge.title}</div>
                  <div className="text-xs text-gray-400">{challenge.description}</div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{challenge.progress}/{challenge.total}</span>
                    </div>
                    <Progress 
                      value={(challenge.progress / challenge.total) * 100} 
                      className="h-1.5"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Social Stats */}
      <Card className="border-blue-500/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-blue-500" />
            <span>Community</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-emerald-400">{socialStats.peopleReading}</div>
              <div className="text-xs text-gray-400">Reading</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-400">{socialStats.loves}</div>
              <div className="text-xs text-gray-400">Loves</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">{socialStats.comments}</div>
              <div className="text-xs text-gray-400">Comments</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">{socialStats.reviews}</div>
              <div className="text-xs text-gray-400">Reviews</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Actions */}
      <Card className="border-purple-500/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5 text-purple-500" />
            <span>Engage</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center space-x-2 ${
                isLiked ? 'text-red-500' : 'text-gray-300'
              }`}
              onClick={handleLike}
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
              <span>Love</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2 text-gray-300"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="h-5 w-5" />
              <span>Comment</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2 text-gray-300"
            >
              <Star className="h-5 w-5" />
              <span>Rate</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Comments */}
      {showComments && (
        <Card className="border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg">Recent Comments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-sm">Jane Doe</span>
                  <Badge variant="outline" className="text-xs">Reader</Badge>
                </div>
                <p className="text-sm text-gray-300 mt-1">
                  The narrator's voice is absolutely perfect for this classic. I'm loving every minute!
                </p>
                <div className="text-xs text-gray-500 mt-2">2 hours ago</div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-sm">John Smith</span>
                  <Badge variant="outline" className="text-xs">BookTok</Badge>
                </div>
                <p className="text-sm text-gray-300 mt-1">
                  This is my third time listening to this audiobook. It gets better every time!
                </p>
                <div className="text-xs text-gray-500 mt-2">5 hours ago</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 