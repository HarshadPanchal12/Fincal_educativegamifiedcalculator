'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import HealthGauge from '@/components/ui/HealthGauge';
import GreatMinds from '@/components/education/GreatMinds';
import VolatilitySimulator from './VolatilitySimulator';
import Leaderboard from './Leaderboard';
import {
    Sparkles, TrendingUp, Clock, Wallet, Trophy, ChevronDown
} from 'lucide-react';

interface ResultsDashboardProps {
    results: {
        futureCost: number;
        requiredSIP: number;
        totalInvestment: number;
        estimatedEarnings: number;
    };
    health: {
        score: number;
        label: string;
        feedback: string[];
    };
    watchedYears: number;
    monthlySip: number;
}

export default function ResultsDashboard({ results, health, watchedYears, monthlySip }: ResultsDashboardProps) {
    const [showTimeMachine, setShowTimeMachine] = useState(false);
    const [showLeaderboard, setShowLeaderboard] = useState(false);

    return (
        <div className="space-y-6">
            {/* Hero: Required SIP */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <GlassCard className="bg-white border-2 border-slate-400 p-8 text-center relative overflow-hidden" hoverEffect={false}>
                    {/* Background sparkles */}
                    <div className="absolute top-4 left-4 opacity-5 text-primary">
                        <Sparkles className="w-20 h-20" />
                    </div>
                    <div className="absolute bottom-4 right-4 opacity-5 text-primary">
                        <Sparkles className="w-16 h-16" />
                    </div>

                    <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">
                        Your Required Monthly SIP
                    </p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-5xl md:text-6xl font-black mb-4 text-slate-900"
                    >
                        ₹{results.requiredSIP.toLocaleString()}
                    </motion.h2>
                    <p className="text-sm font-bold text-slate-500">
                        per month for {watchedYears} years to reach your goal
                    </p>
                </GlassCard>
            </motion.div>

            {/* Breakdown Cards */}
            <div className="grid grid-cols-3 gap-3">
                {[
                    {
                        label: 'Future Cost',
                        value: `₹${(results.futureCost / 100000).toFixed(1)}L`,
                        icon: TrendingUp,
                        desc: 'After inflation',
                        color: 'text-secondary',
                        bg: 'bg-secondary/5 border-secondary/10'
                    },
                    {
                        label: 'You Invest',
                        value: `₹${(results.totalInvestment / 100000).toFixed(1)}L`,
                        icon: Wallet,
                        desc: 'Total contribution',
                        color: 'text-primary',
                        bg: 'bg-primary/5 border-primary/10'
                    },
                    {
                        label: 'Wealth Created',
                        value: `₹${(results.estimatedEarnings / 100000).toFixed(1)}L`,
                        icon: Sparkles,
                        desc: 'Compounding magic',
                        color: 'text-emerald-600',
                        bg: 'bg-emerald-50 border-emerald-100'
                    },
                ].map((card, idx) => {
                    const Icon = card.icon;
                    return (
                        <motion.div
                            key={card.label}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + idx * 0.1 }}
                        >
                            <GlassCard className={`p-4 ${card.bg} border h-full`} hoverEffect={false}>
                                <Icon className={`w-4 h-4 ${card.color} mb-2`} />
                                <p className="text-lg font-black text-slate-800">{card.value}</p>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{card.label}</p>
                                <p className="text-[10px] text-slate-500 mt-0.5">{card.desc}</p>
                            </GlassCard>
                        </motion.div>
                    );
                })}
            </div>

            {/* Health + Advisor Row */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                <GlassCard className="p-6" hoverEffect={false}>
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="shrink-0">
                            <HealthGauge score={health.score} size={140} />
                        </div>
                        <div className="flex-1 w-full">
                            <GreatMinds score={health.score} feedback={health.feedback || []} />
                        </div>
                    </div>
                </GlassCard>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-3"
            >
                <button
                    type="button"
                    onClick={() => setShowTimeMachine(!showTimeMachine)}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl border-2 border-primary/20 text-primary font-bold text-sm hover:bg-primary/5 transition-all group"
                >
                    <Clock className="w-4 h-4" />
                    SIP Time Machine
                    <ChevronDown className={`w-4 h-4 transition-transform ${showTimeMachine ? 'rotate-180' : ''}`} />
                </button>

                <button
                    type="button"
                    onClick={() => setShowLeaderboard(!showLeaderboard)}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl border-2 border-secondary/20 text-secondary font-bold text-sm hover:bg-secondary/5 transition-all group"
                >
                    <Trophy className="w-4 h-4" />
                    Leaderboard
                    <ChevronDown className={`w-4 h-4 transition-transform ${showLeaderboard ? 'rotate-180' : ''}`} />
                </button>
            </motion.div>

            {/* Expandable Sections */}
            <AnimatePresence>
                {showTimeMachine && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <VolatilitySimulator monthlySip={monthlySip} />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showLeaderboard && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <Leaderboard />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
