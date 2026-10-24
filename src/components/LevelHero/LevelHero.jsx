import React from 'react';
import { Sparkles, ArrowRight, Gamepad2, Crown } from 'lucide-react';
import heroBadge from '../../assets/hero.png';
import styles from './LevelHero.module.css';

const LevelHero = ({ profile, onOpenModal }) => {
  const currentXP = profile?.currentXP || 3450;
  const maxXP = profile?.maxXPForLevel || 5000;
  const progressPercent = Math.min(Math.round((currentXP / maxXP) * 100), 100);
  const xpNeeded = Math.max(maxXP - currentXP, 0);

  return (
    <div className={styles.heroSection}>
      {/* Ambient Lighting Glow */}
      <div className={styles.ambientGlow} />

      <div className="row align-items-center g-3 g-md-4 position-relative">
        {/* Visual Focal Point: Level Badge Emblem */}
        <div className="col-12 col-md-auto text-center text-md-start">
          <div className={styles.emblemWrapper}>
            <img
              src={heroBadge}
              alt={`Level ${profile?.currentLevel || 4} Badge Pedestal`}
              className={styles.pedestalImg}
            />
            <div className={styles.levelBadgeOverlay}>
              <Crown size={12} className={styles.crownIcon} />
              <span className={styles.badgeLabel}>LVL</span>
              <span className={styles.badgeNumber}>{profile?.currentLevel || 4}</span>
            </div>
            <div className={styles.tierRingGlow} />
          </div>
        </div>

        {/* Level Info & Glancable Progress */}
        <div className="col-12 col-md text-center text-md-start">
          {/* Header Row: Title & Subtle Meta */}
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-start gap-2 mb-2">
            <h1 className={styles.tierTitle}>
              Level {profile?.currentLevel || 4}: {profile?.currentLevelName || 'Gold Elite'}
            </h1>
            <span className={styles.subtleMeta}>
              2.0x Boost &bull; #{profile?.rank?.replace('#', '') || '142'} Rank &bull; {profile?.streakDays || 5}d Streak
            </span>
          </div>

          {/* Prominent XP Progression Bar */}
          <div className={styles.progressContainer}>
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className={styles.progressRatio}>
                <strong>{currentXP.toLocaleString()}</strong> / {maxXP.toLocaleString()} XP
              </span>
              <span className={styles.progressPctBadge}>{progressPercent}%</span>
            </div>

            <div className={styles.progressTrack} role="progressbar" aria-valuenow={progressPercent} aria-valuemin="0" aria-valuemax="100">
              <div
                className={styles.progressBar}
                style={{ width: `${progressPercent}%` }}
              >
                <div className={styles.shimmerTip} />
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-1">
              <span className={styles.nextMilestoneText}>
                <strong>{xpNeeded.toLocaleString()} XP</strong> to Level {profile?.nextLevel || 5} {profile?.nextLevelName || 'Platinum Master'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="col-12 col-md-auto d-flex flex-row flex-md-column gap-2 justify-content-center">
          <button
            className={styles.primaryBtn}
            onClick={onOpenModal}
            aria-label="View current tier perks and benefits"
          >
            <Sparkles size={15} />
            <span>Tier Perks</span>
            <ArrowRight size={13} className={styles.btnArrow} />
          </button>
          <a
            href="#play"
            className={styles.secondaryBtn}
            aria-label="Jump to Play & Earn games"
          >
            <Gamepad2 size={15} />
            <span>Earn XP</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LevelHero;
