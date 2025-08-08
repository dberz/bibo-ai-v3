"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Target, BookOpen, Clock } from "lucide-react"
import type { Book } from "@/types/book"

interface BookSocialGamificationProps {
  book: Book
}

export function BookSocialGamification({ book }: BookSocialGamificationProps) {
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
        { id: "whale-hunter", title: "Whale Hunter", icon: "🐋", description: "Complete Moby Dick, Twenty Thousand Leagues Under the Sea, and Typee", progress: 1, total: 3, unlocked: false },
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

  return (
    <div className="space-y-6">
      {/* Related Reading Challenges */}
      <Card className="border-yellow-500/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-lg font-semibold">
            <Target className="h-5 w-5 text-yellow-500" />
            <span>Related Reading Challenges</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {bookChallenges.slice(0, 3).map((challenge) => (
              <div
                key={challenge.id}
                className="p-3 rounded-lg border border-gray-700 bg-gray-800/30"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <div className="text-lg">{challenge.icon}</div>
                  <div className="text-sm font-medium">{challenge.title}</div>
                </div>
                <div className="text-xs text-gray-400 mb-2">{challenge.description}</div>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>{challenge.progress}/{challenge.total}</span>
                </div>
                <Progress 
                  value={(challenge.progress / challenge.total) * 100} 
                  className="h-1"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 