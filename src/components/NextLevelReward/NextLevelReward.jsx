import React, { useState } from 'react';
import { Gift, Zap, Coins, Award, Lock, Info, Sparkles } from 'lucide-react';
import styles from './NextLevelReward.module.css';

const NextLevelReward = ({ reward }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className={styles.rewardCard}>
      {/* Ambient Spotlight Glow */}
      <div className={styles.ambientGlow} />

      {/* Top Milestone Badge */}
      <div className="d-flex align-items-center justify-content-between mb-2">
        <span className={styles.milestoneBadge}>
          <Gift size={13} />
          Level {reward?.level || 5} Reward Spotlight
        </span>
        <span className={styles.timePill}>~{reward?.estimatedDaysLeft || 4}d away</span>
      </div>

      {/* Reward Main Visual & Title */}
      <div className="d-flex align-items-center gap-3 mb-3">
        <div className={styles.rewardEmblem}>
          <Sparkles size={24} className={styles.sparkleIcon} />
        </div>
        <div>
          <h3 className={styles.rewardTitle}>{reward?.title || 'Platinum Master Tier'}</h3>
          <span className={styles.rewardSubtitle}>
            Unlocks automatically at 5,000 XP
          </span>
        </div>
      </div>

      {/* Visual Perks Matrix */}
      <div className={styles.perksGrid}>
        <div className={styles.perkChip}>
          <div className={styles.chipIconBox}>
            <Zap size={14} className="text-info" />
          </div>
          <div>
            <span className={styles.chipLabel}>Boost</span>
            <span className={styles.chipValue}>{reward?.multiplier || '2.5x'}</span>
          </div>
        </div>

        <div className={styles.perkChip}>
          <div className={styles.chipIconBox}>
            <Coins size={14} className="text-warning" />
          </div>
          <div>
            <span className={styles.chipLabel}>Bonus</span>
            <span className={styles.chipValue}>+{reward?.coinBonus?.toLocaleString() || '2,500'} Coins</span>
          </div>
        </div>

        <div className={styles.perkChipFull}>
          <div className={styles.chipIconBox}>
            <Award size={14} className="text-primary" />
          </div>
          <div>
            <span className={styles.chipLabel}>Milestone Emblem</span>
            <span className={styles.chipValue}>{reward?.exclusiveBadge || 'Platinum Dragoncrest'}</span>
          </div>
        </div>
      </div>

      {/* Footer Unlock Progress & Tooltip Disclaimer */}
      <div className={styles.cardFooter}>
        <div className="d-flex align-items-center gap-1">
          <Lock size={12} className="text-muted" />
          <span className={styles.unlockText}>1,550 XP Remaining</span>
        </div>

        {/* Info Tooltip Popover */}
        <div
          className="position-relative"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <button
            type="button"
            className={styles.infoBtn}
            onClick={() => setShowTooltip((prev) => !prev)}
            aria-label="Reward information and disclaimer"
          >
            <Info size={13} />
            <span className="d-none d-sm-inline">Info</span>
          </button>

          {showTooltip && (
            <div className={styles.tooltipPopover} role="tooltip">
              <span>Demo engagement rewards. Auto-credited upon reaching Level 5. No fiat or monetary value.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NextLevelReward;
