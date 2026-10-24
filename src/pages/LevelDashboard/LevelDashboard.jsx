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
        <div className={styles.dashboardContainer}>
          {/* Level Hero Section - Integrated into Page Background */}
          <section id="dashboard" className="mb-4">
            <LevelHero profile={profile} onOpenModal={openLevelUpModal} />
          </section>

          <div className={styles.sectionDivider} />

          {/* XP Progression Breakdown & Next Level Reward Spotlight */}
          <section className="row g-4 mb-4">
            <div className="col-12 col-lg-7 d-flex flex-column">
              <XPProgress profile={profile} />
            </div>
            <div className="col-12 col-lg-5 d-flex flex-column">
              <NextLevelReward reward={nextReward} />
            </div>
          </section>

          <div className={styles.sectionDivider} />

          {/* Connected Level Roadmap */}
          <section id="roadmap" className="mb-4">
            <LevelRoadmap roadmap={roadmap} />
          </section>

          <div className={styles.sectionDivider} />

          {/* Play & Earn Games + Quests & Bounties */}
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

          <div className={styles.sectionDivider} />

          {/* Live XP Activity Feed */}
          <section id="activity" className="mb-4">
            <XPActivity activities={activities} />
          </section>

          {/* Minimal Footer */}
          <footer className={styles.footerNote}>
            <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between gap-1 text-center text-sm-start">
              <span>VELOOP Rewards</span>
              <span className={styles.footerSubtext}>Demo engagement platform &bull; No cash value</span>
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
              <Info size={16} className="flex-shrink-0 text-info" />
            ) : (
              <CheckCircle size={16} className="flex-shrink-0 text-success" />
            )}
            <span>{toast.message}</span>
          </div>
        </aside>
      )}
    </div>
  );
};

export default LevelDashboard;
