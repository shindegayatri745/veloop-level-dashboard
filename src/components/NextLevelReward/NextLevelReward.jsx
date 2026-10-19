import React from 'react';
import { Gift, Zap, Coins, Award, Lock, Info } from 'lucide-react';
import styles from './NextLevelReward.module.css';

const NextLevelReward = ({ reward }) => {
  return (
    <div className={styles.rewardCard}>
      {/* Top Header */}
      <div>
        <div className="d-flex align-items-center justify-content-between mb-2">
          <span className={styles.milestoneBadge}>
            <Gift size={13} />
            Level {reward?.level || 5} Milestone
          </span>
          <span className={styles.timeEstimate}>~{reward?.estimatedDaysLeft || 4} days away</span>
        </div>

        <div className="d-flex align-items-center gap-2 mb-1">
          <h3 className={styles.rewardTitle}>{reward?.title || 'Platinum Master Tier'}</h3>
        </div>

        {/* Compact Perks Chips */}
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
              <span className={styles.chipLabel}>Milestone Badge</span>
              <span className={styles.chipValue}>{reward?.exclusiveBadge || 'Platinum Dragoncrest'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Details & Disclaimer */}
      <div className={styles.cardFooter}>
        <div className="d-flex align-items-center justify-content-between text-muted fs-7 mb-2">
          <span className="d-flex align-items-center gap-1 text-light">
            <Lock size={12} className="text-secondary" />
            Unlocks at 5,000 XP
          </span>
          <span className={styles.autoUnlockPill}>Automatic Grant</span>
        </div>

        {/* Disclaimer - Requirement 6 */}
        <div className={styles.disclaimer}>
          <Info size={11} className="flex-shrink-0 mt-0.5" />
          <span>Demo engagement tokens only. No cash or real credit value.</span>
        </div>
      </div>
    </div>
  );
};

export default NextLevelReward;
