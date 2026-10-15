import React from 'react';
import { Gamepad2, Star, Clock } from 'lucide-react';
import styles from './PlayAndEarn.module.css';

const PlayAndEarn = ({ games, onPlayGame }) => {
  return (
    <div className={styles.sectionCard}>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center gap-2">
          <Gamepad2 size={20} className="text-warning" />
          <h2 className="fs-5 fw-bold text-white mb-0">Play & Earn XP</h2>
        </div>
        <span className="text-muted fs-7">Featured titles</span>
      </div>

      <div className="row g-3">
        {games?.map((game) => (
          <div key={game.id} className="col-12 col-md-6">
            <div className={styles.gameCard}>
              <div>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h3 className={styles.gameTitle}>{game.title}</h3>
                    <div className={styles.category}>{game.category}</div>
                  </div>
                  <span className={styles.xpBadge}>+{game.xpReward} XP</span>
                </div>

                <div className="d-flex align-items-center gap-3 text-muted fs-7 mb-3">
                  <span className="d-flex align-items-center gap-1">
                    <Clock size={13} /> {game.playTime}
                  </span>
                  <span className="d-flex align-items-center gap-1 text-warning">
                    <Star size={13} fill="#ffb300" /> {game.rating}
                  </span>
                </div>
              </div>

              <button
                className={styles.playBtn}
                onClick={() => onPlayGame?.(game.id)}
                title={`Launch ${game.title} to earn ${game.xpReward} XP`}
              >
                Play Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayAndEarn;
