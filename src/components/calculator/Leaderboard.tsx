'use client';

import { useStore } from '@/store/useStore';
import GlassCard from '@/components/ui/GlassCard';
import { Trophy, Medal, Star, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Leaderboard() {
    const { leaderboard } = useStore();

    if (leaderboard.length === 0) return null;

    return (
        <GlassCard className="p-6 border-secondary/20 bg-secondary/5 h-full">
            <div className="flex items-center gap-2 mb-6">
                <Trophy className="w-5 h-5 text-secondary" />
                <h3 className="font-bold text-slate-800 uppercase tracking-wider text-sm">
                    Financial Integrity Leaders
                </h3>
            </div>

            <div className="space-y-4">
                {leaderboard.map((entry, index) => (
                    <motion.div
                        key={`${entry.name}-${entry.date}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 rounded-xl bg-white/50 border border-slate-300"
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${index === 0 ? 'bg-secondary text-white shadow-lg shadow-secondary/20' :
                                index === 1 ? 'bg-slate-400 text-white' :
                                    index === 2 ? 'bg-amber-600 text-white' :
                                        'bg-slate-100 text-slate-500'
                                }`}>
                                {index === 0 ? <Medal className="w-4 h-4" /> : index + 1}
                            </div>
                            <div>
                                <p className="font-bold text-slate-800 text-sm">
                                    {entry.name}
                                    {index === 0 && <Star className="w-3 h-3 inline ml-1 text-secondary fill-secondary" />}
                                </p>
                                <div className="flex items-center gap-2 text-[10px] text-slate-500">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(entry.date).toLocaleDateString()}
                                    </span>
                                    <span>•</span>
                                    <span>Lvl {entry.level}</span>
                                </div>
                            </div>
                        </div>

                        <div className={`text-lg font-black ${entry.score >= 90 ? 'text-secondary' : 'text-slate-600'
                            }`}>
                            {entry.score}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-6 p-3 rounded-lg bg-secondary/10 border border-secondary/20 text-[11px] text-secondary font-medium leading-tight">
                Leaderboard rank is determined by your highest Financial Integrity score. Realistic plans win!
            </div>
        </GlassCard>
    );
}
