"use client"

import { Challenge } from "@/types/gamification"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, Target, Award } from "lucide-react"

interface ChallengeCardProps {
  challenge: Challenge
}

export function ChallengeCard({ challenge }: ChallengeCardProps) {
  const progress = (challenge.current / challenge.target) * 100
  const isCompleted = challenge.isCompleted || progress >= 100

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'daily':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'weekly':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'monthly':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      case 'special':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'daily':
        return '📅'
      case 'weekly':
        return '📆'
      case 'monthly':
        return '🗓️'
      case 'special':
        return '⭐'
      default:
        return '🎯'
    }
  }

  return (
    <Card className={`border-2 ${isCompleted ? 'border-emerald-500/50 bg-emerald-900/10' : 'border-gray-700'}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{challenge.icon}</span>
            <div>
              <CardTitle className="text-lg">{challenge.title}</CardTitle>
              <p className="text-sm text-gray-400">{challenge.description}</p>
            </div>
          </div>
          <Badge className={getTypeColor(challenge.type)}>
            <span className="mr-1">{getTypeIcon(challenge.type)}</span>
            {challenge.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Progress</span>
            <span className="font-medium">
              {challenge.current} / {challenge.target}
            </span>
          </div>
          <Progress 
            value={progress} 
            className="h-2"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Award className="h-4 w-4" />
            <span>{challenge.reward} points</span>
          </div>
          
          {challenge.expiresAt && (
            <div className="flex items-center space-x-1 text-sm text-gray-400">
              <Clock className="h-4 w-4" />
              <span>
                {new Date(challenge.expiresAt).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        {isCompleted && (
          <div className="flex items-center justify-center p-2 bg-emerald-500/20 rounded-lg border border-emerald-500/30">
            <span className="text-emerald-400 font-medium">✓ Completed!</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 