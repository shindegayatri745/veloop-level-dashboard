import { useState, useCallback } from 'react';
import { userProfileData, nextLevelRewardData, levelRoadmapData } from '../data/levelData';
import { playAndEarnGames, earnMoreXPTasks } from '../data/earningData';
import { xpActivityHistory } from '../data/activityData';

const initialNotifications = [
  {
    id: 'notif_1',
    title: 'Tier Milestone Near',
    message: '1,550 XP needed to unlock Platinum Master tier.',
    timestamp: '10m ago',
    unread: true,
    type: 'progress',
  },
  {
    id: 'notif_2',
    title: 'Streak Multiplier Active',
    message: '7-day login streak unlocked a 2.0x boost.',
    timestamp: '2h ago',
    unread: true,
    type: 'streak',
  },
  {
    id: 'notif_3',
    title: 'Arcade Challenge',
    message: 'Neon Vault Breach is offering +500 XP today.',
    timestamp: '1d ago',
    unread: false,
    type: 'game',
  },
];

/**
 * Custom Hook: useDashboardData
 * Provides reactive state management, interactive XP progression,
 * task progression & claim logic, game session rewards, notifications,
 * and celebratory modals.
 */
export const useDashboardData = () => {
  const [profile, setProfile] = useState(userProfileData);
  const [nextReward, setNextReward] = useState(nextLevelRewardData);
  const [roadmap, setRoadmap] = useState(levelRoadmapData);
  const [games, setGames] = useState(playAndEarnGames);
  const [tasks, setTasks] = useState(earnMoreXPTasks);
  const [activities, setActivities] = useState(xpActivityHistory);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast((current) => (current?.message === message ? null : current));
    }, 3500);
  }, []);

  const addXP = useCallback((amount, sourceTitle, category = 'General') => {
    setProfile((prev) => {
      const newXP = prev.currentXP + amount;
      const newTotal = prev.totalXPEarned + amount;
      let newLevel = prev.currentLevel;
      let newLevelName = prev.currentLevelName;
      const maxXP = prev.maxXPForLevel;

      // Handle Level-up transition
      if (newXP >= maxXP) {
        newLevel = Math.min(prev.nextLevel, 6);
        const nextTier = roadmap.find((t) => t.level === newLevel);
        if (nextTier) {
          newLevelName = nextTier.name;
        }

        // Update roadmap status for the newly reached level
        setRoadmap((prevRoadmap) =>
          prevRoadmap.map((t) => {
            if (t.level < newLevel) return { ...t, status: 'completed' };
            if (t.level === newLevel) return { ...t, status: 'current' };
            return t;
          })
        );

        setIsLevelUpModalOpen(true);
        showToast(`🎉 Level Up! You advanced to Level ${newLevel}: ${newLevelName}!`, 'success');
      }

      const calculatedCurrentXP = newXP >= maxXP ? newXP - maxXP : newXP;

      return {
        ...prev,
        currentXP: calculatedCurrentXP,
        totalXPEarned: newTotal,
        currentLevel: newLevel,
        currentLevelName: newLevelName,
        xpToNextLevel: Math.max(maxXP - calculatedCurrentXP, 0),
      };
    });

    // Record activity in live history log
    const newActivity = {
      id: `act_${Date.now()}`,
      type: category === 'Gaming' ? 'game_win' : 'quest_complete',
      title: sourceTitle,
      description: `Earned +${amount} XP reward`,
      xpAmount: amount,
      timestamp: 'Just now',
      category,
      status: 'credited',
    };

    setActivities((prev) => [newActivity, ...prev]);

    // Push live notification
    setNotifications((prev) => [
      {
        id: `notif_${Date.now()}`,
        title: `+${amount} XP Earned`,
        message: `${sourceTitle} completed successfully`,
        timestamp: 'Just now',
        unread: true,
        type: category === 'Gaming' ? 'game' : 'quest',
      },
      ...prev,
    ]);
  }, [roadmap, showToast]);

  // Advance task step towards completion
  const progressTask = useCallback((taskId) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId || t.isCompleted) return t;
        const updatedProgress = Math.min(t.progress + 1, t.totalRequired);
        if (updatedProgress === t.totalRequired) {
          showToast(`Quest Ready! "${t.title}" can now be claimed.`, 'info');
        } else {
          showToast(`Quest Progress: ${updatedProgress}/${t.totalRequired} steps completed`, 'info');
        }
        return {
          ...t,
          progress: updatedProgress,
        };
      })
    );
  }, [showToast]);

  // Claim verified completed task
  const claimTaskReward = useCallback((taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;
    if (task.isCompleted) {
      showToast('This reward has already been claimed.', 'info');
      return;
    }
    if (task.progress < task.totalRequired) {
      showToast(`Quest incomplete (${task.progress}/${task.totalRequired}). Complete all steps first.`, 'info');
      return;
    }

    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, isCompleted: true } : t))
    );

    addXP(task.rewardXP, `Quest: ${task.title}`, task.category);
    showToast(`Claimed +${task.rewardXP} XP for "${task.title}"!`, 'success');
  }, [tasks, addXP, showToast]);

  // Backward-compatible completeTask (advances to full & claims)
  const completeTask = useCallback((taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.isCompleted) return;

    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, isCompleted: true, progress: t.totalRequired } : t
      )
    );

    addXP(task.rewardXP, `Quest: ${task.title}`, task.category);
    showToast(`Claimed +${task.rewardXP} XP for "${task.title}"!`, 'success');
  }, [tasks, addXP, showToast]);

  // Play game with optional custom score & earned XP
  const awardGameXP = useCallback((gameId, earnedXP, gameTitle) => {
    const game = games.find((g) => g.id === gameId);
    const title = gameTitle || game?.title || 'Game Match';
    const xp = earnedXP || game?.xpReward || 250;

    addXP(xp, `Victory in ${title}`, 'Gaming');
    showToast(`Match Finished! +${xp} XP credited to your level 🎮`, 'success');
  }, [games, addXP, showToast]);

  // Quick play fallback
  const playGame = useCallback((gameId) => {
    const game = games.find((g) => g.id === gameId);
    if (!game) return;

    awardGameXP(gameId, game.xpReward, game.title);
  }, [games, awardGameXP]);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const openLevelUpModal = useCallback(() => setIsLevelUpModalOpen(true), []);
  const closeLevelUpModal = useCallback(() => setIsLevelUpModalOpen(false), []);

  return {
    profile,
    setProfile,
    nextReward,
    setNextReward,
    roadmap,
    setRoadmap,
    games,
    setGames,
    tasks,
    setTasks,
    activities,
    setActivities,
    notifications,
    markAllNotificationsRead,
    clearNotifications,
    isLevelUpModalOpen,
    openLevelUpModal,
    closeLevelUpModal,
    progressTask,
    claimTaskReward,
    completeTask,
    awardGameXP,
    playGame,
    toast,
  };
};

export default useDashboardData;
