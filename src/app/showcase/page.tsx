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

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-20"
                >
                    <GlassCard className="p-4 border-slate-400 bg-white" hoverEffect={false}>
                        <div className="aspect-video w-full bg-slate-100 rounded-xl overflow-hidden relative group flex flex-col items-center justify-center p-8 text-center bg-cover bg-center"
                            style={{ backgroundImage: 'url("/showcase-thumbnail.png")' }}>
                            {/* Overlay to ensure text readability if iframe fails */}
                            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" />

                            <iframe
                                src="https://embed.app.guidde.com/playbooks/viF9qhpYpwPfiebs5ihAXL?mode=videoOnly"
                                className="w-full h-full border-0 absolute inset-0 z-10"
                                allowFullScreen
                                title="Explore Financial Planning Features in FinCal Innovation"
                                allow="clipboard-write"
                                sandbox="allow-popups allow-popups-to-escape-sandbox allow-scripts allow-forms allow-same-origin allow-presentation"
                            ></iframe>

                            {/* Hidden transcript for SEO as provided by user */}
                            <div className="hidden">
                                <p>00:00: this demo showcases how Finn Kal Innovation helps you plan your financial future</p>
                                <p>00:02: effectively</p>
                                <p>00:05: You'll see how to set goals generate plans and track your progress with ease.</p>
                                <p>00:10: Click the start planning button to begin creating your personalized financial plan.</p>
                                <p>00:15: Click here to explore additional planning options available within the platform.</p>
                                <p>00:20: Click continue to move forward in the planning process.</p>
                                <p>00:24: Click 9 to specify the duration or value related to your financial goal.</p>
                                <p>00:29: Enter 9 to define the specific duration or amount for your goal.</p>
                                <p>00:34: Click 8 to add another value relevant to your financial plan.</p>
                                <p>00:38: Enter 8 to specify the additional value in your plan.</p>
                                <p>00:42: Click 9 to confirm the selected value for your financial goal.</p>
                                <p>00:46: Enter 9 to finalize the value input for your plan.</p>
                                <p>00:50: Click continue to proceed with your financial planning steps.</p>
                                <p>00:53: Click here to access more features and settings within the planning tool.</p>
                                <p>00:58: Click 6% to choose an inflation Benchmark for your financial calculations.</p>
                                <p>01:03: Click 8% to modify the inflation rate used in your plan.</p>
                                <p>01:07: Click 10% to set a higher inflation rate for your projections.</p>
                                <p>01:12: Click 15% to select an aggressive inflation Benchmark for your plan.</p>
                                <p>01:17: Click 12% to apply a moderate inflation rate to your financial model.</p>
                                <p>01:22: Click generate plan to create a customized Financial strategy based on your inputs.</p>
                                <p>01:27: Click wise Guardian.</p>
                                <p>01:30: You have picked a realistic inflation benchmark.</p>
                                <p>01:33: Click realistic thinker, your return expectations aligned with Market averages.</p>
                                <p>01:39: Click leaderboard to see how your planning Compares with other users.</p>
                                <p>01:43: Click here to explore more tools and insights within the platform.</p>
                                <p>01:47: Click here to access further options and settings for your plan.</p>
                                <p>01:51: Click here to continue customizing your financial planning experience.</p>
                                <p>01:56: Click sip time machine to simulate your systematic investment plan over time.</p>
                                <p>02:01: Click run simulation to analyze potential outcomes of your investment strategy.</p>
                                <p>02:06: Click 173,445 Indian rupees to examine the projected investment value from the</p>
                                <p>02:10: simulation.</p>
                                <p>02:15: Click here to delve deeper into your financial data and projections.</p>
                                <p>02:19: Click here to review. More detailed information about your plan.</p>
                                <p>02:23: Click here to access extended analytics, and planning tools.</p>
                                <p>02:27: Click calculator, HDFC, achievements, learn three level, three investor 1495, total</p>
                                <p>02:30: XP earned</p>
                                <p>02:34: 495 500 XP to Next Level 1495. Total XP 3, level 1 plans</p>
                                <p>02:41: created three terms learned achievements 5/7. First Steps performed. Your first</p>
                                <p>02:49: Click 1495 to view your total experience points earned within the platform.</p>
                                <p>02:54: Click 3 to see the number of financial plans, you have created.</p>
                                <p>02:59: Click one to check the financial terms. You have learned so far.</p>
                                <p>03:03: Click 3 to explore your unlocked achievements, and progress milestones.</p>
                                <p>03:08: Click 3 to see the total number of achievements earned.</p>
                                <p>03:12: Click First Steps performed, your first calculation, plus 200 XP.</p>
                                <p>03:18: Unlocked.</p>
                                <p>03:20: Click Diamond hand, survived a simulated market. Crash. Plus 200 XP unlocked.</p>
                                <p>03:26: Click Explorer visited all four wizard steps plus 200 XP unlocked.</p>
                                <p>03:32: Click plus 200 XP.</p>
                                <p>03:36: Unlocked to see recent experience Point gains.</p>
                                <p>03:39: Click kept realism mode on for a plan to ensure accurate projections.</p>
                                <p>03:45: Click you three 15 2026?</p>
                                <p>03:49: LVL 290 to check your current user level and progress.</p>
                                <p>03:53: Click learn to explore, educational materials and tutorials.</p>
                                <p>03:57: Click financial academy to access comprehensive Financial education, content.</p>
                                <p>04:03: Click financial academy again to continue your Learning Journey.</p>
                                <p>04:07: Click divide 72 by the return rate to find how many years it takes to double your</p>
                                <p>04:11: money at 12%. Returns 72</p>
                                <p>04:14: divided by 12 is equal to six years to double at 6%, FD 72 divided by 6 is equal to</p>
                                <p>04:18: 12 years.</p>
                                <p>04:23: Click even if you invested at the worst possible time. Right before the 2008</p>
                                <p>04:27: crash staying invested for 10 plus years would have given you positive returns.</p>
                                <p>04:32: time in Market beats timing, the market,</p>
                                <p>04:35: Click sip systematic, investment plan, plus 50 XP to understand the benefits of</p>
                                <p>04:38: regular Investments.</p>
                                <p>04:42: Click kager, compound annual growth rate to learn about this important investment</p>
                                <p>04:45: metric.</p>
                                <p>04:48: Click calculator to Access Financial calculation features within the platform.</p>
                                <p>04:53: Click previous plans to revisit and manage your earlier Financial plans.</p>
                                <p>04:58: Click here to explore additional functionalities offered by Finn Cal innovation.</p>
                                <p>05:03: Click here to continue customizing your financial planning experience.</p>
                                <p>05:07: Click set your dream to Define your personal financial objectives.</p>
                                <p>05:11: Click HDFC Finn cow to navigate, back to the main dashboard of the application.</p>
                                <p>05:17: Click home, HDFC, fenkel ove.</p>
                                <p>05:20: 45C 7.</p>
                                <p>05:25: Goal-based planner learn to plan your financial future step by step concept by</p>
                                <p>05:27: concept.</p>
                                <p>05:31: 12:34 Step 1 of 4 set your dream. What are you saving for? How much does your goal</p>
                                <p>05:35: cost?</p>
                                <p>05:39: Click home to go back to the main screen and overview of your financial plans.</p>
                                <p>05:44: This demo highlights. How Finn Cal Innovation empowers you to create realistic</p>
                                <p>05:49: Financial plans, simulate investment outcomes and track your progress with</p>
                                <p>05:51: personalized insights.</p>
                                <p>05:54: Start planning today to take control of your financial future with confidence.</p>
                            </div>

                            <div className="relative z-0">
                                <Play className="w-12 h-12 text-white mx-auto mb-4" />
                                <p className="text-white font-bold mb-4 drop-shadow-lg">Interactive Platform Demo</p>
                                <a
                                    href="https://app.guidde.com/share/playbooks/viF9qhpYpwPfiebs5ihAXL?origin=jdtRizhI97RTZ3YqPhQzNPP6zAr2"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-emerald-600 text-white px-6 py-2 rounded-full font-black hover:bg-emerald-700 transition-all shadow-xl"
                                >
                                    Open Direct Video Link
                                </a>
                            </div>
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
