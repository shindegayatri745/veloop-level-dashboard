import React from 'react';
import { Target, CheckCircle2, Sparkles, Plus } from 'lucide-react';
import styles from './EarnMoreXP.module.css';

const EarnMoreXP = ({ tasks, onCompleteTask, onProgressTask, onClaimTaskReward }) => {
  const completedCount = tasks?.filter((t) => t.isCompleted).length || 0;
  const totalCount = tasks?.length || 4;

  const handleAction = (task) => {
    if (task.isCompleted) return;

    if (task.progress >= task.totalRequired) {
      if (onClaimTaskReward) {
        onClaimTaskReward(task.id);
      } else if (onCompleteTask) {
        onCompleteTask(task.id);
      }
    } else {
      if (onProgressTask) {
        onProgressTask(task.id);
      } else if (onCompleteTask) {
        onCompleteTask(task.id);
      }
    }
  };

  return (
    <div className={styles.sectionCard} id="quests">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center gap-2">
          <div className={styles.iconCircle}>
            <Target size={16} />
          </div>
          <div>
            <h2 className={styles.sectionTitle}>Daily & Social Quests</h2>
            <span className={styles.sectionSubtitle}>
              Complete objectives to earn bonus XP
            </span>
          </div>
        </div>
        <span className={styles.summaryBadge}>
          {completedCount}/{totalCount} Completed
        </span>
      </div>

      {/* Quest Items List */}
      <div className="d-flex flex-column gap-2">
        {tasks?.map((task) => {
          const isReadyToClaim = !task.isCompleted && task.progress >= task.totalRequired;
          const pct = Math.min(Math.round((task.progress / task.totalRequired) * 100), 100);

          return (
            <div
              key={task.id}
              className={`${styles.taskCard} ${
                task.isCompleted
                  ? styles.taskCompleted
                  : isReadyToClaim
                  ? styles.taskReady
                  : ''
              }`}
            >
              {/* Task Title & Tags */}
              <div className="d-flex align-items-start justify-content-between gap-2 mb-2">
                <div>
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <span className={styles.categoryBadge}>{task.category}</span>
                    <span className={styles.taskTitle}>{task.title}</span>
                  </div>
                  <span className={styles.taskGoalText}>{task.description}</span>
                </div>
                <span className={styles.xpRewardTag}>+{task.rewardXP} XP</span>
              </div>

              {/* Progress Bar & Actions */}
              <div className="d-flex align-items-center justify-content-between gap-3 mt-2">
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between fs-7 mb-1">
                    <span className={styles.progressCounter}>
                      Step {task.progress}/{task.totalRequired}
                    </span>
                    <span className={styles.pctText}>{pct}%</span>
                  </div>
                  <div className={styles.progressTrack}>
                    <div
                      className={`${styles.progressBar} ${
                        task.isCompleted ? styles.progressBarDone : ''
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                {/* State-driven Button */}
                <div className="flex-shrink-0">
                  {task.isCompleted ? (
                    <div className={styles.claimedPill}>
                      <CheckCircle2 size={13} />
                      <span>Claimed</span>
                    </div>
                  ) : isReadyToClaim ? (
                    <button
                      className={styles.claimBtn}
                      onClick={() => handleAction(task)}
                      title={`Claim +${task.rewardXP} XP`}
                    >
                      <Sparkles size={13} />
                      <span>Claim XP</span>
                    </button>
                  ) : (
                    <button
                      className={styles.advanceBtn}
                      onClick={() => handleAction(task)}
                      title={`Complete step for ${task.title}`}
                    >
                      <Plus size={13} />
                      <span>Step ({task.progress}/{task.totalRequired})</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EarnMoreXP;
