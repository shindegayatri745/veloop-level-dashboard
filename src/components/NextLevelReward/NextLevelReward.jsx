import React, { useState } from 'react';
import { Gift, Zap, Coins, Award, ChevronDown, ChevronUp } from 'lucide-react';
import styles from './NextLevelReward.module.css';

const NextLevelReward = ({ reward }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className={styles.rewardContainer}>
      {/* Top Header */}
      <div className="d-flex align-items-center justify-content-between mb-2">
        <div className="d-flex align-items-center gap-2">
          <div className={styles.rewardEmblem}>
            <Gift size={15} />
          </div>
          <div>
            <h2 className={styles.rewardTitle}>Next Reward Target</h2>
            <span className={styles.rewardSubtitle}>
              {reward?.title || 'Level 5 Platinum Master'}
            </span>
          </div>
        </div>

        <span className={styles.reqXPText}>
          <strong>1,550 XP</strong> remaining
        </span>
      </div>

      {/* Main Unlock Banner Info */}
      <div className={styles.unlockBanner}>
        <div className="d-flex align-items-center justify-content-between mb-2">
          <span className={styles.unlockNotice}>Unlocks automatically at 5,000 XP</span>
          <span className={styles.timeNotice}>~{reward?.estimatedDaysLeft || 4}d at current pace</span>
        </div>

        {/* Compact Perk Chips Preview (No nested card boxes) */}
        <div className="d-flex flex-wrap gap-2">
          <div className={styles.perkPill}>
            <Zap size={13} className="text-info" />
            <span>{reward?.multiplier || '2.5x'} Boost</span>
          </div>
          <div className={styles.perkPill}>
            <Coins size={13} className="text-warning" />
            <span>+{reward?.coinBonus?.toLocaleString() || '2,500'} Coins</span>
          </div>
          <div className={styles.perkPill}>
            <Award size={13} className="text-primary" />
            <span>{reward?.exclusiveBadge || 'Platinum Crest'}</span>
          </div>
        </div>
      </div>

      {/* Optional Details Expandable */}
      <div className="d-flex justify-content-end mt-2">
        <button
          className={styles.detailsBtn}
          onClick={() => setShowDetails((prev) => !prev)}
          aria-expanded={showDetails}
          title="Toggle perk tier terms"
        >
          <span>{showDetails ? 'Hide details' : 'Perk details'}</span>
          {showDetails ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
      </div>

      {showDetails && (
        <div className={styles.expandableNote}>
          <p className="mb-0">
            Upon reaching Level 5, your 2.5x earning multiplier applies to all arcade games, daily bounties, and streak bonuses. Engagement demo tokens hold no cash value.
          </p>
        </div>
      )}
    </div>
  );
};

export default NextLevelReward;
