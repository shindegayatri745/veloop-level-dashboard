import React, { useState, useEffect } from 'react';
import {
  Gamepad2,
  Star,
  Clock,
  Users,
  Play,
  RotateCcw,
  Sparkles,
  Trophy,
  X,
  Zap,
  CheckCircle2,
  Flame
} from 'lucide-react';
import styles from './PlayAndEarn.module.css';

// Aesthetic game theme color mapping
const gameThemes = {
  game_01: {
    gradient: 'linear-gradient(135deg, #0284c7 0%, #1e1b4b 100%)',
    iconColor: '#38bdf8',
    icon: '🏎️',
  },
  game_02: {
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #1e1b4b 100%)',
    iconColor: '#a78bfa',
    icon: '🔐',
  },
  game_03: {
    gradient: 'linear-gradient(135deg, #059669 0%, #132e27 100%)',
    iconColor: '#34d399',
    icon: '⚔️',
  },
  game_04: {
    gradient: 'linear-gradient(135deg, #d97706 0%, #291809 100%)',
    iconColor: '#fbbf24',
    icon: '🌌',
  },
};

const PlayAndEarn = ({ games, onPlayGame, awardGameXP }) => {
  // Game loop state machine: 'idle' | 'briefing' | 'playing' | 'result'
  const [activeGame, setActiveGame] = useState(null);
  const [gameState, setGameState] = useState('idle');
  const [timer, setTimer] = useState(3);
  const [score, setScore] = useState(0);
  const [clicks, setClicks] = useState(0);

  // Gameplay countdown timer
  useEffect(() => {
    if (gameState !== 'playing') return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setGameState('result');
          const calculatedXP = activeGame?.xpReward || 250;
          if (awardGameXP) {
            awardGameXP(activeGame?.id, calculatedXP, activeGame?.title);
          } else if (onPlayGame) {
            onPlayGame(activeGame?.id);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState, activeGame, awardGameXP, onPlayGame]);

  const handleOpenGame = (game) => {
    setActiveGame(game);
    setGameState('briefing');
    setScore(0);
    setClicks(0);
  };

  const handleStartPlay = () => {
    setGameState('playing');
    setTimer(4);
    setScore(100);
    setClicks(0);
  };

  const handleGameAction = () => {
    if (gameState === 'playing') {
      setClicks((prev) => prev + 1);
      setScore((prev) => prev + 150);
    }
  };

  const handleCloseModal = () => {
    setGameState('idle');
    setActiveGame(null);
  };

  const handleReplay = () => {
    handleStartPlay();
  };

  return (
    <div className={styles.sectionCard}>
      {/* Section Header */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center gap-2">
          <div className={styles.iconCircle}>
            <Gamepad2 size={16} />
          </div>
          <div>
            <h2 className={styles.sectionTitle}>Play & Earn XP</h2>
            <span className={styles.sectionSubtitle}>
              Interactive arcade titles with active 2.0x boost
            </span>
          </div>
        </div>
        <span className={styles.countBadge}>{games?.length || 4} Featured</span>
      </div>

      {/* Games 2x2 Grid */}
      <div className="row g-3">
        {games?.map((game) => {
          const theme = gameThemes[game.id] || gameThemes.game_01;

          return (
            <div key={game.id} className="col-12 col-sm-6">
              <div className={styles.gameCard}>
                {/* Visual Header Banner */}
                <div
                  className={styles.bannerHeader}
                  style={{ background: theme.gradient }}
                >
                  <div className={styles.bannerEmoji}>{theme.icon}</div>
                  <div className="d-flex align-items-center gap-1">
                    {game.isHot && (
                      <span className={styles.hotPill}>
                        <Flame size={11} fill="#f97316" color="#f97316" /> HOT
                      </span>
                    )}
                    <span className={styles.xpPill}>+{game.xpReward} XP</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className={styles.cardBody}>
                  <div>
                    <h3 className={styles.gameTitle}>{game.title}</h3>
                    <div className={styles.categoryPill}>{game.category}</div>

                    <div className={styles.metaRow}>
                      <span className={styles.metaItem}>
                        <Clock size={12} /> {game.playTime}
                      </span>
                      <span className={styles.metaItem}>
                        <Users size={12} /> {game.activePlayers}
                      </span>
                      <span className={`${styles.metaItem} text-warning`}>
                        <Star size={12} fill="#eab308" /> {game.rating}
                      </span>
                    </div>
                  </div>

                  <button
                    className={styles.playBtn}
                    onClick={() => handleOpenGame(game)}
                    aria-label={`Play ${game.title}`}
                  >
                    <Play size={14} fill="currentColor" />
                    <span>Play Match</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Game Arena Modal (State Machine) */}
      {gameState !== 'idle' && activeGame && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.gameModal} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeBtn}
              onClick={handleCloseModal}
              aria-label="Close game modal"
            >
              <X size={18} />
            </button>

            {/* STATE 1: BRIEFING */}
            {gameState === 'briefing' && (
              <div className={styles.modalStateContent}>
                <div className={styles.briefingIcon}>
                  {gameThemes[activeGame.id]?.icon || '🎮'}
                </div>
                <span className={styles.matchTag}>Arcade Match Challenge</span>
                <h3 className={styles.modalGameTitle}>{activeGame.title}</h3>
                <p className={styles.modalDesc}>
                  Play a rapid matchmaking session to earn XP toward your <strong>Level 5 Milestone</strong>.
                </p>

                <div className={styles.briefingPills}>
                  <div className={styles.briefingBox}>
                    <span className={styles.bLabel}>Potential Bounty</span>
                    <span className={`${styles.bValue} text-info`}>+{activeGame.xpReward} XP</span>
                  </div>
                  <div className={styles.briefingBox}>
                    <span className={styles.bLabel}>Difficulty</span>
                    <span className={styles.bValue}>{activeGame.difficulty}</span>
                  </div>
                  <div className={styles.briefingBox}>
                    <span className={styles.bLabel}>Boost Applied</span>
                    <span className={`${styles.bValue} text-warning`}>2.0x Multiplier</span>
                  </div>
                </div>

                <button className={styles.startMatchBtn} onClick={handleStartPlay}>
                  <Play size={16} fill="currentColor" />
                  <span>Start Match Now</span>
                </button>
              </div>
            )}

            {/* STATE 2: GAMEPLAY */}
            {gameState === 'playing' && (
              <div className={styles.modalStateContent}>
                <div className={styles.timerCircle}>
                  <span>{timer}s</span>
                </div>
                <h3 className={styles.playingTitle}>Click / Tap Reflex Target!</h3>
                <p className={styles.playingDesc}>Tap rapidly to charge your velocity multiplier.</p>

                <button className={styles.actionCoreBtn} onClick={handleGameAction}>
                  <Zap size={28} className={styles.pulseIcon} />
                  <span>CHARGE CORE (+150 pts)</span>
                </button>

                <div className={styles.liveScore}>
                  <span>Score: <strong>{score}</strong></span> &bull; <span>Clicks: <strong>{clicks}</strong></span>
                </div>
              </div>
            )}

            {/* STATE 3: RESULT & REWARD FEEDBACK */}
            {gameState === 'result' && (
              <div className={styles.modalStateContent}>
                <div className={styles.victoryIcon}>
                  <Trophy size={36} />
                </div>
                <span className={styles.victoryTag}>Match Completed!</span>
                <h3 className={styles.resultTitle}>Victory in {activeGame.title}</h3>

                <div className={styles.rewardBox}>
                  <div className={styles.rewardAmount}>
                    +{activeGame.xpReward} XP
                  </div>
                  <div className={styles.rewardNote}>
                    <Sparkles size={14} className="d-inline text-warning me-1" />
                    Credited directly to Level 4 Progress & History Log
                  </div>
                </div>

                <div className="d-flex align-items-center gap-2 w-100 mt-3">
                  <button className={styles.replayBtn} onClick={handleReplay}>
                    <RotateCcw size={15} />
                    <span>Play Again</span>
                  </button>
                  <button className={styles.returnBtn} onClick={handleCloseModal}>
                    <CheckCircle2 size={15} />
                    <span>Collect & Return</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayAndEarn;
