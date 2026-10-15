import React from 'react';
import { Target, CheckCircle2, ChevronRight } from 'lucide-react';
import styles from './EarnMoreXP.module.css';

const EarnMoreXP = ({ tasks, onCompleteTask }) => {
  return (
    <div className={styles.sectionCard}>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center gap-2">
          <Target size={20} className="text-info" />
          <h2 className="fs-5 fw-bold text-white mb-0">Earn More XP</h2>
        </div>
        <span className="text-muted fs-7">Daily & Social Quests</span>
      </div>

      <div className="d-flex flex-column">
        {tasks?.map((task) => (
          <div key={task.id} className={styles.taskItem}>
            <div>
              <div className="d-flex align-items-center gap-2 mb-1">
                <span className="badge bg-secondary bg-opacity-25 text-info fs-7 fw-semibold">
                  {task.category}
                </span>
                <span className={styles.taskTitle}>{task.title}</span>
              </div>
              <p className={styles.taskDesc}>{task.description}</p>
            </div>

            <div className="d-flex align-items-center gap-3">
              <span className={styles.xpBadge}>+{task.rewardXP} XP</span>

              {task.isCompleted ? (
                <div className={styles.doneBadge}>
                  <CheckCircle2 size={16} />
                  <span>Claimed</span>
                </div>
              ) : (
                <button
                  className={styles.completeBtn}
                  onClick={() => onCompleteTask?.(task.id)}
                  title={`Complete ${task.title} to claim ${task.rewardXP} XP`}
                >
                  <span>Start</span>
                  <ChevronRight size={14} className="ms-1 d-inline" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EarnMoreXP;
