'use client';

import { useStore } from '@/store/useStore';
import Link from 'next/link';
import { ArrowLeft, Landmark, History, TrendingUp, Calendar, Wallet } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { motion } from 'framer-motion';

export default function EarlierPlansPage() {
    const { savedPlans } = useStore();

    // Sort by expected return descending
    const sortedPlans = [...savedPlans].sort((a, b) => b.expectedReturn - a.expectedReturn);

    return (
        <main className="min-h-screen py-8 px-4 md:px-8 bg-slate-50">
            <div className="max-w-6xl mx-auto relative z-10">
                {/* Compact Header */}
                <header className="flex justify-between items-center mb-8 border-b border-slate-400 pb-4">
                    <Link href="/calculator">
                        <button className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-primary transition-colors group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Planner
                        </button>
                    </Link>

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-sm">
                            <Landmark className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] leading-none">HDFC</p>
                            <p className="text-sm font-black text-slate-800 leading-none mt-1">Earlier Plans</p>
                        </div>
                    </div>

                    <div className="w-24"></div> {/* Spacer for center alignment */}
                </header>

                <div className="mb-8">
                    <h1 className="text-2xl font-bold flex items-center gap-2 text-slate-800">
                        <History className="w-6 h-6 text-primary" /> Past Financial Goals
                    </h1>
                    <p className="text-sm text-slate-500 mt-2">
                        Review your saved planning scenarios, automatically sorted by calculated returns.
                    </p>
                </div>

                {sortedPlans.length === 0 ? (
                    <div className="text-center py-20">
                        <History className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-slate-400 mb-2">No Plans Created Yet</h2>
                        <p className="text-sm text-slate-500 mb-6">Your generated plans will be securely stored here.</p>
                        <Link href="/calculator">
                            <button className="px-6 py-3 bg-primary text-white rounded-lg font-bold text-sm hover:bg-primary/90 transition-colors shadow-sm">
                                Create New Plan
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sortedPlans.map((plan, idx) => (
                            <motion.div
                                key={plan.id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <GlassCard className="p-6 h-full flex flex-col justify-between hover:border-primary/30 hover:shadow-lg transition-all" hoverEffect={false}>
                                    <div>
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                                                    <Wallet className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Goal Cost</p>
                                                    <p className="text-base font-black text-slate-800">
                                                        ₹{(plan.goalCost / 100000).toFixed(1)}L
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] text-slate-400">{new Date(plan.date).toLocaleDateString()}</p>
                                                <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold ${plan.healthScore >= 80 ? 'bg-emerald-100 text-emerald-700' :
                                                    plan.healthScore >= 50 ? 'bg-amber-100 text-amber-700' :
                                                        'bg-red-100 text-red-700'
                                                    }`}>
                                                    Score: {plan.healthScore}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-3 pt-3 border-t border-slate-300">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs text-slate-500 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Timeline</span>
                                                <span className="text-sm font-bold text-slate-700">{plan.years} Years</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs text-slate-500 flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5" /> Strategy</span>
                                                <span className="text-sm font-bold text-slate-700">{plan.expectedReturn}% Return</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-slate-100">
                                        <p className="text-[10px] uppercase font-bold text-primary tracking-wider mb-1">Required Monthly SIP</p>
                                        <p className="text-2xl font-black text-primary">₹{plan.requiredSIP.toLocaleString()}</p>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
