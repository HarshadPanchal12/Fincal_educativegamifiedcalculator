'use client';

import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

interface InflationVisualizerProps {
    presentCost: number;
    years: number;
    inflation: number;
}

export default function InflationVisualizer({ presentCost, years, inflation }: InflationVisualizerProps) {
    const futureCost = presentCost * Math.pow(1 + inflation / 100, years);
    const multiplier = futureCost / presentCost;
    const barWidth = Math.min(multiplier * 30, 100); // Scale for visual

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10"
        >
            <div className="flex items-center gap-2 mb-3">
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-400 mt-6 pt-5 shadow-sm">
                    <h4 className="text-[10px] uppercase tracking-widest font-black text-slate-800 mb-6 flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>
                        Live Inflation Impact
                    </h4></div>
            </div>

            <div className="flex items-end gap-4 mb-4">
                <div className="text-center">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Today</div>
                    <div className="h-16 w-14 bg-primary/20 rounded-lg flex items-end justify-center pb-1 relative">
                        <div className="absolute inset-x-0 bottom-0 h-full bg-primary/40 rounded-lg" />
                        <span className="relative text-[10px] font-bold text-primary">₹{(presentCost / 100000).toFixed(1)}L</span>
                    </div>
                </div>

                <div className="flex-1 flex items-center">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-[2px] bg-gradient-to-r from-primary/40 to-secondary/60 relative"
                    >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-secondary rounded-full" />
                    </motion.div>
                </div>

                <div className="text-center">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">In {years} yrs</div>
                    <motion.div
                        initial={{ height: 64 }}
                        animate={{ height: Math.min(64 * multiplier, 120) }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="w-14 bg-secondary/20 rounded-lg flex items-end justify-center pb-1 relative overflow-hidden"
                    >
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: '100%' }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="absolute inset-x-0 bottom-0 bg-secondary/40 rounded-lg"
                        />
                        <span className="relative text-[10px] font-bold text-secondary">
                            ₹{(futureCost / 100000).toFixed(1)}L
                        </span>
                    </motion.div>
                </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-tight">
                At <strong>{inflation}%</strong> inflation, your <strong>₹{(presentCost / 100000).toFixed(1)}L</strong> goal
                becomes <strong className="text-secondary">₹{(futureCost / 100000).toFixed(1)}L</strong> in {years} years.
                That's <strong>{multiplier.toFixed(1)}x</strong> more! This is why we plan for <em>future cost</em>, not today's price.
            </p>
        </motion.div>
    );
}
