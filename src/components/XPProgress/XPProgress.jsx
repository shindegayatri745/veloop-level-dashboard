import React from 'react';
import { Target, TrendingUp, Flag } from 'lucide-react';
import styles from './XPProgress.module.css';

const XPProgress = ({ profile }) => {
  const currentXP = profile?.currentXP || 3450;
  const maxXP = profile?.maxXPForLevel || 5000;
  const progressPercent = Math.min(Math.round((currentXP / maxXP) * 100), 100);
  const remainingXP = Math.max(maxXP - currentXP, 0);

  return (
    <div className={styles.card}>
      <div className={styles.headerRow}>
        <div className="d-flex align-items-center gap-2">
          <div className={styles.iconCircle}>
            <Target size={16} />
          </div>
          <div>
            <h2 className={styles.cardTitle}>Tier XP Progression</h2>
            <span className={styles.cardSubtitle}>
              Level {profile?.currentLevel || 4} &rarr; Level {profile?.nextLevel || 5}
            </span>
          </div>
        </div>

        <div className="text-end">
          <div className={styles.xpNumbers}>
            <span className={styles.currentXPValue}>{currentXP.toLocaleString()}</span>
            <span className={styles.xpMax}> / {maxXP.toLocaleString()} XP</span>
          </div>
          <span className={styles.pctBadge}>{progressPercent}% Reached</span>
        </div>
      </div>

      {/* Interactive Progress Track with Milestone Ticks */}
      <div className={styles.trackWrapper}>
        <div className={styles.progressTrack}>
          <div
            className={styles.progressBar}
            style={{ width: `${progressPercent}%` }}
          >
            <div className={styles.progressGlow} />
          </div>
        </div>

        {/* Milestone Notches */}
        <div className={styles.milestoneMarks}>
          <span className={styles.mark}>0%</span>
          <span className={styles.mark}>25%</span>
          <span className={styles.mark}>50%</span>
          <span className={styles.mark}>75%</span>
          <span className={`${styles.mark} ${styles.targetMark}`}>
            <Flag size={10} className="d-inline me-1" />
            100%
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className={styles.metricsGrid}>
        <div className={styles.metricItem}>
          <span className={styles.metricLabel}>Earned this Tier</span>
          <span className={styles.metricValue}>+{currentXP.toLocaleString()} XP</span>
        </div>
        <div className={styles.metricItem}>
          <span className={styles.metricLabel}>Required for Level {profile?.nextLevel || 5}</span>
          <span className={`${styles.metricValue} text-info`}>
            {remainingXP.toLocaleString()} XP
          </span>
        </div>
        <div className={styles.metricItem}>
          <span className={styles.metricLabel}>Pace Velocity</span>
          <span className={`${styles.metricValue} text-success d-flex align-items-center gap-1`}>
            <TrendingUp size={13} />
            On Track
          </span>
        </div>
      </div>
    </div>
  );
};

export default XPProgress;
