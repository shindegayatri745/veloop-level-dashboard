/**
 * Demo Data: User Level and Progression Information
 * Structured for easy future backend/API integration
 */

export const userProfileData = {
  id: 'usr_89234',
  username: 'Alex_Velooper',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
  currentLevel: 4,
  currentLevelName: 'Gold Elite',
  badge: 'Elite Tier',
  currentXP: 3450,
  maxXPForLevel: 5000,
  totalXPEarned: 18450,
  nextLevel: 5,
  nextLevelName: 'Platinum Master',
  xpToNextLevel: 1550,
  rank: '#42 Globally',
  streakDays: 7,
};

export const nextLevelRewardData = {
  level: 5,
  title: 'Platinum Master Tier Unlock',
  description: 'Unlocks exclusive early access drops, 2.5x point multiplier, and VIP tournament invitations.',
  multiplier: '2.5x Multiplier',
  coinBonus: 2500,
  exclusiveBadge: 'Platinum Dragoncrest',
  estimatedDaysLeft: 4,
};

export const levelRoadmapData = [
  {
    level: 1,
    name: 'Bronze Pioneer',
    minXP: 0,
    maxXP: 1000,
    status: 'completed', // completed | current | locked
    perks: ['Basic Rewards', 'Standard 1x Earn Rate', 'Community Access'],
    rewardBadge: 'Bronze Star',
  },
  {
    level: 2,
    name: 'Silver Striker',
    minXP: 1000,
    maxXP: 2500,
    status: 'completed',
    perks: ['Weekly Spin Wheel', '1.25x Earn Rate', 'Silver Forum Badge'],
    rewardBadge: 'Silver Wings',
  },
  {
    level: 3,
    name: 'Silver Ace',
    minXP: 2500,
    maxXP: 4000,
    status: 'completed',
    perks: ['Flash Loot Drops', '1.5x Earn Rate', 'Priority Support'],
    rewardBadge: 'Ace Crest',
  },
  {
    level: 4,
    name: 'Gold Elite',
    minXP: 4000,
    maxXP: 6500,
    status: 'current',
    perks: ['Exclusive Tournaments', '2.0x Earn Rate', 'Custom Profile Banner'],
    rewardBadge: 'Gold Crown',
  },
  {
    level: 5,
    name: 'Platinum Master',
    minXP: 6500,
    maxXP: 10000,
    status: 'locked',
    perks: ['VIP Support Concierge', '2.5x Earn Rate', 'Merch Mystery Box'],
    rewardBadge: 'Platinum Dragon',
  },
  {
    level: 6,
    name: 'Diamond Champion',
    minXP: 10000,
    maxXP: 15000,
    status: 'locked',
    perks: ['Annual Gala Pass', '3.0x Earn Rate', 'Legendary Discord Role'],
    rewardBadge: 'Diamond Halo',
  },
];
