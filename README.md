# 🚀 VELOOP Rewards – Level-Up Dashboard

An interactive, gamified **Level-Up Rewards Dashboard** designed and built for the **VELOOP** frontend internship assignment. 

Built with modern **React + Vite**, utilizing **CSS Modules** for custom aesthetic styling, **Bootstrap 5** for responsive layout utilities, and **Lucide React** for icons.

---

## 📸 Key Features

- **Level Hero Banner**: Displays current tier (`Level 4: Gold Elite`), boost multiplier (`2.0x Boost`), global rank (`#42 Globally`), and an action trigger for perks.
- **Dynamic XP Progress Bar**: Real-time progress visualizer tracking XP gains, percentage completed, and required XP for the next level.
- **Next Milestone Reward**: Card preview of upcoming rewards, including multipliers, bonus points, and milestone badges.
- **Tier Roadmap Ladder**: Interactive progression timeline from Level 1 (*Bronze Pioneer*) to Level 6 (*Diamond Champion*).
- **Play & Earn Games**: Curated mini-games where users can click **Play Now** to earn instant XP and boost their progress.
- **Earn More XP (Quests & Tasks)**: Daily and social quests with interactive **Start / Claim** action buttons.
- **Real-Time Activity Log**: Live chronological feed of XP credited for games, daily streaks, quests, and milestone achievements.
- **Level-Up Celebration Modal**: Celebratory popup with unlocked benefits, perks checklist, and milestone claim actions.
- **Reactive State & Toast Feedback**: Custom `useDashboardData` hook powering reactive updates with instant floating toast notifications.

---

## 🛠️ Technology Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Language**: JavaScript (ES6+)
- **Styling**: CSS Modules + Bootstrap 5 (Layout & Responsive utilities)
- **Icons**: Lucide React
- **Theme Color**: Rich Dark Theme (`#161827`)

---

## 📁 Project Architecture

```
src/
├── assets/                  # Static media and graphics
├── components/              # Modular, reusable UI components
│   ├── EarnMoreXP/          # Daily & Social Quests component
│   ├── Header/              # Top navigation & user status bar
│   ├── LevelHero/           # Current level emblem & perks launcher
│   ├── LevelRoadmap/        # Tier 1-6 roadmap ladder
│   ├── LevelUpModal/        # Celebratory level-up perks modal
│   ├── NextLevelReward/     # Milestone reward card
│   ├── PlayAndEarn/         # Featured games list
│   ├── XPActivity/          # Live activity history feed
│   └── XPProgress/          # Animated XP progress bar
├── data/                    # Decoupled mock datasets (API-ready)
│   ├── activityData.js
│   ├── earningData.js
│   └── levelData.js
├── hooks/
│   └── useDashboardData.js  # State management & progression actions
├── pages/
│   └── LevelDashboard/      # Main dashboard layout
├── styles/
│   └── global.css           # Global tokens & theme setup
├── App.jsx
└── main.jsx
```

---

## 💻 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/shindegayatri745/veloop-level-dashboard.git

# Navigate into project directory
cd veloop-level-dashboard

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Linting & Build

```bash
# Run linter
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🚢 Deployment

This project is optimized for deployment on **Vercel**:

1. Push code to your GitHub repository.
2. Go to [Vercel](https://vercel.com) and import the repository.
3. Framework Preset: **Vite**.
4. Click **Deploy**.

---

## 👤 Author

- **Gayatri Shinde** ([@shindegayatri745](https://github.com/shindegayatri745))
