'use client';

import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import Leaderboard from '@/components/calculator/Leaderboard';
import Link from 'next/link';
import { ArrowLeft, Landmark, Award, Trophy, Star, Zap, Target, BookOpen, Calculator, RefreshCcw } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function AchievementsPage() {
    const { xp, level, achievements, calculationsCount, unlockedTerms, leaderboard } = useStore();

    const unlockedAch = achievements.filter(a => a.unlocked);
    const lockedAch = achievements.filter(a => !a.unlocked);
    const xpProgress = (xp % 500) / 500 * 100;

    const stats = [
        { label: 'Total XP', value: xp, icon: Zap, color: '#f59e0b' },
        { label: 'Level', value: level, icon: Star, color: '#224c87' },
        { label: 'Plans Created', value: calculationsCount, icon: Target, color: '#da3832' },
        { label: 'Terms Learned', value: unlockedTerms.length, icon: BookOpen, color: '#059669' },
    ];

    return (
        <main className="min-h-screen py-8 px-4 md:px-8 bg-slate-50">
            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <Link href="/calculator">
                        <button className="skeuo-flat p-3 hover:bg-slate-100 transition-all flex items-center gap-2 text-xs font-bold text-slate-500 group">
                            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> Calculator
                        </button>
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 gradient-secondary rounded-xl flex items-center justify-center text-white shadow-lg">
                            <Trophy className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[9px] font-bold text-secondary uppercase tracking-[0.2em] leading-none">HDFC</p>
                            <p className="text-xs font-black text-slate-800 leading-none">Achievements</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => {
                                if (window.confirm("Are you sure you want to reset all your progress, achievements, and XP? This cannot be undone.")) {
                                    useStore.getState().resetGame();
                                    window.location.reload();
                                }
                            }}
                            className="p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors flex items-center justify-center"
                            title="Reset Game Data"
                        >
                            <RefreshCcw className="w-4 h-4" />
                        </button>
                        <Link href="/learn">
                            <button className="skeuo-flat p-3 hover:bg-slate-100 transition-all flex items-center gap-2 text-xs font-bold text-primary">
                                Learn →
                            </button>
                        </Link>
                    </div>
                </header>

                {/* Hero Level Card */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <GlassCard className="bg-white border-2 border-slate-400 p-8 text-center" hoverEffect={false}>
                        <div className="w-20 h-20 mx-auto rounded-full bg-primary/5 text-primary border-4 border-primary/10 flex items-center justify-center mb-4">
                            <span className="text-3xl font-black">{level}</span>
                        </div>
                        <h2 className="text-xl font-bold mb-1 text-slate-800">Level {level} Investor</h2>
                        <p className="text-xs text-slate-500 font-bold mb-4">{xp} total XP earned</p>

                        <div className="max-w-xs mx-auto">
                            <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
                            </div>
                            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${xpProgress}%` }}
                                    transition={{ duration: 1, ease: 'easeOut' }}
                                    className="h-full bg-primary rounded-full"
                                />
                            </div>
                            <p className="text-[10px] text-slate-400 font-bold mt-2">{xp % 500}/500 XP to next level</p>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                    {stats.map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + idx * 0.1 }}
                            >
                                <GlassCard className="p-4 text-center" hoverEffect={false}>
                                    <div className="w-10 h-10 mx-auto rounded-xl flex items-center justify-center mb-2"
                                        style={{ background: `${stat.color}10` }}>
                                        <Icon className="w-5 h-5" style={{ color: stat.color }} />
                                    </div>
                                    <p className="text-2xl font-black text-slate-800">{stat.value}</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                                </GlassCard>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Achievements */}
                <div className="mb-8">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5 text-secondary" /> Achievements
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-bold">
                            {unlockedAch.length}/{achievements.length}
                        </span>
                    </h2>

                    {/* Unlocked */}
                    {unlockedAch.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                            {unlockedAch.map((ach, idx) => (
                                <motion.div
                                    key={ach.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <GlassCard className="p-4 border-secondary/20 bg-secondary/5" hoverEffect={false}>
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-2xl shadow-inner">
                                                {ach.icon}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm">{ach.title}</h4>
                                                <p className="text-[10px] text-slate-500">{ach.description}</p>
                                                <p className="text-[9px] text-secondary font-bold mt-0.5">
                                                    +200 XP • Unlocked ✓
                                                </p>
                                            </div>
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* Locked */}
                    {lockedAch.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {lockedAch.map((ach) => (
                                <div key={ach.id} className="p-4 rounded-2xl border border-slate-400 bg-slate-50 opacity-60">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-slate-200 flex items-center justify-center text-2xl grayscale">
                                            {ach.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-slate-400">{ach.title}</h4>
                                            <p className="text-[10px] text-slate-400">{ach.description}</p>
                                            <p className="text-[9px] text-slate-300 font-bold mt-0.5">🔒 Locked</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Leaderboard */}
                <div className="mb-8">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-primary" /> Leaderboard
                    </h2>
                    {leaderboard.length > 0 ? (
                        <Leaderboard />
                    ) : (
                        <GlassCard className="p-8 text-center" hoverEffect={false}>
                            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                <Trophy className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="font-bold mb-1">No Entries Yet</h3>
                            <p className="text-xs text-slate-500 max-w-xs mx-auto">
                                Score 90+ on the Financial Health gauge in the calculator to earn a spot on the leaderboard!
                            </p>
                        </GlassCard>
                    )}
                </div>

                {/* CTA */}
                <div className="text-center pb-8 flex flex-col items-center gap-6">
                    <div className="flex justify-center gap-3">
                        <Link href="/calculator">
                            <button className="inline-flex items-center gap-2 px-6 py-3 gradient-premium text-white rounded-xl font-bold shadow-lg hover:shadow-primary/20 transition-all text-sm">
                                <Calculator className="w-4 h-4" /> Plan a Goal
                            </button>
                        </Link>
                        <Link href="/learn">
                            <button className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary/20 text-primary rounded-xl font-bold hover:bg-primary/5 transition-all text-sm">
                                <BookOpen className="w-4 h-4" /> Learn More
                            </button>
                        </Link>
                    </div>

                </div>
            </div>
        </main>
    );
}
