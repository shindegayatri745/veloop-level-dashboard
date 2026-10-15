/**
 * Demo Data: Play & Earn Games and XP Tasks
 * Structured for easy future backend/API integration
 */

export const playAndEarnGames = [
  {
    id: 'game_01',
    title: 'Cyber Drift 2088',
    category: 'Racing / Arcade',
    xpReward: 350,
    playTime: '5-10 min',
    difficulty: 'Medium',
    rating: 4.8,
    activePlayers: '14.2k',
    isHot: true,
  },
  {
    id: 'game_02',
    title: 'Neon Vault Breach',
    category: 'Strategy / Puzzle',
    xpReward: 500,
    playTime: '15 min',
    difficulty: 'Hard',
    rating: 4.9,
    activePlayers: '8.7k',
    isHot: true,
  },
  {
    id: 'game_03',
    title: 'Pixel Arena Royale',
    category: 'Action / Multiplayer',
    xpReward: 250,
    playTime: '8 min',
    difficulty: 'Easy',
    rating: 4.6,
    activePlayers: '22.1k',
    isHot: false,
  },
  {
    id: 'game_04',
    title: 'Quantum Orbit Tactics',
    category: 'Sci-Fi / Turn-based',
    xpReward: 420,
    playTime: '12 min',
    difficulty: 'Medium',
    rating: 4.7,
    activePlayers: '5.9k',
    isHot: false,
  },
];

export const earnMoreXPTasks = [
  {
    id: 'task_01',
    title: 'Daily Check-in Streak',
    description: 'Log in 7 consecutive days to keep your momentum alive',
    category: 'Daily Quest',
    rewardXP: 100,
    progress: 7,
    totalRequired: 7,
    isCompleted: true,
  },
  {
    id: 'task_02',
    title: 'Complete 3 Arcade Rounds',
    description: 'Score at least 1,000 points in any featured arcade title',
    category: 'Game Challenge',
    rewardXP: 250,
    progress: 2,
    totalRequired: 3,
    isCompleted: false,
  },
  {
    id: 'task_03',
    title: 'Invite a Friend to Veloop',
    description: 'Share your referral code and earn XP once they reach Level 2',
    category: 'Social Quest',
    rewardXP: 600,
    progress: 0,
    totalRequired: 1,
    isCompleted: false,
  },
  {
    id: 'task_04',
    title: 'Link Discord & Steam Accounts',
    description: 'Connect gaming profiles to verify achievements and unlock perks',
    category: 'Account Setup',
    rewardXP: 300,
    progress: 1,
    totalRequired: 2,
    isCompleted: false,
  },
];
