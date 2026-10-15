/**
 * Demo Data: XP Activity and History Log
 * Structured for easy future backend/API integration
 */

export const xpActivityHistory = [
  {
    id: 'act_101',
    type: 'game_win',
    title: 'Victory in Cyber Drift 2088',
    description: 'Finished 1st place in Daily Matchmaking',
    xpAmount: 350,
    timestamp: '15 minutes ago',
    category: 'Gaming',
    status: 'credited',
  },
  {
    id: 'act_102',
    type: 'quest_complete',
    title: 'Daily Streak Bonus (Day 7)',
    description: 'Completed 7-day login streak',
    xpAmount: 100,
    timestamp: '2 hours ago',
    category: 'Streaks',
    status: 'credited',
  },
  {
    id: 'act_103',
    type: 'level_milestone',
    title: 'Reached Level 4: Gold Elite',
    description: 'Unlocked new roadmap tier & custom badge',
    xpAmount: 500,
    timestamp: 'Yesterday at 8:30 PM',
    category: 'Milestone',
    status: 'credited',
  },
  {
    id: 'act_104',
    type: 'challenge',
    title: 'Neon Vault Cryptic Puzzle',
    description: 'Solved level 4 cipher in under 3 minutes',
    xpAmount: 220,
    timestamp: '2 days ago',
    category: 'Gaming',
    status: 'credited',
  },
  {
    id: 'act_105',
    type: 'social',
    title: 'Community Tourney Participation',
    description: 'Competed in Veloop Open Weekend Cup',
    xpAmount: 400,
    timestamp: '3 days ago',
    category: 'Events',
    status: 'credited',
  },
];
