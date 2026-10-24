import React, { useState, useRef, useEffect } from 'react';
import {
  Zap,
  Bell,
  Flame,
  X,
  CheckCheck,
  Trophy,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  Menu
} from 'lucide-react';
import styles from './Header.module.css';

const Header = ({
  profile,
  notifications = [],
  onMarkAllRead,
  onClearNotifications
}) => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const notifRef = useRef(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  // Close notifications dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotifOpen(false);
      }
    };
    if (isNotifOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNotifOpen]);

  const handleCopyReferral = () => {
    navigator.clipboard?.writeText('https://veloop.gg/ref/Alex_Velooper');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            {/* Brand Logo */}
            <div className="d-flex align-items-center gap-2 gap-sm-3">
              <a href="#dashboard" className={styles.brand}>
                <div className={styles.logoIcon}>
                  <Zap size={18} />
                </div>
                <span>VELOOP</span>
              </a>
              <span className={`d-none d-sm-inline-flex ${styles.badge}`}>Rewards</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="d-none d-lg-flex align-items-center">
              <ul className={styles.navLinks}>
                <li>
                  <a href="#dashboard" className={`${styles.navLink} ${styles.navLinkActive}`}>
                    Overview
                  </a>
                </li>
                <li>
                  <a href="#roadmap" className={styles.navLink}>
                    Roadmap
                  </a>
                </li>
                <li>
                  <a href="#play" className={styles.navLink}>
                    Play & Earn
                  </a>
                </li>
                <li>
                  <a href="#quests" className={styles.navLink}>
                    Quests
                  </a>
                </li>
                <li>
                  <a href="#activity" className={styles.navLink}>
                    Activity
                  </a>
                </li>
              </ul>
            </nav>

            {/* Action Buttons & Profile */}
            <div className="d-flex align-items-center gap-2 gap-sm-3">
              {/* Daily Streak Pill */}
              {profile?.streakDays && (
                <div
                  className={`d-none d-sm-flex align-items-center gap-1 ${styles.streakPill}`}
                  title={`${profile.streakDays}-day active login streak`}
                >
                  <Flame size={16} className={styles.streakIcon} />
                  <span>{profile.streakDays}d Streak</span>
                </div>
              )}

              {/* Notification Bell with Dropdown */}
              <div className="position-relative" ref={notifRef}>
                <button
                  className={`${styles.iconButton} ${isNotifOpen ? styles.iconButtonActive : ''}`}
                  onClick={() => setIsNotifOpen((prev) => !prev)}
                  aria-label="View notifications"
                  title="Notifications"
                >
                  <Bell size={18} />
                  {unreadCount > 0 && (
                    <span className={styles.notificationBadge}>{unreadCount}</span>
                  )}
                </button>

                {isNotifOpen && (
                  <div className={styles.notifDropdown}>
                    <div className={styles.notifHeader}>
                      <div className="d-flex align-items-center gap-2">
                        <span className={styles.notifTitle}>Notifications</span>
                        {unreadCount > 0 && (
                          <span className={styles.notifPill}>{unreadCount} new</span>
                        )}
                      </div>
                      {unreadCount > 0 && (
                        <button
                          className={styles.markReadBtn}
                          onClick={onMarkAllRead}
                          title="Mark all as read"
                        >
                          <CheckCheck size={14} />
                          <span>Mark read</span>
                        </button>
                      )}
                    </div>

                    <div className={styles.notifList}>
                      {notifications.length === 0 ? (
                        <div className={styles.notifEmpty}>
                          <Bell size={24} className="text-muted mb-2 opacity-50" />
                          <p>No new notifications</p>
                        </div>
                      ) : (
                        notifications.map((item) => (
                          <div
                            key={item.id}
                            className={`${styles.notifItem} ${item.unread ? styles.notifUnread : ''}`}
                          >
                            <div className={styles.notifBullet}></div>
                            <div className="flex-grow-1">
                              <div className={styles.notifItemTitle}>{item.title}</div>
                              <div className={styles.notifItemMsg}>{item.message}</div>
                              <span className={styles.notifItemTime}>{item.timestamp}</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {notifications.length > 0 && (
                      <div className={styles.notifFooter}>
                        <button className={styles.clearBtn} onClick={onClearNotifications}>
                          Clear all
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* User Profile Chip - Interactive */}
              <button
                className={styles.userCard}
                onClick={() => setIsProfileOpen(true)}
                aria-label="Open profile modal"
                title="View user profile & tier benefits"
              >
                <div className={styles.avatarMiniWrapper}>
                  <img
                    src={
                      profile?.avatarUrl ||
                      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
                    }
                    alt={profile?.username || 'User'}
                    className={styles.avatar}
                  />
                  <span className={styles.levelTagMini}>{profile?.currentLevel || 4}</span>
                </div>
                <div className="d-none d-md-flex flex-column align-items-start text-start">
                  <span className={styles.userName}>{profile?.username || 'Alex_Velooper'}</span>
                  <span className={styles.userTier}>{profile?.currentLevelName || 'Gold Elite'}</span>
                </div>
                <span className={`d-none d-md-inline-block ${styles.levelTag}`}>L{profile?.currentLevel || 4}</span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                className={`d-lg-none ${styles.iconButton}`}
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                aria-label="Toggle navigation menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <nav className={styles.mobileNav}>
            <ul className={styles.mobileNavList}>
              <li>
                <a
                  href="#dashboard"
                  className={styles.mobileNavLink}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Overview
                </a>
              </li>
              <li>
                <a
                  href="#roadmap"
                  className={styles.mobileNavLink}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Tier Roadmap
                </a>
              </li>
              <li>
                <a
                  href="#play"
                  className={styles.mobileNavLink}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Play & Earn
                </a>
              </li>
              <li>
                <a
                  href="#quests"
                  className={styles.mobileNavLink}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Daily Quests
                </a>
              </li>
              <li>
                <a
                  href="#activity"
                  className={styles.mobileNavLink}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Recent Activity
                </a>
              </li>
            </ul>
          </nav>
        )}
      </header>

      {/* User Profile Overview Modal */}
      {isProfileOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsProfileOpen(false)}>
          <div className={styles.profileModal} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.modalCloseBtn}
              onClick={() => setIsProfileOpen(false)}
              aria-label="Close profile modal"
            >
              <X size={18} />
            </button>

            {/* Profile Header */}
            <div className={styles.profileHeader}>
              <div className={styles.avatarWrapper}>
                <img
                  src={
                    profile?.avatarUrl ||
                    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
                  }
                  alt={profile?.username}
                  className={styles.largeAvatar}
                />
                <span className={styles.tierStatusIcon}>
                  <ShieldCheck size={14} />
                </span>
              </div>
              <h3 className={styles.profileName}>{profile?.username || 'Alex_Velooper'}</h3>
              <div className="d-flex align-items-center justify-content-center gap-2 mt-1">
                <span className={styles.tierBadge}>
                  Level {profile?.currentLevel}: {profile?.currentLevelName}
                </span>
                <span className={styles.rankBadge}>
                  <Trophy size={13} className="text-warning" />
                  {profile?.rank || '#42 Global'}
                </span>
              </div>
            </div>

            {/* Stats Matrix */}
            <div className={styles.statsMatrix}>
              <div className={styles.statBox}>
                <span className={styles.statLabel}>Total XP Earned</span>
                <span className={styles.statValue}>
                  {profile?.totalXPEarned?.toLocaleString() || '18,450'}
                </span>
              </div>
              <div className={styles.statBox}>
                <span className={styles.statLabel}>Active Streak</span>
                <span className={`${styles.statValue} text-warning d-flex align-items-center justify-content-center gap-1`}>
                  <Flame size={16} />
                  {profile?.streakDays || 7} Days
                </span>
              </div>
              <div className={styles.statBox}>
                <span className={styles.statLabel}>Earn Multiplier</span>
                <span className={`${styles.statValue} text-info`}>2.0x Boost</span>
              </div>
              <div className={styles.statBox}>
                <span className={styles.statLabel}>Next Tier</span>
                <span className={styles.statValue}>Level {profile?.nextLevel || 5}</span>
              </div>
            </div>

            {/* Active Tier Perks */}
            <div className={styles.tierPerksSection}>
              <span className={styles.sectionTitle}>Active Tier Benefits</span>
              <ul className={styles.perksList}>
                <li>
                  <Sparkles size={14} className="text-warning flex-shrink-0" />
                  <span>2.0x base XP boost across all arcade titles</span>
                </li>
                <li>
                  <Sparkles size={14} className="text-warning flex-shrink-0" />
                  <span>Access to VIP tournaments & flash drops</span>
                </li>
                <li>
                  <Sparkles size={14} className="text-warning flex-shrink-0" />
                  <span>Gold Elite crown profile crest and chat badge</span>
                </li>
              </ul>
            </div>

            {/* Referral / Share */}
            <div className={styles.referralBox}>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className={styles.referralTitle}>Referral Invite Code</span>
                <span className="text-muted fs-7">+600 XP per friend</span>
              </div>
              <div className={styles.referralInputGroup}>
                <code className={styles.referralCode}>VELOOP-ALEX-8923</code>
                <button
                  className={styles.copyBtn}
                  onClick={handleCopyReferral}
                  title="Copy referral link"
                >
                  {isCopied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                  <span>{isCopied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <button
              className={styles.doneBtn}
              onClick={() => setIsProfileOpen(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
