import React, { useState } from 'react';
import {
  Map,
  CheckCircle2,
  Lock,
  Award,
  ChevronRight,
  Sparkles,
  Crown,
  Gem,
  Star,
  Shield
} from 'lucide-react';
import styles from './LevelRoadmap.module.css';

const tierIcons = {
  1: Star,
  2: Shield,
  3: Sparkles,
  4: Crown,
  5: Award,
  6: Gem,
};

const LevelRoadmap = ({ roadmap }) => {
  const [filter, setFilter] = useState('all'); // 'all' | 'completed' | 'current' | 'locked'
  const [selectedTier, setSelectedTier] = useState(roadmap?.find((t) => t.status === 'current') || roadmap?.[3]);

  const filteredRoadmap = roadmap?.filter((tier) => {
    if (filter === 'all') return true;
    return tier.status === filter;
  });

  return (
    <div className={styles.roadmapSection} id="roadmap">
      {/* Section Header */}
      <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3 mb-3">
        <div className="d-flex align-items-center gap-2">
          <div className={styles.iconCircle}>
            <Map size={16} />
          </div>
          <div>
            <h2 className={styles.headingTitle}>Level Progression Roadmap</h2>
            <span className={styles.headingSubtitle}>
              Progress from Level 1 Pioneer to Level 6 Diamond Champion
            </span>
          </div>
        </div>

        {/* Filter Pills */}
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
            Active (L4)
          </button>
          <button
            className={`${styles.filterBtn} ${filter === 'locked' ? styles.filterBtnActive : ''}`}
            onClick={() => setFilter('locked')}
          >
            Upcoming
          </button>
        </div>
      </div>

      {/* Connected Progression Journey Track */}
      <div className={styles.trackContainer}>
        {/* Desktop Continuous Connecting Line */}
        <div className={styles.connectingLineDesktop}>
          <div className={styles.completedLineProgress} />
        </div>

        {/* Vertical Connecting Line for Mobile */}
        <div className={styles.connectingLineMobile} />

        <div className={styles.nodesWrapper}>
          {filteredRoadmap?.map((tier) => {
            const isCompleted = tier.status === 'completed';
            const isCurrent = tier.status === 'current';
            const isSelected = selectedTier?.level === tier.level;
            const TierIconComponent = tierIcons[tier.level] || Award;

            return (
              <div
                key={tier.level}
                className={`${styles.roadmapNodeCard} ${
                  isCurrent
                    ? styles.nodeCurrent
                    : isCompleted
                    ? styles.nodeCompleted
                    : styles.nodeLocked
                } ${isSelected ? styles.nodeSelected : ''} ${
                  tier.level === 1
                    ? styles.tierBronze
                    : tier.level <= 3
                    ? styles.tierSilver
                    : tier.level === 4
                    ? styles.tierGold
                    : tier.level === 5
                    ? styles.tierPlatinum
                    : styles.tierDiamond
                }`}
                onClick={() => setSelectedTier(tier)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedTier(tier);
                  }
                }}
                aria-label={`View details for Level ${tier.level} ${tier.name}`}
              >
                {/* Node Level Bubble & Connector Node */}
                <div className={styles.nodeBubbleWrapper}>
                  <div className={styles.nodeBubble}>
                    {isCompleted ? (
                      <CheckCircle2 size={16} className={styles.completedCheck} />
                    ) : isCurrent ? (
                      <Crown size={18} className={styles.currentCrown} />
                    ) : (
                      <Lock size={14} className={styles.lockedLock} />
                    )}
                  </div>
                  <span className={styles.levelIndicator}>LVL {tier.level}</span>
                </div>

                {/* Level Details */}
                <div className={styles.nodeContent}>
                  <div className="d-flex align-items-center justify-content-between gap-1 mb-1">
                    <span className={styles.tierName}>{tier.name}</span>
                    {isCurrent && <span className={styles.currentBadge}>Current</span>}
                  </div>

                  {tier.rewardBadge && (
                    <div className={styles.rewardBadgeChip}>
                      <TierIconComponent size={11} className="flex-shrink-0" />
                      <span>{tier.rewardBadge}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Tier Spotlight Drawer (Eliminates redundant text across all cards) */}
      {selectedTier && (
        <div className={styles.tierSpotlight}>
          <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2 mb-2 pb-2 border-bottom border-secondary border-opacity-25">
            <div className="d-flex align-items-center gap-2">
              <span className={styles.spotlightLevelTag}>Level {selectedTier.level}</span>
              <h3 className={styles.spotlightTitle}>{selectedTier.name}</h3>
              <span
                className={`${styles.spotlightStatusTag} ${
                  selectedTier.status === 'current'
                    ? styles.statusCurrentTag
                    : selectedTier.status === 'completed'
                    ? styles.statusCompletedTag
                    : styles.statusLockedTag
                }`}
              >
                {selectedTier.status === 'current'
                  ? 'Current Active Tier'
                  : selectedTier.status === 'completed'
                  ? 'Tier Achieved'
                  : 'Locked Milestone'}
              </span>
            </div>

            <span className={styles.spotlightXP}>
              Milestone Requirement: <strong>{selectedTier.minXP.toLocaleString()} – {selectedTier.maxXP.toLocaleString()} XP</strong>
            </span>
          </div>

          {/* Perks Row with Visual Badges */}
          <div className="row g-2 align-items-center">
            <div className="col-12 col-md-auto">
              <span className={styles.perksTitle}>
                <Sparkles size={13} className="text-warning d-inline me-1" />
                Unlocked Perks:
              </span>
            </div>
            <div className="col-12 col-md">
              <div className="d-flex flex-wrap gap-2">
                {selectedTier.perks.map((perk, idx) => (
                  <span key={idx} className={styles.perkBadge}>
                    <ChevronRight size={12} className="text-info" />
                    {perk}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LevelRoadmap;
