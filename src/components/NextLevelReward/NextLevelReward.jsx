import React from 'react';
import { Gift, Zap, Coins, Award } from 'lucide-react';
import styles from './NextLevelReward.module.css';

const NextLevelReward = ({ reward }) => {
  return (
    <div className={styles.rewardCard}>
      <div>
        <div className="d-flex align-items-center justify-content-between mb-2">
          <span className={styles.topBadge}>
            <Gift size={14} />
            Level {reward?.level || 5} Milestone
          </span>
          <span className="text-muted fs-7">~{reward?.estimatedDaysLeft || 4} days away</span>
        </div>

        <h3 className={styles.title}>{reward?.title || 'Platinum Master Tier Unlock'}</h3>
        <p className={styles.description}>
          {reward?.description || 'Unlock exclusive perks, point multiplier boosts, and special VIP rewards.'}
        </p>

        <div className={styles.perksGrid}>
          <div className={styles.perkItem}>
            <div className={styles.perkLabel}>Multiplier</div>
            <div className={`${styles.perkValue} text-info d-flex align-items-center gap-1`}>
              <Zap size={14} />
              {reward?.multiplier || '2.5x'}
            </div>
          </div>
          <div className={styles.perkItem}>
            <div className={styles.perkLabel}>Coin Bonus</div>
            <div className={`${styles.perkValue} text-warning d-flex align-items-center gap-1`}>
              <Coins size={14} />
              +{reward?.coinBonus?.toLocaleString() || '2,500'}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-2 border-top border-secondary border-opacity-25 d-flex align-items-center justify-content-between text-muted fs-7">
        <span className="d-flex align-items-center gap-1">
          <Award size={14} className="text-primary" />
          {reward?.exclusiveBadge || 'Platinum Dragoncrest'}
        </span>
        <span className="fw-semibold text-light">Automatic Unlock</span>
      </div>
    </div>
  );
};

export default NextLevelReward;
