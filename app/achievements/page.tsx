"use client"

import { useState } from "react"
import { getUserStats, getActiveChallenges, getCompletedChallenges, getUserAchievements } from "@/lib/gamification-service"
import { Challenge, Achievement } from "@/types/gamification"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Trophy, Target, Award, TrendingUp, Clock, BookOpen, Flame, Star } from "lucide-react"
import { ChallengeCard } from "@/components/challenge-card"
import { EnhancedChallengeCard } from "@/components/enhanced-challenge-card"
import { PersonalDashboard } from "@/components/personal-dashboard"
import { ConfettiAnimation } from "@/components/confetti-animation"
import { BottomNavigation } from "@/components/bottom-navigation"
import { ConsistentHeader } from "@/components/consistent-header"
import { useBottomPadding } from "@/hooks/use-mobile"

export default function AchievementsPage() {
  const [activeTab, setActiveTab] = useState<"stats" | "challenges" | "achievements">("stats")
  const [showConfetti, setShowConfetti] = useState(false)
  const [confettiType, setConfettiType] = useState<"level-up" | "achievement" | "streak">("level-up")
  
  const userStats = getUserStats()
  const activeChallenges = getActiveChallenges()
  const completedChallenges = getCompletedChallenges()
  const achievements = getUserAchievements()

  const bottomPadding = useBottomPadding()

  const handleChallengeComplete = (challengeId: string) => {
    // Simulate challenge completion
    setConfettiType("achievement")
    setShowConfetti(true)
  }

  const handleConfettiComplete = () => {
    setShowConfetti(false)
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <ConsistentHeader />

      {/* Confetti Animation */}
      <ConfettiAnimation 
        isVisible={showConfetti} 
        onComplete={handleConfettiComplete}
        type={confettiType}
      />

      {/* Navigation Tabs */}
      <div className="bg-gray-900 border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-between">
            {[
              { id: "stats", label: "Dashboard", icon: TrendingUp },
              { id: "challenges", label: "Challenges", icon: Target },
              { id: "achievements", label: "Achievements", icon: Trophy }
            ].map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex flex-col items-center justify-center py-3 px-4 min-h-[60px] w-full transition-all duration-200 relative ${
                    isActive
                      ? "text-emerald-400"
                      : "text-gray-400 hover:text-gray-200 active:text-gray-300"
                  }`}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-emerald-400 rounded-full" />
                  )}
                  
                  {/* Icon and Label */}
                  <div className="flex flex-col items-center space-y-1">
                    <Icon className={`h-5 w-5 ${isActive ? 'text-emerald-400' : 'text-gray-400'}`} />
                    <span className="text-xs font-medium leading-tight text-center">
                      {tab.label}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`max-w-4xl mx-auto px-4 py-8 ${bottomPadding}`}>
        {activeTab === "stats" && (
          <div className="space-y-8">
            {/* Personal Dashboard */}
            <PersonalDashboard stats={userStats} />

            {/* Level Progress */}
            <Card className="border-gray-700 bg-gray-800/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-gray-100">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span>Reading Level</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-200">Level {userStats.level}</span>
                    <span className="text-sm text-gray-400">
                      {userStats.readingProgress}% complete
                    </span>
                  </div>
                  <Progress 
                    value={userStats.readingProgress} 
                    className="h-2 bg-gray-700"
                  />
                  <p className="text-sm text-gray-400">
                    {userStats.pointsToNextLevel} more points to reach level {userStats.level + 1}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Creative Badges */}
            <Card className="border-gray-700 bg-gray-800/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-gray-100">
                  <Award className="h-5 w-5 text-emerald-500" />
                  <span>Recent Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-emerald-900/20 rounded-lg border border-emerald-800/50 hover:bg-emerald-900/30 transition-colors">
                    <div className="text-2xl">🎭</div>
                    <div>
                      <div className="font-semibold text-sm text-emerald-200">Shakespeare Super Fan</div>
                      <div className="text-xs text-emerald-300">5 plays listened to</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-900/20 rounded-lg border border-blue-800/50 hover:bg-blue-900/30 transition-colors">
                    <div className="text-2xl">🏛️</div>
                    <div>
                      <div className="font-semibold text-sm text-blue-200">Plato Professor</div>
                      <div className="text-xs text-blue-300">3 Plato classics read</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-purple-900/20 rounded-lg border border-purple-800/50 hover:bg-purple-900/30 transition-colors">
                    <div className="text-2xl">🌊</div>
                    <div>
                      <div className="font-semibold text-sm text-purple-200">Ocean Explorer</div>
                      <div className="text-xs text-purple-300">Moby Dick completed</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-orange-900/20 rounded-lg border border-orange-800/50 hover:bg-orange-900/30 transition-colors">
                    <div className="text-2xl">🔥</div>
                    <div>
                      <div className="font-semibold text-sm text-orange-200">Week Warrior</div>
                      <div className="text-xs text-orange-300">7-day reading streak</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-yellow-900/20 rounded-lg border border-yellow-800/50 hover:bg-yellow-900/30 transition-colors">
                    <div className="text-2xl">📚</div>
                    <div>
                      <div className="font-semibold text-sm text-yellow-200">Classics Collector</div>
                      <div className="text-xs text-yellow-300">10 classic novels read</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-red-900/20 rounded-lg border border-red-800/50 hover:bg-red-900/30 transition-colors">
                    <div className="text-2xl">🧠</div>
                    <div>
                      <div className="font-semibold text-sm text-red-200">Philosophy Scholar</div>
                      <div className="text-xs text-red-300">5 philosophical works</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "challenges" && (
          <div className="space-y-8">
            {/* Active Challenges */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-gray-100">Active Challenges</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeChallenges.map((challenge) => (
                  <EnhancedChallengeCard 
                    key={challenge.id} 
                    challenge={challenge}
                    onComplete={handleChallengeComplete}
                  />
                ))}
              </div>
            </div>

            {/* Completed Challenges */}
            {completedChallenges.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-6 text-gray-100">Completed Challenges</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {completedChallenges.map((challenge) => (
                    <EnhancedChallengeCard 
                      key={challenge.id} 
                      challenge={challenge}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "achievements" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className="border-gray-700 bg-gray-800/50 hover:bg-gray-800/70 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div>
                        <h3 className="font-semibold text-gray-100">{achievement.title}</h3>
                        <p className="text-sm text-gray-400">{achievement.description}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Unlocked {achievement.unlockedAt ? new Date(achievement.unlockedAt).toLocaleDateString() : 'Recently'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
} 