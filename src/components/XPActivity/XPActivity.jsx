import React, { useState } from 'react';
import {
  History,
  Award,
  CheckCircle,
  Flame,
  Gamepad2,
  Sparkles
} from 'lucide-react';
import styles from './XPActivity.module.css';

const XPActivity = ({ activities }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredActivities = activities?.filter((act) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Gaming') return act.category === 'Gaming';
    if (activeFilter === 'Quests') return act.category === 'Quest' || act.category === 'Daily Quest' || act.category === 'Social Quest';
    if (activeFilter === 'Milestones') return act.category === 'Milestone' || act.category === 'Events';
    if (activeFilter === 'Streaks') return act.category === 'Streaks';
    return true;
  });

  return (
    <div className={styles.activitySection} id="activity">
      {/* Open Section Header & Filter Pills */}
      <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3 mb-3">
        <div className="d-flex align-items-center gap-2">
          <div className={styles.iconCircle}>
            <History size={16} />
          </div>
          <div>
            <h2 className={styles.headingTitle}>XP Activity Ledger</h2>
            <span className={styles.headingSubtitle}>
              Recent rewards and milestone events
            </span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className={styles.filterPills}>
          {['All', 'Gaming', 'Quests', 'Streaks', 'Milestones'].map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${activeFilter === cat ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Activity Items List */}
      <div className={styles.activityList}>
        {filteredActivities && filteredActivities.length > 0 ? (
          filteredActivities.map((act) => (
            <div key={act.id} className={styles.activityRow}>
              <div className="d-flex align-items-center gap-3">
                <div
                  className={`${styles.iconBox} ${
                    act.category === 'Gaming'
                      ? styles.iconGaming
                      : act.category === 'Milestone'
                      ? styles.iconMilestone
                      : act.category === 'Streaks'
                      ? styles.iconStreak
                      : styles.iconQuest
                  }`}
                >
                  {act.category === 'Milestone' ? (
                    <Award size={15} />
                  ) : act.category === 'Streaks' ? (
                    <Flame size={15} />
                  ) : act.category === 'Gaming' ? (
                    <Gamepad2 size={15} />
                  ) : (
                    <CheckCircle size={15} />
                  )}
                </div>

                <div>
                  <div className={styles.title}>{act.title}</div>
                  <span className={styles.meta}>{act.timestamp}</span>
                </div>
              </div>

              <div className={styles.xpBadge}>
                <Sparkles size={11} className="text-success d-none d-sm-inline" />
                +{act.xpAmount} XP
              </div>
            </div>
          ))
        ) : (
          <div className={styles.emptyState}>
            <History size={24} className="text-muted opacity-50 mb-2" />
            <p>No activity logged under &quot;{activeFilter}&quot; yet.</p>
            <a href="#play" className={styles.emptyLink}>
              Play an arcade match to earn XP &rarr;
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default XPActivity;
