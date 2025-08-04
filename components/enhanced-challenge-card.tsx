"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Flame, Target, Clock, Award } from "lucide-react"
import { Challenge } from "@/types/gamification"

interface EnhancedChallengeCardProps {
  challenge: Challenge
  onComplete?: (challengeId: string) => void
}

export function EnhancedChallengeCard({ challenge, onComplete }: EnhancedChallengeCardProps) {
  const progress = (challenge.current / challenge.target) * 100
  const isNearCompletion = progress >= 80
  const isCompleted = challenge.isCompleted

  const getTimeRemaining = () => {
    if (!challenge.expiresAt) return null
    const now = new Date()
    const expires = new Date(challenge.expiresAt)
    const diff = expires.getTime() - now.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    
    if (days > 0) return `${days}d ${hours}h`
    if (hours > 0) return `${hours}h`
    return "Expires soon"
  }

  const getRewardColor = () => {
    if (challenge.reward >= 500) return "text-purple-400"
    if (challenge.reward >= 300) return "text-blue-400"
    if (challenge.reward >= 200) return "text-emerald-400"
    return "text-yellow-400"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className={`relative overflow-hidden ${isNearCompletion ? 'ring-2 ring-emerald-400/50' : ''}`}>
        {/* Streak indicator */}
        {challenge.isStreak && challenge.streak && (
          <div className="absolute top-2 right-2 z-10">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Badge className="bg-orange-900 text-orange-200 border-orange-700">
                <Flame className="h-3 w-3 mr-1" />
                {challenge.streak} day streak
              </Badge>
            </motion.div>
          </div>
        )}

        {/* Completion overlay */}
        {isCompleted && (
          <div className="absolute inset-0 bg-emerald-900/20 border-2 border-emerald-400/50 rounded-lg flex items-center justify-center z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Award className="h-8 w-8 text-emerald-400" />
            </motion.div>
          </div>
        )}

        <CardHeader className="pb-3">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{challenge.icon}</div>
            <div className="flex-1">
              <CardTitle className="text-sm font-semibold">{challenge.title}</CardTitle>
              <p className="text-xs text-gray-400 mt-1">{challenge.description}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Progress section */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-300">
                {challenge.current} / {challenge.target}
                {challenge.type === "monthly" && challenge.category === "time" && " min"}
              </span>
              <span className="text-gray-400">{Math.round(progress)}%</span>
            </div>
            
            <div className="relative">
              <Progress 
                value={progress} 
                className="h-2"
              />
              {isNearCompletion && !isCompleted && (
                <motion.div
                  className="absolute inset-0 bg-emerald-400/20 rounded-full"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </div>

            {/* Time remaining */}
            {challenge.expiresAt && (
              <div className="flex items-center space-x-1 text-xs text-gray-400">
                <Clock className="h-3 w-3" />
                <span>{getTimeRemaining()}</span>
              </div>
            )}

            {/* Reward */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-gray-400" />
                <span className={`text-sm font-semibold ${getRewardColor()}`}>
                  +{challenge.reward} points
                </span>
              </div>
              
              {!isCompleted && (
                <Button 
                  size="sm" 
                  variant="outline"
                  className="text-xs h-7"
                  onClick={() => onComplete?.(challenge.id)}
                >
                  View Details
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
} 