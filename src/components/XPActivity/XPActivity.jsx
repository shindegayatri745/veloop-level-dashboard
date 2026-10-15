import React from 'react';
import { History, Award, CheckCircle, Zap } from 'lucide-react';
import styles from './XPActivity.module.css';

const XPActivity = ({ activities }) => {
  return (
    <div className={styles.sectionCard}>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center gap-2">
          <History size={18} className="text-secondary" />
          <h2 className="fs-5 fw-bold text-white mb-0">Recent Activity</h2>
        </div>
        <span className="text-muted fs-7">Live History</span>
      </div>

      <div className={styles.activityList}>
        {activities?.map((act) => (
          <div key={act.id} className={styles.activityRow}>
            <div className="d-flex align-items-center gap-3">
              <div className={styles.iconBox}>
                {act.type === 'game_win' && <Zap size={18} />}
                {act.type === 'quest_complete' && <CheckCircle size={18} />}
                {act.type === 'level_milestone' && <Award size={18} />}
                {act.type === 'challenge' && <Zap size={18} />}
                {act.type === 'social' && <Award size={18} />}
              </div>
              <div>
                <div className={styles.title}>{act.title}</div>
                <div className={styles.meta}>
                  <span>{act.timestamp}</span> • <span className="text-info">{act.category}</span>
                </div>
              </div>
            </div>

            <div className={styles.xpValue}>
              +{act.xpAmount} XP
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default XPActivity;
