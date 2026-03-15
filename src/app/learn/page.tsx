'use client';

import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import RiskSpectrum from '@/components/education/RiskSpectrum';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Landmark, TrendingUp, Shield, Clock, Lightbulb, Calculator } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useState } from 'react';

import { PiggyBank, TrendingUp as Fluctuation, Repeat, BarChart2, Receipt, Scale, Activity, PieChart } from 'lucide-react';

const GLOSSARY = [
    {
        term: 'SIP (Systematic Investment Plan)',
        definition: 'A method of investing a fixed sum regularly in mutual funds. Like a recurring deposit, but in the stock market. Even ₹500/month can grow significantly over 15+ years.',
        icon: PiggyBank,
        category: 'Investing',
    },
    {
        term: 'Inflation',
        definition: 'The rate at which prices increase over time. At 6% inflation, something costing ₹100 today will cost ₹179 in 10 years. Your savings must beat inflation to grow in real terms.',
        icon: Fluctuation,
        category: 'Economics',
    },
    {
        term: 'Compound Interest',
        definition: '"Interest on interest" — the 8th wonder of the world (attributed to Einstein). ₹10,000 at 12% becomes ₹31,058 in 10 years without adding a single rupee more.',
        icon: Repeat,
        category: 'Core Concept',
    },
    {
        term: 'NAV (Net Asset Value)',
        definition: 'The price of one unit of a mutual fund. When you invest ₹1,000 in a fund with NAV ₹50, you get 20 units. NAV goes up or down based on the fund\'s portfolio performance.',
        icon: BarChart2,
        category: 'Mutual Funds',
    },
    {
        term: 'Expense Ratio',
        definition: 'The annual fee charged by a mutual fund (typically 0.5%–2.5%). A fund with ₹1L investment and 1% expense ratio charges ₹1,000/year. Lower is better for long-term wealth.',
        icon: Receipt,
        category: 'Mutual Funds',
    },
    {
        term: 'Rupee Cost Averaging',
        definition: 'When markets fall, your SIP buys more units at lower prices. When markets rise, you buy fewer units. Over time, this averages out your cost — reducing the impact of volatility.',
        icon: Scale,
        category: 'Strategy',
    },
    {
        term: 'CAGR (Compound Annual Growth Rate)',
        definition: 'The average annual growth rate of an investment over a specified period. If ₹1L becomes ₹3L in 10 years, the CAGR is ~11.6%. It smooths out yearly ups and downs.',
        icon: Activity,
        category: 'Performance',
    },
    {
        term: 'Asset Allocation',
        definition: 'How you split your money between Equity, Debt, and Gold. A common rule: "100 minus your age" should be in equity. A 25-year-old might keep 75% in equity funds.',
        icon: PieChart,
        category: 'Strategy',
    },
];

const CONCEPTS = [
    {
        title: 'The Rule of 72',
        body: 'Divide 72 by the return rate to find how many years it takes to double your money. At 12% returns: 72÷12 = 6 years to double. At 6% (FD): 72÷6 = 12 years.',
        icon: Clock,
        color: '#224c87',
    },
    {
        title: 'Why Not Just FDs?',
        body: 'FDs give ~6% returns, but inflation is also ~6%. Your money doesn\'t really grow in purchasing power. Equity mutual funds average 12-14% over the long term, actually beating inflation.',
        icon: Shield,
        color: '#da3832',
    },
    {
        title: 'Time > Timing',
        body: 'Even if you invested at the worst possible time (right before the 2008 crash), staying invested for 10+ years would have given you positive returns. Time in market beats timing the market.',
        icon: TrendingUp,
        color: '#059669',
    },
    {
        title: 'Start Small, Start Now',
        body: 'Starting a ₹1,000 SIP at age 22 gives you ₹1.5 Cr by 55 (at 12%). Starting the same SIP at 32 gives only ₹50L. The earlier you start, the more compounding works for you.',
        icon: Lightbulb,
        color: '#f59e0b',
    },
];

