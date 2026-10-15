import React from 'react';
import { Zap, Bell, Flame } from 'lucide-react';
import styles from './Header.module.css';

const Header = ({ profile }) => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          {/* Brand Logo */}
          <div className="d-flex align-items-center gap-3">
            <a href="#home" className={styles.brand}>
              <div className={styles.logoIcon}>
                <Zap size={20} />
              </div>
              <span>VELOOP</span>
            </a>
            <span className={styles.badge}>Level-Up Rewards</span>
          </div>

          {/* Navigation Items */}
          <nav className="d-none d-md-flex align-items-center gap-4">
            <ul className={styles.navLinks}>
              <li><a href="#dashboard" className={`${styles.navLink} ${styles.navLinkActive}`}>Dashboard</a></li>
              <li><a href="#roadmap" className={styles.navLink}>Roadmap</a></li>
              <li><a href="#play" className={styles.navLink}>Play & Earn</a></li>
              <li><a href="#activity" className={styles.navLink}>Activity</a></li>
            </ul>
          </nav>

          {/* User Profile & Quick Stats */}
          <div className="d-flex align-items-center gap-3">
            {profile?.streakDays && (
              <div className="d-none d-sm-flex align-items-center gap-1 text-warning fw-semibold fs-7" title="Daily Streak">
                <Flame size={18} fill="#ffb300" color="#ffb300" />
                <span>{profile.streakDays}d Streak</span>
              </div>
            )}

            {/* Notification Bell */}
            <button className={styles.iconButton} aria-label="Notifications" title="2 New Rewards Alerts">
              <Bell size={18} />
              <span className={styles.notificationDot}></span>
            </button>

            {/* User Chip */}
            <div className={styles.userCard}>
              <img
                src={profile?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                alt={profile?.username || 'User'}
                className={styles.avatar}
              />
              <span className={styles.userName}>{profile?.username || 'Velooper'}</span>
              <span className={styles.levelTag}>LVL {profile?.currentLevel || 1}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
