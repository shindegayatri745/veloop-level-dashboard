import React from 'react';
import { Target, TrendingUp, Flag, CheckCircle2 } from 'lucide-react';
import styles from './XPProgress.module.css';

const XPProgress = ({ profile }) => {
  const currentXP = profile?.currentXP || 3450;
  const maxXP = profile?.maxXPForLevel || 5000;
  const progressPercent = Math.min(Math.round((currentXP / maxXP) * 100), 100);
  const remainingXP = Math.max(maxXP - currentXP, 0);

  const checkpoints = [
    { label: 'Start', pct: 0, xp: 0, reached: true },
    { label: 'Quarter', pct: 25, xp: Math.round(maxXP * 0.25), reached: currentXP >= maxXP * 0.25 },
    { label: 'Midpoint', pct: 50, xp: Math.round(maxXP * 0.5), reached: currentXP >= maxXP * 0.5 },
    { label: 'Crucial', pct: 75, xp: Math.round(maxXP * 0.75), reached: currentXP >= maxXP * 0.75 },
    { label: 'Unlock', pct: 100, xp: maxXP, reached: currentXP >= maxXP },
  ];

  return (
    <div className={styles.progressSection}>
      {/* Open Section Header */}
      <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-1 mb-3">
        <div className="d-flex align-items-center gap-2">
          <div className={styles.iconCircle}>
            <Target size={16} />
          </div>
          <div>
            <h2 className={styles.headingTitle}>Milestone Checkpoints</h2>
            <span className={styles.headingSubtitle}>
              Level {profile?.currentLevel || 4} to Level {profile?.nextLevel || 5} Path
            </span>
          </div>
        </div>

        <div className="mt-1 mt-sm-0">
          <span className={styles.currentXPText}>
            <strong>{currentXP.toLocaleString()}</strong> / {maxXP.toLocaleString()} XP
          </span>
        </div>
      </div>

      {/* Visual Step Stepper */}
      <div className={styles.stepperContainer}>
        {/* Continuous Track */}
        <div className={styles.stepperTrack}>
          <div
            className={styles.stepperFill}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Milestone Checkpoint Nodes */}
        <div className={styles.nodesRow}>
          {checkpoints.map((cp) => (
            <div key={cp.pct} className={styles.checkpointNode}>
              <div
                className={`${styles.nodeDot} ${
                  cp.reached ? styles.nodeReached : styles.nodeUpcoming
                }`}
              >
                {cp.reached ? (
                  <CheckCircle2 size={12} className={styles.reachedIcon} />
                ) : (
                  <Flag size={10} className={styles.upcomingIcon} />
                )}
              </div>
              <span className={styles.nodeLabel}>{cp.pct}%</span>
              <span className={styles.nodeXP}>{cp.xp.toLocaleString()} XP</span>
            </div>
          ))}
        </div>
      </div>

      {/* Concise Visual Indicators - Unboxed Layout */}
      <div className={styles.summaryStrip}>
        <div className={styles.summaryItem}>
          <span className={styles.summaryDot} style={{ background: '#eab308' }} />
          <span className={styles.summaryLabel}>Tier Progress:</span>
          <span className={styles.summaryVal}>+{currentXP.toLocaleString()} XP</span>
        </div>
        <div className={styles.summaryDivider} />
        <div className={styles.summaryItem}>
          <span className={styles.summaryDot} style={{ background: '#38bdf8' }} />
          <span className={styles.summaryLabel}>Remaining:</span>
          <span className={styles.summaryVal}>{remainingXP.toLocaleString()} XP</span>
        </div>
        <div className={styles.summaryDivider} />
        <div className={styles.summaryItem}>
          <TrendingUp size={13} className="text-success" />
          <span className={styles.summaryLabel}>Pace:</span>
          <span className={`${styles.summaryVal} text-success`}>On Track</span>
        </div>
      </div>
    </div>
  );
};

export default XPProgress;
