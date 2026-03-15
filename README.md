# FinCal: Educative Gamified Financial Calculator

### 🚀 [Watch the Demo Video (Guidde)](https://app.guidde.com/share/playbooks/viF9qhpYpwPfiebs5ihAXL?origin=jdtRizhI97RTZ3YqPhQzNPP6zAr2)

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
