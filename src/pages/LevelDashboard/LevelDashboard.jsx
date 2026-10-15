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
    isLevelUpModalOpen,
    openLevelUpModal,
    closeLevelUpModal,
    completeTask,
    playGame,
    toast,
  } = useDashboardData();

  return (
    <div className={styles.dashboardWrapper}>
      {/* Top Navigation Bar */}
      <Header profile={profile} />

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        <div className="container">
          {/* Hero Section */}
          <section id="dashboard" className="mb-4">
            <LevelHero profile={profile} onOpenModal={openLevelUpModal} />
          </section>

          {/* XP Progress & Next Milestone Reward */}
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

          {/* Play & Earn Games + Earn More XP Tasks */}
          <section id="play" className="row g-4 mb-4">
            <div className="col-12 col-lg-7">
              <PlayAndEarn games={games} onPlayGame={playGame} />
            </div>
            <div className="col-12 col-lg-5">
              <EarnMoreXP tasks={tasks} onCompleteTask={completeTask} />
            </div>
          </section>

          {/* Recent Activity Log */}
          <section id="activity" className="mb-4">
            <XPActivity activities={activities} />
          </section>

          {/* Footer Note */}
          <footer className={styles.footerNote}>
            VELOOP Rewards &bull; Level-Up Dashboard &bull; Internship Project
          </footer>
        </div>
      </main>

      {/* Level-Up Modal */}
      <LevelUpModal
        isOpen={isLevelUpModalOpen}
        onClose={closeLevelUpModal}
        profile={profile}
      />

      {/* Interactive Toast Notification Feedback */}
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
              <Info size={18} className="flex-shrink-0" />
            ) : (
              <CheckCircle size={18} className="flex-shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
        </aside>
      )}
    </div>
  );
};

export default LevelDashboard;
