import React from 'react';
import { Map, CheckCircle2, Lock, Flame } from 'lucide-react';
import styles from './LevelRoadmap.module.css';

const LevelRoadmap = ({ roadmap }) => {
  return (
    <div className={styles.sectionCard}>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center gap-2">
          <Map size={18} className="text-primary" />
          <h2 className="fs-5 fw-bold text-white mb-0">Tier Roadmap</h2>
        </div>
        <span className="text-muted fs-7">Levels 1 - 6</span>
      </div>

      <div className={styles.roadmapContainer}>
        {roadmap?.map((tier) => {
          const isCompleted = tier.status === 'completed';
          const isCurrent = tier.status === 'current';
          const isLocked = tier.status === 'locked';

          return (
            <div
              key={tier.level}
              className={`${styles.tierCard} ${
                isCurrent
                  ? styles.tierCurrent
                  : isCompleted
                  ? styles.tierCompleted
                  : styles.tierLocked
              }`}
            >
              <div className={styles.tierHeader}>
                <span className={styles.tierLevelNum}>LVL {tier.level}</span>
                {isCompleted && <CheckCircle2 size={16} className="text-success" />}
                {isCurrent && <Flame size={16} className="text-warning" />}
                {isLocked && <Lock size={16} className="text-muted" />}
              </div>

              <div className={styles.tierName}>{tier.name}</div>
              <div className={styles.tierXP}>{tier.minXP.toLocaleString()} - {tier.maxXP.toLocaleString()} XP</div>

              <ul className={styles.perksList}>
                {tier.perks.map((perk, idx) => (
                  <li key={idx} className="d-flex align-items-center gap-1">
                    <span className="text-primary">•</span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LevelRoadmap;
