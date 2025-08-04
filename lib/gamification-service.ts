import { Challenge, Achievement, UserStats } from "@/types/gamification";

// Enhanced user stats with more detailed metrics
export function getUserStats(): UserStats {
  return {
    level: 7,
    totalPoints: 1250,
    totalBooksRead: 12,
    totalMinutesListened: 480,
    currentStreak: 5,
    readingProgress: 75,
    pointsToNextLevel: 250,
    // New enhanced stats
    wordsConsumed: 125000,
    genresExplored: 8,
    longestStreak: 12,
    averageDailyListening: 32,
    thisWeekMinutes: 224,
    thisMonthMinutes: 960,
    favoriteGenre: "Classics",
    totalChallengesCompleted: 15,
    achievementsUnlocked: 8
  };
}

// Enhanced active challenges with dynamic streaks and quests
export function getActiveChallenges(): Challenge[] {
  return [
    {
      id: "daily-streak-1",
      title: "Daily Listening Streak",
      description: "Listen to 15 minutes of audiobooks today",
      type: "daily",
      target: 15,
      current: 8,
      reward: 50,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      isCompleted: false,
      icon: "🔥",
      streak: 5,
      isStreak: true
    },
    {
      id: "weekly-classics",
      title: "Classics Connoisseur",
      description: "Finish 3 classic novels this month",
      type: "monthly",
      target: 3,
      current: 1,
      reward: 300,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      isCompleted: false,
      icon: "🏛️",
      category: "classics"
    },
    {
      id: "weekly-genre",
      title: "Genre Explorer",
      description: "Listen to books from 5 different genres",
      type: "weekly",
      target: 5,
      current: 3,
      reward: 200,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      isCompleted: false,
      icon: "🗺️",
      category: "exploration"
    },
    {
      id: "monthly-hours",
      title: "Dedicated Listener",
      description: "Listen to 20 hours this month",
      type: "monthly",
      target: 1200, // minutes
      current: 960,
      reward: 500,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      isCompleted: false,
      icon: "⏰",
      category: "time"
    },
    {
      id: "weekly-streak",
      title: "Week Warrior",
      description: "Maintain a 7-day reading streak",
      type: "weekly",
      target: 7,
      current: 5,
      reward: 400,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      isCompleted: false,
      icon: "⚡",
      isStreak: true
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