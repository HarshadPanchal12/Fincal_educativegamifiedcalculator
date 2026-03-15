'use client';

import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import Link from 'next/link';
import { ArrowRight, Calculator, PieChart, TrendingUp } from 'lucide-react';

export default function Hero() {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20">
            <div className="max-w-4xl w-full text-center mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-emerald-700 uppercase bg-emerald-100 rounded-full border border-emerald-200">
                        HDFC Mutual Fund Innovation
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-slate-900">
                        Plan Your Future with <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-400">Precision & Style</span>
                    </h1>
                    <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                        Experience the next generation of financial planning. Our goal-based calculator
                        combines HDFC's trusted logic with a premium interactive experience.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link href="/calculator">
                        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all active:scale-95 group">
                            Start Planning <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                    <button className="bg-white border-2 border-slate-400 text-slate-700 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all active:scale-95">
                        Learn More
                    </button>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                {[
                    {
                        icon: <TrendingUp className="w-6 h-6 text-emerald-600" />,
                        title: "Inflation Adjusted",
                        desc: "Don't just calculate, plan for the real value of your money."
                    },
                    {
                        icon: <PieChart className="w-6 h-6 text-teal-600" />,
                        title: "Goal Oriented",
                        desc: "Focus on your life milestones with tailored investment strategies."
                    },
                    {
                        icon: <Calculator className="w-6 h-6 text-emerald-600" />,
                        title: "Expert Logic",
                        desc: "Math that matters. Based on industry-standard financial formulas."
                    }
                ].map((feature, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                    >
                        <GlassCard className="h-full border-t-4 border-emerald-500 bg-white">
                            <div className="mb-4 w-12 h-12 flex items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground">{feature.desc}</p>
                        </GlassCard>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
