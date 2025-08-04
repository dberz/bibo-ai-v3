"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Clock, BookOpen, Flame, Target, BarChart3, Globe, Award } from "lucide-react"
import { UserStats } from "@/types/gamification"

interface PersonalDashboardProps {
  stats: UserStats
}

export function PersonalDashboard({ stats }: PersonalDashboardProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) return `${hours}h ${mins}m`
    return `${mins}m`
  }

  const getStreakColor = (streak: number) => {
    if (streak >= 30) return "text-purple-400"
    if (streak >= 14) return "text-blue-400"
    if (streak >= 7) return "text-emerald-400"
    return "text-orange-400"
  }

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-emerald-900/20 to-emerald-800/10 border-emerald-800/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-emerald-400">{stats.totalBooksRead}</div>
              <div className="text-sm text-gray-400 flex items-center justify-center space-x-1 mt-1">
                <BookOpen className="h-3 w-3" />
                <span>Books Read</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border-blue-800/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">{formatTime(stats.totalMinutesListened)}</div>
              <div className="text-sm text-gray-400 flex items-center justify-center space-x-1 mt-1">
                <Clock className="h-3 w-3" />
                <span>Listened</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-orange-900/20 to-orange-800/10 border-orange-800/50">
            <CardContent className="p-4 text-center">
              <div className={`text-2xl font-bold ${getStreakColor(stats.currentStreak)}`}>
                {stats.currentStreak}
              </div>
              <div className="text-sm text-gray-400 flex items-center justify-center space-x-1 mt-1">
                <Flame className="h-3 w-3" />
                <span>Day Streak</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 border-purple-800/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">{formatNumber(stats.wordsConsumed)}</div>
              <div className="text-sm text-gray-400 flex items-center justify-center space-x-1 mt-1">
                <Target className="h-3 w-3" />
                <span>Words</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Listening Patterns */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-sm">
                <BarChart3 className="h-4 w-4" />
                <span>Listening Patterns</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">This Week</span>
                  <span className="text-sm font-medium text-emerald-400">
                    {formatTime(stats.thisWeekMinutes)}
                  </span>
                </div>
                <Progress value={(stats.thisWeekMinutes / 420) * 100} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">This Month</span>
                  <span className="text-sm font-medium text-blue-400">
                    {formatTime(stats.thisMonthMinutes)}
                  </span>
                </div>
                <Progress value={(stats.thisMonthMinutes / 1800) * 100} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Daily Average</span>
                  <span className="text-sm font-medium text-purple-400">
                    {formatTime(stats.averageDailyListening)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Exploration Stats */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-sm">
                <Globe className="h-4 w-4" />
                <span>Exploration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Genres Explored</span>
                  <span className="text-sm font-medium text-emerald-400">
                    {stats.genresExplored} / 12
                  </span>
                </div>
                <Progress value={(stats.genresExplored / 12) * 100} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Longest Streak</span>
                  <span className="text-sm font-medium text-orange-400">
                    {stats.longestStreak} days
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Favorite Genre</span>
                  <Badge variant="outline" className="text-xs">
                    {stats.favoriteGenre}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Achievements Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-sm">
              <Award className="h-4 w-4" />
              <span>Achievement Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400">{stats.totalChallengesCompleted}</div>
                <div className="text-sm text-gray-400">Challenges Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{stats.achievementsUnlocked}</div>
                <div className="text-sm text-gray-400">Achievements Unlocked</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
} 