import React from 'react';
import { CheckCircle, Info } from 'lucide-react';
import useDashboardData from '../../hooks/useDashboardData';
import Header from '../../components/Header';
import LevelHero from '../../components/LevelHero';
import XPProgress from '../../components/XPProgress';
import NextLevelReward from '../../components/NextLevelReward';
import LevelRoadmap from '../../components/LevelRoadmap';
import PlayAndEarn from '../../components/PlayAndEarn';
import EarnMoreXP from '../../components/EarnMoreXP';
import XPActivity from '../../components/XPActivity';
import LevelUpModal from '../../components/LevelUpModal';
import styles from './LevelDashboard.module.css';

const LevelDashboard = () => {
  const {
    profile,
    nextReward,
    roadmap,
    games,
    tasks,
    activities,
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
  } = useDashboardData();

  return (
    <div className={styles.dashboardWrapper}>
      {/* Top Sticky Header */}
      <Header
        profile={profile}
        notifications={notifications}
        onMarkAllRead={markAllNotificationsRead}
        onClearNotifications={clearNotifications}
      />

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        <div className="container">
          {/* Level Hero Section */}
          <section id="dashboard" className="mb-4">
            <LevelHero profile={profile} onOpenModal={openLevelUpModal} />
          </section>

          {/* XP Progress & Next Milestone Reward Cards */}
          <section className="row g-4 mb-4">
            <div className="col-12 col-lg-7 d-flex flex-column">
              <XPProgress profile={profile} />
            </div>
            <div className="col-12 col-lg-5 d-flex flex-column">
              <NextLevelReward reward={nextReward} />
            </div>
          </section>

          {/* Tier Roadmap Ladder */}
          <section id="roadmap" className="mb-4">
            <LevelRoadmap roadmap={roadmap} />
          </section>

          {/* Play & Earn Games + Daily Quests */}
          <section className="row g-4 mb-4">
            <div className="col-12 col-lg-7" id="play">
              <PlayAndEarn
                games={games}
                onPlayGame={playGame}
                awardGameXP={awardGameXP}
              />
            </div>
            <div className="col-12 col-lg-5" id="quests">
              <EarnMoreXP
                tasks={tasks}
                onCompleteTask={completeTask}
                onProgressTask={progressTask}
                onClaimTaskReward={claimTaskReward}
              />
            </div>
          </section>

          {/* Recent Activity Log */}
          <section id="activity" className="mb-4">
            <XPActivity activities={activities} />
          </section>

          {/* Clean Ecosystem Footer */}
          <footer className={styles.footerNote}>
            <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between gap-2">
              <span>VELOOP Rewards &bull; Level-Up Dashboard</span>
              <span className="text-muted">
                Demo Engagement &bull; No Real Financial Value
              </span>
            </div>
          </footer>
        </div>
      </main>

      {/* Level-Up Celebration Modal */}
      <LevelUpModal
        isOpen={isLevelUpModalOpen}
        onClose={closeLevelUpModal}
        profile={profile}
      />

      {/* Reactive Toast Notification Feedback */}
      {toast && (
        <aside
          role="status"
          aria-live="polite"
          className={`${styles.toast} ${
            toast.type === 'info' ? styles.toastInfo : styles.toastSuccess
          }`}
        >
          <div className="d-flex align-items-center gap-2">
            {toast.type === 'info' ? (
              <Info size={16} className="flex-shrink-0" />
            ) : (
              <CheckCircle size={16} className="flex-shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
        </aside>
      )}
    </div>
  );
};

export default LevelDashboard;
