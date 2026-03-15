# FinCal: Educative Gamified Financial Calculator

### 🌐 [Live Demo](https://fincal-app.onrender.com/) | 📄 [Detailed Documentation](https://fincal-app.onrender.com/showcase)

[![Explore Financial Planning Features in FinCal Innovation](https://img.guidde.com/v1/playbooks/viF9qhpYpwPfiebs5ihAXL/thumbnail?v=1)](https://www.guidde.com/share/playbooks/viF9qhpYpwPfiebs5ihAXL?origin=jdtRizhI97RTZ3YqPhQzNPP6zAr2)

<details>
<summary>🎬 View Video Transcription</summary>

- **00:00**: This demo showcases how FinCal Innovation helps you plan your financial future effectively.
- **00:02**: Effectively
- **00:05**: You'll see how to set goals, generate plans, and track your progress with ease.
- **00:10**: Click the start planning button to begin creating your personalized financial plan.
- **00:15**: Click continue to move forward in the planning process.
- **00:18**: After you set the value of how much your goal costs.
- **00:22**: According to how many years you set for the goal, you will see live inflation impact on goal cost after those years by interactive charts and realism mode.
- **00:32**: Enter values to define the specific duration or amount for your goal.
- **00:36**: You can change the value and see the effects.
- **00:39**: Click continue to proceed with your financial planning steps.
- **00:43**: Here is the notification you will get for every achievement during the planning.
- **00:48**: Enter the expected annual returns according to the risk-return spectrum: 6% for Fixed Deposit (low risk), 8% for Debt Funds, 10% for Balanced/Medium, and 15%+ for aggressive/very aggressive.
- **01:04**: Click 12% to apply a moderate return rate to your financial model.
- **01:09**: Click generate plan to create a customized Financial strategy based on your inputs.
- **01:14**: Click Wise Guardian.
- **01:17**: You have picked a realistic inflation benchmark.
- **01:20**: Click Realistic Thinker, your return expectations aligned with Market averages.
- **01:26**: Click leaderboard to see how your planning compares with other users.
- **01:53**: Click Indian rupees to examine the projected investment value from the simulation.
- **02:21**: Track XP, Levels, and Plans created on your personal dashboard.
- **03:44**: Click Financial Academy to access comprehensive financial education content.
- **04:19**: Remember: Time in Market beats timing the market.

</details>


---

## 1. Project Overview
**FinCal** (Financial Calculator) is a premium, gamified financial planning application built for the **Technex Innovation Hackathon 2026**. It reimagines how people interact with financial calculators by transforming a traditionally static, intimidating experience into an *interactive, educational, and rewarding journey*.

Users should not just calculate numbers — they should understand their financial path.

| Traditional Calculators | FinCal |
| :--- | :--- |
| Static input → output | Guided 4-step wizard with education |
| No context for assumptions | Financial Health Gauge audits inputs |
| No engagement or retention | XP, badges, levels, leaderboards |
| Flat 2D interfaces | 3D visualizations, premium animations |
| Ignores inflation impact | Live Inflation Visualizer built in |
| No risk education | Market volatility simulator (SIP Time Machine) |

---

## 2. Problem Statement & Motivation
Financial literacy remains one of the most critical gaps in modern education. Despite the availability of hundreds of financial calculators online, three fundamental problems persist:

- **Unrealistic Assumptions**: Users routinely input irrational parameters because they have no contextual education about how markets actually perform.
- **Inflation Blindness**: Most calculators show a "future value" number without explaining what it actually buys in the future.
- **Zero Engagement**: Traditional calculators are "use-once-and-forget" tools with no incentive to return or track progress.

FinCal was born from a simple observation: **the best financial calculator is one that teaches you why the numbers matter.**

---

## 3. Solution Architecture
FinCal uses a modern, high-performance stack to ensure a seamless and engaging user experience.

- **Client Layer**: Next.js 15 (App Router), React Three Fiber for 3D graphics, and Framer Motion for animations.
- **State Layer**: Zustand for lightweight, persistent state management (XP, Badges, Level, Financial Plans).
- **Security**: Clerk for enterprise-grade authentication.
- **Infrastructure**: LocalStorage for offline-first persistence and Render for hosting.

---

## 4. Technology Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js & React Three Fiber
- **Animations**: Framer Motion
- **State Mgmt**: Zustand
- **Auth**: Clerk
- **Charts**: Recharts & Chart.js

---

## 5. Project Structure
```text
Fincal_educativegamifiedcalculator/
├── 📁 app/                          # Next.js App Router (Pages)
│   ├── 📁 calculator/               # Main calculator wizard (4-step flow)
│   ├── 📁 dashboard/                # User dashboard (saved plans, progress)
│   ├── 📁 gamification/             # Gamification hub (XP, badges, leaderboard)
│   ├── 📁 sip-time-machine/         # SIP market volatility simulator
│   └── 📁 showcase/                 # Documentation & showcase
├── 📁 components/                   # Reusable React components
│   ├── 📁 ui/                       # Primitive UI components
│   └── 📁 three/                    # Three.js / R3F components
├── 📁 lib/                          # Utility functions & business logic (calculations.ts)
└── 📁 store/                        # Zustand state stores (useGameStore.ts)
```

---

## 6. Core Features

### 6.1 The 4-Step Financial Wizard
1. **LEARN**: Education module teaching compounding and inflation.
2. **PLAN**: Input parameters with smart defaults and contextual tooltips.
3. **AUDIT**: Financial Health Gauge evaluates realism of assumptions.
4. **RESULTS**: Comprehensive breakdown with nominal and real (inflation-adjusted) values.

### 6.2 SIP Time Machine
A market volatility simulator demonstrating the power of staying invested. It shows the drastic difference between staying invested versus panicking during market dips or missing the best trading days.

### 6.3 Live Inflation Visualizer
An interactive tool that visually demonstrates how purchasing power erodes over time, helping users understand what their future target amount will actually buy.

---

## 7. How to Run Locally

1. **Clone the repo**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set up Environment Variables**:
   Create a `.env.local` file with your Clerk API keys (see `.env.local.example`).
4. **Run the development server**:
   ```bash
   npm run dev
   ```
5. **Visit**: [http://localhost:3000](http://localhost:3000)

---

*Created for the Technex Innovation Hackathon 2026*