export default function LearnPage() {
    const { unlockedTerms, unlockTerm, addXP } = useStore();
    const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    const categories = ['All', ...Array.from(new Set(GLOSSARY.map(g => g.category)))];
    const filtered = selectedCategory === 'All' ? GLOSSARY : GLOSSARY.filter(g => g.category === selectedCategory);

    const handleTermClick = (term: string, idx: number) => {
        setExpandedIdx(expandedIdx === idx ? null : idx);
        if (!unlockedTerms.includes(term)) {
            unlockTerm(term);
        }
    };

    return (
        <main className="min-h-screen py-8 px-4 md:px-8 bg-slate-50">
            <div className="max-w-5xl mx-auto relative z-10">
                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <Link href="/calculator">
                        <button className="skeuo-flat p-3 hover:bg-slate-100 transition-all flex items-center gap-2 text-xs font-bold text-slate-500 group">
                            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> Calculator
                        </button>
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 gradient-premium rounded-xl flex items-center justify-center text-white shadow-lg">
                            <Landmark className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[9px] font-bold text-primary uppercase tracking-[0.2em] leading-none">HDFC</p>
                            <p className="text-xs font-black text-slate-800 dark:text-white leading-none">FinCal Learn</p>
                        </div>
                    </div>
                    <Link href="/achievements">
                        <button className="skeuo-flat p-3 hover:bg-slate-100 transition-all flex items-center gap-2 text-xs font-bold text-primary">
                            Achievements →
                        </button>
                    </Link>
                </header>

                {/* Hero */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-4"
                    >
                        <BookOpen className="w-4 h-4 text-primary" />
                        <span className="text-xs font-bold text-primary uppercase tracking-widest">Learn & Earn XP</span>
                    </motion.div>
                    <h1 className="text-3xl md:text-4xl font-black mb-2 tracking-tight">
                        Financial <span className="text-gradient">Academy</span>
                    </h1>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                        Master key financial concepts. Tap any term to learn and earn XP!
                    </p>
                </div>

                {/* Key Concepts Grid */}
                <div className="mb-12">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-secondary" /> Key Insights
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {CONCEPTS.map((concept, idx) => {
                            const Icon = concept.icon;
                            return (
                                <motion.div
                                    key={concept.title}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <GlassCard className="p-5 h-full" hoverEffect>
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                                style={{ background: `${concept.color}10` }}>
                                                <Icon className="w-5 h-5" style={{ color: concept.color }} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-sm mb-1 text-slate-800">{concept.title}</h3>
                                                <p className="text-xs text-slate-600 leading-relaxed">
                                                    {concept.body}
                                                </p>
                                            </div>
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Risk-Return Spectrum */}
                <div className="mb-12">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-primary" /> Understanding Risk & Returns
                    </h2>
                    <GlassCard className="p-6">
                        <RiskSpectrum selectedReturn={12} />
                        <p className="text-xs text-slate-400 mt-4 text-center">
                            Click on any segment to explore. Higher returns always come with higher risk.
                        </p>
                    </GlassCard>
                </div>

                {/* Glossary */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-primary" /> Financial Glossary
                        </h2>
                        <span className="text-[10px] font-bold text-slate-400">{unlockedTerms.length}/{GLOSSARY.length} Learned</span>
                    </div>

                    {/* Category Filter */}
                    <div className="flex gap-2 mb-4 flex-wrap">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all ${selectedCategory === cat
                                    ? 'bg-primary text-white'
                                    : 'bg-white border border-slate-400 text-slate-600 hover:bg-slate-50'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-2">
                        {filtered.map((item, idx) => {
                            const isUnlocked = unlockedTerms.includes(item.term);
                            const isExpanded = expandedIdx === idx;
                            const IconComp = item.icon;
                            return (
                                <motion.div
                                    key={item.term}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                >
                                    <button
                                        onClick={() => handleTermClick(item.term, idx)}
                                        className={`w-full text-left p-4 rounded-xl border transition-all ${isExpanded ? 'bg-primary/5 border-primary/20' : 'bg-white border-slate-400 hover:border-primary/20 hover:shadow-sm'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isUnlocked ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                                                    <IconComp className="w-4 h-4" />
                                                </div>
                                                <span className="text-sm font-bold text-slate-800">{item.term}</span>
                                                {isUnlocked && (
                                                    <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-600 font-bold border border-emerald-200">
                                                        ✓ Learned
                                                    </span>
                                                )}
                                            </div>
                                            {!isUnlocked && (
                                                <span className="text-[9px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold border border-primary/20">
                                                    +50 XP
                                                </span>
                                            )}
                                        </div>
                                        {isExpanded && (
                                            <motion.p
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                className="text-xs text-slate-600 leading-relaxed mt-4 pl-[44px] pb-1 border-t border-slate-300 pt-3"
                                            >
                                                {item.definition}
                                            </motion.p>
                                        )}
                                    </button>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center pb-8">
                    <Link href="/calculator">
                        <button className="inline-flex items-center gap-2 px-8 py-3 gradient-premium text-white rounded-xl font-bold shadow-lg hover:shadow-primary/20 transition-all">
                            <Calculator className="w-4 h-4" /> Start Planning
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
