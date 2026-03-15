'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, AlertCircle, Quote, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '@/store/useStore';

interface GreatMindsProps {
    score: number;
    feedback: string[];
}

export default function GreatMinds({ score, feedback }: GreatMindsProps) {
    const [dismissedTips, setDismissedTips] = useState<number[]>([]);
    const { addXP } = useStore();

    const getAdvisor = () => {
        if (score >= 80) return { name: 'The Wise Sage', icon: '💎', quote: 'Patience and discipline are the true architects of wealth.' };
        if (score >= 50) return { name: 'The Market Analyst', icon: '📊', quote: 'A solid plan, but the devil is in the details. Watch your assumptions.' };
        return { name: 'The Risk Guardian', icon: '🛡️', quote: 'Caution! An unrealistic plan is a map that leads to nowhere.' };
    };

    const advisor = getAdvisor();

    const handleDismiss = (idx: number) => {
        if (!dismissedTips.includes(idx)) {
            setDismissedTips(prev => [...prev, idx]);
            addXP(10);
        }
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={advisor.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
            >
                <div className="space-y-3">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-xl shadow-inner border border-slate-400 dark:border-slate-700 shrink-0">
                            {advisor.icon}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <h4 className="font-bold text-sm text-primary flex items-center gap-1.5">
                                    {advisor.name}
                                </h4>
                                <Quote className="w-3 h-3 text-primary opacity-20" />
                            </div>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-xs font-medium text-slate-600 dark:text-slate-300 italic leading-relaxed"
                            >
                                &ldquo;{advisor.quote}&rdquo;
                            </motion.p>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        {feedback.map((tip, i) => (
                            <motion.button
                                key={i}
                                type="button"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + i * 0.15 }}
                                onClick={() => handleDismiss(i)}
                                className={`w-full flex items-start gap-2 p-2.5 rounded-lg text-xs text-left transition-all ${dismissedTips.includes(i)
                                    ? 'bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/30 text-emerald-600'
                                    : 'bg-white/50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary/5'
                                    }`}
                            >
                                {dismissedTips.includes(i) ? (
                                    <CheckCircle className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                                ) : score < 50 ? (
                                    <AlertCircle className="w-3 h-3 text-red-500 shrink-0 mt-0.5" />
                                ) : (
                                    <Lightbulb className="w-3 h-3 text-secondary shrink-0 mt-0.5" />
                                )}
                                <span className="flex-1 leading-tight">{tip}</span>
                                {!dismissedTips.includes(i) && (
                                    <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold shrink-0">
                                        +10 XP
                                    </span>
                                )}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
