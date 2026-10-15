import React from 'react';
import { X, Trophy, Sparkles, CheckCircle, Zap } from 'lucide-react';
import styles from './LevelUpModal.module.css';

const LevelUpModal = ({ isOpen, onClose, profile }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        <div className={styles.celebrationIcon}>
          <Trophy size={36} />
        </div>

        <span className={styles.tierPill}>
          <Zap size={14} /> Tier Unlocked
        </span>

        <h3 className={styles.modalTitle}>
          Level {profile?.currentLevel || 4}: {profile?.currentLevelName || 'Gold Elite'}
        </h3>
        <p className={styles.modalDesc}>
          Congratulations, <strong className="text-white">{profile?.username || 'Velooper'}</strong>! You have reached this milestone and unlocked the following benefits:
        </p>

        {/* Perks Showcase */}
        <div className={styles.perksBox}>
          <div className={styles.perkItem}>
            <CheckCircle size={16} className="text-success flex-shrink-0" />
            <span><strong>2.0x Boost Multiplier</strong> on all activity XP</span>
          </div>
          <div className={styles.perkItem}>
            <CheckCircle size={16} className="text-success flex-shrink-0" />
            <span>Access to <strong>Weekly VIP Tournaments</strong></span>
          </div>
          <div className={styles.perkItem}>
            <CheckCircle size={16} className="text-success flex-shrink-0" />
            <span>Unlocked <strong>Gold Crown Profile Crest</strong></span>
          </div>
          <div className={styles.perkItem}>
            <CheckCircle size={16} className="text-success flex-shrink-0" />
            <span>Priority Queue & Flash Drops Eligibility</span>
          </div>
        </div>

        <button className={styles.claimButton} onClick={onClose}>
          <Sparkles size={18} className="d-inline me-2" />
          Awesome! Claim & Continue
        </button>
      </div>
    </div>
  );
};

export default LevelUpModal;
