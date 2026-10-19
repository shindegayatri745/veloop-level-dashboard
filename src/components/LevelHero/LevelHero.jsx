import React from 'react';
import { Sparkles, Trophy, ShieldCheck, Zap, ArrowRight, Flame } from 'lucide-react';
import heroBadge from '../../assets/hero.png';
import styles from './LevelHero.module.css';

const LevelHero = ({ profile, onOpenModal }) => {
  const currentXP = profile?.currentXP || 3450;
  const maxXP = profile?.maxXPForLevel || 5000;
  const progressPercent = Math.min(Math.round((currentXP / maxXP) * 100), 100);
  const xpNeeded = Math.max(maxXP - currentXP, 0);

  return (
    <div className={styles.heroCard}>
      {/* Background Ambience */}
      <div className={styles.ambientGlow} />

      <div className="row align-items-center g-4 position-relative">
        {/* Tier Emblem Badge with Assignment Asset */}
        <div className="col-12 col-md-auto text-center text-md-start">
          <div className={styles.emblemWrapper}>
            <img
              src={heroBadge}
              alt="Level Badge Pedestal"
              className={styles.pedestalImg}
            />
            <div className={styles.levelBadgeOverlay}>
              <span className={styles.badgeLabel}>LVL</span>
              <span className={styles.badgeNumber}>{profile?.currentLevel || 4}</span>
            </div>
            <div className={styles.tierRingGlow} />
          </div>
        </div>

        {/* Hero Title & Tier Highlights */}
        <div className="col-12 col-md text-center text-md-start">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-start gap-2 mb-2">
            <h1 className={styles.tierTitle}>{profile?.currentLevelName || 'Gold Elite'}</h1>
            <span className={styles.tierStatusTag}>
              <ShieldCheck size={14} />
              <span>{profile?.badge || 'Elite Tier'}</span>
            </span>
            <span className={styles.boostPill}>
              <Zap size={13} />
              <span>2.0x XP Boost</span>
            </span>
            {profile?.rank && (
              <span className={styles.rankPill}>
                <Trophy size={13} className="text-warning" />
                <span>{profile.rank}</span>
              </span>
            )}
          </div>

          <p className={styles.tierSubtitle}>
            Earning at double rate. Advance to <strong>Level {profile?.nextLevel || 5} ({profile?.nextLevelName || 'Platinum Master'})</strong> to unlock VIP rewards.
          </p>

          {/* Quick Glancable Progress Bar */}
          <div className={styles.glanceProgress}>
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className={styles.progressLabel}>Tier 4 Progression</span>
              <span className={styles.progressRatio}>
                <strong>{currentXP.toLocaleString()}</strong> / {maxXP.toLocaleString()} XP ({progressPercent}%)
              </span>
            </div>
            <div className={styles.progressTrack}>
              <div
                className={styles.progressBar}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center mt-1">
              <span className={styles.countdownText}>
                {xpNeeded.toLocaleString()} XP needed for Next Tier
              </span>
              <span className={styles.streakIndicator}>
                <Flame size={13} className="text-warning d-inline me-1" />
                {profile?.streakDays || 7}-Day Active Streak
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="col-12 col-md-auto text-center text-md-end">
          <button
            className={styles.perksButton}
            onClick={onOpenModal}
            aria-label="View unlocked tier perks"
          >
            <Sparkles size={16} />
            <span>Tier Perks</span>
            <ArrowRight size={14} className={styles.btnArrow} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LevelHero;
