# 🚀 VELOOP Rewards – Level-Up Dashboard

An interactive, gamified **Level-Up Rewards Dashboard** developed as part of the **VELOOP Frontend Development Internship Assignment**.

The dashboard provides a premium fintech-inspired experience where users can track their XP (Experience Points), explore level progression, discover rewards, participate in mini-games, and complete earning quests.

Built using **React 19, Vite, Bootstrap 5, CSS Modules, and Lucide React**, the application features a modern dark theme, responsive layouts, reusable components, and interactive UI elements.

## 🌐 Live Demo

**Live Website:** [View VELOOP Level-Up Dashboard](http://veloop-level-dashboard-seven.vercel.app/)

**GitHub Repository:** [View Source Code](https://github.com/shindegayatri745/veloop-level-dashboard)

---

## 📸 Key Features

### 🏆 Level Progression Dashboard
- **Level Hero Banner:** Displays the user's current tier, boost multiplier, global rank, and available perks.
- **XP Progress Tracker:** Visualizes current XP, progress percentage, and XP required to reach the next level.
- **Next-Level Rewards:** Showcases upcoming rewards, milestone bonuses, multipliers, and badges.
- **Interactive Level Roadmap:** Displays progression from Level 1 — Bronze Pioneer to Level 6 — Diamond Champion.
- **Level-Up Celebration:** Provides a celebratory modal when users reach a new level, highlighting unlocked benefits and available rewards.

### 🎮 Play & Earn
- Interactive mini-game cards with **Play Now** actions.
- Game interaction and completion states.
- XP reward feedback for completed activities.
- Replay options to encourage continued engagement.

### 🎯 Earn More XP
- Daily quests and earning opportunities.
- Interactive Start and Claim buttons.
- Feedback for completed activities.
- Support for demonstrating proposed earning mechanisms through mock data.

### 📊 XP Activity Tracking
- Chronological activity feed displaying XP-related events.
- Activity entries for games, daily streaks, quests, and milestones.
- Dynamic UI updates when supported actions are completed.

### ⚡ Interactive User Experience
- Custom React hook for managing dashboard state.
- Reusable and modular components.
- Toast notifications for user feedback.
- Animated XP progress indicators.
- Responsive layouts for desktop, tablet, and mobile devices.
- Premium dark interface with consistent typography, spacing, and colors.

> **Note:** This project uses demonstration data and frontend state to showcase the dashboard experience. Actual reward processing, persistent user accounts, and backend integrations are not implied unless separately implemented.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React 19 | Building interactive user interfaces |
| Vite | Development server and production build tool |
| JavaScript (ES6+) | Application logic and interactions |
| Bootstrap 5 | Responsive layout utilities |
| CSS Modules | Component-specific styling |
| Lucide React | Icons and visual elements |
| React Hooks | State management and reusable logic |
| Git & GitHub | Version control and source code management |
| Vercel | Deployment and hosting |

### 🎨 Design Theme

- **Primary Background:** `#161827`
- **Design Style:** Premium, fintech-inspired, gamified dashboard
- **Visual Elements:** Level badges, progress indicators, reward cards, subtle animations, and interactive components

---

## 📁 Project Structure

```text
velop-level-dashboard/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── EarnMoreXP/
│   │   ├── Header/
│   │   ├── LevelHero/
│   │   ├── LevelRoadmap/
│   │   ├── LevelUpModal/
│   │   ├── NextLevelReward/
│   │   ├── PlayAndEarn/
│   │   ├── XPActivity/
│   │   └── XPProgress/
│   ├── data/
│   │   ├── activityData.js
│   │   ├── earningData.js
│   │   └── levelData.js
│   ├── hooks/
│   │   └── useDashboardData.js
│   ├── pages/
│   │   └── LevelDashboard/
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

> The structure above represents the intended component architecture. Adjust it to match the actual files present in the repository.

---

## 💻 Getting Started

Follow these steps to run the project locally.

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/) — version 18 or higher recommended
- npm, included with Node.js
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/shindegayatri745/veloop-level-dashboard.git
```

### 2. Navigate to the Project Directory

```bash
cd veloop-level-dashboard
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Open the local development URL displayed in your terminal, usually:

```text
http://localhost:5173
```

---

## 🏗️ Production Build

To create a production-ready build, run:

```bash
npm run build
```

Vite generates the production files in the `dist/` directory.

To preview the production build locally, run:

```bash
npm run preview
```

### Optional: Run the Linter

If ESLint is configured in the project, run:

```bash
npm run lint
```

---

## 📱 Responsive Design

The dashboard is designed to adapt to different screen sizes.

| Device | Target Width |
|---|---|
| Mobile | 320px and above |
| Tablet | Around 768px |
| Laptop | 1280px and above |
| Desktop | 1440px and above |
| Large Screens | Up to 1920px and above |

Responsive design considerations include:

- Flexible card layouts and grid systems.
- Mobile-friendly navigation and controls.
- Readable text and appropriately sized buttons.
- Adaptive spacing and component alignment.
- Consistent visual hierarchy across screen sizes.

---

## 🚀 Deployment

The application can be deployed using **Vercel**.

### Deployment Steps

1. Push the latest project changes to GitHub.
2. Sign in to [Vercel](https://vercel.com/).
3. Import the repository:
   `shindegayatri745/veloop-level-dashboard`
4. Select **Vite** as the framework preset.
5. Configure the build settings:

   | Setting | Value |
   |---|---|
   | Framework Preset | Vite |
   | Build Command | `npm run build` |
   | Output Directory | `dist` |
   | Install Command | `npm install` |

6. Click **Deploy**.
7. Open the generated deployment URL and test the application.

### Updating the Deployment

After making changes, commit and push them to GitHub:

```bash
git add .
git commit -m "Update VELOOP dashboard"
git push origin main
```

Vercel can automatically redeploy the application when new commits are pushed to the connected branch.

---

## 🔮 Future Enhancements

Potential improvements include:

- Backend integration for persistent XP and reward records.
- User authentication and personalized dashboards.
- Server-side reward validation.
- Real-time XP activity updates.
- Additional mini-games and quests.
- API integration for level progression and reward history.
- Enhanced accessibility and keyboard navigation.

These are potential future improvements and are not necessarily part of the current implementation.

---

## 👤 Author

**Gayatri Shinde**

- GitHub: [@shindegayatri745](https://github.com/shindegayatri745)
- Project Repository: [VELOOP Level-Up Dashboard](https://github.com/shindegayatri745/veloop-level-dashboard)

---

## 📄 Project Information

**Project:** VELOOP Rewards – Level-Up Dashboard  
**Purpose:** Frontend Development Internship Assignment  
**Framework:** React + Vite  
**Deployment Platform:** Vercel

---

⭐ If you find this project interesting, feel free to explore the repository and its implementation.
