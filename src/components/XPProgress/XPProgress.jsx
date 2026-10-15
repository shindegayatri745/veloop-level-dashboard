import React from 'react';
import { Target, TrendingUp } from 'lucide-react';
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
          <Target size={18} className="text-info" />
          <h2 className={styles.cardTitle}>Level Progress</h2>
        </div>
        <div className={styles.xpNumbers}>
          <span>{currentXP.toLocaleString()}</span>
          <span className={styles.xpMax}> / {maxXP.toLocaleString()} XP</span>
        </div>
      </div>

      {/* Progress Track */}
      <div className={styles.progressTrack}>
        <div
          className={styles.progressBar}
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      {/* Summary Footer */}
      <div className={styles.footerRow}>
        <span className={styles.subText}>
          <TrendingUp size={14} className="me-1 text-success d-inline" />
          <strong>{progressPercent}%</strong> of Level {profile?.currentLevel || 4} Completed
        </span>
        <span className={styles.subText}>
          <span className={styles.highlightText}>{remainingXP.toLocaleString()} XP</span> needed for Level {profile?.nextLevel || 5}
        </span>
      </div>
    </div>
  );
};

export default XPProgress;
