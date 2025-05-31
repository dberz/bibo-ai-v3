export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'special';
  target: number;
  current: number;
  reward: number;
  expiresAt?: string;
  isCompleted: boolean;
  icon: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface UserStats {
  level: number;
  totalPoints: number;
  totalBooksRead: number;
  totalMinutesListened: number;
  currentStreak: number;
  readingProgress: number;
  pointsToNextLevel: number;
} 