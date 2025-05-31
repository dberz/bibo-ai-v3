import { Challenge, Achievement, UserStats } from "@/types/gamification";

// Mock user stats
export function getUserStats(): UserStats {
  return {
    level: 7,
    totalPoints: 1250,
    totalBooksRead: 12,
    totalMinutesListened: 480,
    currentStreak: 5,
    readingProgress: 75,
    pointsToNextLevel: 250
  };
}

// Mock active challenges
export function getActiveChallenges(): Challenge[] {
  return [
    {
      id: "daily-1",
      title: "Daily Reading",
      description: "Listen to 30 minutes of audiobooks today",
      type: "daily",
      target: 30,
      current: 15,
      reward: 50,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      isCompleted: false,
      icon: "📚"
    },
    {
      id: "weekly-1",
      title: "Classic Explorer",
      description: "Complete 3 classic novels this week",
      type: "weekly",
      target: 3,
      current: 1,
      reward: 200,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      isCompleted: false,
      icon: "🏛️"
    },
    {
      id: "monthly-1",
      title: "Streak Master",
      description: "Maintain a 7-day reading streak",
      type: "monthly",
      target: 7,
      current: 5,
      reward: 500,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      isCompleted: false,
      icon: "🔥"
    }
  ];
}

// Mock completed challenges
export function getCompletedChallenges(): Challenge[] {
  return [
    {
      id: "completed-1",
      title: "First Book",
      description: "Complete your first audiobook",
      type: "special",
      target: 1,
      current: 1,
      reward: 100,
      isCompleted: true,
      icon: "🎉"
    },
    {
      id: "completed-2",
      title: "Week Warrior",
      description: "Listen for 7 consecutive days",
      type: "weekly",
      target: 7,
      current: 7,
      reward: 300,
      isCompleted: true,
      icon: "⚡"
    }
  ];
}

// Mock achievements
export function getUserAchievements(): Achievement[] {
  return [
    {
      id: "first-book",
      title: "First Steps",
      description: "Complete your first audiobook",
      icon: "📖",
      unlockedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      rarity: "common"
    },
    {
      id: "streak-7",
      title: "Week Warrior",
      description: "Maintain a 7-day reading streak",
      icon: "🔥",
      unlockedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      rarity: "rare"
    },
    {
      id: "classics-5",
      title: "Classics Collector",
      description: "Read 5 classic novels",
      icon: "🏛️",
      unlockedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      rarity: "epic"
    },
    {
      id: "minutes-1000",
      title: "Dedicated Listener",
      description: "Listen to 1000 minutes of audiobooks",
      icon: "🎧",
      rarity: "legendary"
    }
  ];
} 