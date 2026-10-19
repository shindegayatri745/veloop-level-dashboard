import React from 'react';
import { X, Trophy, Sparkles, CheckCircle } from 'lucide-react';
import styles from './LevelUpModal.module.css';

const LevelUpModal = ({ isOpen, onClose, profile }) => {
  if (!isOpen) return null;

  const currentLevel = profile?.currentLevel || 4;
  const levelName = profile?.currentLevelName || 'Gold Elite';

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Celebration Header */}
        <div className={styles.celebrationIcon}>
          <Trophy size={38} />
        </div>

        <span className={styles.tierPill}>
          <Sparkles size={13} /> Tier Milestone Unlocked
        </span>

        <h3 className={styles.modalTitle}>
          Level {currentLevel}: {levelName}
        </h3>
        <p className={styles.modalDesc}>
          Congratulations, <strong className="text-white">{profile?.username || 'Velooper'}</strong>! Your XP momentum has elevated your account to the next rewards tier.
        </p>

        {/* Perks Showcase */}
        <div className={styles.perksBox}>
          <div className={styles.perkItem}>
            <CheckCircle size={16} className="text-success flex-shrink-0" />
            <span>
              <strong>{currentLevel >= 5 ? '2.5x' : '2.0x'} Boost Multiplier</strong> on all activities
            </span>
          </div>
          <div className={styles.perkItem}>
            <CheckCircle size={16} className="text-success flex-shrink-0" />
            <span>
              Unlocked <strong>{currentLevel >= 5 ? 'Platinum Dragoncrest' : 'Gold Crown'}</strong> profile emblem
            </span>
          </div>
          <div className={styles.perkItem}>
            <CheckCircle size={16} className="text-success flex-shrink-0" />
            <span>Priority access to <strong>VIP Tournaments & Flash Drops</strong></span>
          </div>
          <div className={styles.perkItem}>
            <CheckCircle size={16} className="text-success flex-shrink-0" />
            <span>Special Community Tier Flair & Discord Perks</span>
          </div>
        </div>

        <button className={styles.claimButton} onClick={onClose}>
          <Sparkles size={16} className="d-inline me-2" />
          Claim Perks & Continue
        </button>
      </div>
    </div>
  );
};

export default LevelUpModal;
