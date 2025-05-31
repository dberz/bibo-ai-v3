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
import { BottomNavigation } from "@/components/bottom-navigation"
import { ConsistentHeader } from "@/components/consistent-header"

export default function AchievementsPage() {
  const [activeTab, setActiveTab] = useState<"stats" | "challenges" | "achievements">("stats")
  
  const userStats = getUserStats()
  const activeChallenges = getActiveChallenges()
  const completedChallenges = getCompletedChallenges()
  const achievements = getUserAchievements()

           return (
           <div className="min-h-screen bg-gray-900">
      <ConsistentHeader />

      {/* Navigation Tabs */}
      <div className="bg-gray-900 border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex space-x-8">
            {[
              { id: "stats", label: "Stats", icon: TrendingUp },
              { id: "challenges", label: "Challenges", icon: Target },
              { id: "achievements", label: "Achievements", icon: Trophy }
            ].map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                    isActive 
                      ? "border-emerald-400 text-emerald-400" 
                      : "border-transparent text-gray-400 hover:text-gray-200"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 pb-20">
        {activeTab === "stats" && (
          <div className="space-y-6">
            {/* Level Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span>Reading Level</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Level {userStats.level}</span>
                    <span className="text-sm text-gray-400">
                      {userStats.readingProgress}% complete
                    </span>
                  </div>
                  <Progress 
                    value={userStats.readingProgress} 
                    className="h-2"
                  />
                  <p className="text-sm text-gray-400">
                    {userStats.pointsToNextLevel} more points to reach level {userStats.level + 1}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Reading Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-400">{userStats.totalBooksRead}</div>
                  <div className="text-sm text-gray-400">Books Read</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400">{userStats.totalMinutesListened}</div>
                  <div className="text-sm text-gray-400">Minutes Listened</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-400">{userStats.currentStreak}</div>
                  <div className="text-sm text-gray-400">Day Streak</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400">{userStats.totalPoints}</div>
                  <div className="text-sm text-gray-400">Total Points</div>
                </CardContent>
              </Card>
            </div>

            {/* Creative Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-emerald-500" />
                  <span>Recent Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-emerald-900/20 rounded-lg border border-emerald-800">
                    <div className="text-2xl">🎭</div>
                    <div>
                      <div className="font-semibold text-sm text-emerald-200">Shakespeare Super Fan</div>
                      <div className="text-xs text-emerald-300">5 plays listened to</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-900/20 rounded-lg border border-blue-800">
                    <div className="text-2xl">🏛️</div>
                    <div>
                      <div className="font-semibold text-sm text-blue-200">Plato Professor</div>
                      <div className="text-xs text-blue-300">3 Plato classics read</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-purple-900/20 rounded-lg border border-purple-800">
                    <div className="text-2xl">🌊</div>
                    <div>
                      <div className="font-semibold text-sm text-purple-200">Ocean Explorer</div>
                      <div className="text-xs text-purple-300">Moby Dick completed</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-orange-900/20 rounded-lg border border-orange-800">
                    <div className="text-2xl">🔥</div>
                    <div>
                      <div className="font-semibold text-sm text-orange-200">Week Warrior</div>
                      <div className="text-xs text-orange-300">7-day reading streak</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-yellow-900/20 rounded-lg border border-yellow-800">
                    <div className="text-2xl">📚</div>
                    <div>
                      <div className="font-semibold text-sm text-yellow-200">Classics Collector</div>
                      <div className="text-xs text-yellow-300">10 classic novels read</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-red-900/20 rounded-lg border border-red-800">
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
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeChallenges.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "achievements" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement) => (
                <Card key={achievement.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div>
                        <h3 className="font-semibold">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">
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