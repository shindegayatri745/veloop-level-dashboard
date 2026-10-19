import React, { useState, useRef } from 'react';
import {
  Map,
  CheckCircle2,
  Lock,
  Flame,
  ChevronLeft,
  ChevronRight,
  Award
} from 'lucide-react';
import styles from './LevelRoadmap.module.css';

const LevelRoadmap = ({ roadmap }) => {
  const [filter, setFilter] = useState('all'); // 'all' | 'completed' | 'current' | 'locked'
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -240 : 240;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const filteredRoadmap = roadmap?.filter((tier) => {
    if (filter === 'all') return true;
    return tier.status === filter;
  });

  return (
    <div className={styles.sectionCard}>
      {/* Header & Controls */}
      <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3 mb-3">
        <div className="d-flex align-items-center gap-2">
          <div className={styles.iconCircle}>
            <Map size={16} />
          </div>
          <div>
            <h2 className={styles.sectionTitle}>Tier Progression Roadmap</h2>
            <span className={styles.sectionSubtitle}>
              Milestones from Level 1 Pioneer to Level 6 Champion
            </span>
          </div>
        </div>

        {/* Filter Pills & Scroll Arrows */}
        <div className="d-flex align-items-center gap-2 w-100 w-md-auto justify-content-between justify-content-md-end">
          <div className={styles.filterPills}>
            <button
              className={`${styles.filterBtn} ${filter === 'all' ? styles.filterBtnActive : ''}`}
              onClick={() => setFilter('all')}
            >
              All (6)
            </button>
            <button
              className={`${styles.filterBtn} ${filter === 'completed' ? styles.filterBtnActive : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
            <button
              className={`${styles.filterBtn} ${filter === 'current' ? styles.filterBtnActive : ''}`}
              onClick={() => setFilter('current')}
            >
              Active
            </button>
            <button
              className={`${styles.filterBtn} ${filter === 'locked' ? styles.filterBtnActive : ''}`}
              onClick={() => setFilter('locked')}
            >
              Locked
            </button>
          </div>

          <div className="d-none d-md-flex align-items-center gap-1">
            <button
              className={styles.scrollBtn}
              onClick={() => scroll('left')}
              aria-label="Scroll roadmap left"
              title="Scroll left"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              className={styles.scrollBtn}
              onClick={() => scroll('right')}
              aria-label="Scroll roadmap right"
              title="Scroll right"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Roadmap Cards Track */}
      <div className={styles.roadmapScrollArea} ref={scrollRef}>
        <div className={styles.roadmapGrid}>
          {filteredRoadmap?.map((tier) => {
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
                {/* Status Header */}
                <div className={styles.tierHeader}>
                  <span className={styles.levelTag}>LVL {tier.level}</span>
                  {isCompleted && (
                    <span className={styles.statusBadgeCompleted}>
                      <CheckCircle2 size={12} /> Unlocked
                    </span>
                  )}
                  {isCurrent && (
                    <span className={styles.statusBadgeCurrent}>
                      <Flame size={12} /> Active Tier
                    </span>
                  )}
                  {isLocked && (
                    <span className={styles.statusBadgeLocked}>
                      <Lock size={12} /> Locked
                    </span>
                  )}
                </div>

                {/* Tier Name & XP Milestone */}
                <div className={styles.tierName}>{tier.name}</div>
                <div className={styles.tierXP}>
                  {tier.minXP.toLocaleString()} - {tier.maxXP.toLocaleString()} XP
                </div>

                {/* Badge Reward Pill */}
                {tier.rewardBadge && (
                  <div className={styles.badgePill}>
                    <Award size={12} className="flex-shrink-0" />
                    <span>{tier.rewardBadge}</span>
                  </div>
                )}

                {/* Perks Preview */}
                <ul className={styles.perksList}>
                  {tier.perks.map((perk, idx) => (
                    <li key={idx}>
                      <span className={styles.bullet}>•</span>
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LevelRoadmap;
