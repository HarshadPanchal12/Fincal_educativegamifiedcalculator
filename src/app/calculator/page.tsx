'use client';

import { UserButton, SignInButton, useAuth } from "@clerk/nextjs";
import GoalForm from '@/components/calculator/GoalForm';
import AchievementPopup from '@/components/ui/AchievementPopup';
import Link from 'next/link';
import { ArrowLeft, Landmark, Award, BookOpen, Trophy, History } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';

export default function CalculatorPage() {
    const { userId } = useAuth();
    const [healthScore, setHealthScore] = useState(70);
    const { xp, level, achievements } = useStore();

    const unlockedCount = achievements.filter(a => a.unlocked).length;

    return (
        <main className="min-h-screen relative py-8 px-4 md:px-8 bg-slate-50">
            <AchievementPopup />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Compact Header */}
                <header className="flex justify-between items-center mb-8">
                    <Link href="/">
                        <button className="skeuo-flat p-3 hover:bg-slate-100 transition-all flex items-center gap-2 text-xs font-bold text-slate-500 group">
                            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> Home
                        </button>
                    </Link>

                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 gradient-premium rounded-xl flex items-center justify-center text-white shadow-lg">
                            <Landmark className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[9px] font-bold text-primary uppercase tracking-[0.2em] leading-none">HDFC</p>
                            <p className="text-xs font-black text-slate-800 dark:text-white leading-none">FinCal</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Mini XP Badge */}
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10">
                            <Award className="w-3.5 h-3.5 text-primary" />
                            <span className="text-[10px] font-bold text-primary">
                                Lv.{level}
                            </span>
                            <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(xp % 500) / 500 * 100}%` }}
                                    className="h-full bg-primary rounded-full"
                                />
                            </div>
                            <span className="text-[9px] text-slate-400">{unlockedCount}/{achievements.length}🏆</span>
                        </div>
                        <div>
                            {userId ? (
                                <UserButton />
                            ) : (
                                <SignInButton mode="modal">
                                    <button className="skeuo-flat px-5 py-2 text-xs font-bold text-primary">Sign In</button>
                                </SignInButton>
                            )}
                        </div>
                    </div>
                </header>

                {/* Hero */}
                <div className="text-center mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-4xl font-black mb-2 tracking-tight"
                    >
                        Goal-Based <span className="text-gradient">Planner</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-sm text-muted-foreground max-w-md mx-auto"
                    >
                        Learn to plan your financial future — step by step, concept by concept.
                    </motion.p>
                </div>

                {/* Wizard */}
                <GoalForm onHealthChange={setHealthScore} />

                {/* Navigation to other pages */}
                <div className="flex justify-center flex-wrap gap-3 mt-12">
                    <Link href="/earlier_plans">
                        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-400 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 hover:border-slate-500 transition-all shadow-sm">
                            <History className="w-3.5 h-3.5" /> Previous Plans
                        </button>
                    </Link>
                    <Link href="/learn">
                        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-primary/20 bg-primary/5 text-primary font-bold text-xs hover:bg-primary/10 transition-all shadow-sm">
                            <BookOpen className="w-3.5 h-3.5" /> Financial Academy
                        </button>
                    </Link>
                    <Link href="/achievements">
                        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-secondary/20 bg-secondary/5 text-secondary font-bold text-xs hover:bg-secondary/10 transition-all shadow-sm">
                            <Trophy className="w-3.5 h-3.5" /> Achievements
                        </button>
                    </Link>
                </div>

                {/* Disclaimer */}
                <div className="mt-10 p-6 glass border-red-500/10 bg-red-500/5 rounded-2xl max-w-2xl mx-auto text-center border">
                    <div className="inline-flex items-center gap-2 text-secondary font-bold text-[10px] uppercase tracking-widest mb-2">
                        <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" /> Disclosure
                    </div>
                    <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                        This tool is for educational purposes only. Past performance doesn't indicate future results.
                        Consult a financial advisor before investing.
                    </p>
                </div>
            </div>
        </main>
    );
}
