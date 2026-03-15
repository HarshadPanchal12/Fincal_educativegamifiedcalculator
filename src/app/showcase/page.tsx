'use client';

import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import Link from 'next/link';
import { ArrowLeft, Rocket, Target, Shield, Zap, Award, Globe, Code, Play } from 'lucide-react';

export default function ShowcasePage() {
    return (
        <main className="min-h-screen bg-slate-50 py-12 px-4 md:px-8">
            <div className="max-w-5xl mx-auto relative z-10">
                {/* Header */}
                <Link href="/">
                    <button className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-primary mb-8 transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
                    </button>
                </Link>

                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-black uppercase tracking-widest mb-6 border border-emerald-200"
                    >
                        <Rocket className="w-3.5 h-3.5" /> Project Showcase
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">
                        FinCal: The Future of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-400">Financial Mastery</span>
                    </h1>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        A clean, enterprise-grade gamified platform designed to turn complex financial planning into an interactive educational journey. Built for the Technex Innovation Hackathon.
                    </p>
                </div>

                {/* Video Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-20"
                >
                    <GlassCard className="p-4 border-slate-400 bg-white" hoverEffect={false}>
                        <div className="aspect-video w-full bg-slate-100 rounded-xl overflow-hidden relative group">
                            <iframe
                                src="https://app.guidde.com/share/playbooks/viF9qhpYpwPfiebs5ihAXL?origin=jdtRizhI97RTZ3YqPhQzNPP6zAr2&embed=true"
                                className="w-full h-full border-0"
                                allowFullScreen
                                title="FinCal Demo Video"
                            ></iframe>
                        </div>
                        <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4 px-2">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Platform Walkthrough</h3>
                                <p className="text-sm text-slate-500">Experience the full 4-step wizard and gamification hub.</p>
                            </div>
                            <a
                                href="https://app.guidde.com/share/playbooks/viF9qhpYpwPfiebs5ihAXL?origin=jdtRizhI97RTZ3YqPhQzNPP6zAr2"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
                            >
                                <Play className="w-4 h-4 fill-current" /> Watch on Guidde
                            </a>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Core Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    {[
                        {
                            icon: <Target className="w-6 h-6 text-emerald-600" />,
                            title: "Goal-Oriented",
                            desc: "Planning built around your life milestones, not just abstract formulas."
                        },
                        {
                            icon: <Shield className="w-6 h-6 text-teal-600" />,
                            title: "Accountability",
                            desc: "Real-time health auditing penalizes unrealistic returns to ensure market realism."
                        },
                        {
                            icon: <Zap className="w-6 h-6 text-emerald-600" />,
                            title: "Gamified Mastery",
                            desc: "Earn XP and unlock badges by expanding your financial knowledge base."
                        }
                    ].map((pillar, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <GlassCard className="h-full border-slate-400">
                                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-300 flex items-center justify-center mb-4">
                                    {pillar.icon}
                                </div>
                                <h4 className="text-lg font-bold mb-2 text-slate-900">{pillar.title}</h4>
                                <p className="text-sm text-slate-500 leading-relaxed">{pillar.desc}</p>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>

                {/* Tech Deep Dive */}
                <div className="mb-20">
                    <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                        <Code className="w-7 h-7 text-emerald-600" /> Technical Architecture
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <GlassCard className="border-slate-400 bg-white">
                            <h5 className="font-bold text-slate-800 uppercase tracking-widest text-[10px] mb-4">Frontend & Graphics</h5>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2 text-sm text-slate-600">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    <strong>Next.js 15:</strong> High-performance server-side rendering.
                                </li>
                                <li className="flex items-center gap-2 text-sm text-slate-600">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    <strong>Three.js:</strong> Interactive 3D financial visualizations.
                                </li>
                                <li className="flex items-center gap-2 text-sm text-slate-600">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    <strong>Framer Motion:</strong> Fluid transitions and micro-animations.
                                </li>
                            </ul>
                        </GlassCard>
                        <GlassCard className="border-slate-400 bg-white">
                            <h5 className="font-bold text-slate-800 uppercase tracking-widest text-[10px] mb-4">Logic & State</h5>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2 text-sm text-slate-600">
                                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                                    <strong>Zustand:</strong> Persistent persistence of game XP and saved plans.
                                </li>
                                <li className="flex items-center gap-2 text-sm text-slate-600">
                                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                                    <strong>HDF Logic:</strong> Industry-standard financial planning formulas.
                                </li>
                                <li className="flex items-center gap-2 text-sm text-slate-600">
                                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                                    <strong>Clerk Architecture:</strong> Seamless enterprise-grade authentication.
                                </li>
                            </ul>
                        </GlassCard>
                    </div>
                </div>

                {/* Conclusion CTA */}
                <div className="text-center bg-white rounded-3xl border-2 border-slate-400 p-12 mb-12 shadow-xl shadow-slate-200/50">
                    <Award className="w-12 h-12 text-emerald-600 mx-auto mb-6" />
                    <h2 className="text-3xl font-black text-slate-900 mb-4">Ready to try it?</h2>
                    <p className="text-slate-500 mb-8 max-w-lg mx-auto">
                        Experience the platform yourself. Every calculation is an opportunity to learn.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href="/calculator">
                            <button className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 transition-all active:scale-95">
                                Open Planner
                            </button>
                        </Link>
                        <Link href="/">
                            <button className="px-8 py-4 bg-slate-50 border-2 border-slate-300 text-slate-700 rounded-xl font-bold hover:bg-slate-100 transition-all">
                                Main Landing
                            </button>
                        </Link>
                    </div>
                </div>

                <footer className="text-center text-slate-400 py-8 border-t border-slate-300">
                    <p className="text-xs font-bold uppercase tracking-widest mb-2">Technex Innovation Hackathon 2026</p>
                    <p className="text-[10px]">Built with Passion & Precision</p>
                </footer>
            </div>
        </main>
    );
}
