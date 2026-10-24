import React, { useState } from 'react';
import { Target, Flag, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import styles from './XPProgress.module.css';

const XPProgress = ({ profile }) => {
  const [showDetails, setShowDetails] = useState(false);
  const currentXP = profile?.currentXP || 3450;
  const maxXP = profile?.maxXPForLevel || 5000;
  const progressPercent = Math.min(Math.round((currentXP / maxXP) * 100), 100);
  const remainingXP = Math.max(maxXP - currentXP, 0);

  const checkpoints = [
    { label: '0%', pct: 0, xp: 0, reached: true },
    { label: '25%', pct: 25, xp: Math.round(maxXP * 0.25), reached: currentXP >= maxXP * 0.25 },
    { label: '50%', pct: 50, xp: Math.round(maxXP * 0.5), reached: currentXP >= maxXP * 0.5 },
    { label: '75%', pct: 75, xp: Math.round(maxXP * 0.75), reached: currentXP >= maxXP * 0.75 },
    { label: '100%', pct: 100, xp: maxXP, reached: currentXP >= maxXP },
  ];

  const nextCheckpoint = checkpoints.find((cp) => !cp.reached);

  return (
    <div className={styles.progressSection}>
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-2">
        <div className="d-flex align-items-center gap-2">
          <div className={styles.iconCircle}>
            <Target size={15} />
          </div>
          <div>
            <h2 className={styles.headingTitle}>Milestones</h2>
            <span className={styles.headingSubtitle}>
              Level {profile?.currentLevel || 4} &rarr; Level {profile?.nextLevel || 5}
            </span>
          </div>
        </div>

        <span className={styles.currentXPText}>
          <strong>{remainingXP.toLocaleString()} XP</strong> to next tier
        </span>
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
          {checkpoints.map((cp) => {
            const isNext = nextCheckpoint && nextCheckpoint.pct === cp.pct;

            return (
              <div key={cp.pct} className={styles.checkpointNode}>
                <div
                  className={`${styles.nodeDot} ${
                    cp.reached
                      ? styles.nodeReached
                      : isNext
                      ? styles.nodeNext
                      : styles.nodeUpcoming
                  }`}
                >
                  {cp.reached ? (
                    <CheckCircle2 size={12} className={styles.reachedIcon} />
                  ) : (
                    <Flag size={10} className={styles.upcomingIcon} />
                  )}
                </div>
                <span className={`${styles.nodeLabel} ${isNext ? styles.nodeLabelNext : ''}`}>
                  {cp.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Concise Visual Indicator & Optional Details Toggle */}
      <div className="d-flex align-items-center justify-content-between pt-1">
        <span className={styles.compactStatus}>
          Current: <strong>{progressPercent}%</strong> &bull; Next target:{' '}
          <strong className="text-info">{nextCheckpoint?.pct || 100}% ({nextCheckpoint?.xp?.toLocaleString()} XP)</strong>
        </span>

        <button
          className={styles.detailsToggle}
          onClick={() => setShowDetails((prev) => !prev)}
          aria-expanded={showDetails}
          title="Toggle checkpoint details"
        >
          <span>{showDetails ? 'Hide' : 'Details'}</span>
          {showDetails ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
      </div>

      {/* Expandable Breakdown (Only if user wants full details) */}
      {showDetails && (
        <div className={styles.detailsDropdown}>
          {checkpoints.map((cp) => (
            <div key={cp.pct} className={styles.detailRow}>
              <span>{cp.pct}% Milestone</span>
              <strong>{cp.xp.toLocaleString()} XP</strong>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default XPProgress;
