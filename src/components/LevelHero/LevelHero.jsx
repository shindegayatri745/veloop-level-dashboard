import React from 'react';
import { Sparkles, Trophy, ShieldCheck } from 'lucide-react';
import styles from './LevelHero.module.css';

const LevelHero = ({ profile, onOpenModal }) => {
  return (
    <div className={styles.heroCard}>
      <div className={styles.heroGlow}></div>
      <div className="row align-items-center g-4">
        {/* Level Emblem */}
        <div className="col-12 col-md-auto text-center text-md-start">
          <div className={styles.levelBadgeContainer}>
            <div className={styles.levelHexagon}>
              <span className={styles.levelNumber}>{profile?.currentLevel || 1}</span>
              <span className={styles.levelLabel}>Level</span>
            </div>
          </div>
        </div>

        {/* Level Details */}
        <div className="col-12 col-md text-center text-md-start">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-start gap-2 mb-2">
            <h1 className={styles.title}>{profile?.currentLevelName || 'Gold Elite'}</h1>
            <span className={styles.statusPill}>
              <ShieldCheck size={14} />
              {profile?.badge || 'Elite Tier'}
            </span>
            {profile?.rank && (
              <span className={styles.rankPill}>
                <Trophy size={14} />
                {profile.rank}
              </span>
            )}
          </div>
          <p className={styles.subtitle}>
            You are earning at <span className="text-white fw-bold">2.0x boost</span>. Reach Level {profile?.nextLevel || 5} to unlock Platinum VIP rewards!
          </p>
        </div>

        {/* Milestone Action Button */}
        <div className="col-12 col-md-auto text-center text-md-end">
          <button className={styles.actionButton} onClick={onOpenModal}>
            <Sparkles size={18} />
            <span>View Perks & Perks Modal</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LevelHero;
