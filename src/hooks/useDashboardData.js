import { useState, useCallback } from 'react';
import { userProfileData, nextLevelRewardData, levelRoadmapData } from '../data/levelData';
import { playAndEarnGames, earnMoreXPTasks } from '../data/earningData';
import { xpActivityHistory } from '../data/activityData';

/**
 * Custom Hook: useDashboardData
 * Provides reactive state management, interactive XP progression,
 * task completion, game rewards, and modal controls.
 * Pre-configured for seamless REST/GraphQL API integration.
 */
export const useDashboardData = () => {
  const [profile, setProfile] = useState(userProfileData);
  const [nextReward, setNextReward] = useState(nextLevelRewardData);
  const [roadmap, setRoadmap] = useState(levelRoadmapData);
  const [games, setGames] = useState(playAndEarnGames);
  const [tasks, setTasks] = useState(earnMoreXPTasks);
  const [activities, setActivities] = useState(xpActivityHistory);
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
  }, [roadmap, showToast]);

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

  const playGame = useCallback((gameId) => {
    const game = games.find((g) => g.id === gameId);
    if (!game) return;

    addXP(game.xpReward, `Match in ${game.title}`, 'Gaming');
    showToast(`Played ${game.title}! Earned +${game.xpReward} XP 🎮`, 'info');
  }, [games, addXP, showToast]);

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
    isLevelUpModalOpen,
    openLevelUpModal,
    closeLevelUpModal,
    completeTask,
    playGame,
    toast,
  };
};

export default useDashboardData;
