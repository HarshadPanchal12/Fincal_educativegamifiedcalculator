import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlocked: boolean;
    unlockedAt?: number;
}

export interface LeaderboardEntry {
    name: string;
    score: number;
    level: number;
    date: string;
}

export interface SavedPlan {
    id: string;
    goalCost: number;
    years: number;
    inflation: number;
    expectedReturn: number;
    requiredSIP: number;
    totalInvestment: number;
    estimatedEarnings: number;
    healthScore: number;
    date: string;
}

export interface GameState {
    xp: number;
    level: number;
    achievements: Achievement[];
    healthScore: number;
    isRealismMode: boolean;
    calculationsCount: number;
    unlockedTerms: string[];
    notifications: string[];
    leaderboard: LeaderboardEntry[];
    currentStep: number;
    learnMoreCount: number;
    savedPlans: SavedPlan[];

    // Actions
    addXP: (amount: number) => void;
    unlockAchievement: (id: string) => void;
    setHealthScore: (score: number) => void;
    setRealismMode: (enabled: boolean) => void;
    recordCalculation: (years: number, score?: number) => void;
    unlockTerm: (term: string) => void;
    popNotification: () => void;
    pushNotification: (message: string) => void;
    addLeaderboardEntry: (name: string, score: number) => void;
    setStep: (step: number) => void;
    nextStep: () => void;
    prevStep: () => void;
    incrementLearnMore: () => void;
    savePlan: (plan: Omit<SavedPlan, 'id' | 'date'>) => void;
    resetWizard: () => void;
    resetGame: () => void;
}

const INITIAL_ACHIEVEMENTS: Achievement[] = [
    { id: 'first_calc', title: 'First Steps', description: 'Performed your first calculation', icon: '🚀', unlocked: false },
    { id: 'inflation_pro', title: 'Inflation Pro', description: 'Learned about inflation impact', icon: '📈', unlocked: false },
    { id: 'long_term', title: 'Visionary', description: 'Planned for more than 15 years', icon: '🔮', unlocked: false },
    { id: 'diamond_hands', title: 'Diamond Hands', description: 'Survived a simulated market crash', icon: '💎', unlocked: false },
    { id: 'rational_investor', title: 'Rational Investor', description: 'Kept realism mode on for a plan', icon: '🧠', unlocked: false },
    { id: 'explorer', title: 'Explorer', description: 'Visited all 4 wizard steps', icon: '🗺️', unlocked: false },
    { id: 'curious_mind', title: 'Curious Mind', description: 'Expanded 3+ Learn More sections', icon: '🔬', unlocked: false },
];

const LEVEL_THRESHOLD = 500;

export const useStore = create<GameState>()(
    persist(
        (set, get) => ({
            xp: 0,
            level: 1,
            achievements: INITIAL_ACHIEVEMENTS,
            healthScore: 70,
            isRealismMode: true,
            calculationsCount: 0,
            unlockedTerms: [],
            notifications: [],
            leaderboard: [],
            currentStep: 0,
            learnMoreCount: 0,
            savedPlans: [],

            unlockAchievement: (id: string) => {
                const achievements = get().achievements;
                const achievement = achievements.find(a => a.id === id);

                if (achievement && !achievement.unlocked) {
                    set({
                        achievements: achievements.map(a =>
                            a.id === id ? { ...a, unlocked: true, unlockedAt: Date.now() } : a
                        )
                    });
                    get().pushNotification(`Achievement Unlocked: ${achievement.title} ${achievement.icon}`);
                    get().addXP(200);
                }
            },

            setHealthScore: (score: number) => set({ healthScore: score }),

            setRealismMode: (enabled: boolean) => set({ isRealismMode: enabled }),

            addXP: (amount: number) => {
                const currentXP = Math.max(0, get().xp + amount);
                const newLevel = Math.floor(currentXP / LEVEL_THRESHOLD) + 1;
                set({ xp: currentXP, level: newLevel });

                if (newLevel > get().level) {
                    get().pushNotification(`Level Up! You are now Level ${newLevel}! 🚀`);
                } else if (newLevel < get().level && amount < 0) {
                    get().pushNotification(`Demoted! You are back to Level ${newLevel}. Study more! ⚠️`);
                }
            },

            recordCalculation: (years: number, score?: number) => {
                set(state => ({ calculationsCount: state.calculationsCount + 1 }));
                get().unlockAchievement('first_calc');
                if (years >= 15) get().unlockAchievement('long_term');
                if (get().isRealismMode) {
                    get().unlockAchievement('rational_investor');
                    get().addXP(50); // Bonus for being rational
                }

                if (score !== undefined) {
                    if (score >= 90) {
                        get().addLeaderboardEntry('You', score);
                    } else if (score < 40) {
                        get().addXP(-50); // Penalty for very unrealistic plan
                        get().pushNotification("Wisdom Penalty: -50 XP for unrealistic assumptions. ⚠️");
                    }
                }
                get().addXP(100);
            },

            unlockTerm: (term: string) => {
                const { unlockedTerms, unlockAchievement, addXP } = get();
                if (!unlockedTerms.includes(term)) {
                    set(state => ({ unlockedTerms: [...state.unlockedTerms, term] }));
                    addXP(50);
                    if (term === 'Inflation') unlockAchievement('inflation_pro');
                }
            },

            pushNotification: (message: string) =>
                set(state => ({ notifications: [...state.notifications, message] })),

            popNotification: () =>
                set(state => ({ notifications: state.notifications.slice(1) })),

            addLeaderboardEntry: (name, score) => set((state) => {
                const newEntry = { name, score, level: state.level, date: new Date().toISOString() };
                const updatedLeaderboard = [...state.leaderboard, newEntry]
                    .sort((a, b) => b.score - a.score)
                    .slice(0, 5);
                return { leaderboard: updatedLeaderboard };
            }),

            setStep: (step: number) => {
                set({ currentStep: step });
                if (step === 3) get().unlockAchievement('explorer');
            },

            nextStep: () => {
                const next = Math.min(get().currentStep + 1, 3);
                get().setStep(next);
                get().addXP(25);
            },

            prevStep: () => {
                const prev = Math.max(get().currentStep - 1, 0);
                set({ currentStep: prev });
            },

            incrementLearnMore: () => {
                const newCount = get().learnMoreCount + 1;
                set({ learnMoreCount: newCount });
                get().addXP(15);
                if (newCount >= 3) get().unlockAchievement('curious_mind');
            },

            savePlan: (plan) => {
                const newPlan: SavedPlan = {
                    ...plan,
                    id: Math.random().toString(36).substring(2, 9),
                    date: new Date().toISOString(),
                };
                set((state) => ({ savedPlans: [newPlan, ...state.savedPlans] }));
            },

            resetWizard: () => {
                set({ currentStep: 0, learnMoreCount: 0 });
            },

            resetGame: () => {
                set({
                    xp: 0,
                    level: 1,
                    achievements: INITIAL_ACHIEVEMENTS,
                    healthScore: 70,
                    isRealismMode: true,
                    calculationsCount: 0,
                    unlockedTerms: [],
                    notifications: [],
                    leaderboard: [],
                    savedPlans: [],
                    currentStep: 0,
                    learnMoreCount: 0,
                });
            },
        }),
        {
            name: 'fincal-game-storage',
            partialize: (state) => ({
                xp: state.xp,
                level: state.level,
                achievements: state.achievements,
                unlockedTerms: state.unlockedTerms,
                leaderboard: state.leaderboard,
                savedPlans: state.savedPlans,
            }),
        }
    )
);
